"use client";

import React, { useEffect, useState } from "react";
import {
  Upload,
  Download,
  RefreshCw,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";

import imageCompression from "browser-image-compression";

export default function SharpenImage() {
  const [intensity, setIntensity] = useState(30);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [originalPreview, setOriginalPreview] =
    useState<string>("");

  const [sharpenPreview, setSharpenPreview] =
    useState<string>("");

  const [loading, setLoading] = useState(false);

  // Live preview update
  useEffect(() => {
    if (selectedFile) {
      applySharpenEffect();
    }
  }, [intensity, selectedFile]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    const preview = URL.createObjectURL(file);

    setOriginalPreview(preview);
  };

  // Sharpen effect
  const applySharpenEffect = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);

      // Compress for fast preview
      const compressedFile =
        await imageCompression(selectedFile, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1400,
          useWebWorker: true,
        });

      const img = new Image();

      img.crossOrigin = "anonymous";

      img.src = URL.createObjectURL(compressedFile);

      img.onload = async () => {
        const canvas =
          document.createElement("canvas");

        canvas.width = img.width;

        canvas.height = img.height;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setLoading(false);
          return;
        }

        // Base image
        ctx.drawImage(img, 0, 0);

        // Create sharpening effect
        const strength = intensity / 100;

        ctx.filter = `
          contrast(${100 + strength * 25}%)
          saturate(${100 + strength * 10}%)
          brightness(${100 + strength * 5}%)
        `;

        // Draw multiple layers for fake sharpen effect
        ctx.globalAlpha = 0.35 + strength * 0.4;

        ctx.drawImage(
          canvas,
          -1,
          0,
          canvas.width,
          canvas.height
        );

        ctx.drawImage(
          canvas,
          1,
          0,
          canvas.width,
          canvas.height
        );

        ctx.drawImage(
          canvas,
          0,
          -1,
          canvas.width,
          canvas.height
        );

        ctx.drawImage(
          canvas,
          0,
          1,
          canvas.width,
          canvas.height
        );

        ctx.globalAlpha = 1;

        // Convert canvas to blob
        const blob =
          await new Promise<Blob | null>(
            (resolve) => {
              canvas.toBlob(
                (blob) => resolve(blob),
                "image/jpeg",
                0.95
              );
            }
          );

        if (!blob) {
          setLoading(false);
          return;
        }

        const sharpenUrl =
          URL.createObjectURL(blob);

        setSharpenPreview(sharpenUrl);

        setLoading(false);
      };
    } catch (error) {
      console.error(error);

      setLoading(false);

      alert("Sharpen processing failed");
    }
  };

  const handleDownload = () => {
    if (!sharpenPreview) return;

    const a = document.createElement("a");

    a.href = sharpenPreview;

    a.download = "sharpen-image.jpg";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Sharpen Image
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Make blurry details in your photo crisp and clear.
          </p>
        </div>

        <div className="p-3 bg-orange-50 rounded-2xl">
          <Sparkles className="w-6 h-6 text-orange-500" />
        </div>
      </div>

      {/* Upload Section */}
      {!selectedFile && (
        <label className="border-2 border-dashed border-slate-200 hover:border-orange-500 hover:bg-orange-50/10 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group">

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="p-4 bg-orange-50 rounded-full text-orange-500 group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8" />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-700">
            Upload Your Image
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            PNG, JPG, JPEG, WEBP supported
          </p>
        </label>
      )}

      {/* Main Section */}
      {selectedFile && (
        <div className="grid lg:grid-cols-12 gap-8">

          {/* Preview */}
          <div className="lg:col-span-7">

            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4">

              <div className="flex items-center justify-between mb-4">

                <h3 className="font-semibold text-slate-700">
                  Live Preview
                </h3>

                <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">
                  Sharpen Filter
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">

                {/* Original */}
                <div>

                  <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
                    Original
                  </div>

                  <div className="rounded-2xl overflow-hidden border bg-white">

                    <img
                      src={originalPreview}
                      alt="Original"
                      className="w-full h-[300px] object-contain"
                    />
                  </div>
                </div>

                {/* Sharpened */}
                <div>

                  <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
                    Sharpened
                  </div>

                  <div className="rounded-2xl overflow-hidden border bg-white flex items-center justify-center h-[300px]">

                    {loading ? (
                      <div className="flex flex-col items-center gap-3">

                        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />

                        <span className="text-sm text-slate-500">
                          Sharpening Image...
                        </span>
                      </div>
                    ) : sharpenPreview ? (
                      <img
                        src={sharpenPreview}
                        alt="Sharpened"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-slate-400">

                        <ImageIcon className="w-10 h-10 mb-2" />

                        <span className="text-sm">
                          Sharpen preview appears here
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-5">

            <div className="border border-slate-200 rounded-3xl p-6 bg-slate-50/40">

              {/* Intensity Slider */}
              <div>

                <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">

                  <span>Sharpen Intensity</span>

                  <span className="text-orange-600 font-semibold">
                    {intensity}%
                  </span>
                </div>

                <input
                  type="range"
                  min="1"
                  max="100"
                  value={intensity}
                  onChange={(e) =>
                    setIntensity(Number(e.target.value))
                  }
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />

                <div className="flex justify-between text-xs text-slate-400 mt-1">

                  <span>Light correction</span>

                  <span>Strong sharpening</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3 mt-8">

                <button
                  disabled
                  className="w-full bg-slate-900 text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 opacity-80"
                >
                  <Sparkles className="w-5 h-5" />
                  Live Sharpen Enabled
                </button>

                {sharpenPreview && (
                  <button
                    onClick={handleDownload}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Sharpened Image
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}