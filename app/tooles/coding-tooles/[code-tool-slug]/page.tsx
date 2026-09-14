"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  Terminal, 
  Play, 
  SquareCode, 
  Code, 
  Cpu, 
  Coffee, 
  Zap, 
  Hammer, 
  Gem, 
  Hash, 
  Feather, 
  Layers, 
  Database,
  FileJson,
  FileCode,
  Palette,
  BookOpen,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  Lightbulb,
  CheckCircle2,
  Keyboard
} from "lucide-react";
// import { CodeRunEditor } from "../components";
import { MonacoCodeRunEditor } from "../monaco-components";
import { LANGUAGES, getLanguage } from "../lib/languages";

/**
 * Intelligent Language Detector
 * Normalizes incoming URL slug and maps it to the supported language ID.
 */
function detectLanguageFromSlug(rawSlug: string): string {
  if (!rawSlug) return "python";
  
  let slug = "";
  try {
    slug = decodeURIComponent(rawSlug).toLowerCase().trim();
  } catch {
    slug = rawSlug.toLowerCase().trim();
  }

  // 1. Direct match in LANGUAGES
  if (LANGUAGES[slug]) {
    return slug;
  }

  // 2. Comprehensive alias dictionary
  const aliasMap: Record<string, string> = {
    // Python
    py: "python",
    python3: "python",
    "python-playground": "python",
    "python-runner": "python",
    "python-compiler": "python",
    "python-online-compiler": "python",
    "python-editor": "python",

    // JavaScript
    js: "javascript",
    node: "javascript",
    nodejs: "javascript",
    "js-runner": "javascript",
    "javascript-runner": "javascript",
    "javascript-playground": "javascript",
    "node-runner": "javascript",

    // TypeScript
    ts: "typescript",
    "ts-playground": "typescript",
    "typescript-playground": "typescript",
    "ts-runner": "typescript",

    // C++
    cpp: "cpp",
    "c++": "cpp",
    cplusplus: "cpp",
    "c-plus-plus": "cpp",
    "cpp-playground": "cpp",
    "cpp-compiler": "cpp",

    // C
    c: "c",
    clang: "c",
    gcc: "c",
    "c-playground": "c",
    "c-compiler": "c",

    // C#
    cs: "csharp",
    "c#": "csharp",
    csharp: "csharp",
    "c-sharp": "csharp",
    "csharp-playground": "csharp",
    "csharp-compiler": "csharp",

    // Java
    java: "java",
    "java-playground": "java",
    "java-runner": "java",
    "java-compiler": "java",

    // Go
    go: "go",
    golang: "go",
    "go-playground": "go",
    "golang-playground": "go",

    // Rust
    rust: "rust",
    rs: "rust",
    "rust-compiler": "rust",
    "rust-playground": "rust",

    // PHP
    php: "php",
    "php-playground": "php",
    "php-runner": "php",

    // Ruby
    ruby: "ruby",
    rb: "ruby",
    "ruby-playground": "ruby",
    "ruby-runner": "ruby",

    // Kotlin
    kotlin: "kotlin",
    kt: "kotlin",
    "kotlin-playground": "kotlin",

    // Swift
    swift: "swift",
    "swift-playground": "swift",

    // Bash
    bash: "bash",
    sh: "bash",
    shell: "bash",
    "bash-shell-runner": "bash",
    "bash-runner": "bash",
    "shell-runner": "bash",

    // SQL
    sql: "sql",
    mysql: "sql",
    postgres: "sql",
    postgresql: "sql",
    sqlite: "sql",
    "sql-formatter": "sql",
    "sql-playground": "sql",

    // Web & Markup
    html: "html",
    htm: "html",
    "html-beautifier": "html",
    css: "css",
    "css-formatter": "css",
    json: "json",
    "json-formatter": "json",
    "json-formatter-validator": "json",
    "json-to-yaml": "json",
    xml: "xml",
    "xml-parser": "xml",
    "xml-parser-formatter": "xml",
    yaml: "yaml",
    yml: "yaml",
    "yaml-formatter": "yaml",
    "yaml-to-json": "yaml",
    markdown: "markdown",
    md: "markdown",
    "markdown-editor": "markdown",

    // Scripting & Others
    r: "r",
    "r-lang": "r",
    "r-playground": "r",
    scala: "scala",
    "scala-playground": "scala",
    lua: "lua",
    "lua-playground": "lua",
    haskell: "haskell",
    hs: "haskell",
    "haskell-playground": "haskell",
    dart: "dart",
    "dart-playground": "dart",
    perl: "perl",
    pl: "perl",
    "perl-playground": "perl",
  };

  if (aliasMap[slug]) {
    return aliasMap[slug];
  }

  // 3. Heuristic Substring Matching
  if (slug.includes("python") || slug.startsWith("py")) return "python";
  if (slug.includes("typescript") || slug.startsWith("ts")) return "typescript";
  if (slug.includes("javascript") || slug.startsWith("js") || slug.includes("node")) return "javascript";
  if (slug.includes("c++") || slug.includes("cpp") || slug.includes("plus")) return "cpp";
  if (slug.includes("csharp") || slug.includes("c-sharp") || slug.startsWith("cs")) return "csharp";
  if (slug.includes("rust")) return "rust";
  if (slug.includes("golang") || slug.startsWith("go")) return "go";
  if (slug.includes("java") && !slug.includes("script")) return "java";
  if (slug.includes("php")) return "php";
  if (slug.includes("ruby")) return "ruby";
  if (slug.includes("kotlin")) return "kotlin";
  if (slug.includes("swift")) return "swift";
  if (slug.includes("bash") || slug.includes("shell")) return "bash";
  if (slug.includes("sql")) return "sql";
  if (slug.includes("html")) return "html";
  if (slug.includes("css")) return "css";
  if (slug.includes("json")) return "json";
  if (slug.includes("xml")) return "xml";
  if (slug.includes("yaml") || slug.includes("yml")) return "yaml";
  if (slug.includes("markdown") || slug.includes("md")) return "markdown";
  if (slug.includes("lua")) return "lua";
  if (slug.includes("scala")) return "scala";
  if (slug.includes("haskell")) return "haskell";
  if (slug.includes("dart")) return "dart";
  if (slug.includes("perl")) return "perl";
  if (slug === "c" || slug.startsWith("c-")) return "c";

  return "python";
}

/**
 * Helper to get icon for specific language
 */
function getLanguageIcon(langId: string) {
  switch (langId) {
    case "python": return Terminal;
    case "javascript": return Play;
    case "typescript": return SquareCode;
    case "html": return Code;
    case "css": return Palette;
    case "sql": return Database;
    case "json": return FileJson;
    case "xml": return FileCode;
    case "cpp": return Cpu;
    case "c": return Cpu;
    case "java": return Coffee;
    case "go": return Zap;
    case "rust": return Hammer;
    case "ruby": return Gem;
    case "csharp": return Hash;
    case "swift": return Feather;
    case "kotlin": return Layers;
    case "markdown": return BookOpen;
    default: return Code;
  }
}

export default function DynamicCodeToolPage() {
  // Use useParams hook dynamically as requested
  const params = useParams();
  const slugParam = params?.["code-tool-slug"];
  const rawSlug = Array.isArray(slugParam) ? slugParam[0] : (slugParam || "");

  // Auto-detect programming language based on slug
  const detectedLangId = useMemo(() => detectLanguageFromSlug(rawSlug), [rawSlug]);
  const langConfig = useMemo(() => getLanguage(detectedLangId) || LANGUAGES.python, [detectedLangId]);
  const LangIcon = useMemo(() => getLanguageIcon(detectedLangId), [detectedLangId]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Compact Top Header Bar - Optimized for Instant Editor Visibility */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3.5 shrink-0">
        <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Left: Breadcrumbs + Title + Auto-Detected Badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
              style={{ 
                backgroundColor: `${langConfig.color}15`, 
                border: `1px solid ${langConfig.color}35` 
              }}
            >
              <LangIcon 
                className="w-5 h-5" 
                style={{ color: langConfig.color }} 
              />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {langConfig.name} Online Playground
                </h1>
                <span 
                  className="px-2 py-0.5 text-[11px] font-bold rounded-full uppercase tracking-wider"
                  style={{ 
                    backgroundColor: `${langConfig.color}20`, 
                    color: langConfig.color,
                    border: `1px solid ${langConfig.color}40`
                  }}
                >
                  Auto-Detected
                </span>
                {langConfig.info?.version && (
                  <span className="hidden md:inline-block px-2 py-0.5 text-[11px] bg-slate-100 text-slate-600 rounded-md font-mono border border-slate-200">
                    v{langConfig.info.version}
                  </span>
                )}
              </div>

              {/* Breadcrumbs */}
              <nav className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5" aria-label="Breadcrumb">
                <Link href="/tooles" className="hover:text-primary-theme transition-colors">
                  Tools
                </Link>
                <span>/</span>
                <Link href="/tooles/coding-tooles" className="hover:text-primary-theme transition-colors">
                  Coding Tools
                </Link>
                <span>/</span>
                <span className="text-slate-800 font-medium">
                  {langConfig.name}
                </span>
              </nav>
            </div>
          </div>

          {/* Right: Hint + Return Button */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-primary-theme" />
              <span>Language switchable in editor toolbar</span>
            </div>

            <Link
              href="/tooles/coding-tooles"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:border-primary-theme hover:text-primary-theme transition shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Tools</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Focus Area: 80% Viewport Height Code Editor for Maximum User Experience */}
      <main className="w-full bg-white px-3 sm:px-6 lg:px-8 pt-3 pb-8 flex-1 flex flex-col">
        <div className="max-w-[98%] 2xl:max-w-[1600px] mx-auto w-full flex-1 flex flex-col space-y-4">

          {/* 
            Editor Box - Occupies ~80% Viewport Area (80vh)
            Guarantees immediate visibility of both code and output with zero unnecessary scrolling
          */}
          <div className="w-full rounded-xl shadow-xl border border-slate-200 overflow-hidden bg-slate-950 flex-1 min-h-[400px]">
            {/* <CodeRunEditor 
              defaultLang={detectedLangId} 
              height="80vh" 
            /> */}
            <MonacoCodeRunEditor 
              defaultLang={detectedLangId} 
              height="80vh" 
            />
          </div>

          {/* Below-the-fold Documentation & Guides (SEO & Deep User Experience) */}
          <section className="pt-6 pb-2 grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
            {/* Pro Tip Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary-theme font-semibold text-xs mb-2">
                  <Lightbulb className="w-4 h-4" />
                  <span>Pro Tip for {langConfig.name}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-mono bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {langConfig.info?.tip || "Write clean, modular code. Use the Output tab to inspect return values and errors."}
                </p>
              </div>

              {langConfig.info?.website && (
                <a
                  href={langConfig.info.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-theme hover:underline"
                >
                  <span>Official Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Execution Engine Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2.5">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Execution Features</span>
              </h2>
              <ul className="text-xs text-slate-600 space-y-1.5">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Instant in-browser execution & sandboxing</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Captures stdout, stderr, execution time & memory</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Full Stdin support for interactive command-line inputs</span>
                </li>
              </ul>
            </div>

            {/* Keyboard Shortcuts Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2.5">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-primary-theme" />
                <span>Productivity Shortcuts</span>
              </h2>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Run Code</span>
                  <span className="font-mono font-semibold text-slate-800">Ctrl + Enter</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Indent</span>
                  <span className="font-mono font-semibold text-slate-800">Tab</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Unindent</span>
                  <span className="font-mono font-semibold text-slate-800">Shift + Tab</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Find / Replace</span>
                  <span className="font-mono font-semibold text-slate-800">Ctrl + F</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
