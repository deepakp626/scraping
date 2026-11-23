import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/convert-jpg";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/convert-jpg-og-image.png";

export const convertJpgSeo = {
  metadata: {
    title: "Convert Images to JPG Online Free | JPG Converter – CompilePilot",
    description:
      "Convert images to JPG online with CompilePilot. Upload supported image files, convert them to JPG format, and download the results. Use batch conversion if available on the page.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "CompilePilot",
      title: "Convert Images to JPG Online | CompilePilot",
      description:
        "Use CompilePilot to convert supported images to JPG format online. Upload your images, convert them, and download the JPG results.",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "CompilePilot online image to JPG converter",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Convert Images to JPG Online | CompilePilot",
      description:
        "Convert supported images to JPG format online with CompilePilot.",
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
        name: "Convert Images to JPG Online | CompilePilot",
        description:
          "Convert supported image files to JPG format using CompilePilot's online image converter.",
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
        name: "CompilePilot Convert to JPG",
        url: pageUrl,
        description: "An online tool for converting supported image files to JPG format.",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
      },
    ],
  },
};
