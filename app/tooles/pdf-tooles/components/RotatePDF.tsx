"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { PDFDocument, degrees } from "pdf-lib";
import {
  UploadCloud,
  RotateCw,
  RotateCcw,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  Compass,
  Layers,
  Lock,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

export default function RotatePDF() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [rotationAngle, setRotationAngle] = useState<90 | 180 | 270>(90);
  const [pageSelection, setPageSelection] = useState<"all" | "custom">("all");
  const [customPages, setCustomPages] = useState("");
  const [isRotating, setIsRotating] = useState(false);
  const [rotatedBlobUrl, setRotatedBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (rotatedBlobUrl) URL.revokeObjectURL(rotatedBlobUrl);
      setRotatedBlobUrl(null);

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
          setError("This PDF is encrypted with a password. Please unlock it before rotating.");
          return;
        }
        throw loadErr;
      }

      const count = pdfDoc.getPageCount();
      setFile(uploadedFile);
      setTotalPages(count);
      setCustomPages(`1-${count}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load PDF. The file may be corrupted.");
    }
  };

  const handleAngleSelect = (angle: 90 | 180 | 270) => {
    setRotationAngle(angle);
    if (rotatedBlobUrl) {
      URL.revokeObjectURL(rotatedBlobUrl);
      setRotatedBlobUrl(null);
    }
  };

  const handleScopeSelect = (scope: "all" | "custom") => {
    setPageSelection(scope);
    if (rotatedBlobUrl) {
      URL.revokeObjectURL(rotatedBlobUrl);
      setRotatedBlobUrl(null);
    }
  };

  const handleCustomPagesChange = (val: string) => {
    setCustomPages(val);
    if (rotatedBlobUrl) {
      URL.revokeObjectURL(rotatedBlobUrl);
      setRotatedBlobUrl(null);
    }
  };

  const parsePageNumbers = (inputStr: string, max: number): number[] => {
    const indices = new Set<number>();
    const parts = inputStr.split(",").map((s) => s.trim());

    for (const part of parts) {
      if (part.includes("-")) {
        const [startStr, endStr] = part.split("-").map((s) => parseInt(s.trim(), 10));
        if (!isNaN(startStr) && !isNaN(endStr)) {
          const start = Math.max(1, Math.min(startStr, endStr));
          const end = Math.min(max, Math.max(startStr, endStr));
          for (let i = start; i <= end; i++) {
            indices.add(i);
          }
        }
      } else {
        const p = parseInt(part, 10);
        if (!isNaN(p) && p >= 1 && p <= max) {
          indices.add(p);
        }
      }
    }

    return Array.from(indices).sort((a, b) => a - b);
  };

  const handleRotate = async () => {
    if (!file) return;

    try {
      setIsRotating(true);
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
          throw new Error("This PDF is password-protected and cannot be rotated without unlocking it first.");
        }
        throw loadErr;
      }

      const pages = pdfDoc.getPages();

      if (pageSelection === "all") {
        pages.forEach((page) => {
          const currentRotation = page.getRotation().angle || 0;
          const newAngle = ((currentRotation + rotationAngle) % 360 + 360) % 360;
          page.setRotation(degrees(newAngle));
        });
      } else {
        const targetPages = parsePageNumbers(customPages, pages.length);
        if (targetPages.length === 0) {
          throw new Error(`Please specify valid page numbers between 1 and ${pages.length}.`);
        }
        targetPages.forEach((pageNum) => {
          const page = pages[pageNum - 1];
          if (page) {
            const currentRotation = page.getRotation().angle || 0;
            const newAngle = ((currentRotation + rotationAngle) % 360 + 360) % 360;
            page.setRotation(degrees(newAngle));
          }
        });
      }

      const rotatedBytes = await pdfDoc.save();
      const blob = new Blob([rotatedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setRotatedBlobUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to rotate PDF.");
    } finally {
      setIsRotating(false);
    }
  };

  const handleDownload = () => {
    if (!rotatedBlobUrl || !file) return;
    const a = document.createElement("a");
    a.href = rotatedBlobUrl;
    a.download = `rotated_${rotationAngle}deg_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    if (rotatedBlobUrl) URL.revokeObjectURL(rotatedBlobUrl);
    setFile(null);
    setTotalPages(0);
    setRotatedBlobUrl(null);
    setRotationAngle(90);
    setPageSelection("all");
    setCustomPages("");
    setError(null);
    setIsPasswordProtected(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const applyPresetPages = (type: "all" | "odd" | "even" | "first") => {
    if (totalPages === 0) return;
    setPageSelection("custom");
    if (rotatedBlobUrl) {
      URL.revokeObjectURL(rotatedBlobUrl);
      setRotatedBlobUrl(null);
    }
    if (type === "all") {
      setCustomPages(`1-${totalPages}`);
    } else if (type === "odd") {
      const odds = Array.from({ length: totalPages }, (_, i) => i + 1).filter((n) => n % 2 !== 0);
      setCustomPages(odds.join(", "));
    } else if (type === "even") {
      const evens = Array.from({ length: totalPages }, (_, i) => i + 1).filter((n) => n % 2 === 0);
      setCustomPages(evens.join(", ") || "2");
    } else if (type === "first") {
      setCustomPages("1");
    }
  };

  const rotationOptions = [
    {
      angle: 90 as const,
      label: "90° Right",
      subtitle: "Quarter turn clockwise",
      orientation: "Landscape (90° Right)",
      icon: RotateCw,
    },
    {
      angle: 180 as const,
      label: "180° Flip",
      subtitle: "Invert upside down",
      orientation: "Inverted (180° Flip)",
      icon: RotateCw,
    },
    {
      angle: 270 as const,
      label: "270° (90° Left)",
      subtitle: "Three quarter turn",
      orientation: "Landscape (270° / 90° Left)",
      icon: RotateCcw,
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
          Rotate PDF Pages
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-2 leading-relaxed">
          Easily rotate all or specific pages in your PDF by 90°, 180°, or 270° clockwise with instant browser-based processing.
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
            Click to upload or drag & drop your PDF
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Supports multi-page documents • Instant local rotation
          </p>
        </div>
      ) : isPasswordProtected ? (
        /* Dedicated Password Protected Warning Banner */
        <div className="p-6 md:p-8 rounded-3xl bg-amber-50/80 border border-amber-200 text-amber-900 text-center space-y-5 max-w-xl mx-auto my-2 animate-in fade-in">
          <div className="w-16 h-16 bg-amber-100 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto text-amber-700 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg md:text-2xl font-bold text-amber-950">
              This PDF is Password-Protected
            </h4>
            <p className="text-xs md:text-sm text-amber-800 leading-relaxed max-w-md mx-auto">
              <span className="font-semibold text-slate-900">{file.name}</span> is encrypted. Password-protected documents cannot be read or rotated directly without removing security restrictions.
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

          {/* Interactive Rotation & Preview Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Angle Selection Cards */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4 text-primary-theme" />
                  Select Rotation Angle
                </label>
                <span className="text-xs md:text-sm font-semibold text-primary-theme bg-primary-theme/10 px-3 py-1 rounded-full">
                  Selected: {rotationAngle}° Clockwise
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                {rotationOptions.map((opt) => {
                  const isSelected = rotationAngle === opt.angle;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.angle}
                      type="button"
                      onClick={() => handleAngleSelect(opt.angle)}
                      className={`p-4 md:p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "border-primary-theme bg-primary-theme/5 shadow-xs ring-2 ring-primary-theme/20"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`p-2.5 rounded-xl transition-colors ${
                            isSelected
                              ? "bg-primary-theme text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <Icon className={`w-5 h-5 md:w-6 md:h-6 ${opt.angle === 180 ? "rotate-90" : ""}`} />
                        </div>
                        {isSelected && (
                          <span className="w-2.5 h-2.5 rounded-full bg-primary-theme animate-pulse" />
                        )}
                      </div>
                      <div>
                        <h5 className="font-bold text-sm md:text-base text-slate-800">
                          {opt.label}
                        </h5>
                        <p className="text-xs md:text-sm text-slate-500 mt-0.5">
                          {opt.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Page Scope Selection Box */}
              <div className="space-y-4 p-5 md:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 mt-4">
                <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary-theme" />
                  Target Pages
                </label>

                {/* Scope Segmented Control */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200/70 rounded-xl">
                  <button
                    type="button"
                    onClick={() => handleScopeSelect("all")}
                    className={`py-2.5 px-4 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer ${
                      pageSelection === "all"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    All Pages ({totalPages})
                  </button>
                  <button
                    type="button"
                    onClick={() => handleScopeSelect("custom")}
                    className={`py-2.5 px-4 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer ${
                      pageSelection === "custom"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Custom Selection
                  </button>
                </div>

                {pageSelection === "custom" && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                      <span className="font-semibold">Specify page numbers or ranges:</span>
                      <span className="text-slate-400">Total: 1-{totalPages}</span>
                    </div>

                    <input
                      type="text"
                      value={customPages}
                      onChange={(e) => handleCustomPagesChange(e.target.value)}
                      placeholder={`e.g. 1, 3-5, ${totalPages}`}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm md:text-base font-medium focus:ring-2 focus:ring-primary-theme outline-none"
                    />

                    {/* Quick helper pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-xs text-slate-400 font-medium">Quick presets:</span>
                      <button
                        type="button"
                        onClick={() => applyPresetPages("all")}
                        className="text-xs font-semibold px-2.5 py-1 bg-white border border-slate-200 hover:border-primary-theme rounded-lg text-slate-700 hover:text-primary-theme transition-colors cursor-pointer"
                      >
                        All Pages
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPresetPages("odd")}
                        className="text-xs font-semibold px-2.5 py-1 bg-white border border-slate-200 hover:border-primary-theme rounded-lg text-slate-700 hover:text-primary-theme transition-colors cursor-pointer"
                      >
                        Odd Pages
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPresetPages("even")}
                        className="text-xs font-semibold px-2.5 py-1 bg-white border border-slate-200 hover:border-primary-theme rounded-lg text-slate-700 hover:text-primary-theme transition-colors cursor-pointer"
                      >
                        Even Pages
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPresetPages("first")}
                        className="text-xs font-semibold px-2.5 py-1 bg-white border border-slate-200 hover:border-primary-theme rounded-lg text-slate-700 hover:text-primary-theme transition-colors cursor-pointer"
                      >
                        First Page Only
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right 1 Col: Live Orientation Preview */}
            <div className="border border-slate-200 rounded-2xl p-5 md:p-6 bg-slate-50/50 flex flex-col justify-between space-y-4">
              <div>
                <h5 className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Orientation Preview
                </h5>
                <p className="text-xs md:text-sm text-slate-500">
                  Target orientation after applying rotation
                </p>
              </div>

              {/* Animated Document Simulation Card */}
              <div className="py-8 flex flex-col items-center justify-center">
                <div
                  className="w-24 h-32 md:w-28 md:h-36 bg-white border-2 border-slate-300 rounded-xl shadow-md p-3 flex flex-col justify-between transition-transform duration-500 ease-in-out relative group"
                  style={{
                    transform: `rotate(${rotationAngle}deg)`,
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="w-4 h-1 bg-primary-theme rounded" />
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                  </div>
                  <div className="space-y-1.5 opacity-40">
                    <div className="w-full h-1 bg-slate-400 rounded" />
                    <div className="w-3/4 h-1 bg-slate-400 rounded" />
                    <div className="w-5/6 h-1 bg-slate-400 rounded" />
                  </div>
                  <div className="text-[9px] font-black text-center text-primary-theme uppercase tracking-wider">
                    Page 1
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs md:text-sm font-bold text-slate-800 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-primary-theme" />
                    {rotationAngle === 90 && "Landscape (90° Right)"}
                    {rotationAngle === 180 && "Inverted (180° Flip)"}
                    {rotationAngle === 270 && "Landscape (270° / 90° Left)"}
                  </span>
                </div>
              </div>

              <div className="text-center text-xs text-slate-400 border-t border-slate-200 pt-3">
                {pageSelection === "all" ? `Applying to all ${totalPages} pages` : `Applying to selected pages`}
              </div>
            </div>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="p-4 md:p-5 rounded-2xl bg-red-50 text-red-600 border border-red-200 text-sm md:text-base flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Button & Success Results */}
          {!rotatedBlobUrl ? (
            <button
              onClick={handleRotate}
              disabled={isRotating}
              className="w-full py-4 px-6 rounded-2xl bg-primary-theme hover:opacity-90 text-white text-sm md:text-base font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {isRotating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Rotating PDF Document...</span>
                </>
              ) : (
                <>
                  <RotateCw className="w-5 h-5" />
                  <span>Rotate PDF {rotationAngle}° Clockwise</span>
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="p-5 md:p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-4 text-emerald-900">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h5 className="font-bold text-base md:text-lg">PDF Rotated Successfully!</h5>
                  <p className="text-xs md:text-sm text-emerald-700 mt-0.5">
                    Your PDF pages have been rotated {rotationAngle}° clockwise. You can now download the new document.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-4 px-6 rounded-2xl bg-primary-theme hover:bg-primary-theme/90 text-white font-bold text-sm md:text-base transition shadow-md shadow-primary-theme/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Rotated PDF</span>
                </button>

                <button
                  onClick={reset}
                  className="py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm md:text-base transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  Rotate Another PDF
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
