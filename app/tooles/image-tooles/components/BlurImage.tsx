"use client";

import React, { useState } from "react";

export default function BlurImage() {
  const [radius, setRadius] = useState(10);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Blur Image</h2>
      <p className="text-sm text-slate-500 mt-1">Soften details or apply professional blur filters to your image.</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="blur-upload" className="hidden" />
        <label htmlFor="blur-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload image file
        </label>
        <span className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 15MB</span>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
          <span>Blur Radius</span>
          <span className="text-orange-600 font-semibold">{radius}px</span>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>Subtle</span>
          <span>Intense</span>
        </div>
      </div>

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Apply Blur Effect
      </button>
    </div>
  );
}
