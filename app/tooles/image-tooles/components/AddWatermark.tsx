"use client";

import React, { useState } from "react";

export default function AddWatermark() {
  const [text, setText] = useState("© Watermark");
  const [opacity, setOpacity] = useState(50);
  const [position, setPosition] = useState("center");

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Add Watermark</h2>
      <p className="text-sm text-slate-500 mt-1">Overlay text-based copyright protection onto your image.</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="watermark-upload" className="hidden" />
        <label htmlFor="watermark-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload image file
        </label>
        <span className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 12MB</span>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Watermark Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-medium text-slate-800 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Type watermark message..."
          />
        </div>

        <div>
          <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
            <span>Watermark Opacity</span>
            <span className="text-orange-600 font-semibold">{opacity}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Alignment Position</label>
          <div className="grid grid-cols-3 gap-2 max-w-[240px]">
            {["top-left", "top-center", "top-right", "middle-left", "center", "middle-right", "bottom-left", "bottom-center", "bottom-right"].map((pos) => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                className={`py-2 text-[10px] uppercase font-bold rounded-lg border transition-all ${
                  position === pos
                    ? "border-orange-500 bg-orange-50 text-orange-600"
                    : "border-slate-200 bg-white text-slate-400 hover:bg-slate-50"
                }`}
              >
                {pos.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Add Watermark to Image
      </button>
    </div>
  );
}
