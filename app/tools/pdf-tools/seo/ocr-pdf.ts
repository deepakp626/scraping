import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/ocr-pdf";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/ocr-pdf-og-image.png";

export const ocrPdfSeo = {
  metadata: {
    title: "OCR PDF Online – Extract Text from Scans | CompilePilot",
    description:
      "Use OCR to recognize text in scanned PDF documents with CompilePilot. Convert image-based pages into searchable text and work with your document more easily.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "OCR PDF Online | Make Scanned PDFs Searchable – CompilePilot",
      description:
        "Recognize text in scanned PDF pages with CompilePilot’s online OCR tool. Turn image-based documents into searchable text where supported.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot OCR PDF tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "OCR PDF Online – Extract Text from Scans | CompilePilot",
      description:
        "Recognize text in scanned PDF documents with online OCR. Make image-based pages searchable with CompilePilot.",
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
        name: "OCR PDF Online – Extract Text from Scans | CompilePilot",
        description:
          "An online PDF utility that uses optical character recognition to recognize text in scanned PDF pages.",
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
        name: "CompilePilot OCR PDF",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online PDF utility that uses optical character recognition to recognize text in scanned PDF pages.",
        featureList: [
          "Upload a scanned PDF document",
          "Run optical character recognition",
          "Recognize text in scanned pages",
          "Create searchable or text-extractable output where supported",
        ],
      },
    ],
  },
};
