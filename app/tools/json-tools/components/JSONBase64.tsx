"use client";

import React, { useState, useRef } from "react";
import { Binary, Copy, Check, Upload, Download, Trash2 } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export default function JSONBase64() {
  const [input, setInput] = useState<string>(
    `{\n  "app": "Scraper",\n  "status": "active"\n}`
  );
  const [output, setOutput] = useState<string>("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Safe Unicode UTF-8 to Base64 conversion
  const utf8ToBase64 = (str: string) => {
    const bytes = new TextEncoder().encode(str);
    const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
    return btoa(binString);
  };

  // Safe Base64 to Unicode UTF-8 conversion
  const base64ToUtf8 = (str: string) => {
    const binString = atob(str.trim());
    const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  };

  // Process conversion
  const handleProcess = () => {
    try {
      setError(null);
      if (!input.trim()) {
        setOutput("");
        return;
      }

      if (mode === "encode") {
        try {
          // Pretty format valid JSON before encoding if possible
          const parsed = JSON.parse(input);
          setOutput(utf8ToBase64(JSON.stringify(parsed, null, 2)));
        } catch {
          // Fallback to encoding raw string if input is unparsed
          setOutput(utf8ToBase64(input));
        }
      } else {
        const decoded = base64ToUtf8(input);
        try {
          const parsed = JSON.parse(decoded);
          setOutput(JSON.stringify(parsed, null, 2));
        } catch {
          setOutput(decoded);
        }
      }
    } catch (err: any) {
      setError("Invalid input for Base64 " + mode + "ing.");
      setOutput("");
    }
  };

  // Copy result to clipboard
  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Upload file into editor
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content !== undefined) {
        setInput(content);
        setError(null);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Download result output
  const handleDownload = () => {
    if (!output) return;
    const isJson = mode === "decode";
    const blob = new Blob([output], {
      type: isJson ? "application/json" : "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = mode === "encode" ? "payload.b64" : "decoded.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Clear all fields
  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
        <Binary className="w-6 h-6 md:w-8 md:h-8 text-primary-theme" />
        JSON Base64 Encoder / Decoder
      </h2>
      <p className="text-sm md:text-base text-slate-500 mb-6">
        Encode JSON data into Base64 strings or decode Base64 payload strings to JSON.
      </p>

      {/* Mode Switcher */}
      <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => {
            setMode("encode");
            setError(null);
          }}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition cursor-pointer ${
            mode === "encode"
              ? "bg-white text-primary-theme shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Encode JSON to Base64
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("decode");
            setError(null);
          }}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition cursor-pointer ${
            mode === "decode"
              ? "bg-white text-primary-theme shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Decode Base64 to JSON
        </button>
      </div>

      {/* Main Grid: Input & Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
              {mode === "encode" ? "JSON Input" : "Base64 Input"}
            </span>
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json,.txt,.b64,text/plain,application/json"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
   className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-primary-theme"   
                title="Upload File"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload
              </button>
              <button
                type="button"
                onClick={handleClear}
                   className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-red-500 "   
                title="Clear Input"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl bg-slate-50 overflow-hidden h-[400px]">
            <CodeMirror
              value={input}
              height="400px"
              extensions={mode === "encode" ? [json()] : []}
              onChange={(value) => setInput(value)}
              theme="light"
              className="text-sm font-mono"
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
              Result
            </span>
            {output && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownload}
   className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-primary-theme"   

                  title="Download Result"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
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
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            )}
          </div>

          {mode === "decode" ? (
            <div className="h-[400px] border border-slate-200 rounded-2xl overflow-hidden bg-[#1e1e1e] relative">
              {error ? (
                <div className="p-4 text-red-400 font-mono text-sm">
                  ⚠️ {error}
                </div>
              ) : output ? (
                <CodeMirror
                  value={output}
                  height="400px"
                  theme={vscodeDark}
                  extensions={[json()]}
                  editable={false}
                  basicSetup={{
                    lineNumbers: true,
                    foldGutter: true,
                    highlightActiveLine: false,
                  }}
                  className="text-sm font-mono [&_.cm-editor]:!font-mono [&_.cm-scroller]:!font-mono [&_.cm-content]:!text-sm h-full"
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-sm text-slate-400 italic font-mono p-4 text-center">
                  <span>Result JSON will show here...</span>
                </div>
              )}
            </div>
          ) : (
            <div className="h-[400px] p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-800 font-mono text-sm overflow-auto whitespace-pre-wrap break-all leading-relaxed">
              {error ? (
                <span className="text-red-500 font-semibold">{error}</span>
              ) : output ? (
                output
              ) : (
                <span className="text-slate-400 italic">Result will show here...</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={handleProcess}
        disabled={!input.trim()}
        className="mt-6 w-full bg-primary-theme hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
      >
        <Binary className="w-5 h-5" />
        {mode === "encode" ? "Encode to Base64" : "Decode Base64"}
      </button>
    </div>
  );
}