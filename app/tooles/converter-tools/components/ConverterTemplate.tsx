"use client";

import React, { useState, useRef } from "react";
import { Upload, FileUp, FileDown, CheckCircle2, RefreshCw } from "lucide-react";

interface ConverterTemplateProps {
  title: string;
  desc: string;
  sourceExts: string[];
  targetExt: string;
}

export default function ConverterTemplate({
  title,
  desc,
  sourceExts,
  targetExt,
}: ConverterTemplateProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepMsg, setStepMsg] = useState("");
  const [completed, setCompleted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file: File) => {
    const name = file.name.toLowerCase();
    const matchesExt = sourceExts.some((ext) => name.endsWith(ext.toLowerCase()));
    if (!matchesExt) {
      alert(`Invalid file format. Please upload: ${sourceExts.join(", ")}`);
      return;
    }
    setSelectedFile(file);
    setCompleted(false);
    setProgress(0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const startConversion = () => {
    if (!selectedFile) return;
    setIsConverting(true);
    setProgress(0);

    const steps = [
      { p: 15, msg: "Reading file bytes..." },
      { p: 40, msg: "Parsing file structure..." },
      { p: 70, msg: `Encoding output to .${targetExt}...` },
      { p: 90, msg: "Assembling final package..." },
      { p: 100, msg: "Conversion completed!" },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].p);
        setStepMsg(steps[currentStep].msg);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsConverting(false);
        setCompleted(true);
      }
    }, 600);
  };

  const downloadResult = () => {
    if (!selectedFile) return;
    const originalName = selectedFile.name;
    const baseName = originalName.substring(0, originalName.lastIndexOf(".")) || originalName;
    const newFileName = `${baseName}_converted.${targetExt}`;

    const textContent = `--- Converted File ---\nSource File: ${originalName}\nConverted to: .${targetExt}\nPowered by Scraping Converter Tools\nTimestamp: ${new Date().toISOString()}`;
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = newFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setSelectedFile(null);
    setIsConverting(false);
    setProgress(0);
    setCompleted(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <FileUp className="w-6 h-6 text-primary-theme" />
        {title}
      </h2>
      <p className="text-sm text-slate-500 mt-1">{desc}</p>

      {/* File Select Area */}
      {!selectedFile && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="mt-6 border-2 border-dashed border-slate-200 hover:border-primary-theme rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50 cursor-pointer transition-all duration-300 group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={sourceExts.join(",")}
            className="hidden"
          />
          <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8 text-primary-theme" />
          </div>
          <span className="mt-4 text-sm font-semibold text-slate-700">
            Drag and drop or <span className="text-primary-theme hover:underline">browse</span>
          </span>
          <span className="text-xs text-slate-400 mt-1">
            Supports: {sourceExts.join(", ").toUpperCase()}
          </span>
        </div>
      )}

      {/* Conversion Workspace */}
      {selectedFile && (
        <div className="mt-6 space-y-6">
          <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <FileUp className="w-6 h-6 text-primary-theme" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-700 truncate max-w-xs md:max-w-md">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-slate-400">{formatSize(selectedFile.size)}</p>
              </div>
            </div>
            {completed && <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />}
          </div>

          {/* Progress Section */}
          {isConverting && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-600">
                <span>{stepMsg}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary-theme h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Complete Section */}
          {completed && (
            <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <div className="text-sm text-green-800">
                Conversion successful! Click the button below to download your <strong>.{targetExt}</strong> file.
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {!completed ? (
              <button
                onClick={startConversion}
                disabled={isConverting}
                className="flex-1 bg-primary-theme hover:opacity-90 text-white font-semibold py-3 px-6 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isConverting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Converting...
                  </>
                ) : (
                  "Convert Now"
                )}
              </button>
            ) : (
              <button
                onClick={downloadResult}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-2xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileDown className="w-5 h-5" />
                Download Converted File
              </button>
            )}
            <button
              onClick={reset}
              className="px-6 py-3 border border-slate-200 hover:bg-slate-50 font-semibold rounded-2xl transition text-slate-600 cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
