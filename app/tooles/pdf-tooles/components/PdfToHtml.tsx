"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  UploadCloud,
  FileCode,
  Download,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Eye,
  Code2,
  Sparkles,
  RefreshCw,
  ExternalLink,
  Laptop,
  Smartphone,
  Tablet,
  Lock,
  ArrowRight,
  ShieldAlert,
  Layers,
  FileText,
  FileCheck,
} from "lucide-react";
import apiClient, { extractApiErrorMessage } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";

type PreviewDevice = "desktop" | "tablet" | "mobile";

export default function PdfToHtml() {
  const [file, setFile] = useState<File | null>(null);
  const [htmlCode, setHtmlCode] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>("desktop");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Client-side fallback text-to-HTML conversion if backend is unavailable
   */
  const fallbackClientPdfToHtml = async (uploadedFile: File): Promise<{ html: string; pages: number }> => {
    try {
      const pdfjs = await import("pdfjs-dist");
      if (typeof window !== "undefined") {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      }

      const arrayBuffer = await uploadedFile.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer.slice(0) });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;
      const pageSections: string[] = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const textContent = await page.getTextContent();
        let pageStr = "";
        let lastY: number | null = null;

        for (const item of textContent.items as any[]) {
          if ("str" in item) {
            const currentY = item.transform ? item.transform[5] : null;
            if (lastY !== null && currentY !== null && Math.abs(currentY - lastY) > 6) {
              pageStr += "\n";
            } else if (pageStr.length > 0 && !pageStr.endsWith("\n") && !pageStr.endsWith(" ") && item.str.trim()) {
              pageStr += " ";
            }
            pageStr += item.str;
            lastY = currentY;
          }
        }

        const paragraphs = pageStr
          .split("\n\n")
          .map((p) => p.trim())
          .filter((p) => p.length > 0);

        const pageHtml = paragraphs.map((p) => `<p>${p.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>`).join("\n      ");
        pageSections.push(`
    <section class="pdf-page" id="page-${pageNum}" data-page="${pageNum}">
      <div class="page-header">Page ${pageNum} of ${numPages}</div>
      ${pageHtml || "<p><em>[No selectable text detected on this page]</em></p>"}
    </section>`);
      }

      const docTitle = uploadedFile.name.replace(/\.pdf$/i, "");
      const generatedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${docTitle} - Converted HTML</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 32px 16px;
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.6;
    }
    .container {
      max-width: 850px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .doc-header {
      background: #ffffff;
      padding: 24px 32px;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      border: 1px solid #e2e8f0;
    }
    h1 {
      margin: 0 0 8px 0;
      color: #0f172a;
      font-size: 24px;
      font-weight: 700;
    }
    .doc-meta {
      font-size: 13px;
      color: #64748b;
    }
    .pdf-page {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      padding: 36px;
      border: 1px solid #e2e8f0;
    }
    .page-header {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 8px;
      margin-bottom: 20px;
    }
    p {
      margin: 0 0 16px 0;
      font-size: 15px;
      color: #334155;
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="doc-header">
      <h1>${docTitle}</h1>
      <div class="doc-meta">Total Pages: ${numPages} • Converted with PDF Tools</div>
    </header>
    ${pageSections.join("\n")}
  </div>
</body>
</html>`;

      return { html: generatedHtml, pages: numPages };
    } catch (err: any) {
      if (err?.message?.toLowerCase().includes("password") || err?.name === "PasswordException") {
        throw new Error("PASSWORD_PROTECTED");
      }
      throw err;
    }
  };

  /**
   * Main PDF to HTML converter calling FastAPI backend
   */
  const convertPdfToHtml = async (uploadedFile: File) => {
    try {
      setIsConverting(true);
      setError(null);
      setIsPasswordProtected(false);
      setFile(uploadedFile);

      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("engine", "pymupdf");

      const response = await apiClient.post(API_ENDPOINTS.PDF.PDFTOHTML, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "text",
      });

      let convertedHtml = "";
      if (typeof response.data === "string") {
        convertedHtml = response.data;
      } else if (response.data instanceof Blob) {
        convertedHtml = await (response.data as Blob).text();
      }

      if (!convertedHtml || convertedHtml.trim().length === 0) {
        throw new Error("Server returned empty HTML content.");
      }

      // Check header page count if provided by FastAPI backend
      const totalPagesHeader = response.headers ? response.headers["x-total-pages"] : null;
      if (totalPagesHeader) {
        setTotalPages(parseInt(totalPagesHeader, 10) || 1);
      } else {
        const pageMatches = convertedHtml.match(/class=["']pdf-page["']/g);
        setTotalPages(pageMatches ? pageMatches.length : 1);
      }

      setHtmlCode(convertedHtml);
    } catch (apiErr: any) {
      console.warn("Backend PDF-to-HTML API error, running client-side fallback:", apiErr);

      const errMsg =
        apiErr?.response?.data?.detail ||
        apiErr?.response?.data?.message ||
        apiErr?.message ||
        "";

      if (
        typeof errMsg === "string" &&
        (errMsg.toLowerCase().includes("password") || errMsg.toLowerCase().includes("encrypted"))
      ) {
        setIsPasswordProtected(true);
        setError("This PDF is password-protected. Please unlock it before converting to HTML.");
        return;
      }

      // Run client-side fallback
      try {
        const clientResult = await fallbackClientPdfToHtml(uploadedFile);
        setHtmlCode(clientResult.html);
        setTotalPages(clientResult.pages);
      } catch (fallbackErr: any) {
        if (fallbackErr.message === "PASSWORD_PROTECTED") {
          setIsPasswordProtected(true);
          setError("This PDF is password-protected. Please unlock it before converting to HTML.");
        } else {
          const message = await extractApiErrorMessage(
            apiErr,
            "Failed to convert PDF document to HTML."
          );
          setError(message);
        }
      }
    } finally {
      setIsConverting(false);
    }
  };

  const handleFile = async (uploadedFile: File | undefined) => {
    if (!uploadedFile) return;
    if (!uploadedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a valid PDF document.");
      setIsPasswordProtected(false);
      return;
    }

    await convertPdfToHtml(uploadedFile);
  };

  const handleCopy = () => {
    if (!htmlCode) return;
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!file || !htmlCode) return;
    const blob = new Blob([htmlCode], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name.replace(/\.pdf$/i, "")}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOpenInNewTab = () => {
    if (!htmlCode) return;
    const blob = new Blob([htmlCode], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const reset = () => {
    setFile(null);
    setHtmlCode("");
    setTotalPages(1);
    setError(null);
    setIsPasswordProtected(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const htmlSizeBytes = new Blob([htmlCode]).size;
  const htmlSizeKb = (htmlSizeBytes / 1024).toFixed(1);
  const lineCount = htmlCode ? htmlCode.split("\n").length : 0;
  const wordCount = htmlCode
    ? htmlCode
        .replace(/<[^>]*>/g, " ")
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0).length
    : 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-theme/10 text-primary-theme text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          PDF to HTML Web Converter
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
          Convert PDF to Responsive HTML
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-2 leading-relaxed">
          Transform your PDF documents into standalone, responsive HTML5 web pages with preserved layout, inline typography, and live code inspection.
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
            Fast neural conversion • Clean responsive HTML5 markup
          </p>
        </div>
      ) : isPasswordProtected ? (
        /* Password-Protected Security Banner */
        <div className="p-6 md:p-8 rounded-3xl bg-amber-50/80 border border-amber-200 text-amber-900 text-center space-y-5 max-w-xl mx-auto my-2 animate-in fade-in">
          <div className="w-16 h-16 bg-amber-100 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto text-amber-700 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg md:text-2xl font-bold text-amber-950">
              This PDF is Password-Protected
            </h4>
            <p className="text-xs md:text-sm text-amber-800 leading-relaxed max-w-md mx-auto">
              <span className="font-semibold text-slate-900">{file.name}</span> is protected with password encryption. Please unlock the file before converting to HTML.
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
                <FileCode className="w-6 h-6 md:w-7 md:h-7" />
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
                onClick={() => file && convertPdfToHtml(file)}
                disabled={isConverting}
                className="text-xs md:text-sm font-semibold text-slate-600 hover:text-primary-theme px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isConverting ? "animate-spin" : ""}`} />
                <span>Re-convert</span>
              </button>
              <button
                onClick={reset}
                className="text-xs md:text-sm font-semibold text-red-500 hover:text-red-600 hover:underline px-2 py-1 cursor-pointer transition-colors"
              >
                Change PDF
              </button>
            </div>
          </div>

          {isConverting ? (
            <div className="py-16 md:py-20 flex flex-col items-center justify-center gap-3.5 text-slate-600 bg-slate-50/50 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 border-3 border-primary-theme border-t-transparent rounded-full animate-spin" />
              <div className="text-center space-y-1">
                <p className="text-base font-bold text-slate-800">
                  Converting PDF to HTML5 Markup...
                </p>
                <p className="text-xs md:text-sm text-slate-500">
                  Parsing layout geometry, typography weights, and responsive document styling
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Quick Analytics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider block">
                    HTML Output Size
                  </span>
                  <span className="text-lg md:text-xl font-bold text-slate-800 mt-1 block">
                    {htmlSizeKb} KB
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider block">
                    HTML Lines
                  </span>
                  <span className="text-lg md:text-xl font-bold text-slate-800 mt-1 block">
                    {lineCount.toLocaleString()}
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider block">
                    Total Words
                  </span>
                  <span className="text-lg md:text-xl font-bold text-slate-800 mt-1 block">
                    {wordCount.toLocaleString()}
                  </span>
                </div>

                <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                  <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider block">
                    Pages Converted
                  </span>
                  <span className="text-lg md:text-xl font-bold text-slate-800 mt-1 block">
                    {totalPages}
                  </span>
                </div>
              </div>

              {/* Main Viewer Card */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white">
                {/* Control Toolbar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-slate-50/80 border-b border-slate-200">
                  {/* View Tabs: Preview vs Code */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setActiveTab("preview")}
                      className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition inline-flex items-center gap-2 cursor-pointer ${
                        activeTab === "preview"
                          ? "bg-primary-theme text-white shadow-xs"
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                      <span>Live HTML Preview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("code")}
                      className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition inline-flex items-center gap-2 cursor-pointer ${
                        activeTab === "code"
                          ? "bg-primary-theme text-white shadow-xs"
                          : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      <Code2 className="w-4 h-4" />
                      <span>HTML Source Code</span>
                    </button>
                  </div>

                  {/* Right Actions: Device switcher & Quick Tools */}
                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    {activeTab === "preview" && (
                      <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-xs">
                        <button
                          type="button"
                          onClick={() => setPreviewDevice("desktop")}
                          className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                            previewDevice === "desktop"
                              ? "bg-slate-100 text-primary-theme"
                              : "text-slate-400 hover:text-slate-600"
                          }`}
                          title="Desktop View (Full Width)"
                        >
                          <Laptop className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewDevice("tablet")}
                          className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                            previewDevice === "tablet"
                              ? "bg-slate-100 text-primary-theme"
                              : "text-slate-400 hover:text-slate-600"
                          }`}
                          title="Tablet View (768px)"
                        >
                          <Tablet className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewDevice("mobile")}
                          className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                            previewDevice === "mobile"
                              ? "bg-slate-100 text-primary-theme"
                              : "text-slate-400 hover:text-slate-600"
                          }`}
                          title="Mobile View (375px)"
                        >
                          <Smartphone className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleOpenInNewTab}
                      className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs font-bold transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                      title="Open HTML in a standalone browser tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-primary-theme" />
                      <span className="hidden sm:inline">Open New Tab</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopy}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>{copied ? "Copied!" : "Copy Code"}</span>
                    </button>
                  </div>
                </div>

                {/* Content View Area */}
                <div className="p-4 md:p-6 bg-slate-100/60 min-h-[440px] flex items-center justify-center">
                  {activeTab === "preview" ? (
                    <div
                      className={`transition-all duration-300 mx-auto w-full bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden ${
                        previewDevice === "mobile"
                          ? "max-w-sm h-[560px]"
                          : previewDevice === "tablet"
                          ? "max-w-2xl h-[560px]"
                          : "max-w-5xl h-[560px]"
                      }`}
                    >
                      <iframe
                        srcDoc={htmlCode}
                        title="Converted PDF HTML Preview"
                        className="w-full h-full border-0 bg-white"
                        sandbox="allow-same-origin allow-scripts"
                      />
                    </div>
                  ) : (
                    <div className="w-full relative">
                      <div className="flex items-center justify-between pb-2 px-1 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">HTML5 Code Editor</span>
                        <span>{lineCount} lines • {htmlSizeKb} KB</span>
                      </div>
                      <textarea
                        value={htmlCode}
                        onChange={(e) => setHtmlCode(e.target.value)}
                        rows={18}
                        className="w-full p-5 bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl text-xs md:text-sm font-mono leading-relaxed focus:ring-2 focus:ring-primary-theme outline-none shadow-inner"
                        placeholder="Generated HTML5 markup..."
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Status Alert */}
              <div className="p-4 md:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-emerald-900">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-sm md:text-base">PDF Converted to HTML Successfully</h5>
                    <p className="text-xs md:text-sm text-emerald-700 mt-0.5">
                      Standalone web document generated with responsive styling and typography. Ready for download or web deployment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Download Action Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 py-4 px-6 rounded-2xl bg-primary-theme hover:opacity-90 text-white font-bold text-sm md:text-base transition shadow-md shadow-primary-theme/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Download .HTML Webpage</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenInNewTab}
                  className="py-4 px-6 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-sm md:text-base transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-5 h-5 text-primary-theme" />
                  <span>Preview Fullscreen</span>
                </button>
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
