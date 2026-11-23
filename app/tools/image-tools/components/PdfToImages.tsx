"use client"
import React, { useRef, useState, useEffect } from "react";

// Robust dynamic loader for PDF.js from a stable CDN
const loadPdfJs = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const globalWindow = window as any;
    if (globalWindow.pdfjsLib) {
      resolve(globalWindow.pdfjsLib);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.async = true;
    script.onload = () => {
      globalWindow.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      resolve(globalWindow.pdfjsLib);
    };
    script.onerror = () => reject(new Error("Failed to load PDF.js library"));
    document.head.appendChild(script);
  });
};

// Robust dynamic loader for JSZip
const loadJsZip = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const globalWindow = window as any;
    if (globalWindow.JSZip) {
      resolve(globalWindow.JSZip);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
    script.async = true;
    script.onload = () => resolve(globalWindow.JSZip);
    script.onerror = () => reject(new Error("Failed to load JSZip library"));
    document.head.appendChild(script);
  });
};

interface SelectedImage {
  url: string;
  page: number;
}

export default function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [images, setImages] = useState<string[]>([]);
  const [pdfName, setPdfName] = useState("");
  const [pdfSize, setPdfSize] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [renderScale, setRenderScale] = useState(2); // Default crispness factor
  const [imageFormat, setImageFormat] = useState("image/png");
  const [errorMsg, setErrorMsg] = useState("");
  const [zipLoading, setZipLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null); // Lightbox
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format File Size
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  // Convert PDF to Images
  const processPdfFile = async (file: File) => {
    if (!file || file.type !== "application/pdf") {
      setErrorMsg("Please upload a valid PDF file.");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    setImages([]);
    setPdfName(file.name);
    setPdfSize(formatBytes(file.size));
    setProgress({ current: 0, total: 0 });

    try {
      const pdfjsLib = await loadPdfJs();
      const fileReader = new FileReader();

      fileReader.onload = async function () {
        if (!this.result || typeof this.result === "string") return;
        try {
          const typedArray = new Uint8Array(this.result);
          const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
          const totalPages = pdf.numPages;
          setProgress({ current: 0, total: totalPages });

          const generatedImages: string[] = [];

          for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            setProgress((prev) => ({ ...prev, current: pageNum }));

            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: renderScale });

            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            if (!context) continue;

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({
              canvasContext: context,
              viewport: viewport,
            }).promise;

            const image = canvas.toDataURL(imageFormat);
            generatedImages.push(image);
          }

          setImages(generatedImages);
        } catch (err) {
          console.error(err);
          setErrorMsg("Failed to parse the PDF file. It might be corrupted or restricted.");
        } finally {
          setLoading(false);
        }
      };

      fileReader.readAsArrayBuffer(file);
    } catch (err) {
      console.error(err);
      setErrorMsg("An error occurred during initialization. Please check your network.");
      setLoading(false);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processPdfFile(file);
  };

  // Drag and Drop support
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processPdfFile(file);
  };

  // Download Single Image
  const downloadImage = (image: string, index: number) => {
    const link = document.createElement("a");
    link.href = image;
    const extension = imageFormat === "image/jpeg" ? "jpg" : "png";
    link.download = `${pdfName.replace(/\.[^/.]+$/, "")}_page_${index + 1}.${extension}`;
    link.click();
  };

  // Download All Images as a single ZIP Archive
  const downloadAllAsZip = async () => {
    if (images.length === 0) return;
    setZipLoading(true);
    try {
      const JSZipLib: any = await loadJsZip();
      const zip = new JSZipLib();
      const folderName = pdfName.replace(/\.[^/.]+$/, "") + "_pages";
      const folder = zip.folder(folderName);

      const extension = imageFormat === "image/jpeg" ? "jpg" : "png";

      images.forEach((imgData, index) => {
        // Strip data:image/...;base64, header to fetch raw base64 data
        const base64Data = imgData.split(",")[1];
        folder.file(`page_${index + 1}.${extension}`, base64Data, { base64: true });
      });

      const blob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${folderName}.zip`;
      link.click();
    } catch (err) {
      console.error("ZIP Generation Failed: ", err);
      setErrorMsg("Failed to build ZIP archive. You can still download pages individually.");
    } finally {
      setZipLoading(false);
    }
  };

  const resetConverter = () => {
    setImages([]);
    setPdfName("");
    setPdfSize("");
    setProgress({ current: 0, total: 0 });
    setErrorMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Decorative Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold uppercase tracking-wider mb-3">
            ⚡ Premium Web Utility
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
            PDF to Image Converter
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-base text-slate-500 sm:mt-4">
            Convert individual PDF pages into high-resolution, pixel-perfect PNG or JPG images directly inside your browser. High privacy, fast conversion, zero server uploads.
          </p>
        </div>

        {/* Configuration settings panel */}
        {images.length === 0 && !loading && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-6">
            <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Conversion Settings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Image Resolution (Scale)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 1.5, label: "Standard (1.5x)" },
                    { value: 2, label: "Crisp HD (2x)" },
                    { value: 3, label: "Ultra HD (3x)" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setRenderScale(option.value)}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all border ${
                        renderScale === option.value
                          ? "bg-orange-50 border-orange-200 text-orange-700 shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Output Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "image/png", label: "PNG File" },
                    { value: "image/jpeg", label: "JPEG File" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setImageFormat(option.value)}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all border ${
                        imageFormat === option.value
                          ? "bg-orange-50 border-orange-200 text-orange-700 shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Drag Drop & Convertor Component */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
              <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <span className="font-bold">Conversion Error:</span> {errorMsg}
              </div>
            </div>
          )}

          {/* Upload Dropzone */}
          {images.length === 0 && !loading && (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center transition-all cursor-pointer ${
                isDragging
                  ? "border-orange-500 bg-orange-50/50 scale-[0.99]"
                  : "border-slate-200 bg-slate-50/50 hover:bg-slate-50"
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handlePdfUpload}
              />
              <div className="w-16 h-16 bg-white shadow-md rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-800">Drag & Drop your PDF here</h2>
              <p className="text-sm text-slate-500 mt-2">
                or <span className="text-orange-600 font-semibold underline">browse file directory</span>
              </p>
              <span className="text-xs text-slate-400 mt-4 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                Up to 100MB PDF files supported
              </span>
            </div>
          )}

          {/* Rendering Progress View */}
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-orange-600"></div>
                <div className="absolute text-sm font-semibold text-slate-700">
                  {progress.total > 0
                    ? `${Math.round((progress.current / progress.total) * 100)}%`
                    : "Wait..."}
                </div>
              </div>
              <p className="mt-6 text-base font-bold text-slate-800">Processing Document</p>
              <p className="text-sm text-slate-500 mt-1">
                {progress.total > 0
                  ? `Converting page ${progress.current} of ${progress.total}...`
                  : "Reading file properties..."}
              </p>
            </div>
          )}

          {/* Success Output Section */}
          {images.length > 0 && !loading && (
            <div>
              {/* Header Info Panel */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-orange-600 shadow-sm shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 text-base truncate max-w-xs md:max-w-md">
                      {pdfName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span>{pdfSize}</span>
                      <span>•</span>
                      <span>{images.length} pages converted</span>
                    </div>
                  </div>
                </div>

                {/* Actions Toolbar */}
                <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto">
                  <button
                    onClick={downloadAllAsZip}
                    disabled={zipLoading}
                    className="flex-1 sm:flex-initial bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    {zipLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    )}
                    {zipLoading ? "Zipping..." : "Download ZIP"}
                  </button>

                  <button
                    onClick={resetConverter}
                    className="flex-1 sm:flex-initial bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H18" />
                    </svg>
                    Reset
                  </button>
                </div>
              </div>

              {/* View Mode Customizer */}
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Converted Pages</span>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded-md ${viewMode === "grid" ? "bg-white shadow-sm text-slate-800" : "text-slate-400"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded-md ${viewMode === "list" ? "bg-white shadow-sm text-slate-800" : "text-slate-400"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Rendered Image Results Grid */}
              <div className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                  : "flex flex-col gap-6 max-w-2xl mx-auto"
              }>
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all flex flex-col"
                  >
                    {/* Image Area with Zoom/Preview Hover effect */}
                    <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden flex items-center justify-center cursor-zoom-in"
                         onClick={() => setSelectedImage({ url: image, page: index + 1 })}>
                      <img
                        src={image}
                        alt={`Page ${index + 1}`}
                        className="w-full h-full object-contain object-top group-hover:scale-[1.02] transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-full text-slate-800 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                          </svg>
                          Inspect Page
                        </span>
                      </div>
                    </div>

                    {/* Bottom Metadata bar */}
                    <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white mt-auto">
                      <span className="text-sm font-semibold text-slate-700">
                        Page {index + 1}
                      </span>

                      <button
                        onClick={() => downloadImage(image, index)}
                        className="text-orange-600 hover:text-white border border-orange-200 hover:bg-orange-600 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal / Fullscreen Viewer */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-lg">
                Page {selectedImage.page} Preview
              </h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="p-6 bg-slate-50 flex-1 overflow-auto flex justify-center items-start">
              <img
                src={selectedImage.url}
                alt={`Zoom page ${selectedImage.page}`}
                className="max-h-[60vh] max-w-full object-contain border border-slate-200 rounded-lg shadow-sm"
              />
            </div>

            {/* Modal Footer actions */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 border border-slate-200 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  downloadImage(selectedImage.url, selectedImage.page - 1);
                  setSelectedImage(null);
                }}
                className="px-4 py-2 rounded-xl text-sm font-bold bg-orange-600 text-white hover:bg-orange-500 shadow-sm transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Page
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}