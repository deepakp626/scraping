"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { Eye, Upload, Code2, GitBranch } from "lucide-react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { foldAll, foldGutter, codeFolding } from "@codemirror/language";
import { githubLight } from "@uiw/codemirror-theme-github";
import { EditorView as CMEditorView } from "@codemirror/view";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";

// ─── Default Sample JSON ───────────────────────────────────────────────────────

const DEFAULT_JSON = `{
  "user": {
    "id": 1001,
    "name": "Sarah Connor",
    "email": "sarah@example.com",
    "roles": ["admin", "editor"],
    "details": {
      "verified": true,
      "score": 98.5,
      "tags": ["typescript", "react", "nextjs"]
    }
  },
  "meta": {
    "created": "2025-01-01",
    "active": true,
    "count": 42
  }
}`;

const BOX_HEIGHT = "450px";

// ─── JSON View (pretty-printed, read-only CodeMirror) ─────────────────────────

function JSONView({ value, error }: { value: string; error: string | null }) {
  if (error) {
    return (
      <div className="flex items-start gap-2 text-red-500 text-sm font-medium p-4 h-full min-h-[450px]">
        <span>⚠</span><span>{error}</span>
      </div>
    );
  }
  if (!value.trim()) {
    return <span className="text-slate-400 italic text-sm p-4 block h-full min-h-[450px]">Enter valid JSON to see the formatted view…</span>;
  }
  return (
    <CodeMirror
      value={value}
      height={BOX_HEIGHT}
      extensions={[json(), CMEditorView.editable.of(false), CMEditorView.lineWrapping]}
      theme={githubLight}
      editable={false}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: false,
        autocompletion: false,
        closeBrackets: false,
        history: false,
        searchKeymap: false,
      }}
    />
  );
}

// ─── Tree View (foldable read-only CodeMirror) ────────────────────────────────

function TreeView({ value, error }: { value: string; error: string | null }) {
  const treeRef = useRef<{ view: CMEditorView } | null>(null);

  useEffect(() => {
    if (!error && treeRef.current?.view) {
      setTimeout(() => {
        foldAll(treeRef.current!.view);
      }, 60);
    }
  }, [value, error]);

  if (error) {
    return (
      <div className="flex items-start gap-2 text-red-500 text-sm font-medium p-4 h-full min-h-[450px]">
        <span>⚠</span><span>{error}</span>
      </div>
    );
  }
  if (!value.trim()) {
    return <span className="text-slate-400 italic text-sm p-4 block h-full min-h-[450px]">Enter valid JSON to inspect the tree…</span>;
  }

  return (
    <CodeMirror
      ref={treeRef as any}
      value={value}
      height={BOX_HEIGHT}
      extensions={[
        json(),
        foldGutter(),
        codeFolding(),
        CMEditorView.editable.of(false),
        CMEditorView.lineWrapping,
        keymap.of(defaultKeymap),
      ]}
      theme={githubLight}
      editable={false}
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: false,
        autocompletion: false,
        closeBrackets: false,
        history: false,
        searchKeymap: false,
      }}
    />
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
        active
          ? "bg-white text-slate-800 shadow-sm border border-slate-200"
          : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

type ViewTab = "json" | "tree";

export default function JSONViewer() {
  const [code, setCode] = useState(DEFAULT_JSON);
  const [prettyJSON, setPrettyJSON] = useState(() => {
    try { return JSON.stringify(JSON.parse(DEFAULT_JSON), null, 2); }
    catch { return ""; }
  });
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ViewTab>("tree");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processJSON = useCallback((val: string) => {
    setCode(val);
    if (!val.trim()) { setPrettyJSON(""); setError(null); return; }
    try {
      const parsed = JSON.parse(val);
      setPrettyJSON(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message ?? "Invalid JSON");
      setPrettyJSON("");
    }
  }, []);

  const handleEditorChange = useCallback((val: string) => {
    setUploadedFileName(null);
    processJSON(val);
  }, [processJSON]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".json")) {
      setError("Please upload a valid .json file.");
      return;
    }
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      processJSON(text);
    };
    reader.readAsText(file);
    e.target.value = "";
  }, [processJSON]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-8xl mx-auto">
      {/* Header */}
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
        <Eye className="w-6 h-6 text-primary-theme" />
        Interactive JSON Viewer
      </h2>
      <p className="text-lg text-slate-500 mb-6">
        Paste JSON, type it directly, or upload a <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">.json</code> file — the viewer updates in real time.
      </p>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

        {/* ── LEFT: JSON Input ──────────────────────────────────────── */}
        <div className="flex flex-col">
          {/* Input header row */}
          <div className="flex items-center justify-between mb-2 h-9">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              JSON Input
            </label>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload .json
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          {/* Uploaded file badge */}
          {uploadedFileName && (
            <div className="flex items-center gap-1.5 mb-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5">
              <Upload className="w-3 h-3" />
              <span className="font-medium truncate">{uploadedFileName}</span>
            </div>
          )}

          {/* CodeMirror editor */}
          <div
            className={`rounded-2xl overflow-hidden border text-sm ${
              error ? "border-red-400" : "border-slate-200"
            }`}
          >
            <CodeMirror
              value={code}
              height={BOX_HEIGHT}
              extensions={[json()]}
              theme={githubLight}
              onChange={handleEditorChange}
              basicSetup={{
                lineNumbers: true,
                foldGutter: true,
                highlightActiveLine: true,
                autocompletion: true,
              }}
            />
          </div>

          {/* Error banner */}
          {error && (
            <p className="mt-2 text-xs text-red-500 font-medium bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              ⚠ {error}
            </p>
          )}
        </div>

        {/* ── RIGHT: Tabbed Viewer ──────────────────────────────────── */}
        <div className="flex flex-col">
          {/* Tab header */}
          <div className="flex items-center justify-between mb-2 h-9">
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-2xl p-1">
              <TabButton
                active={activeTab === "json"}
                onClick={() => setActiveTab("json")}
                icon={<Code2 className="w-3.5 h-3.5" />}
                label="JSON View"
              />
              <TabButton
                active={activeTab === "tree"}
                onClick={() => setActiveTab("tree")}
                icon={<GitBranch className="w-3.5 h-3.5" />}
                label="Tree View"
              />
            </div>

            {/* Tab hint */}
            {activeTab === "tree" && !error && prettyJSON && (
              <p className="text-xs text-slate-400 hidden sm:block">
                Click <span className="font-mono">▶</span> to fold / unfold
              </p>
            )}
          </div>

          {/* Panel */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white text-sm">
            {activeTab === "json" ? (
              <JSONView value={prettyJSON} error={error} />
            ) : (
              <TreeView value={prettyJSON} error={error} />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}