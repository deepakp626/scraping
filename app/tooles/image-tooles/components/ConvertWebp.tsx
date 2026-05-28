"use client";

import React, { useState } from "react";

export default function ConvertWebp() {
  const [quality, setQuality] = useState(80);
  const [lossless, setLossless] = useState(false);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Convert to WebP</h2>
      <p className="text-sm text-slate-500 mt-1">Convert image to highly compressed WebP format.</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="webp-upload" className="hidden" />
        <label htmlFor="webp-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload image file
        </label>
        <span className="text-xs text-slate-400 mt-1">Supports PNG, JPG, GIF, etc.</span>
      </div>

      <div className="mt-6 flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <label className="text-sm font-medium text-slate-700 block">Lossless Mode</label>
          <span className="text-xs text-slate-400">Save image without any quality reduction.</span>
        </div>
        <button
          onClick={() => setLossless(!lossless)}
          className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${
            lossless ? "bg-orange-500" : "bg-slate-200"
          }`}
        >
          <span
            className={`w-5 h-5 bg-white rounded-full transition-transform absolute shadow-sm ${
              lossless ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {!lossless && (
        <div className="mt-4">
          <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
            <span>Quality Level</span>
            <span className="text-orange-600 font-semibold">{quality}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="100"
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>
      )}

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Convert to WebP
      </button>
    </div>
  );
}
