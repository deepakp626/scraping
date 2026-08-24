"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import Papa, { ParseResult } from "papaparse";
import { CSVLink } from "react-csv";
import {
  FileSpreadsheet,
  Copy,
  Check,
  Upload,
  Download,
  Trash2,
  RefreshCw,
  AlertCircle,
  FileCode,
  Table as TableIcon,
  Code2,
  SlidersHorizontal,
  FileCheck,
} from "lucide-react";

const DEFAULT_CSV = ``;

export default function CSVToJSON() {
  const [input, setInput] = useState<string>(DEFAULT_CSV);
  const [output, setOutput] = useState<string>("");
  const [parsedData, setParsedData] = useState<Record<string, unknown>[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [fileName, setFileName] = useState<string>("data.json");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // View modes
  const [inputViewMode, setInputViewMode] = useState<"raw" | "table">("raw");

  // Parser configurations
  const [hasHeader, setHasHeader] = useState<boolean>(true);
  const [dynamicTyping, setDynamicTyping] = useState<boolean>(true);
  const [delimiter, setDelimiter] = useState<string>(""); // empty = auto-detect
  const [indentOption, setIndentOption] = useState<"2" | "4" | "minified">("2");
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Core Conversion Function using PapaParse
  const performConversion = useCallback(
    (
      csvText: string,
      opts?: {
        header?: boolean;
        dynamic?: boolean;
        delim?: string;
        indent?: "2" | "4" | "minified";
      }
    ) => {
      setError("");

      const textToParse = csvText.trim();
      if (!textToParse) {
        setOutput("");
        setParsedData([]);
        return;
      }

      const useHeader = opts?.header ?? hasHeader;
      const useDynamic = opts?.dynamic ?? dynamicTyping;
      const useDelim = opts?.delim ?? delimiter;
      const useIndent = opts?.indent ?? indentOption;

      try {
        const parsed: ParseResult<Record<string, unknown>> = Papa.parse(
          textToParse,
          {
            header: useHeader,
            dynamicTyping: useDynamic,
            delimiter: useDelim || undefined, // undefined enables auto-detection in PapaParse
            skipEmptyLines: "greedy",
            transformHeader: (header: string) => header.trim(),
          }
        );

        if (parsed.errors && parsed.errors.length > 0) {
          // Check for critical errors (ignore trivial delimiter detection notes)
          const criticalErrors = parsed.errors.filter(
            (e) => e.type !== "Delimiter"
          );
          if (criticalErrors.length > 0) {
            const firstErr = criticalErrors[0];
            setError(
              `CSV Parse Warning on line ${firstErr.row ? firstErr.row + 1 : 1}: ${firstErr.message}`
            );
          }
        }

        const dataArray = (parsed.data as Record<string, unknown>[]).filter(
          (row) => row && Object.keys(row).length > 0
        );

        setParsedData(dataArray);

        let jsonString = "";
        if (useIndent === "minified") {
          jsonString = JSON.stringify(dataArray);
        } else {
          const spaces = parseInt(useIndent, 10) || 2;
          jsonString = JSON.stringify(dataArray, null, spaces);
        }

        setOutput(jsonString);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "Error parsing CSV syntax.";
        setError(msg);
        setOutput("");
        setParsedData([]);
      }
    },
    [hasHeader, dynamicTyping, delimiter, indentOption]
  );

  // Auto-convert whenever input or options change
  useEffect(() => {
    performConversion(input);
  }, [input, hasHeader, dynamicTyping, delimiter, indentOption, performConversion]);

  // Handle file reading
  const processUploadedFile = (file: File) => {
    if (!file) return;

    const baseName = file.name.replace(/\.[^/.]+$/, "");
    setFileName(`${baseName}.json`);
    setUploadedFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content !== undefined) {
        setInput(content);
        setError("");
      }
    };
    reader.readAsText(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
    e.target.value = "";
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processUploadedFile(file);
    }
  };

  // Actions
  const handleDownloadJSON = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "converted-data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
    setParsedData([]);
    setError("");
    setUploadedFileName(null);
    setFileName("data.json");
  };

  // Dynamic headers extracted from parsed data for table preview
  const tableHeaders = useMemo(() => {
    if (!parsedData || parsedData.length === 0) return [];
    return Array.from(
      new Set(
        parsedData.flatMap((item) =>
          typeof item === "object" && item !== null ? Object.keys(item) : []
        )
      )
    );
  }, [parsedData]);

  // Statistics
  const stats = useMemo(() => {
    const rowCount = parsedData.length;
    const colCount = tableHeaders.length;
    const charCount = output.length;
    const kb = (charCount / 1024).toFixed(1);
    return { rowCount, colCount, charCount, kb };
  }, [parsedData, tableHeaders, output]);

  return (
    <div className="max-w-8xl mx-auto p-6 md:p-8 rounded-3xl border border-slate-200 bg-white shadow-sm font-sans text-base">
      {/* Header Banner */}
      <div className="pb-4 mb-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2.5">
            <FileSpreadsheet className="w-7 h-7 text-primary-theme" />
            CSV to JSON Converter
          </h2>
          <p className="text-sm md:text-base text-slate-500 mt-1">
            Upload or paste CSV, TSV, or delimiter-separated data to convert into clean, structured JSON objects.
          </p>
        </div>

        {/* Header Right Action */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className={`text-xs md:text-sm font-medium px-3 py-2 rounded-xl border transition flex items-center gap-1.5 cursor-pointer ${
              showSettings
                ? "border-primary-theme bg-primary-theme/10 text-primary-theme font-semibold"
                : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Options
          </button>
        </div>
      </div>

      {/* Options Panel (Collapsible) */}
      {showSettings && (
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm animate-in fade-in duration-200">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Header Row
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none">
              <input
                type="checkbox"
                checked={hasHeader}
                onChange={(e) => setHasHeader(e.target.checked)}
                className="w-4 h-4 rounded text-primary-theme focus:ring-primary-theme cursor-pointer"
              />
              First row is header
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Type Casting
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none">
              <input
                type="checkbox"
                checked={dynamicTyping}
                onChange={(e) => setDynamicTyping(e.target.checked)}
                className="w-4 h-4 rounded text-primary-theme focus:ring-primary-theme cursor-pointer"
              />
              Auto-cast numbers & booleans
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Delimiter
            </label>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="w-full p-2 border border-slate-200 rounded-xl bg-white text-slate-700 text-xs font-medium focus:outline-none focus:border-primary-theme cursor-pointer"
            >
              <option value="">Auto Detect (Auto)</option>
              <option value=",">Comma (,)</option>
              <option value=";">Semicolon (;)</option>
              <option value="&#9;">Tab (\t)</option>
              <option value="|">Pipe (|)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              JSON Indentation
            </label>
            <select
              value={indentOption}
              onChange={(e) => setIndentOption(e.target.value as "2" | "4" | "minified")}
              className="w-full p-2 border border-slate-200 rounded-xl bg-white text-slate-700 text-xs font-medium focus:outline-none focus:border-primary-theme cursor-pointer"
            >
              <option value="2">2 Spaces</option>
              <option value="4">4 Spaces</option>
              <option value="minified">Minified (1 Line)</option>
            </select>
          </div>
        </div>
      )}

      {/* Error / Alert Banner */}
      {error && (
        <div className="mb-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        accept=".csv,.tsv,.txt,text/csv,text/plain,application/vnd.ms-excel"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Main Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: CSV Input & Viewer */}
        <div className="flex flex-col">
          {/* CSV Pane Action Toolbar */}
          <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <label className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-primary-theme" />
                CSV Input
              </label>

              {/* View Mode Toggle: Text/Code vs Table Preview */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl border border-slate-200 ml-1">
                <button
                  type="button"
                  onClick={() => setInputViewMode("raw")}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer ${
                    inputViewMode === "raw"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  title="Raw CSV text editor"
                >
                  <Code2 className="w-3.5 h-3.5" /> CSV Text
                </button>
                <button
                  type="button"
                  onClick={() => setInputViewMode("table")}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer ${
                    inputViewMode === "table"
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                  title="Spreadsheet Table View"
                >
                  <TableIcon className="w-3.5 h-3.5" /> Table Grid
                </button>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs md:text-sm text-slate-600 hover:text-primary-theme flex items-center gap-1.5 font-semibold transition px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer"
                title="Upload CSV, TSV, or TXT file"
              >
                <Upload className="w-3.5 h-3.5" /> Upload CSV
              </button>

              {input && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs md:text-sm text-rose-500 hover:text-rose-600 flex items-center gap-1 font-semibold transition px-2.5 py-1 rounded-xl hover:bg-rose-50 cursor-pointer"
                  title="Clear CSV input"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              )}
            </div>
          </div>

          {/* Uploaded File Info Tag */}
          {uploadedFileName && (
            <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl font-mono">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Loaded: <strong>{uploadedFileName}</strong></span>
            </div>
          )}

          {/* CSV Input Display / Editor */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border rounded-2xl overflow-hidden transition relative min-h-[380px] max-h-[380px] flex flex-col ${
              isDragging
                ? "border-primary-theme ring-2 ring-primary-theme/30 bg-indigo-50/20"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            {inputViewMode === "raw" ? (
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Upload or paste your CSV content here (e.g. id,name,email...)"
                className="w-full h-[380px] p-4 bg-slate-50 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:bg-white text-slate-800 border-0"
                spellCheck={false}
              />
            ) : (
              /* Spreadsheet Table View Mode */
              <div className="overflow-auto w-full h-[380px] bg-white">
                {parsedData.length > 0 && tableHeaders.length > 0 ? (
                  <table className="w-full text-left text-xs border-collapse font-sans">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 uppercase font-bold sticky top-0 z-10">
                        <th className="p-2.5 border-r border-slate-200 w-12 text-center text-slate-400">#</th>
                        {tableHeaders.map((header) => (
                          <th
                            key={header}
                            className="p-2.5 border-r border-slate-200 last:border-r-0 whitespace-nowrap text-slate-700"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-mono">
                      {parsedData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition">
                          <td className="p-2.5 border-r border-slate-200 text-center text-slate-400 font-sans text-xs">
                            {idx + 1}
                          </td>
                          {tableHeaders.map((header) => {
                            const val = row[header];
                            const formatted =
                              typeof val === "object" && val !== null
                                ? JSON.stringify(val)
                                : String(val ?? "");
                            return (
                              <td
                                key={header}
                                className="p-2.5 border-r border-slate-200 last:border-r-0 text-slate-700 whitespace-nowrap max-w-[220px] truncate"
                                title={formatted}
                              >
                                {formatted}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-6 text-slate-400 italic text-center">
                    <TableIcon className="w-8 h-8 mb-2 opacity-40 text-slate-400" />
                    <span>No tabular CSV data available to preview.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: JSON Output */}
        <div className="flex flex-col">
          {/* JSON Pane Action Toolbar */}
          <div className="flex items-center justify-between mb-2.5 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <label className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-primary-theme" />
                JSON Output
              </label>

              {parsedData.length > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  {stats.rowCount} {stats.rowCount === 1 ? "record" : "records"} &bull; {stats.kb} KB
                </span>
              )}
            </div>

            {/* Action Buttons: Copy, Download JSON, and Export CSV with react-csv */}
            {output && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs md:text-sm text-slate-600 hover:text-primary-theme flex items-center gap-1 font-semibold transition px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer"
                  title="Copy JSON to clipboard"
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
                  onClick={handleDownloadJSON}
                  className="text-xs md:text-sm text-slate-600 hover:text-primary-theme flex items-center gap-1 font-semibold transition px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer"
                  title="Download JSON file"
                >
                  <Download className="w-3.5 h-3.5" /> JSON
                </button>

                {/* Export back to CSV using react-csv package */}
                {parsedData.length > 0 && (
                  <CSVLink
                    data={parsedData}
                    filename={
                      fileName.replace(/\.json$/i, "") + "-export.csv"
                    }
                    className="text-xs md:text-sm text-primary-theme hover:opacity-80 flex items-center gap-1 font-semibold transition px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 cursor-pointer"
                    title="Export formatted CSV via react-csv"
                  >
                    <Download className="w-3.5 h-3.5" /> CSV
                  </CSVLink>
                )}
              </div>
            )}
          </div>

          {/* JSON Display Viewport using CodeMirror */}
          <div className="h-[380px] border border-slate-200 rounded-2xl overflow-hidden bg-[#1e1e1e] relative">
            {output ? (
              <CodeMirror
                value={output}
                height="380px"
                theme={vscodeDark}
                extensions={[json()]}
                editable={false}
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: true,
                  highlightActiveLine: false,
                  dropCursor: false,
                  allowMultipleSelections: false,
                  indentOnInput: false,
                }}
                className="text-sm font-mono [&_.cm-editor]:!font-mono [&_.cm-scroller]:!font-mono [&_.cm-content]:!text-sm h-full"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-sm text-slate-400 italic font-mono gap-2 p-6 text-center">
                <FileCode className="w-8 h-8 opacity-40 text-slate-400" />
                <span>Upload a CSV file or enter CSV data on the left to see JSON output...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Convert Action Button (Full Width) */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => performConversion(input)}
          disabled={!input.trim()}
          className="w-full bg-primary-theme hover:opacity-90 active:opacity-95 disabled:opacity-50 text-white font-semibold py-3.5 px-6 rounded-2xl transition shadow-sm text-base flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-5 h-5" /> Convert CSV to JSON
        </button>
      </div>
    </div>
  );
}