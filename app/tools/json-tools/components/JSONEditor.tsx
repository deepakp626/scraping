"use client";

import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import {
  Edit3,
  Copy,
  Check,
  Minimize2,
  Sparkles,
  Trash2,
  Upload,
  Download,
} from "lucide-react";

export default function JSONEditor() {
  const [content, setContent] = useState(
    `{\n  "title": "Sample Editor Data",\n  "status": "draft",\n  "views": 1250,\n  "tags": ["web", "tools", "editor"]\n}`
  );
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format / Beautify JSON
  const formatJSON = () => {
    try {
      setError(null);
      const parsed = JSON.parse(content);
      setContent(JSON.stringify(parsed, null, 2));
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  // Minify JSON
  const minifyJSON = () => {
    try {
      setError(null);
      const parsed = JSON.parse(content);
      setContent(JSON.stringify(parsed));
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  // Copy Content to Clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Upload JSON File
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const fileContent = event.target?.result as string;
        // Validate syntax on upload
        JSON.parse(fileContent);
        setContent(fileContent);
        setError(null);
      } catch (err: any) {
        setError(`Uploaded file has invalid JSON syntax: ${err.message}`);
      }
    };
    reader.readAsText(file);

    // Reset input value so re-uploading the same file works
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Download JSON File
  const handleDownload = () => {
    try {
      const blob = new Blob([content], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "data.json";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError("Failed to download JSON file.");
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json,application/json"
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
            <Edit3 className="w-6 h-6 text-primary-theme" />
            JSON Editor
          </h2>
          <p className="text-baes text-slate-500">
            Edit, format, upload, download, and manage JSON payloads seamlessly.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            title="Upload JSON File"
          >
            <Upload className="w-3.5 h-3.5" /> Upload
          </button>

          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
            title="Download JSON File"
          >
            <Download className="w-3.5 h-3.5" /> Download
          </button>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>

          <button
            onClick={() => {
              setContent("");
              setError(null);
            }}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-sm font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
          Syntax Error: {error}
        </div>
      )}

      {/* CodeMirror Container with Proper Font Styling */}
      <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 focus-within:border-primary-theme focus-within:ring-1 focus-within:ring-primary-theme transition-all">
        <CodeMirror
          value={content}
          height="320px"
          extensions={[json()]}
          placeholder="Paste or upload a JSON here..."
          onChange={(value) => {
            setContent(value);
            setError(null);
          }}
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: true,
          }}
          style={{ fontSize: "14px" }}
          className="font-mono text-slate-800"
        />
      </div>

      {/* Footer Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={formatJSON}
          className="flex-1 bg-primary-theme hover:opacity-90 text-white font-semibold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer text-base"
        >
          <Sparkles className="w-4 h-4" /> Format / Beautify
        </button>
        <button
          onClick={minifyJSON}
          className="flex-1 bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer text-base"
        >
          <Minimize2 className="w-4 h-4" /> Minify JSON
        </button>
      </div>
    </div>
  );
}