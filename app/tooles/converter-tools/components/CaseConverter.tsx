"use client";

import React, { useState } from "react";
import { Sigma, Copy, Check } from "lucide-react";

type CaseType = "upper" | "lower" | "title" | "sentence" | "camel" | "snake";

export default function CaseConverter() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const convertCase = (type: CaseType) => {
    if (!input.trim()) return "";
    switch (type) {
      case "upper":
        return input.toUpperCase();
      case "lower":
        return input.toLowerCase();
      case "title":
        return input.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
        );
      case "sentence":
        return input.toLowerCase().replace(/(^\s*|[.!?]\s+)(.)/g, (m, p1, p2) => p1 + p2.toUpperCase());
      case "camel":
        return input
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase())
          .replace(/^(.)/, (m, chr) => chr.toLowerCase());
      case "snake":
        return input
          .replace(/\s+/g, "_")
          .replace(/([a-z])([A-Z])/g, "$1_$2")
          .toLowerCase();
      default:
        return input;
    }
  };

  const handleApplyCase = (type: CaseType) => {
    const converted = convertCase(type);
    setInput(converted);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <Sigma className="w-6 h-6 text-primary-theme" />
        Case Converter
      </h2>
      <p className="text-sm text-slate-500 mt-1">
        Convert your text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, or snake_case instantly.
      </p>

      <div className="mt-6 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Your Text
          </label>
          {input && (
            <button
              onClick={handleCopy}
              className="text-xs text-slate-500 hover:text-primary-theme flex items-center gap-1 font-semibold transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  Copied Text
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Text
                </>
              )}
            </button>
          )}
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste or type your text here to convert..."
          className="w-full min-h-[200px] p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-theme text-sm resize-none"
        />
      </div>

      {/* Case Options */}
      <div className="mt-6">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">
          Select Target Case
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {(
            [
              { label: "UPPER CASE", type: "upper" },
              { label: "lower case", type: "lower" },
              { label: "Title Case", type: "title" },
              { label: "Sentence case", type: "sentence" },
              { label: "camelCase", type: "camel" },
              { label: "snake_case", type: "snake" },
            ] as const
          ).map((item) => (
            <button
              key={item.type}
              onClick={() => handleApplyCase(item.type)}
              disabled={!input.trim()}
              className="py-2.5 px-4 border border-slate-200 hover:border-primary-theme hover:bg-primary-theme/5 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-slate-200 text-sm font-semibold rounded-xl text-slate-700 hover:text-primary-theme transition-all cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setInput("")}
          className="flex-1 py-3 border border-slate-200 hover:bg-slate-50 font-semibold rounded-2xl transition text-slate-600 cursor-pointer"
        >
          Clear Text
        </button>
      </div>
    </div>
  );
}
