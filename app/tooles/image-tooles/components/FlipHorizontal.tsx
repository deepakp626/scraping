"use client";

import React, { useEffect, useRef, useState } from "react";
import imageCompression from "browser-image-compression";

export default function FlipHorizontal() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Upload image
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoading(true);

      // Compress image
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 2,
        maxWidthOrHeight: 2500,
        useWebWorker: true,
      });

      const imageUrl = URL.createObjectURL(compressedFile);

      setPreview(imageUrl);
      setIsFlipped(false);
    } catch (error) {
      console.error("Image processing failed:", error);
    } finally {
      setLoading(false);
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

      // Horizontal flip
      if (isFlipped) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      ctx.drawImage(img, 0, 0);

      ctx.restore();
    };

    img.src = preview;
  }, [preview, isFlipped]);

  // Download image
  const saveFlippedImage = async () => {
    if (!canvasRef.current) return;

    try {
      const canvas = canvasRef.current;

      canvas.toBlob(
        (blob) => {
          if (!blob) return;

          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");

          // IMPORTANT
          link.download = "flipped-horizontal.png";

          link.href = url;

          document.body.appendChild(link);

          link.click();

          document.body.removeChild(link);

          window.URL.revokeObjectURL(url);
        },
        "image/png",
        1
      );
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">
        Flip Horizontal
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Flip image horizontally (mirror effect).
      </p>

      {/* Upload Area */}
      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input
          type="file"
          id="flip-h-upload"
          className="hidden"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
        />

        <label
          htmlFor="flip-h-upload"
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
            ? "✓ Horizontal Flip Applied"
            : "↔ Click to Flip Horizontally"}
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