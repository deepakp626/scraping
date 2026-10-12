"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Image as ImageIcon,
  RefreshCw,
  Download,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  FileType,
  Sliders,
} from "lucide-react";

// Format options
const FORMAT_OPTIONS = [
  { value: "image/jpeg", label: "JPG / JPEG", ext: "jpg", supportsQuality: true },
  { value: "image/png", label: "PNG", ext: "png", supportsQuality: false },
  { value: "image/webp", label: "WebP", ext: "webp", supportsQuality: true },
  { value: "image/avif", label: "AVIF", ext: "avif", supportsQuality: true },
  { value: "image/gif", label: "GIF", ext: "gif", supportsQuality: false },
  { value: "image/bmp", label: "BMP", ext: "bmp", supportsQuality: false },
  { value: "image/tiff", label: "TIFF", ext: "tiff", supportsQuality: false },
  { value: "image/x-icon", label: "ICO", ext: "ico", supportsQuality: false },
  { value: "image/svg+xml", label: "SVG", ext: "svg", supportsQuality: false },
  { value: "image/heic", label: "HEIC", ext: "heic", supportsQuality: true },
  { value: "image/heif", label: "HEIF", ext: "heif", supportsQuality: true },
];

export default function ConvertJpg() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [originalSize, setOriginalSize] = useState<number>(0);
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [originalFormat, setOriginalFormat] = useState<string>("");

  const [targetFormat, setTargetFormat] = useState<string>("image/jpeg");
  const [quality, setQuality] = useState<number>(90);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
  }, [originalUrl, convertedUrl]);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFormatLabel = (mime: string) => {
    const found = FORMAT_OPTIONS.find((f) => f.value === mime);
    return found ? found.label : mime;
  };

  const processSelectedFile = (file: File) => {
    setError(null);
    setConvertedUrl(null);
    setConvertedSize(0);
    setSelectedFile(file);
    setOriginalSize(file.size);
    setOriginalFormat(file.type || "unknown");

    if (originalUrl) URL.revokeObjectURL(originalUrl);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);

    // Auto-suggest a different target format
    if (file.type === "image/jpeg") setTargetFormat("image/webp");
    else if (file.type === "image/png") setTargetFormat("image/jpeg");
    else if (file.type === "image/webp") setTargetFormat("image/jpeg");
    else setTargetFormat("image/jpeg");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processSelectedFile(file);
    } else {
      setError("Please drop a valid image file.");
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) return;
    setIsConverting(true);
    setError(null);
    setConvertedUrl(null);
    setConvertedSize(0);

    try {
      // Dynamically import image-conversion (it's a browser library)
      const imageConversion = await import("image-conversion");

      const selectedFormatMeta = FORMAT_OPTIONS.find((f) => f.value === targetFormat);
      const qualityFraction = selectedFormatMeta?.supportsQuality ? quality / 100 : 1;

      const resultBlob = await imageConversion.compress(selectedFile, {
        quality: qualityFraction,
        type: targetFormat as any,
      });

      const outputBlob = new Blob([resultBlob], { type: targetFormat });
      setConvertedSize(outputBlob.size);

      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
      const outputUrl = URL.createObjectURL(outputBlob);
      setConvertedUrl(outputUrl);
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ||
          "Conversion failed. Make sure the image-conversion package is installed."
      );
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedUrl || !selectedFile) return;
    const ext =
      FORMAT_OPTIONS.find((f) => f.value === targetFormat)?.ext || "jpg";
    const nameWithoutExt =
      selectedFile.name.substring(0, selectedFile.name.lastIndexOf(".")) ||
      selectedFile.name;
    const link = document.createElement("a");
    link.download = `${nameWithoutExt}_converted.${ext}`;
    link.href = convertedUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    setSelectedFile(null);
    setOriginalUrl(null);
    setConvertedUrl(null);
    setOriginalSize(0);
    setConvertedSize(0);
    setOriginalFormat("");
    setError(null);
    setQuality(90);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const selectedFormatMeta = FORMAT_OPTIONS.find((f) => f.value === targetFormat);
  const sizeDiff =
    originalSize && convertedSize
      ? Math.round(((originalSize - convertedSize) / originalSize) * 100)
      : null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Image Converter</h2>
          <p className="text-sm text-slate-500 mt-1">
            Convert images between JPG, PNG, WebP, GIF, and BMP — all in the browser.
          </p>
        </div>
        {selectedFile && (
          <button
            onClick={resetForm}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Clear / Upload New
          </button>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold">Conversion Error</span>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      {!selectedFile && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 hover:border-orange-500 hover:bg-orange-50/5 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="p-4 bg-orange-50 text-orange-600 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8" />
          </div>
          <span className="mt-4 text-base font-semibold text-slate-700">
            Drag and drop your image here, or{" "}
            <span className="text-orange-600 hover:underline">browse</span>
          </span>
          <span className="text-xs text-slate-400 mt-1.5">
            Supports PNG, JPEG, WebP, GIF, BMP, SVG
          </span>
        </div>
      )}

      {/* Main Workspace */}
      {selectedFile && originalUrl && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Previews */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Original */}
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Original
                    </span>
                    <span className="text-xs font-bold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded capitalize">
                      {originalFormat.split("/")[1]?.toUpperCase() || "Unknown"}
                    </span>
                  </div>
                  <div className="w-full h-48 flex items-center justify-center bg-white rounded-xl overflow-hidden border border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={originalUrl}
                      alt="Original"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-slate-500 truncate max-w-[120px]">
                      {selectedFile.name}
                    </span>
                    <span className="text-sm font-bold text-slate-700">
                      {formatSize(originalSize)}
                    </span>
                  </div>
                </div>

                {/* Converted Result */}
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex flex-col relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Converted
                    </span>
                    {convertedUrl && (
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded capitalize">
                        {selectedFormatMeta?.ext?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="w-full h-48 flex items-center justify-center bg-white rounded-xl overflow-hidden border border-slate-100">
                    {isConverting ? (
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCw className="w-8 h-8 text-orange-500 animate-spin" />
                        <span className="text-xs font-medium text-slate-500">
                          Converting...
                        </span>
                      </div>
                    ) : convertedUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={convertedUrl}
                        alt="Converted result"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <span className="text-xs text-slate-400 block">
                          Configure options and click &quot;Convert Image&quot;
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    {convertedUrl ? (
                      <>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-bold text-green-600">Converted</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-slate-800">
                            {formatSize(convertedSize)}
                          </span>
                          {sizeDiff !== null && sizeDiff > 0 && (
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                              -{sizeDiff}%
                            </span>
                          )}
                          {sizeDiff !== null && sizeDiff < 0 && (
                            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                              +{Math.abs(sizeDiff)}%
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400">No output yet</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Format Flow Indicator */}
              {convertedUrl && (
                <div className="flex items-center justify-center gap-3 py-2">
                  <span className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    {originalFormat.split("/")[1]?.toUpperCase()}
                  </span>
                  <ArrowRight className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    {selectedFormatMeta?.ext?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Settings Panel */}
            <div className="lg:col-span-5 border border-slate-100 rounded-3xl p-6 bg-slate-50/50 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <FileType className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-slate-800">Conversion Settings</h3>
              </div>

              {/* Output Format */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider block">
                  Output Format
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {FORMAT_OPTIONS.map((fmt) => (
                    <button
                      key={fmt.value}
                      onClick={() => setTargetFormat(fmt.value)}
                      disabled={fmt.value === originalFormat}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                        targetFormat === fmt.value
                          ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                          : fmt.value === originalFormat
                          ? "bg-slate-100 border-slate-100 text-slate-300 cursor-not-allowed"
                          : "bg-white border-slate-200 text-slate-700 hover:border-orange-300 hover:bg-orange-50"
                      }`}
                    >
                      <span>{fmt.label}</span>
                      {fmt.value === originalFormat && (
                        <span className="text-xs font-normal opacity-70">Current format</span>
                      )}
                      {targetFormat === fmt.value && fmt.value !== originalFormat && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Slider — only for lossy formats */}
              {selectedFormatMeta?.supportsQuality && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-orange-500" />
                    <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                      Quality
                    </label>
                    <span className="ml-auto text-orange-600 font-bold text-sm">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
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

              {/* Convert Button */}
              <button
                onClick={handleConvert}
                disabled={isConverting || targetFormat === originalFormat}
                className="w-full bg-slate-900 text-white font-semibold py-3 rounded-2xl hover:bg-slate-800 hover:shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {isConverting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Converting...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5" />
                    <span>
                      Convert to {selectedFormatMeta?.label ?? targetFormat}
                    </span>
                  </>
                )}
              </button>

              {/* Download Button */}
              {convertedUrl && (
                <button
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download {selectedFormatMeta?.ext?.toUpperCase()} File</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
