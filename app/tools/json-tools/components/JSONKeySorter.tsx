"use client";

import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import {
  ArrowUpDown,
  Copy,
  Check,
  Upload,
  Download,
  Trash2,
} from "lucide-react";

export default function JSONKeySorter() {
  const [input, setInput] = useState(
    ``
  );
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sortObjectKeys = (obj: any, dir: "asc" | "desc"): any => {
    if (Array.isArray(obj)) {
      return obj.map((item) => sortObjectKeys(item, dir));
    }
    if (typeof obj === "object" && obj !== null) {
      const sortedKeys = Object.keys(obj).sort((a, b) =>
        dir === "asc" ? a.localeCompare(b) : b.localeCompare(a)
      );
      const sortedObj: Record<string, any> = {};
      for (const k of sortedKeys) {
        sortedObj[k] = sortObjectKeys(obj[k], dir);
      }
      return sortedObj;
    }
    return obj;
  };

  const handleSort = () => {
    try {
      setError(null);
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const sorted = sortObjectKeys(parsed, direction);
      setOutput(JSON.stringify(sorted, null, 2));
    } catch (err: any) {
      setError(err.message || "Invalid JSON input");
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "sorted-json.json");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInput(content);
      setError(null);
    };
    reader.readAsText(file);
    e.target.value = ""; // Reset input value for same file uploads
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
        <ArrowUpDown className="w-6 h-6 text-primary-theme" />
        JSON Key Sorter
      </h2>
      <p className="text-sm md:text-base text-slate-500 mb-6">
        Recursively sort all JSON keys in ascending (A-Z) or descending (Z-A)
        alphabetical order.
      </p>

      {/* Sort Direction Toggle Bar */}
      <div className="mb-6 flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <span className="text-sm font-semibold text-slate-700">Sort Order:</span>
        <button
          onClick={() => setDirection("asc")}
          className={`px-4 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
            direction === "asc"
              ? "bg-primary-theme text-white shadow-sm"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          Ascending (A → Z)
        </button>
        <button
          onClick={() => setDirection("desc")}
          className={`px-4 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer ${
            direction === "desc"
              ? "bg-primary-theme text-white shadow-sm"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
          }`}
        >
          Descending (Z → A)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Editor Section */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
              Unsorted JSON
            </span>
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-primary-theme"   

                title="Upload JSON File"
              >
                <Upload className="w-3.5 h-3.5" /> Upload
              </button>
              <button
                onClick={handleClear}
                className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-red-500"   

                title="Clear input and output"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
          </div>
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 min-h-[260px]">
            <CodeMirror
              value={input}
              height="400px"
              placeholder={"Past or upload json here ..."}
              extensions={[json()]}
              onChange={(value) => setInput(value)}
              theme="light"
              basicSetup={{
                lineNumbers: true,
                foldGutter: false,
                highlightActiveLine: false,
              }}
            />
          </div>
        </div>

        {/* Output Editor Section */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
              Sorted JSON Result
            </span>
            {output && (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-primary-theme"   
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  onClick={handleDownload}
className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-primary-theme"   
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            )}
          </div>
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 min-h-[400px] flex flex-col justify-center">
            {error ? (
              <div className="p-4 text-xs font-mono text-red-500 font-semibold break-words">
                {error}
              </div>
            ) : output ? (
              <CodeMirror
                value={output}
                height="400px"
                extensions={[json()]}
                readOnly={true}
                theme="light"
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: false,
                  highlightActiveLine: false,
                }}
              />
            ) : (
              <div className="p-4 text-xs font-mono text-slate-400 italic text-center">
                Click Sort JSON Keys...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSort}
          disabled={!input.trim()}
          className="w-full bg-primary-theme hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowUpDown className="w-5 h-5" /> Sort JSON Keys
        </button>
      </div>
    </div>
  );
}