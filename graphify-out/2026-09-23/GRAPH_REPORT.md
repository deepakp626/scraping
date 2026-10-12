# Graph Report - scraping  (2026-09-22)

## Corpus Check
- 224 files · ~1,821,760 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: .css 3, .scss 3, (none) 1)

## Summary
- 872 nodes · 1689 edges · 89 communities (43 shown, 46 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0559cb48`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app/page.tsx
- layout.tsx
- compilerOptions
- devDependencies
- MonacoCodeRunEditor.tsx
- dependencies
- package.json
- json-tooles/[slug]/page.tsx
- ConverterTemplate.tsx
- lucide-react
- README.md
- image-tooles/[slug]/page.tsx
- SignPDF.tsx
- converter-tools/[slug]/page.tsx
- react
- JSONViewer.tsx
- browser-image-compression
- JSONSchemaValidator.tsx
- Navbar.tsx
- ServicesPageClient.tsx
- JSONDiff.tsx
- dataset/page.tsx
- JSONFormatter.tsx
- about/page.tsx
- ServiceTemplate.tsx
- ecommerce-data-scraping/page.tsx
- framer-motion
- json-tooles/components/CSVToJSON.tsx
- DatasetsMegaMenu.tsx
- ToolsMegaMenu.tsx
- UnitConverter.tsx
- CropImage.tsx
- pdf-tooles/components/ImageToPdf.tsx
- YAMLToJSON.tsx
- JSONValidator.tsx
- PdfToWord.tsx
- scripts
- eslint.config.mjs
- next
- TerminalAnimation.tsx
- postcss.config.mjs
- ServiceTemplate
- servicesData.ts
- ConvertJpg.tsx
- PdfToImages.tsx
- blog/[slug]/page.tsx
- CountSection.tsx
- FireAnimation.tsx
- ScrapingProcess.tsx
- car-rental-data-scraping/page.tsx
- fashion-scraping/page.tsx
- finance-and-stock-scraping/page.tsx
- food-data-scraping/page.tsx
- food-delivery-data-scraping-service/page.tsx
- healthcare-data-scraping/page.tsx
- liquor-or-alchol-data-scraping/page.tsx
- ott-streaming-data-scraping-service/page.tsx
- quick-commerce-fmcg-data-scraping/page.tsx
- quick-commerce-scraping/page.tsx
- real-estate-property-data-scraping/page.tsx
- recruitment-data-scraping-service/page.tsx
- social-media-scraping-services/page.tsx
- travel-data-scraping/page.tsx
- ConvertPng.tsx
- ConvertWebp.tsx
- JSONToHTMLTable.tsx
- ChangeFormat.tsx
- ConvertImages.tsx
- RemoveBg.tsx
- rules/graphify.md
- workflows/graphify.md
- tiptap-utils.ts
- OcrPDF.tsx
- scss.d.ts

## God Nodes (most connected - your core abstractions)
1. `react` - 170 edges
2. `lucide-react` - 129 edges
3. `next` - 46 edges
4. `@codemirror/lang-json` - 29 edges
5. `@uiw/react-codemirror` - 29 edges
6. `ConverterTemplate()` - 27 edges
7. `ServiceTemplate()` - 16 edges
8. `framer-motion` - 16 edges
9. `compilerOptions` - 16 edges
10. `RunStatus` - 15 edges

## Surprising Connections (you probably didn't know these)
- `LockPDF()` --calls--> `extractApiErrorMessage()`  [EXTRACTED]
  app/tooles/pdf-tooles/components/LockPDF.tsx → lib/apiClient.ts
- `OcrPDF()` --calls--> `extractApiErrorMessage()`  [EXTRACTED]
  app/tooles/pdf-tooles/components/OcrPDF.tsx → lib/apiClient.ts
- `UnlockPDF()` --calls--> `extractApiErrorMessage()`  [EXTRACTED]
  app/tooles/pdf-tooles/components/UnlockPDF.tsx → lib/apiClient.ts
- `CodeEditorProps` --references--> `EditorStats`  [EXTRACTED]
  app/tooles/coding-tooles/components/CodeEditor.tsx → app/tooles/coding-tooles/types/editor.ts
- `PdfToHtml()` --calls--> `extractApiErrorMessage()`  [EXTRACTED]
  app/tooles/pdf-tooles/components/PdfToHtml.tsx → lib/apiClient.ts

## Import Cycles
- None detected.

## Communities (89 total, 46 thin omitted)

### Community 0 - "app/page.tsx"
Cohesion: 0.24
Nodes (6): Slider(), sliderItems, HeroSection(), terminalLines, categories, IndustryTabSection()

### Community 1 - "layout.tsx"
Cohesion: 0.10
Nodes (15): ConditionalContact(), CTA(), FAQ(), Footer(), Resources(), TABS, Review(), reviews (+7 more)

### Community 2 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 3 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, eslint, eslint-config-next, sass, tailwindcss, @tailwindcss/postcss, @types/js-yaml, @types/node (+4 more)

### Community 4 - "MonacoCodeRunEditor.tsx"
Cohesion: 0.05
Nodes (69): detectLanguageFromSlug(), DynamicCodeToolPage(), getLanguageIcon(), CodeRunEditor(), CodeRunEditorProps, OutputPanel(), OutputPanelProps, SHORTCUTS (+61 more)

### Community 5 - "dependencies"
Cohesion: 0.03
Nodes (69): dependencies, axios, browser-image-compression, clsx, @codemirror/lang-cpp, @codemirror/lang-css, @codemirror/lang-go, @codemirror/lang-html (+61 more)

### Community 6 - "package.json"
Cohesion: 0.05
Nodes (48): CodeEditor(), CodeEditorProps, getLanguageExtension(), THEME_MAP, CodeEditor, SignatureCanvas, name, private (+40 more)

### Community 7 - "json-tooles/[slug]/page.tsx"
Cohesion: 0.09
Nodes (10): DiffItem, InspectionNode, ParsedMetrics, componentsMap, PageProps, @codemirror/lang-json, jsonpath-plus, @uiw/react-codemirror (+2 more)

### Community 9 - "lucide-react"
Cohesion: 0.12
Nodes (9): ExtractPages(), PDFItem, SplitPDF(), SplitResult, componentsMap, PageProps, ToolConfig, lucide-react (+1 more)

### Community 10 - "README.md"
Cohesion: 0.29
Nodes (6): Color Palette, Deploy on Vercel, Getting Started, Graphify, Learn More, Theme Design

### Community 11 - "image-tooles/[slug]/page.tsx"
Cohesion: 0.11
Nodes (4): ImageTool, imageTools, componentsMap, PageProps

### Community 12 - "SignPDF.tsx"
Cohesion: 0.13
Nodes (12): OcrPDF(), PageNumbers(), PdfToImage(), PdfToWord(), RemovePages(), PageTextRecord, SearchMatch, SearchPDF() (+4 more)

### Community 13 - "converter-tools/[slug]/page.tsx"
Cohesion: 0.12
Nodes (4): BaseType, CaseType, componentsMap, PageProps

### Community 15 - "JSONViewer.tsx"
Cohesion: 0.16
Nodes (9): getStats(), JSONBeautifier(), jsonDarkHighlightStyle, ViewTab, ref_codemirror_commands, @codemirror/language, ref_codemirror_view, ref_lezer_highlight (+1 more)

### Community 17 - "JSONSchemaValidator.tsx"
Cohesion: 0.15
Nodes (5): ValidationStatus, ref_ajv, @codemirror/lang-xml, fast-xml-parser, @uiw/codemirror-theme-vscode

### Community 18 - "Navbar.tsx"
Cohesion: 0.20
Nodes (9): dropdownVariants, itemVariants, mobileMenuVariants, Navbar(), navVariants, ServiceGroup, ServiceLink, servicesColumns (+1 more)

### Community 19 - "ServicesPageClient.tsx"
Cohesion: 0.22
Nodes (7): metadata, capabilities, categories, keyFeatures, ServiceItem, servicesData, ServicesPageClient()

### Community 20 - "JSONDiff.tsx"
Cohesion: 0.22
Nodes (8): countDeltaStats(), walk(), diffpatcher, DiffStats, EditorPanelProps, JSONDiff(), jsondiffpatch, jsondiffpatch

### Community 21 - "dataset/page.tsx"
Cohesion: 0.22
Nodes (6): datasetCategories, features, processSteps, stats, testimonials, whyUs

### Community 22 - "JSONFormatter.tsx"
Cohesion: 0.31
Nodes (5): balanceBracketsAndQuotes(), JSONFormatter(), repairJsonString(), sanitizeJsonContextually(), jsonrepair

### Community 23 - "about/page.tsx"
Cohesion: 0.25
Nodes (6): aboutUs, datasetProcess, metadata, services, stats, useCases

### Community 24 - "ServiceTemplate.tsx"
Cohesion: 0.25
Nodes (7): BenefitItem, FeatureBlock, GridFeatureItem, PlatformItem, ServiceTemplateProps, StatItem, UseCaseItem

### Community 25 - "ecommerce-data-scraping/page.tsx"
Cohesion: 0.25
Nodes (6): benefits, ecommerIcons, features, highlights, stats, useCases

### Community 26 - "framer-motion"
Cohesion: 0.29
Nodes (4): posts, ScrapingTechnology(), technologies, framer-motion

### Community 27 - "json-tooles/components/CSVToJSON.tsx"
Cohesion: 0.29
Nodes (3): json-2-csv, papaparse, react-csv

### Community 28 - "DatasetsMegaMenu.tsx"
Cohesion: 0.33
Nodes (5): datasetIndustries, DatasetIndustry, DatasetItem, DatasetsMegaMenu(), panelVariants

### Community 29 - "ToolsMegaMenu.tsx"
Cohesion: 0.33
Nodes (5): panelVariants, Tool, toolCategories, ToolCategory, ToolsMegaMenu()

### Community 30 - "UnitConverter.tsx"
Cohesion: 0.33
Nodes (4): LENGTH_UNITS, UnitConfig, UnitType, WEIGHT_UNITS

### Community 31 - "CropImage.tsx"
Cohesion: 0.40
Nodes (5): Area, ASPECT_RATIO_PRESETS, CropImage(), getCroppedImg(), react-easy-crop

### Community 34 - "JSONValidator.tsx"
Cohesion: 0.40
Nodes (5): getJsonErrorDetails(), JsonErrorDetails, JSONValidator(), ValidationResult, ValidationStats

### Community 35 - "PdfToWord.tsx"
Cohesion: 0.47
Nodes (3): @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit

### Community 36 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, start, type-check

### Community 37 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): eslintConfig, eslint, eslint-config-next

### Community 38 - "next"
Cohesion: 0.13
Nodes (11): app_tooles_coding_tooles_components_index_coderuneditor, CodingToolsSection(), ConverterTool, ConverterToolsSection(), tools, ImageToolsSection(), JsonToolsSection(), PdfToolsSection() (+3 more)

### Community 39 - "TerminalAnimation.tsx"
Cohesion: 0.40
Nodes (4): csvData, pythonScript, TerminalAnimation(), terminalLines

### Community 43 - "ConvertJpg.tsx"
Cohesion: 0.40
Nodes (3): ConvertJpg(), FORMAT_OPTIONS, image-conversion

### Community 44 - "PdfToImages.tsx"
Cohesion: 0.60
Nodes (4): App(), loadJsZip(), loadPdfJs(), SelectedImage

### Community 46 - "CountSection.tsx"
Cohesion: 0.50
Nodes (3): CountSection(), stats, react-countup

### Community 63 - "ConvertPng.tsx"
Cohesion: 0.83
Nodes (3): ConvertPng(), formatSize(), savingsLabel()

### Community 64 - "ConvertWebp.tsx"
Cohesion: 0.83
Nodes (3): ConvertWebp(), formatSize(), savingsPct()

### Community 65 - "JSONToHTMLTable.tsx"
Cohesion: 0.67
Nodes (3): escapeHtml(), JSONToHTMLTable(), @codemirror/lang-html

### Community 136 - "tiptap-utils.ts"
Cohesion: 0.07
Nodes (19): PopoverContent(), cn(), findNodeAtPosition(), findNodePosition(), formatShortcutKey(), isAllowedUri(), isMac(), isValidPosition() (+11 more)

### Community 137 - "OcrPDF.tsx"
Cohesion: 0.23
Nodes (10): LockPDF(), OcrApiResponse, PageData, PdfToHtml(), PreviewDevice, UnlockPDF(), apiClient, extractApiErrorMessage() (+2 more)

## Knowledge Gaps
- **263 isolated node(s):** `metadata`, `stats`, `services`, `datasetProcess`, `useCases` (+258 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 431 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `app/page.tsx`, `layout.tsx`, `MonacoCodeRunEditor.tsx`, `package.json`, `json-tooles/[slug]/page.tsx`, `ConverterTemplate.tsx`, `lucide-react`, `OcrPDF.tsx`, `image-tooles/[slug]/page.tsx`, `SignPDF.tsx`, `converter-tools/[slug]/page.tsx`, `JSONViewer.tsx`, `browser-image-compression`, `JSONSchemaValidator.tsx`, `Navbar.tsx`, `ServicesPageClient.tsx`, `JSONDiff.tsx`, `dataset/page.tsx`, `JSONFormatter.tsx`, `about/page.tsx`, `ServiceTemplate.tsx`, `ecommerce-data-scraping/page.tsx`, `framer-motion`, `json-tooles/components/CSVToJSON.tsx`, `DatasetsMegaMenu.tsx`, `ToolsMegaMenu.tsx`, `UnitConverter.tsx`, `CropImage.tsx`, `pdf-tooles/components/ImageToPdf.tsx`, `YAMLToJSON.tsx`, `JSONValidator.tsx`, `PdfToWord.tsx`, `next`, `TerminalAnimation.tsx`, `ServiceTemplate`, `servicesData.ts`, `ConvertJpg.tsx`, `PdfToImages.tsx`, `blog/[slug]/page.tsx`, `CountSection.tsx`, `FireAnimation.tsx`, `ScrapingProcess.tsx`, `car-rental-data-scraping/page.tsx`, `fashion-scraping/page.tsx`, `food-data-scraping/page.tsx`, `liquor-or-alchol-data-scraping/page.tsx`, `quick-commerce-scraping/page.tsx`, `recruitment-data-scraping-service/page.tsx`, `ConvertPng.tsx`, `ConvertWebp.tsx`, `JSONToHTMLTable.tsx`, `ChangeFormat.tsx`, `ColorAdjust.tsx`, `ConvertImages.tsx`, `RemoveBg.tsx`, `CSVToExcel.tsx`, `EPUBToMOBI.tsx`, `EPUBToPDF.tsx`, `ExcelToXML.tsx`, `ImageConverter.tsx`, `converter-tools/components/JSONToExcel.tsx`, `MP4Converter.tsx`, `PDFToExcel.tsx`, `PDFToPPT.tsx`, `SplitCSV.tsx`, `VideoConverter.tsx`, `XMLToExcel.tsx`?**
  _High betweenness centrality (0.444) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `app/page.tsx`, `layout.tsx`, `MonacoCodeRunEditor.tsx`, `package.json`, `json-tooles/[slug]/page.tsx`, `ConverterTemplate.tsx`, `OcrPDF.tsx`, `image-tooles/[slug]/page.tsx`, `SignPDF.tsx`, `converter-tools/[slug]/page.tsx`, `react`, `JSONViewer.tsx`, `browser-image-compression`, `JSONSchemaValidator.tsx`, `Navbar.tsx`, `ServicesPageClient.tsx`, `JSONDiff.tsx`, `dataset/page.tsx`, `JSONFormatter.tsx`, `ServiceTemplate.tsx`, `ecommerce-data-scraping/page.tsx`, `framer-motion`, `json-tooles/components/CSVToJSON.tsx`, `DatasetsMegaMenu.tsx`, `ToolsMegaMenu.tsx`, `UnitConverter.tsx`, `CropImage.tsx`, `pdf-tooles/components/ImageToPdf.tsx`, `YAMLToJSON.tsx`, `JSONValidator.tsx`, `PdfToWord.tsx`, `next`, `TerminalAnimation.tsx`, `ServiceTemplate`, `servicesData.ts`, `ConvertJpg.tsx`, `CountSection.tsx`, `FireAnimation.tsx`, `ScrapingProcess.tsx`, `car-rental-data-scraping/page.tsx`, `fashion-scraping/page.tsx`, `finance-and-stock-scraping/page.tsx`, `food-data-scraping/page.tsx`, `food-delivery-data-scraping-service/page.tsx`, `healthcare-data-scraping/page.tsx`, `liquor-or-alchol-data-scraping/page.tsx`, `ott-streaming-data-scraping-service/page.tsx`, `quick-commerce-fmcg-data-scraping/page.tsx`, `quick-commerce-scraping/page.tsx`, `real-estate-property-data-scraping/page.tsx`, `recruitment-data-scraping-service/page.tsx`, `social-media-scraping-services/page.tsx`, `travel-data-scraping/page.tsx`, `ConvertPng.tsx`, `ConvertWebp.tsx`, `JSONToHTMLTable.tsx`, `ChangeFormat.tsx`, `ColorAdjust.tsx`?**
  _High betweenness centrality (0.230) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **What connects `metadata`, `stats`, `services` to the rest of the system?**
  _263 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10153846153846154 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `MonacoCodeRunEditor.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05490734385724091 - nodes in this community are weakly interconnected._