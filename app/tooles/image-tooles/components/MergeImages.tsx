"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Upload,
  Download,
  Image as ImageIcon,
  RefreshCw,
  Trash2,
} from "lucide-react";

export default function MergeImages() {
  const [images, setImages] = useState<File[]>([]);

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [mergedImage, setMergedImage] = useState<string | null>(null);

  const [direction, setDirection] = useState("horizontal");

  const [spacing, setSpacing] = useState(10);

  const [backgroundColor, setBackgroundColor] =
    useState("#ffffff");

  const [padding, setPadding] = useState(0);

  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));

      if (mergedImage) URL.revokeObjectURL(mergedImage);
    };
  }, [previewUrls, mergedImage]);

  // Upload Images
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    if (files.length < 2) {
      alert("Please select at least 2 images.");
      return;
    }

    setImages(files);

    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    const urls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewUrls(urls);

    setMergedImage(null);
  };

  // Remove Image
  const removeImage = (index: number) => {
    const updatedFiles = [...images];

    const updatedUrls = [...previewUrls];

    URL.revokeObjectURL(updatedUrls[index]);

    updatedFiles.splice(index, 1);

    updatedUrls.splice(index, 1);

    setImages(updatedFiles);

    setPreviewUrls(updatedUrls);

    setMergedImage(null);
  };

  // Merge Images
  const mergeImages = async () => {
  if (previewUrls.length < 2) return;

  setIsProcessing(true);

  const canvas = canvasRef.current;

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (!ctx) return;

  // Load all images
  const loadedImages = await Promise.all(
    previewUrls.map((url) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();

        img.src = url;

        img.onload = () => resolve(img);
      });
    })
  );

  let canvasWidth = 0;
  let canvasHeight = 0;

  // Horizontal Merge
  if (direction === "horizontal") {
    canvasWidth =
      loadedImages.reduce(
        (total, img) => total + img.width,
        0
      ) +
      spacing * (loadedImages.length - 1) +
      padding * 2;

    canvasHeight =
      Math.max(
        ...loadedImages.map((img) => img.height)
      ) +
      padding * 2;
  }

  // Vertical Merge
  else {
    canvasWidth =
      Math.max(
        ...loadedImages.map((img) => img.width)
      ) +
      padding * 2;

    canvasHeight =
      loadedImages.reduce(
        (total, img) => total + img.height,
        0
      ) +
      spacing * (loadedImages.length - 1) +
      padding * 2;
  }

  canvas.width = canvasWidth;

  canvas.height = canvasHeight;

  // Background
  ctx.fillStyle = backgroundColor;

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let currentX = padding;

  let currentY = padding;

  loadedImages.forEach((img) => {
    if (direction === "horizontal") {
      // Center image vertically
      const y =
        (canvasHeight - img.height) / 2;

      ctx.drawImage(img, currentX, y);

      currentX += img.width + spacing;
    } else {
      // Center image horizontally
      const x =
        (canvasWidth - img.width) / 2;

      ctx.drawImage(img, x, currentY);

      currentY += img.height + spacing;
    }
  });

  canvas.toBlob(
    (blob) => {
      if (!blob) {
        setIsProcessing(false);
        return;
      }

      if (mergedImage) {
        URL.revokeObjectURL(mergedImage);
      }

      const url = URL.createObjectURL(blob);

      setMergedImage(url);

      setIsProcessing(false);
    },
    "image/png",
    1
  );
};

  // Download
  const downloadMergedImage = () => {
    if (!mergedImage) return;

    const link = document.createElement("a");

    link.href = mergedImage;

    link.download = "merged-image.png";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <h2 className="text-2xl font-bold text-slate-800">
        Merge Images
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Combine multiple images side-by-side or vertically
        stacked.
      </p>

      {/* Upload */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:border-orange-400 hover:bg-orange-50/30 transition-all cursor-pointer"
      >
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="p-4 rounded-full bg-orange-100 text-orange-600">
          <Upload className="w-7 h-7" />
        </div>

        <label className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500 mt-4">
          Upload images
        </label>

        <span className="text-xs text-slate-400 mt-1">
          Select 2 or more files
        </span>
      </div>

      {/* Image Preview */}
      {previewUrls.length > 0 && (
        <div className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewUrls.map((url, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-full h-36 object-cover"
                />

                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-red-500 hover:text-white transition-all p-2 rounded-full shadow"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Layout */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Merge Layout
          </label>

          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-3 bg-white text-slate-600 text-sm font-medium focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="horizontal">
              Horizontal Side-by-Side
            </option>

            <option value="vertical">
              Vertical Stack
            </option>
          </select>
        </div>

        {/* Spacing */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Spacing ({spacing}px)
          </label>

          <input
            type="number"
            value={spacing}
            onChange={(e) =>
              setSpacing(Math.max(0, Number(e.target.value)))
            }
            className="w-full border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-800 focus:ring-orange-500 focus:border-orange-500"
            min="0"
          />
        </div>

        {/* Padding */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Canvas Padding ({padding}px)
          </label>

          <input
            type="number"
            value={padding}
            onChange={(e) =>
              setPadding(Math.max(0, Number(e.target.value)))
            }
            className="w-full border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-800 focus:ring-orange-500 focus:border-orange-500"
            min="0"
          />
        </div>

        {/* Background */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Background Color
          </label>

          <input
            type="color"
            value={backgroundColor}
            onChange={(e) =>
              setBackgroundColor(e.target.value)
            }
            className="w-full h-12 border border-slate-200 rounded-xl bg-white cursor-pointer"
          />
        </div>
      </div>

      {/* Merge Button */}
      <button
        onClick={mergeImages}
        disabled={previewUrls.length < 2 || isProcessing}
        className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />

            Merging Images...
          </>
        ) : (
          "Merge Images Now"
        )}
      </button>

      {/* Result */}
      {mergedImage && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Merged Result
          </h3>

          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-center min-h-[300px] bg-white rounded-xl border border-slate-100 overflow-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mergedImage}
                alt="Merged Result"
                className="max-w-full h-auto"
              />
            </div>
          </div>

          {/* Download */}
          <button
            onClick={downloadMergedImage}
            className="w-full mt-5 bg-orange-500 text-white font-medium px-4 py-3 rounded-2xl hover:bg-orange-600 transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />

            Download Merged Image
          </button>
        </div>
      )}

      {/* Empty State */}
      {previewUrls.length === 0 && (
        <div className="mt-8 text-center text-slate-400">
          <ImageIcon className="w-10 h-10 mx-auto mb-2" />

          <p className="text-sm">
            Upload multiple images to start merging
          </p>
        </div>
      )}

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}