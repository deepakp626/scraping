"use client";

import React, { useState } from "react";
import { Palette, Copy, Check } from "lucide-react";

export default function ColorConverter() {
  const [hex, setHex] = useState("#f97316");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // HEX to RGB
  const hexToRgb = (hexVal: string) => {
    const r = parseInt(hexVal.slice(1, 3), 16) || 0;
    const g = parseInt(hexVal.slice(3, 5), 16) || 0;
    const b = parseInt(hexVal.slice(5, 7), 16) || 0;
    return { r, g, b };
  };

  // RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const k = 1 - Math.max(r, g, b);
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    const c = Math.round(((1 - r - k) / (1 - k)) * 100);
    const m = Math.round(((1 - g - k) / (1 - k)) * 100);
    const y = Math.round(((1 - b - k) / (1 - k)) * 100);
    return { c, m, y, k: Math.round(k * 100) };
  };

  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const { c, m: cmykM, y: cmykY, k: cmykK } = rgbToCmyk(r, g, b);

  const formats = {
    hex: hex.toUpperCase(),
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${h}, ${s}%, ${l}%)`,
    cmyk: `cmyk(${c}%, ${cmykM}%, ${cmykY}%, ${cmykK}%)`,
  };

  const handleCopy = (field: keyof typeof formats) => {
    navigator.clipboard.writeText(formats[field]).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("#")) val = "#" + val;
    // Limit to valid hex characters
    val = val.replace(/[^#0-9a-fA-F]/g, "").slice(0, 7);
    setHex(val);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <Palette className="w-6 h-6 text-primary-theme" />
        Color Converter
      </h2>
      <p className="text-sm text-slate-500 mt-1">
        Convert HEX, RGB, HSL, and CMYK color formats instantly and preview colors in real-time.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Input & Pickers */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Color Hex Value
            </label>
            <div className="flex gap-3">
              <input
                type="color"
                value={hex.length === 7 ? hex : "#000000"}
                onChange={(e) => setHex(e.target.value)}
                className="w-14 h-12 rounded-xl border border-slate-200 p-0.5 cursor-pointer bg-slate-50"
              />
              <input
                type="text"
                value={hex}
                onChange={handleHexInput}
                placeholder="#000000"
                className="flex-1 px-4 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 focus:outline-none focus:border-primary-theme font-mono font-bold text-lg"
              />
            </div>
          </div>

          {/* Color Blocks */}
          <div
            className="w-full h-24 rounded-2xl border border-slate-100 shadow-inner transition-all duration-300"
            style={{ backgroundColor: hex }}
          />
        </div>

        {/* Output Values */}
        <div className="space-y-3.5">
          {(Object.keys(formats) as Array<keyof typeof formats>).map((field) => (
            <div key={field} className="flex flex-col border border-slate-100 p-3 bg-slate-50 rounded-xl">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {field}
                </span>
                <button
                  onClick={() => handleCopy(field)}
                  className="text-xs text-slate-500 hover:text-primary-theme flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                >
                  {copiedField === field ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="text-sm font-bold text-slate-700 font-mono select-all">
                {formats[field]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
