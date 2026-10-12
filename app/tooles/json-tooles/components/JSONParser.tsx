"use client";

import React, { useState, useRef, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import {
  Code,
  Search,
  Upload,
  Download,
  Copy,
  Check,
  Trash2,
  FileCode,
  Layers,
  HardDrive,
  Filter,
  Sparkles,
} from "lucide-react";

interface InspectionNode {
  key: string;
  type: string;
  valueSnippet: string;
  isComplex: boolean;
}

interface ParsedMetrics {
  rootType: string;
  topKeysCount: number;
  totalKeysCount: number;
  depth: number;
  sizeBytes: number;
  structure: InspectionNode[];
}

export default function JSONParser() {
  const [input, setInput] = useState(
    `{\n  "appName": "ScrapeFlow Engine",\n  "version": "4.0.2",\n  "active": true,\n  "threads": 8,\n  "endpoints": ["/api/v1/extract", "/api/v2/parse"],\n  "meta": {\n    "owner": "admin",\n    "region": "us-east-1",\n    "retries": 3\n  }\n}`
  );
  const [parsedInfo, setParsedInfo] = useState<ParsedMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const VALUE_TRUNCATE_LIMIT = 120;

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper: Calculate Max Nesting Depth
  const getDepth = (obj: any): number => {
    if (obj === null || typeof obj !== "object") return 0;
    const values = Array.isArray(obj) ? obj : Object.values(obj);
    if (values.length === 0) return 1;
    const depths = values.map(getDepth);
    return 1 + Math.max(...depths);
  };

  // Helper: Calculate Total Keys Count (Recursive)
  const getTotalKeysCount = (obj: any): number => {
    if (obj === null || typeof obj !== "object") return 0;
    let count = 0;
    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        count += getTotalKeysCount(item);
      });
    } else {
      const keys = Object.keys(obj);
      count += keys.length;
      keys.forEach((key) => {
        count += getTotalKeysCount(obj[key]);
      });
    }
    return count;
  };

  // Helper: Calculate String Size in Bytes
  const getByteSize = (str: string): number => {
    return new Blob([str]).size;
  };

  // Main Parse & Analyze Handler
  const handleParse = () => {
    try {
      setError(null);
      if (!input.trim()) {
        setParsedInfo(null);
        return;
      }

      const data = JSON.parse(input);
      const isObject = typeof data === "object" && data !== null;
      const isArray = Array.isArray(data);

      const topKeys = isArray
        ? data.map((_, i) => `[${i}]`)
        : isObject
        ? Object.keys(data)
        : [];

      const structure: InspectionNode[] = topKeys.map((key, idx) => {
        const val = isArray ? data[idx] : data[key];
        const valType = Array.isArray(val)
          ? "Array"
          : val === null
          ? "null"
          : typeof val;

        let snippet = String(val);
        const isComplex = typeof val === "object" && val !== null;

        if (isComplex) {
          snippet = JSON.stringify(val);
        }

        return {
          key,
          type: valType,
          valueSnippet: snippet,
          isComplex,
        };
      });

      setParsedInfo({
        rootType: isArray ? "Array" : typeof data,
        topKeysCount: topKeys.length,
        totalKeysCount: isObject ? getTotalKeysCount(data) : 1,
        depth: getDepth(data),
        sizeBytes: getByteSize(input),
        structure,
      });
    } catch (err: any) {
      setError(err.message || "Failed to parse JSON string.");
      setParsedInfo(null);
    }
  };

  // Copy to Clipboard
  const handleCopy = () => {
    if (!input.trim()) return;
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clear Input & Results
  const handleClear = () => {
    setInput("");
    setParsedInfo(null);
    setError(null);
  };

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        setInput(content);
        setError(null);
      } catch (err: any) {
        setError("Failed to read file.");
      }
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // File Download Handler
  const handleDownload = () => {
    if (!input.trim()) return;
    try {
      const blob = new Blob([input], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "parsed-payload.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError("Failed to download file.");
    }
  };

  // Filtered Inspection List
  const filteredStructure = useMemo(() => {
    if (!parsedInfo) return [];
    if (!searchQuery.trim()) return parsedInfo.structure;
    const query = searchQuery.toLowerCase();
    return parsedInfo.structure.filter(
      (item) =>
        item.key.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.valueSnippet.toLowerCase().includes(query)
    );
  }, [parsedInfo, searchQuery]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-9xl mx-auto">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json,application/json"
        className="hidden"
      />

      {/* Header & Quick Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
            <Code className="w-6 h-6 text-primary-theme" />
            JSON Parser & Analyzer
          </h2>
          <p className="text-sm md:text-base text-slate-500">
            Parse raw JSON text into key-value inspection nodes and deep structural metrics.
          </p>
        </div>

        {/* Toolbar Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs md:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            title="Upload JSON File"
          >
            <Upload className="w-3.5 h-3.5" /> Upload
          </button>

          <button
            onClick={handleDownload}
            disabled={!input.trim()}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 text-xs  md:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            title="Download JSON Payload"
          >
            <Download className="w-3.5 h-3.5" /> Download
          </button>

          <button
            onClick={handleCopy}
            disabled={!input.trim()}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 text-xs md:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>

          <button
            onClick={handleClear}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs md:text-sm  font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {/* CodeMirror Input Container */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-primary-theme focus-within:ring-1 focus-within:ring-primary-theme transition-all">
          <CodeMirror
            value={input}
            height="260px"
            extensions={[json()]}
            placeholder="Paste or upload raw JSON here..."
            onChange={(value) => {
              setInput(value);
              setError(null);
            }}
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: true,
            }}
            style={{ fontSize: "14px" }}
            className="font-mono text-slate-800"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleParse}
          disabled={!input.trim()}
          className="w-full bg-primary-theme hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Search className="w-5 h-5" /> Analyze & Inspect Structure
        </button>

        {/* Error Feedback */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm md:text-base font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            Parsing Error: {error}
          </div>
        )}

        {/* Parsed Metrics & Inspection Table */}
        {parsedInfo && (
          <div className="space-y-5 pt-2">
            {/* Structural Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col justify-center items-center">
                <FileCode className="w-4 h-4 text-slate-400 mb-1" />
                <span className="text-xs md:text-sm text-slate-500">Root Type</span>
                <span className="text-base font-bold text-slate-800 capitalize">
                  {parsedInfo.rootType}
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col justify-center items-center">
                <Layers className="w-4 h-4 text-slate-400 mb-1" />
                <span className="text-xs md:text-sm text-slate-500">Top / Total Keys</span>
                <span className="text-base font-bold text-slate-800">
                  {parsedInfo.topKeysCount}{" "}
                  <span className="text-xs  md:text-sm font-normal text-slate-400">
                    ({parsedInfo.totalKeysCount} total)
                  </span>
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col justify-center items-center">
                <Sparkles className="w-4 h-4 text-slate-400 mb-1" />
                <span className="text-xs md:text-sm text-slate-500">Max Depth</span>
                <span className="text-base font-bold text-slate-800">
                  {parsedInfo.depth} Levels
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col justify-center items-center">
                <HardDrive className="w-4 h-4 text-slate-400 mb-1" />
                <span className="text-xs md:text-sm text-slate-500">Payload Size</span>
                <span className="text-base font-bold text-slate-800">
                  {(parsedInfo.sizeBytes / 1024).toFixed(2)} KB
                </span>
              </div>
            </div>

            {/* Key Inspection Table with Search */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-3">
                <span className="text-sm md:text-base font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  Top-Level Key Inspection ({filteredStructure.length})
                </span>

                {/* Filter Input */}
                <div className="relative max-w-xs w-full">
                  <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter keys or values..."
                    className="w-full pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-xl text-xs md:text-sm
                     font-sans text-slate-700 focus:outline-none focus:border-primary-theme"
                  />
                </div>
              </div>

              <div className="max-h-72 overflow-y-auto">
                <table className="w-full text-left text-base font-mono">
                  <thead className="bg-slate-100 text-slate-600 uppercase text-[11px] sticky top-0 text-sm md:text-base">
                    <tr>
                      <th className="p-3">Key</th>
                      <th className="p-3">Data Type</th>
                      <th className="p-3">Value / Preview</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {filteredStructure.length > 0 ? (
                      filteredStructure.map((item, index) => {
                        const isExpanded = expandedRows.has(index);
                        const isLong = item.valueSnippet.length > VALUE_TRUNCATE_LIMIT;
                        const displayValue =
                          isLong && !isExpanded
                            ? item.valueSnippet.slice(0, VALUE_TRUNCATE_LIMIT)
                            : item.valueSnippet;

                        return (
                          <tr key={index} className="hover:bg-slate-50/80 transition align-top">
                            <td className="p-3 font-semibold text-purple-700 truncate max-w-[160px]">
                              {item.key}
                            </td>
                            <td className="p-3">
                              <span
                                className={`px-2 py-0.5 rounded text-xs md:text-sm font-sans font-medium ${
                                  item.type === "Array" || item.type === "object"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : item.type === "boolean"
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : item.type === "number"
                                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                                    : "bg-slate-100 text-slate-600 border border-slate-200"
                                }`}
                              >
                                {item.type}
                              </span>
                            </td>
                            <td className="p-3 text-slate-700 max-w-sm break-words">
                              {item.isComplex ? (
                                <span className="text-slate-400 font-sans italic text-xs md:text-sm">
                                  {displayValue}
                                  {isLong && !isExpanded && "..."}
                                </span>
                              ) : (
                                <span className="text-xs md:text-sm">
                                  {displayValue}
                                  {isLong && !isExpanded && "..."}
                                </span>
                              )}
                              {isLong && (
                                <button
                                  onClick={() => toggleRow(index)}
                                  className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary-theme/10 hover:bg-primary-theme/20 text-primary-theme text-sm font-semibold font-sans transition cursor-pointer whitespace-nowrap"
                                >
                                  {isExpanded ? "▲ Show Less" : "▼ Show Full"}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="p-6 text-center text-xs text-slate-400 font-sans"
                        >
                          No matching keys found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}