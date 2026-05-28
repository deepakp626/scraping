"use client";

import React, { useState } from "react";

export default function RemoveBg() {
  const [highQuality, setHighQuality] = useState(false);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Remove Background</h2>
      <p className="text-sm text-slate-500 mt-1">Erase the background of any portrait or product photo.</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="bg-upload" className="hidden" />
        <label htmlFor="bg-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload image file
        </label>
        <span className="text-xs text-slate-400 mt-1">Supports portraits, products, and animals</span>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-slate-700 block">HD Output Mode</label>
          <span className="text-xs text-slate-400">Process at full resolution for maximum detail.</span>
        </div>
        <button
          onClick={() => setHighQuality(!highQuality)}
          className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${
            highQuality ? "bg-orange-500" : "bg-slate-200"
          }`}
        >
          <span
            className={`w-5 h-5 bg-white rounded-full transition-transform absolute shadow-sm ${
              highQuality ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Remove Background
      </button>
    </div>
  );
}
