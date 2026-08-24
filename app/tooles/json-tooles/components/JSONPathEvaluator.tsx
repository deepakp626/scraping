"use client";

import React, { useState, useRef } from "react";
import { Search, Copy, Check, Upload, Download, Trash2 } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { JSONPath } from "jsonpath-plus";

export default function JSONPathEvaluator() {
  const [input, setInput] = useState<string>(
    JSON.stringify(
      {
        store: {
          book: [
            { category: "reference", author: "Nigel", price: 8.95 },
            { category: "fiction", author: "Evelyn", price: 12.99 },
          ],
          location: "Main St",
        },
      },
      null,
      2
    )
  );
  const [query, setQuery] = useState("$.store.book[*].author");
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Evaluate JSONPath using `jsonpath-plus`
  const evaluatePath = () => {
    try {
      setError(null);
      if (!input.trim() || !query.trim()) return;

      const parsedJSON = JSON.parse(input);
      const evalResult = JSONPath({ path: query, json: parsedJSON });

      if (evalResult === undefined || (Array.isArray(evalResult) && evalResult.length === 0)) {
        setResult("[] (No match found)");
      } else {
        setResult(JSON.stringify(evalResult, null, 2));
      }
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax or JSONPath expression.");
      setResult("");
    }
  };

  // Copy result to clipboard
  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Upload JSON File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setInput(content);
        setError(null);
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // Reset input after upload
  };

  // Download Output JSON / Text
  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "query_result.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Clear All Fields
  const handleClear = () => {
    setInput("");
    setQuery("");
    setResult("");
    setError(null);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
        <Search className="w-6 h-6 text-primary-theme" />
        JSONPath Evaluator
      </h2>
      <p className="text-xs md:text-base text-slate-500 mb-6">
        Query specific keys and node properties in JSON objects using standard JSONPath expressions.
      </p>

      {/* Query Bar */}
      <div className="mb-4">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">
          JSONPath Expression
        </label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. $.store.book[*].author"
          className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-mono text-sm focus:outline-none focus:border-primary-theme"
        />
      </div>

      {/* Main Grid: Input & Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
              JSON Document
            </span>
            <div className="flex items-center gap-2">
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
                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-primary-theme"
                title="Upload JSON File"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload
              </button>
              <button
                type="button"
                onClick={handleClear}
                                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-red-500"

                
                title="Clear All"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl bg-slate-50 overflow-hidden min-h-[250px] flex-1">
            <CodeMirror
              value={input}
              height="250px"
              extensions={[json()]}
              onChange={(value) => setInput(value)}
              theme="light"
              className="text-sm font-mono"
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
              Query Result
            </span>
            {result && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownload}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-primary-theme"

                  title="Download Result"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-indigo-50 hover:text-primary-theme"

>
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  {copied ? "Copied" : "Copy Result"}
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 min-h-[250px] p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-800 font-mono text-sm overflow-auto whitespace-pre">
            {error ? (
              <span className="text-red-500 font-semibold">{error}</span>
            ) : result ? (
              result
            ) : (
              <span className="text-slate-400 italic">
                Click Evaluate JSONPath to view results...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Evaluate Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={evaluatePath}
          disabled={!input.trim() || !query.trim()}
          className="w-full bg-primary-theme hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Search className="w-5 h-5" /> Evaluate JSONPath
        </button>
      </div>
    </div>
  );
}