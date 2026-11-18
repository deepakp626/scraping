import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/unlock-pdf";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/unlock-pdf-og-image.png";

export const unlockPdfSeo = {
  metadata: {
    title: "Unlock PDF Online with Password | CompilePilot",
    description:
      "Remove PDF protection from a document you own or are authorized to modify with CompilePilot. Upload the file, unlock it, and download the resulting PDF.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Unlock Password-Protected PDF Online | CompilePilot",
      description:
        "Remove protection from a PDF you have permission to modify. Upload the document, unlock it, and download your file with CompilePilot.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Unlock PDF tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Unlock PDF Online with Password | CompilePilot",
      description:
        "Unlock a PDF you own or are authorized to modify. Upload it to remove protection and download the resulting file with CompilePilot.",
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
        name: "Unlock PDF Online with Password | CompilePilot",
        description:
          "An online PDF utility for removing protection from documents the user is authorized to modify.",
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
        name: "CompilePilot Unlock PDF",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online PDF utility for removing protection from documents the user is authorized to modify.",
        featureList: [
          "Upload a protected PDF document",
          "Remove protection from an authorized document",
          "Download the unlocked PDF",
        ],
      },
    ],
  },
};
