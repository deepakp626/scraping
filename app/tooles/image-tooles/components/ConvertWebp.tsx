"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import imageCompression from "browser-image-compression";
import {
  Upload,
  Image as ImageIcon,
  RefreshCw,
  Download,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sliders,
  X,
  Zap,
} from "lucide-react";

// ─── helpers ─────────────────────────────────────────────────────────────────

function formatSize(bytes: number) {
  if (!bytes) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function savingsPct(original: number, converted: number) {
  if (!original || !converted) return null;
  return Math.round(((original - converted) / original) * 100);
}

// ─── component ───────────────────────────────────────────────────────────────

export default function ConvertWebp() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);

  const [originalSize, setOriginalSize] = useState(0);
  const [convertedSize, setConvertedSize] = useState(0);
  const [originalDims, setOriginalDims] = useState<{ w: number; h: number } | null>(null);

  // WebP options
  const [quality, setQuality] = useState(80);
  const [lossless, setLossless] = useState(false);
  const [maxWidthHeight, setMaxWidthHeight] = useState(4096);

  const [status, setStatus] = useState<"idle" | "converting" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) {
      setErrorMsg("Please select a valid image file.");
      setStatus("error");
      return;
    }
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (convertedUrl) URL.revokeObjectURL(convertedUrl);

    setFile(f);
    setOriginalSize(f.size);
    setConvertedUrl(null);
    setConvertedSize(0);
    setErrorMsg(null);
    setStatus("idle");
    setProgress(0);

    const url = URL.createObjectURL(f);
    setOriginalUrl(url);

    const img = new Image();
    img.onload = () => setOriginalDims({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = url;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) loadFile(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) loadFile(f);
  };

  const handleConvert = async () => {
    if (!file) return;
    setStatus("converting");
    setErrorMsg(null);
    setProgress(0);

    try {
      const options: Parameters<typeof imageCompression>[1] = {
        fileType: "image/webp",
        // quality 0–1; for lossless we pass 1.0
        initialQuality: lossless ? 1.0 : quality / 100,
        maxWidthOrHeight: maxWidthHeight,
        useWebWorker: true,
        onProgress: (p) => setProgress(p),
      };

      const compressed = await imageCompression(file, options);
      const webpBlob = new Blob([compressed], { type: "image/webp" });

      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
      const url = URL.createObjectURL(webpBlob);

      setConvertedUrl(url);
      setConvertedSize(webpBlob.size);
      setStatus("done");
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg(
        err instanceof Error ? err.message : "Conversion failed. Please try another image."
      );
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (!convertedUrl || !file) return;
    const nameBase = file.name.replace(/\.[^/.]+$/, "");
    const a = document.createElement("a");
    a.href = convertedUrl;
    a.download = `${nameBase}.webp`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    setFile(null);
    setOriginalUrl(null);
    setConvertedUrl(null);
    setOriginalSize(0);
    setConvertedSize(0);
    setOriginalDims(null);
    setStatus("idle");
    setErrorMsg(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const pct = savingsPct(originalSize, convertedSize);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      {/* ── Header ── */}
      <div className="flex items-start justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Convert to WebP</h2>
          <p className="text-sm text-slate-500 mt-1">
            Convert any image to highly-compressed WebP — smaller files, same quality, all in the browser.
          </p>
        </div>
        {file && (
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors shrink-0"
          >
            <X size={13} /> Clear
          </button>
        )}
      </div>

      {/* ── Error ── */}
      {status === "error" && errorMsg && (
        <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
          <div>
            <span className="font-semibold block">Error</span>
            <p className="text-red-600">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* ── Upload Zone ── */}
      {!file && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-14 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group ${
            isDragging
              ? "border-orange-500 bg-orange-50/30"
              : "border-slate-200 hover:border-orange-400 hover:bg-orange-50/10"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className={`p-4 rounded-full transition-all duration-300 ${isDragging ? "bg-orange-100 scale-110" : "bg-orange-50 group-hover:scale-110"}`}>
            <Upload className="w-8 h-8 text-orange-500" />
          </div>
          <p className="mt-4 text-base font-semibold text-slate-700">
            Drag & drop your image, or{" "}
            <span className="text-orange-600 underline underline-offset-2">browse</span>
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Supports JPG, PNG, GIF, BMP, TIFF, AVIF — converts to WebP
          </p>

          {/* WebP badge */}
          <div className="mt-4 flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <Zap size={12} />
            Up to 30% smaller than JPG/PNG with the same visual quality
          </div>
        </div>
      )}

      {/* ── Workspace ── */}
      {file && originalUrl && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Previews */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Original */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Original</span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded">
                    {file.type.split("/")[1]?.toUpperCase() || "IMG"}
                  </span>
                </div>
                <div className="w-full h-44 flex items-center justify-center bg-white rounded-xl overflow-hidden border border-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={originalUrl} alt="Original" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-slate-500 truncate max-w-[110px]">{file.name}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-700">{formatSize(originalSize)}</span>
                    {originalDims && (
                      <p className="text-[10px] text-slate-400">{originalDims.w} × {originalDims.h}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Converted */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Result</span>
                  {status === "done" && (
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">WEBP</span>
                  )}
                </div>
                <div className="w-full h-44 flex items-center justify-center bg-white rounded-xl overflow-hidden border border-slate-100">
                  {status === "converting" ? (
                    <div className="flex flex-col items-center gap-3 w-full px-6">
                      <RefreshCw className="w-7 h-7 text-orange-500 animate-spin" />
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-500">{progress}% — Converting…</span>
                    </div>
                  ) : status === "done" && convertedUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={convertedUrl} alt="WebP Result" className="max-w-full max-h-full object-contain" />
                  ) : (
                    <div className="text-center p-4">
                      <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <span className="text-xs text-slate-400">WebP output will appear here</span>
                    </div>
                  )}
                </div>
                <div className="mt-2 flex justify-between items-center">
                  {status === "done" ? (
                    <>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-xs font-bold text-green-600">Done</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-700">{formatSize(convertedSize)}</span>
                        {pct !== null && pct > 0 && (
                          <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">-{pct}%</span>
                        )}
                        {pct !== null && pct < 0 && (
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">+{Math.abs(pct)}%</span>
                        )}
                      </div>
                    </>
                  ) : (
                    <span className="text-xs text-slate-400">No output yet</span>
                  )}
                </div>
              </div>
            </div>

            {/* Format flow */}
            {status === "done" && (
              <div className="flex items-center justify-center gap-3 py-1">
                <span className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  {file.type.split("/")[1]?.toUpperCase()}
                </span>
                <ArrowRight className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">WEBP</span>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="lg:col-span-5 border border-slate-100 rounded-3xl p-6 bg-slate-50/60 space-y-6">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-slate-800">Conversion Settings</h3>
            </div>

            {/* Lossless toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700">Lossless Mode</p>
                <p className="text-xs text-slate-400 mt-0.5">No quality reduction — larger file</p>
              </div>
              <button
                onClick={() => setLossless((v) => !v)}
                aria-pressed={lossless}
                className={`w-12 h-6 rounded-full relative flex items-center transition-colors shrink-0 ${
                  lossless ? "bg-orange-500" : "bg-slate-300"
                }`}
              >
                <span
                  className={`w-5 h-5 bg-white rounded-full absolute shadow transition-transform ${
                    lossless ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>

            {/* Quality slider */}
            {!lossless && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">Quality</label>
                  <span className="text-orange-600 font-bold text-sm">{quality}%</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Smaller file</span>
                  <span>Higher quality</span>
                </div>
              </div>
            )}

            {/* Max dimension */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">Max Dimension (px)</label>
                <span className="text-orange-600 font-bold text-sm">{maxWidthHeight}</span>
              </div>
              <input
                type="range"
                min={256}
                max={8192}
                step={256}
                value={maxWidthHeight}
                onChange={(e) => setMaxWidthHeight(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>256 px</span>
                <span>8192 px</span>
              </div>
              <p className="text-xs text-slate-400">Resize if image exceeds this width/height</p>
            </div>

            {/* Convert */}
            <button
              onClick={handleConvert}
              disabled={status === "converting"}
              className="w-full bg-slate-900 text-white font-semibold py-3 rounded-2xl hover:bg-slate-800 hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {status === "converting" ? (
                <><RefreshCw className="w-5 h-5 animate-spin" /> Converting…</>
              ) : (
                <><Zap className="w-5 h-5" /> Convert to WebP</>
              )}
            </button>

            {/* Download */}
            {status === "done" && convertedUrl && (
              <button
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download WebP — {formatSize(convertedSize)}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
