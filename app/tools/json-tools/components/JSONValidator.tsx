"use client";

import React, { useState, useRef, useMemo } from "react";
import {
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  Upload,
  Download,
  Wand2,
  Trash2,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface JsonErrorDetails {
  message: string;
  errorLine: number | null;
  errorCol: number | null;
}

interface ValidationStats {
  keys: number;
  size: string;
  type: string;
}

interface ValidationResult {
  valid: boolean;
  message: string;
  stats?: ValidationStats;
  errorLine: number | null;
  errorCol: number | null;
}

// ─── Helper: Parse JSON error for line/column info ────────────────────────────

/**
 * Parses JSON error messages to extract exact line and column numbers.
 */
const getJsonErrorDetails = (err: Error, text: string): JsonErrorDetails => {
  const message = err.message || "Invalid JSON syntax.";
  let errorLine: number | null = null;
  let errorCol: number | null = null;

  // Try matching position indicator (V8 Engine: "at position X" or "position X")
  const posMatch =
    message.match(/at position (\d+)/i) || message.match(/position (\d+)/i);

  if (posMatch && posMatch[1]) {
    const pos = parseInt(posMatch[1], 10);
    const textUpToError = text.slice(0, pos);
    const lines = textUpToError.split("\n");
    errorLine = lines.length;
    errorCol = lines[lines.length - 1].length + 1;
  } else {
    // Try matching line and column format (Firefox / WebKit)
    const lineColMatch = message.match(/line (\d+) column (\d+)/i);
    if (lineColMatch) {
      errorLine = parseInt(lineColMatch[1], 10);
      errorCol = parseInt(lineColMatch[2], 10);
    }
  }

  return { message, errorLine, errorCol };
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function JSONValidator() {
  const [input, setInput] = useState<string>(``);

  const [result, setResult] = useState<ValidationResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeLine, setActiveLine] = useState<number>(1);

  // Synchronized scroll refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleValidate = () => {
    if (!input.trim()) {
      setResult(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const isArray = Array.isArray(parsed);
      const keysCount =
        typeof parsed === "object" && parsed !== null
          ? Object.keys(parsed).length
          : 1;
      const byteSize = new Blob([input]).size;
      const sizeStr =
        byteSize > 1024
          ? `${(byteSize / 1024).toFixed(2)} KB`
          : `${byteSize} Bytes`;

      setResult({
        valid: true,
        message: "Valid JSON syntax! No structural errors found.",
        stats: {
          keys: keysCount,
          size: sizeStr,
          type: isArray
            ? "Array"
            : typeof parsed === "object"
            ? "Object"
            : typeof parsed,
        },
        errorLine: null,
        errorCol: null,
      });
    } catch (err) {
      const { message, errorLine, errorCol } = getJsonErrorDetails(
        err as Error,
        input
      );
      setResult({ valid: false, message, errorLine, errorCol });
    }
  };

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleCursorPosition = () => {
    if (!textareaRef.current) return;
    const cursorOffset = textareaRef.current.selectionStart;
    const textBeforeCursor = input.substring(0, cursorOffset);
    const lineIndex = textBeforeCursor.split("\n").length;
    setActiveLine(lineIndex);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = textareaRef.current!;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const spaces = "  "; // 2 spaces
      const newInput =
        input.substring(0, start) + spaces + input.substring(end);
      setInput(newInput);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = start + spaces.length;
        }
      }, 0);
    }
  };

  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setResult(null);
    } catch {
      // Keep input as-is if parsing fails
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        setInput(content);
        setResult(null);
      }
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    const blob = new Blob([input], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Derived state ──────────────────────────────────────────────────────────

  const lines = useMemo(() => input.split("\n"), [input]);
  const byteCount = useMemo(() => new Blob([input]).size, [input]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto my-6 font-sans">
      {/* Header */}
      <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2 mb-1">
        <CheckCircle2 className="w-6 h-6 text-primary-theme" />
        JSON Validator
      </h2>
      <p className="text-base text-slate-500 mb-6">
        Validate JSON syntax, detect structural errors with line numbers, and
        inspect payload metrics.
      </p>

      <div className="space-y-4">
        {/* Label & Actions Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-wider block">
            JSON Input
          </label>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrettify}
              className="px-2.5 py-1 text-sm font-semibold text-primary-theme hover:bg-indigo-50 rounded-lg transition flex items-center gap-1 cursor-pointer"
              title="Prettify JSON"
            >
              <Wand2 className="w-3.5 h-3.5" /> Prettify
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json,text/plain"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition flex items-center gap-1 cursor-pointer"
              title="Upload JSON File"
            >
              <Upload className="w-3.5 h-3.5" /> Upload File
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="px-2.5 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition flex items-center gap-1 cursor-pointer"
              title="Export JSON File"
            >
              <Download className="w-3.5 h-3.5" /> Export
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="px-2.5 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition flex items-center gap-1 cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>

            <button
              type="button"
              onClick={() => {
                setInput("");
                setResult(null);
              }}
              className="px-2.5 py-1 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition flex items-center gap-1 cursor-pointer"
              title="Clear text"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        </div>

        {/* Editor Container with Line Numbers */}
        <div className="relative border border-slate-200 rounded-2xl bg-slate-50 flex overflow-hidden focus-within:border-primary-theme transition shadow-inner">
          {/* Line Numbers Sidebar */}
          <div
            ref={lineNumbersRef}
            className="select-none overflow-hidden py-4 text-right pr-3.5 pl-3 border-r border-slate-200 bg-slate-100/80 text-slate-400 font-mono text-sm shrink-0"
            style={{ minWidth: "3.2rem" }}
          >
            {lines.map((_, index) => {
              const lineNumber = index + 1;
              const isErrorLine = result?.errorLine === lineNumber;
              const isActive = activeLine === lineNumber;

              return (
                <div
                  key={index}
                  className={`h-6 leading-6 transition-colors font-mono ${
                    isErrorLine
                      ? "text-red-600 font-bold bg-red-100 -mx-3.5 px-3.5 rounded-sm"
                      : isActive
                      ? "text-primary-theme font-semibold"
                      : ""
                  }`}
                >
                  {lineNumber}
                </div>
              );
            })}
          </div>

          {/* Textarea Input */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setResult(null);
            }}
            onScroll={handleScroll}
            onClick={handleCursorPosition}
            onKeyUp={handleCursorPosition}
            onKeyDown={handleKeyDown}
            placeholder="Paste JSON string to validate..."
            spellCheck={false}
            className="w-full  p-4 bg-transparent text-slate-800 font-mono text-base leading-6 resize-none outline-none overflow-y-auto whitespace-pre"
            style={{ lineHeight: "1.5rem" }}
          />
        </div>

        {/* Line / Character Status Indicator */}
        <div className="flex justify-between items-center text-sm text-slate-400 px-1">
          <span>
            Line {activeLine}, Column 1
          </span>
          <span>
            {lines.length} Lines &bull; {byteCount} Bytes
          </span>
        </div>

        {/* Validate Button */}
        <button
          onClick={handleValidate}
          disabled={!input.trim()}
          className="w-full bg-primary-theme hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer text-base"
        >
          <CheckCircle2 className="w-5 h-5" /> Validate JSON Syntax
        </button>

        {/* Validation Result Box */}
        {result && (
          <div
            className={`p-5 rounded-2xl border transition-all ${
              result.valid
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-red-50 border-red-200 text-red-900"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 font-semibold text-lg">
                {result.valid ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 shrink-0" />
                )}
                <span>
                  {result.valid ? "Valid JSON" : "Invalid JSON Syntax"}
                </span>
              </div>

              {!result.valid && result.errorLine && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 font-mono font-medium">
                  Error at Line {result.errorLine}
                  {result.errorCol ? ` : Col ${result.errorCol}` : ""}
                </span>
              )}
            </div>

            <p className="mt-2 text-sm text-slate-700 font-mono break-all">
              {result.message}
            </p>

            {/* Statistics Row (Valid JSON only) */}
            {result.valid && result.stats && (
              <div className="mt-4 pt-4 border-t border-emerald-200/60 grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                  <span className="text-xs text-slate-500 block">
                    Root Type
                  </span>
                  <span className="font-bold text-slate-800">
                    {result.stats.type}
                  </span>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                  <span className="text-xs text-slate-500 block">
                    Top Keys / Items
                  </span>
                  <span className="font-bold text-slate-800">
                    {result.stats.keys}
                  </span>
                </div>
                <div className="bg-white/80 p-3 rounded-xl border border-emerald-100">
                  <span className="text-xs text-slate-500 block">
                    Payload Size
                  </span>
                  <span className="font-bold text-slate-800">
                    {result.stats.size}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}