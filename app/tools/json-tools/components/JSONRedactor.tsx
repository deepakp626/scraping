"use client";

import React, { useState, useRef } from "react";
import { EyeOff, Copy, Check, Upload, Download, Trash2, AlertCircle } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

export default function JSONRedactor() {
  const [input, setInput] = useState<string>(
    JSON.stringify(
      {
        user: "alice",
        password: "secretPassword123",
        apiKey: "sk-live-99238491023",
        email: "alice@example.com",
        creditCard: "4532-1111-2222-3333",
      },
      null,
      2
    )
  );
  const [keysToRedact, setKeysToRedact] = useState(
    "password, apiKey, creditCard, secret, token"
  );
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Redact sensitive keys recursively from objects and arrays
  const handleRedact = () => {
    try {
      setError(null);
      if (!input.trim()) return;

      const parsed = JSON.parse(input);
      const targetKeys = keysToRedact
        .split(",")
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean);

      const redactObj = (obj: any): any => {
        if (Array.isArray(obj)) {
          return obj.map(redactObj);
        }
        if (typeof obj === "object" && obj !== null) {
          const res: Record<string, any> = {};
          for (const k of Object.keys(obj)) {
            if (targetKeys.includes(k.toLowerCase())) {
              res[k] = "[REDACTED]";
            } else {
              res[k] = redactObj(obj[k]);
            }
          }
          return res;
        }
        return obj;
      };

      const redactedData = redactObj(parsed);
      setOutput(JSON.stringify(redactedData, null, 2));
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax.");
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

  // Upload JSON File
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
    e.target.value = ""; // Reset input after upload
  };

  // Download Redacted Output as JSON
  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "redacted_data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Clear Editor & Output
  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto">
      {/* Header */}
      <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
        <EyeOff className="w-6 h-6 text-primary-theme" />
        JSON Sensitive Field Redactor
      </h2>
      <p className="text-sm md:text-base text-slate-500 mb-6">
        Mask confidential fields (passwords, tokens, credentials, PII) in JSON objects.
      </p>

      {/* Target Keys Input */}
      <div className="mb-4">
        <label className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 block">
          Target Keys to Redact (Comma Separated)
        </label>
        <input
          type="text"
          value={keysToRedact}
          onChange={(e) => setKeysToRedact(e.target.value)}
          placeholder="e.g. password, token, secret, email"
          className="w-full p-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-mono text-sm focus:outline-none focus:border-primary-theme"
        />
      </div>

      {/* Main Grid: Input & Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
              Original JSON
            </span>
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".json,.txt,text/plain,application/json"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
   className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-primary-theme"   
                title="Upload JSON File"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload
              </button>
              <button
                type="button"
                onClick={handleClear}
                   className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-red-500"   
                title="Clear All"
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
              extensions={[json()]}
              onChange={(value) => setInput(value)}
              theme="light"
              className="text-sm font-mono"
            />
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs md:text-sm  font-bold text-slate-500 uppercase tracking-wider">
              Redacted JSON
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
                  {copied ? "Copied" : "Copy Redacted"}
                </button>
              </div>
            )}
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 h-[400px] relative">
            {error ? (
              <div className="p-4 m-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-mono flex items-start gap-2.5">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                <div>
                  <p className="font-bold text-rose-800 font-sans">Invalid JSON Syntax</p>
                  <p className="mt-1 text-xs text-rose-600 leading-relaxed font-mono">{error}</p>
                </div>
              </div>
            ) : output ? (
              <CodeMirror
                value={output}
                height="400px"
                extensions={[json()]}
                readOnly={true}
                editable={false}
                theme="light"
                className="text-sm font-mono"
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-sm text-slate-400 italic font-mono p-4 text-center">
                <span>Click &quot;Redact Sensitive Fields&quot; to generate JSON output...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleRedact}
          disabled={!input.trim()}
          className="w-full bg-primary-theme hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <EyeOff className="w-5 h-5" /> Redact Sensitive Fields
        </button>
      </div>
    </div>
  );
}