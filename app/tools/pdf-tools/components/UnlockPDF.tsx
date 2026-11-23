"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Unlock, Lock, Download, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import apiClient, { extractApiErrorMessage } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";

export default function UnlockPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockedBlobUrl, setUnlockedBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (uploadedFile: File | undefined) => {
    if (!uploadedFile) return;
    if (!uploadedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please upload a valid PDF document.");
      return;
    }

    setError(null);
    setUnlockedBlobUrl(null);
    setFile(uploadedFile);
  };

  const handleUnlock = async () => {
    if (!file) return;

    try {
      setIsUnlocking(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      const response = await apiClient.post(API_ENDPOINTS.PDF.UNLOCKPDF, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setUnlockedBlobUrl(url);
    } catch (err: any) {
      const message = await extractApiErrorMessage(err, "Failed to unlock PDF. Please try again.");
      setError(message);
    } finally {
      setIsUnlocking(false);
    }
  };

  const handleDownload = () => {
    if (!unlockedBlobUrl || !file) return;
    const a = document.createElement("a");
    a.href = unlockedBlobUrl;
    a.download = `unlocked_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    if (unlockedBlobUrl) URL.revokeObjectURL(unlockedBlobUrl);
    setFile(null);
    setUnlockedBlobUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Unlock PDF Password & Restrictions</h2>
        <p className="text-sm text-slate-500 mt-1">
          Remove PDF security, owner restrictions, and editing locks seamlessly.
        </p>
      </div>

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className="border-2 border-dashed border-slate-300 hover:border-primary-theme rounded-2xl p-10 text-center cursor-pointer transition-colors bg-slate-50 flex flex-col items-center justify-center group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="p-4 bg-white rounded-full shadow-sm text-primary-theme group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8" />
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-700">
            Click to upload or drag and drop a locked PDF
          </p>
          <p className="text-xs text-slate-400 mt-1">Instant restriction removal • 100% private</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary-theme/10 text-primary-theme rounded-xl">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm truncate max-w-xs">{file.name}</h4>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-xs font-semibold text-red-500 hover:underline px-2 py-1 cursor-pointer"
            >
              Change File
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!unlockedBlobUrl ? (
            <button
              onClick={handleUnlock}
              disabled={isUnlocking}
              className="w-full py-3.5 px-6 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isUnlocking ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Unlocking PDF...
                </>
              ) : (
                <>
                  <Unlock className="w-5 h-5" />
                  Unlock PDF
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-sm">PDF Unlocked Successfully!</p>
                  <p className="text-xs text-emerald-600">All security locks and editing restrictions have been removed.</p>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Download Unlocked PDF
              </button>

              <button
                onClick={reset}
                className="w-full py-2.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                Unlock Another PDF
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
