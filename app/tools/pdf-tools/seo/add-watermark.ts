import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/add-watermark";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/add-watermark-og-image.png";

export const addWatermarkSeo = {
  metadata: {
    title: "Add Watermark to PDF Online Free | CompilePilot",
    description:
      "Add a text watermark to PDF files online with CompilePilot. Customize its placement and appearance, preview your document, and download the watermarked PDF.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Add a Watermark to PDF Online | CompilePilot",
      description:
        "Label PDF documents with a customizable text watermark. Adjust its placement and appearance, preview the result, and download your updated PDF with CompilePilot.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Add Watermark tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Add Watermark to PDF Online | CompilePilot",
      description:
        "Add a text watermark to your PDF online. Customize its appearance, preview the document, and download the updated file.",
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
        name: "Add Watermark to PDF Online Free | CompilePilot",
        description:
          "An online PDF utility for applying customizable text watermarks to PDF documents.",
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
        name: "CompilePilot Add Watermark to PDF",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online PDF utility for applying customizable text watermarks to PDF documents.",
        featureList: [
          "Upload a PDF document",
          "Add a text watermark",
          "Customize watermark placement and appearance",
          "Preview the watermarked PDF",
          "Download the watermarked PDF",
        ],
      },
    ],
  },
};
