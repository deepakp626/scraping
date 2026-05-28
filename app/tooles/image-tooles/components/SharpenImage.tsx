"use client";

import React, { useState } from "react";

export default function SharpenImage() {
  const [intensity, setIntensity] = useState(30);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Sharpen Image</h2>
      <p className="text-sm text-slate-500 mt-1">Make blurry details in your photo crisp and clear.</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="sharpen-upload" className="hidden" />
        <label htmlFor="sharpen-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload image file
        </label>
        <span className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 15MB</span>
      </div>

      <div className="mt-6">
        <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
          <span>Sharpen Intensity</span>
          <span className="text-orange-600 font-semibold">{intensity}%</span>
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>Light correction</span>
          <span>Strong sharpening</span>
        </div>
      </div>

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Apply Sharpen Filter
      </button>
    </div>
  );
}
