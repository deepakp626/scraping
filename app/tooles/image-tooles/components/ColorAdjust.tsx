"use client";

import React, { useState } from "react";

export default function ColorAdjust() {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [hue, setHue] = useState(0);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Color Adjust</h2>
      <p className="text-sm text-slate-500 mt-1">Calibrate brightness, contrast, saturation, and hue.</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="color-upload" className="hidden" />
        <label htmlFor="color-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload image file
        </label>
        <span className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 15MB</span>
      </div>

      <div className="mt-6 space-y-4">
        {/* Brightness */}
        <div>
          <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
            <span>Brightness</span>
            <span className="text-orange-600 font-semibold">{brightness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        {/* Contrast */}
        <div>
          <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
            <span>Contrast</span>
            <span className="text-orange-600 font-semibold">{contrast}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        {/* Saturation */}
        <div>
          <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
            <span>Saturation</span>
            <span className="text-orange-600 font-semibold">{saturation}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            value={saturation}
            onChange={(e) => setSaturation(Number(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        {/* Hue */}
        <div>
          <div className="flex justify-between text-sm font-medium text-slate-700 mb-1">
            <span>Hue Rotation</span>
            <span className="text-orange-600 font-semibold">{hue}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>
      </div>

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Apply Color Adjustments
      </button>
    </div>
  );
}
