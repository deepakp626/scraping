"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, FileImage, Download, AlertCircle, CheckCircle2 } from "lucide-react";

export default function PdfToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<"png" | "jpeg" | "webp" | "bmp">("png");
  const [scale, setScale] = useState<number>(1.5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageImages, setPageImages] = useState<{ pageNum: number; dataUrl: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (uploadedFile: File | undefined) => {
    if (!uploadedFile) return;
    if (!uploadedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please upload a valid PDF document.");
      return;
    }

    setError(null);
    setPageImages([]);
    setFile(uploadedFile);
  };

  const handleConvert = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      setError(null);
      setPageImages([]);

      const arrayBuffer = await file.arrayBuffer();

      // Dynamically load pdfjs-dist in the browser client-side
      const pdfjs = await import("pdfjs-dist");

      // Configure worker source using cdn with exact installed version match
      if (typeof window !== "undefined") {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      }

      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      const totalPages = pdfDoc.numPages;
      const generated: { pageNum: number; dataUrl: string }[] = [];

      // Loop through pages (safely limiting to max 20 pages for web performance)
      for (let pageNum = 1; pageNum <= Math.min(totalPages, 20); pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        // Fill white background (required for JPEG/BMP which don't support transparency)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport,
          canvas,
        };

        await (page.render(renderContext as any)).promise;

        // BMP doesn't support quality param; PNG is lossless
        const quality = (format === "jpeg" || format === "webp") ? 0.92 : undefined;
        const dataUrl = canvas.toDataURL(`image/${format}`, quality);
        generated.push({ pageNum, dataUrl });
      }

      if (generated.length === 0) {
        throw new Error("No pages could be extracted from this PDF.");
      }

      setPageImages(generated);
    } catch (err: any) {
      console.error("PDFJS processing error:", err);
      setError(err?.message || "Failed to parse and convert PDF. Please ensure the file is not password-protected or corrupted.");
    } finally {
      setIsProcessing(false);
    }
  };

  const extMap: Record<string, string> = { png: "png", jpeg: "jpg", webp: "webp", bmp: "bmp" };

  const handleDownloadSingle = (dataUrl: string, pageNum: number) => {
    if (!file) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${file.name.replace(/\.pdf$/i, "")}_page_${pageNum}.${extMap[format] ?? "png"}`;    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => {
    pageImages.forEach((img) => handleDownloadSingle(img.dataUrl, img.pageNum));
  };

  const reset = () => {
    setFile(null);
    setPageImages([]);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-slate-800">PDF to Image Converter</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1">
          Convert PDF pages into high-resolution PNG or JPG image files securely in your browser.
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
          <p className="text-xs text-slate-400 mt-1">High-definition page extraction via PDF.js</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary-theme/10 text-primary-theme rounded-xl">
                <FileImage className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm truncate max-w-xs">{file.name}</h4>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-xs md:text-sm  font-semibold text-red-500 hover:underline px-2 py-1 cursor-pointer"
            >
              Change PDF
            </button>
          </div>

          {/* Format & Scale Controls */}
          <div className="flex flex-wrap gap-6 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            {/* Output Format */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Output Format</span>
              <div className="flex flex-wrap gap-1.5">
                {([
                  { id: "png",  label: "PNG",  sub: "Lossless" },
                  { id: "jpeg", label: "JPG",  sub: "Compact" },
                  { id: "webp", label: "WebP", sub: "Modern" },
                  { id: "bmp",  label: "BMP",  sub: "Raw" },
                ] as const).map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormat(f.id)}
                    className={`flex flex-col items-center px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                      format === f.id
                        ? "bg-primary-theme text-white border-primary-theme shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:border-primary-theme hover:text-primary-theme"
                    }`}
                  >
                    <span>{f.label}</span>
                    <span className={`text-[9px] font-normal mt-0.5 ${ format === f.id ? "text-white/80" : "text-slate-400" }`}>{f.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality / DPI Scale */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Quality / DPI</span>
              <div className="flex flex-wrap gap-1.5">
                {([
                  { value: 1,   label: "1×",  sub: "72 DPI" },
                  { value: 1.5, label: "1.5×", sub: "108 DPI" },
                  { value: 2,   label: "2×",  sub: "144 DPI" },
                  { value: 3,   label: "3×",  sub: "216 DPI" },
                ] as const).map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setScale(s.value)}
                    className={`flex flex-col items-center px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                      scale === s.value
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-white text-slate-600 border-slate-200 hover:border-emerald-500 hover:text-emerald-600"
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className={`text-[9px] font-normal mt-0.5 ${ scale === s.value ? "text-white/80" : "text-slate-400" }`}>{s.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {pageImages.length === 0 ? (
            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="w-full py-3.5 px-6 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Rendering PDF Pages...</span>
                </>
              ) : (
                <>
                  <FileImage className="w-5 h-5" />
                  <span>Convert PDF to Images</span>
                </>
              )}
            </button>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{pageImages.length} page(s) converted successfully</span>
                </div>
                {pageImages.length > 1 && (
                  <button
                    onClick={handleDownloadAll}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {pageImages.map((img) => (
                  <div
                    key={img.pageNum}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 p-3 flex flex-col items-center group shadow-xs"
                  >
                    <div className="w-full aspect-[3/4] bg-white rounded-xl overflow-hidden border border-slate-200 mb-3 flex items-center justify-center">
                      <img
                        src={img.dataUrl}
                        alt={`Page ${img.pageNum}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="w-full flex items-center justify-between">
                      <span className="text-xs md:text-sm font-semibold text-slate-700">Page {img.pageNum}</span>
                      <button
                        onClick={() => handleDownloadSingle(img.dataUrl, img.pageNum)}
                        className="px-3 py-1 bg-white border border-slate-200 hover:border-primary-theme text-primary-theme text-xs md:text-sm font-bold rounded-lg inline-flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Download className="w-3 h-3" /> Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}