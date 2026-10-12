"use client";

import React, { useState, useEffect } from "react";
import {
  Upload,
  Download,
  RefreshCw,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";

import imageCompression from "browser-image-compression";

export default function EnhanceImage() {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [originalPreview, setOriginalPreview] =
    useState<string>("");

  const [enhancedPreview, setEnhancedPreview] =
    useState<string>("");

  const [loading, setLoading] = useState(false);

  const [intensity, setIntensity] = useState(70);

  const [brightness, setBrightness] = useState(0);

  const [contrast, setContrast] = useState(0);

  const [saturation, setSaturation] = useState(0);

  useEffect(() => {
  if (selectedFile) {
    applyLivePreview();
  }
}, [
  intensity,
  brightness,
  contrast,
  saturation,
  selectedFile,
]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);

    const preview = URL.createObjectURL(file);

    setOriginalPreview(preview);

    setEnhancedPreview("");
  };

  const applyLivePreview = async () => {
  if (!selectedFile) return;

  try {
    const compressedFile =
      await imageCompression(selectedFile, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
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

      if (!ctx) return;

      const finalBrightness =
        100 + brightness + intensity * 0.05;

      const finalContrast =
        100 + contrast + intensity * 0.08;

      const finalSaturation =
        100 + saturation + intensity * 0.06;

      ctx.filter = `
        brightness(${finalBrightness}%)
        contrast(${finalContrast}%)
        saturate(${finalSaturation}%)
      `;

      ctx.drawImage(img, 0, 0);

      const blob =
        await new Promise<Blob | null>(
          (resolve) => {
            canvas.toBlob(
              (blob) => resolve(blob),
              "image/jpeg",
              0.92
            );
          }
        );

      if (!blob) return;

      const previewUrl =
        URL.createObjectURL(blob);

      setEnhancedPreview(previewUrl);
    };
  } catch (error) {
    console.error(error);
  }
};

  const handleEnhance = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);

      // Compress image before processing
      const compressedFile =
        await imageCompression(selectedFile, {
          maxSizeMB: 2,
          maxWidthOrHeight: 2500,
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

        // Filters
        const finalBrightness =
          100 + brightness + intensity * 0.05;

        const finalContrast =
          100 + contrast + intensity * 0.08;

        const finalSaturation =
          100 + saturation + intensity * 0.06;

        ctx.filter = `
          brightness(${finalBrightness}%)
          contrast(${finalContrast}%)
          saturate(${finalSaturation}%)
        `;

        // Draw enhanced image
        ctx.drawImage(img, 0, 0);

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

        // Create preview URL
        const finalUrl =
          URL.createObjectURL(blob);

        setEnhancedPreview(finalUrl);

        setLoading(false);
      };

      img.onerror = () => {
        setLoading(false);

        alert("Image processing failed");
      };
    } catch (error) {
      console.error(error);

      setLoading(false);

      alert("Enhancement failed");
    }
  };

  const handleDownload = () => {
    if (!enhancedPreview) return;

    const a = document.createElement("a");

    a.href = enhancedPreview;

    a.download = "enhanced-image.jpg";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
  };

  const resetSettings = () => {
    setIntensity(70);

    setBrightness(0);

    setContrast(0);

    setSaturation(0);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Enhance Image
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Improve colors, sharpness, and image quality instantly.
          </p>
        </div>

        <div className="p-3 bg-orange-50 rounded-2xl">
          <Sparkles className="w-6 h-6 text-orange-500" />
        </div>
      </div>

      {/* Upload Area */}
      {!selectedFile && (
        <label className="border-2 border-dashed border-slate-200 hover:border-orange-500 hover:bg-orange-50/20 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group">

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="p-4 rounded-full bg-orange-50 text-orange-500 group-hover:scale-110 transition-transform duration-300">
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

      {/* Main Content */}
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
                  AI Enhanced
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

                {/* Enhanced */}
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase mb-2">
                    Enhanced
                  </div>

                  <div className="rounded-2xl overflow-hidden border bg-white flex items-center justify-center h-[300px]">

                    {loading ? (
                      <div className="flex flex-col items-center gap-3">

                        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />

                        <span className="text-sm text-slate-500">
                          Enhancing Image...
                        </span>
                      </div>
                    ) : enhancedPreview ? (
                      <img
                        src={enhancedPreview}
                        alt="Enhanced"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-slate-400">

                        <ImageIcon className="w-10 h-10 mb-2" />

                        <span className="text-sm">
                          Enhanced preview appears here
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

            <div className="border border-slate-200 rounded-3xl p-6 bg-slate-50/40 space-y-6">

              {/* Intensity */}
              <div>

                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Enhancement Intensity
                  </span>

                  <span className="text-sm font-bold text-orange-500">
                    {intensity}%
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={intensity}
                  onChange={(e) =>
                    setIntensity(Number(e.target.value))
                  }
                  className="w-full accent-orange-500"
                />
              </div>

              {/* Brightness */}
              <div>

                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Brightness
                  </span>

                  <span className="text-sm font-bold text-orange-500">
                    {brightness}
                  </span>
                </div>

                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={brightness}
                  onChange={(e) =>
                    setBrightness(Number(e.target.value))
                  }
                  className="w-full accent-orange-500"
                />
              </div>

              {/* Contrast */}
              <div>

                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Contrast
                  </span>

                  <span className="text-sm font-bold text-orange-500">
                    {contrast}
                  </span>
                </div>

                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={contrast}
                  onChange={(e) =>
                    setContrast(Number(e.target.value))
                  }
                  className="w-full accent-orange-500"
                />
              </div>

              {/* Saturation */}
              <div>

                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">
                    Saturation
                  </span>

                  <span className="text-sm font-bold text-orange-500">
                    {saturation}
                  </span>
                </div>

                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={saturation}
                  onChange={(e) =>
                    setSaturation(Number(e.target.value))
                  }
                  className="w-full accent-orange-500"
                />
              </div>

              {/* Buttons */}
              <div className="space-y-3 pt-4">

                {/* <button
                  onClick={handleEnhance}
                  disabled={loading}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Enhance Image
                    </>
                  )}
                </button> */}

                <button
  disabled
  className="w-full bg-slate-900 text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 opacity-80"
>
  <Sparkles className="w-5 h-5" />
  Live Preview Enabled
</button>

                {enhancedPreview && (
                  <button
                    onClick={handleDownload}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Enhanced Image
                  </button>
                )}

                <button
                  onClick={resetSettings}
                  className="w-full border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold py-3 rounded-2xl transition-all"
                >
                  Reset Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}