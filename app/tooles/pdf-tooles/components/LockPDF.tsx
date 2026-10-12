"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Lock, Download, CheckCircle2, AlertCircle, Shield, Eye, EyeOff } from "lucide-react";
import apiClient, { extractApiErrorMessage } from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";

export default function LockPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProtecting, setIsProtecting] = useState(false);
  const [lockedBlobUrl, setLockedBlobUrl] = useState<string | null>(null);
  const [lockedFileName, setLockedFileName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (uploadedFile: File | undefined) => {
    if (!uploadedFile) return;
    if (!uploadedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a valid PDF document.");
      return;
    }

    setError(null);
    setLockedBlobUrl(null);
    setLockedFileName("");
    setFile(uploadedFile);
  };

  const handleLock = async () => {
    if (!file) return;

    if (!password.trim()) {
      setError("Please enter a password to protect your PDF.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }

    try {
      setIsProtecting(true);
      setError(null);

      // Build FormData — backend expects multipart/form-data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("password", password);

      const response = await apiClient.post(API_ENDPOINTS.PDF.LOCKPDF, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });

      // Convert response to downloadable blob URL
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setLockedBlobUrl(url);
      setLockedFileName(`locked_${file.name}`);
    } catch (err: any) {
      const message = await extractApiErrorMessage(err, "Failed to protect PDF. Please try again.");
      setError(message);
    } finally {
      setIsProtecting(false);
    }
  };

  const handleDownload = () => {
    if (!lockedBlobUrl || !file) return;
    const a = document.createElement("a");
    a.href = lockedBlobUrl;
    a.download = lockedFileName || `locked_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    if (lockedBlobUrl) URL.revokeObjectURL(lockedBlobUrl);
    setFile(null);
    setPassword("");
    setConfirmPassword("");
    setLockedBlobUrl(null);
    setLockedFileName("");
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Lock & Protect PDF</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1">
          Encrypt your PDF with AES-256 and protect sensitive documents from unauthorized access.
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
            Click to upload or drag and drop a PDF to protect
          </p>
          <p className="text-xs text-slate-400 mt-1">Add AES-256 password encryption</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Info Bar */}
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary-theme/10 text-primary-theme rounded-xl">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm truncate max-w-xs">{file.name}</h4>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-xs md:text-sm font-semibold text-red-500 hover:underline px-2 py-1 cursor-pointer"
            >
              Change File
            </button>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter strong password..."
                  disabled={!!lockedBlobUrl}
                  className="w-full px-4 py-3 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary-theme outline-none disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  disabled={!!lockedBlobUrl}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors disabled:opacity-50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type password..."
                  disabled={!!lockedBlobUrl}
                  className="w-full px-4 py-3 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary-theme outline-none disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  disabled={!!lockedBlobUrl}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-700 transition-colors disabled:opacity-50"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm md:text-base flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action */}
          {!lockedBlobUrl ? (
            <button
              onClick={handleLock}
              disabled={isProtecting}
              className="w-full py-3.5 px-6 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProtecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Encrypting PDF with AES-256...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Lock & Protect PDF
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4">
              {/* Success Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-sm">PDF Locked & Protected!</p>
                  <p className="text-xs md:text-sm text-emerald-600">
                    Your PDF is encrypted with AES-256. Keep your password safe — it cannot be recovered.
                  </p>
                </div>
              </div>

              {/* Download */}
              <button
                onClick={handleDownload}
                className="w-full py-3.5 px-6 rounded-xl bg-primary-theme hover:bg-primary-theme/90 text-white font-bold transition shadow-md shadow-primary-theme/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Download Protected PDF
              </button>

              {/* Lock Another */}
              <button
                onClick={reset}
                className="w-full py-2.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                Lock Another PDF
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
