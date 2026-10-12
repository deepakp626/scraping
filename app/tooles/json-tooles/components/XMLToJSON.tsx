"use client";

import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import {
  FileType,
  Copy,
  Check,
  Upload,
  Download,
  Trash2,
  RefreshCw,
  AlertCircle,
  FileCode,
} from "lucide-react";

export default function XMLToJSON() {
  const [input, setInput] = useState<string>(
    ``
  );
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to cast primitive string values (booleans, numbers)
  const castValue = (val: string): string | number | boolean | null => {
    const trimmed = val.trim();
    if (trimmed === "") return null;
    const lower = trimmed.toLowerCase();
    if (lower === "true") return true;
    if (lower === "false") return false;
    if (!isNaN(Number(trimmed))) return Number(trimmed);
    return trimmed;
  };

  // XML to JS Object Parser
  const parseXmlToObj = (xmlStr: string) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlStr, "text/xml");

    const parserError = xmlDoc.getElementsByTagName("parsererror");
    if (parserError.length > 0) {
      throw new Error("Invalid XML markup. Please check your syntax.");
    }

    const elementToObj = (node: Element): unknown => {
      const obj: Record<string, unknown> = {};

      // Handle element attributes if any
      if (node.attributes && node.attributes.length > 0) {
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes[i];
          obj[`@${attr.name}`] = castValue(attr.value);
        }
      }

      // Leaf node with text content only
      if (node.children.length === 0) {
        const text = node.textContent || "";
        if (Object.keys(obj).length === 0) {
          return castValue(text);
        }
        if (text.trim()) {
          obj["#text"] = castValue(text);
        }
        return obj;
      }

      // Recursive step for nested children
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        const name = child.nodeName;
        const val = elementToObj(child);

        if (obj[name]) {
          if (!Array.isArray(obj[name])) {
            obj[name] = [obj[name]];
          }
          (obj[name] as unknown[]).push(val);
        } else {
          obj[name] = val;
        }
      }

      return obj;
    };

    const root = xmlDoc.documentElement;
    return { [root.nodeName]: elementToObj(root) };
  };

  const handleConvert = () => {
    try {
      setError(null);
      if (!input.trim()) {
        setError("XML input is empty.");
        setOutput("");
        return;
      }
      const obj = parseXmlToObj(input);
      setOutput(JSON.stringify(obj, null, 2));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to convert XML to JSON.";
      setError(errorMessage);
      setOutput("");
    }
  };

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
    e.target.value = "";
  };

  const handleDownloadJSON = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "converted-data.json";
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
    setError(null);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto font-sans text-base">
      {/* Header */}
      <div className="pb-4 mb-6 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
          <FileType className="w-7 h-7 text-primary-theme" />
          XML to JSON Converter
        </h2>
        <p className="text-sm md:text-base text-slate-500">
          Convert XML document trees and tags into structured JSON objects.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-6 h-6 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        accept=".xml,text/xml"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Pane (XML) */}
        <div className="flex flex-col">
          {/* XML Toolbar */}
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <FileType className="w-4 md:w-6 md:h-6 h-4 text-slate-500" />
              XML Input
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-primary-theme transition cursor-pointer"
                title="Upload XML File"
              >
                <Upload className="w-4 h-4" /> Upload
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                title="Clear XML Input"
              >
                <Trash2 className="w-4 h-4" /> Clear
              </button>
            </div>
          </div>

          <div className="h-[380px] border border-slate-200 rounded-2xl overflow-hidden bg-[#1e1e1e]">
            <CodeMirror
              value={input}
              height="380px"
              theme={vscodeDark}
              extensions={[xml()]}
              onChange={(value) => setInput(value)}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                highlightActiveLine: true,
              }}
              className="text-sm font-mono [&_.cm-editor]:!font-mono [&_.cm-scroller]:!font-mono [&_.cm-content]:!text-sm"
            />
          </div>
        </div>

        {/* Output Pane (JSON) */}
        <div className="flex flex-col">
          {/* JSON Toolbar */}
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-4 md:w-6 md:h-6 h-4 text-slate-500" />
              JSON Result
            </label>
            <div className="flex items-center gap-2">
              {output && (
                <>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-primary-theme transition cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? "Copied" : "Copy JSON"}
                  </button>

                  <button
                    onClick={handleDownloadJSON}
                    className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-primary-theme transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Download
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="h-[380px] border border-slate-200 rounded-2xl overflow-hidden bg-[#1e1e1e]">
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
                }}
                className="text-sm font-mono [&_.cm-editor]:!font-mono [&_.cm-scroller]:!font-mono [&_.cm-content]:!text-sm"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-sm text-slate-400 italic font-mono p-4 text-center">
                <span>Click "Convert to JSON" to view output...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Convert Action Button */}
      <div className="mt-6">
        <button
          onClick={handleConvert}
          disabled={!input.trim()}
          className="w-full bg-primary-theme hover:bg-primary-theme/90 active:bg-primary-theme/80 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm text-base flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-5 h-5" /> Convert to JSON
        </button>
      </div>
    </div>
  );
}