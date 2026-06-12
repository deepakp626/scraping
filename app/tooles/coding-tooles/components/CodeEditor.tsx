// src/components/editor/CodeEditor.tsx
"use client";

import React, { useCallback, useMemo, useRef } from "react";
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { rust } from "@codemirror/lang-rust";
import { go } from "@codemirror/lang-go";
import { php } from "@codemirror/lang-php";
import { sql } from "@codemirror/lang-sql";
import { markdown } from "@codemirror/lang-markdown";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { xml } from "@codemirror/lang-xml";
import { StreamLanguage } from "@codemirror/language";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import { kotlin } from "@codemirror/legacy-modes/mode/clike";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { r } from "@codemirror/legacy-modes/mode/r";
import { lua } from "@codemirror/legacy-modes/mode/lua";
import { shell } from "@codemirror/legacy-modes/mode/shell";
import { perl } from "@codemirror/legacy-modes/mode/perl";
import { haskell } from "@codemirror/legacy-modes/mode/haskell";
import { scala } from "@codemirror/legacy-modes/mode/clike";
// import { dart } from "@codemirror/legacy-modes/mode/dart";

// Themes
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { monokai } from "@uiw/codemirror-theme-monokai";
import { nord } from "@uiw/codemirror-theme-nord";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";

import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { EditorView } from "@codemirror/view";
import type { Extension } from "@codemirror/state";
import type { EditorStats } from "../types/editor";

const THEME_MAP: Record<string, Extension> = {
  vscodeDark,
  dracula,
  githubDark,
  githubLight,
  monokai,
  nord,
  okaidia,
  tokyoNight,
};

function getLanguageExtension(langId: string): Extension {
  switch (langId) {
    case "javascript": return javascript({ jsx: true });
    case "typescript": return javascript({ jsx: true, typescript: true });
    case "python":     return python();
    case "java":       return java();
    case "cpp":        return cpp();
    case "c":          return cpp();
    case "csharp":     return StreamLanguage.define(scala); // closest available
    case "go":         return go();
    case "rust":       return rust();
    case "kotlin":     return StreamLanguage.define(kotlin);
    case "swift":      return StreamLanguage.define(swift);
    case "ruby":       return StreamLanguage.define(ruby);
    case "php":        return php();
    case "sql":        return sql();
    case "r":          return StreamLanguage.define(r);
    case "bash":       return StreamLanguage.define(shell);
    case "perl":       return StreamLanguage.define(perl);
    case "haskell":    return StreamLanguage.define(haskell);
    case "scala":      return StreamLanguage.define(scala);
    case "lua":        return StreamLanguage.define(lua);
    // case "dart":       return StreamLanguage.define(dart);
    case "markdown":   return markdown();
    case "html":       return html();
    case "css":        return css();
    case "json":       return json();
    case "xml":        return xml();
    default:           return javascript();
  }
}

interface CodeEditorProps {
  code: string;
  langId: string;
  themeId: string;
  fontSize: number;
  onChange: (value: string) => void;
  onRun: () => void;
  onStatsChange: (stats: Partial<EditorStats>) => void;
  readOnly?: boolean;
}


export default function CodeEditor({
  code,
  langId,
  themeId,
  fontSize,
  onChange,
  onRun,
  onStatsChange, // Assume this is memoized in the parent
  readOnly = false,
}: CodeEditorProps) {
  const onStatsChangeRef = useRef(onStatsChange);
  onStatsChangeRef.current = onStatsChange;

  const lastStatsRef = useRef({
    lines: -1,
    chars: -1,
    cursorLine: -1,
    cursorCol: -1,
  });

  // Memoize handleUpdate with stable dependencies
  const handleUpdate = useCallback(
    (viewUpdate: ViewUpdate) => {
      const state = viewUpdate.state;
      const cursor = state.selection.main.head;
      const line = state.doc.lineAt(cursor);

      const lines = state.doc.lines;
      const chars = state.doc.length;
      const cursorLine = line.number;
      const cursorCol = cursor - line.from + 1;

      const last = lastStatsRef.current;
      if (
        lines !== last.lines ||
        chars !== last.chars ||
        cursorLine !== last.cursorLine ||
        cursorCol !== last.cursorCol
      ) {
        const nextStats = { lines, chars, cursorLine, cursorCol };
        lastStatsRef.current = nextStats;
        onStatsChangeRef.current(nextStats);
      }
    },
    []
  );

  const extensions = useMemo((): Extension[] => {
    return [
      getLanguageExtension(langId),
      keymap.of([
        indentWithTab,
        {
          key: "Mod-Enter",
          run: () => { onRun(); return true; },
        },
      ]),
      EditorView.lineWrapping,
      EditorView.theme({
        "&": { fontSize: `${fontSize}px` },
        ".cm-content": { fontFamily: "'JetBrains Mono', 'Fira Code', monospace", padding: "12px 0" },
        ".cm-gutters": { minWidth: "48px" },
        ".cm-lineNumbers .cm-gutterElement": { padding: "0 8px 0 12px", minWidth: "40px" },
        ".cm-scroller": { overflow: "auto" },
      }),
    ];
  }, [langId, fontSize, onRun]); // onRun is stable

  const theme = THEME_MAP[themeId] ?? vscodeDark;

  return (
    <CodeMirror
      value={code}
      height="100%"
      theme={theme}
      extensions={extensions}
      onChange={onChange}
      onUpdate={handleUpdate}
      readOnly={readOnly}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        foldGutter: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        indentOnInput: true,
        syntaxHighlighting: true,
        searchKeymap: true,
        history: true,
      }}
      style={{ height: "100%", overflow: "hidden" }}
    />
  );
}
