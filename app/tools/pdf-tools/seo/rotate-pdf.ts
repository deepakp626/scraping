import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/rotate-pdf";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/rotate-pdf-og-image.png";

export const rotatePdfSeo = {
  metadata: {
    title: "Rotate PDF Pages Online Free | CompilePilot",
    description:
      "Rotate PDF pages online with CompilePilot. Upload a document, turn pages left or right to the correct orientation, preview the result, and download your updated PDF.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Rotate PDF Pages Online | CompilePilot",
      description:
        "Fix page orientation in your PDF with CompilePilot. Rotate pages left or right, preview the changes, and download your updated document online.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Rotate PDF tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rotate PDF Pages Online Free | CompilePilot",
      description:
        "Correct PDF page orientation online. Rotate pages left or right, preview your changes, and download the updated PDF with CompilePilot.",
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
        name: "Rotate PDF Pages Online Free | CompilePilot",
        description:
          "Rotate PDF pages left or right to correct their orientation with CompilePilot.",
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
        name: "CompilePilot Rotate PDF",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online PDF utility for rotating document pages to the correct orientation.",
        featureList: [
          "Upload a PDF document",
          "Rotate PDF pages left or right",
          "Preview page orientation",
          "Download the updated PDF",
        ],
      },
    ],
  },
};
