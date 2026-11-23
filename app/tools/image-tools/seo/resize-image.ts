import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/resize-image";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/resize-image-og-image.png";

export const resizeImageSeo = {
  metadata: {
    title: "Resize Images Online Free | PNG, JPEG, WebP & GIF",
    description:
      "Resize PNG, JPEG, WebP, SVG and GIF images online with CompilePilot. Set custom dimensions, maintain aspect ratio and download resized images quickly.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Resize Images Online | Custom Image Dimensions – CompilePilot",
      description:
        "Change image dimensions with CompilePilot’s online image resizer. Upload PNG, JPEG, WebP, SVG or GIF files, set a custom size, and maintain the aspect ratio.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot online image resizer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Resize Images Online Free | CompilePilot",
      description:
        "Resize PNG, JPEG, WebP, SVG and GIF images online. Set custom dimensions, keep the aspect ratio, and download your resized image with CompilePilot.",
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
        name: "Resize Images Online Free | PNG, JPEG, WebP & GIF",
        description:
          "Resize PNG, JPEG, WebP, SVG and GIF images with custom dimensions and an aspect-ratio option using CompilePilot.",
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
        name: "CompilePilot Image Resizer",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        description:
          "An online image utility for changing image dimensions with custom sizing and an aspect-ratio option.",
        featureList: [
          "Upload PNG images",
          "Upload JPEG images",
          "Upload WebP images",
          "Upload SVG images",
          "Upload GIF images",
          "Set custom image dimensions",
          "Maintain image aspect ratio",
          "Download resized images",
        ],
      },
    ],
  },
};
