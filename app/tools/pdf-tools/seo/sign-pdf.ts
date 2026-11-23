import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/sign-pdf";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/sign-pdf-og-image.png";

export const signPdfSeo = {
  metadata: {
    title: "Sign PDF Online – Add Your Signature | CompilePilot",
    description:
      "Add a signature to a PDF online with CompilePilot. Place your signature on the document, review its position, and download the signed PDF.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Sign PDF Online | Add a Signature to a PDF – CompilePilot",
      description:
        "Place a signature on your PDF document with CompilePilot. Add your signature, review the page, and download the signed file online.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Sign PDF tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sign PDF Online – Add Your Signature | CompilePilot",
      description:
        "Add your signature to a PDF online, position it on the page, and download the signed document with CompilePilot.",
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
        name: "Sign PDF Online – Add Your Signature | CompilePilot",
        description:
          "An online PDF utility for placing a user-provided signature onto a PDF document.",
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
        name: "CompilePilot Sign PDF",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online PDF utility for placing a user-provided signature onto a PDF document.",
        featureList: [
          "Upload a PDF document",
          "Add or provide a signature",
          "Place the signature on a PDF page",
          "Preview the signed document",
          "Download the signed PDF",
        ],
      },
    ],
  },
};
