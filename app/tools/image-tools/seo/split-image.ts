import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/split-image";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/split-image-og-image.png";

export const splitImageSeo = {
  metadata: {
    title: "Split Image Online Free | CompilePilot",
    description:
      "Split an image into separate sections online with CompilePilot. Choose from the available split options, preview the result, and download the image parts.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "CompilePilot",
      title: "Split Image Online | CompilePilot",
      description:
        "Divide an image into separate sections with CompilePilot. Use the available split settings, preview the sections, and download the results.",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Split Image online with CompilePilot",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Split Image Online | CompilePilot",
      description:
        "Split an image into sections with CompilePilot. Preview the parts and download the results.",
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
        name: "Split Image Online Free | CompilePilot",
        description:
          "Split an image into separate sections online with CompilePilot. Choose from the available split options, preview the result, and download the image parts.",
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
        name: "CompilePilot Split Image",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description:
          "An online image splitting tool that divides an image into sections using the split options provided by the page.",
        browserRequirements:
          "Requires a modern web browser with JavaScript enabled.",
        isPartOf: {
          "@id": "https://compilepilot.com/#website",
        },
      },
    ],
  },
};
