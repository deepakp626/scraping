# Graph Report - scraping  (2026-09-07)

## Corpus Check
- 224 files · ~1,096,501 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 782 nodes · 837 edges · 160 communities (117 shown, 43 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2a51b241`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 99|Community 99]]
- [[_COMMUNITY_Community 100|Community 100]]
- [[_COMMUNITY_Community 101|Community 101]]
- [[_COMMUNITY_Community 104|Community 104]]
- [[_COMMUNITY_Community 109|Community 109]]
- [[_COMMUNITY_Community 115|Community 115]]
- [[_COMMUNITY_Community 124|Community 124]]
- [[_COMMUNITY_Community 136|Community 136]]
- [[_COMMUNITY_Community 137|Community 137]]
- [[_COMMUNITY_Community 139|Community 139]]
- [[_COMMUNITY_Community 140|Community 140]]
- [[_COMMUNITY_Community 141|Community 141]]
- [[_COMMUNITY_Community 144|Community 144]]
- [[_COMMUNITY_Community 146|Community 146]]
- [[_COMMUNITY_Community 147|Community 147]]
- [[_COMMUNITY_Community 149|Community 149]]
- [[_COMMUNITY_Community 155|Community 155]]
- [[_COMMUNITY_Community 156|Community 156]]
- [[_COMMUNITY_Community 159|Community 159]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `RunStatus` - 15 edges
3. `LANGUAGES` - 8 edges
4. `API_ENDPOINTS` - 8 edges
5. `OutputTab` - 7 edges
6. `EditorStats` - 6 edges
7. `scripts` - 6 edges
8. `MonacoEditorStats` - 5 edges
9. `normalizeMonacoLanguage()` - 5 edges
10. `extractApiErrorMessage()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `ToolbarProps` --references--> `RunStatus`  [EXTRACTED]
  app/tooles/coding-tooles/components/Toolbar.tsx → app/tooles/coding-tooles/types/editor.ts
- `PopoverContent()` --calls--> `cn()`  [EXTRACTED]
  components/tiptap-ui-primitive/popover/popover.tsx → lib/tiptap-utils.ts
- `CodeEditorProps` --references--> `EditorStats`  [EXTRACTED]
  app/tooles/coding-tooles/components/CodeEditor.tsx → app/tooles/coding-tooles/types/editor.ts
- `StatusBarProps` --references--> `RunStatus`  [EXTRACTED]
  app/tooles/coding-tooles/components/StatusBar.tsx → app/tooles/coding-tooles/types/editor.ts
- `MonacoStatusBarProps` --references--> `RunStatus`  [EXTRACTED]
  app/tooles/coding-tooles/monaco-components/MonacoStatusBar.tsx → app/tooles/coding-tooles/types/editor.ts

## Import Cycles
- None detected.

## Communities (160 total, 43 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (10): sliderItems, stats, ComparisonRowProps, terminalLines, categories, steps, technologies, csvData (+2 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (5): geistMono, geistSans, metadata, TABS, reviews

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (21): devDependencies, eslint, eslint-config-next, sass, tailwindcss, @tailwindcss/postcss, @types/js-yaml, @types/node (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (18): datasetIndustries, DatasetIndustry, DatasetItem, DatasetsMegaMenu(), panelVariants, dropdownVariants, itemVariants, mobileMenuVariants (+10 more)

### Community 5 - "Community 5"
Cohesion: 0.03
Nodes (69): dependencies, axios, browser-image-compression, clsx, @codemirror/lang-cpp, @codemirror/lang-css, @codemirror/lang-go, @codemirror/lang-html (+61 more)

### Community 6 - "Community 6"
Cohesion: 0.23
Nodes (6): ConverterTool, ConverterToolsSection(), tools, ImageToolsSection(), JsonToolsSection(), PdfToolsSection()

### Community 7 - "Community 7"
Cohesion: 0.22
Nodes (6): datasetCategories, features, processSteps, stats, testimonials, whyUs

### Community 8 - "Community 8"
Cohesion: 0.25
Nodes (6): aboutUs, datasetProcess, metadata, services, stats, useCases

### Community 9 - "Community 9"
Cohesion: 0.32
Nodes (4): componentsMap, PageProps, ImageTool, imageTools

### Community 10 - "Community 10"
Cohesion: 0.29
Nodes (6): Color Palette, Deploy on Vercel, Getting Started, Graphify, Learn More, Theme Design

### Community 12 - "Community 12"
Cohesion: 0.22
Nodes (8): loadMonaco(), MONACO_THEMES, MonacoThemeItem, normalizeMonacoLanguage(), MonacoDiffEditorProps, MonacoEditorProps, MonacoEditorStats, MonacoStatusBarProps

### Community 14 - "Community 14"
Cohesion: 0.83
Nodes (3): ConvertPng(), formatSize(), savingsLabel()

### Community 15 - "Community 15"
Cohesion: 0.83
Nodes (3): ConvertWebp(), formatSize(), savingsPct()

### Community 39 - "Community 39"
Cohesion: 0.40
Nodes (3): componentsMap, PageProps, ToolConfig

### Community 48 - "Community 48"
Cohesion: 0.33
Nodes (4): LENGTH_UNITS, UnitConfig, UnitType, WEIGHT_UNITS

### Community 57 - "Community 57"
Cohesion: 0.20
Nodes (6): metadata, capabilities, categories, keyFeatures, ServiceItem, servicesData

### Community 58 - "Community 58"
Cohesion: 0.25
Nodes (6): benefits, ecommerIcons, features, highlights, stats, useCases

### Community 61 - "Community 61"
Cohesion: 0.22
Nodes (7): BenefitItem, FeatureBlock, GridFeatureItem, PlatformItem, ServiceTemplateProps, StatItem, UseCaseItem

### Community 101 - "Community 101"
Cohesion: 0.29
Nodes (3): diffpatcher, DiffStats, EditorPanelProps

### Community 104 - "Community 104"
Cohesion: 0.47
Nodes (3): balanceBracketsAndQuotes(), repairJsonString(), sanitizeJsonContextually()

### Community 124 - "Community 124"
Cohesion: 0.33
Nodes (3): JsonErrorDetails, ValidationResult, ValidationStats

### Community 136 - "Community 136"
Cohesion: 0.07
Nodes (12): cn(), findNodeAtPosition(), findNodePosition(), isAllowedUri(), isValidPosition(), MAC_SYMBOLS, ProtocolConfig, ProtocolOptions (+4 more)

### Community 137 - "Community 137"
Cohesion: 0.16
Nodes (6): OcrApiResponse, PageData, PreviewDevice, apiClient, extractApiErrorMessage(), API_ENDPOINTS

### Community 144 - "Community 144"
Cohesion: 0.14
Nodes (7): CodingToolsSection(), CodeEditorProps, THEME_MAP, StatusBarProps, getLanguage(), LANGUAGES, EditorStats

### Community 146 - "Community 146"
Cohesion: 0.19
Nodes (11): CodeEditor, CodeRunEditor(), CodeRunEditorProps, executeCode(), formatOutput(), Judge0Error, runLocally(), SubmissionPayload (+3 more)

### Community 147 - "Community 147"
Cohesion: 0.26
Nodes (6): LANGUAGE_LIST, LANGUAGE_IMAGE_MAP, MonacoLanguageModalProps, FONT_FAMILIES, MonacoToolbarProps, LanguageConfig

### Community 149 - "Community 149"
Cohesion: 0.27
Nodes (7): OutputPanelProps, SHORTCUTS, TABS, MONACO_SHORTCUTS, MonacoOutputPanelProps, OutputTab, RunStatus

### Community 155 - "Community 155"
Cohesion: 0.40
Nodes (3): PositionPreset, SignatureCanvas, SignatureMode

### Community 156 - "Community 156"
Cohesion: 0.20
Nodes (5): MonacoCodeRunEditorProps, MonacoDiffEditor, MonacoEditor, EditorFile, MonacoFileExplorerProps

### Community 159 - "Community 159"
Cohesion: 0.40
Nodes (3): ToolbarProps, ThemeId, THEMES

## Knowledge Gaps
- **244 isolated node(s):** `metadata`, `stats`, `services`, `datasetProcess`, `useCases` (+239 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 5` to `Community 3`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `RunStatus` connect `Community 149` to `Community 12`, `Community 144`, `Community 146`, `Community 147`, `Community 156`, `Community 159`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **What connects `metadata`, `stats`, `services` to the rest of the system?**
  _244 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._