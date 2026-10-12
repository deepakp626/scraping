"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import {
  Printer,
  Copy,
  Check,
  Trash2,
  FileDown,
  Minimize2,
  Sparkles,
  AlertCircle,
  FileCode,
  Upload,
} from "lucide-react";

export default function JSONPrettyPrint() {
  const [input, setInput] = useState<string>("");
  const [spaces, setSpaces] = useState<number>(2);
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ lines: number; bytes: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Accept only JSON files
    const isJson =
      file.type === "application/json" || file.name.toLowerCase().endsWith(".json");
    if (!isJson) {
      setError("Only .json files are supported. Please upload a valid JSON file.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content !== undefined) {
        setInput(content);
        setError(null);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const processJSON = useCallback((jsonStr: string, indent: number) => {
    if (!jsonStr.trim()) {
      setOutput("");
      setError(null);
      setStats(null);
      return;
    }

    try {
      const parsed = JSON.parse(jsonStr);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError(null);

      const lineCount = formatted.split("\n").length;
      const byteSize = new Blob([formatted]).size;
      setStats({ lines: lineCount, bytes: byteSize });
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
      setOutput("");
      setStats(null);
    }
  }, []);

  useEffect(() => {
    processJSON(input, spaces);
  }, [input, spaces, processJSON]);

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
      setStats({ lines: 1, bytes: new Blob([minified]).size });
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setStats(null);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "formatted.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (!output) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const escapedOutput = output
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print JSON Output</title>
          <style>
            body { font-family: monospace; padding: 24px; color: #1e293b; background: #fff; }
            pre { font-size: 14px; white-space: pre-wrap; word-break: break-all; }
          </style>
        </head>
        <body>
          <pre>${escapedOutput}</pre>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
            <Printer className="w-6 h-6 text-primary-theme" />
            JSON Pretty Print & Formatter
          </h2>
          <p className="text-sm md:text-base text-slate-500 mt-1">
            Validate, format, minify, and analyze your JSON in real-time.
          </p>
        </div>
      </div>

      {/* Indentation Selector & Status */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700">Indentation:</span>
          {[2, 4, 8].map((s) => (
            <button
              key={s}
              onClick={() => setSpaces(s)}
              className={`px-3.5 py-1.5 text-sm font-semibold rounded-xl transition cursor-pointer ${
                spaces === s
                  ? "bg-primary-theme text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {s} Spaces
            </button>
          ))}
        </div>

        {/* Stats Badge */}
        {stats && !error && (
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              Lines: {stats.lines}
            </span>
            <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
              Size: {stats.bytes} B
            </span>
          </div>
        )}
      </div>

      {/* Code Editors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Input Section */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center h-10 mb-2">
            <label className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-primary-theme" /> Raw JSON Input
            </label>
            <div className="flex items-center gap-2">
              {/* Hidden JSON-only file input */}
              <input
                type="file"
                ref={fileInputRef}
                accept=".json,application/json"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer"
                title="Upload JSON file"
              >
                <Upload className="w-3.5 h-3.5" /> Upload
              </button>
              <button
                onClick={handleClear}
                disabled={!input}
                className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
              <button
                onClick={handleMinify}
                disabled={!input || !!error}
                className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Minimize2 className="w-3.5 h-3.5" /> Minify
              </button>
            </div>
          </div>

          <div className="h-[340px] border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
            <CodeMirror
              value={input}
              height="340px"
              extensions={[json()]}
              onChange={(value) => setInput(value)}
              className="text-sm font-mono h-full"
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center h-10 mb-2">
            <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary-theme" /> Pretty Output
            </span>
            {output && !error && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button
                  onClick={handleDownload}
                  className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5" /> Download
                </button>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            )}
          </div>

          <div className="h-[340px] relative border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
            {error ? (
              <div className="p-4 text-red-600 font-mono text-xs flex items-start gap-2 bg-red-50 h-full overflow-auto">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">JSON Syntax Error</p>
                  <p className="mt-1 text-red-500">{error}</p>
                </div>
              </div>
            ) : output ? (
              <CodeMirror
                value={output}
                height="340px"
                extensions={[json()]}
                editable={false}
                readOnly={true}
                className="text-sm font-mono h-full"
              />
            ) : (
              <div className="p-4 text-slate-400 italic text-sm">
                Formatted JSON will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}