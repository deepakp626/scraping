import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/pdf-to-word";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/pdf-to-word-og-image.png";

export const pdfToWordSeo = {
  metadata: {
    title: "Convert PDF to Word Online Free | CompilePilot",
    description:
      "Convert PDF files to editable Word documents online with CompilePilot. Upload a PDF, convert its content, review the output, and download the Word file.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "PDF to Word Converter Online | CompilePilot",
      description:
        "Turn PDF documents into editable Word files with CompilePilot. Convert your document online and download the resulting Word file.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot PDF to Word tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Convert PDF to Word Online | CompilePilot",
      description:
        "Convert a PDF into an editable Word document online. Upload your file and download the converted document with CompilePilot.",
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
        name: "Convert PDF to Word Online Free | CompilePilot",
        description:
          "An online utility for converting PDF documents into editable Word files.",
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
        name: "CompilePilot PDF to Word Converter",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online utility for converting PDF documents into editable Word files.",
        featureList: [
          "Upload a PDF document",
          "Convert PDF content to Word format",
          "Download the converted Word document",
        ],
      },
    ],
  },
};
