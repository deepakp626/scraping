"use client";

import React, { useEffect, useRef, useState } from "react";
import imageCompression from "browser-image-compression";

export default function RotateImage() {
  const [rotation, setRotation] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle image upload
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);

      // Compress image before processing
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 2,
        maxWidthOrHeight: 2500,
        useWebWorker: true,
      });

      setSelectedFile(compressedFile);

      const imageUrl = URL.createObjectURL(compressedFile);
      setPreview(imageUrl);
      setRotation(0);
    } catch (error) {
      console.error("Image compression failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Draw rotated image on canvas
  useEffect(() => {
    if (!preview || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const img = new Image();

    img.onload = () => {
      const radians = (rotation * Math.PI) / 180;

      const isVertical = rotation === 90 || rotation === 270;

      canvas.width = isVertical ? img.height : img.width;
      canvas.height = isVertical ? img.width : img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(radians);

      ctx.drawImage(
        img,
        -img.width / 2,
        -img.height / 2,
        img.width,
        img.height
      );

      ctx.restore();
    };

    img.src = preview;
  }, [preview, rotation]);

  const rotateClockwise = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const rotateCounterClockwise = () => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  };

  // Download rotated image
  const saveRotatedImage = () => {
    if (!canvasRef.current || !selectedFile) return;

    const link = document.createElement("a");

    const extension =
      selectedFile.type === "image/png"
        ? "png"
        : selectedFile.type === "image/webp"
        ? "webp"
        : "jpg";

    link.download = `rotated-image.${extension}`;
    link.href = canvasRef.current.toDataURL(selectedFile.type, 1);

    link.click();
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">
        Rotate Image
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Rotate images clockwise or counter-clockwise.
      </p>

      {/* Upload Area */}
      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input
          type="file"
          id="rotate-upload"
          className="hidden"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
        />

        <label
          htmlFor="rotate-upload"
          className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500"
        >
          {loading ? "Processing..." : "Upload image file"}
        </label>

        <span className="text-xs text-slate-400 mt-1">
          PNG, JPG, WebP up to 15MB
        </span>
      </div>

      {/* Preview */}
      {preview && (
        <div className="mt-6 flex justify-center">
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-4">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[500px] object-contain"
            />
          </div>
        </div>
      )}

      {/* Rotation Controls */}
      <div className="mt-6 flex flex-col items-center">
        <span className="text-sm font-medium text-slate-700 mb-3">
          Current Rotation: {rotation}°
        </span>

        <div className="flex gap-4">
          <button
            onClick={rotateCounterClockwise}
            disabled={!preview}
            className="px-4 py-2 border border-slate-200 bg-white text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition disabled:opacity-50"
          >
            ↺ Rotate -90°
          </button>

          <button
            onClick={rotateClockwise}
            disabled={!preview}
            className="px-4 py-2 border border-slate-200 bg-white text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition disabled:opacity-50"
          >
            ↻ Rotate +90°
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={saveRotatedImage}
        disabled={!preview}
        className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
      >
        Save Rotated Image
      </button>
    </div>
  );
}