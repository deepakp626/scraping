# Graph Report - compilepilot.com  (2026-11-19)

## Corpus Check
- 531 files · ~4,421,133 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: .css 3, .scss 3, (none) 2)

## Summary
- 1775 nodes · 3448 edges · 138 communities (92 shown, 46 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 30 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b26b2c95`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- image-tools/seo/index.ts
- layout.tsx
- compilerOptions
- devDependencies
- MonacoCodeRunEditor.tsx
- dependencies
- package.json
- @codemirror/lang-json
- pdf-tools/seo/index.ts
- json-tools/seo/index.ts
- README.md
- converter-tools/[slug]/page.tsx
- image-tools/[slug]/page.tsx
- SignPDF.tsx
- FoodDeliveryDatasetPage.tsx
- JSONViewer.tsx
- datasetsSchema.tsx
- DatasetsSchema
- GroceryDatasetPage.tsx
- ServicesPageClient.tsx
- JSONDiff.tsx
- react
- JSONFormatter.tsx
- json-tools/[slug]/page.tsx
- ServiceTemplate.tsx
- EcommercePageClient.tsx
- apiClient.ts
- DataDictionaryGroup
- sitemap.ts
- browser-image-compression
- blog/[slug]/page.tsx
- CropImage.tsx
- What You Must Do When Invoked
- lucide-react
- app/page.tsx
- [pdf-tool-slug]/page.tsx
- recruitment-data-scraping-service/page.tsx
- ref_components
- generate-liquor-images.js
- image-tools/page.tsx
- postcss.config.mjs
- grocery-scraping/page.tsx
- servicesData.ts
- ConvertJpg.tsx
- json-tools/page.tsx
- Resources.tsx
- ProductListingsClient.tsx
- converter-tools/seo/index.ts
- DatasetTemplate.tsx
- PricingDataClient.tsx
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
- HotelDatasetPage.tsx
- LiquorDatasetPage.tsx
- BlogClient.tsx
- buildGroceryDatasetSchema
- OttMediaDatasetPage.tsx
- RealEstateDatasetPage.tsx
- PharmaceuticalDatasetPage.tsx
- rules/graphify.md
- workflows/graphify.md
- buildRestaurantDatasetSchema
- QuickCommerceDatasetPage.tsx
- buildTravelDatasetSchema
- UnitConverter.tsx
- Navbar.tsx
- JSONValidator.tsx
- PdfToWord.tsx
- CarRentalDatasetPage.tsx
- PdfToImages.tsx
- DatasetPageClient.tsx
- RestaurantDatasetPage.tsx
- themes.ts
- graphify reference: extra exports and benchmark
- graphify reference: query, path, explain
- tools/page.tsx
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- extraction-spec.md
- TravelDatasetPage.tsx
- ConditionalContact.tsx
- app_tooles_coding_tooles_components_index_coderuneditor
- ref_codemirror_state
- about/page.tsx
- CaseConverter.tsx
- scripts
- json-tools/components/CSVToJSON.tsx
- json-beautifier.ts
- json-compare.ts
- YAMLToJSON.tsx
- TerminalAnimation.tsx
- CountSection.tsx
- next
- ConvertWebp.tsx
- JSONParser.tsx
- JSONToHTMLTable.tsx
- json-diff.ts
- json-escape.ts
- app_tooles_coding_tooles_monaco_components_index_monacocoderuneditor
- json-formatter-online.ts
- json-minifier.ts
- json-mock-generator.ts
- json-parser.ts
- json-redactor.ts
- json-repair.ts
- json-schema-generator.ts
- json-schema-validator.ts
- json-to-csv.ts
- json-to-excel.ts
- json-to-html-table.ts
- json-tools/seo/json-to-xml.ts
- json-to-yaml.ts
- json-tree-viewer.ts
- json-validator.ts
- json-viewer.ts
- jsonpath-evaluator.ts
- xml-to-json.ts
- yaml-to-json.ts
- merge-images.ts
- split-image.ts
- tiptap-utils.ts
- scss.d.ts

## God Nodes (most connected - your core abstractions)
1. `react` - 223 edges
2. `next` - 218 edges
3. `lucide-react` - 148 edges
4. `DatasetsSchema()` - 42 edges
5. `DataDictionaryGroup` - 30 edges
6. `FAQItem` - 29 edges
7. `@codemirror/lang-json` - 28 edges
8. `@uiw/react-codemirror` - 28 edges
9. `ConverterTemplate()` - 27 edges
10. `SiblingDataset` - 21 edges

## Surprising Connections (you probably didn't know these)
- `LockPDF()` --calls--> `extractApiErrorMessage()`  [EXTRACTED]
  app/tools/pdf-tools/components/LockPDF.tsx → lib/apiClient.ts
- `UnlockPDF()` --calls--> `extractApiErrorMessage()`  [EXTRACTED]
  app/tools/pdf-tools/components/UnlockPDF.tsx → lib/apiClient.ts
- `OcrPDF()` --calls--> `extractApiErrorMessage()`  [EXTRACTED]
  app/tools/pdf-tools/components/OcrPDF.tsx → lib/apiClient.ts
- `PdfToHtml()` --calls--> `extractApiErrorMessage()`  [EXTRACTED]
  app/tools/pdf-tools/components/PdfToHtml.tsx → lib/apiClient.ts
- `PopoverContent()` --calls--> `cn()`  [EXTRACTED]
  components/tiptap-ui-primitive/popover/popover.tsx → lib/tiptap-utils.ts

## Import Cycles
- None detected.

## Communities (138 total, 46 thin omitted)

### Community 0 - "image-tools/seo/index.ts"
Cohesion: 0.07
Nodes (20): addTextSeo, addWatermarkSeo, blurImageSeo, changeFormatSeo, colorAdjustSeo, compressImageSeo, convertJpgSeo, convertPngSeo (+12 more)

### Community 1 - "layout.tsx"
Cohesion: 0.13
Nodes (12): CTA(), FAQ(), Footer(), Review(), reviews, WhatsAppChatIcon(), app_globals, geistMono (+4 more)

### Community 2 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 3 - "devDependencies"
Cohesion: 0.17
Nodes (12): devDependencies, eslint, eslint-config-next, sass, tailwindcss, @tailwindcss/postcss, @types/js-yaml, @types/node (+4 more)

### Community 4 - "MonacoCodeRunEditor.tsx"
Cohesion: 0.06
Nodes (62): detectLanguageFromSlug(), DynamicCodeToolPage(), getLanguageIcon(), executeCode(), formatOutput(), Judge0Error, runLocally(), SubmissionPayload (+54 more)

### Community 5 - "dependencies"
Cohesion: 0.03
Nodes (70): dependencies, axios, browser-image-compression, clsx, @codemirror/lang-cpp, @codemirror/lang-css, @codemirror/lang-go, @codemirror/lang-html (+62 more)

### Community 6 - "package.json"
Cohesion: 0.04
Nodes (44): SignatureCanvas, eslintConfig, name, private, version, axios, @codemirror/lang-cpp, @codemirror/lang-css (+36 more)

### Community 7 - "@codemirror/lang-json"
Cohesion: 0.09
Nodes (7): DiffItem, @codemirror/lang-javascript, @codemirror/lang-json, jsonpath-plus, @uiw/react-codemirror, @uiw/react-json-view, xlsx

### Community 8 - "pdf-tools/seo/index.ts"
Cohesion: 0.07
Nodes (21): addWatermarkSeo, compressPdfSeo, extractImagesFromPdfSeo, extractPagesSeo, imageToPdfSeo, pdfToolSeo, lockPdfSeo, mergePdfSeo (+13 more)

### Community 9 - "json-tools/seo/index.ts"
Cohesion: 0.16
Nodes (13): buildCsvToJsonSchema(), csvToJsonMetadata, jsonToolSeo, buildJsonBase64Schema(), jsonBase64Metadata, buildJsonEditorSchema(), jsonEditorMetadata, buildJsonFormatterSchema() (+5 more)

### Community 10 - "README.md"
Cohesion: 0.29
Nodes (6): Color Palette, Deploy on Vercel, Getting Started, Graphify, Learn More, Theme Design

### Community 11 - "converter-tools/[slug]/page.tsx"
Cohesion: 0.06
Nodes (7): ConverterTemplate(), ConverterTemplateProps, getConverterToolSeo(), componentsMap, ConverterToolPage(), generateMetadata(), PageProps

### Community 12 - "image-tools/[slug]/page.tsx"
Cohesion: 0.07
Nodes (9): FORMAT_OPTIONS, ImageTool, imageTools, getImageToolSeo(), componentsMap, generateMetadata(), ImageToolPage(), PageProps (+1 more)

### Community 13 - "SignPDF.tsx"
Cohesion: 0.13
Nodes (12): ExtractPages(), PageNumbers(), PdfToImage(), PdfToWord(), RemovePages(), PageTextRecord, SearchMatch, SearchPDF() (+4 more)

### Community 15 - "JSONViewer.tsx"
Cohesion: 0.16
Nodes (9): getStats(), JSONBeautifier(), jsonDarkHighlightStyle, ViewTab, ref_codemirror_commands, @codemirror/language, ref_codemirror_view, ref_lezer_highlight (+1 more)

### Community 16 - "datasetsSchema.tsx"
Cohesion: 0.13
Nodes (22): DatasetsSchemaProps, AvailabilityLayout(), metadata, BrandPresenceLayout(), metadata, CategoryPricingLayout(), metadata, DarkStoreDataLayout() (+14 more)

### Community 17 - "DatasetsSchema"
Cohesion: 0.14
Nodes (22): DatasetsSchema(), BrandIntelligenceLayout(), metadata, CategoryTaxonomyLayout(), metadata, DiscountsOffersLayout(), metadata, metadata (+14 more)

### Community 18 - "GroceryDatasetPage.tsx"
Cohesion: 0.14
Nodes (4): GroceryDatasetKey, groceryDatasets, GroceryDatasetPage(), toCsv()

### Community 19 - "ServicesPageClient.tsx"
Cohesion: 0.22
Nodes (7): metadata, capabilities, categories, keyFeatures, ServiceItem, servicesData, ServicesPageClient()

### Community 20 - "JSONDiff.tsx"
Cohesion: 0.22
Nodes (8): countDeltaStats(), walk(), diffpatcher, DiffStats, EditorPanelProps, JSONDiff(), jsondiffpatch, jsondiffpatch

### Community 22 - "JSONFormatter.tsx"
Cohesion: 0.31
Nodes (5): balanceBracketsAndQuotes(), JSONFormatter(), repairJsonString(), sanitizeJsonContextually(), jsonrepair

### Community 23 - "json-tools/[slug]/page.tsx"
Cohesion: 0.12
Nodes (10): ValidationStatus, getJsonToolSeo(), componentsMap, generateMetadata(), JsonToolPage(), PageProps, ref_ajv, @codemirror/lang-xml (+2 more)

### Community 24 - "ServiceTemplate.tsx"
Cohesion: 0.22
Nodes (8): BenefitsAccordionProps, BenefitItem, FeatureBlock, GridFeatureItem, PlatformItem, ServiceTemplateProps, StatItem, UseCaseItem

### Community 25 - "EcommercePageClient.tsx"
Cohesion: 0.20
Nodes (8): benefits, EcommercePageClient(), ecommerIcons, features, highlights, stats, useCases, metadata

### Community 26 - "apiClient.ts"
Cohesion: 0.25
Nodes (11): LockPDF(), OcrApiResponse, OcrPDF(), PageData, PdfToHtml(), PreviewDevice, UnlockPDF(), apiClient (+3 more)

### Community 27 - "DataDictionaryGroup"
Cohesion: 0.14
Nodes (12): CarRentalDataset, CarRentalDatasetKey, carRentalDatasets, DataDictionaryGroup, FAQItem, attributeGroups, ecommerceDatasets, faqs (+4 more)

### Community 28 - "sitemap.ts"
Cohesion: 0.20
Nodes (10): CODING_TOOL_SLUGS, CONVERTER_TOOL_SLUGS, FALLBACK_BLOG_POSTS, fetchBlogPosts(), IMAGE_TOOL_SLUGS, JSON_TOOL_SLUGS, PDF_TOOL_SLUGS, revalidate (+2 more)

### Community 29 - "browser-image-compression"
Cohesion: 0.11
Nodes (5): FORMATS, ConvertPng(), formatSize(), savingsLabel(), browser-image-compression

### Community 30 - "blog/[slug]/page.tsx"
Cohesion: 0.23
Nodes (14): app_blog, BlogDetail, BlogPostClient(), estimateReadingTime(), formatDate(), BlogApiEnvelope, BlogPostPage(), fetchBlog() (+6 more)

### Community 31 - "CropImage.tsx"
Cohesion: 0.40
Nodes (5): Area, ASPECT_RATIO_PRESETS, CropImage(), getCroppedImg(), react-easy-crop

### Community 32 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 33 - "lucide-react"
Cohesion: 0.17
Nodes (5): PDFItem, SplitPDF(), SplitResult, lucide-react, pdf-lib

### Community 34 - "app/page.tsx"
Cohesion: 0.11
Nodes (14): Slider(), sliderItems, ComparisonRowProps, FirecrawlFeatures(), HeroSection(), terminalLines, categories, IndustryTabSection() (+6 more)

### Community 35 - "[pdf-tool-slug]/page.tsx"
Cohesion: 0.21
Nodes (8): PdfToolSchema(), PdfToolSchemaProps, componentsMap, generateMetadata(), PageProps, PdfToolPage(), ToolConfig, getPdfToolSeo()

### Community 36 - "recruitment-data-scraping-service/page.tsx"
Cohesion: 0.38
Nodes (3): metadata, RecruitmentClient(), recruitmentScrapingData

### Community 38 - "generate-liquor-images.js"
Cohesion: 0.15
Nodes (9): fs, generateAll(), images, outputDir, path, sharp, ref_fs, ref_path (+1 more)

### Community 39 - "image-tools/page.tsx"
Cohesion: 0.22
Nodes (7): ImageToolSchema(), ImageToolSchemaProps, imageToolsListing, ImageToolsListingItem, ImageToolsSection(), metadata, imageToolsSeo

### Community 41 - "grocery-scraping/page.tsx"
Cohesion: 0.38
Nodes (3): GroceryScrapingClient(), groceryScrapingData, metadata

### Community 43 - "ConvertJpg.tsx"
Cohesion: 0.40
Nodes (3): ConvertJpg(), FORMAT_OPTIONS, image-conversion

### Community 44 - "json-tools/page.tsx"
Cohesion: 0.25
Nodes (9): JsonToolsSchema(), JsonToolsSchemaProps, JsonToolsSection(), JsonTool, jsonTools, JsonToolsLandingPage(), metadata, buildJsonToolsLandingSchema() (+1 more)

### Community 45 - "Resources.tsx"
Cohesion: 0.22
Nodes (8): BlogCard(), BlogPost, CASE_STUDIES, formatDate(), PaginatedBlogsResponse, Pagination, Resources(), TABS

### Community 46 - "ProductListingsClient.tsx"
Cohesion: 0.29
Nodes (5): attributeGroups, ecommerceDatasets, faqs, jsonSample, ProductListingsClient()

### Community 47 - "converter-tools/seo/index.ts"
Cohesion: 0.08
Nodes (22): ConverterToolsSchema(), ConverterToolsSchemaProps, ConverterTool, converterToolsListing, ConverterToolsSection(), ConverterToolsPage(), metadata, audioConverterSeo (+14 more)

### Community 48 - "DatasetTemplate.tsx"
Cohesion: 0.06
Nodes (28): DataDictionaryField, DatasetBreadcrumb, DatasetMetaItem, DatasetStatItem, DatasetTemplate(), DatasetTemplateProps, defaultExploreCards, SiblingDataset (+20 more)

### Community 49 - "PricingDataClient.tsx"
Cohesion: 0.29
Nodes (5): attributeGroups, ecommerceDatasets, faqs, jsonSample, PricingDataClient()

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

### Community 63 - "HotelDatasetPage.tsx"
Cohesion: 0.12
Nodes (5): HotelDataset, HotelDatasetKey, hotelDatasets, HotelDatasetPage(), toCsv()

### Community 64 - "LiquorDatasetPage.tsx"
Cohesion: 0.12
Nodes (5): LiquorDataset, LiquorDatasetKey, liquorDatasets, LiquorDatasetPage(), toCsv()

### Community 65 - "BlogClient.tsx"
Cohesion: 0.24
Nodes (6): BlogClient(), BlogPost, PaginatedBlogsResponse, Pagination, metadata, BlogSchema()

### Community 66 - "buildGroceryDatasetSchema"
Cohesion: 0.13
Nodes (21): AvailabilityLayout(), metadata, BrandCoverageLayout(), metadata, CategoryTrendsLayout(), metadata, metadata, NutritionalDataLayout() (+13 more)

### Community 67 - "OttMediaDatasetPage.tsx"
Cohesion: 0.12
Nodes (5): OttMediaDataset, OttMediaDatasetKey, ottMediaDatasets, OttMediaDatasetPage(), toCsv()

### Community 68 - "RealEstateDatasetPage.tsx"
Cohesion: 0.12
Nodes (5): RealEstateDataset, RealEstateDatasetKey, realEstateDatasets, RealEstateDatasetPage(), toCsv()

### Community 69 - "PharmaceuticalDatasetPage.tsx"
Cohesion: 0.12
Nodes (5): PharmaceuticalDataset, PharmaceuticalDatasetKey, pharmaceuticalDatasets, PharmaceuticalDatasetPage(), toCsv()

### Community 72 - "buildRestaurantDatasetSchema"
Cohesion: 0.13
Nodes (21): ChainProfilesLayout(), metadata, CuisineTagsLayout(), metadata, DeliveryPartnersLayout(), metadata, LocationDataLayout(), metadata (+13 more)

### Community 73 - "QuickCommerceDatasetPage.tsx"
Cohesion: 0.13
Nodes (5): QuickCommerceDataset, QuickCommerceDatasetKey, quickCommerceDatasets, QuickCommerceDatasetPage(), toCsv()

### Community 74 - "buildTravelDatasetSchema"
Cohesion: 0.13
Nodes (21): AirlineProfilesLayout(), metadata, FareTrackerLayout(), metadata, FlightSchedulesLayout(), metadata, HolidayPackagesLayout(), metadata (+13 more)

### Community 75 - "UnitConverter.tsx"
Cohesion: 0.33
Nodes (4): LENGTH_UNITS, UnitConfig, UnitType, WEIGHT_UNITS

### Community 76 - "Navbar.tsx"
Cohesion: 0.11
Nodes (19): datasetIndustries, DatasetIndustry, DatasetItem, DatasetsMegaMenu(), panelVariants, dropdownVariants, itemVariants, mobileMenuVariants (+11 more)

### Community 77 - "JSONValidator.tsx"
Cohesion: 0.40
Nodes (5): getJsonErrorDetails(), JsonErrorDetails, JSONValidator(), ValidationResult, ValidationStats

### Community 78 - "PdfToWord.tsx"
Cohesion: 0.20
Nodes (5): ImageItem, jspdf, @tiptap/extension-link, @tiptap/react, @tiptap/starter-kit

### Community 80 - "PdfToImages.tsx"
Cohesion: 0.60
Nodes (4): App(), loadJsZip(), loadPdfJs(), SelectedImage

### Community 81 - "DatasetPageClient.tsx"
Cohesion: 0.17
Nodes (11): datasetCategories, DatasetPage(), features, processSteps, stats, testimonials, whyUs, DatasetsPage() (+3 more)

### Community 82 - "RestaurantDatasetPage.tsx"
Cohesion: 0.12
Nodes (5): RestaurantDataset, RestaurantDatasetKey, restaurantDatasets, RestaurantDatasetPage(), toCsv()

### Community 83 - "themes.ts"
Cohesion: 0.50
Nodes (3): DEFAULT_THEME, ThemeId, THEMES

### Community 86 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 87 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 88 - "tools/page.tsx"
Cohesion: 0.25
Nodes (5): CodingToolsSection(), pdfTools, PdfToolsSection(), jsonLd, metadata

### Community 89 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 90 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 91 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 95 - "TravelDatasetPage.tsx"
Cohesion: 0.12
Nodes (5): TravelDataset, TravelDatasetKey, travelDatasets, toCsv(), TravelDatasetPage()

### Community 99 - "about/page.tsx"
Cohesion: 0.25
Nodes (6): aboutUs, datasetProcess, metadata, services, stats, useCases

### Community 101 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, start, type-check

### Community 102 - "json-tools/components/CSVToJSON.tsx"
Cohesion: 0.29
Nodes (3): json-2-csv, papaparse, react-csv

### Community 106 - "TerminalAnimation.tsx"
Cohesion: 0.40
Nodes (4): csvData, pythonScript, TerminalAnimation(), terminalLines

### Community 107 - "CountSection.tsx"
Cohesion: 0.50
Nodes (3): CountSection(), stats, react-countup

### Community 108 - "next"
Cohesion: 0.17
Nodes (4): metadata, nextConfig, rotateImageSeo, next

### Community 109 - "ConvertWebp.tsx"
Cohesion: 0.83
Nodes (3): ConvertWebp(), formatSize(), savingsPct()

### Community 111 - "JSONToHTMLTable.tsx"
Cohesion: 0.67
Nodes (3): escapeHtml(), JSONToHTMLTable(), @codemirror/lang-html

### Community 136 - "tiptap-utils.ts"
Cohesion: 0.06
Nodes (20): PopoverContent(), cn(), findNodeAtPosition(), findNodePosition(), formatShortcutKey(), isAllowedUri(), isMac(), isValidPosition() (+12 more)

## Knowledge Gaps
- **459 isolated node(s):** `metadata`, `stats`, `services`, `datasetProcess`, `useCases` (+454 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 751 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `image-tools/seo/index.ts`, `layout.tsx`, `MonacoCodeRunEditor.tsx`, `package.json`, `pdf-tools/seo/index.ts`, `json-tools/seo/index.ts`, `converter-tools/[slug]/page.tsx`, `image-tools/[slug]/page.tsx`, `SignPDF.tsx`, `datasetsSchema.tsx`, `DatasetsSchema`, `ServicesPageClient.tsx`, `json-tools/[slug]/page.tsx`, `ServiceTemplate.tsx`, `EcommercePageClient.tsx`, `apiClient.ts`, `DataDictionaryGroup`, `sitemap.ts`, `blog/[slug]/page.tsx`, `lucide-react`, `app/page.tsx`, `[pdf-tool-slug]/page.tsx`, `recruitment-data-scraping-service/page.tsx`, `generate-liquor-images.js`, `image-tools/page.tsx`, `grocery-scraping/page.tsx`, `json-tools/page.tsx`, `Resources.tsx`, `converter-tools/seo/index.ts`, `DatasetTemplate.tsx`, `ServiceTemplate`, `FinanceStockClient.tsx`, `FoodClient.tsx`, `FoodDeliveryClient.tsx`, `HealthcareClient.tsx`, `LiquorClient.tsx`, `OttStreamingClient.tsx`, `FmcgClient.tsx`, `quick-commerce-scraping/page.tsx`, `real-estate-property-data-scraping/page.tsx`, `ServiceSchema.tsx`, `social-media-scraping-services/page.tsx`, `travel-data-scraping/page.tsx`, `HotelDatasetPage.tsx`, `LiquorDatasetPage.tsx`, `BlogClient.tsx`, `buildGroceryDatasetSchema`, `OttMediaDatasetPage.tsx`, `RealEstateDatasetPage.tsx`, `PharmaceuticalDatasetPage.tsx`, `buildRestaurantDatasetSchema`, `buildTravelDatasetSchema`, `Navbar.tsx`, `DatasetPageClient.tsx`, `RestaurantDatasetPage.tsx`, `tools/page.tsx`, `TravelDatasetPage.tsx`, `ConditionalContact.tsx`, `about/page.tsx`, `json-beautifier.ts`, `json-compare.ts`, `json-diff.ts`, `json-escape.ts`, `json-formatter-online.ts`, `json-minifier.ts`, `json-mock-generator.ts`, `json-parser.ts`, `json-redactor.ts`, `json-repair.ts`, `json-schema-generator.ts`, `json-schema-validator.ts`, `json-to-csv.ts`, `json-to-excel.ts`, `json-to-html-table.ts`, `json-tools/seo/json-to-xml.ts`, `json-to-yaml.ts`, `json-tree-viewer.ts`, `json-validator.ts`, `json-viewer.ts`, `jsonpath-evaluator.ts`, `xml-to-json.ts`, `yaml-to-json.ts`, `merge-images.ts`, `split-image.ts`?**
  _High betweenness centrality (0.378) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `layout.tsx`, `MonacoCodeRunEditor.tsx`, `package.json`, `@codemirror/lang-json`, `converter-tools/[slug]/page.tsx`, `image-tools/[slug]/page.tsx`, `SignPDF.tsx`, `JSONViewer.tsx`, `datasetsSchema.tsx`, `DatasetsSchema`, `ServicesPageClient.tsx`, `JSONDiff.tsx`, `JSONFormatter.tsx`, `json-tools/[slug]/page.tsx`, `ServiceTemplate.tsx`, `EcommercePageClient.tsx`, `apiClient.ts`, `DataDictionaryGroup`, `browser-image-compression`, `blog/[slug]/page.tsx`, `CropImage.tsx`, `lucide-react`, `app/page.tsx`, `[pdf-tool-slug]/page.tsx`, `recruitment-data-scraping-service/page.tsx`, `servicesData.ts`, `ConvertJpg.tsx`, `Resources.tsx`, `ProductListingsClient.tsx`, `DatasetTemplate.tsx`, `PricingDataClient.tsx`, `FinanceStockClient.tsx`, `FoodClient.tsx`, `FoodDeliveryClient.tsx`, `HealthcareClient.tsx`, `LiquorClient.tsx`, `OttStreamingClient.tsx`, `FmcgClient.tsx`, `quick-commerce-scraping/page.tsx`, `real-estate-property-data-scraping/page.tsx`, `ServiceSchema.tsx`, `social-media-scraping-services/page.tsx`, `travel-data-scraping/page.tsx`, `BlogClient.tsx`, `buildGroceryDatasetSchema`, `buildRestaurantDatasetSchema`, `buildTravelDatasetSchema`, `UnitConverter.tsx`, `Navbar.tsx`, `JSONValidator.tsx`, `PdfToWord.tsx`, `PdfToImages.tsx`, `DatasetPageClient.tsx`, `tools/page.tsx`, `ConditionalContact.tsx`, `about/page.tsx`, `CaseConverter.tsx`, `json-tools/components/CSVToJSON.tsx`, `YAMLToJSON.tsx`, `TerminalAnimation.tsx`, `CountSection.tsx`, `ConvertWebp.tsx`, `JSONParser.tsx`, `JSONToHTMLTable.tsx`?**
  _High betweenness centrality (0.270) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `layout.tsx`, `MonacoCodeRunEditor.tsx`, `package.json`, `@codemirror/lang-json`, `converter-tools/[slug]/page.tsx`, `image-tools/[slug]/page.tsx`, `SignPDF.tsx`, `JSONViewer.tsx`, `GroceryDatasetPage.tsx`, `ServicesPageClient.tsx`, `JSONDiff.tsx`, `react`, `JSONFormatter.tsx`, `json-tools/[slug]/page.tsx`, `ServiceTemplate.tsx`, `EcommercePageClient.tsx`, `apiClient.ts`, `DataDictionaryGroup`, `browser-image-compression`, `CropImage.tsx`, `app/page.tsx`, `[pdf-tool-slug]/page.tsx`, `recruitment-data-scraping-service/page.tsx`, `image-tools/page.tsx`, `grocery-scraping/page.tsx`, `servicesData.ts`, `ConvertJpg.tsx`, `json-tools/page.tsx`, `Resources.tsx`, `ProductListingsClient.tsx`, `converter-tools/seo/index.ts`, `DatasetTemplate.tsx`, `PricingDataClient.tsx`, `ServiceTemplate`, `FinanceStockClient.tsx`, `FoodClient.tsx`, `FoodDeliveryClient.tsx`, `HealthcareClient.tsx`, `LiquorClient.tsx`, `OttStreamingClient.tsx`, `FmcgClient.tsx`, `quick-commerce-scraping/page.tsx`, `real-estate-property-data-scraping/page.tsx`, `ServiceSchema.tsx`, `social-media-scraping-services/page.tsx`, `travel-data-scraping/page.tsx`, `HotelDatasetPage.tsx`, `LiquorDatasetPage.tsx`, `OttMediaDatasetPage.tsx`, `RealEstateDatasetPage.tsx`, `PharmaceuticalDatasetPage.tsx`, `QuickCommerceDatasetPage.tsx`, `UnitConverter.tsx`, `Navbar.tsx`, `JSONValidator.tsx`, `PdfToWord.tsx`, `DatasetPageClient.tsx`, `RestaurantDatasetPage.tsx`, `tools/page.tsx`, `TravelDatasetPage.tsx`, `ConditionalContact.tsx`, `CaseConverter.tsx`, `json-tools/components/CSVToJSON.tsx`, `YAMLToJSON.tsx`, `TerminalAnimation.tsx`, `CountSection.tsx`, `ConvertWebp.tsx`, `JSONParser.tsx`, `JSONToHTMLTable.tsx`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **What connects `metadata`, `stats`, `services` to the rest of the system?**
  _459 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `image-tools/seo/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07435897435897436 - nodes in this community are weakly interconnected._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13450292397660818 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._