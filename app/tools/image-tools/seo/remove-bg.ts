import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/remove-bg";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/remove-bg-og-image.png";

export const removeBgSeo = {
  metadata: {
    title: "Remove Image Background Online Free | AI Background Remover – CompilePilot",
    description:
      "Remove backgrounds from portrait and product images with CompilePilot. Use AI background detection, refine clean cutout edges, and download a transparent PNG in HD.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Remove Image Background Online | Transparent PNG – CompilePilot",
      description:
        "Create a clean image cutout with CompilePilot’s background remover. Detect backgrounds in portrait, product, and animal images, then export a transparent PNG in HD.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Background Remover",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Remove Image Background Online | CompilePilot",
      description:
        "Remove backgrounds from portraits, product photos, and animal images. Get clean cutout edges and download a transparent PNG in HD.",
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
        name: "Remove Image Background Online | CompilePilot",
        description:
          "Remove backgrounds from portrait, product, and animal images with AI background detection and transparent PNG output.",
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
        name: "CompilePilot Background Remover",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description:
          "An online background-removal utility with AI background detection and transparent PNG output.",
        featureList: [
          "AI background detection",
          "Background removal for portraits",
          "Background removal for product photos",
          "Background removal for animal images",
          "Clean cutout edges",
          "HD output mode",
          "Download transparent PNG",
        ],
      },
    ],
  },
};
