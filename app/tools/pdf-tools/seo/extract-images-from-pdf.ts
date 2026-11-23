import type { Metadata } from "next";

const pageUrl =
  "https://compilepilot.com/tools/pdf-tools/extract-images-from-pdf";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/extract-images-from-pdf-og-image.png";

export const extractImagesFromPdfSeo = {
  metadata: {
    title: "Extract Images from PDF Online Free | CompilePilot",
    description:
      "Extract images from PDF files online with CompilePilot. Upload a document, retrieve embedded images where available, and download the extracted image files.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Extract Images from PDF Online | CompilePilot",
      description:
        "Save images embedded in a PDF with CompilePilot. Upload your document, extract available images, and download the image files.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Extract Images from PDF tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Extract Images from PDF Online | CompilePilot",
      description:
        "Extract embedded images from PDF documents online. Upload a file and download the images found with CompilePilot.",
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
        name: "Extract Images from PDF Online Free | CompilePilot",
        description:
          "An online PDF utility for extracting image assets embedded in PDF documents.",
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
        name: "CompilePilot Extract Images from PDF",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online PDF utility for extracting image assets embedded in PDF documents.",
        featureList: [
          "Upload a PDF document",
          "Find and extract embedded images",
          "Download extracted image files",
        ],
      },
    ],
  },
};
