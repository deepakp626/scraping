import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/sharpen-image";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/sharpen-image-og-image.png";

export const sharpenImageSeo = {
  metadata: {
    title: "Sharpen Images Online Free | Improve Image Clarity – CompilePilot",
    description:
      "Sharpen images online with CompilePilot. Adjust the available sharpening settings, preview image details, and download the edited result.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Sharpen Images Online | Improve Image Clarity – CompilePilot",
      description:
        "Make image details appear clearer with CompilePilot’s online image sharpening tool. Adjust the available settings, preview the result, and download your image.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Image Sharpener",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sharpen Images Online | CompilePilot",
      description:
        "Adjust image sharpness online with CompilePilot. Preview the result and download your edited image.",
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
        name: "Sharpen Images Online | CompilePilot",
        description:
          "Adjust image sharpness using CompilePilot’s online image sharpening utility.",
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
        name: "CompilePilot Image Sharpener",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description:
          "An online image utility for applying sharpening adjustments to images.",
        featureList: [
          "Sharpen images online",
          "Adjust available sharpening settings",
          "Preview sharpened image",
          "Download edited image",
        ],
      },
    ],
  },
};
