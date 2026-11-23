"use client";

import React, { useState, useEffect, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { javascript } from "@codemirror/lang-javascript";
import {
  SquareCode,
  Copy,
  Check,
  Upload,
  Download,
  Trash2,
  AlertCircle,
} from "lucide-react";

const DEFAULT_JSON = `{
  "id": 1,
  "title": "TypeScript Converter",
  "active": true,
  "views": 450,
  "author": {
    "name": "Jane",
    "email": "jane@example.com"
  },
  "tags": ["ts", "json", "code"]
}`;

export default function JSONToTypeScript() {
  const [input, setInput] = useState(DEFAULT_JSON);
  const [interfaceName, setInterfaceName] = useState("RootObject");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper functions for TS conversion
  const toPascalCase = (str: string): string => {
    const clean = str.replace(/[^a-zA-Z0-9_$]/g, " ");
    const words = clean.trim().split(/\s+/);
    if (!words[0]) return "Interface";
    return words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("");
  };

  const singularize = (str: string): string => {
    if (str.endsWith("ies")) return str.slice(0, -3) + "y";
    if (str.endsWith("s") && !str.endsWith("ss")) return str.slice(0, -1);
    return str;
  };

  const sanitizeKey = (key: string): string => {
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) {
      return key;
    }
    return JSON.stringify(key);
  };

  const generateTsInterface = (obj: unknown, rootName: string): string => {
    const interfacesMap = new Map<string, string>();

    const parseObj = (data: unknown, name: string): string => {
      if (data === null) return "null";
      if (data === undefined) return "undefined";

      if (Array.isArray(data)) {
        if (data.length === 0) return "any[]";
        const singularName = singularize(name) || "Item";
        const types = Array.from(
          new Set(data.map((item) => parseObj(item, singularName)))
        );
        if (types.length === 1) {
          return types[0].includes("|") ? `(${types[0]})[]` : `${types[0]}[]`;
        }
        return `(${types.join(" | ")})[]`;
      }

      if (typeof data === "object") {
        const interfaceTypeName = toPascalCase(name) || "RootObject";
        const record = data as Record<string, unknown>;
        const keys = Object.keys(record);

        let fields = `export interface ${interfaceTypeName} {\n`;
        for (const key of keys) {
          const fieldType = parseObj(record[key], key);
          fields += `  ${sanitizeKey(key)}: ${fieldType};\n`;
        }
        fields += `}`;

        interfacesMap.set(interfaceTypeName, fields);
        return interfaceTypeName;
      }

      return typeof data;
    };

    parseObj(obj, rootName || "RootObject");
    return Array.from(interfacesMap.values()).reverse().join("\n\n");
  };

  // Run conversion logic
  const convertJsonToTs = (jsonText: string, rootName: string) => {
    if (!jsonText.trim()) {
      setOutput("");
      setError(null);
      return;
    }

    try {
      setError(null);
      const parsed = JSON.parse(jsonText);
      const tsCode = generateTsInterface(parsed, rootName || "RootObject");
      setOutput(tsCode);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Invalid JSON syntax";
      setError(message);
      setOutput("");
    }
  };

  // Convert on input or interface name change
  useEffect(() => {
    convertJsonToTs(input, interfaceName);
  }, [input, interfaceName]);

  // Actions
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content !== undefined) {
        setInput(content);
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // Reset input value to allow re-uploading the same file
  };

  const handleDownload = () => {
  if (!output || output.trim() === "") {
    return;
  }

  // Create a valid filename
  const cleanName = interfaceName
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "");

  const fileName = cleanName
    ? `${cleanName}.ts`
    : "types.ts";

  // Get the COMPLETE code from CodeMirror output
  const code = output.trim() + "\n";

  // Create a TypeScript file
  const file = new File(
    [code],
    fileName,
    {
      type: "text/typescript;charset=utf-8",
    }
  );

  // Create download URL
  const url = URL.createObjectURL(file);

  // Create download link
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Cleanup
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
};

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
          <SquareCode className="w-6 md:w-7 h-6 md:h-7 text-primary-theme" />
          JSON to TypeScript Interface
        </h2>
        <p className="text-sm md:text-base text-slate-500">
          Generate clean TypeScript interface types automatically from JSON payload objects.
        </p>
      </div>

      {/* Root Interface Name Config */}
      <div className="mb-4">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">
          Root Interface Name
        </label>
        <input
          type="text"
          value={interfaceName}
          onChange={(e) => setInterfaceName(e.target.value)}
          placeholder="RootObject"
          className="w-full max-w-xs p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-mono text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition"
        />
      </div>

      {/* Code Editors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Column */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
              JSON Input
            </span>
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json,application/json,text/plain"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-primary-theme"
                title="Upload JSON file"
              >
                <Upload className="w-3.5 h-3.5" /> Upload
              </button>
              {input && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer text-red-500"
                  title="Clear All"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              )}
            </div>
          </div>
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex-1 min-h-[300px]">
            <CodeMirror
              value={input}
              height="320px"
              extensions={[json()]}
              onChange={(val) => setInput(val)}
              className="text-sm font-mono"
            />
          </div>
        </div>

        {/* Output Column */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
              TypeScript Output
            </span>
            <div className="flex items-center gap-2">
              {output && (
                <>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-primary-theme"
                  >
                    <Download className="w-3.5 h-3.5" /> Download .ts
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-primary-theme"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-green-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copied ? "Copied" : "Copy Interfaces"}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 flex-1 min-h-[300px] relative">
            {error ? (
              <div className="p-4 text-red-500 text-sm font-mono flex items-start gap-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            ) : (
              <CodeMirror
                value={output}
                height="320px"
                extensions={[javascript({ typescript: true })]}
                editable={false}
                className="text-sm font-mono"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}