"use client";

import React, { useState, useMemo, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import JsonView from "@uiw/react-json-view";
import { lightTheme } from "@uiw/react-json-view/light";
import {
  Network,
  Upload,
  Sparkles,
  Trash2,
  Copy,
  Check,
  Download,
  FileCode,
  AlertCircle,
  FolderOpen,
  FolderClosed,
} from "lucide-react";

const INITIAL_JSON = ``;

export default function JSONTreeViewer() {
  const [input, setInput] = useState<string>(INITIAL_JSON);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [collapsedDepth, setCollapsedDepth] = useState<number | boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse JSON safely using useMemo
  const parsedJSON = useMemo(() => {
    if (!input.trim()) {
      setError(null);
      return null;
    }
    try {
      setError(null);
      return JSON.parse(input);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
      return null;
    }
  }, [input]);

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInput(content);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Format (Prettify) Handler
  const handleFormat = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
    } catch (err) {
      // Keep input untouched if invalid syntax
    }
  };

  // Clear Input Handler
  const handleClear = () => {
    setInput("");
    setError(null);
  };

  // Copy JSON Handler
  const handleCopy = () => {
    if (!input.trim()) return;
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download JSON File Handler
  const handleDownload = () => {
    if (!input.trim()) return;
    const blob = new Blob([input], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm max-w-8xl mx-auto">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".json,application/json"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Network className="w-6 h-6 md:w-7 md:h-7 text-primary-theme" />
            JSON Tree Viewer
          </h2>
          <p className="text-xs md:text-base text-slate-500 mt-1">
            Visualize, explore, and inspect complex JSON structures as interactive trees.
          </p>
        </div>

        {/* Global Output Actions */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleCopy}
            disabled={!parsedJSON}
            className="px-3 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-600" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={handleDownload}
            disabled={!parsedJSON}
            className="px-3 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-600" /> Download
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Left Column: Input Editor */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center h-9 mb-2">
            <label className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-5 h-5 text-primary-theme" /> Raw JSON Input
            </label>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleFormat}
                className="px-2.5 py-1 text-xs md:text-sm font-semibold text-slate-600 hover:text-primary-theme border border-slate-200 rounded-lg bg-white hover:bg-slate-50 flex items-center gap-1 cursor-pointer transition"
              >
                <Sparkles className="w-3.5 h-3.5" /> Format
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 text-xs md:text-sm font-semibold text-slate-600 hover:text-primary-theme border border-slate-200 rounded-lg bg-white hover:bg-slate-50 flex items-center gap-1 cursor-pointer transition"
              >
                <Upload className="w-3.5 h-3.5" /> Upload
              </button>
              <button
                onClick={handleClear}
                className="px-2.5 py-1 text-xs md:text-sm font-semibold text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg bg-white flex items-center gap-1 cursor-pointer transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
          </div>

          <div className="h-[360px] md:h-[420px] border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
            <CodeMirror
              value={input}
              height="100%"
              placeholder="Upload or Paste JSON here"
              extensions={[json()]}
              onChange={(val) => setInput(val)}
              className="text-xs md:text-sm font-mono h-full"
            />
          </div>
        </div>

        {/* Right Column: Interactive Tree View Output */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center h-9 mb-2">
            <label className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Network className="w-5 h-5 text-primary-theme" /> Tree Navigation
            </label>

            {/* Expand / Collapse Toggle Buttons */}
            {parsedJSON && !error && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCollapsedDepth(false)}
                  className="px-2.5 py-1 text-xs md:text-sm font-semibold text-slate-600 hover:text-primary-theme border border-slate-200 rounded-lg bg-white hover:bg-slate-50 flex items-center gap-1 cursor-pointer transition"
                >
                  <FolderOpen className="w-3.5 h-3.5" /> Expand All
                </button>
                <button
                  onClick={() => setCollapsedDepth(1)}
                  className="px-2.5 py-1 text-xs md:text-sm font-semibold text-slate-600 hover:text-primary-theme border border-slate-200 rounded-lg bg-white hover:bg-slate-50 flex items-center gap-1 cursor-pointer transition"
                >
                  <FolderClosed className="w-3.5 h-3.5" /> Collapse
                </button>
              </div>
            )}
          </div>

          <div className="h-[360px] md:h-[420px] p-4 border border-slate-200 rounded-2xl bg-slate-50 overflow-auto font-mono text-xs md:text-sm">
            {error ? (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-xs md:text-sm">Invalid JSON</p>
                  <p className="mt-0.5 text-xs text-rose-600">{error}</p>
                </div>
              </div>
            ) : parsedJSON !== null ? (
              <JsonView
                value={parsedJSON}
                  style={{
    ...lightTheme,
    fontSize: "14px", // Set your preferred font size here (e.g., 14px, 16px, 18px)
     lineHeight: "1.6", // Increases vertical spacing between nodes
  }}
                // style={lightTheme}
                collapsed={collapsedDepth}
                shortenTextAfterLength={50}
                displayDataTypes={true}
                displayObjectSize={true}
                enableClipboard={true}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 italic text-xs md:text-sm">
                Enter or upload JSON to generate the interactive tree...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}