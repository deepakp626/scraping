"use client";

import React, { useState } from "react";

export default function ConvertPng() {
  const [transparency, setTransparency] = useState(true);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Convert to PNG</h2>
      <p className="text-sm text-slate-500 mt-1">Convert images to PNG format with transparency options.</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="png-upload" className="hidden" />
        <label htmlFor="png-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload image file
        </label>
        <span className="text-xs text-slate-400 mt-1">Any image format up to 20MB</span>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-slate-700 block">Preserve Transparency</label>
          <span className="text-xs text-slate-400">Keep alpha channel transparency if present.</span>
        </div>
        <button
          onClick={() => setTransparency(!transparency)}
          className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${
            transparency ? "bg-orange-500" : "bg-slate-200"
          }`}
        >
          <span
            className={`w-5 h-5 bg-white rounded-full transition-transform absolute shadow-sm ${
              transparency ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Convert to PNG
      </button>
    </div>
  );
}
