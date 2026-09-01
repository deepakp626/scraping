
"use client"
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { UploadCloud, FileDown, Download, Lock, ArrowRight, ShieldAlert, Loader2, AlertCircle } from "lucide-react";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";

export default function ExtractImagesFromPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setFile(null);
    setIsPasswordProtected(false);
    setIsProcessing(false);
    setError(null);
    setDownloadUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFile = async (uploadedFile: File | undefined) => {
    if (!uploadedFile) return;
    if (!uploadedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Please select a valid PDF document.');
      setIsPasswordProtected(false);
      return;
    }
    try {
      setError(null);
      setIsPasswordProtected(false);
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
      setFile(uploadedFile);
    } catch (e: any) {
      setError(e.message || 'Failed to load file.');
    }
  };

  const handleExtract = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const resp = await fetch(API_ENDPOINTS.PDF.EXTRACTIMAGES, {
        method: 'POST',
        body: form,
      });
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt || 'Failed to extract images.');
      }
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Extraction failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `extracted_images_${file?.name || 'pdf'}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
          Extract Images from PDF
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-2 leading-relaxed">
          Upload a PDF and extract all embedded images as a ZIP archive.
        </p>
      </div>

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }}
          className="border-2 border-dashed border-slate-300 hover:border-primary-theme rounded-3xl p-10 md:p-14 text-center cursor-pointer transition-all bg-slate-50 hover:bg-slate-50/70 flex flex-col items-center justify-center group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={e => handleFile(e.target.files?.[0])}
          />
          <div className="p-4 md:p-5 bg-white rounded-2xl shadow-sm text-primary-theme group-hover:scale-110 transition-transform">
            <UploadCloud className="w-9 h-9 md:w-10 md:h-10" />
          </div>
          <p className="mt-4 text-base md:text-lg font-bold text-slate-800">Click to upload or drag & drop a PDF</p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Supports multi‑page PDFs</p>
        </div>
      ) : isPasswordProtected ? (
        <div className="p-6 md:p-8 rounded-3xl bg-amber-50/80 border border-amber-200 text-amber-900 text-center space-y-5 max-w-xl mx-auto my-2 animate-in fade-in">
          <div className="w-16 h-16 bg-amber-100 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto text-amber-700 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg md:text-2xl font-bold text-amber-950">This PDF is Password‑Protected</h4>
            <p className="text-xs md:text-sm text-amber-800 leading-relaxed max-w-md mx-auto">
              <span className="font-semibold text-slate-900">{file.name}</span> is encrypted. Please unlock it before extracting images.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/tooles/pdf-tooles/unlock-pdf"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition shadow-md shadow-primary-theme/20"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Unlock PDF First</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={reset}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white border border-amber-300 hover:bg-amber-100/60 text-amber-900 font-semibold text-xs md:text-sm transition cursor-pointer"
            >
              Upload Another PDF
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 md:space-y-8">
          {/* File Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-primary-theme/10 text-primary-theme rounded-xl shrink-0">
                <FileDown className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-800 text-sm md:text-base truncate max-w-xs md:max-w-md">{file.name}</h4>
                <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">
                  {` ${(file.size / 1024 / 1024).toFixed(2)} MB`}
                </p>
              </div>
            </div>
            <button onClick={reset} className="text-xs md:text-sm font-semibold text-red-500 hover:text-red-600 hover:underline px-2 py-1 cursor-pointer transition-colors">
              Change File
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleExtract}
              disabled={isProcessing}
              className="flex-1 py-4 px-6 rounded-2xl bg-primary-theme hover:opacity-90 text-white text-sm md:text-base font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Extracting Images…</span>
                </>
              ) : (
                <>
                  <FileDown className="w-5 h-5" />
                  <span>Extract Images</span>
                </>
              )}
            </button>
            {downloadUrl && (
              <button
                onClick={handleDownload}
                className="flex-1 py-4 px-6 rounded-2xl bg-primary-theme hover:bg-primary-theme/90 text-white font-bold text-sm md:text-base transition shadow-md shadow-primary-theme/20 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                <span>Download ZIP</span>
              </button>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 md:p-5 rounded-2xl bg-red-50 text-red-600 border border-red-200 text-sm md:text-base flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
