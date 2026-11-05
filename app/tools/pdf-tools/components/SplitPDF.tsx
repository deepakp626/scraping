"use client";

import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, Split, Download, AlertCircle, CheckCircle2, FileText } from "lucide-react";

interface SplitResult {
  id: string;
  name: string;
  url: string;
  previewUrl: string;
  size: number;
  label: string;
}

export default function SplitPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [splitMode, setSplitMode] = useState<"range" | "all">("range");
  const [pageRange, setPageRange] = useState<string>("1-2");
  const [isProcessing, setIsProcessing] = useState(false);
  const [splitResults, setSplitResults] = useState<SplitResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (uploadedFile: File | undefined) => {
    if (!uploadedFile) return;
    if (!uploadedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please upload a valid PDF document.");
      return;
    }

    try {
      setError(null);
      setSplitResults([]);
      setFile(uploadedFile);

      const arrayBuffer = await uploadedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const count = pdf.getPageCount();
      setTotalPages(count);
      setPageRange(count > 1 ? `1-${Math.min(2, count)}` : "1");
    } catch (err: any) {
      console.error(err);
      setError("Failed to load PDF. It may be encrypted or corrupted.");
    }
  };

  const parsePageRange = (rangeStr: string, max: number): number[] => {
    const indices = new Set<number>();
    const parts = rangeStr.split(",").map((s) => s.trim());

    for (const part of parts) {
      if (part.includes("-")) {
        const [startStr, endStr] = part.split("-").map((s) => parseInt(s.trim(), 10));
        if (!isNaN(startStr) && !isNaN(endStr)) {
          const start = Math.max(1, Math.min(startStr, endStr));
          const end = Math.min(max, Math.max(startStr, endStr));
          for (let i = start; i <= end; i++) {
            indices.add(i - 1);
          }
        }
      } else {
        const pageNum = parseInt(part, 10);
        if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= max) {
          indices.add(pageNum - 1);
        }
      }
    }

    return Array.from(indices).sort((a, b) => a - b);
  };

  const generatePdfThumbnail = async (pdfArrayBuffer: ArrayBuffer, fallbackLabel: string): Promise<string> => {
    try {
      const pdfjs = await import("pdfjs-dist");
      if (typeof window !== "undefined") {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
      }
      const loadingTask = pdfjs.getDocument({ data: pdfArrayBuffer });
      const pdfDoc = await loadingTask.promise;
      const page = await pdfDoc.getPage(1);
      const viewport = page.getViewport({ scale: 1.0 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context unavailable");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await (page.render({ canvasContext: ctx, viewport, canvas } as any)).promise;

      return canvas.toDataURL("image/png", 0.9);
    } catch (e) {
      // Clean fallback canvas thumbnail
      const canvas = document.createElement("canvas");
      canvas.width = 300;
      canvas.height = 400;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(0, 0, 300, 400);

        // Document sheet
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(20, 20, 260, 360, 12);
        ctx.fill();
        ctx.stroke();

        // Header bar
        ctx.fillStyle = "#f97316";
        ctx.beginPath();
        ctx.roundRect(40, 40, 50, 8, 4);
        ctx.fill();

        // Mock lines
        ctx.fillStyle = "#cbd5e1";
        ctx.fillRect(40, 65, 220, 6);
        ctx.fillRect(40, 85, 200, 6);
        ctx.fillRect(40, 105, 210, 6);
        ctx.fillRect(40, 125, 180, 6);

        // Label in center
        ctx.fillStyle = "#1e293b";
        ctx.font = "bold 18px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(fallbackLabel, 150, 220);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "12px sans-serif";
        ctx.fillText("PDF Document", 150, 245);
      }
      return canvas.toDataURL("image/png");
    }
  };

  const handleSplit = async () => {
    if (!file || totalPages === 0) return;

    try {
      setIsProcessing(true);
      setError(null);
      setSplitResults([]);

      const arrayBuffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);
      const results: SplitResult[] = [];

      if (splitMode === "range") {
        const pageIndices = parsePageRange(pageRange, totalPages);
        if (pageIndices.length === 0) {
          throw new Error("Invalid page range specified. Example: 1-3, 5");
        }

        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(srcPdf, pageIndices);
        copiedPages.forEach((page) => newPdf.addPage(page));

        const bytes = await newPdf.save();
        const buffer = bytes.buffer as ArrayBuffer;
        const blob = new Blob([buffer], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const name = `split_${pageRange.replace(/\s+/g, "")}_${file.name}`;
        const previewUrl = await generatePdfThumbnail(buffer, `Pages ${pageRange}`);

        results.push({
          id: Math.random().toString(36).substring(7),
          name,
          url,
          previewUrl,
          size: bytes.byteLength,
          label: `Pages ${pageRange}`,
        });
      } else {
        // Extract every single page as separate PDF with preview
        for (let i = 0; i < totalPages; i++) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(srcPdf, [i]);
          newPdf.addPage(copiedPage);

          const bytes = await newPdf.save();
          const buffer = bytes.buffer as ArrayBuffer;
          const blob = new Blob([buffer], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const name = `page_${i + 1}_${file.name}`;
          const previewUrl = await generatePdfThumbnail(buffer, `Page ${i + 1}`);

          results.push({
            id: Math.random().toString(36).substring(7),
            name,
            url,
            previewUrl,
            size: bytes.byteLength,
            label: `Page ${i + 1}`,
          });
        }
      }

      setSplitResults(results);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to split PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadSingle = (url: string, name: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => {
    splitResults.forEach((item) => {
      handleDownloadSingle(item.url, item.name);
    });
  };

  const resetAll = () => {
    setFile(null);
    setTotalPages(0);
    setSplitResults([]);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Split PDF Document</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1">
          Separate a PDF into individual pages or extract specific page ranges with ease.
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
          <p className="text-xs text-slate-400 mt-1">Any PDF file up to 50MB</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary-theme/10 text-primary-theme rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm truncate max-w-xs">{file.name}</h4>
                <p className="text-xs text-slate-500">{totalPages} total pages • {(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              onClick={resetAll}
              className="text-xs md:text-sm font-semibold text-red-500 hover:underline px-2 py-1"
            >
              Change PDF
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => setSplitMode("range")}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                splitMode === "range"
                  ? "border-primary-theme bg-primary-theme/5"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <h5 className="font-bold text-sm md:text-base text-slate-800">Split by Page Range</h5>
              <p className="text-xs md:text-sm text-slate-500 mt-1">Extract selected pages into a single PDF.</p>
            </div>

            <div
              onClick={() => setSplitMode("all")}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                splitMode === "all"
                  ? "border-primary-theme bg-primary-theme/5"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <h5 className="font-bold text-sm md:text-base text-slate-800">Extract Every Page</h5>
              <p className="text-xs md:text-sm text-slate-500 mt-1">Convert every single page into individual PDFs.</p>
            </div>
          </div>

          {splitMode === "range" && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Page Range (1 to {totalPages})
              </label>
              <input
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder="e.g. 1-3, 5"
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary-theme outline-none"
              />
              <p className="text-xs text-slate-400 mt-1.5">
                Use commas for individual pages and hyphens for ranges (e.g. 1-2, 4)
              </p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {splitResults.length === 0 ? (
            <button
              onClick={handleSplit}
              disabled={isProcessing}
              className="w-full py-3.5 px-6 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Splitting PDF & Generating Previews...
                </>
              ) : (
                <>
                  <Split className="w-5 h-5" />
                  Split PDF
                </>
              )}
            </button>
          ) : (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-emerald-800">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Split complete!</p>
                    <p className="text-xs text-emerald-600">{splitResults.length} PDF file(s) created.</p>
                  </div>
                </div>
                {splitResults.length > 1 && (
                  <button
                    onClick={handleDownloadAll}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <Download className="w-3.5 h-3.5" /> Download All ({splitResults.length})
                  </button>
                )}
              </div>

              {/* Grid with visual image preview cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {splitResults.map((item) => (
                  <div
                    key={item.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 p-3 flex flex-col items-center group shadow-xs hover:shadow-md transition-all"
                  >
                    {/* Thumbnail Image Box */}
                    <div className="w-full aspect-[3/4] bg-white rounded-xl overflow-hidden border border-slate-200 mb-2.5 relative flex items-center justify-center">
                      <img
                        src={item.previewUrl}
                        alt={item.label}
                        className="w-full h-full object-contain"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 text-white text-[10px] font-bold rounded-md backdrop-blur-xs">
                        {item.label}
                      </span>
                    </div>

                    {/* PDF Info */}
                    <div className="w-full text-center mb-2.5">
                      <p className="text-xs font-semibold text-slate-800 truncate" title={item.name}>
                        {item.name}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {(item.size / 1024).toFixed(1)} KB
                      </p>
                    </div>

                    {/* Action Download Button */}
                    <button
                      onClick={() => handleDownloadSingle(item.url, item.name)}
                      className="w-full py-2 bg-white border border-slate-200 hover:border-primary-theme hover:bg-primary-theme hover:text-white text-primary-theme text-xs font-bold rounded-xl inline-flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSplitResults([])}
                className="w-full py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                Split Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
