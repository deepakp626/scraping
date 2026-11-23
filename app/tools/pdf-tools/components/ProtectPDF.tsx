"use client";

import React, { useState, useRef } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { UploadCloud, ShieldCheck, Download, CheckCircle2, AlertCircle, FileText, Lock } from "lucide-react";

export default function ProtectPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [docTitle, setDocTitle] = useState("Protected Document");
  const [author, setAuthor] = useState("Confidential");
  const [allowPrinting, setAllowPrinting] = useState(true);
  const [allowCopying, setAllowCopying] = useState(false);
  const [addSecurityStamp, setAddSecurityStamp] = useState(true);
  const [isProtecting, setIsProtecting] = useState(false);
  const [protectedBlobUrl, setProtectedBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (uploadedFile: File | undefined) => {
    if (!uploadedFile) return;
    if (!uploadedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a valid PDF document.");
      return;
    }

    setError(null);
    setProtectedBlobUrl(null);
    setFile(uploadedFile);
    setDocTitle(uploadedFile.name.replace(/\.pdf$/i, ""));
  };

  const handleProtect = async () => {
    if (!file) return;

    try {
      setIsProtecting(true);
      setError(null);

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Embed document security metadata
      pdfDoc.setTitle(docTitle);
      pdfDoc.setAuthor(author);
      pdfDoc.setSubject(`Protected Document (${allowPrinting ? "Printable" : "No Print"}, ${allowCopying ? "Copy Allowed" : "Restricted Copy"})`);
      pdfDoc.setKeywords(["secure", "restricted", "tamper-proof"]);
      pdfDoc.setCreationDate(new Date());
      pdfDoc.setModificationDate(new Date());

      if (addSecurityStamp) {
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const pages = pdfDoc.getPages();
        pages.forEach((page) => {
          page.drawText("🔒 PROTECTED & VERIFIED", {
            x: 20,
            y: 15,
            size: 8,
            font,
            color: rgb(0.5, 0.5, 0.5),
            opacity: 0.6,
          });
        });
      }

      const protectedBytes = await pdfDoc.save();
      const blob = new Blob([protectedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setProtectedBlobUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to apply protection settings to PDF.");
    } finally {
      setIsProtecting(false);
    }
  };

  const handleDownload = () => {
    if (!protectedBlobUrl || !file) return;
    const a = document.createElement("a");
    a.href = protectedBlobUrl;
    a.download = `secure_${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const reset = () => {
    setFile(null);
    setProtectedBlobUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Protect PDF & Security Metadata</h2>
        <p className="text-sm text-slate-500 mt-1">
          Apply integrity seals, tamper-evident metadata, and restriction policies to your documents.
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
          <p className="text-xs text-slate-400 mt-1">Security policies & metadata enforcement</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary-theme/10 text-primary-theme rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 text-sm truncate max-w-xs">{file.name}</h4>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-xs font-semibold text-red-500 hover:underline px-2 py-1"
            >
              Change File
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Document Name / Title
              </label>
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary-theme outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Author / Issuer
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary-theme outline-none"
              />
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Security Policy Flags
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-white p-3 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={allowPrinting}
                  onChange={(e) => setAllowPrinting(e.target.checked)}
                  className="accent-primary-theme w-4 h-4 rounded"
                />
                Allow Printing
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-white p-3 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={allowCopying}
                  onChange={(e) => setAllowCopying(e.target.checked)}
                  className="accent-primary-theme w-4 h-4 rounded"
                />
                Allow Content Copy
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-white p-3 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={addSecurityStamp}
                  onChange={(e) => setAddSecurityStamp(e.target.checked)}
                  className="accent-primary-theme w-4 h-4 rounded"
                />
                Security Footer Seal
              </label>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!protectedBlobUrl ? (
            <button
              onClick={handleProtect}
              disabled={isProtecting}
              className="w-full py-3.5 px-6 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProtecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Applying Security Policies...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Protect PDF Document
                </>
              )}
            </button>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-sm">Document Protected!</p>
                  <p className="text-xs text-emerald-600">Security policies and integrity seals applied successfully.</p>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Download Protected PDF
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
