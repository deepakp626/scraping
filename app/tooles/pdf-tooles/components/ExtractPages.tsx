"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";
import {
  UploadCloud,
  FileDown,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  Check,
  Layers,
  Sparkles,
  Lock,
  ArrowRight,
  ShieldAlert,
  Loader2,
} from "lucide-react";

export default function ExtractPages() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagesToExtractInput, setPagesToExtractInput] = useState<string>("1");
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set([1]));
  const [pageThumbnails, setPageThumbnails] = useState<Record<number, string>>({});
  const [isLoadingThumbnails, setIsLoadingThumbnails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedBlobUrl, setExtractedBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateThumbnails = async (arrayBuffer: ArrayBuffer, total: number) => {
    try {
      setIsLoadingThumbnails(true);
      const pdfjs = await import("pdfjs-dist");
      if (typeof window !== "undefined") {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      }

      const loadingTask = pdfjs.getDocument({ data: arrayBuffer.slice(0) });
      const pdfDoc = await loadingTask.promise;
      const thumbs: Record<number, string> = {};

      const limit = Math.min(total, 60);
      for (let pageNum = 1; pageNum <= limit; pageNum++) {
        try {
          const page = await pdfDoc.getPage(pageNum);
          const viewport = page.getViewport({ scale: 0.6 });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (ctx) {
            canvas.width = Math.floor(viewport.width);
            canvas.height = Math.floor(viewport.height);
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            await (page.render({ canvasContext: ctx, viewport, canvas } as any)).promise;
            thumbs[pageNum] = canvas.toDataURL("image/jpeg", 0.85);
          }
        } catch (pageErr) {
          console.warn(`Could not render thumbnail for page ${pageNum}`, pageErr);
        }
      }
      setPageThumbnails(thumbs);
    } catch (err) {
      console.warn("PDF.js thumbnail extraction fallback", err);
    } finally {
      setIsLoadingThumbnails(false);
    }
  };

  const handleFile = async (uploadedFile: File | undefined) => {
    if (!uploadedFile) return;
    if (!uploadedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a valid PDF document.");
      setIsPasswordProtected(false);
      return;
    }

    try {
      setError(null);
      setIsPasswordProtected(false);
      if (extractedBlobUrl) URL.revokeObjectURL(extractedBlobUrl);
      setExtractedBlobUrl(null);
      setPageThumbnails({});

      const arrayBuffer = await uploadedFile.arrayBuffer();
      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(arrayBuffer);
      } catch (loadErr: any) {
        const errMsg = loadErr?.message?.toLowerCase() || "";
        if (
          errMsg.includes("encrypt") ||
          errMsg.includes("password") ||
          loadErr?.name === "EncryptedPDFError"
        ) {
          setIsPasswordProtected(true);
          setFile(uploadedFile);
          setError("This PDF is encrypted with a password. Please unlock it before extracting pages.");
          return;
        }
        throw loadErr;
      }

      const count = pdfDoc.getPageCount();
      setFile(uploadedFile);
      setTotalPages(count);

      const initialSelected = count > 1 ? new Set([1, 2]) : new Set([1]);
      setSelectedPages(initialSelected);
      setPagesToExtractInput(count > 1 ? "1-2" : "1");

      generateThumbnails(arrayBuffer, count);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load PDF. The file may be corrupted.");
    }
  };

  const invalidateBlob = () => {
    if (extractedBlobUrl) {
      URL.revokeObjectURL(extractedBlobUrl);
      setExtractedBlobUrl(null);
    }
  };

  const parseInputToSet = (str: string, max: number): Set<number> => {
    const selected = new Set<number>();
    const parts = str.split(",").map((s) => s.trim());

    for (const part of parts) {
      if (part.includes("-")) {
        const [startStr, endStr] = part.split("-").map((s) => parseInt(s.trim(), 10));
        if (!isNaN(startStr) && !isNaN(endStr)) {
          const start = Math.max(1, Math.min(startStr, endStr));
          const end = Math.min(max, Math.max(startStr, endStr));
          for (let i = start; i <= end; i++) {
            selected.add(i);
          }
        }
      } else {
        const num = parseInt(part, 10);
        if (!isNaN(num) && num >= 1 && num <= max) {
          selected.add(num);
        }
      }
    }
    return selected;
  };

  const setToString = (set: Set<number>): string => {
    return Array.from(set)
      .sort((a, b) => a - b)
      .join(", ");
  };

  const handleInputChange = (val: string) => {
    setPagesToExtractInput(val);
    invalidateBlob();
    if (totalPages > 0) {
      const parsedSet = parseInputToSet(val, totalPages);
      setSelectedPages(parsedSet);
    }
  };

  const togglePageSelection = (pageNum: number) => {
    invalidateBlob();
    setSelectedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageNum)) {
        next.delete(pageNum);
      } else {
        next.add(pageNum);
      }
      setPagesToExtractInput(setToString(next));
      return next;
    });
  };

  const applyPreset = (type: "all" | "first" | "odd" | "even" | "clear") => {
    invalidateBlob();
    let newSet = new Set<number>();
    if (type === "all") {
      newSet = new Set(Array.from({ length: totalPages }, (_, i) => i + 1));
    } else if (type === "first") {
      newSet = new Set([1]);
    } else if (type === "odd") {
      newSet = new Set(Array.from({ length: totalPages }, (_, i) => i + 1).filter((n) => n % 2 !== 0));
    } else if (type === "even") {
      newSet = new Set(Array.from({ length: totalPages }, (_, i) => i + 1).filter((n) => n % 2 === 0));
    } else if (type === "clear") {
      newSet = new Set();
    }
    setSelectedPages(newSet);
    setPagesToExtractInput(setToString(newSet));
  };

  const handleExtract = async () => {
    if (!file || totalPages === 0) return;

    try {
      setIsProcessing(true);
      setError(null);

      const extractIndices = Array.from(selectedPages)
        .sort((a, b) => a - b)
        .map((p) => p - 1);

      if (extractIndices.length === 0) {
        throw new Error("Please select at least one page to extract.");
      }

      const arrayBuffer = await file.arrayBuffer();
      let srcPdf;
      try {
        srcPdf = await PDFDocument.load(arrayBuffer);
      } catch (loadErr: any) {
        const errMsg = loadErr?.message?.toLowerCase() || "";
        if (
          errMsg.includes("encrypt") ||
          errMsg.includes("password") ||
          loadErr?.name === "EncryptedPDFError"
        ) {
          setIsPasswordProtected(true);
          throw new Error("This PDF is password-protected and cannot be extracted without unlocking it first.");
        }
        throw loadErr;
      }

      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(srcPdf, extractIndices);
      copiedPages.forEach((p) => newPdf.addPage(p));

      const newBytes = await newPdf.save();
      const blob = new Blob([newBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setExtractedBlobUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to extract pages.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!extractedBlobUrl || !file) return;
    const a = document.createElement("a");
    a.href = extractedBlobUrl;
    a.download = `extracted_${selectedPages.size}pages_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    if (extractedBlobUrl) URL.revokeObjectURL(extractedBlobUrl);
    setFile(null);
    setTotalPages(0);
    setPagesToExtractInput("");
    setSelectedPages(new Set());
    setPageThumbnails({});
    setExtractedBlobUrl(null);
    setError(null);
    setIsPasswordProtected(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
          Extract PDF Pages
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-2 leading-relaxed">
          Select specific pages from your PDF with visual page thumbnails and save them into a new document.
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
            Extract any pages or custom ranges instantly
          </p>
        </div>
      ) : isPasswordProtected ? (
        /* Password-Protected Error Banner */
        <div className="p-6 md:p-8 rounded-3xl bg-amber-50/80 border border-amber-200 text-amber-900 text-center space-y-5 max-w-xl mx-auto my-2 animate-in fade-in">
          <div className="w-16 h-16 bg-amber-100 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto text-amber-700 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg md:text-2xl font-bold text-amber-950">
              This PDF is Password-Protected
            </h4>
            <p className="text-xs md:text-sm text-amber-800 leading-relaxed max-w-md mx-auto">
              <span className="font-semibold text-slate-900">{file.name}</span> is protected with security encryption. Please unlock the document before extracting pages.
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
            <button
              onClick={reset}
              className="text-xs md:text-sm font-semibold text-red-500 hover:text-red-600 hover:underline px-2 py-1 cursor-pointer transition-colors"
            >
              Change File
            </button>
          </div>

          {/* Configuration & Visual Page Selection Box */}
          <div className="p-5 md:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                <FileDown className="w-4 h-4 text-primary-theme" />
                Pages to Extract (1 to {totalPages})
              </label>
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <span className="text-primary-theme font-bold bg-primary-theme/10 border border-primary-theme/20 px-2.5 py-1 rounded-lg">
                  Selected: {selectedPages.size} of {totalPages} pages
                </span>
              </div>
            </div>

            {/* Input for custom range */}
            <input
              type="text"
              value={pagesToExtractInput}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={`e.g. 1, 3, 5-${Math.min(totalPages, 8)}`}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm md:text-base font-semibold text-slate-800 focus:ring-2 focus:ring-primary-theme outline-none shadow-xs"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-medium">Quick select:</span>
              <button
                type="button"
                onClick={() => applyPreset("all")}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-primary-theme hover:text-primary-theme transition-colors cursor-pointer"
              >
                All Pages
              </button>
              <button
                type="button"
                onClick={() => applyPreset("first")}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-primary-theme hover:text-primary-theme transition-colors cursor-pointer"
              >
                First Page Only
              </button>
              <button
                type="button"
                onClick={() => applyPreset("odd")}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-primary-theme hover:text-primary-theme transition-colors cursor-pointer"
              >
                All Odd Pages
              </button>
              <button
                type="button"
                onClick={() => applyPreset("even")}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-primary-theme hover:text-primary-theme transition-colors cursor-pointer"
              >
                All Even Pages
              </button>
              <button
                type="button"
                onClick={() => applyPreset("clear")}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-500 hover:border-slate-300 transition-colors cursor-pointer"
              >
                Clear Selection
              </button>
            </div>

            {/* Visual Page Thumbnails Grid with next/image */}
            <div className="pt-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-primary-theme" />
                  Click any page thumbnail to extract:
                </span>
                {isLoadingThumbnails && (
                  <span className="inline-flex items-center gap-1 text-xs text-primary-theme font-medium animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Rendering preview thumbnails...
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 max-h-96 overflow-y-auto p-3.5 bg-white border border-slate-200 rounded-2xl">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isSelected = selectedPages.has(pageNum);
                  const thumb = pageThumbnails[pageNum];

                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => togglePageSelection(pageNum)}
                      className={`group relative rounded-2xl border-2 p-2 flex flex-col items-center gap-2 transition-all cursor-pointer select-none text-left ${
                        isSelected
                          ? "border-primary-theme bg-primary-theme/5 shadow-xs ring-2 ring-primary-theme/20"
                          : "border-slate-200 bg-slate-50/60 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {/* Top Header inside page box */}
                      <div className="w-full flex justify-between items-center px-1">
                        <span className="text-xs font-bold text-slate-700">Page {pageNum}</span>
                        {isSelected ? (
                          <span className="text-[10px] font-extrabold bg-primary-theme text-white px-1.5 py-0.5 rounded shadow-xs">
                            EXTRACT
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-slate-400 bg-slate-200/80 px-1.5 py-0.5 rounded">
                            SKIP
                          </span>
                        )}
                      </div>

                      {/* Next/Image Page Thumbnail Box */}
                      <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-white border border-slate-200/80 shadow-xs flex items-center justify-center">
                        {thumb ? (
                          <Image
                            src={thumb}
                            alt={`Page ${pageNum} Preview`}
                            fill
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
                            className={`object-contain p-1 transition-all duration-200 ${
                              isSelected ? "opacity-100" : "opacity-40 grayscale"
                            }`}
                            unoptimized
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-3 text-slate-300">
                            {isLoadingThumbnails ? (
                              <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
                            ) : (
                              <>
                                <FileText className="w-7 h-7 opacity-30 text-slate-400" />
                                <span className="text-[10px] text-slate-400 mt-1 font-medium">Page {pageNum}</span>
                              </>
                            )}
                          </div>
                        )}

                        {/* Overlay Banner when selected */}
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 p-1 bg-primary-theme text-white rounded-full shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Validation or Processing Error */}
          {error && (
            <div className="p-4 md:p-5 rounded-2xl bg-red-50 text-red-600 border border-red-200 text-sm md:text-base flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Button & Results */}
          {!extractedBlobUrl ? (
            <button
              onClick={handleExtract}
              disabled={isProcessing || selectedPages.size === 0}
              className="w-full py-4 px-6 rounded-2xl bg-primary-theme hover:opacity-90 text-white text-sm md:text-base font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Extracting Selected Pages...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-5 h-5" />
                  <span>
                    {selectedPages.size === 0
                      ? "Select Pages to Extract"
                      : `Extract ${selectedPages.size} ${
                          selectedPages.size === 1 ? "Page" : "Pages"
                        } from PDF`}
                  </span>
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="p-5 md:p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-4 text-emerald-900">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h5 className="font-bold text-base md:text-lg">Pages Extracted Successfully!</h5>
                  <p className="text-xs md:text-sm text-emerald-700 mt-0.5">
                    Extracted {selectedPages.size} {selectedPages.size === 1 ? "page" : "pages"} into a new standalone PDF document.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-4 px-6 rounded-2xl bg-primary-theme hover:bg-primary-theme/90 text-white font-bold text-sm md:text-base transition shadow-md shadow-primary-theme/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Extracted PDF</span>
                </button>

                <button
                  onClick={reset}
                  className="py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm md:text-base transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  Extract from Another PDF
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
