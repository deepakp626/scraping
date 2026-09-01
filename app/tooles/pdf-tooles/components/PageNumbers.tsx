"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import {
  UploadCloud,
  FileDigit,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  Sliders,
  Eye,
  Layers,
  Lock,
  ArrowRight,
  ShieldAlert,
  Loader2,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

export default function PageNumbers() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [position, setPosition] = useState<"bottom" | "top">("bottom");
  const [align, setAlign] = useState<"left" | "center" | "right">("center");
  const [format, setFormat] = useState<
    "page_n_of_total" | "page_n" | "n_of_total" | "number" | "dash_n"
  >("page_n_of_total");
  const [fontSize, setFontSize] = useState<number>(11);
  const [startNumber, setStartNumber] = useState<number>(1);
  const [firstPageToNumber, setFirstPageToNumber] = useState<number>(1); // e.g. 1 to number all, 2 to skip cover
  const [margin, setMargin] = useState<number>(25);
  const [colorHex, setColorHex] = useState<string>("#334155"); // slate-700
  const [pageThumbnails, setPageThumbnails] = useState<Record<number, string>>({});
  const [isLoadingThumbnails, setIsLoadingThumbnails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [numberedBlobUrl, setNumberedBlobUrl] = useState<string | null>(null);
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

      const limit = Math.min(total, 6);
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
      if (numberedBlobUrl) URL.revokeObjectURL(numberedBlobUrl);
      setNumberedBlobUrl(null);
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
          setError("This PDF is encrypted with a password. Please unlock it before adding page numbers.");
          return;
        }
        throw loadErr;
      }

      const count = pdfDoc.getPageCount();
      setFile(uploadedFile);
      setTotalPages(count);

      generateThumbnails(arrayBuffer, count);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load PDF. The file may be corrupted.");
    }
  };

  const invalidateBlob = () => {
    if (numberedBlobUrl) {
      URL.revokeObjectURL(numberedBlobUrl);
      setNumberedBlobUrl(null);
    }
  };

  const hexToPdfRgb = (hex: string) => {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16) / 255 || 0.2;
    const g = parseInt(clean.substring(2, 4), 16) / 255 || 0.2;
    const b = parseInt(clean.substring(4, 6), 16) / 255 || 0.2;
    return rgb(r, g, b);
  };

  const formatPageString = (num: number, total: number) => {
    switch (format) {
      case "page_n_of_total":
        return `Page ${num} of ${total}`;
      case "page_n":
        return `Page ${num}`;
      case "n_of_total":
        return `${num} / ${total}`;
      case "dash_n":
        return `- ${num} -`;
      case "number":
      default:
        return `${num}`;
    }
  };

  const handleAddPageNumbers = async () => {
    if (!file || totalPages === 0) return;

    try {
      setIsProcessing(true);
      setError(null);

      const arrayBuffer = await file.arrayBuffer();
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
          throw new Error("This PDF is password-protected and cannot be modified without unlocking it first.");
        }
        throw loadErr;
      }

      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const textColor = hexToPdfRgb(colorHex);

      pages.forEach((page, idx) => {
        const pageIdx = idx + 1; // 1-indexed
        if (pageIdx < firstPageToNumber) {
          // Skip pages before firstPageToNumber (e.g. cover page)
          return;
        }

        const calculatedPageNum = startNumber + (pageIdx - firstPageToNumber);
        const pageText = formatPageString(calculatedPageNum, totalPages);

        const textWidth = font.widthOfTextAtSize(pageText, fontSize);
        const textHeight = font.heightAtSize(fontSize);
        const { width, height } = page.getSize();

        let x = width / 2 - textWidth / 2;
        if (align === "left") x = margin;
        if (align === "right") x = width - margin - textWidth;

        let y = margin;
        if (position === "top") y = height - margin - textHeight;

        page.drawText(pageText, {
          x,
          y,
          size: fontSize,
          font,
          color: textColor,
        });
      });

      const newBytes = await pdfDoc.save();
      const blob = new Blob([newBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setNumberedBlobUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to add page numbers.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!numberedBlobUrl || !file) return;
    const a = document.createElement("a");
    a.href = numberedBlobUrl;
    a.download = `numbered_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    if (numberedBlobUrl) URL.revokeObjectURL(numberedBlobUrl);
    setFile(null);
    setTotalPages(0);
    setPageThumbnails({});
    setNumberedBlobUrl(null);
    setError(null);
    setIsPasswordProtected(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const colorOptions = [
    { label: "Slate", hex: "#334155" },
    { label: "Dark", hex: "#0F172A" },
    { label: "Primary Blue", hex: "#2563EB" },
    { label: "Red", hex: "#EF4444" },
    { label: "Emerald", hex: "#10B981" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
          Add Page Numbers to PDF
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-2 leading-relaxed">
          Insert customizable page numbers in headers or footers with real-time visual simulation.
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
            Fast client-side numbering • All formats supported
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
              <span className="font-semibold text-slate-900">{file.name}</span> is protected with password encryption. Please unlock the file before inserting page numbers.
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Settings */}
            <div className="lg:col-span-2 space-y-5">
              {/* Position & Alignment Selector (Visual 6-Grid) */}
              <div className="p-5 md:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary-theme" />
                  Position & Alignment
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {/* Top Left */}
                  <button
                    type="button"
                    onClick={() => {
                      setPosition("top");
                      setAlign("left");
                      invalidateBlob();
                    }}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      position === "top" && align === "left"
                        ? "border-primary-theme bg-primary-theme text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <AlignLeft className="w-3.5 h-3.5" />
                    Top Left
                  </button>

                  {/* Top Center */}
                  <button
                    type="button"
                    onClick={() => {
                      setPosition("top");
                      setAlign("center");
                      invalidateBlob();
                    }}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      position === "top" && align === "center"
                        ? "border-primary-theme bg-primary-theme text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <AlignCenter className="w-3.5 h-3.5" />
                    Top Center
                  </button>

                  {/* Top Right */}
                  <button
                    type="button"
                    onClick={() => {
                      setPosition("top");
                      setAlign("right");
                      invalidateBlob();
                    }}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      position === "top" && align === "right"
                        ? "border-primary-theme bg-primary-theme text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <AlignRight className="w-3.5 h-3.5" />
                    Top Right
                  </button>

                  {/* Bottom Left */}
                  <button
                    type="button"
                    onClick={() => {
                      setPosition("bottom");
                      setAlign("left");
                      invalidateBlob();
                    }}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      position === "bottom" && align === "left"
                        ? "border-primary-theme bg-primary-theme text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <AlignLeft className="w-3.5 h-3.5" />
                    Bottom Left
                  </button>

                  {/* Bottom Center */}
                  <button
                    type="button"
                    onClick={() => {
                      setPosition("bottom");
                      setAlign("center");
                      invalidateBlob();
                    }}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      position === "bottom" && align === "center"
                        ? "border-primary-theme bg-primary-theme text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <AlignCenter className="w-3.5 h-3.5" />
                    Bottom Center
                  </button>

                  {/* Bottom Right */}
                  <button
                    type="button"
                    onClick={() => {
                      setPosition("bottom");
                      setAlign("right");
                      invalidateBlob();
                    }}
                    className={`py-3 px-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      position === "bottom" && align === "right"
                        ? "border-primary-theme bg-primary-theme text-white shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <AlignRight className="w-3.5 h-3.5" />
                    Bottom Right
                  </button>
                </div>
              </div>

              {/* Numbering Format & Color */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Format Selector */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <FileDigit className="w-4 h-4 text-primary-theme" />
                    Numbering Format
                  </label>
                  <select
                    value={format}
                    onChange={(e) => {
                      setFormat(e.target.value as any);
                      invalidateBlob();
                    }}
                    className="w-full px-3.5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-primary-theme outline-none shadow-xs cursor-pointer"
                  >
                    <option value="page_n_of_total">Page 1 of {totalPages || 10}</option>
                    <option value="page_n">Page 1</option>
                    <option value="n_of_total">1 / {totalPages || 10}</option>
                    <option value="dash_n">- 1 -</option>
                    <option value="number">1</option>
                  </select>
                </div>

                {/* Color Selector */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary-theme" />
                    Text Color
                  </label>
                  <div className="flex items-center gap-2.5 pt-1">
                    {colorOptions.map((c) => (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => {
                          setColorHex(c.hex);
                          invalidateBlob();
                        }}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                          colorHex === c.hex
                            ? "scale-115 border-primary-theme ring-2 ring-primary-theme/30"
                            : "border-white hover:scale-105"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.label}
                      />
                    ))}
                    <input
                      type="color"
                      value={colorHex}
                      onChange={(e) => {
                        setColorHex(e.target.value);
                        invalidateBlob();
                      }}
                      className="w-7 h-7 p-0 border-0 rounded-full cursor-pointer bg-transparent"
                      title="Custom color"
                    />
                  </div>
                </div>
              </div>

              {/* Start Number, Skip Cover, and Font Size */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 md:p-6 rounded-2xl border border-slate-200 bg-slate-50/50">
                {/* Start Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Start At Number
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={startNumber}
                    onChange={(e) => {
                      setStartNumber(Math.max(1, parseInt(e.target.value, 10) || 1));
                      invalidateBlob();
                    }}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-primary-theme outline-none shadow-xs"
                  />
                </div>

                {/* First Page To Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    First Page To Number
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={totalPages || 999}
                    value={firstPageToNumber}
                    onChange={(e) => {
                      setFirstPageToNumber(Math.max(1, parseInt(e.target.value, 10) || 1));
                      invalidateBlob();
                    }}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-primary-theme outline-none shadow-xs"
                  />
                  <p className="text-[11px] text-slate-400">
                    {firstPageToNumber === 1 ? "Numbers all pages" : `Skips first ${firstPageToNumber - 1} pages`}
                  </p>
                </div>

                {/* Font Size */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider">
                    <span>Font Size</span>
                    <span className="text-primary-theme font-bold">{fontSize}pt</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="18"
                    value={fontSize}
                    onChange={(e) => {
                      setFontSize(Number(e.target.value));
                      invalidateBlob();
                    }}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-theme mt-3"
                  />
                </div>
              </div>
            </div>

            {/* Right 1 Col: Live Real-Time Simulator Preview with next/image */}
            <div className="border border-slate-200 rounded-2xl p-5 md:p-6 bg-slate-50/50 flex flex-col justify-between space-y-4">
              <div>
                <h5 className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-primary-theme" />
                  Live Preview
                </h5>
                <p className="text-xs md:text-sm text-slate-500">
                  Page number placement simulator
                </p>
              </div>

              {/* Simulated Sheet with Real-Time Stamped Number */}
              <div className="py-4 flex flex-col items-center justify-center">
                <div className="relative w-44 h-60 md:w-52 md:h-72 bg-white border-2 border-slate-300 rounded-xl shadow-lg p-3.5 flex flex-col justify-between overflow-hidden select-none">
                  {/* If we have real page thumbnail, render as background preview with next/image */}
                  {pageThumbnails[1] ? (
                    <Image
                      src={pageThumbnails[1]}
                      alt="PDF Page Preview"
                      fill
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="object-contain p-2 opacity-30 pointer-events-none"
                      unoptimized
                    />
                  ) : (
                    <div className="space-y-2 opacity-20 my-auto pointer-events-none">
                      <div className="w-full h-1.5 bg-slate-300 rounded" />
                      <div className="w-4/5 h-1.5 bg-slate-300 rounded" />
                      <div className="w-full h-1.5 bg-slate-300 rounded" />
                      <div className="w-3/4 h-1.5 bg-slate-300 rounded" />
                      <div className="w-5/6 h-1.5 bg-slate-300 rounded" />
                    </div>
                  )}

                  {/* Header Slot (Top) */}
                  <div
                    className={`w-full flex items-center transition-all ${
                      align === "left"
                        ? "justify-start"
                        : align === "right"
                        ? "justify-end"
                        : "justify-center"
                    }`}
                  >
                    {position === "top" && (
                      <span
                        className="font-bold px-2 py-0.5 rounded bg-white/90 shadow-xs transition-all border border-slate-200"
                        style={{
                          color: colorHex,
                          fontSize: `${Math.max(9, fontSize * 0.85)}px`,
                        }}
                      >
                        {formatPageString(startNumber, totalPages || 10)}
                      </span>
                    )}
                  </div>

                  {/* Footer Slot (Bottom) */}
                  <div
                    className={`w-full flex items-center transition-all ${
                      align === "left"
                        ? "justify-start"
                        : align === "right"
                        ? "justify-end"
                        : "justify-center"
                    }`}
                  >
                    {position === "bottom" && (
                      <span
                        className="font-bold px-2 py-0.5 rounded bg-white/90 shadow-xs transition-all border border-slate-200"
                        style={{
                          color: colorHex,
                          fontSize: `${Math.max(9, fontSize * 0.85)}px`,
                        }}
                      >
                        {formatPageString(startNumber, totalPages || 10)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs md:text-sm font-bold text-slate-800 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-primary-theme" />
                    {position === "top" ? "Header" : "Footer"} • {align}
                  </span>
                </div>
              </div>

              <div className="text-center text-xs text-slate-400 border-t border-slate-200 pt-3">
                {firstPageToNumber === 1
                  ? `Applying to all ${totalPages} pages`
                  : `Starting on page ${firstPageToNumber} of ${totalPages}`}
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
          {!numberedBlobUrl ? (
            <button
              onClick={handleAddPageNumbers}
              disabled={isProcessing}
              className="w-full py-4 px-6 rounded-2xl bg-primary-theme hover:opacity-90 text-white text-sm md:text-base font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Adding Page Numbers...</span>
                </>
              ) : (
                <>
                  <FileDigit className="w-5 h-5" />
                  <span>Add Page Numbers to PDF</span>
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="p-5 md:p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-4 text-emerald-900">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h5 className="font-bold text-base md:text-lg">Page Numbers Added Successfully!</h5>
                  <p className="text-xs md:text-sm text-emerald-700 mt-0.5">
                    Numbered pages from {firstPageToNumber} to {totalPages}. Your new PDF is ready for download.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-4 px-6 rounded-2xl bg-primary-theme hover:bg-primary-theme/90 text-white font-bold text-sm md:text-base transition shadow-md shadow-primary-theme/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Numbered PDF</span>
                </button>

                <button
                  onClick={reset}
                  className="py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm md:text-base transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  Number Another PDF
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
