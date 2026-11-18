import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/image-to-pdf";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/image-to-pdf-og-image.png";

export const imageToPdfSeo = {
  metadata: {
    title: "Convert Images to PDF Online Free | CompilePilot",
    description:
      "Convert JPG, PNG and other supported images into a PDF online with CompilePilot. Upload your images, arrange their order, and download one PDF document.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Image to PDF Converter Online | CompilePilot",
      description:
        "Turn image files into a single PDF document with CompilePilot. Upload supported images, arrange the page order, and create a PDF online.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Image to PDF tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Convert Images to PDF Online | CompilePilot",
      description:
        "Combine supported image files into a PDF document. Upload images, arrange their order, and download your PDF with CompilePilot.",
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
        name: "Convert Images to PDF Online Free | CompilePilot",
        description:
          "An online utility for converting supported image files into a PDF document.",
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
        name: "CompilePilot Image to PDF Converter",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online utility for converting supported image files into a PDF document.",
        featureList: [
          "Upload supported image files",
          "Convert images into PDF pages",
          "Arrange image or page order",
          "Download the resulting PDF",
        ],
      },
    ],
  },
};
