"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import {
  UploadCloud,
  FileSignature,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  Sparkles,
  Sliders,
  Type,
  Eye,
  RotateCw,
  Palette,
  Layers,
  Lock,
  ArrowRight,
  ShieldAlert,
  LayoutGrid,
} from "lucide-react";

export default function AddWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [text, setText] = useState("CONFIDENTIAL");
  const [fontSize, setFontSize] = useState<number>(44);
  const [opacity, setOpacity] = useState<number>(0.25);
  const [angle, setAngle] = useState<number>(45);
  const [colorHex, setColorHex] = useState<string>("#EF4444"); // Red default
  const [layoutMode, setLayoutMode] = useState<"center" | "tiled">("center");
  const [pageSelection, setPageSelection] = useState<"all" | "custom">("all");
  const [customPages, setCustomPages] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [watermarkedBlobUrl, setWatermarkedBlobUrl] = useState<string | null>(null);
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
      if (watermarkedBlobUrl) URL.revokeObjectURL(watermarkedBlobUrl);
      setWatermarkedBlobUrl(null);

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
          setError("This PDF is encrypted with a password. Please unlock it before adding a watermark.");
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

  const invalidateBlob = () => {
    if (watermarkedBlobUrl) {
      URL.revokeObjectURL(watermarkedBlobUrl);
      setWatermarkedBlobUrl(null);
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

  const hexToPdfRgb = (hex: string) => {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.substring(0, 2), 16) / 255 || 0;
    const g = parseInt(clean.substring(2, 4), 16) / 255 || 0;
    const b = parseInt(clean.substring(4, 6), 16) / 255 || 0;
    return rgb(r, g, b);
  };

  const drawRotatedCenteredText = (
    page: any,
    textStr: string,
    targetX: number,
    targetY: number,
    fontSizeVal: number,
    fontObj: any,
    textColor: any,
    opacityVal: number,
    angleDeg: number
  ) => {
    const textWidth = fontObj.widthOfTextAtSize(textStr, fontSizeVal);
    const textHeight = fontObj.heightAtSize(fontSizeVal);

    const rad = (angleDeg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // Exact geometric translation so the center of the rotated text aligns with (targetX, targetY)
    const x = targetX - ((textWidth / 2) * cos - (textHeight / 2) * sin);
    const y = targetY - ((textWidth / 2) * sin + (textHeight / 2) * cos);

    page.drawText(textStr, {
      x,
      y,
      size: fontSizeVal,
      font: fontObj,
      color: textColor,
      opacity: opacityVal,
      rotate: degrees(angleDeg),
    });
  };

  const handleAddWatermark = async () => {
    if (!file || !text.trim()) return;

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

      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const allPages = pdfDoc.getPages();
      const textColor = hexToPdfRgb(colorHex);

      let targetPageIndices: number[] = [];
      if (pageSelection === "all") {
        targetPageIndices = allPages.map((_, i) => i);
      } else {
        const parsed = parsePageNumbers(customPages, allPages.length);
        if (parsed.length === 0) {
          throw new Error(`Please specify valid page numbers between 1 and ${allPages.length}.`);
        }
        targetPageIndices = parsed.map((p) => p - 1);
      }

      targetPageIndices.forEach((idx) => {
        const page = allPages[idx];
        if (!page) return;

        const { width, height } = page.getSize();

        if (layoutMode === "center") {
          drawRotatedCenteredText(
            page,
            text,
            width / 2,
            height / 2,
            fontSize,
            font,
            textColor,
            opacity,
            angle
          );
        } else {
          // Tiled 3x3 pattern across the document
          const xPositions = [width * 0.25, width * 0.5, width * 0.75];
          const yPositions = [height * 0.2, height * 0.5, height * 0.8];
          const tiledSize = Math.max(16, fontSize * 0.75);

          xPositions.forEach((posX) => {
            yPositions.forEach((posY) => {
              drawRotatedCenteredText(
                page,
                text,
                posX,
                posY,
                tiledSize,
                font,
                textColor,
                opacity,
                angle
              );
            });
          });
        }
      });

      const watermarkedBytes = await pdfDoc.save();
      const blob = new Blob([watermarkedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setWatermarkedBlobUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to add watermark to PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!watermarkedBlobUrl || !file) return;
    const a = document.createElement("a");
    a.href = watermarkedBlobUrl;
    a.download = `watermarked_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    if (watermarkedBlobUrl) URL.revokeObjectURL(watermarkedBlobUrl);
    setFile(null);
    setTotalPages(0);
    setWatermarkedBlobUrl(null);
    setError(null);
    setIsPasswordProtected(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const applyPresetText = (preset: string) => {
    setText(preset);
    invalidateBlob();
  };

  const presetTexts = [
    "CONFIDENTIAL",
    "DRAFT",
    "DO NOT COPY",
    "SAMPLE",
    "ORIGINAL",
    "TOP SECRET",
  ];

  const colorPalette = [
    { label: "Red", hex: "#EF4444" },
    { label: "Slate", hex: "#64748B" },
    { label: "Blue", hex: "#3B82F6" },
    { label: "Dark", hex: "#0F172A" },
    { label: "Emerald", hex: "#10B981" },
    { label: "Amber", hex: "#F59E0B" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
          Add Watermark to PDF
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-2 leading-relaxed">
          Stamp custom text watermarks across all or specific pages with full color, angle, opacity, and live preview controls.
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
            Fast client-side stamping • 100% private
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
              <span className="font-semibold text-slate-900">{file.name}</span> is protected with security encryption. Please unlock the password before stamping a watermark.
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
            {/* Left 2 Cols: Watermark Customization Controls */}
            <div className="lg:col-span-2 space-y-5">
              {/* Text Input & Quick Preset Chips */}
              <div className="p-5 md:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Type className="w-4 h-4 text-primary-theme" />
                    Watermark Text
                  </label>
                  <span className="text-xs text-slate-400 font-medium">
                    {text.length} characters
                  </span>
                </div>

                <input
                  type="text"
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    invalidateBlob();
                  }}
                  placeholder="e.g. CONFIDENTIAL / DO NOT SHARE"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm md:text-base font-semibold text-slate-800 focus:ring-2 focus:ring-primary-theme outline-none shadow-xs"
                />

                {/* Preset Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs text-slate-400 font-medium">Quick presets:</span>
                  {presetTexts.map((pText) => (
                    <button
                      key={pText}
                      type="button"
                      onClick={() => applyPresetText(pText)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                        text === pText
                          ? "bg-primary-theme text-white border-primary-theme shadow-xs"
                          : "bg-white border-slate-200 text-slate-700 hover:border-primary-theme hover:text-primary-theme"
                      }`}
                    >
                      {pText}
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout Mode & Color Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Layout Mode */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-primary-theme" />
                    Placement Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setLayoutMode("center");
                        invalidateBlob();
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-xs md:text-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        layoutMode === "center"
                          ? "border-primary-theme bg-primary-theme/10 text-primary-theme shadow-xs"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Center Single
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLayoutMode("tiled");
                        invalidateBlob();
                      }}
                      className={`py-2.5 px-3 rounded-xl border text-xs md:text-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        layoutMode === "tiled"
                          ? "border-primary-theme bg-primary-theme/10 text-primary-theme shadow-xs"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      Tiled Grid (3x3)
                    </button>
                  </div>
                </div>

                {/* Color Selector */}
                <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Palette className="w-4 h-4 text-primary-theme" />
                    Watermark Color
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {colorPalette.map((c) => (
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
                    {/* Native color picker */}
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

              {/* Sliders Box: Font Size, Opacity, Angle */}
              <div className="p-5 md:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-5">
                <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-primary-theme" />
                  Appearance & Geometry
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Font Size */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs md:text-sm font-semibold text-slate-700">
                      <span>Size</span>
                      <span className="text-primary-theme font-bold">{fontSize}pt</span>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="96"
                      step="2"
                      value={fontSize}
                      onChange={(e) => {
                        setFontSize(Number(e.target.value));
                        invalidateBlob();
                      }}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-theme"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Small</span>
                      <span>Huge</span>
                    </div>
                  </div>

                  {/* Opacity */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs md:text-sm font-semibold text-slate-700">
                      <span>Opacity</span>
                      <span className="text-primary-theme font-bold">{Math.round(opacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="0.9"
                      step="0.05"
                      value={opacity}
                      onChange={(e) => {
                        setOpacity(Number(e.target.value));
                        invalidateBlob();
                      }}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-theme"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Subtle</span>
                      <span>Opaque</span>
                    </div>
                  </div>

                  {/* Angle */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs md:text-sm font-semibold text-slate-700">
                      <span>Angle</span>
                      <span className="text-primary-theme font-bold">{angle}°</span>
                    </div>
                    <input
                      type="range"
                      min="-90"
                      max="90"
                      step="5"
                      value={angle}
                      onChange={(e) => {
                        setAngle(Number(e.target.value));
                        invalidateBlob();
                      }}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-theme"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>-90°</span>
                      <span>0°</span>
                      <span>+90°</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Pages Selection */}
              <div className="p-5 md:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <label className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary-theme" />
                  Target Pages
                </label>

                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-200/70 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setPageSelection("all");
                      invalidateBlob();
                    }}
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
                    onClick={() => {
                      setPageSelection("custom");
                      invalidateBlob();
                    }}
                    className={`py-2.5 px-4 rounded-lg text-xs md:text-sm font-bold transition-all cursor-pointer ${
                      pageSelection === "custom"
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Custom Page Range
                  </button>
                </div>

                {pageSelection === "custom" && (
                  <div className="space-y-2 pt-1">
                    <input
                      type="text"
                      value={customPages}
                      onChange={(e) => {
                        setCustomPages(e.target.value);
                        invalidateBlob();
                      }}
                      placeholder={`e.g. 1, 3-5, ${totalPages}`}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm md:text-base font-medium focus:ring-2 focus:ring-primary-theme outline-none"
                    />
                    <p className="text-xs text-slate-400">
                      Separate single pages or ranges with commas (e.g. 1, 2-4)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right 1 Col: Live Real-Time Watermark Simulator Preview */}
            <div className="border border-slate-200 rounded-2xl p-5 md:p-6 bg-slate-50/50 flex flex-col justify-between space-y-4">
              <div>
                <h5 className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-primary-theme" />
                  Live Watermark Preview
                </h5>
                <p className="text-xs md:text-sm text-slate-500">
                  Real-time visual simulation of stamped page
                </p>
              </div>

              {/* Simulated Document Sheet */}
              <div className="py-6 flex flex-col items-center justify-center">
                <div className="w-44 h-60 md:w-52 md:h-72 bg-white border-2 border-slate-300 rounded-xl shadow-lg p-4 flex flex-col justify-between relative overflow-hidden select-none">
                  {/* Mock document layout lines */}
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                    <div className="w-8 h-1.5 bg-slate-300 rounded" />
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                  </div>

                  <div className="space-y-2 opacity-30 my-auto">
                    <div className="w-full h-1.5 bg-slate-300 rounded" />
                    <div className="w-4/5 h-1.5 bg-slate-300 rounded" />
                    <div className="w-full h-1.5 bg-slate-300 rounded" />
                    <div className="w-3/4 h-1.5 bg-slate-300 rounded" />
                    <div className="w-5/6 h-1.5 bg-slate-300 rounded" />
                    <div className="w-full h-1.5 bg-slate-300 rounded" />
                  </div>

                  {/* Watermark Overlay in Simulation */}
                  {layoutMode === "center" ? (
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none px-2 text-center font-black tracking-wider transition-all duration-200"
                      style={{
                        transform: `rotate(${angle}deg)`,
                        color: colorHex,
                        opacity: opacity,
                        fontSize: `${Math.max(11, Math.min(26, fontSize * 0.4))}px`,
                      }}
                    >
                      <span className="truncate max-w-full">{text || "WATERMARK"}</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-2 items-center justify-items-center pointer-events-none p-2 transition-all duration-200">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <span
                          key={i}
                          className="font-black tracking-wide truncate max-w-full text-center"
                          style={{
                            transform: `rotate(${angle}deg)`,
                            color: colorHex,
                            opacity: opacity,
                            fontSize: `${Math.max(8, Math.min(14, fontSize * 0.22))}px`,
                          }}
                        >
                          {text || "WATERMARK"}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-slate-100 pt-2 flex justify-between text-[8px] text-slate-300 font-medium">
                    <span>Page 1 of {totalPages || 1}</span>
                    <span>Document View</span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs md:text-sm font-bold text-slate-800 shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-primary-theme" />
                    {layoutMode === "center" ? `Center • ${angle}°` : `Tiled Grid • ${angle}°`}
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

          {/* Action Button & Results */}
          {!watermarkedBlobUrl ? (
            <button
              onClick={handleAddWatermark}
              disabled={isProcessing || !text.trim()}
              className="w-full py-4 px-6 rounded-2xl bg-primary-theme hover:opacity-90 text-white text-sm md:text-base font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Stamping Watermark Across Pages...</span>
                </>
              ) : (
                <>
                  <FileSignature className="w-5 h-5" />
                  <span>Add Watermark to PDF</span>
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4 pt-2">
              <div className="p-5 md:p-6 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-4 text-emerald-900">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h5 className="font-bold text-base md:text-lg">Watermark Added Successfully!</h5>
                  <p className="text-xs md:text-sm text-emerald-700 mt-0.5">
                    Your custom watermark <span className="font-semibold text-slate-900">&quot;{text}&quot;</span> has been stamped on the requested pages.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-4 px-6 rounded-2xl bg-primary-theme hover:bg-primary-theme/90 text-white font-bold text-sm md:text-base transition shadow-md shadow-primary-theme/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Watermarked PDF</span>
                </button>

                <button
                  onClick={reset}
                  className="py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm md:text-base transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  Watermark Another PDF
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
