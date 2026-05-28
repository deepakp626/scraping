"use client";

import React, { useState } from "react";

export default function ImageToPdf() {
  const [orientation, setOrientation] = useState("portrait");
  const [margin, setMargin] = useState("none");

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Image to PDF</h2>
      <p className="text-sm text-slate-500 mt-1">Convert one or more images into a PDF document.</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="pdf-upload" multiple className="hidden" />
        <label htmlFor="pdf-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload image files
        </label>
        <span className="text-xs text-slate-400 mt-1">Select one or multiple images</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Orientation</label>
          <select
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 bg-white text-slate-600 text-sm font-medium focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Margins</label>
          <select
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 bg-white text-slate-600 text-sm font-medium focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="none">No Margin</option>
            <option value="small">Small Margin</option>
            <option value="large">Large Margin</option>
          </select>
        </div>
      </div>

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Generate PDF Document
      </button>
    </div>
  );
}
