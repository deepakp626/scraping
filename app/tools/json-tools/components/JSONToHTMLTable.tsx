"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { html } from "@codemirror/lang-html";
import {
  LayoutGrid,
  Copy,
  Check,
  Upload,
  Download,
  Trash2,
  Code2,
  Eye,
  AlertCircle,
  Sparkles,
  FileCode2,
  Table as TableIcon,
  Settings2,
} from "lucide-react";

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default function JSONToHTMLTable() {
  const [input, setInput] = useState<string>(
    ``
  );
  const [htmlOutput, setHtmlOutput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Table options
  const [styleType, setStyleType] = useState<"modern" | "striped" | "tailwind" | "bootstrap" | "plain">("modern");
  const [fullDocument, setFullDocument] = useState<boolean>(false);
  const [tableClass, setTableClass] = useState<string>("data-table");
  const [tableId, setTableId] = useState<string>("");

  // Stats
  const [rowCount, setRowCount] = useState<number>(0);
  const [colCount, setColCount] = useState<number>(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Converts any JSON data structure to normalized table matrix (headers + rows)
   */
  const parseJsonToMatrix = (
    parsed: any
  ): { headers: string[]; rows: string[][] } => {
    if (parsed === null || parsed === undefined) {
      throw new Error("JSON is empty or null.");
    }

    // Array of objects
    if (Array.isArray(parsed)) {
      if (parsed.length === 0) {
        throw new Error("JSON array is empty.");
      }

      // Check if array of arrays (e.g. 2D grid)
      if (Array.isArray(parsed[0])) {
        const headers = parsed[0].map((h: any, i: number) =>
          h !== undefined && h !== null ? String(h) : `Col ${i + 1}`
        );
        const rows = parsed.slice(1).map((row: any[]) =>
          headers.map((_: any, i: number) => {
            const cell = row[i];
            if (cell === null || cell === undefined) return "";
            return typeof cell === "object" ? JSON.stringify(cell) : String(cell);
          })
        );
        return { headers, rows };
      }

      // Check if array of objects
      if (typeof parsed[0] === "object" && parsed[0] !== null) {
        const headerSet = new Set<string>();
        parsed.forEach((item) => {
          if (typeof item === "object" && item !== null) {
            Object.keys(item).forEach((k) => headerSet.add(k));
          }
        });
        const headers = Array.from(headerSet);
        const rows = parsed.map((item) => {
          if (typeof item !== "object" || item === null) {
            return [String(item)];
          }
          return headers.map((k) => {
            const val = item[k];
            if (val === null || val === undefined) return "";
            return typeof val === "object" ? JSON.stringify(val) : String(val);
          });
        });
        return { headers, rows };
      }

      // Array of primitives
      const headers = ["Index", "Value"];
      const rows = parsed.map((val, idx) => [
        String(idx + 1),
        val !== null && typeof val === "object" ? JSON.stringify(val) : String(val),
      ]);
      return { headers, rows };
    }

    // Single object: create Key / Value table
    if (typeof parsed === "object") {
      const headers = ["Key", "Value"];
      const rows = Object.entries(parsed).map(([k, v]) => [
        k,
        v !== null && typeof v === "object" ? JSON.stringify(v) : String(v),
      ]);
      return { headers, rows };
    }

    // Primitive bare value
    return {
      headers: ["Value"],
      rows: [[String(parsed)]],
    };
  };

  /**
   * Generates HTML Table string from headers & rows according to chosen style
   */
  const generateHTMLTableString = useCallback(
    (headers: string[], rows: string[][]): string => {
      let cssStyles = "";
      let classAttr = "";
      let idAttr = tableId.trim() ? ` id="${escapeHtml(tableId.trim())}"` : "";

      if (styleType === "tailwind") {
        classAttr = ' class="min-w-full divide-y divide-gray-200 text-sm text-left"';
      } else if (styleType === "bootstrap") {
        classAttr = ' class="table table-striped table-bordered table-hover"';
      } else if (styleType === "striped") {
        classAttr = tableClass.trim() ? ` class="${escapeHtml(tableClass.trim())}"` : ' class="data-table"';
        cssStyles = `<style>
  table.data-table {
    width: 100%;
    border-collapse: collapse;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 14px;
    color: #334155;
  }
  table.data-table th {
    background-color: #f1f5f9;
    color: #1e293b;
    font-weight: 600;
    text-align: left;
    padding: 10px 14px;
    border: 1px solid #e2e8f0;
  }
  table.data-table td {
    padding: 8px 14px;
    border: 1px solid #e2e8f0;
  }
  table.data-table tbody tr:nth-child(even) {
    background-color: #f8fafc;
  }
  table.data-table tbody tr:hover {
    background-color: #f1f5f9;
  }
</style>
`;
      } else if (styleType === "modern") {
        classAttr = tableClass.trim() ? ` class="${escapeHtml(tableClass.trim())}"` : ' class="data-table"';
        cssStyles = `<style>
  table.data-table {
    width: 100%;
    border-collapse: collapse;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 14px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  table.data-table th {
    background-color: #2563eb;
    color: #ffffff;
    font-weight: 600;
    text-align: left;
    padding: 12px 16px;
    border: 1px solid #1d4ed8;
  }
  table.data-table td {
    padding: 10px 16px;
    border-bottom: 1px solid #e2e8f0;
    color: #334155;
  }
  table.data-table tbody tr:hover {
    background-color: #f8fafc;
  }
</style>
`;
      } else {
        // Plain
        classAttr = tableClass.trim() ? ` class="${escapeHtml(tableClass.trim())}"` : "";
      }

      let tableMarkup = `<table${idAttr}${classAttr}>\n`;

      // <thead>
      tableMarkup += `  <thead>\n    <tr>\n`;
      headers.forEach((h) => {
        tableMarkup += `      <th>${escapeHtml(h)}</th>\n`;
      });
      tableMarkup += `    </tr>\n  </thead>\n`;

      // <tbody>
      tableMarkup += `  <tbody>\n`;
      rows.forEach((row) => {
        tableMarkup += `    <tr>\n`;
        row.forEach((cell) => {
          tableMarkup += `      <td>${escapeHtml(cell)}</td>\n`;
        });
        tableMarkup += `    </tr>\n`;
      });
      tableMarkup += `  </tbody>\n</table>`;

      let finalHtml = cssStyles ? `${cssStyles}${tableMarkup}` : tableMarkup;

      if (fullDocument) {
        finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JSON Table</title>
</head>
<body style="padding: 24px; background-color: #ffffff;">
${finalHtml
  .split("\n")
  .map((line) => "  " + line)
  .join("\n")}
</body>
</html>`;
      }

      return finalHtml;
    },
    [styleType, fullDocument, tableClass, tableId]
  );

  const handleConvert = useCallback(() => {
    try {
      setError(null);
      if (!input.trim()) {
        setHtmlOutput("");
        setRowCount(0);
        setColCount(0);
        return;
      }

      const parsed = JSON.parse(input);
      const { headers, rows } = parseJsonToMatrix(parsed);

      setRowCount(rows.length);
      setColCount(headers.length);

      const generated = generateHTMLTableString(headers, rows);
      setHtmlOutput(generated);
    } catch (err: any) {
      setError(err?.message || "Invalid JSON format. Please check your syntax.");
      setHtmlOutput("");
      setRowCount(0);
      setColCount(0);
    }
  }, [input, generateHTMLTableString]);

  // Run on mount or when style options change
  useEffect(() => {
    handleConvert();
  }, [handleConvert]);

  const handleCopy = () => {
    if (!htmlOutput) return;
    navigator.clipboard.writeText(htmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!htmlOutput) return;
    const blob = new Blob([htmlOutput], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "table.html");
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
      setInput(content || "");
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleClear = () => {
    setInput("");
    setHtmlOutput("");
    setError(null);
    setRowCount(0);
    setColCount(0);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <LayoutGrid className="w-6 h-6 text-primary-theme" />
          JSON to HTML Table
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-1">
          Convert JSON data, records, and objects into clean HTML table markup with styling options.
        </p>
      </div>

      {/* Options Bar */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-slate-500" />
            <span className="font-semibold text-slate-600">Style:</span>
            <select
              value={styleType}
              onChange={(e) => setStyleType(e.target.value as any)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-theme cursor-pointer"
            >
              <option value="modern">Modern Blue</option>
              <option value="striped">Striped Clean</option>
              <option value="tailwind">Tailwind Classes</option>
              <option value="bootstrap">Bootstrap Classes</option>
              <option value="plain">Plain HTML</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={fullDocument}
              onChange={(e) => setFullDocument(e.target.checked)}
              className="rounded border-slate-300 text-primary-theme focus:ring-primary-theme cursor-pointer"
            />
            <span>Full HTML Page</span>
          </label>
        </div>

        {/* Stats */}
        {rowCount > 0 && (
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md font-semibold text-slate-700">
              {rowCount} {rowCount === 1 ? "Row" : "Rows"}
            </span>
            <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md font-semibold text-slate-700">
              {colCount} {colCount === 1 ? "Col" : "Cols"}
            </span>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Editors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: JSON Input */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:texxt-sm   font-bold text-slate-500 uppercase flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 md:w-6 md:h-6" /> JSON Input
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
                <Upload className="w-3.5 h-3.5 md:w-5 md:h-5" /> Upload
              </button>
              <button
                onClick={handleClear}
                className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-red-500"
                title="Clear input and output"
              >
                <Trash2 className="w-3.5 h-3.5 md:w-5 md:h-5" /> Clear
              </button>
            </div>
          </div>
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 min-h-[340px]">
            <CodeMirror
              value={input}
              height="340px"
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

        {/* Right: Output Section (Code / Live Preview) */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            {/* Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setActiveTab("code")}
                className={`text-xs px-3 py-1 rounded-md font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  activeTab === "code"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <FileCode2 className="w-3.5 h-3.5 md:w-5 md:h-5" /> HTML Code
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                className={`text-xs px-3 py-1 rounded-md font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  activeTab === "preview"
                    ? "bg-white text-slate-800 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <Eye className="w-3.5 h-3.5 md:w-5 md:h-5" /> Table Preview
              </button>
            </div>

            {/* Actions */}
            {htmlOutput && (
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

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 min-h-[340px] flex flex-col">
            {activeTab === "code" ? (
              <CodeMirror
                value={htmlOutput || ""}
                height="340px"
                extensions={[html()]}
                readOnly={true}
                theme="light"
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: false,
                  highlightActiveLine: false,
                }}
              />
            ) : (
              <div className=" bg-white min-h-[340px] h-[340px] overflow-auto">
                {htmlOutput ? (
                  <iframe
                    srcDoc={
                      htmlOutput.includes("<!DOCTYPE html>")
                        ? htmlOutput
                        : `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>body{font-family:sans-serif;margin:12px;}</style></head><body>${htmlOutput}</body></html>`
                    }
                    title="HTML Table Preview"
                    className="w-full h-full border-0 rounded-lg min-h-[300px]"
                    sandbox="allow-same-origin"
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs">
                    <TableIcon className="w-8 h-8 stroke-1 mb-2 opacity-50" />
                    <span>No table data to preview</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Convert Trigger Button */}
      <button
        onClick={handleConvert}
        className="w-full bg-primary-theme hover:opacity-90 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4" /> Convert to HTML Table
      </button>
    </div>
  );
}