// app/tooles/coding-tooles/monaco-components/index.ts
export { default as MonacoEditor } from "./MonacoEditor";
export type { MonacoEditorProps, MonacoEditorStats } from "./MonacoEditor";

export { default as MonacoCodeRunEditor } from "./MonacoCodeRunEditor";
export type { MonacoCodeRunEditorProps } from "./MonacoCodeRunEditor";

export { default as MonacoToolbar } from "./MonacoToolbar";
export type { MonacoToolbarProps } from "./MonacoToolbar";

export { default as MonacoOutputPanel } from "./MonacoOutputPanel";
export type { MonacoOutputPanelProps } from "./MonacoOutputPanel";

export { default as MonacoStatusBar } from "./MonacoStatusBar";
export type { MonacoStatusBarProps } from "./MonacoStatusBar";

export { default as MonacoDiffEditor } from "./MonacoDiffEditor";
export type { MonacoDiffEditorProps } from "./MonacoDiffEditor";

export { default as MonacoFileExplorer } from "./MonacoFileExplorer";
export type { MonacoFileExplorerProps, EditorFile } from "./MonacoFileExplorer";

export { default as MonacoLanguageModal } from "./MonacoLanguageModal";
export { default as MonacoLanguagePopup } from "./MonacoLanguageModal";
export type { MonacoLanguageModalProps } from "./MonacoLanguageModal";

export {
  loadMonaco,
  normalizeMonacoLanguage,
  MONACO_THEMES,
} from "./monaco-loader";
export type { MonacoThemeItem } from "./monaco-loader";
