import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/compress-pdf";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/compress-pdf-og-image.png";

export const compressPdfSeo = {
  metadata: {
    title: "Compress PDF Online Free & Reduce File Size | CompilePilot",
    description:
      "Compress PDF files online with CompilePilot. Reduce document size while keeping pages clear and readable, then download your optimized PDF.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Compress PDF Online | Reduce PDF File Size – CompilePilot",
      description:
        "Make PDF files smaller with CompilePilot’s online PDF compressor. Optimize document size for easier storage, sharing and uploading.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Compress PDF tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Compress PDF Online Free | CompilePilot",
      description:
        "Reduce PDF file size online while keeping documents clear and readable. Upload your PDF and download the compressed file with CompilePilot.",
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
        name: "Compress PDF Online Free & Reduce File Size | CompilePilot",
        description:
          "An online utility for reducing PDF file size while maintaining document readability.",
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
        name: "CompilePilot Compress PDF",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online utility for reducing PDF file size while maintaining document readability.",
        featureList: [
          "Upload a PDF document",
          "Compress a PDF to reduce file size",
          "Download the compressed PDF",
        ],
      },
    ],
  },
};
