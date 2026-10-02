// app/tooles/coding-tooles/monaco-components/MonacoLanguageModal.tsx
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { X, Search, Check, Sparkles, Filter, CheckCircle2, Layers } from "lucide-react";
import { LANGUAGE_LIST, LANGUAGES } from "../lib/languages";
import type { LanguageConfig } from "../types/editor";

/**
 * Exact Judge0 CE Language list provided by the user.
 */
export const JUDGE0_LANGUAGE_LIST = [
  { id: 45, name: "Assembly (NASM 2.14.02)" },
  { id: 46, name: "Bash (5.0.0)" },
  { id: 47, name: "Basic (FBC 1.07.1)" },
  { id: 75, name: "C (Clang 7.0.1)" },
  { id: 76, name: "C++ (Clang 7.0.1)" },
  { id: 48, name: "C (GCC 7.4.0)" },
  { id: 52, name: "C++ (GCC 7.4.0)" },
  { id: 49, name: "C (GCC 8.3.0)" },
  { id: 53, name: "C++ (GCC 8.3.0)" },
  { id: 50, name: "C (GCC 9.2.0)" },
  { id: 54, name: "C++ (GCC 9.2.0)" },
  { id: 86, name: "Clojure (1.10.1)" },
  { id: 51, name: "C# (Mono 6.6.0.161)" },
  { id: 77, name: "COBOL (GnuCOBOL 2.2)" },
  { id: 55, name: "Common Lisp (SBCL 2.0.0)" },
  { id: 56, name: "D (DMD 2.089.1)" },
  { id: 57, name: "Elixir (1.9.4)" },
  { id: 58, name: "Erlang (OTP 22.2)" },
  { id: 44, name: "Executable" },
  { id: 87, name: "F# (.NET Core SDK 3.1.202)" },
  { id: 59, name: "Fortran (GFortran 9.2.0)" },
  { id: 60, name: "Go (1.13.5)" },
  { id: 88, name: "Groovy (3.0.3)" },
  { id: 61, name: "Haskell (GHC 8.8.1)" },
  { id: 62, name: "Java (OpenJDK 13.0.1)" },
  { id: 63, name: "JavaScript (Node.js 12.14.0)" },
  { id: 78, name: "Kotlin (1.3.70)" },
  { id: 64, name: "Lua (5.3.5)" },
  { id: 89, name: "Multi-file program" },
  { id: 79, name: "Objective-C (Clang 7.0.1)" },
  { id: 65, name: "OCaml (4.09.0)" },
  { id: 66, name: "Octave (5.1.0)" },
  { id: 67, name: "Pascal (FPC 3.0.4)" },
  { id: 85, name: "Perl (5.28.1)" },
  { id: 68, name: "PHP (7.4.1)" },
  { id: 43, name: "Plain Text" },
  { id: 69, name: "Prolog (GNU Prolog 1.4.5)" },
  { id: 70, name: "Python (2.7.17)" },
  { id: 71, name: "Python (3.8.1)" },
  { id: 80, name: "R (4.0.0)" },
  { id: 72, name: "Ruby (2.7.0)" },
  { id: 73, name: "Rust (1.40.0)" },
  { id: 81, name: "Scala (2.13.2)" },
  { id: 82, name: "SQL (SQLite 3.27.2)" },
  { id: 83, name: "Swift (5.2.3)" },
  { id: 74, name: "TypeScript (3.7.4)" },
  { id: 84, name: "Visual Basic.Net (vbnc 0.0.0.5943)" },
] as const;

export interface MonacoLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLangId: string;
  onSelect: (langId: string) => void;
  languages?: LanguageConfig[];
}

// Default image path
export const DEFAULT_LANGUAGE_IMAGE = "/programming-languages/python.svg";

/**
 * Mapping of language IDs to their custom image paths.
 */
export const LANGUAGE_IMAGE_MAP: Record<string, string> = {
  python: "/programming-languages/python.svg",
  python2: "/programming-languages/python.svg",
  javascript: "/programming-languages/python.svg",
  typescript: "/programming-languages/python.svg",
  java: "/programming-languages/python.svg",
  cpp: "/programming-languages/python.svg",
  cpp_gcc8: "/programming-languages/python.svg",
  cpp_gcc7: "/programming-languages/python.svg",
  cpp_clang: "/programming-languages/python.svg",
  c: "/programming-languages/python.svg",
  c_gcc8: "/programming-languages/python.svg",
  c_gcc7: "/programming-languages/python.svg",
  c_clang: "/programming-languages/python.svg",
  csharp: "/programming-languages/python.svg",
  go: "/programming-languages/python.svg",
  rust: "/programming-languages/python.svg",
  kotlin: "/programming-languages/python.svg",
  swift: "/programming-languages/python.svg",
  ruby: "/programming-languages/python.svg",
  php: "/programming-languages/python.svg",
  scala: "/programming-languages/python.svg",
  r: "/programming-languages/python.svg",
  bash: "/programming-languages/python.svg",
  lua: "/programming-languages/python.svg",
  haskell: "/programming-languages/python.svg",
  perl: "/programming-languages/python.svg",
  sql: "/programming-languages/python.svg",
  assembly: "/programming-languages/python.svg",
  basic: "/programming-languages/python.svg",
  clojure: "/programming-languages/python.svg",
  cobol: "/programming-languages/python.svg",
  lisp: "/programming-languages/python.svg",
  d: "/programming-languages/python.svg",
  elixir: "/programming-languages/python.svg",
  erlang: "/programming-languages/python.svg",
  fsharp: "/programming-languages/python.svg",
  fortran: "/programming-languages/python.svg",
  groovy: "/programming-languages/python.svg",
  objectivec: "/programming-languages/python.svg",
  ocaml: "/programming-languages/python.svg",
  octave: "/programming-languages/python.svg",
  pascal: "/programming-languages/python.svg",
  prolog: "/programming-languages/python.svg",
  vbnet: "/programming-languages/python.svg",
  html: "/programming-languages/python.svg",
  css: "/programming-languages/python.svg",
  json: "/programming-languages/python.svg",
  xml: "/programming-languages/python.svg",
  yaml: "/programming-languages/python.svg",
  markdown: "/programming-languages/python.svg",
};

export default function MonacoLanguageModal({
  isOpen,
  onClose,
  currentLangId,
  onSelect,
  languages = LANGUAGE_LIST,
}: MonacoLanguageModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "latest" | "web">("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Filter languages based on search and selected view tab
  const filteredLanguages = useMemo(() => {
    let list = languages;

    // Filter mode filter
    if (filterMode === "latest") {
      list = list.filter((l) => l.isLatest !== false);
    } else if (filterMode === "web") {
      list = list.filter((l) =>
        ["html", "css", "json", "xml", "yaml", "markdown"].includes(l.id)
      );
    }

    if (!searchQuery.trim()) return list;

    const query = searchQuery.toLowerCase().trim();
    return list.filter(
      (lang) =>
        lang.name.toLowerCase().includes(query) ||
        lang.id.toLowerCase().includes(query) ||
        lang.extension.toLowerCase().includes(query) ||
        String(lang.judge0Id).includes(query) ||
        (lang.version && lang.version.toLowerCase().includes(query)) ||
        (lang.info?.version && lang.info.version.toLowerCase().includes(query))
    );
  }, [languages, searchQuery, filterMode]);

  // Determine current active selection matching
  const isLanguageActive = (lang: LanguageConfig) => {
    if (lang.id === currentLangId) return true;
    if (String(lang.judge0Id) === currentLangId) return true;
    const currentConfig = LANGUAGES[currentLangId];
    if (currentConfig && currentConfig.judge0Id === lang.judge0Id) {
      // If user selected generic 'c' or 'cpp' or 'python', mark the latest version active
      return lang.id === currentConfig.id;
    }
    return false;
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lang-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      {/* Modal Dialog Container - White background following theme rule */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-5xl max-h-[90vh] flex flex-col
          bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800
          rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden
          transition-all transform duration-200 scale-100
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <h2
              id="lang-modal-title"
              className="text-lg sm:text-xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400 flex items-center gap-2"
            >
              <span>Programming Languages</span>
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hidden sm:inline-block">
              {JUDGE0_LANGUAGE_LIST.length} Judge0 Compilers
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="px-5 sm:px-7 py-3 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/60 shrink-0 flex flex-col sm:flex-row gap-2.5 sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search language, compiler, version, ID (e.g. Python, 71, GCC 9.2, C++)..."
              className="
                w-full pl-10 pr-12 py-2 text-sm rounded-xl
                bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                text-slate-800 dark:text-slate-100 placeholder:text-slate-400
                outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400/20
                transition-all
              "
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Filter Tabs: All Compilers / Latest Versions / Web */}
          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setFilterMode("all")}
              className={`
                px-3 py-1.5 rounded-lg font-medium transition-all
                ${
                  filterMode === "all"
                    ? "bg-blue-600 text-white shadow-xs font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700"
                }
              `}
              title="Show all 47 Judge0 compilers and runtimes"
            >
              All Compilers ({JUDGE0_LANGUAGE_LIST.length})
            </button>
            <button
              onClick={() => setFilterMode("latest")}
              className={`
                px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5
                ${
                  filterMode === "latest"
                    ? "bg-emerald-600 text-white shadow-xs font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700"
                }
              `}
              title="Filter to only the latest version of each programming language"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Latest Versions</span>
            </button>
            <button
              onClick={() => setFilterMode("web")}
              className={`
                px-3 py-1.5 rounded-lg font-medium transition-all
                ${
                  filterMode === "web"
                    ? "bg-blue-600 text-white shadow-xs font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700"
                }
              `}
              title="Web markup and configuration formats"
            >
              Web & Data
            </button>
          </div>
        </div>

        {/* Languages Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-white dark:bg-slate-900 custom-scrollbar">
          {filteredLanguages.length === 0 ? (
            <div className="py-16 text-center text-slate-400 dark:text-slate-500">
              <p className="text-base font-semibold">No programming languages found</p>
              <p className="text-xs mt-1 text-slate-400">
                Try searching for another keyword, compiler name, ID, or clear the search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {filteredLanguages.map((lang) => {
                const isSelected = isLanguageActive(lang);
                const imageSrc =
                  lang.image ||
                  LANGUAGE_IMAGE_MAP[lang.id] ||
                  DEFAULT_LANGUAGE_IMAGE;

                return (
                  <button
                    key={`${lang.id}-${lang.judge0Id}`}
                    onClick={() => {
                      onSelect(lang.id);
                      onClose();
                    }}
                    className={`
                      group relative flex flex-col items-center justify-between
                      p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-center
                      transition-all duration-200 cursor-pointer min-h-[148px]
                      ${
                        isSelected
                          ? "bg-blue-50/90 dark:bg-blue-950/40 border-blue-500 dark:border-blue-400 shadow-md ring-2 ring-blue-400/30"
                          : "bg-white dark:bg-slate-800/80 border-slate-200/90 dark:border-slate-700/80 hover:bg-slate-50/80 dark:hover:bg-slate-700/80 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg hover:-translate-y-0.5"
                      }
                    `}
                    title={`Select ${lang.name} (Judge0 ID: ${lang.judge0Id})`}
                  >
                    {/* Top Badges Row */}
                    <div className="w-full flex items-center justify-between mb-1">
                      {/* Judge0 ID Badge */}
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/70 text-slate-500 dark:text-slate-400">
                        #{lang.judge0Id}
                      </span>

                      {/* Latest Version Badge */}
                      {lang.isLatest && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          Latest
                        </span>
                      )}

                      {/* Selection Checkmark */}
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs ml-auto">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Language Image Icon */}
                    <div className="w-10 h-10 my-1 flex items-center justify-center shrink-0">
                      <img
                        src={imageSrc}
                        alt={lang.name}
                        className="w-9 h-9 object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Language Name & Details */}
                    <div className="w-full flex flex-col items-center">
                      <span
                        className={`
                          text-xs sm:text-[13px] font-semibold tracking-tight line-clamp-1 w-full
                          ${
                            isSelected
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                          }
                        `}
                      >
                        {lang.name}
                      </span>

                      {/* Version & Extension Footer */}
                      <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-400">
                        <span className="font-mono">.{lang.extension}</span>
                        {lang.version && (
                          <>
                            <span>•</span>
                            <span className="truncate max-w-[85px]" title={lang.version}>
                              {lang.version}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-7 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>
              {filteredLanguages.length} language{filteredLanguages.length === 1 ? "" : "s"} shown. Select any compiler to update runner and syntax highlighter.
            </span>
          </div>
          <span className="font-mono text-[11px] hidden sm:inline">Esc to close</span>
        </div>
      </div>
    </div>
  );
}
