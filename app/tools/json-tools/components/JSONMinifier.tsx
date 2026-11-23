"use client";

import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { 
  Minimize2, 
  Copy, 
  Check, 
  Upload, 
  Download, 
  Trash2, 
  FileText 
} from "lucide-react";

export default function JSONMinifier() {
  const [input, setInput] = useState<string>(
    `{\n  "service": "Quick Commerce",\n  "active": true,\n  "payload": {\n    "items": [\n      { "id": 1, "name": "Item A" },\n      { "id": 2, "name": "Item B" }\n    ]\n  }\n}`
  );
  const [minified, setMinified] = useState<string>("");
  const [fileName, setFileName] = useState<string>("minified.json");
  const [stats, setStats] = useState<{
    originalSize: number;
    minifiedSize: number;
    saved: string;
  } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Minify JSON logic
  const handleMinify = () => {
    try {
      setError(null);
      if (!input.trim()) return;

      const parsed = JSON.parse(input);
      const output = JSON.stringify(parsed);
      const origSize = new Blob([input]).size;
      const minSize = new Blob([output]).size;
      const savedPct =
        origSize > 0
          ? (((origSize - minSize) / origSize) * 100).toFixed(1)
          : "0";

      setMinified(output);
      setStats({
        originalSize: origSize,
        minifiedSize: minSize,
        saved: `${savedPct}%`,
      });
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
      setMinified("");
      setStats(null);
    }
  };

  // Upload JSON File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(`minified-${file.name}`);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setInput(content);
        setError(null);
      }
    };
    reader.readAsText(file);
    // Reset file input so re-uploading same file triggers change
    e.target.value = "";
  };

  // Download Minified JSON
  const handleDownload = () => {
    if (!minified) return;
    const blob = new Blob([minified], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName.endsWith(".json") ? fileName : `${fileName}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Copy Minified Text
  const handleCopy = () => {
    if (!minified) return;
    navigator.clipboard.writeText(minified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clear / Delete Inputs
  const handleClear = () => {
    setInput("");
    setMinified("");
    setStats(null);
    setError(null);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm max-w-8xl mx-auto transition-all">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2.5 mb-2">
        <Minimize2 className="w-7 h-7 text-primary-theme" />
        JSON Minifier & Compressor
      </h2>
      <p className="text-sm md:text-base text-slate-500 mb-6">
        Strip unnecessary whitespace, newlines, and indentation to optimize payload sizes for production APIs.
      </p>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Input Editor Column */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2.5">
            <label className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-400" /> Original JSON
            </label>
            <div className="flex items-center gap-2">
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json,application/json"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs md:text-sm text-slate-600 hover:text-primary-theme flex items-center gap-1 font-semibold transition px-2.5 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                title="Upload JSON File"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload
              </button>
              {input && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs  md:text-sm text-rose-500 hover:text-rose-600 flex items-center gap-1 font-semibold transition px-2.5 py-1 rounded-lg hover:bg-rose-50 cursor-pointer"
                  title="Clear Code"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* CodeMirror Input Component */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 focus-within:border-primary-theme focus-within:ring-1 focus-within:ring-primary-theme transition">
            <CodeMirror
              value={input}
              height="280px"
              extensions={[json()]}
              onChange={(value) => setInput(value)}
              className="text-sm font-mono"
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                dropCursor: true,
                allowMultipleSelections: false,
                indentOnInput: true,
              }}
            />
          </div>
        </div>

        {/* Right Output Editor Column */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs md:text-sm  font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              Minified Result
            </span>
            {minified && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs  md:text-sm text-slate-600 hover:text-primary-theme flex items-center gap-1 font-semibold transition px-2.5 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="text-xs  md:text-sm text-slate-600 hover:text-primary-theme flex items-center gap-1 font-semibold transition px-2.5 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            )}
          </div>

          {/* CodeMirror / Display Box for Minified JSON */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 text-slate-800 font-mono text-sm min-h-[280px] max-h-[280px] overflow-auto break-all">
            {error ? (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-sans text-sm font-semibold">
                ⚠️ {error}
              </div>
            ) : minified ? (
              <p className="leading-relaxed text-slate-800">{minified}</p>
            ) : (
              <span className="text-slate-400 italic text-sm">
                Click "Minify JSON Now" below to view the compressed output...
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Savings Statistics Panel */}
      {stats && (
        <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-3 gap-4 text-center animate-in fade-in duration-200">
          <div>
            <span className="text-xs font-medium text-slate-500 block mb-1">Original Size</span>
            <span className="text-lg font-bold text-slate-800">{stats.originalSize} Bytes</span>
          </div>
          <div className="border-x border-slate-200 px-2">
            <span className="text-xs font-medium text-slate-500 block mb-1">Minified Size</span>
            <span className="text-lg font-bold text-slate-800">{stats.minifiedSize} Bytes</span>
          </div>
          <div>
            <span className="text-xs font-medium text-slate-500 block mb-1">Space Saved</span>
            <span className="text-lg font-bold text-emerald-600">{stats.saved}</span>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="mt-6">
        <button
          onClick={handleMinify}
          disabled={!input.trim()}
          className="w-full bg-primary-theme hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3.5 px-6 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer text-base"
        >
          <Minimize2 className="w-5 h-5" /> Minify JSON Now
        </button>
      </div>
    </div>
  );
}