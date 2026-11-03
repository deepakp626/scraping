# Graph Report - compilepilot.com  (2026-11-03)

## Corpus Check
- 253 files · ~3,986,209 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: .css 3, .scss 3, (none) 2)

## Summary
- 1027 nodes · 1873 edges · 91 communities (59 shown, 32 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `266c275e`
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
- next
- README.md
- image-tooles/[slug]/page.tsx
- tooles/page.tsx
- converter-tools/[slug]/page.tsx
- react
- JSONViewer.tsx
- browser-image-compression
- JSONSchemaValidator.tsx
- ConvertImages.tsx
- ServicesPageClient.tsx
- JSONDiff.tsx
- JSONFormatter.tsx
- about/page.tsx
- ServiceTemplate.tsx
- EcommercePageClient.tsx
- lucide-react
- json-tooles/components/CSVToJSON.tsx
- sitemap.ts
- BlogClient.tsx
- UnitConverter.tsx
- CropImage.tsx
- What You Must Do When Invoked
- YAMLToJSON.tsx
- JSONValidator.tsx
- recruitment-data-scraping-service/page.tsx
- ref_components
- generate-liquor-images.js
- postcss.config.mjs
- grocery-scraping/page.tsx
- servicesData.ts
- ConvertJpg.tsx
- PdfToImages.tsx
- ProductListingsClient.tsx
- datasets/page.tsx
- ServiceTemplate
- FinanceStockClient.tsx
- FoodClient.tsx
- FoodDeliveryClient.tsx
- HealthcareClient.tsx
- LiquorClient.tsx
- OttStreamingClient.tsx
- FmcgClient.tsx
- quick-commerce-scraping/page.tsx
- real-estate-property-data-scraping/page.tsx
- ServiceSchema.tsx
- social-media-scraping-services/page.tsx
- travel-data-scraping/page.tsx
- ConvertPng.tsx
- ConvertWebp.tsx
- JSONToHTMLTable.tsx
- ChangeFormat.tsx
- RemoveBg.tsx
- rules/graphify.md
- workflows/graphify.md
- graphify reference: extra exports and benchmark
- graphify reference: query, path, explain
- themes.ts
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- extraction-spec.md
- app_tooles_coding_tooles_components_index_coderuneditor
- ref_codemirror_state
- tiptap-utils.ts
- scss.d.ts

## God Nodes (most connected - your core abstractions)
1. `react` - 176 edges
2. `lucide-react` - 128 edges
3. `next` - 69 edges
4. `@codemirror/lang-json` - 28 edges
5. `@uiw/react-codemirror` - 28 edges
6. `ConverterTemplate()` - 27 edges
7. `ServiceSchema()` - 17 edges
8. `ServiceTemplate()` - 16 edges
9. `framer-motion` - 16 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)
- `LockPDF()` --calls--> `extractApiErrorMessage()`  [EXTRACTED]
  app/tooles/pdf-tooles/components/LockPDF.tsx → lib/apiClient.ts
- `UnlockPDF()` --calls--> `extractApiErrorMessage()`  [EXTRACTED]
  app/tooles/pdf-tooles/components/UnlockPDF.tsx → lib/apiClient.ts
- `OcrPDF()` --calls--> `extractApiErrorMessage()`  [EXTRACTED]
  app/tooles/pdf-tooles/components/OcrPDF.tsx → lib/apiClient.ts
- `PdfToHtml()` --calls--> `extractApiErrorMessage()`  [EXTRACTED]
  app/tooles/pdf-tooles/components/PdfToHtml.tsx → lib/apiClient.ts
- `PopoverContent()` --calls--> `cn()`  [EXTRACTED]
  components/tiptap-ui-primitive/popover/popover.tsx → lib/tiptap-utils.ts

## Import Cycles
- None detected.

## Communities (91 total, 32 thin omitted)

### Community 0 - "app/page.tsx"
Cohesion: 0.05
Nodes (39): datasetIndustries, DatasetIndustry, DatasetItem, DatasetsMegaMenu(), panelVariants, dropdownVariants, itemVariants, mobileMenuVariants (+31 more)

### Community 1 - "layout.tsx"
Cohesion: 0.07
Nodes (23): ConditionalContact(), CTA(), FAQ(), Footer(), Navbar(), BlogCard(), BlogPost, CASE_STUDIES (+15 more)

### Community 2 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 3 - "devDependencies"
Cohesion: 0.10
Nodes (18): devDependencies, eslint, eslint-config-next, sass, tailwindcss, @tailwindcss/postcss, @types/js-yaml, @types/node (+10 more)

### Community 4 - "MonacoCodeRunEditor.tsx"
Cohesion: 0.06
Nodes (62): detectLanguageFromSlug(), DynamicCodeToolPage(), getLanguageIcon(), executeCode(), formatOutput(), Judge0Error, runLocally(), SubmissionPayload (+54 more)

### Community 5 - "dependencies"
Cohesion: 0.03
Nodes (70): dependencies, axios, browser-image-compression, clsx, @codemirror/lang-cpp, @codemirror/lang-css, @codemirror/lang-go, @codemirror/lang-html (+62 more)

### Community 6 - "package.json"
Cohesion: 0.04
Nodes (44): SignatureCanvas, eslintConfig, name, private, version, axios, @codemirror/lang-cpp, @codemirror/lang-css (+36 more)

### Community 7 - "json-tooles/[slug]/page.tsx"
Cohesion: 0.07
Nodes (13): DiffItem, InspectionNode, ParsedMetrics, componentsMap, PageProps, @codemirror/lang-javascript, @codemirror/lang-json, @codemirror/lang-xml (+5 more)

### Community 9 - "next"
Cohesion: 0.22
Nodes (3): nextConfig, next, sharp

### Community 10 - "README.md"
Cohesion: 0.29
Nodes (6): Color Palette, Deploy on Vercel, Getting Started, Graphify, Learn More, Theme Design

### Community 11 - "image-tooles/[slug]/page.tsx"
Cohesion: 0.11
Nodes (4): ImageTool, imageTools, componentsMap, PageProps

### Community 12 - "tooles/page.tsx"
Cohesion: 0.20
Nodes (7): CodingToolsSection(), ConverterTool, ConverterToolsSection(), tools, ImageToolsSection(), JsonToolsSection(), PdfToolsSection()

### Community 13 - "converter-tools/[slug]/page.tsx"
Cohesion: 0.11
Nodes (4): BaseType, CaseType, componentsMap, PageProps

### Community 15 - "JSONViewer.tsx"
Cohesion: 0.16
Nodes (9): getStats(), JSONBeautifier(), jsonDarkHighlightStyle, ViewTab, ref_codemirror_commands, @codemirror/language, ref_codemirror_view, ref_lezer_highlight (+1 more)

### Community 17 - "JSONSchemaValidator.tsx"
Cohesion: 0.22
Nodes (3): ValidationStatus, ref_ajv, @uiw/codemirror-theme-vscode

### Community 19 - "ServicesPageClient.tsx"
Cohesion: 0.22
Nodes (7): metadata, capabilities, categories, keyFeatures, ServiceItem, servicesData, ServicesPageClient()

### Community 20 - "JSONDiff.tsx"
Cohesion: 0.22
Nodes (8): countDeltaStats(), walk(), diffpatcher, DiffStats, EditorPanelProps, JSONDiff(), jsondiffpatch, jsondiffpatch

### Community 22 - "JSONFormatter.tsx"
Cohesion: 0.31
Nodes (5): balanceBracketsAndQuotes(), JSONFormatter(), repairJsonString(), sanitizeJsonContextually(), jsonrepair

### Community 23 - "about/page.tsx"
Cohesion: 0.25
Nodes (6): aboutUs, datasetProcess, metadata, services, stats, useCases

### Community 24 - "ServiceTemplate.tsx"
Cohesion: 0.22
Nodes (8): BenefitsAccordionProps, BenefitItem, FeatureBlock, GridFeatureItem, PlatformItem, ServiceTemplateProps, StatItem, UseCaseItem

### Community 25 - "EcommercePageClient.tsx"
Cohesion: 0.20
Nodes (8): benefits, EcommercePageClient(), ecommerIcons, features, highlights, stats, useCases, metadata

### Community 26 - "lucide-react"
Cohesion: 0.05
Nodes (41): app_blog, BlogDetail, BlogPostPage(), estimateReadingTime(), formatDate(), formatISODate(), ExtractPages(), ImageItem (+33 more)

### Community 27 - "json-tooles/components/CSVToJSON.tsx"
Cohesion: 0.29
Nodes (3): json-2-csv, papaparse, react-csv

### Community 28 - "sitemap.ts"
Cohesion: 0.20
Nodes (10): CODING_TOOL_SLUGS, CONVERTER_TOOL_SLUGS, FALLBACK_BLOG_POSTS, fetchBlogPosts(), IMAGE_TOOL_SLUGS, JSON_TOOL_SLUGS, PDF_TOOL_SLUGS, revalidate (+2 more)

### Community 29 - "BlogClient.tsx"
Cohesion: 0.24
Nodes (6): BlogClient(), BlogPost, PaginatedBlogsResponse, Pagination, metadata, BlogSchema()

### Community 30 - "UnitConverter.tsx"
Cohesion: 0.33
Nodes (4): LENGTH_UNITS, UnitConfig, UnitType, WEIGHT_UNITS

### Community 31 - "CropImage.tsx"
Cohesion: 0.40
Nodes (5): Area, ASPECT_RATIO_PRESETS, CropImage(), getCroppedImg(), react-easy-crop

### Community 32 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 34 - "JSONValidator.tsx"
Cohesion: 0.40
Nodes (5): getJsonErrorDetails(), JsonErrorDetails, JSONValidator(), ValidationResult, ValidationStats

### Community 36 - "recruitment-data-scraping-service/page.tsx"
Cohesion: 0.38
Nodes (3): metadata, RecruitmentClient(), recruitmentScrapingData

### Community 38 - "generate-liquor-images.js"
Cohesion: 0.25
Nodes (8): fs, generateAll(), images, outputDir, path, sharp, ref_fs, ref_path

### Community 41 - "grocery-scraping/page.tsx"
Cohesion: 0.38
Nodes (3): GroceryScrapingClient(), groceryScrapingData, metadata

### Community 43 - "ConvertJpg.tsx"
Cohesion: 0.40
Nodes (3): ConvertJpg(), FORMAT_OPTIONS, image-conversion

### Community 44 - "PdfToImages.tsx"
Cohesion: 0.60
Nodes (4): App(), loadJsZip(), loadPdfJs(), SelectedImage

### Community 46 - "ProductListingsClient.tsx"
Cohesion: 0.22
Nodes (7): metadata, attributeGroups, ecommerceDatasets, faqs, industryCategories, jsonSample, ProductListingsClient()

### Community 47 - "datasets/page.tsx"
Cohesion: 0.22
Nodes (6): datasetCategories, features, processSteps, stats, testimonials, whyUs

### Community 50 - "ServiceTemplate"
Cohesion: 0.32
Nodes (4): ServiceTemplate(), fashionData, FashionScrapingClient(), metadata

### Community 51 - "FinanceStockClient.tsx"
Cohesion: 0.38
Nodes (3): financeAndStockScrapingData, FinanceStockClient(), metadata

### Community 52 - "FoodClient.tsx"
Cohesion: 0.38
Nodes (3): FoodClient(), foodScrapingData, metadata

### Community 53 - "FoodDeliveryClient.tsx"
Cohesion: 0.38
Nodes (3): FoodDeliveryClient(), foodDeliveryDataScrapingData, metadata

### Community 54 - "HealthcareClient.tsx"
Cohesion: 0.38
Nodes (3): HealthcareClient(), healthcareDataScrapingData, metadata

### Community 55 - "LiquorClient.tsx"
Cohesion: 0.38
Nodes (3): LiquorClient(), liquorScrapingData, metadata

### Community 56 - "OttStreamingClient.tsx"
Cohesion: 0.38
Nodes (3): OttStreamingClient(), ottStreamingData, metadata

### Community 57 - "FmcgClient.tsx"
Cohesion: 0.38
Nodes (3): FmcgClient(), fmcgScrapingData, metadata

### Community 58 - "quick-commerce-scraping/page.tsx"
Cohesion: 0.38
Nodes (3): metadata, QuickCommerceClient(), quickCommerceScrapingData

### Community 59 - "real-estate-property-data-scraping/page.tsx"
Cohesion: 0.38
Nodes (3): metadata, RealEstateClient(), realEstatePropertyDataScrapingData

### Community 60 - "ServiceSchema.tsx"
Cohesion: 0.27
Nodes (5): CarRentalClient(), carRentalData, metadata, ServiceSchema(), ServiceSchemaProps

### Community 61 - "social-media-scraping-services/page.tsx"
Cohesion: 0.38
Nodes (3): metadata, SocialMediaClient(), socialMediaScrapingData

### Community 62 - "travel-data-scraping/page.tsx"
Cohesion: 0.38
Nodes (3): metadata, TravelClient(), travelDataScrapingData

### Community 63 - "ConvertPng.tsx"
Cohesion: 0.83
Nodes (3): ConvertPng(), formatSize(), savingsLabel()

### Community 64 - "ConvertWebp.tsx"
Cohesion: 0.83
Nodes (3): ConvertWebp(), formatSize(), savingsPct()

### Community 65 - "JSONToHTMLTable.tsx"
Cohesion: 0.67
Nodes (3): escapeHtml(), JSONToHTMLTable(), @codemirror/lang-html

### Community 86 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 87 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 88 - "themes.ts"
Cohesion: 0.50
Nodes (3): DEFAULT_THEME, ThemeId, THEMES

### Community 89 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 90 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 91 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 136 - "tiptap-utils.ts"
Cohesion: 0.06
Nodes (20): PopoverContent(), cn(), findNodeAtPosition(), findNodePosition(), formatShortcutKey(), isAllowedUri(), isMac(), isValidPosition() (+12 more)

## Knowledge Gaps
- **360 isolated node(s):** `metadata`, `stats`, `services`, `datasetProcess`, `useCases` (+355 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 546 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **32 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `app/page.tsx`, `layout.tsx`, `MonacoCodeRunEditor.tsx`, `package.json`, `json-tooles/[slug]/page.tsx`, `ConverterTemplate.tsx`, `image-tooles/[slug]/page.tsx`, `tooles/page.tsx`, `converter-tools/[slug]/page.tsx`, `JSONViewer.tsx`, `browser-image-compression`, `JSONSchemaValidator.tsx`, `ConvertImages.tsx`, `ServicesPageClient.tsx`, `JSONDiff.tsx`, `EPUBToPDF.tsx`, `JSONFormatter.tsx`, `about/page.tsx`, `ServiceTemplate.tsx`, `EcommercePageClient.tsx`, `lucide-react`, `json-tooles/components/CSVToJSON.tsx`, `BlogClient.tsx`, `UnitConverter.tsx`, `CropImage.tsx`, `YAMLToJSON.tsx`, `JSONValidator.tsx`, `converter-tools/components/JSONToExcel.tsx`, `recruitment-data-scraping-service/page.tsx`, `PDFToPPT.tsx`, `servicesData.ts`, `ConvertJpg.tsx`, `PdfToImages.tsx`, `SplitCSV.tsx`, `ProductListingsClient.tsx`, `datasets/page.tsx`, `XMLToExcel.tsx`, `FinanceStockClient.tsx`, `FoodClient.tsx`, `FoodDeliveryClient.tsx`, `HealthcareClient.tsx`, `LiquorClient.tsx`, `OttStreamingClient.tsx`, `FmcgClient.tsx`, `quick-commerce-scraping/page.tsx`, `real-estate-property-data-scraping/page.tsx`, `ServiceSchema.tsx`, `social-media-scraping-services/page.tsx`, `travel-data-scraping/page.tsx`, `ConvertPng.tsx`, `ConvertWebp.tsx`, `JSONToHTMLTable.tsx`, `ChangeFormat.tsx`, `ColorAdjust.tsx`, `RemoveBg.tsx`, `ImageConverter.tsx`, `MP4Converter.tsx`, `ExcelToCSV.tsx`, `VideoConverter.tsx`, `SplitExcel.tsx`, `VideoCompressor.tsx`?**
  _High betweenness centrality (0.359) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `app/page.tsx`, `layout.tsx`, `MonacoCodeRunEditor.tsx`, `package.json`, `json-tooles/[slug]/page.tsx`, `ConverterTemplate.tsx`, `image-tooles/[slug]/page.tsx`, `tooles/page.tsx`, `converter-tools/[slug]/page.tsx`, `react`, `JSONViewer.tsx`, `browser-image-compression`, `JSONSchemaValidator.tsx`, `ServicesPageClient.tsx`, `JSONDiff.tsx`, `JSONFormatter.tsx`, `ServiceTemplate.tsx`, `EcommercePageClient.tsx`, `json-tooles/components/CSVToJSON.tsx`, `UnitConverter.tsx`, `CropImage.tsx`, `YAMLToJSON.tsx`, `JSONValidator.tsx`, `recruitment-data-scraping-service/page.tsx`, `grocery-scraping/page.tsx`, `servicesData.ts`, `ConvertJpg.tsx`, `ProductListingsClient.tsx`, `datasets/page.tsx`, `ServiceTemplate`, `FinanceStockClient.tsx`, `FoodClient.tsx`, `FoodDeliveryClient.tsx`, `HealthcareClient.tsx`, `LiquorClient.tsx`, `OttStreamingClient.tsx`, `FmcgClient.tsx`, `quick-commerce-scraping/page.tsx`, `real-estate-property-data-scraping/page.tsx`, `ServiceSchema.tsx`, `social-media-scraping-services/page.tsx`, `travel-data-scraping/page.tsx`, `ConvertPng.tsx`, `ConvertWebp.tsx`, `JSONToHTMLTable.tsx`, `ChangeFormat.tsx`, `ColorAdjust.tsx`?**
  _High betweenness centrality (0.183) - this node is a cross-community bridge._
- **Why does `next` connect `next` to `app/page.tsx`, `layout.tsx`, `MonacoCodeRunEditor.tsx`, `package.json`, `json-tooles/[slug]/page.tsx`, `image-tooles/[slug]/page.tsx`, `tooles/page.tsx`, `converter-tools/[slug]/page.tsx`, `ServicesPageClient.tsx`, `about/page.tsx`, `ServiceTemplate.tsx`, `EcommercePageClient.tsx`, `lucide-react`, `sitemap.ts`, `BlogClient.tsx`, `recruitment-data-scraping-service/page.tsx`, `grocery-scraping/page.tsx`, `ProductListingsClient.tsx`, `datasets/page.tsx`, `ServiceTemplate`, `FinanceStockClient.tsx`, `FoodClient.tsx`, `FoodDeliveryClient.tsx`, `HealthcareClient.tsx`, `LiquorClient.tsx`, `OttStreamingClient.tsx`, `FmcgClient.tsx`, `quick-commerce-scraping/page.tsx`, `real-estate-property-data-scraping/page.tsx`, `ServiceSchema.tsx`, `social-media-scraping-services/page.tsx`, `travel-data-scraping/page.tsx`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **What connects `metadata`, `stats`, `services` to the rest of the system?**
  _360 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05064935064935065 - nodes in this community are weakly interconnected._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0748663101604278 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._