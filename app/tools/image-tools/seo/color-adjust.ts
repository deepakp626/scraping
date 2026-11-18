import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/color-adjust";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/color-adjust-og-image.png";

export const colorAdjustSeo = {
  metadata: {
    title: "Adjust Image Colors Online Free | CompilePilot",
    description:
      "Adjust image colors online with CompilePilot. Use the available color controls, preview your changes, and download the edited image.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "CompilePilot",
      title: "Adjust Image Colors Online | CompilePilot",
      description:
        "Fine-tune an image using the color adjustment options available in CompilePilot. Preview your edits and download the result.",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Adjust Image Colors online with CompilePilot",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Adjust Image Colors Online | CompilePilot",
      description:
        "Adjust image colors with CompilePilot. Preview your edits and download the updated image.",
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
        name: "Adjust Image Colors Online Free | CompilePilot",
        description:
          "Adjust image colors online with CompilePilot. Use the available color controls, preview your changes, and download the edited image.",
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
        name: "CompilePilot Adjust Image Colors",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description:
          "An online image color adjustment tool that lets users modify an image using the controls provided on the page, preview the changes, and download the result.",
        browserRequirements:
          "Requires a modern web browser with JavaScript enabled.",
        isPartOf: {
          "@id": "https://compilepilot.com/#website",
        },
      },
    ],
  },
};
