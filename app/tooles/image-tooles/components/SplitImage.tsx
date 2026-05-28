"use client";

import React, { useState } from "react";

export default function SplitImage() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(1);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Split Image</h2>
      <p className="text-sm text-slate-500 mt-1">Split an image into a grid of multiple sub-images.</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="split-upload" className="hidden" />
        <label htmlFor="split-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload image file
        </label>
        <span className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 15MB</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Columns (Horizontal)</label>
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(Math.max(1, Number(e.target.value)))}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-medium text-slate-800 focus:ring-orange-500 focus:border-orange-500"
            min="1"
            max="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Rows (Vertical)</label>
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Math.max(1, Number(e.target.value)))}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-medium text-slate-800 focus:ring-orange-500 focus:border-orange-500"
            min="1"
            max="10"
          />
        </div>
      </div>

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Split Image Now
      </button>
    </div>
  );
}
