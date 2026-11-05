"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Upload,
  Download,
  RefreshCw,
  Grid3X3,
  Image as ImageIcon,
} from "lucide-react";

export default function SplitImage() {
  const [imageFile, setImageFile] = useState<File | null>(
    null
  );

  const [imageUrl, setImageUrl] = useState<string | null>(
    null
  );

  const [columns, setColumns] = useState(3);

  const [rows, setRows] = useState(1);

  const [splitImages, setSplitImages] = useState<string[]>(
    []
  );

  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }

      splitImages.forEach((url) =>
        URL.revokeObjectURL(url)
      );
    };
  }, [imageUrl, splitImages]);

  // Upload Image
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    splitImages.forEach((url) =>
      URL.revokeObjectURL(url)
    );

    setSplitImages([]);

    const url = URL.createObjectURL(file);

    setImageUrl(url);
  };

  // Split Image
  const handleSplitImage = async () => {
  if (!imageUrl) return;

  setIsProcessing(true);

  splitImages.forEach((url) =>
    URL.revokeObjectURL(url)
  );

  setSplitImages([]);

  const img = new Image();

  img.src = imageUrl;

  img.onload = async () => {
    const generatedImages: string[] = [];

    const originalWidth = img.width;

    const originalHeight = img.height;

    // Exact dimensions
    const pieceWidth = originalWidth / columns;

    const pieceHeight = originalHeight / rows;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        // Create fresh canvas every loop
        const canvas = document.createElement("canvas");

        const ctx = canvas.getContext("2d");

        if (!ctx) continue;

        // Handle last column/row remaining pixels
        const currentWidth =
          col === columns - 1
            ? originalWidth -
              Math.floor(pieceWidth) * col
            : Math.floor(pieceWidth);

        const currentHeight =
          row === rows - 1
            ? originalHeight -
              Math.floor(pieceHeight) * row
            : Math.floor(pieceHeight);

        canvas.width = currentWidth;

        canvas.height = currentHeight;

        ctx.drawImage(
          img,

          // Source X
          Math.floor(col * pieceWidth),

          // Source Y
          Math.floor(row * pieceHeight),

          // Source Width
          currentWidth,

          // Source Height
          currentHeight,

          // Destination X
          0,

          // Destination Y
          0,

          // Destination Width
          currentWidth,

          // Destination Height
          currentHeight
        );

        const blob = await new Promise<Blob | null>(
          (resolve) => {
            canvas.toBlob(
              (blob) => resolve(blob),
              "image/png",
              1
            );
          }
        );

        if (blob) {
          const url =
            URL.createObjectURL(blob);

          generatedImages.push(url);
        }
      }
    }

    setSplitImages(generatedImages);

    setIsProcessing(false);
  };

  img.onerror = () => {
    setIsProcessing(false);

    alert("Failed to load image.");
  };
};

  // Download Single Piece
  const handleDownloadPiece = (
    url: string,
    index: number
  ) => {
    const link = document.createElement("a");

    link.href = url;

    link.download = `split-piece-${
      index + 1
    }.png`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  // Download All
  const handleDownloadAll = () => {
    splitImages.forEach((url, index) => {
      setTimeout(() => {
        handleDownloadPiece(url, index);
      }, index * 300);
    });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <h2 className="text-2xl font-bold text-slate-800">
        Split Image
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Split an image into a grid of multiple
        sub-images.
      </p>

      {/* Upload */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:border-orange-400 hover:bg-orange-50/30 transition-all cursor-pointer"
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="p-4 rounded-full bg-orange-100 text-orange-600">
          <Upload className="w-7 h-7" />
        </div>

        <label className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500 mt-4">
          Upload image file
        </label>

        <span className="text-xs text-slate-400 mt-1">
          PNG, JPG, WebP up to 15MB
        </span>
      </div>

      {/* Preview */}
      {imageUrl && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            Original Image
          </h3>

          <div className="bg-white border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Preview"
              className="max-h-[400px] max-w-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Settings */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {/* Columns */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Columns (Horizontal)
          </label>

          <input
            type="number"
            value={columns}
            onChange={(e) =>
              setColumns(
                Math.max(
                  1,
                  Math.min(
                    10,
                    Number(e.target.value)
                  )
                )
              )
            }
            className="w-full border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-800 focus:ring-orange-500 focus:border-orange-500"
            min="1"
            max="10"
          />
        </div>

        {/* Rows */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Rows (Vertical)
          </label>

          <input
            type="number"
            value={rows}
            onChange={(e) =>
              setRows(
                Math.max(
                  1,
                  Math.min(
                    10,
                    Number(e.target.value)
                  )
                )
              )
            }
            className="w-full border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-800 focus:ring-orange-500 focus:border-orange-500"
            min="1"
            max="10"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 rounded-2xl bg-orange-50 border border-orange-100 p-4">
        <div className="flex items-center gap-2 text-orange-700">
          <Grid3X3 className="w-5 h-5" />

          <p className="text-sm font-medium">
            Total Pieces:{" "}
            <span className="font-bold">
              {columns * rows}
            </span>
          </p>
        </div>
      </div>

      {/* Split Button */}
      <button
        onClick={handleSplitImage}
        disabled={!imageUrl || isProcessing}
        className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <RefreshCw className="w-5 h-5 animate-spin" />

            Splitting Image...
          </>
        ) : (
          "Split Image Now"
        )}
      </button>

      {/* Result */}
      {splitImages.length > 0 && (
        <div className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h3 className="text-lg font-semibold text-slate-800">
              Split Results
            </h3>

            <button
              onClick={handleDownloadAll}
              className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Download className="w-4 h-4" />

              Download All
            </button>
          </div>

          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {splitImages.map((url, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden"
              >
                <div className="bg-white flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Split ${index + 1}`}
                    className="w-full object-contain"
                  />
                </div>

                <div className="p-3 border-t border-slate-200">
                  <button
                    onClick={() =>
                      handleDownloadPiece(
                        url,
                        index
                      )
                    }
                    className="w-full bg-slate-900 text-white px-3 py-2 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />

                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!imageUrl && (
        <div className="mt-8 text-center text-slate-400">
          <ImageIcon className="w-10 h-10 mx-auto mb-2" />

          <p className="text-sm">
            Upload image to start splitting
          </p>
        </div>
      )}

      {/* Hidden Canvas */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}