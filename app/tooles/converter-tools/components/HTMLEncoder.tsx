"use client";

import React, { useState } from "react";
import { Globe, Copy, Check, RefreshCw } from "lucide-react";

export default function HTMLEncoder() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleProcess = () => {
    if (mode === "encode") {
      const temp = document.createElement("div");
      temp.textContent = input;
      setOutput(temp.innerHTML);
    } else {
      const temp = document.createElement("div");
      temp.innerHTML = input;
      setOutput(temp.textContent || "");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <Globe className="w-6 h-6 text-primary-theme" />
        HTML Encoder / Decoder
      </h2>
      <p className="text-sm text-slate-500 mt-1">
        Safely encode HTML special characters into XML/HTML entities, or decode them back.
      </p>

      {/* Mode Switcher */}
      <div className="mt-6 flex bg-slate-100 p-1 rounded-xl">
        <button
          onClick={() => {
            setMode("encode");
            handleClear();
          }}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            mode === "encode" ? "bg-white text-primary-theme shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Encode Entities
        </button>
        <button
          onClick={() => {
            setMode("decode");
            handleClear();
          }}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
            mode === "decode" ? "bg-white text-primary-theme shadow-sm" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          Decode Entities
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Input */}
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Input Data
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "encode"
                ? "Enter raw text containing < > & \" etc..."
                : "Enter HTML encoded strings like &lt; &gt; &amp;..."
            }
            className="flex-1 min-h-[200px] p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-theme font-mono text-sm resize-none"
          />
        </div>

        {/* Output */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Output Result
            </span>
            {output && (
              <button
                onClick={handleCopy}
                className="text-xs text-slate-500 hover:text-primary-theme flex items-center gap-1 font-semibold transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Result
                  </>
                )}
              </button>
            )}
          </div>
          <div className="flex-1 min-h-[200px] p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-800 font-mono text-sm overflow-auto break-all whitespace-pre-wrap select-all">
            {output || (
              <span className="text-slate-400 italic">
                Converted result will appear here...
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handleProcess}
          disabled={!input.trim()}
          className="flex-1 bg-primary-theme hover:opacity-90 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-5 h-5" />
          Convert
        </button>
        <button
          onClick={handleClear}
          className="px-6 py-3 border border-slate-200 hover:bg-slate-50 font-semibold rounded-2xl transition text-slate-600 cursor-pointer"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
