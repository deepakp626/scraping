"use client";

import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { jsonrepair } from "jsonrepair";
import {
  Wrench,
  Copy,
  Check,
  Upload,
  Download,
  Trash2,
  AlertCircle,
  CheckCircle2,
  FileCode,
  FileJson,
  Sparkles,
} from "lucide-react";

export default function JSONRepair() {
  const [input, setInput] = useState(
    `{\n  name: 'Broken JSON',\n  items: ['apple', 'banana',],\n  active: true,\n}`
  );
  const [repaired, setRepaired] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-Fix / Repair
  const handleRepair = () => {
    try {
      setError(null);
      if (!input.trim()) {
        setRepaired("");
        return;
      }
      const fixedStr = jsonrepair(input);
      const parsedObj = JSON.parse(fixedStr);
      setRepaired(JSON.stringify(parsedObj, null, 2));
    } catch (err: any) {
      setError(
        err?.message ||
          "Unable to auto-repair. Please check for missing brackets or severe structural corruption."
      );
      setRepaired("");
    }
  };

  // Upload JSON File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setInput((event.target?.result as string) || "");
      setError(null);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Clear
  const handleClear = () => {
    setInput("");
    setRepaired("");
    setError(null);
  };

  // Copy repaired output
  const handleCopy = () => {
    if (!repaired) return;
    navigator.clipboard.writeText(repaired);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download repaired JSON
  const handleDownload = () => {
    if (!repaired) return;
    const blob = new Blob([repaired], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "repaired.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const hasRepaired = !!repaired && !error;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json,.txt,application/json"
        className="hidden"
      />

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Wrench className="w-6 h-6 text-primary-theme" />
            JSON Repair Tool
          </h2>
          <p className="text-xs md:text-base text-slate-500 mt-1">
            Auto-fix malformed JSON — unquoted keys, single quotes, trailing commas, comments &amp; missing brackets.
          </p>
        </div>

        {/* Repair button top-right on desktop */}
        <button
          type="button"
          onClick={handleRepair}
          disabled={!input.trim()}
          className="shrink-0 bg-primary-theme hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 px-5 rounded-xl transition shadow-sm flex items-center gap-2 cursor-pointer self-start"
        >
          <Sparkles className="w-4 h-4" />
          Auto-Fix JSON
        </button>
      </div>

      {/* ── Editor Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* ── Left: Input ── */}
        <div className="flex flex-col gap-2">
          {/* Column header */}
          <div className="flex justify-between items-center h-9">
            <label className="text-xs md:text-sm font-bold  uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-5 h-5 text-primary-theme" />
              Malformed JSON
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 text-xs md:text-sm font-semibold text-slate-600 hover:text-primary-theme border border-slate-200 hover:border-primary-theme/30 rounded-lg bg-white hover:bg-primary-theme/5 flex items-center gap-1 cursor-pointer transition"
              >
                <Upload className="w-4 h-4" /> Upload
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={!input}
                className="px-2.5 py-1 text-xs md:text-sm font-semibold text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg bg-white flex items-center gap-1 cursor-pointer transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary-theme/40 transition-shadow">
            <CodeMirror
              value={input}
              height="300px"
              extensions={[json()]}
              onChange={(val) => setInput(val)}
              className="text-sm font-mono"
              basicSetup={{ lineNumbers: true, foldGutter: true, highlightActiveLine: true }}
            />
          </div>

          {/* Hint */}
          <p className="text-xs text-slate-400 px-1">
            Paste or upload any malformed JSON. Supports single quotes, missing quotes, trailing commas &amp; more.
          </p>
        </div>

        {/* ── Right: Output ── */}
        <div className="flex flex-col gap-2">
          {/* Column header */}
          <div className="flex justify-between items-center h-9">
            <label className="text-xs md:text-sm font-bold  uppercase tracking-wider flex items-center gap-1.5">
              <FileJson className="w-5 h-5 text-primary-theme" />
              Repaired JSON
              {hasRepaired && (
                <span className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <CheckCircle2 className="w-3 h-3" /> Fixed
                </span>
              )}
            </label>

            {hasRepaired && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2.5 py-1 text-xs md:text-sm font-semibold text-slate-600 hover:text-primary-theme border border-slate-200 hover:border-primary-theme/30 rounded-lg bg-white hover:bg-primary-theme/5 flex items-center gap-1 cursor-pointer transition"
                >
                  {copied
                    ? <><Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!</>
                    : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                </button>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="px-2.5 py-1 text-xs md:text-sm  font-semibold text-slate-600 hover:text-primary-theme border border-slate-200 hover:border-primary-theme/30 rounded-lg bg-white hover:bg-primary-theme/5 flex items-center gap-1 cursor-pointer transition"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            )}
          </div>

          {/* Output panel */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden h-[300px]">
            {error ? (
              <div className="p-4 bg-rose-50 h-full flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-rose-700">Repair Failed</p>
                    <p className="text-xs text-rose-600 mt-0.5 font-mono">{error}</p>
                  </div>
                </div>
              </div>
            ) : repaired ? (
              <CodeMirror
                value={repaired}
                height="300px"
                extensions={[json()]}
                readOnly
                editable={false}
                className="text-sm font-mono"
                basicSetup={{ lineNumbers: true, foldGutter: true }}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2 bg-slate-50">
                <FileJson className="w-9 h-9 opacity-25" />
                <p className="text-sm font-medium">Click <span className="font-bold text-primary-theme">Auto-Fix JSON</span> to repair</p>
                <p className="text-xs">Output will appear here</p>
              </div>
            )}
          </div>

          {/* Hint */}
          <p className="text-xs text-slate-400 px-1">
            {hasRepaired ? "✓ JSON successfully repaired and formatted." : "Repaired output is read-only and ready to copy or download."}
          </p>
        </div>
      </div>

      {/* ── Bottom CTA (full width on mobile) ── */}
      <div className="mt-5 md:hidden">
        <button
          type="button"
          onClick={handleRepair}
          disabled={!input.trim()}
          className="w-full bg-primary-theme hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
          Auto-Fix JSON
        </button>
      </div>
    </div>
  );
}