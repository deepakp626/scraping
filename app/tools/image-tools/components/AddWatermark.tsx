"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Download, Image as ImageIcon, Check, RefreshCw } from "lucide-react";

export default function AddWatermark() {
  const [text, setText] = useState("© Watermark");
  const [opacity, setOpacity] = useState(50);
  const [position, setPosition] = useState("center");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const drawWatermark = () => {
    if (!previewUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      // Set canvas dimensions to image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Setup watermark style
      const fontSize = Math.max(20, Math.floor(canvas.width / 20));
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity / 100})`;
      ctx.strokeStyle = `rgba(0, 0, 0, ${opacity / 200})`; // Subtle outline
      ctx.lineWidth = fontSize / 15;

      // Position logic
      let x = canvas.width / 2;
      let y = canvas.height / 2;
      let textAlign: CanvasTextAlign = "center";
      let textBaseline: CanvasTextBaseline = "middle";

      const padding = fontSize;

      if (position.includes("top")) {
        y = padding;
        textBaseline = "top";
      } else if (position.includes("bottom")) {
        y = canvas.height - padding;
        textBaseline = "bottom";
      }

      if (position.includes("left")) {
        x = padding;
        textAlign = "left";
      } else if (position.includes("right")) {
        x = canvas.width - padding;
        textAlign = "right";
      }

      ctx.textAlign = textAlign;
      ctx.textBaseline = textBaseline;

      // Draw watermark
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
    };
  };

  useEffect(() => {
    drawWatermark();
  }, [previewUrl, text, opacity, position]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    setIsProcessing(true);

    try {
      const dataUrl = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `watermarked-${image?.name || "image.png"}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download image", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Add Watermark</h2>
          <p className="text-sm text-slate-500 mt-1">Overlay text-based copyright protection onto your image.</p>
        </div>
        {previewUrl && (
          <button 
            onClick={reset}
            className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
            title="Reset"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        )}
      </div>

      {!previewUrl ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden" 
          />
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
            <Upload className="w-6 h-6 text-orange-600" />
          </div>
          <span className="text-sm font-semibold text-orange-600">Upload image file</span>
          <span className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 12MB</span>
        </div>
      ) : (
        <div className="mt-6 border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 relative group">
          <canvas 
            ref={canvasRef} 
            className="max-w-full h-auto mx-auto block max-h-[400px] object-contain"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-slate-800 shadow-lg">
              Preview Mode
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Watermark Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={!previewUrl}
            className="w-full border border-slate-200 rounded-xl p-2.5 text-sm font-medium text-slate-800 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50 disabled:bg-slate-50"
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
            disabled={!previewUrl}
            className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500 disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Alignment Position</label>
          <div className="grid grid-cols-3 gap-2 max-w-[300px]">
            {[
              "top-left", "top-center", "top-right", 
              "middle-left", "center", "middle-right", 
              "bottom-left", "bottom-center", "bottom-right"
            ].map((pos) => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                disabled={!previewUrl}
                className={`py-2 text-[10px] uppercase font-bold rounded-lg border transition-all flex items-center justify-center gap-1 ${
                  position === pos
                    ? "border-orange-500 bg-orange-50 text-orange-600"
                    : "border-slate-200 bg-white text-slate-400 hover:bg-slate-50"
                } disabled:opacity-50`}
              >
                {position === pos && <Check className="w-3 h-3" />}
                {pos.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={handleDownload}
        disabled={!previewUrl || isProcessing}
        className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <RefreshCw className="w-5 h-5 animate-spin" />
        ) : (
          <Download className="w-5 h-5" />
        )}
        Add Watermark to Image
      </button>
    </div>
  );
}

