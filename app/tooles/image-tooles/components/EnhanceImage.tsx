"use client";

import React, { useState } from "react";

export default function EnhanceImage() {
  const [mode, setMode] = useState("auto");

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Enhance Image</h2>
      <p className="text-sm text-slate-500 mt-1">Enhance colors, exposure, and sharpness with AI.</p>

      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input type="file" id="enhance-upload" className="hidden" />
        <label htmlFor="enhance-upload" className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500">
          Upload image file
        </label>
        <span className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 15MB</span>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">Enhance Filter Type</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: "auto", name: "Auto Boost" },
            { id: "hdr", name: "HDR Effect" },
            { id: "portrait", name: "Portrait Retouch" },
            { id: "denoise", name: "De-noise" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setMode(item.id)}
              className={`px-4 py-3 text-sm font-semibold rounded-xl border transition-all ${
                mode === item.id
                  ? "border-orange-500 bg-orange-50 text-orange-600 shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      <button className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm">
        Apply AI Enhancement
      </button>
    </div>
  );
}
