"use client";

import React, { useEffect, useRef, useState } from "react";
import imageCompression from "browser-image-compression";

export default function FlipVertical() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [preview, setPreview] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Upload image
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 2,
        maxWidthOrHeight: 2500,
        useWebWorker: true,
      });

      const imageUrl = URL.createObjectURL(compressedFile);

      setPreview(imageUrl);
      setIsFlipped(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Draw image on canvas
  useEffect(() => {
    if (!preview || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();

      // Vertical flip
      if (isFlipped) {
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
      }

      ctx.drawImage(img, 0, 0);

      ctx.restore();
    };

    img.src = preview;
  }, [preview, isFlipped]);

  // Download image
  const saveFlippedImage = () => {
  if (!canvasRef.current) return;

  const canvas = canvasRef.current;

  // Convert canvas to PNG
  canvas.toBlob(
    (blob) => {
      if (!blob) return;

      // Create temporary download URL
      const url = URL.createObjectURL(blob);

      // Create hidden download link
      const link = document.createElement("a");

      link.href = url;

      // File name
      link.download = "flipped-vertical.png";

      // Prevent popup
      document.body.appendChild(link);

      // Trigger direct download
      link.click();

      // Cleanup
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    },
    "image/png",
    1
  );
};

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">
        Flip Vertical
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Flip image vertically (upside-down effect).
      </p>

      {/* Upload Area */}
      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input
          type="file"
          id="flip-v-upload"
          className="hidden"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
        />

        <label
          htmlFor="flip-v-upload"
          className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500"
        >
          Upload image file
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
              className="max-w-full max-h-[500px]"
            />
          </div>
        </div>
      )}

      {/* Flip Button */}
      <div className="mt-6 flex flex-col items-center">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          disabled={!preview}
          className={`px-6 py-3 border font-semibold rounded-xl transition ${
            isFlipped
              ? "border-orange-500 bg-orange-50 text-orange-600 shadow-sm"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          } disabled:opacity-50`}
        >
          {isFlipped
            ? "✓ Vertical Flip Applied"
            : "↕ Click to Flip Vertically"}
        </button>
      </div>

      {/* Save Button */}
      <button
        onClick={saveFlippedImage}
        disabled={!preview}
        className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
      >
        Save Flipped Image
      </button>
    </div>
  );
}