"use client";

import React, { useState, useRef } from "react";
import { PDFDocument } from "pdf-lib";
import { UploadCloud, FileText, ArrowUp, ArrowDown, Trash2, Download, CheckCircle2, AlertCircle } from "lucide-react";

interface PDFItem {
  id: string;
  file: File;
  name: string;
  size: number;
}

export default function MergePDF() {
  const [files, setFiles] = useState<PDFItem[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setError(null);
    setOutputUrl(null);

    const validFiles: PDFItem[] = [];
    Array.from(newFiles).forEach((file) => {
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        validFiles.push({
          id: Math.random().toString(36).substring(7),
          file,
          name: file.name,
          size: file.size,
        });
      }
    });

    if (validFiles.length === 0) {
      setError("Please select valid PDF files.");
      return;
    }

    setFiles((prev) => [...prev, ...validFiles]);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...files];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setFiles(updated);
  };

  const moveDown = (index: number) => {
    if (index === files.length - 1) return;
    const updated = [...files];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setFiles(updated);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setOutputUrl(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please add at least 2 PDF files to merge.");
      return;
    }

    try {
      setIsMerging(true);
      setError(null);

      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setOutputUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to merge PDF files. Some files might be protected.");
    } finally {
      setIsMerging(false);
    }
  };

  const handleDownload = () => {
    if (!outputUrl) return;
    const a = document.createElement("a");
    a.href = outputUrl;
    a.download = "merged-document.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetAll = () => {
    setFiles([]);
    setOutputUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
      <div className="text-center max-w-8xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Merge PDF Files</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1">
          Combine multiple PDF files into one unified document with custom page order.
        </p>
      </div>

      {/* Upload Zone */}
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
          accept=".pdf"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="p-4 bg-white rounded-full shadow-sm text-primary-theme group-hover:scale-110 transition-transform">
          <UploadCloud className="w-8 h-8" />
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-700">
          Click to upload or drag and drop PDFs
        </p>
        <p className="text-xs text-slate-400 mt-1">Select 2 or more PDF documents</p>
      </div>

      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className="mt-8 space-y-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm md:text-base font-bold text-slate-700">
              Files to merge ({files.length})
            </span>
            <button
              onClick={resetAll}
              className="text-xs text-red-500 hover:underline font-semibold"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {files.map((file, idx) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100/80 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 bg-primary-theme/10 text-primary-theme rounded-lg flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <FileText className="w-5 h-5 text-primary-theme shrink-0" />
                  <div className="truncate">
                    <p className="text-sm font-medium text-slate-800 truncate">{file.name}</p>
                    <p className="text-xs text-slate-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                    title="Move Up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveDown(idx)}
                    disabled={idx === files.length - 1}
                    className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-500 disabled:opacity-30 cursor-pointer"
                    title="Move Down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1.5 hover:bg-red-50 rounded-lg text-red-500 border border-transparent hover:border-red-200 cursor-pointer ml-1"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            {!outputUrl ? (
              <button
                onClick={handleMerge}
                disabled={isMerging || files.length < 2}
                className="flex-1 py-3.5 px-6 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold transition shadow-md shadow-primary-theme/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isMerging ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Merging PDFs...
                  </>
                ) : (
                  <>Merge {files.length} PDFs</>
                )}
              </button>
            ) : (
              <button
                onClick={handleDownload}
                className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Download Merged PDF
              </button>
            )}
          </div>
        </div>
      )}

      {outputUrl && (
        <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800">
          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          <div className="text-sm">
            <p className="font-bold">PDFs merged successfully!</p>
            <p className="text-xs text-emerald-600">Your combined PDF is ready to download.</p>
          </div>
        </div>
      )}
    </div>
  );
}
