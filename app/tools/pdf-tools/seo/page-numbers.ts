import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/page-numbers";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/page-numbers-og-image.png";

export const pageNumbersSeo = {
  metadata: {
    title: "Add Page Numbers to PDF Online Free | CompilePilot",
    description:
      "Add page numbers to PDF files online with CompilePilot. Customize numbering position and style, preview your document, and download the numbered PDF.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Add Page Numbers to PDF Online | CompilePilot",
      description:
        "Number your PDF pages with CompilePilot. Choose available numbering options, preview the placement, and download your updated document.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Add Page Numbers to PDF tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Add Page Numbers to PDF Online | CompilePilot",
      description:
        "Add page numbers to your PDF online, customize available settings, preview the result, and download the numbered file with CompilePilot.",
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
        name: "Add Page Numbers to PDF Online Free | CompilePilot",
        description:
          "An online PDF utility for adding page numbers to document pages.",
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
        name: "CompilePilot Add Page Numbers to PDF",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online PDF utility for adding page numbers to document pages.",
        featureList: [
          "Upload a PDF document",
          "Add page numbers",
          "Customize available numbering options",
          "Preview numbered pages",
          "Download the updated PDF",
        ],
      },
    ],
  },
};
