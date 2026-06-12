"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Upload,
  Download,
  RefreshCw,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

const FORMAT_OPTIONS = [
  {
    value: "image/jpeg",
    label: "JPG / JPEG",
    ext: "jpg",
    quality: true,
  },
  {
    value: "image/png",
    label: "PNG",
    ext: "png",
    quality: false,
  },
  {
    value: "image/webp",
    label: "WebP",
    ext: "webp",
    quality: true,
  },
  {
    value: "image/avif",
    label: "AVIF",
    ext: "avif",
    quality: true,
  },
  {
    value: "image/gif",
    label: "GIF",
    ext: "gif",
    quality: false,
  },
  {
    value: "image/bmp",
    label: "BMP",
    ext: "bmp",
    quality: false,
  },
  {
    value: "image/tiff",
    label: "TIFF",
    ext: "tiff",
    quality: false,
  },
  {
    value: "image/x-icon",
    label: "ICO",
    ext: "ico",
    quality: false,
  },
  {
    value: "image/svg+xml",
    label: "SVG",
    ext: "svg",
    quality: false,
  },
  {
    value: "image/heic",
    label: "HEIC",
    ext: "heic",
    quality: true,
  },
];

export default function ChangeFormat() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [originalUrl, setOriginalUrl] = useState<string | null>(null);

  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);

  const [format, setFormat] = useState("image/webp");

  const [quality, setQuality] = useState(90);

  const [isConverting, setIsConverting] = useState(false);

  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);

      if (convertedUrl) URL.revokeObjectURL(convertedUrl);
    };
  }, [originalUrl, convertedUrl]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setConvertedUrl(null);

    setSelectedFile(file);

    if (originalUrl) {
      URL.revokeObjectURL(originalUrl);
    }

    const previewUrl = URL.createObjectURL(file);

    setOriginalUrl(previewUrl);
  };

const handleConvert = async () => {
  if (!selectedFile) {
    setError("Please upload image first.");
    return;
  }

  try {
    setIsConverting(true);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("format", format);
    formData.append("quality", quality.toString());

    const response = await fetch("/api/image-tooles/convert", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to convert image.");
    }

    const blob = await response.blob();
    
    if (convertedUrl) {
      URL.revokeObjectURL(convertedUrl);
    }

    const url = URL.createObjectURL(blob);
    setConvertedUrl(url);
  } catch (err: any) {
    console.error(err);
    setError(err.message || "Something went wrong.");
  } finally {
    setIsConverting(false);
  }
};  

  const handleDownload = () => {
    if (!convertedUrl || !selectedFile) return;

    const selectedFormat = FORMAT_OPTIONS.find(
      (item) => item.value === format
    );

    const extension = selectedFormat?.ext || "png";

    const fileName =
      selectedFile.name.split(".").slice(0, -1).join(".") ||
      "converted-image";

    const link = document.createElement("a");

    link.href = convertedUrl;

    link.download = `${fileName}.${extension}`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  const selectedFormatMeta = FORMAT_OPTIONS.find(
    (item) => item.value === format
  );

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Change Format
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Convert image to JPG, PNG, WebP, AVIF, GIF, BMP,
          TIFF, ICO, SVG, and HEIC.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />

          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Upload Box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:border-orange-400 hover:bg-orange-50/30 transition-all cursor-pointer"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div className="p-4 rounded-full bg-orange-100 text-orange-600">
          <Upload className="w-7 h-7" />
        </div>

        <span className="mt-4 text-sm font-semibold text-orange-600">
          Upload image file
        </span>

        <span className="text-xs text-slate-400 mt-1">
          Supports JPG, PNG, WebP, GIF, BMP, TIFF, ICO, SVG,
          HEIC
        </span>
      </div>

      {/* Preview Section */}
      {originalUrl && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Original */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-700">
                Original Image
              </h3>

              <span className="text-xs font-medium text-slate-500">
                {selectedFile?.type.split("/")[1]?.toUpperCase()}
              </span>
            </div>

            <div className="h-64 rounded-xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={originalUrl}
                alt="Original"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Converted */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-700">
                Converted Image
              </h3>

              {convertedUrl && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="w-4 h-4" />

                  <span className="text-xs font-semibold">
                    Ready
                  </span>
                </div>
              )}
            </div>

            <div className="h-64 rounded-xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden">
              {isConverting ? (
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />

                  <span className="text-sm text-slate-500">
                    Converting...
                  </span>
                </div>
              ) : convertedUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={convertedUrl}
                    alt="Converted"
                    className="max-h-full max-w-full object-contain"
                  />
                </>
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />

                  <p className="text-sm text-slate-400">
                    Converted image preview
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Format Select */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Target Format
        </label>

        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full border border-slate-200 rounded-xl p-3 bg-white text-slate-700 text-sm font-medium focus:ring-orange-500 focus:border-orange-500"
        >
          {FORMAT_OPTIONS.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* Quality */}
      {selectedFormatMeta?.quality && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">
              Quality
            </label>

            <span className="text-sm font-semibold text-orange-600">
              {quality}%
            </span>
          </div>

          <input
            type="range"
            min="10"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>
      )}

      {/* Convert Button */}
      <button
        onClick={handleConvert}
        disabled={isConverting}
        className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
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
              Convert to {selectedFormatMeta?.label}
            </span>
          </>
        )}
      </button>

      {/* Download */}
      {convertedUrl && (
        <button
          onClick={handleDownload}
          className="w-full mt-4 bg-orange-500 text-white font-medium px-4 py-3 rounded-2xl hover:bg-orange-600 transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          <Download className="w-5 h-5" />

          <span>
            Download {selectedFormatMeta?.ext.toUpperCase()}
          </span>
        </button>
      )}
    </div>
  );
}