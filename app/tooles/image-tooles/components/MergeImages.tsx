"use client";

import React, { useState } from "react";

export default function MergeImages() {
  const [direction, setDirection] = useState("horizontal");
  const [spacing, setSpacing] = useState(10);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Merge Images</h2>
      <p className="text-sm text-slate-500 mt-1">Combine multiple images side-by-side or vertically stacked.</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="merge-upload" multiple className="hidden" />
        <label htmlFor="merge-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload images
        </label>
        <span className="text-xs text-slate-400 mt-1">Select 2 or more files</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Merge Layout</label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 bg-white text-slate-600 text-sm font-medium focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="horizontal">Horizontal Side-by-Side</option>
            <option value="vertical">Vertical Stack</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Spacing ({spacing}px)</label>
          <input
            type="number"
            value={spacing}
            onChange={(e) => setSpacing(Math.max(0, Number(e.target.value)))}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-medium text-slate-800 focus:ring-orange-500 focus:border-orange-500"
            min="0"
          />
        </div>
      </div>

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Merge Images Now
      </button>
    </div>
  );
}
