import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/extract-pages";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/extract-pages-og-image.png";

export const extractPagesSeo = {
  metadata: {
    title: "Extract Pages from PDF Online Free | CompilePilot",
    description:
      "Extract selected pages from a PDF online with CompilePilot. Choose individual pages or page ranges, create a separate PDF, and download the pages you need.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Extract PDF Pages Online | CompilePilot",
      description:
        "Save selected pages from a PDF as a separate document. Choose individual pages or page ranges with CompilePilot’s online PDF page extractor.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Extract PDF Pages tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Extract Pages from PDF Online | CompilePilot",
      description:
        "Select individual PDF pages or page ranges and save them as a separate PDF document with CompilePilot’s online extractor.",
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
        name: "Extract Pages from PDF Online Free | CompilePilot",
        description:
          "Extract selected pages or page ranges from a PDF and save them as a separate document with CompilePilot.",
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
        name: "CompilePilot Extract PDF Pages",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online PDF utility for extracting selected pages or page ranges into a separate PDF document.",
        featureList: [
          "Upload a PDF document",
          "Select individual pages",
          "Select page ranges",
          "Create a separate PDF from selected pages",
          "Download the extracted PDF",
        ],
      },
    ],
  },
};
