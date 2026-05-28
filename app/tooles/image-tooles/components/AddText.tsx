"use client";

import React, { useState } from "react";

export default function AddText() {
  const [text, setText] = useState("Enter caption text");
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState("#000000");

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Add Text to Image</h2>
      <p className="text-sm text-slate-500 mt-1">Overlay stylized captions or banners onto your photo.</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="text-image-upload" className="hidden" />
        <label htmlFor="text-image-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload image file
        </label>
        <span className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 15MB</span>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Text Caption</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-medium text-slate-800 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Enter custom text..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Font Size ({fontSize}px)</label>
            <input
              type="range"
              min="10"
              max="100"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500 mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Text Color</label>
            <div className="flex gap-2 items-center mt-1">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 rounded-lg border-0 cursor-pointer p-0"
              />
              <span className="text-xs font-mono uppercase text-slate-500">{color}</span>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Add Text & Save
      </button>
    </div>
  );
}
