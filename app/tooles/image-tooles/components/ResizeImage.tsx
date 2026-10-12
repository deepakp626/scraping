"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Upload, 
  Image as ImageIcon, 
  ArrowRight, 
  Settings, 
  RefreshCw, 
  Download, 
  Lock, 
  Unlock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Maximize2
} from "lucide-react";

export default function ResizeImage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Original image properties
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<number>(1);

  // Resize settings
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [lockAspectRatio, setLockAspectRatio] = useState<boolean>(true);
  const [format, setFormat] = useState<string>("original");
  const [quality, setQuality] = useState<number>(85);
  const [fit, setFit] = useState<string>("inside"); // inside, cover, fill

  // Output properties
  const [resizedSize, setResizedSize] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    };
  }, [originalUrl, resizedUrl]);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processSelectedFile(file);
  };

  const processSelectedFile = (file: File) => {
    setError(null);
    setSelectedFile(file);
    setOriginalSize(file.size);
    setResizedUrl(null);
    setResizedSize(0);

    const url = URL.createObjectURL(file);
    setOriginalUrl(url);

    // Get original dimensions
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setWidth(img.naturalWidth.toString());
      setHeight(img.naturalHeight.toString());
      setAspectRatio(img.naturalWidth / img.naturalHeight);
    };
    img.onerror = () => {
      setError("Failed to load image preview. The file might be corrupted.");
    };
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

  const handleWidthChange = (valStr: string) => {
    setWidth(valStr);
    const val = parseInt(valStr, 10);
    if (isNaN(val) || val <= 0) return;

    if (lockAspectRatio && aspectRatio) {
      setHeight(Math.round(val / aspectRatio).toString());
    }
  };

  const handleHeightChange = (valStr: string) => {
    setHeight(valStr);
    const val = parseInt(valStr, 10);
    if (isNaN(val) || val <= 0) return;

    if (lockAspectRatio && aspectRatio) {
      setWidth(Math.round(val * aspectRatio).toString());
    }
  };

  const toggleAspectRatioLock = () => {
    const nextLock = !lockAspectRatio;
    setLockAspectRatio(nextLock);
    
    const wVal = parseInt(width, 10);
    if (nextLock && !isNaN(wVal) && wVal > 0 && aspectRatio) {
      setHeight(Math.round(wVal / aspectRatio).toString());
    }
  };

  const handleResize = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("fit", fit);
    formData.append("quality", quality.toString());
    
    if (format !== "original") {
      formData.append("format", format);
    }

    try {
      const response = await fetch("/api/image-tooles/resize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to resize image on the server.");
      }

      const blob = await response.blob();
      setResizedSize(blob.size);
      
      if (resizedUrl) URL.revokeObjectURL(resizedUrl);
      const outputUrl = URL.createObjectURL(blob);
      setResizedUrl(outputUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during resizing. Please make sure the sharp package is installed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resizedUrl || !selectedFile) return;

    const targetFormat = format === "original" 
      ? selectedFile.type.split("/")[1] || "jpg"
      : format;
    const finalExt = targetFormat === "jpeg" ? "jpg" : targetFormat;
    
    const nameWithoutExt = selectedFile.name.substring(0, selectedFile.name.lastIndexOf(".")) || selectedFile.name;
    const link = document.createElement("a");
    link.download = `${nameWithoutExt}_resized.${finalExt}`;
    link.href = resizedUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setSelectedFile(null);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    setOriginalUrl(null);
    setResizedUrl(null);
    setWidth("");
    setHeight("");
    setOriginalSize(0);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setResizedSize(0);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const sizeDiffPercent = originalSize && resizedSize 
    ? Math.round(((originalSize - resizedSize) / originalSize) * 100)
    : 0;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Resize Image Tool</h2>
          <p className="text-sm text-slate-500 mt-1">
            Resize, format, and adjust image sizes securely.
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

      {error && (
        <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold">Error occurred</span>
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
            Drag and drop your image here, or <span className="text-orange-600 hover:underline">browse</span>
          </span>
          <span className="text-xs text-slate-400 mt-1.5">Supports PNG, JPEG, WebP, SVG, and GIF</span>
        </div>
      )}

      {/* Main Workspace */}
      {selectedFile && originalUrl && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Previews Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Original Image Preview */}
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Original
                    </span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-200/60 px-2 py-0.5 rounded">
                      {originalWidth} x {originalHeight} px
                    </span>
                  </div>
                  <div className="w-full h-48 flex items-center justify-center relative bg-white rounded-xl overflow-hidden border border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={originalUrl}
                      alt="Original"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-slate-500 truncate max-w-[120px]">{selectedFile.name}</span>
                    <span className="text-sm font-bold text-slate-700">
                      {formatSize(originalSize)}
                    </span>
                  </div>
                </div>

                {/* Resized Result Preview */}
                <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 flex flex-col relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Preview Result
                    </span>
                    {resizedUrl && (
                      <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                        {width} x {height} px
                      </span>
                    )}
                  </div>
                  <div className="w-full h-48 flex items-center justify-center relative bg-white rounded-xl overflow-hidden border border-slate-100">
                    {isProcessing ? (
                      <div className="flex flex-col items-center gap-2">
                        <RefreshCw className="w-8 h-8 text-orange-500 animate-spin" />
                        <span className="text-xs font-medium text-slate-500">Resizing image...</span>
                      </div>
                    ) : resizedUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={resizedUrl}
                        alt="Resized result"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <span className="text-xs text-slate-400 block">Configure options and click "Resize Image"</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    {resizedUrl ? (
                      <>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-xs font-bold text-green-600">Processed</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-slate-800">
                            {formatSize(resizedSize)}
                          </span>
                          {sizeDiffPercent > 0 && (
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                              -{sizeDiffPercent}%
                            </span>
                          )}
                          {sizeDiffPercent < 0 && (
                            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                              +{Math.abs(sizeDiffPercent)}%
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400">No output generated yet</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Column */}
            <div className="lg:col-span-5 border border-slate-100 rounded-3xl p-6 bg-slate-50/50 space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-orange-600" />
                <h3 className="font-bold text-slate-800">Resize Settings</h3>
              </div>

              {/* Dimensions Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                    Dimensions (px)
                  </label>
                  <button
                    onClick={toggleAspectRatioLock}
                    className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      lockAspectRatio
                        ? "bg-orange-50 border-orange-200 text-orange-600 font-semibold"
                        : "bg-white border-slate-200 text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {lockAspectRatio ? (
                      <>
                        <Lock className="w-3.5 h-3.5" />
                        <span>Lock Aspect Ratio</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="w-3.5 h-3.5" />
                        <span>Unlock Aspect Ratio</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400">Width</span>
                    <input
                      type="number"
                      value={width}
                      min="1"
                      onChange={(e) => handleWidthChange(e.target.value)}
                      placeholder="e.g. 1920"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400">Height</span>
                    <input
                      type="number"
                      value={height}
                      min="1"
                      onChange={(e) => handleHeightChange(e.target.value)}
                      placeholder="e.g. 1080"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Fit Mode Selector */}
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                    Fit Mode
                  </label>
                  <div className="group relative">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-help" />
                    <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded bg-slate-900 p-2 text-center text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-md leading-normal z-10">
                      Inside: Maintain aspect ratio.<br />
                      Cover: Crop to fill dimensions.<br />
                      Fill: Stretch to exact size.
                    </span>
                  </div>
                </div>
                <select
                  value={fit}
                  onChange={(e) => setFit(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="inside">Preserve Aspect Ratio (Inside)</option>
                  <option value="cover">Crop to exact dimensions (Cover)</option>
                  <option value="fill">Stretch to exact dimensions (Fill)</option>
                </select>
              </div>

              {/* Format Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider block">
                  Output Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="original">Original Format</option>
                  <option value="webp">WebP (Highly Compressed)</option>
                  <option value="jpeg">JPEG (Standard Photo)</option>
                  <option value="png">PNG (Lossless/Transparency)</option>
                </select>
              </div>

              {/* Quality Slider */}
              {format !== "png" && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold uppercase text-slate-500 tracking-wider">
                    <span>Quality</span>
                    <span className="text-orange-600 font-bold">{quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                </div>
              )}

              {/* Process Button */}
              <button
                onClick={handleResize}
                disabled={isProcessing || !width || !height}
                className="w-full bg-slate-900 text-white font-semibold py-3 rounded-2xl hover:bg-slate-800 hover:shadow-md transition-all active:scale-98 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Processing Image...</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-5 h-5" />
                    <span>Resize Image</span>
                  </>
                )}
              </button>

              {/* Download Button */}
              {resizedUrl && (
                <button
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all hover:shadow-md active:scale-98 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Resized Image</span>
                </button>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}