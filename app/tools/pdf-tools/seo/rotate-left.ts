import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/rotate-left";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/rotate-left-og-image.png";

export const rotateLeftSeo = {
  metadata: {
    title: "Rotate PDF Left Online | CompilePilot",
    description:
      "Rotate PDF pages 90 degrees to the left online with CompilePilot. Upload your document, correct page orientation, preview the result, and download the updated PDF.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Rotate PDF Left Online | CompilePilot",
      description:
        "Turn PDF pages counterclockwise with CompilePilot. Correct page orientation, review the result, and download your updated PDF.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Rotate PDF Left tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rotate PDF Left Online | CompilePilot",
      description:
        "Rotate PDF pages counterclockwise online. Preview the corrected document and download your updated PDF with CompilePilot.",
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
        name: "Rotate PDF Left Online | CompilePilot",
        description:
          "An online PDF utility for rotating PDF pages 90 degrees counterclockwise.",
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
        name: "CompilePilot Rotate PDF Left",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online PDF utility for rotating PDF pages 90 degrees counterclockwise.",
        featureList: [
          "Upload a PDF document",
          "Rotate pages 90 degrees counterclockwise",
          "Preview the updated page orientation",
          "Download the updated PDF",
        ],
      },
    ],
  },
};
