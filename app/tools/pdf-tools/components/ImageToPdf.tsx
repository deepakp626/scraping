"use client";

import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import { UploadCloud, FileImage, Download, Trash2, ArrowUp, ArrowDown, CheckCircle2, AlertCircle } from "lucide-react";

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
}

export default function ImageToPdf() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [margin, setMargin] = useState<number>(10);
  const [pdfName, setPdfName] = useState("converted_document");
  const [isConverting, setIsConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setError(null);
    setDownloadUrl(null);

    const valid: ImageItem[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        valid.push({
          id: Math.random().toString(36).substring(7),
          file,
          previewUrl: URL.createObjectURL(file),
          name: file.name,
        });
      }
    });

    if (valid.length === 0) {
      setError("Please select valid image files (JPG, PNG, WebP).");
      return;
    }

    setImages((prev) => [...prev, ...valid]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setDownloadUrl(null);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[index - 1];
    copy[index - 1] = temp;
    setImages(copy);
  };

  const moveDown = (index: number) => {
    if (index === images.length - 1) return;
    const copy = [...images];
    const temp = copy[index];
    copy[index] = copy[index + 1];
    copy[index + 1] = temp;
    setImages(copy);
  };

  const handleConvert = async () => {
    if (images.length === 0) {
      setError("Please upload at least one image.");
      return;
    }

    try {
      setIsConverting(true);
      setError(null);

      const pdf = new jsPDF({
        orientation: orientation,
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const usableWidth = pageWidth - margin * 2;
      const usableHeight = pageHeight - margin * 2;

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();

        const imgItem = images[i];
        const img = new Image();
        img.src = imgItem.previewUrl;

        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            const imgAspect = img.width / img.height;
            const containerAspect = usableWidth / usableHeight;

            let renderWidth = usableWidth;
            let renderHeight = usableHeight;

            if (imgAspect > containerAspect) {
              renderHeight = usableWidth / imgAspect;
            } else {
              renderWidth = usableHeight * imgAspect;
            }

            const posX = margin + (usableWidth - renderWidth) / 2;
            const posY = margin + (usableHeight - renderHeight) / 2;

            pdf.addImage(img, "JPEG", posX, posY, renderWidth, renderHeight);
            resolve();
          };
          img.onerror = (e) => reject(e);
        });
      }

      const pdfBlob = pdf.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setDownloadUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to convert images to PDF.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${pdfName || "document"}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetAll = () => {
    setImages([]);
    setDownloadUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Image to PDF Converter</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1">
          Combine and transform JPG, PNG, and WebP images into a single professional PDF.
        </p>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="border-2 border-dashed border-slate-300 hover:border-primary-theme rounded-2xl p-8 text-center cursor-pointer transition-colors bg-slate-50 flex flex-col items-center justify-center group"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="p-4 bg-white rounded-full shadow-sm text-primary-theme group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8" />
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-700">
          Click to upload or drag and drop images
        </p>
        <p className="text-xs text-slate-400 mt-1">JPG, PNG, WebP up to 25MB each</p>
      </div>

      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {images.length > 0 && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">
                Document Name
              </label>
              <input
                type="text"
                value={pdfName}
                onChange={(e) => setPdfName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary-theme outline-none"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">
                Page Orientation
              </label>
              <select
                value={orientation}
                onChange={(e) => setOrientation(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary-theme outline-none"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">
                Margin ({margin}mm)
              </label>
              <input
                type="range"
                min="0"
                max="30"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-theme mt-2"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-slate-700">Images ({images.length})</span>
              <button onClick={resetAll} className="text-xs md:text-sm text-red-500 font-semibold hover:underline">
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  className="relative rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 group p-2 flex flex-col"
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-white mb-2 relative">
                    <img src={img.previewUrl} alt={img.name} className="w-full h-full object-cover" />
                    <span className="absolute top-1.5 left-1.5 w-6 h-6 bg-slate-900/80 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-700 truncate mb-2">{img.name}</p>
                  <div className="flex items-center justify-between border-t border-slate-200 pt-2 mt-auto">
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveUp(idx)}
                        disabled={idx === 0}
                        className="p-1 hover:bg-slate-200 rounded text-slate-600 disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveDown(idx)}
                        disabled={idx === images.length - 1}
                        className="p-1 hover:bg-slate-200 rounded text-slate-600 disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeImage(img.id)}
                      className="p-1 hover:bg-red-50 text-red-500 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!downloadUrl ? (
            <button
              onClick={handleConvert}
              disabled={isConverting}
              className="w-full py-3.5 px-6 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isConverting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <FileImage className="w-5 h-5" />
                  Convert {images.length} Image{images.length > 1 ? "s" : ""} to PDF
                </>
              )}
            </button>
          ) : (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-sm">PDF created successfully!</p>
                  <p className="text-xs text-emerald-600">All images converted into a high-quality PDF document.</p>
                </div>
              </div>
              <button
                onClick={handleDownload}
                className="w-full py-3.5 px-6 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold transition shadow-md shadow-primary-theme/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
