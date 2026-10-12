"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  UploadCloud,
  FileSearch,
  Search,
  AlertCircle,
  FileText,
  ChevronRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Download,
  Copy,
  Check,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldAlert,
  Eye,
  Sliders,
  Filter,
  X,
  BookOpen,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  AlignLeft,
  ListFilter,
  TrendingUp,
  Tag,
} from "lucide-react";

interface SearchMatch {
  id: number;
  pageNum: number;
  snippet: string;
  matchText: string;
  startIndex: number;
  endIndex: number;
}

interface PageTextRecord {
  pageNum: number;
  text: string;
}

export default function SearchPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagesTextList, setPagesTextList] = useState<PageTextRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [matches, setMatches] = useState<SearchMatch[]>([]);
  const [selectedMatchIndex, setSelectedMatchIndex] = useState<number>(0);
  const [selectedPageFilter, setSelectedPageFilter] = useState<number | "all">("all");
  const [matchCase, setMatchCase] = useState<boolean>(false);
  const [wholeWord, setWholeWord] = useState<boolean>(false);
  const [pageThumbnails, setPageThumbnails] = useState<Record<number, string>>({});
  const [activePreviewPage, setActivePreviewPage] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"results" | "reader">("results");
  const [previewZoom, setPreviewZoom] = useState<number>(1);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const activeMatchRef = useRef<HTMLDivElement>(null);

  /**
   * Extract high-accuracy structured text & render thumbnails using pdfjs-dist
   */
  const processPdfDocument = async (uploadedFile: File) => {
    try {
      setIsProcessing(true);
      setError(null);
      setIsPasswordProtected(false);
      setFile(uploadedFile);
      setMatches([]);
      setHasSearched(false);
      setPageThumbnails({});

      const pdfjs = await import("pdfjs-dist");
      if (typeof window !== "undefined") {
        pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      }

      const arrayBuffer = await uploadedFile.arrayBuffer();
      let pdfDoc;
      try {
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer.slice(0) });
        pdfDoc = await loadingTask.promise;
      } catch (loadErr: any) {
        if (
          loadErr?.name === "PasswordException" ||
          loadErr?.message?.toLowerCase().includes("password") ||
          loadErr?.message?.toLowerCase().includes("encrypt")
        ) {
          setIsPasswordProtected(true);
          setError("This PDF is password-protected. Please unlock it before searching.");
          return;
        }
        throw loadErr;
      }

      const numPages = pdfDoc.numPages;
      setTotalPages(numPages);
      setActivePreviewPage(1);

      const records: PageTextRecord[] = [];
      const thumbs: Record<number, string> = {};

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        try {
          const page = await pdfDoc.getPage(pageNum);
          const textContent = await page.getTextContent();

          let pageStr = "";
          let lastY: number | null = null;

          for (const item of textContent.items as any[]) {
            if ("str" in item) {
              const currentY = item.transform ? item.transform[5] : null;
              if (lastY !== null && currentY !== null && Math.abs(currentY - lastY) > 5) {
                pageStr += "\n";
              } else if (pageStr.length > 0 && !pageStr.endsWith("\n") && !pageStr.endsWith(" ") && item.str.trim()) {
                pageStr += " ";
              }
              pageStr += item.str;
              lastY = currentY;
            }
          }

          records.push({
            pageNum,
            text: pageStr,
          });

          // Render thumbnail for pages
          if (pageNum <= 12) {
            const viewport = page.getViewport({ scale: 0.75 });
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (ctx) {
              canvas.width = Math.floor(viewport.width);
              canvas.height = Math.floor(viewport.height);
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              await (page.render({ canvasContext: ctx, viewport, canvas } as any)).promise;
              thumbs[pageNum] = canvas.toDataURL("image/jpeg", 0.85);
            }
          }
        } catch (pageErr) {
          console.warn(`Error indexing page ${pageNum}`, pageErr);
        }
      }

      setPagesTextList(records);
      setPageThumbnails(thumbs);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to process and index PDF for searching.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFile = async (uploadedFile: File | undefined) => {
    if (!uploadedFile) return;
    if (!uploadedFile.name.toLowerCase().endsWith(".pdf")) {
      setError("Please select a valid PDF document.");
      setIsPasswordProtected(false);
      return;
    }

    await processPdfDocument(uploadedFile);
  };

  /**
   * Search query execution across indexed pages with context snippet extraction
   */
  const executeSearch = (queryStr: string = searchTerm) => {
    const trimmed = queryStr.trim();
    if (!trimmed || pagesTextList.length === 0) {
      setMatches([]);
      setHasSearched(false);
      return;
    }

    setHasSearched(true);
    const results: SearchMatch[] = [];
    let matchId = 1;

    let regexFlags = "g";
    if (!matchCase) regexFlags += "i";

    let pattern = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (wholeWord) {
      pattern = `\\b${pattern}\\b`;
    }

    let regex: RegExp;
    try {
      regex = new RegExp(pattern, regexFlags);
    } catch {
      regex = new RegExp(trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    }

    pagesTextList.forEach((pageRecord) => {
      const text = pageRecord.text;
      let match: RegExpExecArray | null;

      while ((match = regex.exec(text)) !== null) {
        const startIdx = match.index;
        const endIdx = startIdx + match[0].length;

        // Context snippet around match (75 chars before and after)
        const snippetStart = Math.max(0, startIdx - 75);
        const snippetEnd = Math.min(text.length, endIdx + 75);

        let snippet = text.substring(snippetStart, snippetEnd).replace(/\s+/g, " ").trim();
        if (snippetStart > 0) snippet = "..." + snippet;
        if (snippetEnd < text.length) snippet = snippet + "...";

        results.push({
          id: matchId++,
          pageNum: pageRecord.pageNum,
          snippet,
          matchText: match[0],
          startIndex: startIdx,
          endIndex: endIdx,
        });
      }
    });

    setMatches(results);
    setSelectedMatchIndex(0);
    if (results.length > 0) {
      setActivePreviewPage(results[0].pageNum);
    }
  };

  // Re-run search when options toggle
  useEffect(() => {
    if (searchTerm.trim() && pagesTextList.length > 0) {
      executeSearch();
    }
  }, [matchCase, wholeWord]);

  const filteredMatches = useMemo(() => {
    return selectedPageFilter === "all"
      ? matches
      : matches.filter((m) => m.pageNum === selectedPageFilter);
  }, [matches, selectedPageFilter]);

  const handleNextMatch = () => {
    if (filteredMatches.length === 0) return;
    const nextIdx = (selectedMatchIndex + 1) % filteredMatches.length;
    setSelectedMatchIndex(nextIdx);
    setActivePreviewPage(filteredMatches[nextIdx].pageNum);
  };

  const handlePrevMatch = () => {
    if (filteredMatches.length === 0) return;
    const prevIdx = (selectedMatchIndex - 1 + filteredMatches.length) % filteredMatches.length;
    setSelectedMatchIndex(prevIdx);
    setActivePreviewPage(filteredMatches[prevIdx].pageNum);
  };

  const handleCopyResults = () => {
    if (matches.length === 0) return;
    const textReport = matches
      .map((m) => `[Match #${m.id} - Page ${m.pageNum}]\n"${m.snippet}"`)
      .join("\n\n");

    navigator.clipboard.writeText(textReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    if (!file || matches.length === 0) return;
    const reportData = {
      documentName: file.name,
      totalPages,
      searchedKeyword: searchTerm,
      totalMatches: matches.length,
      searchedAt: new Date().toISOString(),
      matches: matches.map((m) => ({
        matchNumber: m.id,
        pageNumber: m.pageNum,
        snippet: m.snippet,
        exactMatch: m.matchText,
      })),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `search_results_${file.name.replace(/\.pdf$/i, "")}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setFile(null);
    setTotalPages(0);
    setPagesTextList([]);
    setSearchTerm("");
    setMatches([]);
    setHasSearched(false);
    setPageThumbnails({});
    setError(null);
    setIsPasswordProtected(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Highlight keyword inside snippet or text
  const highlightText = (textStr: string, keyword: string) => {
    if (!keyword.trim()) return textStr;
    const parts = textStr.split(new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <mark key={i} className="bg-amber-300/90 text-amber-950 font-bold px-1 py-0.5 rounded shadow-xs">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Analytics Metrics
  const totalDocumentWords = pagesTextList.reduce(
    (acc, curr) => acc + (curr.text.trim() ? curr.text.trim().split(/\s+/).length : 0),
    0
  );

  const matchedPagesCount = Array.from(new Set(matches.map((m) => m.pageNum))).length;
  const matchDensity = totalPages > 0 ? Math.round((matchedPagesCount / totalPages) * 100) : 0;

  // Quick search suggestions
  const searchSuggestions = ["Invoice", "Total", "Date", "Agreement", "Payment", "Signature", "Tax", "Clause"];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-theme/10 text-primary-theme text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          PDF Full-Text Search
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
          Search Text & Keywords in PDF
        </h2>
        <p className="text-sm md:text-base text-slate-500 mt-2 leading-relaxed">
          Instantly find keywords, exact phrases, numbers, and references across all pages of your PDF with live context snippets and interactive page navigation.
        </p>
      </div>

      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className="border-2 border-dashed border-slate-300 hover:border-primary-theme rounded-3xl p-10 md:p-14 text-center cursor-pointer transition-all bg-slate-50 hover:bg-slate-50/70 flex flex-col items-center justify-center group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <div className="p-4 md:p-5 bg-white rounded-2xl shadow-sm text-primary-theme group-hover:scale-110 transition-transform">
            <UploadCloud className="w-9 h-9 md:w-10 md:h-10" />
          </div>
          <p className="mt-4 text-base md:text-lg font-bold text-slate-800">
            Click to upload or drag & drop a PDF
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Fast client-side indexing with pdfjs-dist • Zero data leaves your browser
          </p>
        </div>
      ) : isPasswordProtected ? (
        /* Password-Protected Security Banner */
        <div className="p-6 md:p-8 rounded-3xl bg-amber-50/80 border border-amber-200 text-amber-900 text-center space-y-5 max-w-xl mx-auto my-2 animate-in fade-in">
          <div className="w-16 h-16 bg-amber-100 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto text-amber-700 shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg md:text-2xl font-bold text-amber-950">
              This PDF is Password-Protected
            </h4>
            <p className="text-xs md:text-sm text-amber-800 leading-relaxed max-w-md mx-auto">
              <span className="font-semibold text-slate-900">{file.name}</span> is protected with password encryption. Please unlock the file before searching.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/tooles/pdf-tooles/unlock-pdf"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary-theme hover:opacity-90 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition shadow-md shadow-primary-theme/20"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Unlock PDF First</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={reset}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white border border-amber-300 hover:bg-amber-100/60 text-amber-900 font-semibold text-xs md:text-sm transition cursor-pointer"
            >
              Upload Another PDF
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 md:space-y-8">
          {/* File Information Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center gap-3.5">
              <div className="p-3 bg-primary-theme/10 text-primary-theme rounded-xl shrink-0">
                <FileText className="w-6 h-6 md:w-7 md:h-7" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-800 text-sm md:text-base truncate max-w-xs md:max-w-md">
                  {file.name}
                </h4>
                <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">
                  <span className="font-semibold text-slate-700">{totalPages}</span> {totalPages === 1 ? "page" : "pages"} • {totalDocumentWords.toLocaleString()} indexed words • {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={reset}
              className="text-xs md:text-sm font-semibold text-red-500 hover:text-red-600 hover:underline px-2 py-1 cursor-pointer transition-colors"
            >
              Change File
            </button>
          </div>

          {isProcessing ? (
            <div className="py-16 md:py-20 flex flex-col items-center justify-center gap-3.5 text-slate-600 bg-slate-50/50 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 border-3 border-primary-theme border-t-transparent rounded-full animate-spin" />
              <div className="text-center space-y-1">
                <p className="text-base font-bold text-slate-800">
                  Building Full-Text Search Index with pdfjs-dist...
                </p>
                <p className="text-xs md:text-sm text-slate-500">
                  Scanning text blocks, font structures, line intervals, and page layout
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Main Search Input & Filter Bar */}
              <div className="p-5 md:p-6 bg-slate-50/80 border border-slate-200 rounded-3xl space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          if (e.shiftKey) handlePrevMatch();
                          else executeSearch();
                        }
                      }}
                      placeholder="Type a word, phrase, name, ID, or amount to search..."
                      className="w-full pl-10 pr-9 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-primary-theme outline-none shadow-xs placeholder:font-normal"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setMatches([]);
                          setHasSearched(false);
                        }}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => executeSearch()}
                    className="py-3.5 px-7 rounded-2xl bg-primary-theme hover:opacity-90 text-white font-bold text-sm transition shadow-md shadow-primary-theme/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <FileSearch className="w-4 h-4" />
                    <span>Search in PDF</span>
                  </button>
                </div>

                {/* Filter & Matching Options */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs font-semibold text-slate-600">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setMatchCase(!matchCase)}
                      className={`px-3 py-1.5 rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                        matchCase
                          ? "border-primary-theme bg-primary-theme text-white font-bold shadow-xs"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>Match Case (Aa)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setWholeWord(!wholeWord)}
                      className={`px-3 py-1.5 rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                        wholeWord
                          ? "border-primary-theme bg-primary-theme text-white font-bold shadow-xs"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>Whole Words Only</span>
                    </button>

                    {/* Quick suggestion tags */}
                    <div className="hidden xl:flex items-center gap-1.5 pl-2 text-slate-400">
                      <span className="text-[11px]">Suggestions:</span>
                      {searchSuggestions.slice(0, 4).map((sugg) => (
                        <button
                          key={sugg}
                          type="button"
                          onClick={() => {
                            setSearchTerm(sugg);
                            executeSearch(sugg);
                          }}
                          className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 hover:text-primary-theme text-[11px] font-medium transition cursor-pointer"
                        >
                          {sugg}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasSearched && matches.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-800 font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-xs shadow-xs">
                        {filteredMatches.length} {filteredMatches.length === 1 ? "match" : "matches"}
                      </span>
                      <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 shadow-xs">
                        <button
                          type="button"
                          onClick={handlePrevMatch}
                          className="p-1 text-slate-600 hover:text-primary-theme hover:bg-slate-100 rounded-lg cursor-pointer"
                          title="Previous match (Shift+Enter)"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-700">
                          {selectedMatchIndex + 1}/{filteredMatches.length}
                        </span>
                        <button
                          type="button"
                          onClick={handleNextMatch}
                          className="p-1 text-slate-600 hover:text-primary-theme hover:bg-slate-100 rounded-lg cursor-pointer"
                          title="Next match (Enter)"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Summary Analytics Row when results are present */}
              {hasSearched && matches.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 animate-in fade-in">
                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Total Matches
                    </span>
                    <span className="text-lg md:text-xl font-bold text-slate-800 mt-1 block">
                      {matches.length}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Pages with Matches
                    </span>
                    <span className="text-lg md:text-xl font-bold text-slate-800 mt-1 block">
                      {matchedPagesCount} of {totalPages}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Page Coverage
                    </span>
                    <span className="text-lg md:text-xl font-bold text-slate-800 mt-1 block">
                      {matchDensity}%
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Active Keyword
                    </span>
                    <span className="text-lg md:text-xl font-bold text-primary-theme mt-1 block truncate">
                      &quot;{searchTerm}&quot;
                    </span>
                  </div>
                </div>
              )}

              {/* Search Results & Preview Grid */}
              {hasSearched && (
                <div className="space-y-4 animate-in fade-in">
                  {matches.length === 0 ? (
                    <div className="p-12 text-center bg-slate-50 border border-slate-200 rounded-3xl space-y-3">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-xs border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                        <FileSearch className="w-6 h-6" />
                      </div>
                      <h4 className="text-base md:text-lg font-bold text-slate-800">
                        No matches found for &quot;{searchTerm}&quot;
                      </h4>
                      <p className="text-xs md:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                        Try disabling &quot;Whole Words Only&quot; or &quot;Match Case&quot;, or search for synonyms and shorter phrases.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left 7 Columns: Match List & View Switcher */}
                      <div className="lg:col-span-7 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                          {/* Page Filter Selector */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                              <Filter className="w-3.5 h-3.5 text-primary-theme" />
                              Page:
                            </span>
                            <select
                              value={selectedPageFilter}
                              onChange={(e) => {
                                const val = e.target.value;
                                setSelectedPageFilter(val === "all" ? "all" : Number(val));
                                setSelectedMatchIndex(0);
                              }}
                              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-primary-theme outline-none shadow-xs cursor-pointer"
                            >
                              <option value="all">All Pages ({matches.length})</option>
                              {Array.from(new Set(matches.map((m) => m.pageNum))).map((pg) => {
                                const count = matches.filter((m) => m.pageNum === pg).length;
                                return (
                                  <option key={pg} value={pg}>
                                    Page {pg} ({count} {count === 1 ? "match" : "matches"})
                                  </option>
                                );
                              })}
                            </select>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={handleCopyResults}
                              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                              title="Copy all match snippets"
                            >
                              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copied ? "Copied!" : "Copy Snippets"}</span>
                            </button>
                            <button
                              type="button"
                              onClick={handleDownloadReport}
                              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                              title="Download JSON Report"
                            >
                              <Download className="w-3.5 h-3.5 text-primary-theme" />
                              <span>Export (.JSON)</span>
                            </button>
                          </div>
                        </div>

                        {/* Match Snippet Cards List */}
                        <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
                          {filteredMatches.map((item, idx) => {
                            const isSelected = selectedMatchIndex === idx;
                            return (
                              <div
                                key={item.id}
                                ref={isSelected ? activeMatchRef : null}
                                onClick={() => {
                                  setSelectedMatchIndex(idx);
                                  setActivePreviewPage(item.pageNum);
                                }}
                                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                                  isSelected
                                    ? "bg-primary-theme/5 border-primary-theme ring-2 ring-primary-theme/30 shadow-sm"
                                    : "bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300"
                                }`}
                              >
                                {isSelected && (
                                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-theme" />
                                )}

                                <div className="flex items-center justify-between pb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs">
                                      Match #{item.id}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-primary-theme bg-primary-theme/10 px-2.5 py-0.5 rounded-lg">
                                      <BookOpen className="w-3 h-3" />
                                      Page {item.pageNum}
                                    </span>
                                  </div>
                                  <ChevronRight
                                    className={`w-4 h-4 transition-transform ${
                                      isSelected ? "text-primary-theme translate-x-1" : "text-slate-400"
                                    }`}
                                  />
                                </div>

                                <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-sans pt-0.5">
                                  {highlightText(item.snippet, searchTerm)}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right 5 Columns: Interactive Page Thumbnail & Text Excerpt Viewer */}
                      <div className="lg:col-span-5 border border-slate-200 rounded-3xl p-5 md:p-6 bg-slate-50/50 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h5 className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                              <Eye className="w-4 h-4 text-primary-theme" />
                              Page {activePreviewPage} Live Context
                            </h5>
                            <span className="text-xs font-bold text-primary-theme bg-primary-theme/10 px-2 py-0.5 rounded-lg">
                              {matches.filter((m) => m.pageNum === activePreviewPage).length} hits on this page
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            Review where matches appear in the original document layout
                          </p>
                        </div>

                        {/* Page Preview Thumbnail Sheet */}
                        <div className="py-2 flex flex-col items-center justify-center">
                          <div className="relative w-52 h-72 md:w-60 md:h-84 bg-white border-2 border-slate-300 rounded-2xl shadow-lg p-3 overflow-hidden select-none group">
                            {pageThumbnails[activePreviewPage] ? (
                              <Image
                                src={pageThumbnails[activePreviewPage]}
                                alt={`Page ${activePreviewPage} preview`}
                                fill
                                sizes="(max-width: 768px) 60vw, 30vw"
                                className="object-contain p-2 opacity-90 pointer-events-none"
                                unoptimized
                              />
                            ) : (
                              <div className="space-y-2 opacity-25 my-auto pointer-events-none p-4">
                                <div className="w-full h-1.5 bg-slate-300 rounded" />
                                <div className="w-4/5 h-1.5 bg-slate-300 rounded" />
                                <div className="w-full h-1.5 bg-slate-300 rounded" />
                                <div className="w-3/4 h-1.5 bg-slate-300 rounded" />
                                <div className="w-5/6 h-1.5 bg-slate-300 rounded" />
                                <div className="w-2/3 h-1.5 bg-slate-300 rounded" />
                              </div>
                            )}

                            {/* Badge Indicator on Preview */}
                            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-slate-900/85 text-white rounded-xl text-xs font-bold shadow-xs">
                              Page {activePreviewPage}
                            </div>
                          </div>

                          <div className="mt-4 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-800 shadow-xs">
                              <Sparkles className="w-3.5 h-3.5 text-primary-theme" />
                              Viewing Page {activePreviewPage} of {totalPages}
                            </span>
                          </div>
                        </div>

                        {/* Full Page Text Excerpt with Real-Time Highlight */}
                        <div className="space-y-1.5">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                            Page Text Stream:
                          </span>
                          <div className="p-3.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-700 max-h-36 overflow-y-auto font-sans leading-relaxed shadow-inner">
                            {pagesTextList.find((p) => p.pageNum === activePreviewPage)?.text ? (
                              highlightText(
                                pagesTextList.find((p) => p.pageNum === activePreviewPage)!.text,
                                searchTerm
                              )
                            ) : (
                              <span className="text-slate-400 italic">No selectable text on this page.</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {error && !isPasswordProtected && (
            <div className="p-4 md:p-5 rounded-2xl bg-red-50 text-red-600 border border-red-200 text-sm md:text-base flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
