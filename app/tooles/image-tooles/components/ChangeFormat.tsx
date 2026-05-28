"use client";

import React, { useState } from "react";

export default function ChangeFormat() {
  const [format, setFormat] = useState("png");

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Change Format</h2>
      <p className="text-sm text-slate-500 mt-1">Convert image to WebP, JPG, PNG, GIF, BMP, or TIFF.</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="format-upload" className="hidden" />
        <label htmlFor="format-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload image file
        </label>
        <span className="text-xs text-slate-400 mt-1">Any format up to 25MB</span>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Target Format</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="w-full border border-slate-200 rounded-xl p-2.5 bg-white text-slate-600 text-sm font-medium focus:ring-orange-500 focus:border-orange-500"
        >
          <option value="png">PNG (Portable Network Graphics)</option>
          <option value="jpg">JPG (Joint Photographic Group)</option>
          <option value="webp">WebP (Google Web Picture)</option>
          <option value="gif">GIF (Graphics Interchange Format)</option>
          <option value="bmp">BMP (Bitmap Image File)</option>
          <option value="tiff">TIFF (Tagged Image File Format)</option>
        </select>
      </div>

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Convert Image
      </button>
    </div>
  );
}
