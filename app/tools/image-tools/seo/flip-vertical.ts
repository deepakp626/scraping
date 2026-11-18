import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/flip-vertical";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/flip-vertical-og-image.png";

export const flipVerticalSeo = {
  metadata: {
    title: "Flip Image Vertically Online Free | Mirror Image – CompilePilot",
    description:
      "Flip PNG, JPG and WebP images vertically with CompilePilot. Create an upside-down mirror effect, preview the result, and save your flipped image. Supports uploads up to 15 MB.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Flip Images Vertically Online | CompilePilot",
      description:
        "Turn your image upside down with CompilePilot’s online vertical image flipper. Upload PNG, JPG or WebP files, preview the result, and save the flipped image.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Flip Image Vertically",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Flip Images Vertically Online | CompilePilot",
      description:
        "Flip PNG, JPG and WebP images vertically with CompilePilot. Preview the upside-down result and save your image.",
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
        name: "Flip Images Vertically Online | CompilePilot",
        description:
          "Flip PNG, JPG and WebP images vertically, preview the result, and save the flipped image.",
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
        name: "CompilePilot Flip Image Vertically",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description:
          "An online image utility for flipping PNG, JPG and WebP images vertically.",
        featureList: [
          "Flip images vertically",
          "One-click vertical flip",
          "Precise alignment",
          "Original scale",
          "Save flipped image",
          "PNG, JPG and WebP uploads",
          "Maximum upload size of 15 MB",
        ],
      },
    ],
  },
};
