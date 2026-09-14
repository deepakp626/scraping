// app/tooles/coding-tooles/monaco-components/MonacoLanguageModal.tsx
"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { X, Search, Check, Sparkles } from "lucide-react";
import { LANGUAGE_LIST } from "../lib/languages";
import type { LanguageConfig } from "../types/editor";

export interface MonacoLanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLangId: string;
  onSelect: (langId: string) => void;
  languages?: LanguageConfig[];
}

// Default image path - currently all set to python.svg as requested
export const DEFAULT_LANGUAGE_IMAGE = "/programming-languages/python.svg";

/**
 * Mapping of language IDs to their custom image paths.
 * Currently defaults to python.svg, but ready for any specific icons to be added.
 */
export const LANGUAGE_IMAGE_MAP: Record<string, string> = {
  python: "/programming-languages/python.svg",
  javascript: "/programming-languages/python.svg",
  typescript: "/programming-languages/python.svg",
  java: "/programming-languages/python.svg",
  cpp: "/programming-languages/python.svg",
  c: "/programming-languages/python.svg",
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
  dart: "/programming-languages/python.svg",
  perl: "/programming-languages/python.svg",
  sql: "/programming-languages/python.svg",
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

  // Filter languages based on search
  const filteredLanguages = useMemo(() => {
    if (!searchQuery.trim()) return languages;
    const query = searchQuery.toLowerCase().trim();
    return languages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(query) ||
        lang.id.toLowerCase().includes(query) ||
        lang.extension.toLowerCase().includes(query)
    );
  }, [languages, searchQuery]);

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
              {languages.length} available
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

        {/* Search Bar */}
        <div className="px-5 sm:px-7 py-3 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/60 shrink-0">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search programming language or extension (e.g. Python, js, py, cpp)..."
              className="
                w-full pl-10 pr-4 py-2 text-sm rounded-xl
                bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                text-slate-800 dark:text-slate-100 placeholder:text-slate-400
                outline-none focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/20
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
        </div>

        {/* Languages Grid - 6 columns on large screens like reference image */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-white dark:bg-slate-900 custom-scrollbar">
          {filteredLanguages.length === 0 ? (
            <div className="py-16 text-center text-slate-400 dark:text-slate-500">
              <p className="text-base font-semibold">No programming languages found</p>
              <p className="text-xs mt-1 text-slate-400">
                Try searching for another keyword or clear the search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {filteredLanguages.map((lang) => {
                const isSelected = lang.id === currentLangId;
                const imageSrc =
                  lang.image ||
                  LANGUAGE_IMAGE_MAP[lang.id] ||
                  DEFAULT_LANGUAGE_IMAGE;

                return (
                  <button
                    key={lang.id}
                    onClick={() => {
                      onSelect(lang.id);
                      onClose();
                    }}
                    className={`
                      group relative flex flex-col items-center justify-center
                      p-4 rounded-xl sm:rounded-2xl border text-center
                      transition-all duration-200 cursor-pointer
                      ${
                        isSelected
                          ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 dark:border-blue-400 shadow-md ring-2 ring-blue-400/30"
                          : "bg-slate-50/80 dark:bg-slate-800/80 border-slate-200/90 dark:border-slate-700/80 hover:bg-white dark:hover:bg-slate-700/80 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg hover:-translate-y-0.5"
                      }
                    `}
                    title={`Select ${lang.name}`}
                  >
                    {/* Selected Badge */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}

                    {/* Language Image Icon */}
                    <div className="w-12 h-12 mb-3 flex items-center justify-center shrink-0">
                      <img
                        src={imageSrc}
                        alt={lang.name}
                        className="w-10 h-10 object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>

                    {/* Language Name */}
                    <span
                      className={`
                        text-xs sm:text-sm font-semibold tracking-tight line-clamp-1
                        ${
                          isSelected
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                        }
                      `}
                    >
                      {lang.name}
                    </span>

                    {/* Extension Badge */}
                    <span className="mt-1 text-[10px] font-mono text-slate-400 dark:text-slate-400">
                      .{lang.extension}
                    </span>
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
            <span>Select any language to switch syntax highlighting and starter code</span>
          </div>
          <span className="font-mono text-[11px] hidden sm:inline">Esc to close</span>
        </div>
      </div>
    </div>
  );
}
