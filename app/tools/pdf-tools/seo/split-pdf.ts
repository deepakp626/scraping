import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/split-pdf";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/split-pdf-og-image.png";

export const splitPdfSeo = {
  metadata: {
    title: "Split PDF Online Free – Extract Pages | CompilePilot",
    description:
      "Split PDF files online with CompilePilot. Separate pages or page ranges into individual PDF documents, preview your file, and download the split PDFs easily.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Split PDF Files Online | Free PDF Splitter – CompilePilot",
      description:
        "Separate a PDF into individual pages or selected page ranges with CompilePilot. Preview your document and create smaller PDF files online.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Split PDF online tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Split PDF Files Online | CompilePilot",
      description:
        "Split a PDF into separate pages or selected page ranges. Preview your file and download the resulting PDFs with CompilePilot.",
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
        name: "Split PDF Online Free – Extract Pages | CompilePilot",
        description:
          "Split PDF documents into individual pages or selected page ranges with CompilePilot.",
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
        name: "CompilePilot Split PDF",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online PDF utility for splitting a PDF into separate documents by individual pages or selected page ranges.",
        featureList: [
          "Upload a PDF document",
          "Preview PDF pages",
          "Split pages into separate PDF files",
          "Select page ranges for splitting",
          "Download the resulting PDF documents",
        ],
      },
    ],
  },
};
