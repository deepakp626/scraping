import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/lock-pdf";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/lock-pdf-og-image.png";

export const lockPdfSeo = {
  metadata: {
    title: "Lock PDF Online with AES-256 Encryption | CompilePilot",
    description:
      "Protect PDF files online with AES-256 password encryption using CompilePilot. Upload a document and add password protection to help prevent unauthorized access.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Lock & Protect PDF Files Online | CompilePilot",
      description:
        "Add AES-256 password encryption to your PDF with CompilePilot. Upload a document and protect its contents from unauthorized access.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Lock and Protect PDF tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Lock PDF Online with AES-256 Encryption | CompilePilot",
      description:
        "Protect your PDF with AES-256 password encryption. Upload a document to add password protection using CompilePilot’s online PDF tool.",
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
        name: "Lock PDF Online with AES-256 Encryption | CompilePilot",
        description:
          "Protect PDF files with AES-256 password encryption using CompilePilot’s online Lock PDF tool.",
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
        name: "CompilePilot Lock PDF",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online PDF utility that adds AES-256 password encryption to help protect documents from unauthorized access.",
        featureList: [
          "Upload a PDF document",
          "Add AES-256 password encryption",
          "Help protect PDF contents from unauthorized access",
        ],
      },
    ],
  },
};
