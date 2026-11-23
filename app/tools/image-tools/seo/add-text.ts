import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/add-text";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/add-text-og-image.png";

export const addTextSeo = {
  metadata: {
    title: "Add Text to Image Online Free | CompilePilot",
    description:
      "Add text to an image online with CompilePilot. Customize text using the options available, preview your design, and download the edited image.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "CompilePilot",
      title: "Add Text to Images Online | CompilePilot",
      description:
        "Add a text overlay to your image with CompilePilot. Customize the available text settings, preview the design, and download the result.",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Add Text to Image online with CompilePilot",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Add Text to Images Online | CompilePilot",
      description:
        "Add and customize text on an image with CompilePilot. Preview the design and download your edited image.",
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
        name: "Add Text to Image Online Free | CompilePilot",
        description:
          "Add text to an image online with CompilePilot. Customize text using the options available, preview your design, and download the edited image.",
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
        name: "CompilePilot Add Text to Image",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description:
          "An online image text overlay tool that lets users add text and customize it using the options provided by the page.",
        browserRequirements:
          "Requires a modern web browser with JavaScript enabled.",
        isPartOf: {
          "@id": "https://compilepilot.com/#website",
        },
      },
    ],
  },
};
