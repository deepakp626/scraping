import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/remove-pages";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/remove-pdf-pages-og-image.png";

export const removePagesSeo = {
  metadata: {
    title: "Remove PDF Pages Online Free | CompilePilot",
    description:
      "Remove unwanted pages from a PDF online with CompilePilot. Preview page thumbnails, select individual pages or page ranges, and create a trimmed PDF document.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Remove Pages from PDF Online | CompilePilot",
      description:
        "Easily delete unwanted PDF pages with CompilePilot. Upload a PDF, view page thumbnails, select individual pages or ranges, and create a trimmed document.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Remove PDF Pages tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Remove PDF Pages Online Free | CompilePilot",
      description:
        "Delete unwanted pages from a PDF online. Preview thumbnails, choose pages or page ranges, and create a trimmed PDF with CompilePilot.",
      images: [imageUrl],
    },
  } satisfies Metadata,
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Remove PDF Pages Online Free | CompilePilot",
        description:
          "Remove unwanted pages or page ranges from a PDF with visual page thumbnails using CompilePilot.",
        isPartOf: {
          "@id": "https://compilepilot.com/#website",
        },
        mainEntity: {
          "@id": `${pageUrl}#webapp`,
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}#webapp`,
        name: "CompilePilot Remove PDF Pages",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online PDF utility for selecting and deleting individual pages or page ranges from a PDF document.",
        featureList: [
          "Upload a multi-page PDF",
          "Preview PDF pages with visual thumbnails",
          "Select individual pages",
          "Select page ranges",
          "Remove unwanted pages from a PDF",
        ],
      },
    ],
  },
};
