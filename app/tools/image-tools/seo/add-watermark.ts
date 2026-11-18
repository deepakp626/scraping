import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/add-watermark";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/add-watermark-og-image.png";

export const addWatermarkSeo = {
  metadata: {
    title: "Add Watermark to Image Online Free | CompilePilot",
    description:
      "Add a watermark to your image online with CompilePilot. Customize the watermark using the options available, preview the result, and download your watermarked image.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "CompilePilot",
      title: "Add Watermark to Images Online | CompilePilot",
      description:
        "Apply a watermark to an image with CompilePilot. Use the available watermark settings, preview your image, and download the finished result.",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Add watermark to image online with CompilePilot",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Add Watermark to Images Online | CompilePilot",
      description:
        "Apply a watermark to an image with CompilePilot. Customize the available settings, preview the result, and download your image.",
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
        name: "Add Watermark to Image Online Free | CompilePilot",
        description:
          "Add a watermark to your image online with CompilePilot. Customize the watermark using the options available, preview the result, and download your watermarked image.",
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
        name: "CompilePilot Add Watermark to Image",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description:
          "An online image watermarking tool that lets users apply a watermark using the settings provided on the page, preview the result, and download the processed image.",
        browserRequirements:
          "Requires a modern web browser with JavaScript enabled.",
        isPartOf: {
          "@id": "https://compilepilot.com/#website",
        },
      },
    ],
  },
};
