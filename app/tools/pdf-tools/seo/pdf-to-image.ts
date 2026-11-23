import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/pdf-to-image";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/pdf-to-image-og-image.png";

export const pdfToImageSeo = {
  metadata: {
    title: "Convert PDF to JPG & PNG Online Free | CompilePilot",
    description:
      "Convert PDF pages into JPG or PNG images online with CompilePilot. Upload a PDF, choose image settings, preview the pages, and download your images.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "PDF to JPG & PNG Converter Online | CompilePilot",
      description:
        "Turn PDF pages into image files with CompilePilot. Convert documents to JPG or PNG, review the output, and download your images online.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot PDF to Image converter",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Convert PDF to JPG & PNG Online | CompilePilot",
      description:
        "Convert PDF pages into JPG or PNG images online. Upload your file, choose image settings, and download the converted pages with CompilePilot.",
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
        name: "Convert PDF to JPG & PNG Online Free | CompilePilot",
        description:
          "Convert PDF pages into JPG or PNG image files online with CompilePilot.",
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
        name: "CompilePilot PDF to Image Converter",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online utility for converting PDF pages into JPG or PNG image files.",
        featureList: [
          "Upload a PDF document",
          "Convert PDF pages to JPG images",
          "Convert PDF pages to PNG images",
          "Choose available image settings",
          "Preview converted pages",
          "Download converted images",
        ],
      },
    ],
  },
};
