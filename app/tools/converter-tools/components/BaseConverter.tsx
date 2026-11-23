"use client";

import React, { useState } from "react";
import { Hash, Copy, Check } from "lucide-react";

type BaseType = "dec" | "bin" | "oct" | "hex";

export default function BaseConverter() {
  const [val, setVal] = useState("10");
  const [base, setBase] = useState<BaseType>("dec");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Parse current value to decimal number
  const getDecimalValue = (): number => {
    if (!val.trim()) return 0;
    try {
      if (base === "bin") return parseInt(val, 2);
      if (base === "oct") return parseInt(val, 8);
      if (base === "hex") return parseInt(val, 16);
      return parseInt(val, 10);
    } catch {
      return 0;
    }
  };

  const decVal = getDecimalValue();

  const formats = {
    dec: isNaN(decVal) ? "0" : decVal.toString(10),
    bin: isNaN(decVal) ? "0" : decVal.toString(2),
    oct: isNaN(decVal) ? "0" : decVal.toString(8),
    hex: isNaN(decVal) ? "0" : decVal.toString(16).toUpperCase(),
  };

  const handleCopy = (field: BaseType) => {
    navigator.clipboard.writeText(formats[field]).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    });
  };

  const handleValChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    if (base === "bin") input = input.replace(/[^01]/g, "");
    if (base === "oct") input = input.replace(/[^0-7]/g, "");
    if (base === "hex") input = input.replace(/[^0-9a-fA-F]/g, "");
    if (base === "dec") input = input.replace(/[^0-9]/g, "");
    setVal(input);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <Hash className="w-6 h-6 text-primary-theme" />
        Number Base Converter
      </h2>
      <p className="text-sm text-slate-500 mt-1">
        Convert numbers between Decimal, Binary, Octal, and Hexadecimal instantly.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Input Control */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Select Input Base
            </label>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {(
                [
                  { label: "Dec", value: "dec" },
                  { label: "Bin", value: "bin" },
                  { label: "Oct", value: "oct" },
                  { label: "Hex", value: "hex" },
                ] as const
              ).map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    // Try to preserve value converting bases
                    const decimal = getDecimalValue();
                    setBase(item.value);
                    if (!isNaN(decimal)) {
                      setVal(
                        item.value === "hex"
                          ? decimal.toString(16).toUpperCase()
                          : decimal.toString(item.value === "bin" ? 2 : item.value === "oct" ? 8 : 10)
                      );
                    } else {
                      setVal("");
                    }
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    base === item.value
                      ? "bg-white text-primary-theme shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Number Value
            </label>
            <input
              type="text"
              value={val}
              onChange={handleValChange}
              placeholder="Enter number..."
              className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-800 focus:outline-none focus:border-primary-theme font-mono font-bold text-lg"
            />
          </div>
        </div>

        {/* Output values */}
        <div className="space-y-3">
          {(Object.keys(formats) as BaseType[]).map((field) => (
            <div key={field} className="flex flex-col border border-slate-100 p-3 bg-slate-50 rounded-xl">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {field === "dec"
                    ? "Decimal (Base 10)"
                    : field === "bin"
                    ? "Binary (Base 2)"
                    : field === "oct"
                    ? "Octal (Base 8)"
                    : "Hexadecimal (Base 16)"}
                </span>
                <button
                  onClick={() => handleCopy(field)}
                  className="text-xs text-slate-500 hover:text-primary-theme flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                >
                  {copiedField === field ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="text-sm font-bold text-slate-700 font-mono select-all">
                {formats[field] || "0"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
