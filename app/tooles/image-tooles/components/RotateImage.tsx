"use client";

import React, { useState } from "react";

export default function RotateImage() {
  const [rotation, setRotation] = useState(0);

  const rotateClockwise = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const rotateCounterClockwise = () => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Rotate Image</h2>
      <p className="text-sm text-slate-500 mt-1">Rotate images clockwise or counter-clockwise.</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="rotate-upload" className="hidden" />
        <label htmlFor="rotate-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload image file
        </label>
        <span className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 15MB</span>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <span className="text-sm font-medium text-slate-700 mb-3">Current Rotation: {rotation}°</span>
        <div className="flex gap-4">
          <button
            onClick={rotateCounterClockwise}
            className="px-4 py-2 border border-slate-200 bg-white text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition"
          >
            ↺ Rotate -90°
          </button>
          <button
            onClick={rotateClockwise}
            className="px-4 py-2 border border-slate-200 bg-white text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition"
          >
            ↻ Rotate +90°
          </button>
        </div>
      </div>

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Save Rotated Image
      </button>
    </div>
  );
}
