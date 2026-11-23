import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/convert-png";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/convert-png-og-image.png";

export const convertPngSeo = {
  metadata: {
    title: "Convert Images to PNG Online Free | Lossless PNG Converter – CompilePilot",
    description:
      "Convert JPG, JPEG, WebP, BMP, GIF, TIFF and AVIF images to PNG online with CompilePilot. Preserve transparency and alpha channels with browser-based image conversion.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "CompilePilot",
      title: "Convert Images to PNG Online | Lossless Image Converter – CompilePilot",
      description:
        "Convert images to lossless PNG format with CompilePilot. Upload JPG, JPEG, WebP, BMP, GIF, TIFF or AVIF files and preserve transparency directly in your browser.",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot online image to PNG converter",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Convert Images to PNG Online | Lossless Image Converter – CompilePilot",
      description:
        "Convert JPG, JPEG, WebP, BMP, GIF, TIFF and AVIF images to PNG online while preserving transparency.",
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
        name: "Convert Images to PNG Online | CompilePilot",
        description:
          "Convert supported image files to PNG format with transparency preservation using CompilePilot.",
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
        name: "CompilePilot Convert to PNG",
        url: pageUrl,
        description:
          "A browser-based image converter that converts supported image formats to PNG and preserves transparency.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        featureList: [
          "Convert JPG and JPEG images to PNG",
          "Convert WebP images to PNG",
          "Convert BMP, GIF, TIFF and AVIF images to PNG",
          "Preserve transparency",
          "Preserve alpha channel",
          "Browser-based conversion",
        ],
      },
    ],
  },
};
