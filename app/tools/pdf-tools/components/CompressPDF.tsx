"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, FileMinus, Download, CheckCircle2, AlertCircle, Sparkles, Percent, Sliders } from "lucide-react";
import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [percentage, setPercentage] = useState<number>(50); // Default 50%
  const [isCompressing, setIsCompressing] = useState(false);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [compressedBlobUrl, setCompressedBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFile = (uploadedFile: File | undefined) => {
    if (!uploadedFile) return;
    if (!uploadedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a valid PDF file.");
      return;
    }

    setError(null);
    setCompressedBlobUrl(null);
    setFile(uploadedFile);
    setOriginalSize(uploadedFile.size);
  };

  const handleCompress = async () => {
    if (!file) return;

    try {
      setIsCompressing(true);
      setError(null);

      // Create FormData to send file and percentage to FastAPI
      const formData = new FormData();
      formData.append("file", file);
      formData.append("percentage", percentage.toString());
      formData.append("compression_percentage", percentage.toString());

      const response = await apiClient.post(API_ENDPOINTS.PDF.COMPRESS, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const finalSize = blob.size;

      setCompressedSize(finalSize);
      const url = URL.createObjectURL(blob);
      setCompressedBlobUrl(url);
    } catch (err: any) {
      console.error("Compression API error:", err);

      // Handle blob response error messages
      let message = "Failed to compress PDF. Please try again.";
      if (err.response?.data instanceof Blob) {
        try {
          const text = await err.response.data.text();
          const json = JSON.parse(text);
          message = json.detail || json.message || message;
        } catch {
          // fallback to default
        }
      } else if (err.response?.data?.detail) {
        message = err.response.data.detail;
      } else if (err.message) {
        message = err.message;
      }

      setError(message);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlobUrl || !file) return;
    const a = document.createElement("a");
    a.href = compressedBlobUrl;
    a.download = `compressed_${percentage}pct_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    setFile(null);
    setCompressedBlobUrl(null);
    setError(null);
    setOriginalSize(0);
    setCompressedSize(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const presetPercentages = [
    { label: "Low (25%)", value: 25, desc: "Slight reduction, highest quality" },
    { label: "Recommended (50%)", value: 50, desc: "Balanced quality & file size" },
    { label: "High (75%)", value: 75, desc: "Maximum compression, smaller size" },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Compress PDF</h2>
        <p className="text-sm text-slate-500 mt-1">
          Reduce the file size of your PDF documents with customized compression percentages.
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
            Click to upload or drag and drop your PDF
          </p>
          <p className="text-xs text-slate-400 mt-1">PDF documents up to 100MB</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Selected File Info */}
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary-theme/10 text-primary-theme rounded-xl">
                <FileMinus className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm truncate max-w-xs">{file.name}</h4>
                <p className="text-xs text-slate-500">Original Size: {formatBytes(originalSize)}</p>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-xs font-semibold text-red-500 hover:underline px-2 py-1"
            >
              Change PDF
            </button>
          </div>

          {/* Compression Percentage Settings */}
          <div className="space-y-4 p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-primary-theme" />
                Compression Percentage
              </label>
              <div className="flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-lg text-primary-theme font-bold text-sm shadow-sm">
                <Percent className="w-3.5 h-3.5" />
                <span>{percentage}%</span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-1">
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-theme"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1">
                <span>10% (Low)</span>
                <span>50% (Standard)</span>
                <span>90% (Extreme)</span>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {presetPercentages.map((preset) => {
                const isSelected = percentage === preset.value;
                return (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setPercentage(preset.value)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary-theme bg-primary-theme/5 shadow-xs"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-800 flex items-center justify-between">
                      <span>{preset.label}</span>
                      {isSelected && <span className="w-2 h-2 rounded-full bg-primary-theme" />}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{preset.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!compressedBlobUrl ? (
            <button
              onClick={handleCompress}
              disabled={isCompressing}
              className="w-full py-3.5 px-6 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isCompressing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Compressing PDF ({percentage}%)...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Compress PDF ({percentage}%)
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm">PDF Compressed Successfully!</h5>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {formatBytes(originalSize)} → <span className="font-bold text-emerald-700">{formatBytes(compressedSize)}</span>
                      {originalSize > compressedSize && (
                        <span className="ml-2 font-bold text-emerald-600">
                          ({Math.round(((originalSize - compressedSize) / originalSize) * 100)}% reduced)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  Download Compressed PDF
                </button>
                <button
                  onClick={() => setCompressedBlobUrl(null)}
                  className="py-3.5 px-5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition cursor-pointer"
                >
                  Re-compress with different %
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

