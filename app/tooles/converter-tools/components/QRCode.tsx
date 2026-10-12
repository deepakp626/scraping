"use client";

import React, { useState } from "react";
import { QrCode, Download, RefreshCw } from "lucide-react";

export default function QRCodeGenerator() {
  const [input, setInput] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!input.trim()) return;
    setIsGenerating(true);
    // Use stable public QR Code API
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(input)}`;
    setQrUrl(url);
    setIsGenerating(false);
  };

  const handleDownload = async () => {
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      alert("Failed to download QR Code. You can right-click the image to save it.");
    }
  };

  const handleClear = () => {
    setInput("");
    setQrUrl("");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <QrCode className="w-6 h-6 text-primary-theme" />
        QR Code Generator
      </h2>
      <p className="text-sm text-slate-500 mt-1">
        Generate high-quality QR codes from any text, URL, email, or contact detail.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Settings / Input */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              QR Code Content (Text or URL)
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or paste link/text here to generate QR..."
              className="w-full min-h-[150px] p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-theme text-sm resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              disabled={!input.trim() || isGenerating}
              className="flex-1 bg-primary-theme hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-5 h-5 ${isGenerating ? "animate-spin" : ""}`} />
              Generate QR
            </button>
            <button
              onClick={handleClear}
              className="px-6 py-3 border border-slate-200 hover:bg-slate-50 font-semibold rounded-2xl transition text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        {/* QR Code Output Preview */}
        <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50 flex flex-col items-center justify-center min-h-[260px]">
          {qrUrl ? (
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt="Generated QR Code"
                  className="w-48 h-48 object-contain"
                />
              </div>
              <button
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-xl transition-all shadow-sm flex items-center gap-2 text-sm cursor-pointer"
              >
                <Download className="w-4.5 h-4.5" />
                Download PNG
              </button>
            </div>
          ) : (
            <div className="text-center text-slate-400">
              <QrCode className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-medium">QR Code preview will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
