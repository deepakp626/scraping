"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Copy, Check, Download, Upload, Trash2 } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

export default function JSONMockGenerator() {
  const [template, setTemplate] = useState<"users" | "products" | "orders">("users");
  const [count, setCount] = useState<number>(5);
  const [output, setOutput] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const actionBtnClass =
    "px-2.5 py-1.5 text-xs md:text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer hover:text-primary-theme";

  const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Sam", "Chris", "Pat", "Riley"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis"];
  const domains = ["gmail.com", "example.io", "company.org", "dev.co"];
  const productNames = [
    "Wireless Headphones",
    "Ergonomic Chair",
    "4K Monitor",
    "Mechanical Keyboard",
    "USB-C Hub",
  ];
  const categories = ["Electronics", "Office", "Audio", "Accessories"];

  const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  const generateMock = () => {
    const list = [];
    for (let i = 1; i <= count; i++) {
      if (template === "users") {
        const fn = getRandom(firstNames);
        const ln = getRandom(lastNames);
        list.push({
          id: 1000 + i,
          name: `${fn} ${ln}`,
          email: `${fn.toLowerCase()}.${ln.toLowerCase()}@${getRandom(domains)}`,
          role: i === 1 ? "admin" : "user",
          active: Math.random() > 0.2,
          createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        });
      } else if (template === "products") {
        list.push({
          id: `prod_${100 + i}`,
          title: getRandom(productNames),
          category: getRandom(categories),
          price: Number((Math.random() * 200 + 10).toFixed(2)),
          stock: Math.floor(Math.random() * 50) + 5,
          rating: Number((Math.random() * 2 + 3).toFixed(1)),
        });
      } else if (template === "orders") {
        list.push({
          orderId: `ORD-${202600 + i}`,
          customer: `${getRandom(firstNames)} ${getRandom(lastNames)}`,
          amount: Number((Math.random() * 500 + 20).toFixed(2)),
          status: getRandom(["pending", "completed", "shipped", "cancelled"]),
          itemsCount: Math.floor(Math.random() * 4) + 1,
        });
      }
    }
    setOutput(JSON.stringify(list, null, 2));
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `mock_${template}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        setOutput(JSON.stringify(parsed, null, 2));
      } catch (err) {
        alert("Invalid JSON file provided.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleClear = () => {
    setOutput("");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto">
      {/* Hidden File Input for JSON Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json,application/json"
        className="hidden"
      />

      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
        <Sparkles className="w-6 h-6 text-primary-theme" />
        JSON Mock Data Generator
      </h2>
      <p className="text-sm md:text-base text-slate-500 mb-6">
        Generate realistic dummy JSON datasets for API testing, design mockups, and prototyping.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
            Data Model
          </label>
          <select
            value={template}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setTemplate(e.target.value as "users" | "products" | "orders")
            }
            className="w-full p-2.5 border border-slate-200 rounded-xl bg-white text-slate-800 font-semibold text-sm focus:outline-none focus:border-primary-theme cursor-pointer"
          >
            <option value="users">User Accounts Array</option>
            <option value="products">E-Commerce Products Array</option>
            <option value="orders">Store Orders Array</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
            Item Count ({count})
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-theme mt-3"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
        <span className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
          Generated Mock Payload
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button onClick={handleUploadClick} className={actionBtnClass}>
            <Upload className="w-3.5 h-3.5" /> Upload
          </button>

          {output && (
            <>
              <button onClick={handleCopy} className={actionBtnClass}>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-green-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>

              <button onClick={handleDownload} className={actionBtnClass}>
                <Download className="w-3.5 h-3.5" /> Download
              </button>

              <button
                onClick={handleClear}
                className={`${actionBtnClass} text-red-500 hover:text-red-600 hover:bg-red-50`}
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </>
          )}
        </div>
      </div>

      <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6 bg-slate-50 text-sm">
        <CodeMirror
          value={output}
          height="280px"
          extensions={[json()]}
          onChange={(value) => setOutput(value)}
          placeholder="Click Generate Mock Data or upload a JSON file to preview dataset..."
          basicSetup={{
            lineNumbers: true,
            foldGutter: true,
            dropCursor: false,
            allowMultipleSelections: false,
            indentOnInput: false,
          }}
          className="text-sm font-mono"
        />
      </div>

      <button
        onClick={generateMock}
        className="w-full bg-primary-theme hover:opacity-90 text-white font-semibold py-3 px-6 rounded-2xl transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
      >
        <Sparkles className="w-5 h-5" /> Generate Mock Data Array
      </button>
    </div>
  );
}