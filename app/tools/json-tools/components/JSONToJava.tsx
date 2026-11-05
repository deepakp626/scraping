"use client";

import React, { useState } from "react";
import { Coffee, Copy, Check } from "lucide-react";

export default function JSONToJava() {
  const [input, setInput] = useState(`{\n  "id": 101,\n  "productName": "Wireless Mouse",\n  "price": 29.99,\n  "inStock": true,\n  "categories": ["Electronics", "Accessories"]\n}`);
  const [className, setClassName] = useState("Product");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getJavaType = (val: any): string => {
    if (typeof val === "number") return Number.isInteger(val) ? "int" : "double";
    if (typeof val === "boolean") return "boolean";
    if (Array.isArray(val)) return `List<${val.length > 0 ? getJavaType(val[0]) : "Object"}>`;
    if (typeof val === "object" && val !== null) return "Object";
    return "String";
  };

  const handleConvert = () => {
    try {
      setError(null);
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        throw new Error("Input must be a JSON object.");
      }

      const name = className.trim() || "MyClass";
      let code = `import java.util.List;\n\npublic class ${name} {\n`;

      for (const key of Object.keys(parsed)) {
        const type = getJavaType(parsed[key]);
        code += `    private ${type} ${key};\n`;
      }

      code += `\n    // Getters and Setters...\n`;
      for (const key of Object.keys(parsed)) {
        const type = getJavaType(parsed[key]);
        const cap = key.charAt(0).toUpperCase() + key.slice(1);
        code += `\n    public ${type} get${cap}() { return ${key}; }\n`;
        code += `    public void set${cap}(${type} ${key}) { this.${key} = ${key}; }\n`;
      }

      code += `}\n`;
      setOutput(code);
    } catch (err: any) {
      setError(err.message || "Invalid JSON input");
      setOutput("");
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
        <Coffee className="w-6 h-6 text-primary-theme" />
        JSON to Java POJO
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Generate Java POJO classes with private fields, getters, and setters from JSON payloads.
      </p>

      <div className="mb-4">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 block">Class Name</label>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          className="w-full max-w-xs p-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 font-mono text-sm focus:outline-none focus:border-primary-theme"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">JSON Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 min-h-[250px] p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-800 font-mono text-sm resize-none focus:outline-none focus:border-primary-theme"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Java Code Output</span>
            {output && (
              <button
                onClick={handleCopy}
                className="text-xs text-slate-600 hover:text-primary-theme flex items-center gap-1 font-semibold cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Code"}
              </button>
            )}
          </div>
          <div className="flex-1 min-h-[250px] p-4 border border-slate-200 rounded-2xl bg-slate-50 text-slate-800 font-mono text-sm overflow-auto whitespace-pre">
            {error ? (
              <span className="text-red-500 font-semibold">{error}</span>
            ) : output ? (
              output
            ) : (
              <span className="text-slate-400 italic">Click Generate Java POJO...</span>
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
          <Coffee className="w-5 h-5" /> Generate Java Class
        </button>
      </div>
    </div>
  );
}
