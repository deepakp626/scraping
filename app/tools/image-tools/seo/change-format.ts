import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/change-format";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/change-format-og-image.png";

export const changeFormatSeo = {
  metadata: {
    title: "Change Image Format Online Free | CompilePilot",
    description:
      "Convert an image to another supported file format with CompilePilot. Upload your image, choose an available format, preview the result, and download the converted file.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "CompilePilot",
      title: "Change Image Format Online | CompilePilot",
      description:
        "Convert images between the formats available in CompilePilot. Choose an output format, preview the result, and download your converted image.",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Change Image Format online with CompilePilot",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Change Image Format Online | CompilePilot",
      description:
        "Convert an image to an available file format with CompilePilot. Preview the converted result and download it.",
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
        name: "Change Image Format Online Free | CompilePilot",
        description:
          "Convert an image to another supported file format with CompilePilot. Upload your image, choose an available format, preview the result, and download the converted file.",
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
        name: "CompilePilot Change Image Format",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description:
          "An online image format conversion tool. Users can select from the formats offered by the page, convert an image, and download the result.",
        browserRequirements:
          "Requires a modern web browser with JavaScript enabled.",
        isPartOf: {
          "@id": "https://compilepilot.com/#website",
        },
      },
    ],
  },
};
