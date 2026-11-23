import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/pdf-to-html";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/pdf-to-html-og-image.png";

export const pdfToHtmlSeo = {
  metadata: {
    title: "Convert PDF to HTML Online Free | CompilePilot",
    description:
      "Convert PDF documents into HTML online with CompilePilot. Transform supported PDF content into web-ready markup and download or view the converted HTML.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "PDF to HTML Converter Online | CompilePilot",
      description:
        "Convert PDF files into HTML with CompilePilot. Transform document content into web-ready markup using the online PDF to HTML tool.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot PDF to HTML tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Convert PDF to HTML Online | CompilePilot",
      description:
        "Turn PDF documents into HTML markup online with CompilePilot. Convert your file and access the resulting HTML output.",
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
        name: "Convert PDF to HTML Online Free | CompilePilot",
        description:
          "An online utility for converting PDF document content into HTML markup.",
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
        name: "CompilePilot PDF to HTML Converter",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online utility for converting PDF document content into HTML markup.",
        featureList: [
          "Upload a PDF document",
          "Convert PDF content into HTML",
          "View or download the generated HTML where supported",
        ],
      },
    ],
  },
};
