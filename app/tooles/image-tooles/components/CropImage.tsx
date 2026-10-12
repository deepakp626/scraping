"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Cropper from "react-easy-crop";
import { 
  Upload, 
  Image as ImageIcon, 
  Download, 
  RefreshCw, 
  Crop as CropIcon, 
  CheckCircle2, 
  AlertCircle,
  ZoomIn,
  Trash2
} from "lucide-react";

// Crop area type defined by react-easy-crop
interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ASPECT_RATIO_PRESETS = [
  { label: "Free", value: undefined },
  { label: "1:1", value: 1 },
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "9:16", value: 9 / 16 },
  { label: "2:3", value: 2 / 3 }
];

export default function CropImage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cropper states
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState<string>("1:1");
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // Size stats
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [croppedSize, setCroppedSize] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URLs on unmount or file change
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (croppedUrl) URL.revokeObjectURL(croppedUrl);
    };
  }, [originalUrl, croppedUrl]);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processSelectedFile(file);
  };

  const processSelectedFile = (file: File) => {
    setError(null);
    setSelectedFile(file);
    setOriginalSize(file.size);
    setCroppedUrl(null);
    setCroppedSize(0);
    setZoom(1);
    setCrop({ x: 0, y: 0 });

    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processSelectedFile(file);
    } else {
      setError("Please drop a valid image file.");
    }
  };

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (!originalUrl || !croppedAreaPixels || !selectedFile) return;

    setIsCropping(true);
    setError(null);

    try {
      const croppedBlobUrl = await getCroppedImg(originalUrl, croppedAreaPixels);
      setCroppedUrl(croppedBlobUrl);

      // Estimate cropped size by fetching the blob
      const res = await fetch(croppedBlobUrl);
      const blob = await res.blob();
      setCroppedSize(blob.size);
    } catch (err: any) {
      console.error(err);
      setError("Failed to crop the image. Please try again.");
    } finally {
      setIsCropping(false);
    }
  };

  const handleDownload = () => {
    if (!croppedUrl || !selectedFile) return;

    const nameWithoutExt = selectedFile.name.substring(0, selectedFile.name.lastIndexOf(".")) || selectedFile.name;
    const ext = selectedFile.name.split(".").pop() || "jpg";
    const link = document.createElement("a");
    link.download = `${nameWithoutExt}_cropped.${ext}`;
    link.href = croppedUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setSelectedFile(null);
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (croppedUrl) URL.revokeObjectURL(croppedUrl);
    setOriginalUrl(null);
    setCroppedUrl(null);
    setCroppedSize(0);
    setOriginalSize(0);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setAspectRatio("1:1");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Find the selected preset value
  const activePreset = ASPECT_RATIO_PRESETS.find((p) => p.label === aspectRatio);
  const aspectValue = activePreset ? activePreset.value : undefined;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Crop Image</h2>
          <p className="text-sm text-slate-500 mt-1">
            Interactively crop images to desired aspect ratios.
          </p>
        </div>
        {selectedFile && (
          <button
            onClick={resetForm}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Clear / Upload New
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-500 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold">Error occurred</span>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      )}

      {/* Upload Zone */}
      {!selectedFile && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 hover:border-orange-500 hover:bg-orange-50/5 rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="p-4 bg-orange-50 text-orange-600 rounded-full group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8" />
          </div>
          <span className="mt-4 text-base font-semibold text-slate-700">
            Drag and drop your image here, or <span className="text-orange-600 hover:underline">browse</span>
          </span>
          <span className="text-xs text-slate-400 mt-1.5">Supports PNG, JPEG, WebP, SVG, and GIF</span>
        </div>
      )}

      {/* Interactive Crop Workspace */}
      {selectedFile && originalUrl && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Cropper Container Column */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
                {croppedUrl ? (
                  <div className="w-full h-full flex items-center justify-center p-4 bg-slate-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={croppedUrl}
                      alt="Cropped Preview"
                      className="max-w-full max-h-full object-contain rounded-lg shadow-md border border-slate-200"
                    />
                  </div>
                ) : (
                  <Cropper
                    image={originalUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectValue}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                )}
              </div>

              {/* Zoom Control Slider (Only visible if not cropped yet) */}
              {!croppedUrl && (
                <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <ZoomIn className="w-5 h-5 text-slate-500 shrink-0" />
                  <span className="text-xs font-bold text-slate-600 shrink-0">Zoom</span>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <span className="text-xs font-semibold text-slate-700 shrink-0 w-10 text-right">
                    {zoom.toFixed(1)}x
                  </span>
                </div>
              )}
            </div>

            {/* Controls Settings Column */}
            <div className="lg:col-span-4 border border-slate-100 rounded-3xl p-6 bg-slate-50/50 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    <CropIcon className="w-5 h-5 text-orange-600" />
                    <span>Crop Controls</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Configure your crop boundary and aspect ratio presets.
                  </p>
                </div>

                {/* Aspect Ratio Selector Presets */}
                {!croppedUrl && (
                  <div className="space-y-3">
                    <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                      Aspect Ratio
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {ASPECT_RATIO_PRESETS.map((preset) => (
                        <button
                          key={preset.label}
                          onClick={() => setAspectRatio(preset.label)}
                          className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                            aspectRatio === preset.label
                              ? "border-orange-500 bg-orange-50 text-orange-600 shadow-sm"
                              : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* File Statistics Panel */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Original Size:</span>
                    <span className="font-semibold text-slate-700">{formatSize(originalSize)}</span>
                  </div>

                  {croppedUrl && (
                    <>
                      <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-3">
                        <span className="text-slate-400">Cropped Size:</span>
                        <span className="font-semibold text-slate-800">{formatSize(croppedSize)}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs border-t border-slate-100 pt-3">
                        <span className="text-slate-400">Percentage saved:</span>
                        <span className="font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                          {Math.max(0, Math.round(((originalSize - croppedSize) / originalSize) * 100))}% Saved
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="space-y-3 mt-6">
                {!croppedUrl ? (
                  <button
                    onClick={handleCrop}
                    disabled={isCropping}
                    className="w-full bg-slate-900 text-white font-semibold py-3 rounded-2xl hover:bg-slate-800 transition-all active:scale-98 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isCropping ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Cropping Image...</span>
                      </>
                    ) : (
                      <>
                        <CropIcon className="w-5 h-5" />
                        <span>Crop Image Now</span>
                      </>
                    )}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleDownload}
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 rounded-2xl hover:from-orange-600 hover:to-amber-600 transition-all hover:shadow-md active:scale-98 flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download Cropped Image</span>
                    </button>
                    <button
                      onClick={() => setCroppedUrl(null)}
                      className="w-full bg-white border border-slate-200 text-slate-600 font-semibold py-3 rounded-2xl hover:bg-slate-50 transition-all active:scale-98 flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-5 h-5" />
                      <span>Recrop / Edit Boundary</span>
                    </button>
                  </>
                )}
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Helper function to crop the original image using HTML5 canvas client-side.
 */
async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<string> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "anonymous"; // Avoid tainted canvas problems
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context could be obtained.");
  }

  // Set the canvas size to match the cropped area
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped portion of the image onto the canvas
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise<string>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      resolve(URL.createObjectURL(blob));
    }, "image/jpeg", 0.95);
  });
}
