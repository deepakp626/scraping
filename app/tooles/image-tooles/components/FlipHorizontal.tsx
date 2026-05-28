"use client";

import React, { useState } from "react";

export default function FlipHorizontal() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Flip Horizontal</h2>
      <p className="text-sm text-slate-500 mt-1">Flip image horizontally (mirror effect).</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="flip-h-upload" className="hidden" />
        <label htmlFor="flip-h-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload image file
        </label>
        <span className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 15MB</span>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className={`px-6 py-3 border font-semibold rounded-xl transition ${
            isFlipped
              ? "border-orange-500 bg-orange-50 text-orange-600 shadow-sm"
              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          {isFlipped ? "✓ Horizontal Flip Applied" : "↔ Click to Flip Horizontally"}
        </button>
      </div>

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Save Flipped Image
      </button>
    </div>
  );
}
