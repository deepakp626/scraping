"use client";

import React, { useState, useRef } from "react";
import { Quote, Copy, Check, Upload, Download, Trash2,FileCode } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

export default function JSONEscape() {
  const [input, setInput] = useState<string>(
    `{"message": "Hello World", "quote": "To be or not to be"}`
  );
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Escape special characters into valid JSON string
  const handleEscape = () => {
    try {
      setError(null);
      if (!input) {
        setOutput("");
        return;
      }
      setOutput(JSON.stringify(input));
    } catch (err: any) {
      setError(err.message || "Failed to escape input string.");
      setOutput("");
    }
  };

  // Unescape JSON stringified text back to raw format
  const handleUnescape = () => {
    try {
      setError(null);
      if (!input) {
        setOutput("");
        return;
      }
      const str = input.trim();
      if (str.startsWith('"') && str.endsWith('"')) {
        setOutput(JSON.parse(str));
      } else {
        setOutput(JSON.parse(`"${str}"`));
      }
    } catch (err: any) {
      // Fallback manual replacement if standard parsing fails
      try {
        const fallback = input
          .replace(/\\"/g, '"')
          .replace(/\\n/g, "\n")
          .replace(/\\r/g, "\r")
          .replace(/\\t/g, "\t")
          .replace(/\\\\/g, "\\");
        setOutput(fallback);
      } catch {
        setError(err.message || "Failed to unescape JSON string format.");
        setOutput("");
      }
    }
  };

  // Copy output to clipboard
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
    e.target.value = ""; // Reset file input
  };

  // Download output result
  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "json_escaped_result.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Clear input, output, and errors
  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
        <Quote className="w-6 h-6 text-primary-theme" />
        JSON Escape / Unescape
      </h2>
      <p className="text-sm md:text-base text-slate-500 mb-6">
        Escape special characters (quotes, backslashes) for inline string embedding or unescape stringified JSON.
      </p>

      {/* Main Grid: Input & Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">

            <span className="text-xs md:text-sm  flex font-bold text-slate-500 uppercase tracking-wider">
                          <FileCode className="w-3 h-3 md:w-5 md:h-5 text-primary-theme mr-4" /> 
              Input String
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
                 title="Upload File"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload
              </button>
              <button
                type="button"
                onClick={handleClear}
                   className="px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-red-500"   

               
                title="Clear Editor"
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
            <span className="text-xs md:text-sm flex mr-4 font-bold text-slate-500 uppercase tracking-wider">
                                        <FileCode className="w-3 h-3 md:w-5 md:h-5 text-primary-theme mr-4" /> 

              Result String
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

          <div className="h-[400px] p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-800 font-mono text-sm overflow-auto whitespace-pre">
            {error ? (
              <span className="text-red-500 font-semibold">{error}</span>
            ) : output ? (
              output
            ) : (
              <span className="text-slate-400 italic">Result will appear here...</span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={handleEscape}
          disabled={!input.trim()}
          className="bg-primary-theme hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Quote className="w-5 h-5" /> Escape JSON String
        </button>
        <button
          type="button"
          onClick={handleUnescape}
          disabled={!input.trim()}
          className="bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Quote className="w-5 h-5" /> Unescape JSON String
        </button>
      </div>
    </div>
  );
}