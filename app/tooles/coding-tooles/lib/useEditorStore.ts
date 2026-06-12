// src/lib/useEditorStore.ts
"use client";
import { useState, useCallback, useRef } from "react";
import type { RunStatus, OutputTab, EditorStats } from "../types/editor";
import { LANGUAGES } from "./languages";
import { executeCode, formatOutput, Judge0Error } from "./judge0";

export function useEditorStore() {
  const [currentLangId, setCurrentLangId] = useState("python");
  const [code, setCode] = useState(LANGUAGES.python.starter);
  const [themeId, setThemeId] = useState("vscodeDark");
  const [fontSize, setFontSize] = useState(14);
  const [stdin, setStdin] = useState("");

  const [output, setOutput] = useState("");
  const [outputIsError, setOutputIsError] = useState(false);
  const [runStatus, setRunStatus] = useState<RunStatus>("idle");
  const [execTime, setExecTime] = useState<string | null>(null);
  const [execMemory, setExecMemory] = useState<number | null>(null);
  const [statusLabel, setStatusLabel] = useState<string>("");

  const [activeOutputTab, setActiveOutputTab] = useState<OutputTab>("output");
  const [stats, setStats] = useState<EditorStats>({
    lines: 1,
    chars: 0,
    words: 0,
    cursorLine: 1,
    cursorCol: 1,
  });

  const startTimeRef = useRef<number>(0);

  const changeLang = useCallback((langId: string) => {
    const lang = LANGUAGES[langId];
    if (!lang) return;
    setCurrentLangId(langId);
    setCode(lang.starter);
    setOutput("");
    setRunStatus("idle");
    setExecTime(null);
    setExecMemory(null);
    setStatusLabel("");
  }, []);

  const handleCodeChange = useCallback((value: string) => {
    setCode(value);
    const lines = value.split("\n").length;
    const words = value.trim() ? value.trim().split(/\s+/).length : 0;
    setStats((prev) => ({
      ...prev,
      lines,
      chars: value.length,
      words,
    }));
  }, []);

  const runCode = useCallback(async () => {
    if (runStatus === "running") return;
    const lang = LANGUAGES[currentLangId];
    if (!lang) return;

    setRunStatus("running");
    setOutput("");
    setOutputIsError(false);
    setExecTime(null);
    setExecMemory(null);
    setActiveOutputTab("output");
    startTimeRef.current = Date.now();

    try {
      const result = await executeCode({
        source_code: code,
        language_id: lang.judge0Id,
        stdin: stdin || undefined,
      });

      const { text, isError, statusLabel: label } = formatOutput(result);
      const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(3);

      setOutput(text);
      setOutputIsError(isError);
      setRunStatus(isError ? "error" : "success");
      setExecTime(result.time || elapsed);
      setExecMemory(result.memory || null);
      setStatusLabel(label);
    } catch (err) {
      const elapsed = ((Date.now() - startTimeRef.current) / 1000).toFixed(3);
      if (err instanceof Judge0Error) {
        setOutput(
          `⚠️  Execution Error\n\n${err.message}\n\nTo enable real code execution:\n1. Get a free API key at https://rapidapi.com/judge0-official/api/judge0-ce\n2. Add it to .env.local as NEXT_PUBLIC_JUDGE0_API_KEY`
        );
      } else {
        setOutput(`Unexpected error: ${String(err)}`);
      }
      setOutputIsError(true);
      setRunStatus("error");
      setExecTime(elapsed);
    }
  }, [runStatus, currentLangId, code, stdin]);

  const resetCode = useCallback(() => {
    const lang = LANGUAGES[currentLangId];
    if (lang) setCode(lang.starter);
  }, [currentLangId]);

  const clearOutput = useCallback(() => {
    setOutput("");
    setRunStatus("idle");
    setExecTime(null);
    setExecMemory(null);
    setStatusLabel("");
  }, []);

  return {
    // State
    currentLangId,
    code,
    themeId,
    fontSize,
    stdin,
    output,
    outputIsError,
    runStatus,
    execTime,
    execMemory,
    statusLabel,
    activeOutputTab,
    stats,

    // Actions
    changeLang,
    handleCodeChange,
    runCode,
    resetCode,
    clearOutput,
    setThemeId,
    setFontSize,
    setStdin,
    setActiveOutputTab,
    setStats,
  };
}
