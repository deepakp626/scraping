import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/word-to-pdf";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/word-to-pdf-og-image.png";

export const wordToPdfSeo = {
  metadata: {
    title: "Free Online Word to PDF Converter | CompilePilot",
    description:
      "Convert Word documents to PDF online with CompilePilot. Upload DOCX or DOC files, customize fonts, layout and margins, preview your document, and download the PDF.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Word to PDF Converter Online | CompilePilot",
      description:
        "Convert DOCX, DOC and text documents into formatted PDF files. Customize fonts, page orientation, spacing and margins, preview your document, and download your PDF.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Word to PDF Converter",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Free Online Word to PDF Converter | CompilePilot",
      description:
        "Convert Word documents into formatted PDFs online. Customize fonts, layout and margins, preview your document, and download the finished PDF.",
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
        name: "Free Online Word to PDF Converter | CompilePilot",
        description:
          "Convert Word documents to PDF online with customizable fonts, layout, margins and live preview.",
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
        name: "CompilePilot Word to PDF Converter",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online tool for converting Word documents and text into formatted PDF files.",
        featureList: [
          "DOCX to PDF conversion",
          "DOC to PDF conversion",
          "Text to PDF conversion",
          "Font and layout customization",
          "PDF live preview",
          "Download formatted PDF",
        ],
      },
    ],
  },
};
