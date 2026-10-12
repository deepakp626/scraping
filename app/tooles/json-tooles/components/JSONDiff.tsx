"use client";

import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { create } from "jsondiffpatch";
import * as htmlFormatter from "jsondiffpatch/formatters/html";
import "../../../../jsondiffpatch.css";
import {
  GitCompare,
  Copy,
  Check,
  Upload,
  Sparkles,
  Trash2,
  ArrowLeftRight,
  FileCode,
  AlertCircle,
  Eye,
  Plus,
  Minus,
  RefreshCw,
  MoveRight,
  CheckCircle2,
  SlidersHorizontal,
  Info,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
interface DiffStats {
  added: number;
  deleted: number;
  modified: number;
  moved: number;
  unchanged: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function countDeltaStats(delta: any): DiffStats {
  const stats: DiffStats = { added: 0, deleted: 0, modified: 0, moved: 0, unchanged: 0 };
  if (!delta) return stats;

  function walk(d: any) {
    if (!d || typeof d !== "object") return;

    // Array with two elements → modified
    if (Array.isArray(d)) {
      if (d.length === 1) stats.added++;
      else if (d.length === 2) stats.modified++;
      else if (d.length === 3 && d[2] === 0) stats.deleted++;
      else if (d.length === 3 && d[2] === 3) stats.moved++;
      return;
    }

    // jsondiffpatch uses _t: 'a' for array deltas
    const keys = Object.keys(d).filter((k) => k !== "_t");
    for (const k of keys) {
      const v = d[k];
      if (Array.isArray(v)) {
        if (v.length === 1) stats.added++;
        else if (v.length === 2) stats.modified++;
        else if (v.length === 3 && v[2] === 0) stats.deleted++;
        else if (v.length === 3 && v[2] === 3) stats.moved++;
      } else if (v && typeof v === "object") {
        walk(v);
      }
    }
  }
  walk(delta);
  return stats;
}

const diffpatcher = create({
  objectHash: (obj: any) => obj.id || obj._id || JSON.stringify(obj),
  arrays: { detectMove: true },
});

// ── Component ─────────────────────────────────────────────────────────────────
export default function JSONDiff() {
  const [left, setLeft] = useState<string>(
    `{\n  "version": 1,\n  "name": "App",\n  "author": "Alice",\n  "settings": {\n    "theme": "light",\n    "language": "en"\n  },\n  "tags": ["stable", "v1"]\n}`
  );
  const [right, setRight] = useState<string>(
    `{\n  "version": 2,\n  "name": "App",\n  "newProp": true,\n  "settings": {\n    "theme": "dark",\n    "language": "en",\n    "debugMode": false\n  },\n  "tags": ["beta", "v2"]\n}`
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [showUnchanged, setShowUnchanged] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRefLeft = useRef<HTMLInputElement>(null);
  const fileInputRefRight = useRef<HTMLInputElement>(null);

  // ── Diff computation ───────────────────────────────────────────────────────
  const { htmlDiff, delta, stats } = useMemo(() => {
    if (!left.trim() || !right.trim()) {
      return { htmlDiff: "", delta: null, stats: null };
    }
    try {
      const o1 = JSON.parse(left);
      const o2 = JSON.parse(right);
      const d = diffpatcher.diff(o1, o2);

      if (!d) {
        return { htmlDiff: "identical", delta: null, stats: countDeltaStats(null) };
      }

      htmlFormatter.showUnchanged(showUnchanged, null, 0.5);
      const html = htmlFormatter.format(d, o1) || "";
      return { htmlDiff: html, delta: d, stats: countDeltaStats(d) };
    } catch {
      return { htmlDiff: "", delta: null, stats: null };
    }
  }, [left, right, showUnchanged]);

  // ── Error detection (separate from useMemo) ────────────────────────────────
  useEffect(() => {
    if (!left.trim() && !right.trim()) { setError(null); return; }
    try { if (left.trim()) JSON.parse(left); } catch (e: any) {
      setError(`Left JSON: ${e.message}`); return;
    }
    try { if (right.trim()) JSON.parse(right); } catch (e: any) {
      setError(`Right JSON: ${e.message}`); return;
    }
    setError(null);
  }, [left, right]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, setTarget: (v: string) => void) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => setTarget(ev.target?.result as string);
      reader.readAsText(file);
      e.target.value = "";
    },
    []
  );

  const handleFormat = useCallback((jsonStr: string, setTarget: (v: string) => void) => {
    try { setTarget(JSON.stringify(JSON.parse(jsonStr), null, 2)); } catch {}
  }, []);

  const handleSwap = useCallback(() => {
    setLeft((l) => { setRight(l); return right; });
  }, [right]);

  const handleCopy = useCallback(() => {
    if (!delta) return;
    navigator.clipboard.writeText(JSON.stringify(delta, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [delta]);

  // Keyboard shortcut: Ctrl+Enter to format both sides
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        handleFormat(left, setLeft);
        handleFormat(right, setRight);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [left, right, handleFormat]);

  // ── Stat badges config ─────────────────────────────────────────────────────
  const statBadges = stats
    ? [
        { label: "Added", count: stats.added, icon: Plus, color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
        { label: "Deleted", count: stats.deleted, icon: Minus, color: "text-red-700 bg-red-50 border-red-200" },
        { label: "Modified", count: stats.modified, icon: RefreshCw, color: "text-amber-700 bg-amber-50 border-amber-200" },
        { label: "Moved", count: stats.moved, icon: MoveRight, color: "text-violet-700 bg-violet-50 border-violet-200" },
      ]
    : [];

  const isIdentical = htmlDiff === "identical";
  const hasOutput = !error && (isIdentical || (htmlDiff && htmlDiff !== "identical"));
  const isEmpty = !left.trim() && !right.trim();

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-6xl mx-auto">
      {/* Hidden File Inputs */}
      <input type="file" ref={fileInputRefLeft} accept=".json,application/json" className="hidden"
        onChange={(e) => handleFileUpload(e, setLeft)} />
      <input type="file" ref={fileInputRefRight} accept=".json,application/json" className="hidden"
        onChange={(e) => handleFileUpload(e, setRight)} />

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
            <GitCompare className="w-6 h-6 text-primary-theme" />
            JSON Visual Diff
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-1 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-primary-theme" />
            Live structural diff &mdash; press{" "}
            <kbd className="px-1.5 py-0.5 text-xs font-mono bg-primary-theme/10 border border-primary-theme/30 text-primary-theme rounded">
              Ctrl+Enter
            </kbd>{" "}
            to auto-format both sides
          </p>
        </div>

        <button onClick={handleSwap}
          className="px-3.5 py-2 text-sm font-semibold rounded-xl border   hover:bg-primary-theme/10 flex items-center gap-1.5 transition cursor-pointer shrink-0 self-start sm:self-auto">
          <ArrowLeftRight className="w-4 h-4 text-primary-theme" /> Swap Inputs
        </button>
      </div>

      {/* ── Editors Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch mb-5">
        {/* Left */}
        <EditorPanel
          label="Original JSON"
          side="left"
          value={left}
          onChange={setLeft}
          onFormat={() => handleFormat(left, setLeft)}
          onUpload={() => fileInputRefLeft.current?.click()}
          onClear={() => setLeft("")}
        />
        {/* Right */}
        <EditorPanel
          label="Modified JSON"
          side="right"
          value={right}
          onChange={setRight}
          onFormat={() => handleFormat(right, setRight)}
          onUpload={() => fileInputRefRight.current?.click()}
          onClear={() => setRight("")}
        />
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs md:text-sm font-semibold mb-5 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold">JSON Syntax Error</p>
            <p className="mt-0.5 text-xs text-rose-600 font-mono">{error}</p>
          </div>
        </div>
      )}

      {/* ── Empty state ── */}
      {isEmpty && !error && (
        <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-sm gap-2 border border-dashed border-primary-theme/20 rounded-2xl bg-primary-theme/5">
          <GitCompare className="w-10 h-10 text-primary-theme opacity-40" />
          <p className="text-sm font-semibold text-slate-500">Paste or upload two JSON objects to compare</p>
          <p className="text-xs text-slate-400">Differences will appear here in real-time</p>
        </div>
      )}

      {/* ── Identical ── */}
      {isIdentical && !error && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <div>
            <p className="font-bold text-sm">No differences detected</p>
            <p className="text-xs text-emerald-600 mt-0.5">Both JSON objects are structurally identical.</p>
          </div>
        </div>
      )}

      {/* ── Diff Output ── */}
      {hasOutput && !isIdentical && !error && (
        <div className="flex flex-col gap-3">
          {/* Toolbar row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-primary-theme uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-primary-theme" /> Delta Report
              </span>
              {/* Stat badges */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {statBadges.map(({ label, count, icon: Icon, color }) =>
                  count > 0 ? (
                    <span key={label}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${color}`}>
                      <Icon className="w-3 h-3" />
                      {count} {label}
                    </span>
                  ) : null
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Toggle unchanged */}
              <button onClick={() => setShowUnchanged((v) => !v)}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-xl border flex items-center gap-1.5 transition cursor-pointer
                  ${showUnchanged
                    ? "bg-primary-theme/10 border-primary-theme/40 text-primary-theme"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-primary-theme/5 hover:border-primary-theme/20 hover:text-primary-theme"}`}>
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {showUnchanged ? "Hide Unchanged" : "Show Unchanged"}
              </button>

              {/* Copy delta */}
              <button onClick={handleCopy} disabled={!delta}
                className="px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-primary-theme/30 bg-primary-theme/5 text-primary-theme hover:bg-primary-theme/10 flex items-center gap-1.5 transition cursor-pointer disabled:opacity-40">
                {copied
                  ? <><Check className="w-3.5 h-3.5" /> Copied!</>
                  : <><Copy className="w-3.5 h-3.5" /> Copy Delta JSON</>}
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 px-1">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-400" /> Added
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-red-400" /> Deleted
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-amber-400" /> Modified
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-sm bg-violet-400" /> Moved
            </span>
          </div>

          {/* Diff output */}
          <div
            className="jsondiffpatch-wrapper border border-primary-theme/20 rounded-2xl p-5 bg-slate-50 overflow-x-auto text-xs md:text-sm max-h-[520px] overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: htmlDiff }}
          />
        </div>
      )}
    </div>
  );
}

// ── Editor Panel Sub-component ────────────────────────────────────────────────
interface EditorPanelProps {
  label: string;
  side: "left" | "right";
  value: string;
  onChange: (v: string) => void;
  onFormat: () => void;
  onUpload: () => void;
  onClear: () => void;
}

function EditorPanel({ label, side, value, onChange, onFormat, onUpload, onClear }: EditorPanelProps) {
  // Determine inline validity for the status line
  const validity = value.trim()
    ? (() => { try { JSON.parse(value); return { ok: true, msg: "✓ Valid JSON" }; } catch (e: any) { return { ok: false, msg: `✗ ${e.message}` }; } })()
    : null;

  return (
    <div className="flex flex-col">
      {/* Label + action buttons */}
      <div className="flex justify-between items-center h-10 mb-2">
        <label className="text-xs font-bold  uppercase tracking-wider flex items-center gap-1.5">
          <FileCode className="w-5 h-5 text-primary-theme" />
          {label}
        </label>
        <div className="flex items-center gap-1.5">
          <button onClick={onFormat}
            className="px-2.5 py-1 text-xs md:text-sm font-semibold text-slate-600 hover:text-primary-theme border border-slate-200 hover:border-primary-theme/30 rounded-lg bg-white hover:bg-primary-theme/5 flex items-center gap-1 cursor-pointer transition">
            <Sparkles className="w-5 h-3.5" /> Format
          </button>
          <button onClick={onUpload}
            className="px-2.5 py-1 text-xs   md:text-sm font-semibold text-slate-600 hover:text-primary-theme border border-slate-200 hover:border-primary-theme/30 rounded-lg bg-white hover:bg-primary-theme/5 flex items-center gap-1 cursor-pointer transition">
            <Upload className="w-3.5 h-3.5" /> Upload
          </button>
          <button onClick={onClear}
            className="px-2.5 py-1 text-xs  md:text-sm  font-semibold text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg bg-white flex items-center gap-1 cursor-pointer transition">
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="h-[300px] border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary-theme/50 transition-shadow">
        <CodeMirror
          value={value}
          height="300px"
          extensions={[json()]}
          onChange={onChange}
          className="text-sm font-mono h-full"
        />
      </div>

      {/* Validity hint */}
      <p className={`mt-1.5 text-xs px-1 font-medium ${
        validity === null
          ? "text-slate-400"
          : validity.ok
          ? "text-emerald-600"
          : "text-rose-500"
      }`}>
        {validity ? validity.msg : "Empty — paste JSON to begin"}
      </p>
    </div>
  );
}