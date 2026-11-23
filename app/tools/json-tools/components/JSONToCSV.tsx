"use client";

import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { json2csv } from "json-2-csv";
import { CSVLink } from "react-csv";
import { 
  Table as TableIcon, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  Trash2, 
  FileText, 
  FileSpreadsheet,
  Code2
} from "lucide-react";

export default function JSONToCSV() {
  const [input, setInput] = useState<string>(
    `[\n  { "id": 1, "name": "John Doe", "role": "Developer", "city": "New York" },\n  { "id": 2, "name": "Jane Smith", "role": "Designer", "city": "London" },\n  { "id": 3, "name": "Bob Johnson", "role": "Manager", "city": "Tokyo" }\n]`
  );
  const [csvOutput, setCsvOutput] = useState<string>("");
  const [parsedData, setParsedData] = useState<Record<string, any>[] | null>(null);
  const [activeTab, setActiveTab] = useState<"table" | "raw">("table");
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("data.csv");
  const [normalizeInfo, setNormalizeInfo] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Smart normalizer: converts any valid JSON value into an
   * array of plain objects suitable for CSV conversion.
   *
   * Rules:
   *  - Array of objects  → use as-is
   *  - Single object     → wrap in [ obj ]
   *  - Array of primitives → map to [{ value: x }, ...]
   *  - null / other      → throw a clear error
   */
  const normalizeToArray = (parsed: any): { data: Record<string, any>[]; info: string | null } => {
    if (parsed === null || parsed === undefined) {
      throw new Error("JSON value is null or undefined — nothing to convert.");
    }

    // Already an array
    if (Array.isArray(parsed)) {
      if (parsed.length === 0) {
        throw new Error("JSON array is empty — no data to convert.");
      }
      // Array of objects (ideal case)
      if (typeof parsed[0] === "object" && parsed[0] !== null && !Array.isArray(parsed[0])) {
        return { data: parsed as Record<string, any>[], info: null };
      }
      // Array of primitives → wrap each as { value }
      const wrapped = parsed.map((item, i) => ({
        index: i,
        value: typeof item === "object" ? JSON.stringify(item) : item,
      }));
      return {
        data: wrapped,
        info: `ℹ️ Array of primitives detected — auto-converted to rows with "index" and "value" columns.`,
      };
    }

    // Single plain object → wrap in array
    if (typeof parsed === "object" && !Array.isArray(parsed)) {
      return {
        data: [parsed as Record<string, any>],
        info: `ℹ️ Single JSON object detected — auto-wrapped in [ ] to form a 1-row table.`,
      };
    }

    // Primitive value (string, number, boolean)
    throw new Error(
      `Cannot convert a bare ${typeof parsed} to CSV. Provide a JSON object or array of objects.`
    );
  };

  // Conversion handler using json-2-csv
  const convertToCSV = () => {
    try {
      setError(null);
      setNormalizeInfo(null);
      if (!input.trim()) return;

      const parsed = JSON.parse(input);

      // Smart normalization — never hard-fails on non-array input
      const { data, info } = normalizeToArray(parsed);
      if (info) setNormalizeInfo(info);

      // Convert using json-2-csv for precise formatting
      const csv = json2csv(data, {
        emptyFieldValue: "",
        expandNestedObjects: true,
      });

      setParsedData(data);
      setCsvOutput(csv);
    } catch (err: any) {
      setError(err.message || "Failed to convert JSON to CSV.");
      setCsvOutput("");
      setParsedData(null);
      setNormalizeInfo(null);
    }
  };

  // Upload JSON File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const baseName = file.name.replace(/\.[^/.]+$/, "");
    setFileName(`${baseName}.csv`);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setInput(content);
        setError(null);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Copy CSV raw string
  const handleCopy = () => {
    if (!csvOutput) return;
    navigator.clipboard.writeText(csvOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clear inputs and state
  const handleClear = () => {
    setInput("");
    setCsvOutput("");
    setParsedData(null);
    setError(null);
    setNormalizeInfo(null);
  };

  // Extract table headers dynamically from parsed JSON
  const getTableHeaders = () => {
    if (!parsedData || parsedData.length === 0) return [];
    return Array.from(
      new Set(parsedData.flatMap((item) => Object.keys(item)))
    );
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm max-w-8xl mx-auto transition-all">
      {/* Header */}
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2.5 mb-2">
        <TableIcon className="w-7 h-7 text-primary-theme" />
        JSON to CSV Converter
      </h2>
      <p className="text-base text-slate-500 mb-6">
        Convert arrays of JSON objects into formatted CSV spreadsheets or raw tabular data.
      </p>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: CodeMirror Editor Input */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2.5">
            <label className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-slate-400" /> JSON Input
            </label>
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
                className="text-xs md:text-sm  text-slate-600 hover:text-primary-theme flex items-center gap-1 font-semibold transition px-2.5 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                title="Upload JSON File"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload
              </button>
              {input && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs md:text-sm  text-rose-500 hover:text-rose-600 flex items-center gap-1 font-semibold transition px-2.5 py-1 rounded-lg hover:bg-rose-50 cursor-pointer"
                  title="Clear Input"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 focus-within:border-primary-theme focus-within:ring-1 focus-within:ring-primary-theme transition">
            <CodeMirror
              value={input}
              height="300px"
              extensions={[json()]}
              onChange={(value) => setInput(value)}
              className="text-sm font-mono"
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                dropCursor: true,
                allowMultipleSelections: false,
                indentOnInput: true,
              }}
            />
          </div>
        </div>

        {/* Right Column: Tabular View & CSV Output */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2.5">
            {/* View Mode Toggle Buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveTab("table")}
                className={`text-xs md:text-sm  font-semibold px-2.5 py-1 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "table"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" /> Table View
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("raw")}
                className={`text-xs md:text-sm  font-semibold px-2.5 py-1 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "raw"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" /> Raw CSV
              </button>
            </div>

            {/* Action Buttons (Copy & Download via react-csv) */}
            {csvOutput && parsedData && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs md:text-sm  text-slate-600 hover:text-primary-theme flex items-center gap-1 font-semibold transition px-2 py-1 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>

                {/* Download component using react-csv */}
                <CSVLink
                  data={parsedData}
                  filename={fileName.endsWith(".csv") ? fileName : `${fileName}.csv`}
                  className="text-xs md:text-sm  text-primary-theme hover:opacity-80 flex items-center gap-1 font-semibold transition px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </CSVLink>
              </div>
            )}
          </div>

          {/* Output Display Viewport */}
          <div className="border border-slate-200 rounded-2xl bg-slate-50 text-slate-800 min-h-[300px] max-h-[300px] overflow-auto">
            {normalizeInfo && (
              <div className="px-4 pt-3 pb-0">
                <div className="rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-3 py-2">
                  {normalizeInfo}
                </div>
              </div>
            )}
            {error ? (
              <div className="p-4 m-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm md:text-base font-semibold">
                ⚠️ {error}
              </div>
            ) : parsedData && csvOutput ? (
              activeTab === "table" ? (
                /* Spreadsheet Table View */
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-200/70 border-b border-slate-300 text-slate-700 uppercase font-bold sticky top-0">
                        {getTableHeaders().map((header) => (
                          <th key={header} className="p-2.5 border-r border-slate-300 last:border-r-0">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white font-mono">
                      {parsedData.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition">
                          {getTableHeaders().map((header) => {
                            const val = row[header];
                            const formatted = typeof val === "object" ? JSON.stringify(val) : String(val ?? "");
                            return (
                              <td key={header} className="p-2.5 border-r border-slate-200 last:border-r-0 text-slate-700 whitespace-nowrap max-w-[200px] truncate">
                                {formatted}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Raw CSV Code View */
                <pre className="p-4 font-mono text-sm  md:text-base whitespace-pre leading-relaxed break-all">
                  {csvOutput}
                </pre>
              )
            ) : (
              <div className="p-6 text-slate-400 italic text-sm  md:text-base text-center flex flex-col items-center justify-center h-[280px]">
                <TableIcon className="w-8 h-8 mb-2 opacity-40 text-slate-400" />
                Click "Convert to CSV" below to generate table view and CSV download...
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Action Button */}
      <div className="mt-6">
        <button
          onClick={convertToCSV}
          disabled={!input.trim()}
          className="w-full bg-primary-theme hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3.5 px-6 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer text-base"
        >
          <TableIcon className="w-5 h-5" /> Convert to CSV
        </button>
      </div>
    </div>
  );
}