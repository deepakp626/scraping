"use client";

import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { yaml as yamlLang } from "@codemirror/lang-yaml";
import * as yaml from "js-yaml";
import {
  FileText,
  Copy,
  Check,
  Upload,
  Download,
  Trash2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

export default function JSONToYAML() {
  const [input, setInput] = useState<string>(
    `{\n  "server": {\n    "port": 8080,\n    "host": "localhost",\n    "ssl": true\n  },\n  "database": {\n    "name": "scraping_db",\n    "pool": 10\n  }\n}`
  );
  const [yamlOutput, setYamlOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleConvert = () => {
    try {
      setError(null);
      if (!input.trim()) {
        setYamlOutput("");
        return;
      }
      const parsed = JSON.parse(input);
      const convertedYaml = yaml.dump(parsed, { indent: 2 });
      setYamlOutput(convertedYaml);
    } catch (err: any) {
      setError(err.message || "Invalid JSON input");
      setYamlOutput("");
    }
  };

  const handleCopy = () => {
    if (!yamlOutput) return;
    navigator.clipboard.writeText(yamlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setYamlOutput("");
    setError(null);
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

  const handleDownload = () => {
    if (!yamlOutput) return;
    const blob = new Blob([yamlOutput], { type: "text/yaml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "config.yaml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-7xl mx-auto">
      {/* Main Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
          <FileText className="w-6 h-6 text-primary-theme" />
          JSON to YAML Converter
        </h2>
        <p className="text-sm text-slate-500">
          Convert JSON data objects into YAML configuration file format.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* JSON Input Column */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              JSON Input
            </span>

            {/* Upload & Clear Actions above JSON Input */}
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json,application/json"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs md:text-sm font-semibold rounded-xl flex items-center gap-2 transition cursor-pointer active:scale-95"                title="Upload JSON File"
              >
                <Upload className="w-3.5 h-3.5" /> Upload
              </button>

              <button
                onClick={handleClear}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-xs md:text-sm font-semibold rounded-xl flex items-center gap-2 transition cursor-pointer active:scale-95 text-red-600 hover:text-red-700"
        
                title="Clear Input & Output"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex-1 min-h-[280px]">
            <CodeMirror
              value={input}
              height="280px"
              extensions={[json()]}
              onChange={(value) => setInput(value)}
              className="text-sm font-mono"
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                highlightActiveLine: false,
              }}
            />
          </div>
        </div>

        {/* YAML Output Column */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              YAML Output
            </span>
            <div className="flex items-center gap-3">
              {yamlOutput && (
                <>
                  <button
                    onClick={handleDownload}
  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs md:text-sm font-semibold rounded-xl flex items-center gap-2 transition cursor-pointer active:scale-95"                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs md:text-sm font-semibold rounded-xl flex items-center gap-2 transition cursor-pointer active:scale-95"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copied ? "Copied" : "Copy YAML"}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex-1 min-h-[280px]">
            {error ? (
              <div className="p-5 h-full flex flex-col gap-3">
                {/* Error header */}
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <span className="text-sm font-bold text-red-600">
                    Invalid JSON
                  </span>
                </div>

                {/* Error message box */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex-1">
                  <p className="text-xs md:text-base font-semibold text-red-400 uppercase tracking-wider mb-1">
                    Parse Error
                  </p>
                  <pre className="text-sm text-red-700 font-mono whitespace-pre-wrap break-all leading-relaxed">
                    {error}
                  </pre>
                </div>

                {/* Hint */}
                <p className="text-xs text-slate-400">
                  💡 Check for missing commas, unclosed brackets, or unquoted keys.
                </p>
              </div>
            ) : yamlOutput ? (
              <CodeMirror
                value={yamlOutput}
                height="280px"
                extensions={[yamlLang()]}
                editable={false}
                readOnly={true}
                className="text-sm font-mono"
                basicSetup={{
                  lineNumbers: true,
                  foldGutter: true,
                  highlightActiveLine: false,
                }}
              />
            ) : (
              <div className="p-4 text-slate-400 italic text-sm font-mono">
                YAML result will appear here...
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleConvert}
          disabled={!input.trim()}
          className="w-full bg-primary-theme hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-5 h-5" /> Convert to YAML
        </button>
      </div>
    </div>
  );
}