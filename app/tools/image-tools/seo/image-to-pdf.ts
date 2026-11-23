import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/image-to-pdf";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/image-to-pdf-og-image.png";

export const imageToPdfSeo = {
  metadata: {
    title: "Image to PDF Converter Online Free | JPG, PNG, WebP – CompilePilot",
    description:
      "Convert JPG, PNG and WebP images into a PDF online with CompilePilot. Combine multiple images, adjust page margins, and download your PDF directly from your browser.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Convert Images to PDF Online | JPG, PNG & WebP – CompilePilot",
      description:
        "Turn JPG, PNG and WebP images into a PDF with CompilePilot. Combine multiple images, adjust margins, and create your PDF directly in your browser.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot image to PDF converter",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Image to PDF Converter Online | CompilePilot",
      description:
        "Convert JPG, PNG and WebP images to PDF, combine multiple images, adjust margins, and download your document with CompilePilot.",
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
        name: "Convert Images to PDF Online | CompilePilot",
        description:
          "Convert JPG, PNG and WebP images into a PDF document directly in the browser, with multiple-image merging and margin adjustment.",
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
        name: "CompilePilot Image to PDF",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description:
          "A browser-based utility for converting JPG, PNG and WebP images into PDF documents.",
        featureList: [
          "Convert JPG images to PDF",
          "Convert PNG images to PDF",
          "Convert WebP images to PDF",
          "Combine multiple images into one PDF",
          "Adjust PDF page margins",
          "Browser-based PDF generation",
          "Download the generated PDF",
        ],
      },
    ],
  },
};
