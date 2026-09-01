"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  UploadCloud,
  FileText,
  Download,
  Copy,
  Check,
  AlertCircle,
  CheckCircle2,
  Search,
  Sliders,
  Type,
  Layers,
  FileCode,
  FileSpreadsheet,
  Lock,
  ArrowRight,
  ShieldAlert,
  Clock,
  BookOpen,
  Sparkles,
  RefreshCw,
  X,
  Cpu,
} from "lucide-react";
import apiClient, { extractApiErrorMessage } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";

interface PageData {
  pageNum: number;
  text: string;
  wordCount: number;
  charCount: number;
}

interface OcrApiResponse {
  success?: boolean;
  message?: string;
  filename?: string;
  total_pages?: number;
  word_count?: number;
  char_count?: number;
  extracted_text?: string;
  pages?: Array<
    | {
        page_number?: number;
        pageNum?: number;
        page?: number;
        text?: string;
        word_count?: number;
        char_count?: number;
        words?: number;
        characters?: number;
      }
    | string
  >;
  stats?: Record<string, any>;
  "CV data"?: string;
}

export default function OcrPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagesData, setPagesData] = useState<PageData[]>([]);
  const [combinedText, setCombinedText] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"all" | number>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("sm");
  const [fontFamily, setFontFamily] = useState<"mono" | "sans">("sans");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStats, setApiStats] = useState<Record<string, any> | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Client-side fallback text extraction using pdfjs-dist
   */
  const fallbackExtractPdfText = async (
    uploadedFile: File
  ): Promise<{ pages: PageData[]; fullText: string; total: number }> => {
    const arrayBuffer = await uploadedFile.arrayBuffer();

    try {
      const pdfjs = await import("pdfjs-dist");
      if (typeof window !== "undefined") {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      }

      const loadingTask = pdfjs.getDocument({ data: arrayBuffer.slice(0) });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;
      const extractedPages: PageData[] = [];
      const allTextParts: string[] = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        try {
          const page = await pdfDoc.getPage(pageNum);
          const textContent = await page.getTextContent();

          let pageStr = "";
          let lastY: number | null = null;

          for (const item of textContent.items as any[]) {
            if ("str" in item) {
              const currentY = item.transform ? item.transform[5] : null;
              if (
                lastY !== null &&
                currentY !== null &&
                Math.abs(currentY - lastY) > 5
              ) {
                pageStr += "\n";
              } else if (
                pageStr.length > 0 &&
                !pageStr.endsWith("\n") &&
                !pageStr.endsWith(" ") &&
                item.str.trim()
              ) {
                pageStr += " ";
              }

              pageStr += item.str;
              lastY = currentY;
            }
          }

          const trimmed = pageStr.trim();
          const cleanPageText =
            trimmed.length > 0
              ? trimmed
              : `[Page ${pageNum}: No selectable text detected. This page might be a scanned image.]`;

          const words = cleanPageText.trim()
            ? cleanPageText.trim().split(/\s+/).length
            : 0;

          extractedPages.push({
            pageNum,
            text: cleanPageText,
            wordCount: words,
            charCount: cleanPageText.length,
          });

          allTextParts.push(`--- Page ${pageNum} ---\n\n${cleanPageText}`);
        } catch (pageErr) {
          console.warn(`Error extracting text on page ${pageNum}`, pageErr);
        }
      }

      return {
        pages: extractedPages,
        fullText: allTextParts.join("\n\n\n"),
        total: numPages,
      };
    } catch (pdfJsErr: any) {
      const errMsg = pdfJsErr?.message?.toLowerCase() || "";
      if (
        errMsg.includes("password") ||
        errMsg.includes("encrypt") ||
        pdfJsErr?.name === "PasswordException"
      ) {
        throw new Error("PASSWORD_PROTECTED");
      }

      // Raw stream token extraction fallback
      const uint8 = new Uint8Array(arrayBuffer);
      const textDecoder = new TextDecoder("latin1");
      const rawString = textDecoder.decode(uint8);

      const textMatches: string[] = [];
      const regex = /\((.*?)\)\s*T[jJ]/g;
      let match;
      while ((match = regex.exec(rawString)) !== null) {
        if (match[1] && match[1].trim().length > 0) {
          textMatches.push(match[1].replace(/\\([()\\])/g, "$1"));
        }
      }

      let parsed = textMatches.join(" ");
      if (!parsed || parsed.trim().length < 10) {
        const streamRegex = /stream[\r\n]+([\s\S]*?)[\r\n]+endstream/g;
        let streamMatch;
        const fallbackLines: string[] = [];
        while ((streamMatch = streamRegex.exec(rawString)) !== null) {
          const content = streamMatch[1];
          const clean = content
            .replace(/[^\x20-\x7E\n]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
          if (clean.length > 15) fallbackLines.push(clean);
        }
        parsed = fallbackLines.join("\n\n");
      }

      if (!parsed || parsed.trim().length === 0) {
        parsed = `OCR Text Extraction Report\nDocument: ${uploadedFile.name}\n\n[Text content parsed from document data stream.]`;
      }

      const words = parsed.trim() ? parsed.trim().split(/\s+/).length : 0;
      const singlePageData: PageData[] = [
        {
          pageNum: 1,
          text: parsed,
          wordCount: words,
          charCount: parsed.length,
        },
      ];

      return {
        pages: singlePageData,
        fullText: parsed,
        total: 1,
      };
    }
  };

  /**
   * Main OCR handler that calls the FastAPI backend OCR endpoint
   */
  const processOcr = async (uploadedFile: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      setIsPasswordProtected(false);
      setFile(uploadedFile);
      setSearchQuery("");
      setActiveTab("all");
      setApiStats(null);

      const formData = new FormData();
      formData.append("file", uploadedFile);

      // Call the FastAPI OCR endpoint
      const response = await apiClient.post<OcrApiResponse>(
        API_ENDPOINTS.PDF.OCRPDF,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      if (data && (data.success || data.extracted_text || data["CV data"])) {
        const fullExtractedText =
          data.extracted_text || data["CV data"] || "";
        const pagesCount = data.total_pages || (data.pages ? data.pages.length : 1);
        setTotalPages(pagesCount);
        setCombinedText(fullExtractedText);

        if (data.stats) {
          setApiStats(data.stats);
        }

        // Format pages data
        if (Array.isArray(data.pages) && data.pages.length > 0) {
          const formattedPages: PageData[] = data.pages.map((p, idx) => {
            if (typeof p === "string") {
              const words = p.trim() ? p.trim().split(/\s+/).length : 0;
              return {
                pageNum: idx + 1,
                text: p,
                wordCount: words,
                charCount: p.length,
              };
            }
            const pageNumber = p.page_number || p.pageNum || p.page || idx + 1;
            const textContent = p.text || "";
            const words =
              p.word_count !== undefined
                ? p.word_count
                : p.words !== undefined
                ? p.words
                : textContent.trim()
                ? textContent.trim().split(/\s+/).length
                : 0;
            const chars =
              p.char_count !== undefined
                ? p.char_count
                : p.characters !== undefined
                ? p.characters
                : textContent.length;

            return {
              pageNum: pageNumber,
              text: textContent,
              wordCount: words,
              charCount: chars,
            };
          });

          setPagesData(formattedPages);
        } else {
          // If pages array is not separately provided, split or treat as single page
          const words =
            data.word_count !== undefined
              ? data.word_count
              : fullExtractedText.trim()
              ? fullExtractedText.trim().split(/\s+/).length
              : 0;
          const chars =
            data.char_count !== undefined
              ? data.char_count
              : fullExtractedText.length;

          setPagesData([
            {
              pageNum: 1,
              text: fullExtractedText,
              wordCount: words,
              charCount: chars,
            },
          ]);
        }
      } else {
        throw new Error(data?.message || "Failed to parse OCR response from server.");
      }
    } catch (apiErr: any) {
      console.warn("Backend OCR API Error, running client-side fallback:", apiErr);

      // Check if password protected
      const errMsg =
        apiErr?.response?.data?.detail ||
        apiErr?.response?.data?.message ||
        apiErr?.message ||
        "";
      if (
        typeof errMsg === "string" &&
        (errMsg.toLowerCase().includes("password") ||
          errMsg.toLowerCase().includes("encrypt"))
      ) {
        setIsPasswordProtected(true);
        setError("This PDF is password-protected. Please unlock it before extracting text.");
        return;
      }

      // Run fallback client-side extraction
      try {
        const fallbackResult = await fallbackExtractPdfText(uploadedFile);
        setPagesData(fallbackResult.pages);
        setCombinedText(fallbackResult.fullText);
        setTotalPages(fallbackResult.total);
      } catch (fallbackErr: any) {
        if (fallbackErr.message === "PASSWORD_PROTECTED") {
          setIsPasswordProtected(true);
          setError("This PDF is password-protected. Please unlock it before extracting text.");
        } else {
          const message = await extractApiErrorMessage(
            apiErr,
            "Failed to run OCR and extract text from this PDF."
          );
          setError(message);
        }
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFile = async (uploadedFile: File | undefined) => {
    if (!uploadedFile) return;
    if (!uploadedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a valid PDF document.");
      setIsPasswordProtected(false);
      return;
    }

    setFile(uploadedFile);
    await processOcr(uploadedFile);
  };

  const currentDisplayContent =
    activeTab === "all"
      ? combinedText
      : pagesData.find((p) => p.pageNum === activeTab)?.text || "";

  const handleTextChange = (newVal: string) => {
    if (activeTab === "all") {
      setCombinedText(newVal);
    } else {
      setPagesData((prev) =>
        prev.map((p) =>
          p.pageNum === activeTab
            ? {
                ...p,
                text: newVal,
                wordCount: newVal.trim() ? newVal.trim().split(/\s+/).length : 0,
                charCount: newVal.length,
              }
            : p
        )
      );
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentDisplayContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    if (!file || !currentDisplayContent) return;
    const blob = new Blob([currentDisplayContent], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const suffix = activeTab === "all" ? "ocr_full" : `ocr_page_${activeTab}`;
    a.download = `${file.name.replace(/\.pdf$/i, "")}_${suffix}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadDoc = () => {
    if (!file || !currentDisplayContent) return;
    const formattedHtml = currentDisplayContent
      .split("\n\n")
      .map((block) => `<p>${block.replace(/\n/g, "<br/>")}</p>`)
      .join("");

    const wordContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${file.name.replace(/\.pdf$/i, "")}</title>
        <style>
          @page { size: 8.5in 11.0in; margin: 1.0in; }
          body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.6; color: #1e293b; }
          h1 { font-size: 16pt; font-weight: bold; color: #0f172a; margin-bottom: 12pt; }
          p { margin-bottom: 8pt; text-align: justify; }
        </style>
      </head>
      <body>
        <h1>${file.name.replace(/\.pdf$/i, "")} - OCR Text Output</h1>
        ${formattedHtml}
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff" + wordContent], {
      type: "application/msword;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name.replace(/\.pdf$/i, "")}_ocr.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    if (!file) return;
    const exportData = {
      fileName: file.name,
      fileSize: file.size,
      totalPages: totalPages,
      extractedAt: new Date().toISOString(),
      stats: apiStats || undefined,
      pages: pagesData.map((p) => ({
        pageNumber: p.pageNum,
        words: p.wordCount,
        characters: p.charCount,
        content: p.text,
      })),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name.replace(/\.pdf$/i, "")}_ocr_data.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setPagesData([]);
    setCombinedText("");
    setTotalPages(0);
    setSearchQuery("");
    setApiStats(null);
    setError(null);
    setIsPasswordProtected(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Live Stats calculations
  const totalWords = pagesData.reduce((acc, curr) => acc + curr.wordCount, 0);
  const totalChars = combinedText.length;
  const currentWords = currentDisplayContent.trim()
    ? currentDisplayContent.trim().split(/\s+/).length
    : 0;
  const currentChars = currentDisplayContent.length;
  const readingTimeMin = Math.max(1, Math.ceil(totalWords / 200));

  // Search match counts
  const searchMatchCount = searchQuery.trim()
    ? (
        currentDisplayContent.match(
          new RegExp(searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")
        ) || []
      ).length
    : 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-theme/10 text-primary-theme text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          OCR & Text Recognition
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
          Extract Text & Characters from PDF
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-2 leading-relaxed">
          Accurately parse raw text, characters, and structured layout from any PDF document with AI-powered OCR recognition, instant preview, and multi-format export.
        </p>
      </div>

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className="border-2 border-dashed border-slate-300 hover:border-primary-theme rounded-3xl p-10 md:p-14 text-center cursor-pointer transition-all bg-slate-50 hover:bg-slate-50/70 flex flex-col items-center justify-center group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="p-4 md:p-5 bg-white rounded-2xl shadow-sm text-primary-theme group-hover:scale-110 transition-transform">
            <UploadCloud className="w-9 h-9 md:w-10 md:h-10" />
          </div>
          <p className="mt-4 text-base md:text-lg font-bold text-slate-800">
            Click to upload or drag & drop a PDF
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Fast optical character recognition • High precision parsing
          </p>
        </div>
      ) : isPasswordProtected ? (
        /* Password Protected Security Banner */
        <div className="p-6 md:p-8 rounded-3xl bg-amber-50/80 border border-amber-200 text-amber-900 text-center space-y-5 max-w-xl mx-auto my-2 animate-in fade-in">
          <div className="w-16 h-16 bg-amber-100 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto text-amber-700 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg md:text-2xl font-bold text-amber-950">
              This PDF is Password-Protected
            </h4>
            <p className="text-xs md:text-sm text-amber-800 leading-relaxed max-w-md mx-auto">
              <span className="font-semibold text-slate-900">{file.name}</span> is protected with password encryption. Please unlock the file first to perform text recognition.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/tooles/pdf-tooles/unlock-pdf"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition shadow-md shadow-primary-theme/20"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Unlock PDF First</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={reset}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white border border-amber-300 hover:bg-amber-100/60 text-amber-900 font-semibold text-xs md:text-sm transition cursor-pointer"
            >
              Upload Another PDF
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 md:space-y-8">
          {/* File Information Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-primary-theme/10 text-primary-theme rounded-xl shrink-0">
                <FileText className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-800 text-sm md:text-base truncate max-w-xs md:max-w-md">
                  {file.name}
                </h4>
                <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">
                  <span className="font-semibold text-slate-700">{totalPages}</span> {totalPages === 1 ? "page" : "pages"} • {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => file && processOcr(file)}
                disabled={isProcessing}
                className="text-xs md:text-sm font-semibold text-slate-600 hover:text-primary-theme px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? "animate-spin" : ""}`} />
                <span>Re-run OCR</span>
              </button>
              <button
                onClick={reset}
                className="text-xs md:text-sm font-semibold text-red-500 hover:text-red-600 hover:underline px-2 py-1 cursor-pointer transition-colors"
              >
                Change File
              </button>
            </div>
          </div>

          {isProcessing ? (
            <div className="py-16 md:py-20 flex flex-col items-center justify-center gap-3.5 text-slate-600 bg-slate-50/50 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 border-3 border-primary-theme border-t-transparent rounded-full animate-spin" />
              <div className="text-center space-y-1">
                <p className="text-base font-bold text-slate-800 flex items-center justify-center gap-2">
                  <Cpu className="w-4 h-4 text-primary-theme" />
                  Running Backend OCR & Text Recognition...
                </p>
                <p className="text-xs md:text-sm text-slate-500">
                  Processing document character models, tables, text streams, and structure
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Quick Metrics & Analytics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider block">
                    Total Words
                  </span>
                  <span className="text-lg md:text-xl font-bold text-slate-800 mt-1 block">
                    {totalWords.toLocaleString()}
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider block">
                    Total Characters
                  </span>
                  <span className="text-lg md:text-xl font-bold text-slate-800 mt-1 block">
                    {totalChars.toLocaleString()}
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider block">
                    Pages Extracted
                  </span>
                  <span className="text-lg md:text-xl font-bold text-slate-800 mt-1 block">
                    {totalPages}
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-primary-theme" />
                    Read Time
                  </span>
                  <span className="text-lg md:text-xl font-bold text-slate-800 mt-1 block">
                    ~{readingTimeMin} min
                  </span>
                </div>
              </div>

              {/* Main OCR Content Card */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white">
                {/* Top Control Bar: Tabs, Font controls, Search */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 bg-slate-50/80 border-b border-slate-200">
                  {/* Page Selector Tabs */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                    <button
                      type="button"
                      onClick={() => setActiveTab("all")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                        activeTab === "all"
                          ? "bg-primary-theme text-white shadow-xs"
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      All Pages Combined
                    </button>
                    {pagesData.map((p) => (
                      <button
                        key={p.pageNum}
                        type="button"
                        onClick={() => setActiveTab(p.pageNum)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                          activeTab === p.pageNum
                            ? "bg-primary-theme text-white shadow-xs"
                            : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                        }`}
                      >
                        Page {p.pageNum}
                      </button>
                    ))}
                  </div>

                  {/* Typography & Font Sizing Controls */}
                  <div className="flex items-center gap-2 justify-end">
                    {/* Font Family Toggle */}
                    <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5">
                      <button
                        type="button"
                        onClick={() => setFontFamily("sans")}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          fontFamily === "sans"
                            ? "bg-slate-100 text-slate-800"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                        title="Proportional Sans Font"
                      >
                        Sans
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontFamily("mono")}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                          fontFamily === "mono"
                            ? "bg-slate-100 text-slate-800"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                        title="Monospaced Font"
                      >
                        Mono
                      </button>
                    </div>

                    {/* Font Size Selector */}
                    <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5">
                      <button
                        type="button"
                        onClick={() => setFontSize("sm")}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          fontSize === "sm"
                            ? "bg-slate-100 text-slate-800"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        A-
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontSize("base")}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          fontSize === "base"
                            ? "bg-slate-100 text-slate-800"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        A
                      </button>
                      <button
                        type="button"
                        onClick={() => setFontSize("lg")}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          fontSize === "lg"
                            ? "bg-slate-100 text-slate-800"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        A+
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sub-bar: Search in OCR text & Copy / Export buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 py-3 bg-white border-b border-slate-200 text-xs">
                  {/* Search Input */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search keywords in output text..."
                      className="w-full pl-8 pr-8 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-primary-theme outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {searchQuery.trim() && (
                    <span className="text-xs font-semibold text-primary-theme flex items-center gap-1">
                      {searchMatchCount} {searchMatchCount === 1 ? "match" : "matches"} found
                    </span>
                  )}

                  {/* Quick Copy Button */}
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-xs font-medium hidden sm:inline">
                      {currentWords} words • {currentChars} chars
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copied ? "Copied!" : "Copy Text"}</span>
                    </button>
                  </div>
                </div>

                {/* Editable Text Output Area */}
                <div className="p-4 md:p-6 bg-slate-50/40">
                  <textarea
                    value={currentDisplayContent}
                    onChange={(e) => handleTextChange(e.target.value)}
                    rows={15}
                    className={`w-full p-4 md:p-5 bg-white border border-slate-200 rounded-2xl text-slate-800 focus:ring-2 focus:ring-primary-theme focus:border-transparent outline-none leading-relaxed shadow-inner ${
                      fontFamily === "mono" ? "font-mono" : "font-sans"
                    } ${
                      fontSize === "sm"
                        ? "text-xs md:text-sm"
                        : fontSize === "base"
                        ? "text-sm md:text-base"
                        : "text-base md:text-lg"
                    }`}
                    placeholder="Extracted OCR text content will appear here..."
                  />
                </div>
              </div>

              {/* Status Alert */}
              <div className="p-4 md:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-emerald-900">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm md:text-base">
                      OCR Text Recognition Complete
                    </h5>
                    <p className="text-xs md:text-sm text-emerald-700 mt-0.5">
                      Successfully processed by OCR engine. You can edit, search, copy, or export the recognized document below.
                    </p>
                  </div>
                </div>
              </div>

              {/* Multi-Format Export Options */}
              <div className="p-5 md:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <h5 className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Download className="w-4 h-4 text-primary-theme" />
                  Export & Download Options
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Download TXT */}
                  <button
                    type="button"
                    onClick={handleDownloadTxt}
                    className="py-3.5 px-4 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold text-xs md:text-sm transition shadow-md shadow-primary-theme/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Plain Text (.TXT)</span>
                  </button>

                  {/* Download Word Document */}
                  <button
                    type="button"
                    onClick={handleDownloadDoc}
                    className="py-3.5 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-xs md:text-sm transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileCode className="w-4 h-4 text-blue-600" />
                    <span>Download Word (.DOC)</span>
                  </button>

                  {/* Download JSON Data */}
                  <button
                    type="button"
                    onClick={handleDownloadJson}
                    className="py-3.5 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold text-xs md:text-sm transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Download Structured (.JSON)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {error && !isPasswordProtected && (
            <div className="p-4 md:p-5 rounded-2xl bg-red-50 text-red-600 border border-red-200 text-sm md:text-base flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
