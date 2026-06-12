"use client";

import React, { useEffect, useRef, useState } from "react";

export default function AddText() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [text, setText] = useState("Enter caption text");
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState("#000000");

  // Text position states
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);

  // Upload image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        setImage(img);

        // Set default canvas size
        const canvas = canvasRef.current;

        if (canvas) {
          canvas.width = img.width;
          canvas.height = img.height;
        }
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  };

  // Draw image + text
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Draw text
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = color;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    // Add shadow
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 4;

    // Stroke + Fill text
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
  }, [image, text, fontSize, color, x, y]);

  // Download image
  const handleDownload = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const link = document.createElement("a");

    link.download = "edited-image.png";
    link.href = canvas.toDataURL("image/png");

    link.click();
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">
        Add Text to Image
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Overlay stylized captions or banners onto your photo.
      </p>

      {/* Upload Section */}
      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input
          type="file"
          id="text-image-upload"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        <label
          htmlFor="text-image-upload"
          className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500"
        >
          Upload image file
        </label>

        <span className="text-xs text-slate-400 mt-1">
          PNG, JPG, WebP up to 15MB
        </span>
      </div>

      {/* Controls */}
      <div className="mt-6 space-y-4">
        {/* Text */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Text Caption
          </label>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-medium text-slate-800 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter custom text..."
          />
        </div>

        {/* Font Size + Color */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Font Size ({fontSize}px)
            </label>

            <input
              type="range"
              min="10"
              max="100"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500 mt-2"
            />
          </div>

          {/* Text Color */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Text Color
            </label>

            <div className="flex gap-2 items-center mt-1">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer"
              />

              <span className="text-xs font-mono uppercase text-slate-500">
                {color}
              </span>
            </div>
          </div>
        </div>

        {/* Position Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* X Position */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              X Position ({x}px)
            </label>

            <input
              type="range"
              min="0"
              max="1000"
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Y Position */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Y Position ({y}px)
            </label>

            <input
              type="range"
              min="0"
              max="1000"
              value={y}
              onChange={(e) => setY(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Canvas Preview */}
      <div className="mt-6 overflow-auto rounded-2xl border border-slate-200 bg-slate-100 p-3">
        {image ? (
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto rounded-xl"
          />
        ) : (
          <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
            Upload an image to preview
          </div>
        )}
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={!image}
        className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Add Text & Save
      </button>
    </div>
  );
}