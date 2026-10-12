"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import {
  GitCompare,
  AlertCircle,
  Upload,
  Trash2,
  ArrowLeftRight,
  FileCode,
  Sparkles,
  Filter,
  PlusCircle,
  MinusCircle,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

interface DiffItem {
  path: string;
  type: "added" | "removed" | "changed" | "same";
  val1?: any;
  val2?: any;
}

export default function JSONCompare() {
  const [json1, setJson1] = useState<string>(
    `{\n  "name": "App",\n  "version": "1.0.0",\n  "port": 3000,\n  "features": ["auth", "billing"],\n  "meta": { "author": "Admin" }\n}`
  );
  const [json2, setJson2] = useState<string>(
    `{\n  "name": "App",\n  "version": "1.1.0",\n  "env": "production",\n  "features": ["auth", "billing", "analytics"],\n  "meta": { "author": "SuperAdmin" }\n}`
  );

  const [diffs, setDiffs] = useState<DiffItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "diffs" | "added" | "removed" | "changed">("all");

  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  // Deep recursive comparison helper
  const compareJSONDeep = useCallback((val1: any, val2: any, path = ""): DiffItem[] => {
    let results: DiffItem[] = [];
    const stringify = (v: any) => (v === undefined ? "undefined" : JSON.stringify(v));

    const isObject = (val: any) => val !== null && typeof val === "object";

    if (stringify(val1) === stringify(val2)) {
      results.push({ path: path || "root", type: "same", val1, val2 });
      return results;
    }

    if (isObject(val1) && isObject(val2) && Array.isArray(val1) === Array.isArray(val2)) {
      const keys = Array.from(new Set([...Object.keys(val1), ...Object.keys(val2)]));
      for (const key of keys) {
        const currentPath = path ? `${path}.${key}` : key;
        if (!(key in val1)) {
          results.push({ path: currentPath, type: "added", val2: val2[key] });
        } else if (!(key in val2)) {
          results.push({ path: currentPath, type: "removed", val1: val1[key] });
        } else if (isObject(val1[key]) && isObject(val2[key]) && Array.isArray(val1[key]) === Array.isArray(val2[key])) {
          results.push(...compareJSONDeep(val1[key], val2[key], currentPath));
        } else if (stringify(val1[key]) !== stringify(val2[key])) {
          results.push({ path: currentPath, type: "changed", val1: val1[key], val2: val2[key] });
        } else {
          results.push({ path: currentPath, type: "same", val1: val1[key], val2: val2[key] });
        }
      }
    } else {
      results.push({ path: path || "root", type: "changed", val1, val2 });
    }

    return results;
  }, []);

  // Live Auto Compare
  const handleCompare = useCallback(() => {
    if (!json1.trim() || !json2.trim()) {
      setDiffs(null);
      setError(null);
      return;
    }

    try {
      setError(null);
      const obj1 = JSON.parse(json1);
      const obj2 = JSON.parse(json2);
      const results = compareJSONDeep(obj1, obj2);
      setDiffs(results);
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax in one or both inputs.");
      setDiffs(null);
    }
  }, [json1, json2, compareJSONDeep]);

  useEffect(() => {
    handleCompare();
  }, [json1, json2, handleCompare]);

  // File Upload Handlers
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setTarget: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setTarget(content);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Swap Inputs
  const handleSwap = () => {
    const temp = json1;
    setJson1(json2);
    setJson2(temp);
  };

  // Prettify Format Handlers
  const handleFormat = (jsonStr: string, setTarget: (val: string) => void) => {
    try {
      const parsed = JSON.parse(jsonStr);
      setTarget(JSON.stringify(parsed, null, 2));
    } catch (err) {
      // Keep raw string if invalid
    }
  };

  // Filtered Diff Results
  const filteredDiffs = diffs?.filter((d) => {
    if (filter === "diffs") return d.type !== "same";
    if (filter === "added") return d.type === "added";
    if (filter === "removed") return d.type === "removed";
    if (filter === "changed") return d.type === "changed";
    return true;
  });

  // Diff Stats Summary
  const stats = {
    added: diffs?.filter((d) => d.type === "added").length || 0,
    removed: diffs?.filter((d) => d.type === "removed").length || 0,
    changed: diffs?.filter((d) => d.type === "changed").length || 0,
    same: diffs?.filter((d) => d.type === "same").length || 0,
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-6xl mx-auto">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef1}
        accept=".json,application/json"
        className="hidden"
        onChange={(e) => handleFileUpload(e, setJson1)}
      />
      <input
        type="file"
        ref={fileInputRef2}
        accept=".json,application/json"
        className="hidden"
        onChange={(e) => handleFileUpload(e, setJson2)}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
            <GitCompare className="w-7 h-7 text-primary-theme" />
            Advanced JSON Compare
          </h2>
          <p className="text-sm  md:text-base text-slate-500 mt-1">
            Deep-compare two JSON structures, upload files, and inspect additions, removals, and modifications.
          </p>
        </div>

        {/* Global Swap Control */}
        <button
          onClick={handleSwap}
          className="px-3.5 py-2 text-sm font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <ArrowLeftRight className="w-4 h-4 text-primary-theme" /> Swap Inputs
        </button>
      </div>

      {/* Code Editors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-6">
        {/* JSON Object 1 */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center h-10 mb-2">
            <label className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-4 h-4" /> Original JSON (Left)
            </label>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleFormat(json1, setJson1)}
                className="px-2 py-1 text-xs md:text-sm font-semibold text-slate-600 hover:text-primary-theme border border-slate-200 rounded-lg bg-white hover:bg-slate-50 flex items-center gap-1 cursor-pointer transition"
              >
                <Sparkles className="w-3 h-3" /> Format
              </button>
              <button
                onClick={() => fileInputRef1.current?.click()}
                className="px-2 py-1 text-xs md:text-sm font-semibold text-slate-600 hover:text-primary-theme border border-slate-200 rounded-lg bg-white hover:bg-slate-50 flex items-center gap-1 cursor-pointer transition"
              >
                <Upload className="w-3 h-3" /> Upload
              </button>
              <button
                onClick={() => setJson1("")}
                className="px-2 py-1 text-xs md:text-sm font-semibold text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg bg-white flex items-center gap-1 cursor-pointer transition"
              >
                <Trash2 className="w-3 h-3" /> Clear
              </button>
            </div>
          </div>

          <div className="h-[340px] border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
            <CodeMirror
              value={json1}
              height="340px"
              extensions={[json()]}
              onChange={(val) => setJson1(val)}
              className="text-sm font-mono h-full"
            />
          </div>
        </div>

        {/* JSON Object 2 */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center h-10 mb-2">
            <label className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <FileCode className="w-4 h-4" /> Target JSON (Right)
            </label>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleFormat(json2, setJson2)}
                className="px-2 py-1 text-xs md:text-sm font-semibold text-slate-600 hover:text-primary-theme border border-slate-200 rounded-lg bg-white hover:bg-slate-50 flex items-center gap-1 cursor-pointer transition"
              >
                <Sparkles className="w-3 h-3" /> Format
              </button>
              <button
                onClick={() => fileInputRef2.current?.click()}
                className="px-2 py-1 text-xs md:text-sm font-semibold text-slate-600 hover:text-primary-theme border border-slate-200 rounded-lg bg-white hover:bg-slate-50 flex items-center gap-1 cursor-pointer transition"
              >
                <Upload className="w-3 h-3" /> Upload
              </button>
              <button
                onClick={() => setJson2("")}
                className="px-2 py-1 text-xs md:text-sm font-semibold text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg bg-white flex items-center gap-1 cursor-pointer transition"
              >
                <Trash2 className="w-3 h-3" /> Clear
              </button>
            </div>
          </div>

          <div className="h-[340px] border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
            <CodeMirror
              value={json2}
              height="340px"
              extensions={[json()]}
              onChange={(val) => setJson2(val)}
              className="text-sm font-mono h-full"
            />
          </div>
        </div>
      </div>

      {/* Syntax Error Alert */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold mb-6 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Parsing Error</p>
            <p className="mt-0.5 text-xs text-rose-600">{error}</p>
          </div>
        </div>
      )}

      {/* Results Section */}
      {diffs && !error && (
        <div className="space-y-4">
          {/* Summary Badges & Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {/* Summary Stat Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
                <PlusCircle className="w-3.5 h-3.5" /> +{stats.added} Added
              </span>
              <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
                <MinusCircle className="w-3.5 h-3.5" /> -{stats.removed} Removed
              </span>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
                <RefreshCw className="w-3.5 h-3.5" /> ~{stats.changed} Changed
              </span>
              <span className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {stats.same} Identical
              </span>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
              {(["all", "diffs", "added", "removed", "changed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition cursor-pointer ${
                    filter === f
                      ? "bg-primary-theme text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Diff Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-[450px] overflow-y-auto">
            <table className="w-full text-left text-sm font-mono border-collapse">
              <thead className="bg-slate-100 text-slate-600 uppercase text-xs sticky top-0 z-10 border-b border-slate-200">
                <tr>
                  <th className="p-3">Status</th>
                  <th className="p-3">Object Path</th>
                  <th className="p-3">Left Value (JSON 1)</th>
                  <th className="p-3">Right Value (JSON 2)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredDiffs && filteredDiffs.length > 0 ? (
                  filteredDiffs.map((diff, index) => (
                    <tr
                      key={index}
                      className={
                        diff.type === "added"
                          ? "bg-emerald-50/70 text-emerald-950 hover:bg-emerald-100/60 transition"
                          : diff.type === "removed"
                          ? "bg-rose-50/70 text-rose-950 hover:bg-rose-100/60 transition"
                          : diff.type === "changed"
                          ? "bg-amber-50/70 text-amber-950 hover:bg-amber-100/60 transition"
                          : "text-slate-600 hover:bg-slate-50 transition"
                      }
                    >
                      <td className="p-3 font-semibold uppercase text-xs whitespace-nowrap">
                        {diff.type === "added" && <span className="text-emerald-700 font-bold flex items-center gap-1"><PlusCircle className="w-3.5 h-3.5" /> Added</span>}
                        {diff.type === "removed" && <span className="text-rose-700 font-bold flex items-center gap-1"><MinusCircle className="w-3.5 h-3.5" /> Removed</span>}
                        {diff.type === "changed" && <span className="text-amber-700 font-bold flex items-center gap-1"><RefreshCw className="w-3.5 h-3.5" /> Changed</span>}
                        {diff.type === "same" && <span className="text-slate-400">Identical</span>}
                      </td>
                      <td className="p-3 font-bold text-slate-800 break-all">{diff.path}</td>
                      <td className="p-3 max-w-xs break-all">
                        {diff.val1 !== undefined ? (
                          <span className="bg-white/80 px-2 py-1 rounded border border-slate-200/60 inline-block max-w-full overflow-x-auto">
                            {JSON.stringify(diff.val1)}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">-</span>
                        )}
                      </td>
                      <td className="p-3 max-w-xs break-all">
                        {diff.val2 !== undefined ? (
                          <span className="bg-white/80 px-2 py-1 rounded border border-slate-200/60 inline-block max-w-full overflow-x-auto">
                            {JSON.stringify(diff.val2)}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-400 italic text-sm">
                      No matching properties found for the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}