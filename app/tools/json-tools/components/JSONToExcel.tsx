"use client";

import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import * as XLSX from "xlsx";
import {
  FileSpreadsheet,
  FileJson,
  ArrowRight,
  Download,
  Copy,
  Check,
  Upload,
  Trash2,
  Table as TableIcon,
} from "lucide-react";

export default function JSONToExcel() {
  const [input, setInput] = useState(``);
  const [tableData, setTableData] = useState<Record<string, any>[] | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Parse JSON and prepare table representation
  const handleConvert = () => {
    try {
      setError(null);
      if (!input.trim()) {
        setTableData(null);
        return;
      }

      const parsed = JSON.parse(input);
      const dataArray = Array.isArray(parsed) ? parsed : [parsed];

      if (dataArray.length === 0 || typeof dataArray[0] !== "object") {
        throw new Error("JSON must be an object or an array of objects.");
      }

      setTableData(dataArray);
    } catch (err: any) {
      setError(err?.message || "Invalid JSON structure.");
      setTableData(null);
    }
  };

  // Upload JSON File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setInput(content || "");
      setError(null);
    };
    reader.readAsText(file);

    e.target.value = "";
  };

  // Clear Input and Output
  const handleClear = () => {
    setInput("");
    setTableData(null);
    setError(null);
  };

  // Download real XLSX file using SheetJS
  const handleDownloadXLSX = () => {
    if (!tableData || tableData.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, "exported_data.xlsx");
  };

  // Copy Tab-Separated Data (Excel Paste Compatible)
  const handleCopy = () => {
    if (!tableData || tableData.length === 0) return;

    const headers = Array.from(
      new Set(tableData.flatMap((row) => Object.keys(row)))
    );

    const tsvRows = [
      headers.join("\t"),
      ...tableData.map((row) =>
        headers.map((h) => String(row[h] ?? "")).join("\t")
      ),
    ];

    navigator.clipboard.writeText(tsvRows.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Extract table column headers dynamically
  const headers = tableData
    ? Array.from(new Set(tableData.flatMap((row) => Object.keys(row))))
    : [];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm max-w-8xl mx-auto my-8">
      {/* Header Section with Custom JSON-to-Excel Visual Icon */}
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center gap-1.5 bg-slate-100 p-2.5 rounded-2xl text-primary-theme">
          <FileJson className="w-6 h-6 md:w-8 md:h-8" />
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
          <FileSpreadsheet className="w-6 h-6 md:w-8 md:h-8" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            JSON to Excel Converter
          </h2>
          <p className="text-sm md:text-base text-slate-500">
            Convert JSON records to native Excel spreadsheets (.xlsx) with interactive sheet preview.
          </p>
        </div>
      </div>

      <div className="my-6 border-b border-slate-100" />

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left Side: CodeMirror Editor */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileJson className="w-5 h-5 text-primary-theme" />
              JSON Input
            </span>
            <div className="flex items-center gap-3">
              {/* File Upload Button */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json,.txt,application/json"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                // className="text-xs md:text-sm text-slate-600 hover:text-primary-theme flex items-center gap-1 font-semibold cursor-pointer transition-colors"
                   className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-primary-theme"
                title="Upload JSON File"
              >
                <Upload className="w-4 h-4" />
                Upload
              </button>

              {/* Clear Button */}
              {input && (
                <button
                  type="button"
                  onClick={handleClear}
                                     className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white  hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer text-red-500"

                  title="Clear All"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
            <CodeMirror
              value={input}
              height="320px"
              placeholder={"Past or upload json here ..."}
              extensions={[json()]}
              onChange={(value) => setInput(value)}
              className="text-sm md:text-base font-mono"
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                highlightActiveLine: true,
              }}
            />
          </div>
        </div>

        {/* Right Side: Excel Sheet View */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <TableIcon className="w-4 h-4 text-primary-theme" />
              Excel Grid Preview
            </span>
            {tableData && (
              <div className="flex items-center gap-3">
                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                   className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer"

>
                  {copied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied" : "Copy Data"}
                </button>

                {/* Download Button */}
                <button
                  type="button"
                  onClick={handleDownloadXLSX}
                                     className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-primary-theme"

                  >
                  <Download className="w-4 h-4" />
                  Download .XLSX
                </button>
              </div>
            )}
          </div>

          {/* Interactive Excel Grid Box */}
          <div className="border border-slate-200 rounded-2xl bg-slate-50 h-[320px] overflow-auto">
            {error ? (
              <div className="p-4 text-red-500 text-sm md:text-base font-semibold">
                {error}
              </div>
            ) : tableData ? (
              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse text-xs md:text-sm font-sans text-slate-700">
                  <thead>
                    <tr className="bg-slate-200/80 text-slate-700 font-semibold border-b border-slate-300">
                      <th className="p-2.5 border-r border-slate-300 w-10 text-center text-slate-400 bg-slate-300/50">
                        #
                      </th>
                      {headers.map((head, idx) => (
                        <th
                          key={idx}
                          className="p-2.5 text-left border-r border-slate-300 min-w-[120px] font-bold"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b border-slate-200 hover:bg-slate-100/80 transition-colors"
                      >
                        <td className="p-2.5 text-center border-r border-slate-200 text-slate-400 font-mono bg-slate-100/60">
                          {rowIndex + 1}
                        </td>
                        {headers.map((head, colIndex) => (
                          <td
                            key={colIndex}
                            className="p-2.5 border-r border-slate-200 whitespace-nowrap"
                          >
                            {row[head] !== undefined && row[head] !== null
                              ? String(row[head])
                              : ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 text-slate-400 italic text-sm md:text-base flex items-center justify-center h-full">
                Click &quot;Convert to Excel&quot; to preview grid...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Convert Action Button */}
      <button
        type="button"
        onClick={handleConvert}
        disabled={!input.trim()}
        className="mt-6 md:mt-8 w-full bg-primary-theme hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3.5 px-6 rounded-2xl transition shadow-sm flex items-center justify-center gap-2.5 cursor-pointer disabled:cursor-not-allowed text-base md:text-lg"
      >
        <FileSpreadsheet className="w-5 h-5 md:w-6 md:h-6" />
        Convert to Excel
      </button>
    </div>
  );
}