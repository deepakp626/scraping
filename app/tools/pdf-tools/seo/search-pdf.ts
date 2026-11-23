import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/search-pdf";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/search-pdf-og-image.png";

export const searchPdfSeo = {
  metadata: {
    title: "Search Text in PDF Online | CompilePilot",
    description:
      "Find words and phrases inside PDF documents with CompilePilot. Upload a PDF, search for specific text, and locate matching content in your file.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Search Inside PDF Files Online | CompilePilot",
      description:
        "Quickly find words or phrases in a PDF document. Use CompilePilot’s online PDF search tool to locate matching text in your file.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Search in PDF tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Search Text in PDF Online | CompilePilot",
      description:
        "Find specific words or phrases inside a PDF online. Search your document and locate matching text with CompilePilot.",
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
        name: "Search Text in PDF Online | CompilePilot",
        description:
          "An online PDF utility for finding words or phrases within a document's searchable text.",
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
        name: "CompilePilot Search PDF",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online PDF utility for finding words or phrases within a document's searchable text.",
        featureList: [
          "Upload a PDF document",
          "Search for words or phrases",
          "Locate matching text in the PDF",
        ],
      },
    ],
  },
};
