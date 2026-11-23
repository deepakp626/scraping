import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/rotate-image";
const imageUrl =
  "https://compilepilot.com/tools/image-tool/rotate-image-og-image.png";

export const rotateImageSeo = {
  metadata: {
    title:
      "Rotate Images Online Free | 90°, 180°, 270° & Custom Angle – CompilePilot",
    description:
      "Rotate PNG, JPG and WebP images online with CompilePilot. Turn images clockwise or counter-clockwise by 90°, 180° or 270°, use custom angles, and save the rotated image.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Rotate Images Online | PNG, JPG & WebP – CompilePilot",
      description:
        "Change image orientation with CompilePilot’s online image rotator. Upload PNG, JPG or WebP files up to 15 MB, rotate clockwise or counter-clockwise, and save your result.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot online image rotation tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rotate Images Online Free | CompilePilot",
      description:
        "Rotate PNG, JPG and WebP images clockwise or counter-clockwise with CompilePilot. Upload images up to 15 MB and save the rotated result.",
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
        name: "Rotate Images Online Free | CompilePilot",
        description:
          "Rotate PNG, JPG and WebP images clockwise or counter-clockwise, then save the rotated image.",
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
        name: "CompilePilot Rotate Image",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        description:
          "An online image rotation tool for PNG, JPG and WebP files, with preset rotation controls and custom angle support.",
        featureList: [
          "Rotate images clockwise",
          "Rotate images counter-clockwise",
          "90°, 180° and 270° rotation options",
          "Custom angle support",
          "PNG, JPG and WebP upload support",
          "Maximum upload size of 15 MB",
          "Save rotated images",
        ],
      },
    ],
  },
};
