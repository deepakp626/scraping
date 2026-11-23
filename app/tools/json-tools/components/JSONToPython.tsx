"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";

export default function JSONToPython() {
  const [input, setInput] = useState(`{\n  "user_id": 10,\n  "username": "py_dev",\n  "is_active": true\n}`);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const getPyType = (val: any): string => {
    if (val === null) return "Any";
    if (typeof val === "number") return Number.isInteger(val) ? "int" : "float";
    if (typeof val === "boolean") return "bool";
    if (Array.isArray(val)) return "list";
    return "str";
  };

  const handleConvert = () => {
    try {
      const parsed = JSON.parse(input);
      let py = `from dataclasses import dataclass\nfrom typing import Any\n\n@dataclass\nclass UserModel:\n`;
      for (const k in parsed) {
        const type = getPyType(parsed[k]);
        py += `    ${k}: ${type}\n`;
      }
      setOutput(py);
    } catch {
      setOutput("Error: Invalid JSON");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
        <Terminal className="w-6 h-6 text-primary-theme" />
        JSON to Python Dataclass
      </h2>
      <p className="text-sm text-slate-500 mb-6">Generate Python Dataclass / Pydantic model definitions from JSON.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[250px] p-4 border border-slate-200 rounded-2xl bg-slate-50 font-mono text-sm resize-none focus:outline-none focus:border-primary-theme"
        />
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Python Code</span>
            {output && (
              <button onClick={handleCopy} className="text-xs text-slate-600 hover:text-primary-theme flex items-center gap-1 font-semibold">
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />} Copy
              </button>
            )}
          </div>
          <div className="flex-1 min-h-[250px] p-4 border border-slate-200 rounded-2xl bg-slate-50 font-mono text-sm overflow-auto whitespace-pre">
            {output || <span className="text-slate-400 italic">Click Generate Python Model...</span>}
          </div>
        </div>
      </div>

      <button
        onClick={handleConvert}
        className="mt-6 w-full bg-primary-theme hover:opacity-90 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm cursor-pointer"
      >
        Generate Python Model
      </button>
    </div>
  );
}
