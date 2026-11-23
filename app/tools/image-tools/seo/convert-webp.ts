import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/convert-webp";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/convert-webp-og-image.png";

export const convertWebpSeo = {
  metadata: {
    title: "Convert Images to WebP Online Free | WebP Converter – CompilePilot",
    description:
      "Convert JPG, PNG, GIF, BMP, TIFF and AVIF images to WebP online with CompilePilot. Create smaller image files with visual quality maintained and convert directly in your browser.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Convert Images to WebP Online | Smaller Image Files – CompilePilot",
      description:
        "Convert images to WebP format with CompilePilot’s online converter. Upload JPG, PNG, GIF, BMP, TIFF or AVIF files and create compact images directly in your browser.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot online image to WebP converter",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Convert Images to WebP Online | WebP Converter – CompilePilot",
      description:
        "Convert JPG, PNG, GIF, BMP, TIFF and AVIF images to WebP in your browser with CompilePilot.",
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
        name: "Convert Images to WebP Online | CompilePilot",
        description:
          "Convert supported image formats to WebP using CompilePilot’s browser-based image converter.",
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
        name: "CompilePilot WebP Converter",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        description:
          "A browser-based utility for converting JPG, PNG, GIF, BMP, TIFF and AVIF images to WebP format.",
        featureList: [
          "Convert JPG images to WebP",
          "Convert PNG images to WebP",
          "Convert GIF images to WebP",
          "Convert BMP images to WebP",
          "Convert TIFF images to WebP",
          "Convert AVIF images to WebP",
          "Browser-based image conversion",
          "Animation support",
        ],
      },
    ],
  },
};
