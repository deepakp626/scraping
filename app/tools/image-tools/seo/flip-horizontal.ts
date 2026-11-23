import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/flip-horizontal";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/flip-horizontal-og-image.png";

export const flipHorizontalSeo = {
  metadata: {
    title: "Flip Image Horizontally Online Free | Mirror Image – CompilePilot",
    description:
      "Flip PNG, JPG and WebP images horizontally with CompilePilot. Create a mirror effect, preview the result instantly, and save your flipped image. Supports uploads up to 15 MB.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Flip Images Horizontally Online | CompilePilot",
      description:
        "Mirror your image from left to right with CompilePilot’s online horizontal image flipper. Upload PNG, JPG or WebP files, preview the change, and save the flipped image.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Flip Image Horizontally",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Flip Images Horizontally Online | CompilePilot",
      description:
        "Create a horizontal mirror effect for PNG, JPG and WebP images. Preview and save your flipped image with CompilePilot.",
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
        name: "Flip Images Horizontally Online | CompilePilot",
        description:
          "Flip PNG, JPG and WebP images horizontally to create a mirror effect, preview the result, and save the flipped image.",
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
        name: "CompilePilot Flip Image Horizontally",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description:
          "An online image utility for flipping PNG, JPG and WebP images horizontally.",
        featureList: [
          "Flip images horizontally",
          "One-click horizontal flip",
          "Immediate preview",
          "Save flipped image",
          "PNG, JPG and WebP uploads",
          "Maximum upload size of 15 MB",
        ],
      },
    ],
  },
};
