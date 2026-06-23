# Graph Report - scraping  (2026-06-24)

## Corpus Check
- 110 files · ~338,097 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 405 nodes · 404 edges · 57 communities (41 shown, 16 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `65b69432`
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
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `RunStatus` - 8 edges
3. `EditorStats` - 6 edges
4. `scripts` - 6 edges
5. `LANGUAGES` - 4 edges
6. `OutputTab` - 4 edges
7. `OutputPanelProps` - 3 edges
8. `StatusBarProps` - 3 edges
9. `Judge0Error` - 3 edges
10. `executeCode()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `CodeEditorProps` --references--> `EditorStats`  [EXTRACTED]
  app/tooles/coding-tooles/components/CodeEditor.tsx → app/tooles/coding-tooles/types/editor.ts
- `ToolbarProps` --references--> `RunStatus`  [EXTRACTED]
  app/tooles/coding-tooles/components/Toolbar.tsx → app/tooles/coding-tooles/types/editor.ts
- `CodeRunEditor()` --calls--> `useEditorStore()`  [EXTRACTED]
  app/tooles/coding-tooles/components/CodeRunEditor.tsx → app/tooles/coding-tooles/lib/useEditorStore.ts
- `OutputPanelProps` --references--> `OutputTab`  [EXTRACTED]
  app/tooles/coding-tooles/components/OutputPanel.tsx → app/tooles/coding-tooles/types/editor.ts
- `OutputPanelProps` --references--> `RunStatus`  [EXTRACTED]
  app/tooles/coding-tooles/components/OutputPanel.tsx → app/tooles/coding-tooles/types/editor.ts

## Import Cycles
- None detected.

## Communities (57 total, 16 thin omitted)

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
Cohesion: 0.11
Nodes (18): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+10 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (19): datasetIndustries, DatasetIndustry, DatasetItem, DatasetsMegaMenu(), panelVariants, dropdownVariants, itemVariants, mobileMenuVariants (+11 more)

### Community 5 - "Community 5"
Cohesion: 0.04
Nodes (45): dependencies, axios, browser-image-compression, clsx, @codemirror/lang-cpp, @codemirror/lang-css, @codemirror/lang-go, @codemirror/lang-html (+37 more)

### Community 6 - "Community 6"
Cohesion: 0.27
Nodes (5): ConverterTool, ConverterToolsSection(), tools, ImageToolsSection(), PdfToolsSection()

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
Cohesion: 0.08
Nodes (27): CodingToolsSection(), CodeEditorProps, THEME_MAP, CodeEditor, CodeRunEditor(), CodeRunEditorProps, OutputPanelProps, SHORTCUTS (+19 more)

### Community 14 - "Community 14"
Cohesion: 0.83
Nodes (3): ConvertPng(), formatSize(), savingsLabel()

### Community 15 - "Community 15"
Cohesion: 0.83
Nodes (3): ConvertWebp(), formatSize(), savingsPct()

### Community 48 - "Community 48"
Cohesion: 0.33
Nodes (4): LENGTH_UNITS, UnitConfig, UnitType, WEIGHT_UNITS

## Knowledge Gaps
- **160 isolated node(s):** `metadata`, `stats`, `services`, `datasetProcess`, `useCases` (+155 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 5` to `Community 3`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `metadata`, `stats`, `services` to the rest of the system?**
  _160 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06666666666666667 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.09420289855072464 - nodes in this community are weakly interconnected._