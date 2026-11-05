"use client";

import React, { useState, useRef, useCallback, useMemo, ChangeEvent, DragEvent } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView as CMEditorView } from "@codemirror/view";
import { json } from "@codemirror/lang-json";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import {
  Sparkles,
  Copy,
  Check,
  Upload,
  Download,
  Trash2,
  Minimize2,
  FileCode,
  AlertCircle,
  CheckCircle2,
  FileJson,
  Type,
} from "lucide-react";

// ─── Sample JSON ──────────────────────────────────────────────────────────────

const SAMPLE_JSON = `{"name":"Alex","role":"Full Stack Developer","skills":["TypeScript","React","Node.js","Tailwind CSS"],"details":{"age":28,"city":"San Francisco","isRemote":true},"projectsCount":12}`;

// ─── Syntax Highlighting for Dark Mode ─────────────────────────────────────────

const jsonDarkHighlightStyle = HighlightStyle.define([
  { tag: tags.propertyName, color: "#38bdf8", fontWeight: "600" }, // Bright Sky Blue (Keys)
  { tag: tags.string, color: "#4ade80" },                           // Vibrant Green (Strings)
  { tag: tags.number, color: "#fbbf24" },                           // Amber (Numbers)
  { tag: tags.bool, color: "#c084fc", fontWeight: "600" },         // Bright Purple (Booleans)
  { tag: tags.null, color: "#f87171", fontWeight: "600" },         // Red (Null)
  { tag: tags.punctuation, color: "#94a3b8" },                      // Slate (Brackets, Commas, Colons)
  { tag: tags.bracket, color: "#cbd5e1" },                          // Light Slate (Brackets)
]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getStats(str: string) {
  if (!str) return { chars: 0, lines: 0, size: "0 B" };
  const chars = str.length;
  const lines = str.split("\n").length;
  const bytes = new Blob([str]).size;
  const size = bytes >= 1024 ? `${(bytes / 1024).toFixed(2)} KB` : `${bytes} B`;
  return { chars, lines, size };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function JSONBeautifier() {
  const [input, setInput] = useState<string>(SAMPLE_JSON);
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indentSpaces, setIndentSpaces] = useState<2 | 4>(2);
  const [fontSize, setFontSize] = useState<number>(13);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("beautified.json");
  const [isMinified, setIsMinified] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // ── Input Editor Theme ──────────────────────────────────────────────────────
  const inputTheme = useMemo(
    () =>
      CMEditorView.theme({
        "&": { fontSize: `${fontSize}px`, height: "400px" },
        ".cm-scroller": {
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        },
        ".cm-content": { padding: "8px 0" },
        ".cm-line": { padding: "0 8px" },
        ".cm-gutters": {
          backgroundColor: "#f8fafc",
          borderRight: "1px solid #e2e8f0",
        },
      }),
    [fontSize]
  );

  // ── Output Editor Theme (Dark Background & High Contrast) ───────────────────
  const outputTheme = useMemo(
    () =>
      CMEditorView.theme({
        "&": {
          backgroundColor: "#0f172a !important",
          color: "#f8fafc !important",
          height: "400px",
          fontSize: `${fontSize}px`,
        },
        ".cm-content": { caretColor: "#818cf8", padding: "8px 0" },
        ".cm-line": { padding: "0 8px" },
        ".cm-gutters": {
          backgroundColor: "#0f172a !important",
          color: "#64748b",
          borderRight: "1px solid #1e293b",
        },
        ".cm-activeLine": { backgroundColor: "#1e293b/50" },
        ".cm-activeLineGutter": { backgroundColor: "#1e293b" },
        ".cm-selectionBackground, &.cm-focused .cm-selectionBackground": {
          backgroundColor: "#312e81 !important",
        },
        ".cm-scroller": {
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          backgroundColor: "#0f172a !important",
        },
      }),
    [fontSize]
  );

  // Extensions
  const inputExtensions = useMemo(() => [json(), inputTheme], [inputTheme]);
  const outputExtensions = useMemo(
    () => [
      json(),
      outputTheme,
      syntaxHighlighting(jsonDarkHighlightStyle),
      CMEditorView.editable.of(false),
      CMEditorView.lineWrapping,
    ],
    [outputTheme]
  );

  // ── Core process function ─────────────────────────────────────────────────
  const processJSON = useCallback(
    (source: string, indent: number, minify: boolean) => {
      if (!source.trim()) {
        setOutput("");
        setError(null);
        return;
      }
      try {
        const parsed = JSON.parse(source);
        const result = minify
          ? JSON.stringify(parsed)
          : JSON.stringify(parsed, null, indent);
        setOutput(result);
        setError(null);
        setIsMinified(minify);
      } catch (err: any) {
        setError(err.message ?? "Invalid JSON format.");
        setOutput("");
      }
    },
    []
  );

  // ── Input editor change ───────────────────────────────────────────────────
  const handleInputChange = useCallback(
    (val: string) => {
      setInput(val);
      if (!val.trim()) {
        setError(null);
        return;
      }
      try {
        JSON.parse(val);
        setError(null);
      } catch (err: any) {
        setError(err.message ?? "Invalid JSON");
      }
    },
    []
  );

  const handleBeautify = useCallback(() => {
    processJSON(input, indentSpaces, false);
  }, [input, indentSpaces, processJSON]);

  const handleMinify = useCallback(() => {
    processJSON(input, indentSpaces, true);
  }, [input, indentSpaces, processJSON]);

  const handleIndentChange = useCallback(
    (spaces: 2 | 4) => {
      setIndentSpaces(spaces);
      if (output && !error && !isMinified) {
        processJSON(input, spaces, false);
      }
    },
    [output, error, isMinified, input, processJSON]
  );

  // ── Copy ─────────────────────────────────────────────────────────────────
  const handleCopy = useCallback(() => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output]);

  // ── File upload / drag-drop ───────────────────────────────────────────────
  const handleFileRead = useCallback(
    (file: File) => {
      setFileName(file.name.endsWith(".json") ? file.name : `${file.name}.json`);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInput(text);
        processJSON(text, indentSpaces, false);
      };
      reader.readAsText(file);
    },
    [indentSpaces, processJSON]
  );

  const handleFileUpload = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileRead(file);
      e.target.value = "";
    },
    [handleFileRead]
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFileRead(file);
    },
    [handleFileRead]
  );

  // ── Download ─────────────────────────────────────────────────────────────
  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output, fileName]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
  }, []);

  const handleLoadSample = useCallback(() => {
    setInput(SAMPLE_JSON);
    processJSON(SAMPLE_JSON, indentSpaces, false);
  }, [indentSpaces, processJSON]);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const inputStats = useMemo(() => getStats(input), [input]);
  const outputStats = useMemo(() => getStats(output), [output]);

  const isInputValid = !!input.trim() && !error;

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary-theme" />
            JSON Beautifier &amp; Minifier
          </h2>
          <p className="text-base text-slate-500 mt-1">
            Paste or upload JSON — beautify, minify, copy, or download the result.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Font size */}
          <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600">
            <Type className="w-3.5 h-3.5 text-slate-400" />
            <span>Font:</span>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="bg-transparent font-bold text-primary-theme focus:outline-none cursor-pointer"
            >
              {[11, 12, 13, 14, 16].map((s) => (
                <option key={s} value={s}>
                  {s}px
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleLoadSample}
            className="flex items-center gap-1.5 px-3 py-1.5 text-base font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5  text-primary-theme" /> Load Sample
          </button>

          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 text-base font-semibold rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── INPUT PANEL ── */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-base font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              Raw / Messy JSON
              {isInputValid && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" /> Valid
                </span>
              )}
              {error && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                  <AlertCircle className="w-3 h-3" /> Invalid
                </span>
              )}
            </label>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 text-base font-semibold  text-primary-theme  hover:opacity-80 transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" /> Upload .json
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,.txt"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Editor */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`rounded-2xl overflow-hidden border transition ${
              isDragging
                ? "border-indigo-600 ring-2 ring-indigo-600/30 bg-blue-50/30"
                : error
                ? "border-red-300"
                : "border-slate-200"
            }`}
          >
            <CodeMirror
              value={input}
              height="400px"
              extensions={inputExtensions}
              theme={githubLight}
              onChange={handleInputChange}
              placeholder="Paste raw JSON here or drop a .json file…"
              className="w-full text-left"
              basicSetup={{
                lineNumbers: true,
                foldGutter: false,
                highlightActiveLine: true,
                autocompletion: true,
              }}
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-base text-red-500 font-medium bg-red-50 border border-red-200 rounded-xl px-3 py-2 flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              {error}
            </p>
          )}

          {/* Stats row */}
          <div className="flex items-center justify-between text-base text-slate-400 px-1">
            <span>{inputStats.chars.toLocaleString()} chars</span>
            <span>{inputStats.lines.toLocaleString()} lines</span>
            <span>{inputStats.size}</span>
          </div>
        </div>

        {/* ── OUTPUT PANEL ── */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              {isMinified ? "Minified" : "Beautified"} Output
              {output && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
              )}
            </span>
            

            <div className="flex items-center gap-3">
              {/* Indent toggle — only relevant for beautify */}
              {!isMinified && (
                <div className="flex items-center gap-0.5 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  {([2,4] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleIndentChange(s)}
                      className={`text-[11px] px-2 py-0.5 rounded-md font-semibold transition ${
                        indentSpaces === s
                          ? "bg-primary text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {s} spaces
                    </button>
                  ))}
                </div>
              )}

              {output && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-base font-semibold text-slate-600 hover:text-primary-theme transition cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1 text-base font-semibold text-primary-theme hover:opacity-80 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Dark CodeMirror output box */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0f172a] min-h-[400px] flex flex-col">
            {output ? (
              <CodeMirror
                value={output}
                height="400px"
                extensions={outputExtensions}
                theme={githubDark}
                editable={false}
                className="w-full text-left"
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: false,
                  highlightActiveLine: false,
                  autocompletion: false,
                  closeBrackets: false,
                  history: false,
                  searchKeymap: false,
                }}
              />
            ) : error ? (
              <div className="flex flex-col items-center justify-center flex-1 p-6 text-center text-red-400 bg-[#0f172a]">
                <AlertCircle className="w-8 h-8 mb-2 opacity-70" />
                <p className="text-base font-semibold">{error}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 p-6 text-slate-400 bg-[#0f172a]">
                <FileJson className="w-10 h-10 mb-2 opacity-40 text-indigo-400" />
                <span className="text-base italic">
                  Click{" "}
                  <span className="not-italic font-semibold text-indigo-400">
                    Beautify JSON
                  </span>{" "}
                  or{" "}
                  <span className="not-italic font-semibold text-slate-300">
                    Minify JSON
                  </span>{" "}
                  to see output here
                </span>
              </div>
            )}
          </div>

          {/* Stats row */}
          <div className="flex items-center justify-between text-base text-slate-400 px-1">
            <span>{outputStats.chars.toLocaleString()} chars</span>
            <span>{outputStats.lines.toLocaleString()} lines</span>
            <span>{outputStats.size}</span>
          </div>
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={handleBeautify}
          disabled={!isInputValid}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm cursor-pointer"
        >
          <Sparkles className="w-5 h-5" /> Beautify JSON
        </button>

        <button
          onClick={handleMinify}
          disabled={!isInputValid}
          className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm cursor-pointer"
        >
          <Minimize2 className="w-5 h-5" /> Minify JSON
        </button>
      </div>
    </div>
  );
}