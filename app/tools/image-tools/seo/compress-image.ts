import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/compress-image";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/compress-image-og-image.png";

export const compressImageSeo = {
  metadata: {
    title: "Free Image Compressor: JPG, PNG, WebP | CompilePilot",
    description:
      "Compress JPG, PNG and WebP images online with CompilePilot. Reduce image file size in your browser while preserving visual quality, then download your optimized image.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: "Compress Images Online | JPG, PNG & WebP – CompilePilot",
      description:
        "Reduce image file sizes with CompilePilot’s free online compressor. Upload JPG, PNG or WebP files, compress them in your browser, and download the optimized images.",
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot online image compressor",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Free Image Compressor: JPG, PNG, WebP | CompilePilot",
      description:
        "Compress JPG, PNG and WebP images in your browser. Reduce file size while keeping images clear, then download your optimized files with CompilePilot.",
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
        name: "Free Image Compressor: JPG, PNG, WebP | CompilePilot",
        description:
          "Compress JPG, PNG and WebP images in the browser with CompilePilot’s online image compressor.",
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
        name: "CompilePilot Image Compressor",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any",
        description:
          "A browser-based utility for compressing JPG, PNG and WebP images to reduce file size while maintaining visual quality.",
        featureList: [
          "Compress JPG images",
          "Compress PNG images",
          "Compress WebP images",
          "Process images in the browser",
          "Download compressed images",
        ],
      },
    ],
  },
};
