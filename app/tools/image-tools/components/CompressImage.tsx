"use client";

import React, { useState, useRef } from "react";

export default function CompressImage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(70);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setSelectedFile(file);
    setOriginalSize(file.size);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    setCompressedUrl(null);
    setCompressedSize(0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processSelectedFile(file);
    }
  };

  const handleCompress = () => {
    if (!originalUrl || !selectedFile) return;

    setIsCompressing(true);

    const img = new Image();
    img.src = originalUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsCompressing(false);
        return;
      }

      // Keep original dimensions
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // Draw onto canvas
      ctx.drawImage(img, 0, 0);

      // Convert to compressed jpeg data URL
      const dataUrl = canvas.toDataURL("image/jpeg", quality / 100);
      setCompressedUrl(dataUrl);

      // Estimate compressed size from base64 length
      const base64Length = dataUrl.length - (dataUrl.indexOf(",") + 1);
      const padding =
        dataUrl.charAt(dataUrl.length - 2) === "="
          ? 2
          : dataUrl.charAt(dataUrl.length - 1) === "="
          ? 1
          : 0;
      const sizeInBytes = base64Length * 0.75 - padding;
      setCompressedSize(sizeInBytes);

      setIsCompressing(false);
    };

    img.onerror = () => {
      setIsCompressing(false);
    };
  };

  const handleDownload = () => {
    if (!compressedUrl || !selectedFile) return;

    const link = document.createElement("a");
    // Generate output file name: e.g. photo_compressed.jpg
    const nameWithoutExt = selectedFile.name.substring(
      0,
      selectedFile.name.lastIndexOf(".")
    ) || selectedFile.name;
    link.download = `${nameWithoutExt}_compressed.jpg`;
    link.href = compressedUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setOriginalUrl(null);
    setCompressedUrl(null);
    setQuality(70);
    setOriginalSize(0);
    setCompressedSize(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Compress Image</h2>
      <p className="text-sm text-slate-500 mt-1">
        Compress images locally in your browser without sacrificing quality.
      </p>

      {/* File Upload Dropzone */}
      {!selectedFile && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="mt-6 border-2 border-dashed border-slate-200 hover:border-orange-500 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50 cursor-pointer transition-colors group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-105 transition-transform duration-300">
            <svg
              className="w-8 h-8 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="mt-4 text-sm font-semibold text-slate-700">
            Drag and drop or <span className="text-orange-600 hover:underline">browse</span>
          </span>
          <span className="text-xs text-slate-400 mt-1">Supports PNG, JPG, WebP</span>
        </div>
      )}

      {/* Compression Workspace */}
      {selectedFile && originalUrl && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original Preview */}
            <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50 flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Original Image
              </span>
              <div className="w-full h-40 flex items-center justify-center relative bg-white rounded-xl overflow-hidden border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={originalUrl}
                  alt="Original"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <span className="mt-2 text-sm font-semibold text-slate-700">
                Size: {formatSize(originalSize)}
              </span>
            </div>

            {/* Compressed Preview */}
            <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50 flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Compressed Result
              </span>
              <div className="w-full h-40 flex items-center justify-center relative bg-white rounded-xl overflow-hidden border border-slate-200">
                {compressedUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={compressedUrl}
                    alt="Compressed"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-sm text-slate-400">Ready to compress</span>
                )}
              </div>
              <span className="mt-2 text-sm font-semibold text-slate-700">
                Size: {compressedSize ? formatSize(compressedSize) : "--"}
                {compressedSize > 0 && originalSize > 0 && (
                  <span className="text-green-600 ml-1.5 font-bold">
                    ({Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))}% saved)
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Settings Control */}
          <div className="border border-slate-100 rounded-2xl p-5 bg-slate-50">
            <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
              <span>Compression Level</span>
              <span className="text-orange-600 font-semibold">{quality}% quality</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              disabled={!!compressedUrl}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500 disabled:opacity-55"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>High Compression (Smaller file)</span>
              <span>Low Compression (Better quality)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {!compressedUrl ? (
              <button
                onClick={handleCompress}
                disabled={isCompressing}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-2xl transition-colors shadow-sm disabled:opacity-50"
              >
                {isCompressing ? "Compressing..." : "Compress Image"}
              </button>
            ) : (
              <button
                onClick={handleDownload}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-2xl transition-colors shadow-sm"
              >
                Download Compressed Image
              </button>
            )}
            <button
              onClick={resetForm}
              className="px-6 py-3 border border-slate-200 hover:bg-slate-50 font-semibold rounded-2xl transition text-slate-600"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}