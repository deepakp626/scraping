"use client";

import React, { useState, useRef, useMemo } from "react";
import { jsonrepair } from 'jsonrepair';
import {
  FileCode,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  Download,
  Upload,
  Sparkles,
  Wrench,
  Minimize2,
  CheckCircle2,
  XCircle,
  Search,
  ChevronDown,
  ChevronRight,
  ArrowUpDown,
  FileJson,
  Layers,
} from "lucide-react";

/**
 * Advanced Production-Grade JSON Repair Function
 */
export function repairJsonString(rawInput: string): string {
  if (!rawInput || !rawInput.trim()) return "{}";

  let str = rawInput.trim();

  // 1. Strip Markdown Code Blocks (```json ... ``` or ``` ...)
  str = str.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");

  // 2. Strip JavaScript variable assignments (e.g., `const data = {...};` or `module.exports = [...]`)
  str = str.replace(/^(?:const|let|var|export\s+default|module\.exports\s*=)\s*[\w$]*\s*=\s*/i, "");
  if (str.endsWith(";")) str = str.slice(0, -1);

  // 3. Extract JSON boundaries if embedded in text (find first '{' or '[' and last '}' or ']')
  const firstBrace = str.search(/[\{\[]/);
  const lastBrace = Math.max(str.lastIndexOf("}"), str.lastIndexOf("]"));

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    str = str.substring(firstBrace, lastBrace + 1);
  }

  // Stage 1: Pass to jsonrepair directly
  try {
    const repaired = jsonrepair(str);
    JSON.parse(repaired);
    return repaired;
  } catch {
    // Proceed to state-machine sanitization
  }

  // Stage 2: Context-Aware Sanitization (State Machine)
  str = sanitizeJsonContextually(str);

  // Stage 3: Try jsonrepair after sanitization
  try {
    const repaired = jsonrepair(str);
    JSON.parse(repaired);
    return repaired;
  } catch {
    // Proceed to stack-based bracket balancing
  }

  // Stage 4: Stack-Based Bracket & Quote Auto-Closing
  str = balanceBracketsAndQuotes(str);

  // Stage 5: Final try with jsonrepair
  try {
    const repaired = jsonrepair(str);
    JSON.parse(repaired);
    return repaired;
  } catch {
    // If strict JSON.parse fails, return best-effort jsonrepair output
    return jsonrepair(str);
  }
}

/**
 * Sanitizes JSON tokens while preserving content inside string literals.
 */
function sanitizeJsonContextually(input: string): string {
  let result = "";
  let inString = false;
  let stringChar = "";
  let isEscaped = false;

  // Replace smart / curly quotes with standard quotes
  const normalized = input
    .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"')
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'");

  for (let i = 0; i < normalized.length; i++) {
    const char = normalized[i];
    const nextChar = normalized[i + 1] || "";

    if (isEscaped) {
      result += char;
      isEscaped = false;
      continue;
    }

    if (char === "\\") {
      result += char;
      isEscaped = true;
      continue;
    }

    // Toggle String state
    if (char === '"' || char === "'") {
      if (!inString) {
        inString = true;
        stringChar = char;
        result += '"'; // Always normalize enclosing quotes to double quotes
      } else if (char === stringChar) {
        inString = false;
        result += '"';
      } else {
        // Unescaped quote inside string (e.g. apostrophe or inner double quote)
        result += char === '"' ? '\\"' : char;
      }
      continue;
    }

    // Inside a string literal: Preserve everything as-is
    if (inString) {
      result += char;
      continue;
    }

    // Outside string literal: Fix syntax keywords
    // Strip JS Single-Line Comments (// ...) safely
    if (char === "/" && nextChar === "/") {
      const lineBreak = normalized.indexOf("\n", i);
      if (lineBreak === -1) break;
      i = lineBreak;
      continue;
    }

    // Strip JS Multi-Line Comments (/* ... */)
    if (char === "/" && nextChar === "*") {
      const closeComment = normalized.indexOf("*/", i + 2);
      if (closeComment === -1) break;
      i = closeComment + 1;
      continue;
    }

    result += char;
  }

  // Replace unquoted Python / JS literal keywords outside strings
  return result
    .replace(/\bNone\b/g, "null")
    .replace(/\bTrue\b/g, "true")
    .replace(/\bFalse\b/g, "false")
    .replace(/\bundefined\b/g, "null")
    .replace(/\bNaN\b/g, "null")
    .replace(/\bInfinity\b/g, "null")
    .replace(/\b-Infinity\b/g, "null");
}

/**
 * Uses a LIFO Stack to close unclosed strings, brackets, and braces in correct order.
 */
function balanceBracketsAndQuotes(input: string): string {
  const stack: string[] = [];
  let inString = false;
  let isEscaped = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (isEscaped) {
      isEscaped = false;
      continue;
    }
    if (char === "\\") {
      isEscaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (char === "{") stack.push("}");
      else if (char === "[") stack.push("]");
      else if (char === "}" || char === "]") {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop();
        }
      }
    }
  }

  let repaired = input.trim();

  // Close open string literal
  if (inString) {
    repaired += '"';
  }

  // Remove trailing comma before closing structural elements
  repaired = repaired.replace(/,\s*$/, "");

  // Pop stack in LIFO (Last-In-First-Out) order to close structural elements correctly
  while (stack.length > 0) {
    repaired += stack.pop();
  }

  return repaired;
}


export default function JSONFormatter() {
  // const [input, setInput] = useState('');
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [input, setInput] = useState<string>(`{
  "project": "Scraping Tools API",
  "version": "2.4.0",
  "author": {
    "name": "Developer Team",
    "email": "dev@example.com"
  },
  "features": ["formatting", "validation", "minification", "conversion"],
  "active": true,
  "stats": {
    "requests": 15200,
    "uptimeRatio": 0.999
  }
}`);

  const [indent, setIndent] = useState<number | string>(2);
  const [sortKeysOption, setSortKeysOption] = useState<"none" | "asc" | "desc">("none");
  const [viewMode, setViewMode] = useState<"formatted" | "tree" | "minified">("formatted");
  const [copied, setCopied] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample JSON snippets
  const samples = {
    simple: `{ "name": "John Doe", "age": 30, "city": "New York" }`,
    complex: `{
  "status": "success",
  "code": 200,
  "data": {
    "user": { "id": 101, "role": "admin", "permissions": ["read", "write", "delete"] },
    "session": { "token": "abc123xyz", "expiresIn": 3600 }
  }
}`,
    array: `[
  { "id": 1, "product": "Wireless Mouse", "price": 29.99, "inStock": true },
  { "id": 2, "product": "Mechanical Keyboard", "price": 89.99, "inStock": false }
]`,
  };

  // Helper for sorting keys recursively
  const sortObjectKeys = (obj: any, dir: "asc" | "desc"): any => {
    if (typeof obj !== "object" || obj === null) return obj;
    if (Array.isArray(obj)) return obj.map((item) => sortObjectKeys(item, dir));
    const keys = Object.keys(obj);
    keys.sort((a, b) => (dir === "asc" ? a.localeCompare(b) : b.localeCompare(a)));
    const sortedObj: any = {};
    for (const key of keys) {
      sortedObj[key] = sortObjectKeys(obj[key], dir);
    }
    return sortedObj;
  };

  // Parsing & Validation
  const parsedData = useMemo(() => {
    if (!input.trim()) return { valid: false, parsed: null, error: null };
    try {
      let parsed = JSON.parse(input);
      if (sortKeysOption !== "none") {
        parsed = sortObjectKeys(parsed, sortKeysOption);
      }
      return { valid: true, parsed, error: null };
    } catch (err: any) {
      return { valid: false, parsed: null, error: err.message || "Invalid JSON syntax" };
    }
  }, [input, sortKeysOption]);

  // Statistics calculation
  const stats = useMemo(() => {
    if (!parsedData.valid || parsedData.parsed === null || parsedData.parsed === undefined) {
      return { lines: input.split("\n").length, sizeBytes: new Blob([input]).size, keys: 0, depth: 0 };
    }

    const countKeys = (obj: any): number => {
      if (typeof obj !== "object" || obj === null) return 0;
      let count = Array.isArray(obj) ? 0 : Object.keys(obj).length;
      for (const k in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, k)) {
          count += countKeys(obj[k]);
        }
      }
      return count;
    };

    const getDepth = (obj: any): number => {
      if (typeof obj !== "object" || obj === null) return 0;
      const values = Object.values(obj);
      if (values.length === 0) return 1;
      const depths = values.map((v) => getDepth(v));
      return 1 + Math.max(...depths);
    };

    return {
      lines: input.split("\n").length,
      sizeBytes: new Blob([input]).size,
      keys: countKeys(parsedData.parsed),
      depth: getDepth(parsedData.parsed),
    };
  }, [input, parsedData]);

  // Output string builder
  const formattedOutput = useMemo(() => {
    if (!parsedData.valid || parsedData.parsed === undefined) return "";
    try {
      if (indent === "tab") {
        return JSON.stringify(parsedData.parsed, null, "\t");
      }
      return JSON.stringify(parsedData.parsed, null, Number(indent));
    } catch {
      return "";
    }
  }, [parsedData, indent]);

  // Auto Repair function
  const handleAutoRepair = () => {
    if (!input.trim()) return;

    try {
      // 1. Repair malformed JSON structure using multi-stage pipeline
      const repairedString = repairJsonString(input);

      // 2. Parse & re-stringify to format nicely
      const parsed = JSON.parse(repairedString);
      const targetIndent = indent === "tab" ? "\t" : Number(indent) || 2;
      const formatted = JSON.stringify(parsed, null, targetIndent);

      setInput(formatted);
      setStatus({
        type: "success",
        message: "Successfully repaired and formatted JSON structure!",
      });
    } catch (err: any) {
      const rawErrorMsg = err?.message || "Invalid JSON syntax";
      let friendlyMsg = rawErrorMsg;

      if (rawErrorMsg.includes("Object key expected")) {
        const pos = rawErrorMsg.match(/position (\d+)/)?.[1];
        friendlyMsg = pos
          ? `Missing or invalid object key near character position ${pos}`
          : "Missing or invalid object key in JSON payload";
      } else if (rawErrorMsg.includes("Unexpected") || rawErrorMsg.includes("position")) {
        const pos = rawErrorMsg.match(/position (\d+)/)?.[1];
        friendlyMsg = pos
          ? `Syntax error near character position ${pos}`
          : rawErrorMsg;
      }

      setStatus({
        type: "error",
        message: `Unable to auto-repair: ${friendlyMsg}. Please verify structural brackets.`,
      });
    }
  };

  // Minify function
  const handleMinify = () => {
    if (!parsedData.valid || parsedData.parsed === undefined) return;
    setInput(JSON.stringify(parsedData.parsed));
    setIndent(0);
    setViewMode("minified");
  };

  // Beautify Code function
  const handleBeautify = () => {
    if (!parsedData.valid || parsedData.parsed === undefined) return;
    const targetIndent = indent === 0 ? 2 : indent;
    if (indent === 0) setIndent(2);
    const formatted =
      targetIndent === "tab"
        ? JSON.stringify(parsedData.parsed, null, "\t")
        : JSON.stringify(parsedData.parsed, null, Number(targetIndent));
    setInput(formatted);
    setViewMode("formatted");
  };

  // Copy handler
  const handleCopy = () => {
    const textToCopy = viewMode === "minified" ? JSON.stringify(parsedData.parsed) : formattedOutput;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download handler
  const handleDownload = () => {
    if (!formattedOutput) return;
    const blob = new Blob([formattedOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted_data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // File Upload Handlers
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) setInput(text);
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm max-w-8xl mx-auto space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-2xl font-bold  flex items-center gap-2">
            <FileCode className="w-7 h-7 text-primary-theme" />
            JSON Formatter & Validator
          </h2>
          <p className="text-lg text-slate-500 mt-1">
            Format, beautify, minify, validate, and repair JSON strings online in real-time.
          </p>
        </div>

        {/* Action Controls & Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <span className="text-base font-bold text-slate-500 px-2">Indent:</span>
            {[
              { label: "2 Spaces", val: 2 },
              { label: "4 Spaces", val: 4 },
              { label: "Tab", val: "tab" },
              { label: "Minify", val: 0 },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => setIndent(opt.val)}
                className={`px-2.5 py-1 text-sm font-bold rounded-lg transition cursor-pointer ${
                  indent === opt.val
                    ? "bg-white text-primary-theme shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
            <select
              value={sortKeysOption}
              onChange={(e: any) => setSortKeysOption(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none p-1 cursor-pointer"
            >
              <option value="none">Sort: Default</option>
              <option value="asc">Sort Keys (A-Z)</option>
              <option value="desc">Sort Keys (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Status Notification Banner */}
      {status && (
        <div
          className={`p-3.5 rounded-2xl flex items-center justify-between gap-3 text-sm font-semibold ${
            status.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-amber-50 text-amber-900 border border-amber-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {status.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>{status.message}</span>
          </div>
          <button
            onClick={() => setStatus(null)}
            className="text-slate-400 hover:text-slate-600 font-bold transition cursor-pointer px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Grid: Input Panel vs Output Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN: Input Textarea */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              Raw Input JSON
            </span>
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.txt"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                  e.target.value = "";
                }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-semibold text-slate-600 hover:text-primary-theme flex items-center gap-1 transition cursor-pointer"
              >
                <Upload className="w-4 h-4" /> Upload File
              </button>
              <button
                onClick={() => setInput("")}
                className="text-sm font-semibold text-slate-400 hover:text-red-500 flex items-center gap-1 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Clear
              </button>
            </div>
          </div>

          {/* Textarea with Drag & Drop */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative flex-1 rounded-2xl border transition-all ${
              dragActive
                ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or drop JSON code here..."
              className="w-full min-h-[380px] p-4 bg-transparent text-slate-800 font-mono text-base resize-none focus:outline-none focus:border-primary-theme rounded-2xl h-full"
            />
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-sm text-slate-400 font-semibold">Load Sample:</span>
            <button
              onClick={() => setInput(samples.simple)}
              className="text-sm font-semibold text-slate-600 hover:text-primary-theme bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              Simple
            </button>
            <button
              onClick={() => setInput(samples.complex)}
              className="text-sm font-semibold text-slate-600 hover:text-primary-theme bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              Nested Object
            </button>
            <button
              onClick={() => setInput(samples.array)}
              className="text-sm font-semibold text-slate-600 hover:text-primary-theme bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              Array List
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Formatted Output Panel */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("formatted")}
                className={`px-3 py-1.5 text-sm font-bold rounded-lg transition cursor-pointer ${
                  viewMode === "formatted" ? "bg-white text-primary-theme shadow-sm" : "text-slate-600"
                }`}
              >
                Formatted Code
              </button>
              <button
                onClick={() => setViewMode("tree")}
                className={`px-3 py-1.5 text-sm font-bold rounded-lg transition cursor-pointer ${
                  viewMode === "tree" ? "bg-white text-primary-theme shadow-sm" : "text-slate-600"
                }`}
              >
                Tree View
              </button>
              <button
                onClick={() => setViewMode("minified")}
                className={`px-3 py-1.5 text-sm font-bold rounded-lg transition cursor-pointer ${
                  viewMode === "minified" ? "bg-white  text-primary-theme shadow-sm" : "text-slate-600"
                }`}
              >
                Minified
              </button>
            </div>

            {/* Copy / Download Actions */}
            {parsedData.valid && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="text-sm text-slate-700 hover:text-primary-theme flex items-center gap-1 font-semibold transition cursor-pointer bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-xl"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={handleDownload}
                  className="text-sm text-slate-700 hover:text-primary-theme flex items-center gap-1 font-semibold transition cursor-pointer bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 rounded-xl"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            )}
          </div>

          {/* Search bar inside output */}
          {viewMode === "formatted" && (
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search keys or values in JSON..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-sm font-medium focus:outline-none focus:border-primary-theme"
              />
            </div>
          )}

          {/* Output Window */}
          <div className="flex-1 min-h-[380px] p-4 border border-slate-200 rounded-2xl bg-slate-50 overflow-auto font-mono text-base">
            {!input.trim() ? (
              <span className="text-slate-400 italic">Formatted JSON will appear here...</span>
            ) : !parsedData.valid ? (
              <div className="text-red-500 space-y-2">
                <div className="flex items-center gap-2 font-bold text-base">
                  <XCircle className="w-5 h-5 text-red-500" />
                  JSON Syntax Error Detected
                </div>
                <p className="text-sm font-mono bg-red-50 border border-red-200 p-3.5 rounded-xl break-words">
                  {parsedData.error}
                </p>
                {/* <button
                  onClick={handleAutoRepair}
                  className="mt-2 text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Wrench className="w-3.5 h-3.5" /> Try Auto-Repairing Syntax
                </button> */}
              </div>
            ) : viewMode === "tree" ? (
              <JSONTreeView data={parsedData.parsed} name="root" />
            ) : viewMode === "minified" ? (
              <div className="break-all whitespace-pre-wrap text-slate-800">
                {JSON.stringify(parsedData.parsed)}
              </div>
            ) : (
              <pre className="whitespace-pre text-slate-800">
                {searchQuery
                  ? formattedOutput
                      .split("\n")
                      .filter((line) => line.toLowerCase().includes(searchQuery.toLowerCase()))
                      .join("\n") || `// No matching lines for "${searchQuery}"`
                  : formattedOutput}
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Control Buttons & Action Toolbar */}
      <div className="flex flex-wrap gap-3 pt-2">
        {/* <button
          onClick={handleAutoRepair}
          className="flex-1 min-w-[140px] bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-5 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          <Wrench className="w-4 h-4 text-amber-400" />
          Auto Fix & Repair
        </button> */}
        <button
          onClick={handleMinify}
          disabled={!parsedData.valid}
          className="flex-1 min-w-[140px] bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-800 font-semibold py-3 px-5 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer text-base"
        >
          <Minimize2 className="w-5 h-5 text-slate-600" />
          Minify Payload
        </button>
        <button
          onClick={handleBeautify}
          disabled={!parsedData.valid}
          className="flex-1 min-w-[140px] bg-primary-theme hover:bg-primary-theme disabled:opacity-50 text-white font-semibold py-3 px-5 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer text-base"
        >
          <Sparkles className="w-5 h-5" />
          Beautify Code
        </button>
      </div>

      {/* JSON Analytics & Statistics Footer Banner */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Status</span>
          <span className="inline-flex items-center gap-1 font-bold text-base text-slate-800">
            {parsedData.valid ? (
              <span className="text-green-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Valid JSON
              </span>
            ) : (
              <span className="text-red-500 flex items-center gap-1">
                <XCircle className="w-4 h-4" /> Invalid
              </span>
            )}
          </span>
        </div>
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Payload Size</span>
          <span className="font-bold text-base text-slate-800">
            {stats.sizeBytes < 1024 ? `${stats.sizeBytes} B` : `${(stats.sizeBytes / 1024).toFixed(2)} KB`}
          </span>
        </div>
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Total Keys</span>
          <span className="font-bold text-base text-slate-800">{stats.keys}</span>
        </div>
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">Max Depth</span>
          <span className="font-bold text-base text-slate-800">{stats.depth} Levels</span>
        </div>
      </div>
    </div>
  );
}

// Collapsible JSON Tree Node Component
function JSONTreeView({ data, name }: { data: any; name: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const isObject = typeof data === "object" && data !== null;

  if (!isObject) {
    let valColor = "text-emerald-700";
    if (typeof data === "number") valColor = "text-amber-700";
    if (typeof data === "boolean") valColor = "text-purple-700";
    return (
      <div className="ml-4 py-0.5 font-mono text-sm">
        <span className="text-indigo-600 font-semibold">{name}: </span>
        <span className={`${valColor}`}>{JSON.stringify(data)}</span>
      </div>
    );
  }

  const keys = Object.keys(data);

  return (
    <div className="ml-3 py-0.5 font-mono text-sm select-none">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 cursor-pointer hover:bg-slate-200/60 rounded px-1 -ml-1 text-slate-800 font-bold"
      >
        {isOpen ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
        <span className="text-indigo-700">{name}</span>
        <span className="text-xs text-slate-400 font-normal">
          {Array.isArray(data) ? `[${keys.length}]` : `{${keys.length}}`}
        </span>
      </div>

      {isOpen && (
        <div className="border-l-2 border-slate-200 ml-2 pl-1">
          {keys.map((key) => (
            <JSONTreeView key={key} data={data[key]} name={key} />
          ))}
        </div>
      )}
    </div>
  );
}