import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/merge-images";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/merge-images-og-image.png";

export const mergeImagesSeo = {
  metadata: {
    title: "Merge Images Online Free | CompilePilot",
    description:
      "Combine images online with CompilePilot. Add the images you want to merge, arrange them using the available options, preview the result, and download the combined image.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "CompilePilot",
      title: "Merge Images Online | CompilePilot",
      description:
        "Combine multiple images with CompilePilot. Arrange your images using the available controls, preview the composition, and download the result.",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Merge Images online with CompilePilot",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Merge Images Online | CompilePilot",
      description:
        "Combine images online with CompilePilot. Arrange, preview, and download your merged image.",
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
        name: "Merge Images Online Free | CompilePilot",
        description:
          "Combine images online with CompilePilot. Add the images you want to merge, arrange them using the available options, preview the result, and download the combined image.",
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
        name: "CompilePilot Merge Images",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description:
          "An online image merging tool that combines user-selected images according to the layout and arrangement options available on the page.",
        browserRequirements:
          "Requires a modern web browser with JavaScript enabled.",
        isPartOf: {
          "@id": "https://compilepilot.com/#website",
        },
      },
    ],
  },
};
