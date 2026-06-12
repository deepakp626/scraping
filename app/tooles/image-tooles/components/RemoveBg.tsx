"use client";

import React, { useState } from "react";
import { removeBackground } from "@imgly/background-removal";

export default function RemoveBg() {
  const [highQuality, setHighQuality] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [resultImage, setResultImage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    setResultImage("");
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile) {
      alert("Please upload an image");
      return;
    }

    try {
      setLoading(true);

      const blob = await removeBackground(selectedFile, {
        quality: highQuality ? "high" : "medium",
      });

      const url = URL.createObjectURL(blob);

      setResultImage(url);
    } catch (error) {
      console.error(error);
      alert("Background removal failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-2xl">
      <h2 className="text-2xl font-bold text-slate-800">
        Remove Background
      </h2>

      <p className="text-sm text-slate-500 mt-1">
        Erase the background of any portrait or product photo.
      </p>

      {/* Upload Area */}
      <div className="mt-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-slate-50">
        <input
          type="file"
          id="bg-upload"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFileChange(e.target.files[0]);
            }
          }}
        />

        <label
          htmlFor="bg-upload"
          className="cursor-pointer text-sm font-semibold text-orange-600 hover:text-orange-500"
        >
          Upload image file
        </label>

        <span className="text-xs text-slate-400 mt-1">
          Supports portraits, products, and animals
        </span>
      </div>

      {/* Preview */}
      {preview && (
        <div className="mt-6">
          <h3 className="font-semibold text-slate-700 mb-3">
            Original Image
          </h3>

          <img
            src={preview}
            alt="Preview"
            className="rounded-2xl border max-h-[400px] object-contain"
          />
        </div>
      )}

      {/* HD Toggle */}
      <div className="mt-6 flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-slate-700 block">
            HD Output Mode
          </label>

          <span className="text-xs text-slate-400">
            Process at full resolution for maximum detail.
          </span>
        </div>

        <button
          onClick={() => setHighQuality(!highQuality)}
          className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${
            highQuality ? "bg-orange-500" : "bg-slate-200"
          }`}
        >
          <span
            className={`w-5 h-5 bg-white rounded-full transition-transform absolute shadow-sm ${
              highQuality ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Action Button */}
      <button
        onClick={handleRemoveBackground}
        disabled={loading}
        className="w-full mt-6 bg-slate-900 text-white font-medium px-4 py-3 rounded-2xl hover:bg-slate-800 transition-colors shadow-sm disabled:opacity-50"
      >
        {loading ? "Removing Background..." : "Remove Background"}
      </button>

      {/* Result */}
      {resultImage && (
        <div className="mt-8">
          <h3 className="font-semibold text-slate-700 mb-3">
            Background Removed
          </h3>

          <div className="rounded-2xl border p-4 bg-[url('/checker.png')] bg-center">
            <img
              src={resultImage}
              alt="Result"
              className="max-h-[500px] object-contain"
            />
          </div>

          <a
            href={resultImage}
            download="removed-background.png"
            className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-medium"
          >
            Download PNG
          </a>
        </div>
      )}
    </div>
  );
}