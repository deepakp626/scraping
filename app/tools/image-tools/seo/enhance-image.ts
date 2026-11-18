import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/enhance-image";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/enhance-image-og-image.png";

export const enhanceImageSeo = {
  metadata: {
    title: "Enhance Images Online Free | Improve Image Quality – CompilePilot",
    description:
      "Enhance images online with CompilePilot. Improve image clarity and appearance, preview the result, and download the enhanced image. Check the tool for supported upload formats and enhancement options.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Enhance Images Online | Improve Image Quality – CompilePilot",
      description:
        "Improve the appearance of your images with CompilePilot’s online image enhancer. Upload an image, apply the available enhancement controls, preview the result, and download it.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Image Enhancer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Enhance Images Online | CompilePilot",
      description:
        "Improve image clarity and appearance with CompilePilot’s online image enhancer. Preview and download the enhanced result.",
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
        name: "Enhance Images Online | CompilePilot",
        description:
          "Enhance image appearance and clarity using CompilePilot’s online image enhancement tool.",
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
        name: "CompilePilot Image Enhancer",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description:
          "An online image utility for enhancing image appearance and clarity.",
        featureList: [
          "Online image enhancement",
          "Preview enhanced image",
          "Download enhanced image",
        ],
      },
    ],
  },
};
