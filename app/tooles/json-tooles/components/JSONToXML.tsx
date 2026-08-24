"use client";

import React, { useState, useRef, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { XMLBuilder } from "fast-xml-parser";
import {
  Code2,
  Copy,
  Check,
  Download,
  Upload,
  Trash2,
  FileText,
  FileCode2,
  RefreshCw,
  AlertCircle,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

// Default sample payload
const DEFAULT_JSON = `{
  "root": {
    "person": {
      "name": "Alex Johnson",
      "role": "Lead Developer",
      "city": "Boston",
      "active": true
    },
    "tags": ["react", "typescript", "xml"]
  }
}`;

export default function JSONToXML() {
  const [input, setInput] = useState<string>(DEFAULT_JSON);
  const [xmlOutput, setXmlOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("output.xml");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // XML Builder configuration (fast-xml-parser v4)
  const buildXml = useCallback((jsonObject: object): string => {
    const builder = new XMLBuilder({
      ignoreAttributes: false,
      format: true,
      indentBy: "  ",
      suppressEmptyNode: true,
      processEntities: true,
    });
    return `<?xml version="1.0" encoding="UTF-8"?>\n` + builder.build(jsonObject);
  }, []);

  const handleConvert = () => {
    try {
      setError(null);
      if (!input.trim()) {
        setError("Input is empty. Please enter valid JSON.");
        setXmlOutput("");
        return;
      }

      const parsed = JSON.parse(input);

      if (typeof parsed !== "object" || parsed === null) {
        throw new Error("JSON must be an object or array to convert to XML.");
      }

      // If JSON is a top-level array, wrap it in a root tag to enforce valid XML standard
      const payload = Array.isArray(parsed) ? { root: { item: parsed } } : parsed;

      const result = buildXml(payload);
      setXmlOutput(result);
    } catch (err: any) {
      setError(err.message || "Failed to parse JSON. Please check syntax.");
      setXmlOutput("");
    }
  };

  const handleFormatJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError("Invalid JSON: Cannot format invalid syntax.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const baseName = file.name.replace(/\.[^/.]+$/, "");
    setFileName(`${baseName}.xml`);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setInput(content);
        setError(null);
        setXmlOutput("");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleDownload = () => {
    if (!xmlOutput) return;
    const blob = new Blob([xmlOutput], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName.endsWith(".xml") ? fileName : `${fileName}.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!xmlOutput) return;
    navigator.clipboard.writeText(xmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setXmlOutput("");
    setError(null);
  };

  const handleLoadSample = () => {
    setInput(DEFAULT_JSON);
    setError(null);
    setXmlOutput("");
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm transition-all">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json,application/json"
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold  tracking-tight flex items-center gap-3 mb-1">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-2xl inline-flex">
              <Code2 className="w-6 h-6 text-primary-theme md:w-7 md:h-7" />
            </span>
            JSON to XML Converter
          </h1>
          <p className="text-sm md:text-base text-primary-theme">
            Convert JSON data structures into formatted XML documents 
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs md:text-sm font-semibold rounded-xl flex items-center gap-2 transition cursor-pointer active:scale-95"
            title="Upload JSON File"
          >
            <Upload className="w-4 h-4 text-slate-500" /> Upload
          </button>

          <button
            type="button"
            onClick={handleFormatJson}
            disabled={!input.trim()}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs md:text-sm font-semibold rounded-xl flex items-center gap-2 transition cursor-pointer active:scale-95"
            title="Prettify JSON Syntax"
          >
            <Sparkles className="w-4 h-4 text-amber-500" /> Format
          </button>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!xmlOutput}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs md:text-sm font-semibold rounded-xl flex items-center gap-2 transition cursor-pointer active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" /> Copy XML
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={!xmlOutput}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 text-xs md:text-sm font-semibold rounded-xl flex items-center gap-2 transition cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4 text-slate-500" /> Download
          </button>

          <button
            type="button"
            onClick={handleClear}
            className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs md:text-sm font-semibold rounded-xl flex items-center gap-2 transition cursor-pointer active:scale-95"
          >
            <Trash2 className="w-4 h-4 text-rose-500" /> Clear
          </button>
        </div>
      </div>

      {/* Two-Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: JSON Input */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              <span className="text-sm md:text-base font-bold text-slate-700 uppercase tracking-wider">
                JSON Input
              </span>
            </div>
            <div className="flex items-center gap-2">
              {!input && (
                <button
                  onClick={handleLoadSample}
                  className="text-xs text-indigo-600 hover:underline font-medium"
                >
                  Load Sample
                </button>
              )}
              <span className="text-xs text-slate-400 font-mono">
                {input.length} chars
              </span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <CodeMirror
              value={input}
              height="380px"
              extensions={[json()]}
              onChange={(value) => {
                setInput(value);
                setError(null);
              }}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                dropCursor: true,
                allowMultipleSelections: false,
                indentOnInput: true,
              }}
              style={{ fontSize: "13.5px" }}
              className="font-mono text-slate-800"
            />
          </div>
        </div>

        {/* Right Panel: XML Output */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm md:text-base font-bold text-slate-700 uppercase tracking-wider">
                XML Output
              </span>
            </div>
            {xmlOutput && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Valid XML
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {new Blob([xmlOutput]).size} bytes
                </span>
              </div>
            )}
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 min-h-[380px] flex flex-col justify-center transition-all">
            {error ? (
              <div className="p-6 m-4 rounded-xl bg-rose-50/80 border border-rose-200 text-rose-700 text-xs md:text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-rose-800 mb-0.5">Conversion Error</h4>
                  <p className="font-mono">{error}</p>
                </div>
              </div>
            ) : xmlOutput ? (
              <CodeMirror
                value={xmlOutput}
                height="380px"
                extensions={[xml()]}
                editable={false}
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: true,
                  dropCursor: false,
                  allowMultipleSelections: false,
                }}
                style={{ fontSize: "13.5px" }}
                className="font-mono text-slate-800"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-8  gap-3 text-center">
                <div className="p-3 bg-slate-100 text-primary-theme rounded-full">
                  <FileCode2 className="w-8 h-8 text-primary-theme" />
                </div>
                <p className="text-xs md:text-sm text-slate-500 max-w-xs">
                  Click <span className="font-bold text-slate-700">Convert to XML</span> below to view the formatted output.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Convert Action Button */}
      <div className="mt-6">
        <button
          onClick={handleConvert}
          disabled={!input.trim()}
          className="w-full bg-primary-theme hover:bg-primary-theme/80 active:bg-primary-theme/90 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 rounded-2xl transition shadow-md hover:shadow-indigo-100 flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base"
        >
          <RefreshCw className="w-5 h-5" /> Convert to XML
        </button>
      </div>
    </div>
  );
}