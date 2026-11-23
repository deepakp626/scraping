"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  UploadCloud,
  FileText,
  Download,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
  FileCode,
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  RemoveFormatting,
} from "lucide-react";
import { Link as LinkIcon, Unlink } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import Link from '@tiptap/extension-link'
import StarterKit from "@tiptap/starter-kit";
import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [wordBlob, setWordBlob] = useState<Blob | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setLink = () => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('Enter URL:', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  // Initialize TipTap Editor
  const editor = useEditor({
    extensions: [StarterKit,
      Link.configure({
        openOnClick: false, // Prevents links from opening immediately when clicking them to edit
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer", // Optional styling classes
        },
      }),
    ],
    content: "<p>Extracted PDF document text will appear here...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[260px] text-slate-800 text-sm leading-relaxed",
      },
    },
    onUpdate: ({ editor }) => {
      setExtractedText(editor.getText());
    },
    immediatelyRender: false, // Prevents server-side rendering
  });

  // Update editor content when extraction finishes or changes
  useEffect(() => {
    if (editor && extractedText) {
      const htmlContent = extractedText
        .split("\n\n")
        .filter((block) => block.trim().length > 0)
        .map((block) => `<p>${block.replace(/\n/g, "<br/>")}</p>`)
        .join("");

      if (editor.getHTML() !== htmlContent && htmlContent) {
        editor.commands.setContent(htmlContent);
      }
    }
  }, [extractedText, editor]);

  /**
   * Accurate text extraction using pdfjs-dist
   */
  const extractPdfText = async (pdfFile: File): Promise<string> => {
    try {
      const pdfjs = await import("pdfjs-dist");
      if (typeof window !== "undefined") {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
      }

      const arrayBuffer = await pdfFile.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;

      const pageTexts: string[] = [];

      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const textContent = await page.getTextContent();

        let pageStr = "";
        let lastY: number | null = null;

        for (const item of textContent.items as any[]) {
          if ("str" in item) {
            const currentY = item.transform ? item.transform[5] : null;
            if (lastY !== null && currentY !== null && Math.abs(currentY - lastY) > 5) {
              pageStr += "\n";
            } else if (pageStr.length > 0 && !pageStr.endsWith("\n") && !pageStr.endsWith(" ") && item.str.trim()) {
              pageStr += " ";
            }

            pageStr += item.str;
            lastY = currentY;
          }
        }

        if (pageStr.trim()) {
          pageTexts.push(pageStr.trim());
        }
      }

      if (pageTexts.length > 0) {
        return pageTexts.join("\n\n");
      }

      return `Document: ${pdfFile.name}\n\n[No selectable text found. This PDF may contain scanned images.]`;
    } catch (err) {
      console.warn("pdfjs extraction fallback:", err);
      return `Document: ${pdfFile.name}\n\n[Text extracted from ${pdfFile.name}]`;
    }
  };

  const convertPdfToWord = async (selectedFile: File) => {
    try {
      setIsConverting(true);
      setError(null);
      setWordBlob(null);

      const accurateText = await extractPdfText(selectedFile);
      setExtractedText(accurateText);

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await apiClient.post(API_ENDPOINTS.PDF.CONVERT_TO_WORD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      const contentTypeHeader = response.headers ? response.headers["content-type"] : "";
      const contentType = String(contentTypeHeader || "");

      if (contentType.includes("application/json")) {
        const textData = await (response.data as Blob).text();
        const json = JSON.parse(textData);
        if (json.text) {
          setExtractedText(json.text);
        }
      } else {
        const blob = new Blob([response.data], {
          type: contentType || "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        setWordBlob(blob);
      }
    } catch (err: any) {
      console.error("PDF to Word API Error:", err);

      let message = "Converted text locally. You can format, edit and download your Word file below.";
      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const json = JSON.parse(text);
          message = json.detail || json.message || message;
        } catch { }
      } else if (err.response?.data?.detail) {
        message = err.response.data.detail;
      } else if (err.message && !err.message.includes("Network Error")) {
        message = err.message;
      }

      setError(message);
    } finally {
      setIsConverting(false);
    }
  };

  const handleFile = async (uploadedFile: File | undefined) => {
    if (!uploadedFile) return;
    if (!uploadedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please upload a valid PDF document.");
      return;
    }

    setFile(uploadedFile);
    await convertPdfToWord(uploadedFile);
  };

  const handleDownloadDoc = () => {
    if (!file) return;

    if (wordBlob) {
      const url = URL.createObjectURL(wordBlob);
      const a = document.createElement("a");
      a.href = url;
      const isDocx = wordBlob.type.includes("wordprocessingml") || wordBlob.type.includes("docx");
      a.download = `${file.name.replace(/\.pdf$/i, "")}.${isDocx ? "docx" : "doc"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return;
    }

    const contentHtml = editor ? editor.getHTML() : extractedText;

    const wordContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${file.name.replace(/\.pdf$/i, "")}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page { size: 8.5in 11.0in; margin: 1.0in; }
          body { font-family: 'Calibri', 'Segoe UI', Arial, sans-serif; font-size: 11pt; line-height: 1.6; color: #1a202c; }
          h1 { font-size: 18pt; font-weight: bold; color: #1e3a8a; margin-bottom: 14pt; }
          h2 { font-size: 14pt; font-weight: bold; color: #1e293b; margin-bottom: 10pt; }
          p { margin-bottom: 10pt; text-align: justify; }
          ul, ol { margin-left: 20pt; margin-bottom: 10pt; }
        </style>
      </head>
      <body>
        <h1>${file.name.replace(/\.pdf$/i, "")}</h1>
        ${contentHtml}
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff" + wordContent], {
      type: "application/msword;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name.replace(/\.pdf$/i, "")}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (editor) {
      navigator.clipboard.writeText(editor.getText());
    } else {
      navigator.clipboard.writeText(extractedText);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setFile(null);
    setExtractedText("");
    setWordBlob(null);
    setError(null);
    if (editor) editor.commands.clearContent();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const wordCount = extractedText.trim() ? extractedText.trim().split(/\s+/).length : 0;
  const charCount = extractedText.length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-slate-800">PDF to Word Converter</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1">
          Convert PDF documents into editable Microsoft Word (.docx / .doc) files with instant rich-text preview.
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
          className="border-2 border-dashed border-slate-300 hover:border-primary-theme rounded-2xl p-10 text-center cursor-pointer transition-colors bg-slate-50 flex flex-col items-center justify-center group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="p-4 bg-white rounded-full shadow-sm text-primary-theme group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">
            Click to upload or drag and drop a PDF
          </p>
          <p className="text-xs text-slate-400 mt-1">Extracts clean text, paragraphs, and multi-page layouts</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Header Bar */}
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-primary-theme rounded-xl border border-blue-100">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm truncate max-w-xs">{file.name}</h4>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => file && convertPdfToWord(file)}
                disabled={isConverting}
                className="text-xs md:text-sm font-semibold text-slate-600 hover:text-primary-theme px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-white transition flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isConverting ? "animate-spin" : ""}`} />
                <span>Re-convert</span>
              </button>
              <button
                onClick={reset}
                className="text-xs md:text-sm font-semibold text-red-500 hover:underline px-2.5 py-1.5 cursor-pointer"
              >
                Change PDF
              </button>
            </div>
          </div>

          {isConverting ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-600 bg-slate-50/50 rounded-2xl border border-slate-200">
              <div className="w-9 h-9 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <div className="text-center">
                <p className="text-sm font-bold text-slate-800">Extracting & Converting PDF to Word...</p>
                <p className="text-xs text-slate-500 mt-0.5">Processing document layout, lines, and typography</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Word Document Editor Box with TipTap */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white relative">
                {/* Floating TipTap Popover / BubbleMenu when text is selected */}
                {editor && (
                  <BubbleMenu
                    editor={editor}
                    className="flex items-center gap-1 p-1 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-700/60 z-50 backdrop-blur-md animate-in fade-in zoom-in-95"
                  >
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${editor.isActive("bold") ? "bg-primary-theme text-white font-bold" : "text-slate-200"
                        }`}
                      title="Bold"
                    >
                      <Bold className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={setLink}
                      className={`p-1.5 rounded hover:bg-slate-200 transition ${editor?.isActive("link") ? "bg-slate-300 text-primary-theme font-bold" : ""
                        }`}
                      title="Insert Link"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleItalic().run()}
                      className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${editor.isActive("italic") ? "bg-primary-theme text-white font-bold" : "text-slate-200"
                        }`}
                      title="Italic"
                    >
                      <Italic className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleStrike().run()}
                      className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${editor.isActive("strike") ? "bg-primary-theme text-white font-bold" : "text-slate-200"
                        }`}
                      title="Strikethrough"
                    >
                      <Strikethrough className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleCode().run()}
                      className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${editor.isActive("code") ? "bg-primary-theme text-white font-bold" : "text-slate-200"
                        }`}
                      title="Code"
                    >
                      <Code className="w-3.5 h-3.5" />
                    </button>
                    <div className="h-4 w-[1px] bg-slate-700 mx-0.5" />
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                      className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${editor.isActive("heading", { level: 1 })
                          ? "bg-primary-theme text-white font-bold"
                          : "text-slate-200"
                        }`}
                      title="Heading 1"
                    >
                      <Heading1 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${editor.isActive("heading", { level: 2 })
                          ? "bg-primary-theme text-white font-bold"
                          : "text-slate-200"
                        }`}
                      title="Heading 2"
                    >
                      <Heading2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleBulletList().run()}
                      className={`p-1.5 rounded-lg hover:bg-slate-800 transition ${editor.isActive("bulletList")
                          ? "bg-primary-theme text-white font-bold"
                          : "text-slate-200"
                        }`}
                      title="Bullet List"
                    >
                      <List className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                      className="p-1.5 rounded-lg hover:bg-slate-800 transition text-slate-300"
                      title="Clear Formatting"
                    >
                      <RemoveFormatting className="w-3.5 h-3.5" />
                    </button>
                  </BubbleMenu>
                )}

                {/* Toolbar Header & TipTap formatting actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-slate-100/90 border-b border-slate-200 text-xs text-slate-600">
                  <div className="flex items-center gap-2 font-medium">
                    <span className="inline-flex items-center gap-1 bg-primary-theme text-white px-2.5 py-0.5 rounded-md font-bold text-[11px]">
                      <FileCode className="w-3 h-3" />
                      DOCX
                    </span>
                    <span className="text-slate-500">{wordCount} words</span>
                    <span>•</span>
                    <span className="text-slate-500">{charCount} chars</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className={`p-1.5 rounded hover:bg-slate-200 cursor-pointer ${editor?.isActive("bold") ? "bg-slate-300 text-primary-theme" : ""
                        }`}
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={setLink}
                      className={`p-1.5 rounded hover:bg-slate-200 transition ${editor?.isActive("link") ? "bg-slate-300 text-primary-theme font-bold" : ""
                        }`}
                      title="Insert Link"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => editor?.chain().focus().toggleItalic().run()}
                      className={`p-1.5 rounded hover:bg-slate-200 cursor-pointer ${editor?.isActive("italic") ? "bg-slate-300 text-primary-theme" : ""
                        }`}
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                      className={`p-1.5 rounded hover:bg-slate-200 cursor-pointer ${editor?.isActive("heading", { level: 1 }) ? "bg-slate-300 text-primary-theme" : ""
                        }`}
                      title="Heading 1"
                    >
                      <Heading1 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={`p-1.5 rounded hover:bg-slate-200 cursor-pointer ${editor?.isActive("heading", { level: 2 }) ? "bg-slate-300 text-primary-theme" : ""
                        }`}
                      title="Heading 2"
                    >
                      <Heading2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => editor?.chain().focus().toggleBulletList().run()}
                      className={`p-1.5 rounded hover:bg-slate-200 cursor-pointer ${editor?.isActive("bulletList") ? "bg-slate-300 text-primary-theme" : ""
                        }`}
                      title="Bullet List"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                      className={`p-1.5 rounded hover:bg-slate-200 cursor-pointer ${editor?.isActive("orderedList") ? "bg-slate-300 text-primary-theme" : ""
                        }`}
                      title="Numbered List"
                    >
                      <ListOrdered className="w-4 h-4" />
                    </button>

                    <div className="h-4 w-[1px] bg-slate-300 mx-1" />

                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-semibold transition cursor-pointer shadow-xs"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                {/* TipTap Simulation Sheet */}
                <div className="p-4 md:p-6 bg-slate-100/50">
                  <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-8 shadow-sm">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                      <span className="text-xs font-semibold text-slate-400">Microsoft Word Document View</span>
                      <span className="text-[11px] text-primary-theme font-medium bg-blue-50 px-2 py-0.5 rounded">
                        Select text for Quick Popover
                      </span>
                    </div>

                    <EditorContent editor={editor} />
                  </div>
                </div>
              </div>

              {/* Status Alert */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-emerald-900">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Converted to Word Document</p>
                    <p className="text-xs text-emerald-700">
                      You can format text using the selection popover or toolbar and download your Word file.
                    </p>
                  </div>
                </div>
              </div>

              {/* Download Action Button */}
              <button
                onClick={handleDownloadDoc}
                className="w-full py-3.5 px-6 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold transition shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>Download Word Document (.doc / .docx)</span>
              </button>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-xs text-amber-900">Notice</p>
                <p className="text-xs text-amber-700 mt-0.5">{error}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}