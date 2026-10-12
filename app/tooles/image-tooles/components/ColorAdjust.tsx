"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Upload,
  Download,
  RotateCcw,
  Image as ImageIcon,
} from "lucide-react";

export default function ColorAdjust() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [brightness, setBrightness] = useState(100);

  const [contrast, setContrast] = useState(100);

  const [saturation, setSaturation] = useState(100);

  const [hue, setHue] = useState(0);

  const [blur, setBlur] = useState(0);

  const [grayscale, setGrayscale] = useState(0);

  const [sepia, setSepia] = useState(0);

  const [invert, setInvert] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  // Upload Image
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    const url = URL.createObjectURL(file);

    setImageUrl(url);
  };

  // Download Edited Image
  const handleDownload = () => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const link = document.createElement("a");

    link.download = "edited-image.png";

    link.href = canvas.toDataURL("image/png");

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  // Reset All
  const handleReset = () => {
    setBrightness(100);

    setContrast(100);

    setSaturation(100);

    setHue(0);

    setBlur(0);

    setGrayscale(0);

    setSepia(0);

    setInvert(0);
  };

  // Live Canvas Rendering
  useEffect(() => {
    if (!imageUrl) return;

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const img = new Image();

    img.src = imageUrl;

    img.onload = () => {
      canvas.width = img.width;

      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        saturate(${saturation}%)
        hue-rotate(${hue}deg)
        blur(${blur}px)
        grayscale(${grayscale}%)
        sepia(${sepia}%)
        invert(${invert}%)
      `;

      ctx.drawImage(img, 0, 0);
    };
  }, [
    imageUrl,
    brightness,
    contrast,
    saturation,
    hue,
    blur,
    grayscale,
    sepia,
    invert,
  ]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <h2 className="text-2xl font-bold text-slate-800">
        Advanced Color Adjust
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Adjust brightness, contrast, saturation, hue,
        blur, grayscale, sepia, and invert colors live.
      </p>

      {/* Upload */}
      {!imageUrl && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50 hover:border-orange-400 hover:bg-orange-50/30 transition-all cursor-pointer"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
          />

          <div className="p-4 rounded-full bg-orange-100 text-orange-600">
            <Upload className="w-7 h-7" />
          </div>

          <span className="mt-4 text-sm font-semibold text-orange-600">
            Upload image file
          </span>

          <span className="text-xs text-slate-400 mt-1">
            PNG, JPG, WebP up to 15MB
          </span>
        </div>
      )}

      {/* Editor */}
      {imageUrl && (
        <>
          {/* Preview */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Original */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                Original Image
              </h3>

              <div className="h-80 bg-white border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Original"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            {/* Edited */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">
                Live Preview
              </h3>

              <div className="h-80 bg-white border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="max-h-full max-w-full object-contain"
                />

                {!imageUrl && (
                  <div className="text-center">
                    <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />

                    <p className="text-sm text-slate-400">
                      Preview
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Brightness */}
            <Slider
              label="Brightness"
              value={brightness}
              setValue={setBrightness}
              min={0}
              max={200}
              unit="%"
            />

            {/* Contrast */}
            <Slider
              label="Contrast"
              value={contrast}
              setValue={setContrast}
              min={0}
              max={200}
              unit="%"
            />

            {/* Saturation */}
            <Slider
              label="Saturation"
              value={saturation}
              setValue={setSaturation}
              min={0}
              max={200}
              unit="%"
            />

            {/* Hue */}
            <Slider
              label="Hue Rotation"
              value={hue}
              setValue={setHue}
              min={0}
              max={360}
              unit="°"
            />

            {/* Blur */}
            <Slider
              label="Blur"
              value={blur}
              setValue={setBlur}
              min={0}
              max={20}
              unit="px"
            />

            {/* Grayscale */}
            <Slider
              label="Grayscale"
              value={grayscale}
              setValue={setGrayscale}
              min={0}
              max={100}
              unit="%"
            />

            {/* Sepia */}
            <Slider
              label="Sepia"
              value={sepia}
              setValue={setSepia}
              min={0}
              max={100}
              unit="%"
            />

            {/* Invert */}
            <Slider
              label="Invert"
              value={invert}
              setValue={setInvert}
              min={0}
              max={100}
              unit="%"
            />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {/* Download */}
            <button
              onClick={handleDownload}
              className="flex-1 bg-orange-500 text-white font-medium px-4 py-3 rounded-2xl hover:bg-orange-600 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />

              Download Image
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="px-4 py-3 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />

              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* Reusable Slider Component */
function Slider({
  label,
  value,
  setValue,
  min,
  max,
  unit,
}: {
  label: string;
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  unit: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
        <span>{label}</span>

        <span className="text-orange-600 font-semibold">
          {value}
          {unit}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
      />
    </div>
  );
}