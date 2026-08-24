"use client";

import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import {
  Layers,
  Copy,
  Check,
  Upload,
  Download,
  Trash2,
  RefreshCw,
  AlertCircle,
  FileCode,
} from "lucide-react";

export default function JSONSchemaGenerator() {
  const [input, setInput] = useState<string>(
    ``
  );
  const [schemaOutput, setSchemaOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Recursive function to generate JSON Schema Draft-07 structure
  const generateSchema = (obj: unknown): Record<string, unknown> => {
    if (Array.isArray(obj)) {
      return {
        type: "array",
        items: obj.length > 0 ? generateSchema(obj[0]) : {},
      };
    }
    if (obj !== null && typeof obj === "object") {
      const properties: Record<string, unknown> = {};
      const required: string[] = [];

      for (const key of Object.keys(obj as Record<string, unknown>)) {
        properties[key] = generateSchema(
          (obj as Record<string, unknown>)[key]
        );
        required.push(key);
      }

      return {
        type: "object",
        properties,
        required,
      };
    }
    if (typeof obj === "number") {
      return { type: Number.isInteger(obj) ? "integer" : "number" };
    }
    if (typeof obj === "boolean") return { type: "boolean" };
    if (obj === null) return { type: "null" };
    return { type: "string" };
  };

  const handleGenerate = () => {
    try {
      setError(null);
      if (!input.trim()) {
        setError("JSON input is empty.");
        setSchemaOutput("");
        return;
      }
      const parsed = JSON.parse(input);
      const schema = {
        $schema: "http://json-schema.org/draft-07/schema#",
        title: "GeneratedSchema",
        ...generateSchema(parsed),
      };
      setSchemaOutput(JSON.stringify(schema, null, 2));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Invalid JSON input structure.";
      setError(errorMessage);
      setSchemaOutput("");
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
    if (!schemaOutput) return;
    const blob = new Blob([schemaOutput], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated-schema.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!schemaOutput) return;
    navigator.clipboard.writeText(schemaOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setSchemaOutput("");
    setError(null);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto font-sans text-base">
      {/* Header */}
      <div className="pb-4 mb-6 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
          <Layers className="w-6 h-6 text-primary-theme" />
          JSON Schema Generator
        </h2>
        <p className="text-sm md:text-base text-slate-500">
          Generate Draft-07 JSON Schema specifications automatically from JSON payload samples.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        accept=".json,application/json,text/plain"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Pane (JSON) */}
        <div className="flex flex-col">
          {/* Input Box Toolbar */}
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-4 md:w-6 md:h-6 h-4 text-slate-500" />
              Sample JSON Payload
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-primary-theme transition cursor-pointer"
                title="Upload JSON File"
              >
                <Upload className="w-4 h-4" /> Upload
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                title="Clear Input"
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
              extensions={[json()]}
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

        {/* Output Pane (Schema) */}
        <div className="flex flex-col">
          {/* Output Box Toolbar */}
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 md:w-6 md:h-6  text-slate-500" />
              Generated JSON Schema
            </label>
            <div className="flex items-center gap-2">
              {schemaOutput && (
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
                    {copied ? "Copied" : "Copy Schema"}
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
            {schemaOutput ? (
              <CodeMirror
                value={schemaOutput}
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
                <span>Click "Generate JSON Schema" to view output...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Convert Action Button */}
      <div className="mt-6">
        <button
          onClick={handleGenerate}
          disabled={!input.trim()}
          className="w-full bg-primary-theme hover:bg-primary-theme/90 active:bg-primary-theme/95 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm text-base flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-5 h-5" /> Generate JSON Schema
        </button>
      </div>
    </div>
  );
}