import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/blur-image";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/blur-image-og-image.png";

export const blurImageSeo = {
  metadata: {
    title: "Blur Images Online Free | Apply Blur Effect – CompilePilot",
    description:
      "Blur images online with CompilePilot. Apply a blur effect, adjust the available settings, preview the result, and download your edited image.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Blur Images Online | Apply an Image Blur Effect – CompilePilot",
      description:
        "Add a blur effect to your pictures with CompilePilot’s online image blur tool. Adjust the available controls, preview the edited image, and download it.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot Image Blur Tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blur Images Online | CompilePilot",
      description:
        "Apply a blur effect to images online with CompilePilot. Preview your edited image and download the result.",
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
        name: "Blur Images Online | CompilePilot",
        description:
          "Apply a blur effect to images using CompilePilot’s online image editing utility.",
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
        name: "CompilePilot Image Blur Tool",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description:
          "An online image utility for applying a blur effect to images.",
        featureList: [
          "Apply blur effect to images",
          "Adjust available blur settings",
          "Preview blurred image",
          "Download edited image",
        ],
      },
    ],
  },
};
