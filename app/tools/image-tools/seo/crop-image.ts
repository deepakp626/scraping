import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/crop-image";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/crop-image-og-image.png";

export const cropImageSeo = {
  metadata: {
    title: "Crop Images Online Free | Aspect Ratio & HD Output – CompilePilot",
    description:
      "Crop images online with CompilePilot using free-form cropping or aspect ratio lock. Upload PNG, JPEG, WebP, SVG or GIF files and export your cropped image in HD.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "CompilePilot",
      title: "Crop Images Online with Aspect Ratio Lock | CompilePilot",
      description:
        "Crop images to your preferred proportions with CompilePilot. Use free-form cropping or lock an aspect ratio, with HD output and support for PNG, JPEG, WebP, SVG and GIF.",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot online crop image tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Crop Images Online with Aspect Ratio Lock | CompilePilot",
      description:
        "Crop images to your preferred proportions using free-form cropping or aspect ratio lock. Supports PNG, JPEG, WebP, SVG and GIF.",
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
        name: "Crop Images Online Free | CompilePilot",
        description:
          "Crop images using free-form cropping or aspect ratio lock, with HD output.",
        isPartOf: {
          "@id": "https://compilepilot.com/#website",
        },
        mainEntity: {
          "@id": `${pageUrl}#webapplication`,
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}#webapplication`,
        name: "CompilePilot Crop Image",
        url: pageUrl,
        description:
          "An online image cropping tool with free-form cropping, aspect ratio lock and HD output.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        featureList: [
          "Free-form image cropping",
          "Aspect ratio lock",
          "HD output",
          "PNG, JPEG, WebP, SVG and GIF upload support",
        ],
      },
    ],
  },
};
