import type { MetadataRoute } from "next";

export const revalidate = 3600; // Cache and revalidate every hour for fresh indexing

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://compilepilot.com";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.compilepilot.com";

// Service subpages
const SERVICE_SLUGS = [
  "fashion-scraping",
  "ecommerce-data-scraping",
  "travel-data-scraping",
  "liquor-or-alchol-data-scraping",
  "recruitment-data-scraping-service",
  "social-media-scraping-services",
  "healthcare-data-scraping",
  "food-data-scraping",
  "quick-commerce-fmcg-data-scraping",
  "finance-and-stock-scraping",
  "ott-streaming-data-scraping-service",
  "car-rental-data-scraping",
  "quick-commerce-scraping",
  "food-delivery-data-scraping-service",
  "grocery-scraping",
  "real-estate-property-data-scraping",
];

// PDF Tools
const PDF_TOOL_SLUGS = [
  "merge-pdf",
  "split-pdf",
  "compress-pdf",
  "pdf-to-word",
  "word-to-pdf",
  "pdf-to-image",
  "image-to-pdf",
  "unlock-pdf",
  "lock-pdf",
  "rotate-pdf",
  "rotate-left",
  "add-watermark",
  "remove-pages",
  "extract-pages",
  "page-numbers",
  "ocr-pdf",
  "sign-pdf",
  "pdf-to-html",
  "search-pdf",
  "extract-images-from-pdf",
];

// Converter Tools
const CONVERTER_TOOL_SLUGS = [
  "excel-to-pdf",
  "csv-to-excel",
  "split-excel",
  "xml-to-excel",
  "split-csv",
  "excel-to-csv",
  "xml-to-csv",
  "csv-to-json",
  "excel-to-xml",
  "json-to-xml",
  "json-to-csv",
  "json-to-excel",
  "epub-to-mobi",
  "epub-to-azw3",
  "epub-to-pdf",
  "mobi-to-epub",
  "base64",
  "url-encoder",
  "html-encoder",
  "case-converter",
  "image-converter",
  "audio-converter",
  "video-converter",
  "qr-code",
  "unit-converter",
  "color-converter",
  "base-converter",
  "archive-converter",
  "pdf-to-excel",
  "pdf-to-ppt",
  "ppt-to-pdf",
  "pdf-to-text",
  "video-compressor",
  "mp4-converter",
];

// JSON Tools
const JSON_TOOL_SLUGS = [
  "json-formatter",
  "json-formatter-online",
  "json-validator",
  "json-viewer",
  "json-beautifier",
  "json-editor",
  "json-parser",
  "json-minifier",
  "json-to-csv",
  "json-to-xml",
  "json-to-yaml",
  "json-pretty-print",
  "json-compare",
  "json-diff",
  "json-tree-viewer",
  "json-repair",
  "json-to-excel",
  "csv-to-json",
  "xml-to-json",
  "yaml-to-json",
  "json-schema-generator",
  "json-schema-validator",
  "jsonpath-evaluator",
  "json-escape",
  "json-base64",
  "json-redactor",
  "json-to-html-table",
  "json-key-sorter",
  "json-mock-generator",
];

// Image Tools
const IMAGE_TOOL_SLUGS = [
  "compress-image",
  "resize-image",
  "crop-image",
  "convert-jpg",
  "convert-png",
  "convert-webp",
  "rotate-image",
  "flip-horizontal",
  "flip-vertical",
  "image-to-pdf",
  "remove-bg",
  "enhance-image",
  "add-watermark",
  "blur-image",
  "sharpen-image",
  "change-format",
  "color-adjust",
  "merge-images",
  "split-image",
  "add-text",
  "pdf-to-images",
];

// Coding Tools
const CODING_TOOL_SLUGS = [
  "python",
  "javascript",
  "typescript",
  "html",
  "css",
  "sql",
  "json",
  "xml",
  "cpp",
  "java",
  "go",
  "rust",
  "php",
  "ruby",
  "markdown",
  "bash",
  "csharp",
  "swift",
  "kotlin",
  "yaml",
  "json-to-yaml",
  "yaml-to-json",
  "c",
  "assembly",
  "basic",
  "clojure",
  "cobol",
  "lisp",
  "d",
  "elixir",
  "erlang",
  "fsharp",
  "fortran",
  "groovy",
  "haskell",
  "lua",
  "objectivec",
  "ocaml",
  "octave",
  "pascal",
  "perl",
  "plaintext",
  "prolog",
  "r",
  "scala",
  "vbnet",
];

// Fallback blog slugs if API is temporarily unavailable during build
const FALLBACK_BLOG_POSTS = [
  { slug: "linux-file-new", date: "2026-10-02" },
  { slug: "hii-blog", date: "2026-09-30" },
  { slug: "linux-testing", date: "2026-09-29" },
  { slug: "kubernates", date: "2026-09-29" },
  { slug: "linux-file", date: "2026-09-29" },
  { slug: "nine-blog", date: "2026-09-29" },
  { slug: "eight-blog", date: "2026-09-29" },
  { slug: "seven-blog", date: "2026-09-29" },
  { slug: "testing-senas", date: "2026-09-29" },
  { slug: "test-one", date: "2026-08-04" },
  { slug: "new-blog", date: "2026-08-04" },
  { slug: "test-one-blog", date: "2026-08-04" },
  { slug: "third-test", date: "2026-08-02" },
];

async function fetchBlogPosts(): Promise<Array<{ slug: string; date?: string }>> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blogs/getPaginatedBlog?page=1&limit=100`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      return FALLBACK_BLOG_POSTS;
    }
    const data = await res.json();
    if (Array.isArray(data?.data) && data.data.length > 0) {
      return data.data.map((item: any) => ({
        slug: item.slug,
        date: item.date,
      }));
    }
    return FALLBACK_BLOG_POSTS;
  } catch {
    return FALLBACK_BLOG_POSTS;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date();

  // 1. Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/dataset`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/dataset/e-commerce-dataset`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // 2. Services subpages
  const servicePages: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Tool category hub pages
  const toolHubPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/tools/pdf-tools`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/converter-tools`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/json-tools`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/image-tools`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/coding-tools`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // 4. PDF Tools
  const pdfToolPages: MetadataRoute.Sitemap = PDF_TOOL_SLUGS.map((slug) => ({
    url: `${SITE_URL}/tools/pdf-tools/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 5. Converter Tools
  const converterToolPages: MetadataRoute.Sitemap = CONVERTER_TOOL_SLUGS.map((slug) => ({
    url: `${SITE_URL}/tools/converter-tools/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 6. JSON Tools
  const jsonToolPages: MetadataRoute.Sitemap = JSON_TOOL_SLUGS.map((slug) => ({
    url: `${SITE_URL}/tools/json-tools/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 7. Image Tools
  const imageToolPages: MetadataRoute.Sitemap = IMAGE_TOOL_SLUGS.map((slug) => ({
    url: `${SITE_URL}/tools/image-tools/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 8. Coding Tools
  const codingToolPages: MetadataRoute.Sitemap = CODING_TOOL_SLUGS.map((slug) => ({
    url: `${SITE_URL}/tools/coding-tools/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 9. Dynamic Blog Posts
  const blogPosts = await fetchBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : currentDate,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...corePages,
    ...servicePages,
    ...toolHubPages,
    ...pdfToolPages,
    ...converterToolPages,
    ...jsonToolPages,
    ...imageToolPages,
    ...codingToolPages,
    ...blogPages,
  ];
}
