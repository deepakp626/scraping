import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/pdf-tools/merge-pdf";
const imageUrl =
  "https://compilepilot.com/tools/pdf-tools/merge-pdf-og-image.png";

export const mergePdfSeo = {
  metadata: {
    title: "Merge PDF Files Online Free & Easily | CompilePilot",
    description:
      "Combine two or more PDF files into one document with custom page order using CompilePilot’s free online Merge PDF tool. Upload files and create a single PDF.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Merge PDF Files Online | Free PDF Merger – CompilePilot",
      description:
        "Combine multiple PDF files into one document and arrange pages in your preferred order with CompilePilot’s online Merge PDF tool.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Merge PDF online tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Merge PDF Files Online | CompilePilot",
      description:
        "Combine multiple PDF files into one document with custom page order using CompilePilot’s online Merge PDF tool.",
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
        name: "Merge PDF Files Online | CompilePilot",
        description:
          "Combine multiple PDF files into one document with custom page order using CompilePilot’s online Merge PDF tool.",
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
        name: "CompilePilot Merge PDF",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description:
          "An online tool for combining two or more PDF files into one document with a custom page order.",
        featureList: [
          "Merge two or more PDF files",
          "Arrange the page order before combining files",
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
    ],
  },
};
