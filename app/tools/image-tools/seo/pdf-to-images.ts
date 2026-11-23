import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/image-tools/pdf-to-images";
const imageUrl =
  "https://compilepilot.com/tools/image-tools/pdf-to-images-og-image.png";

export const pdfToImagesSeo = {
  metadata: {
    title: "Convert PDF to Images Online Free | CompilePilot",
    description:
      "Convert PDF pages into image files online with CompilePilot. Upload a PDF, choose from the available conversion options, and download the resulting images.",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "CompilePilot",
      title: "Convert PDF to Images Online | CompilePilot",
      description:
        "Turn PDF pages into image files with CompilePilot. Use the available page and output settings, then download the converted images.",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "PDF to Images online with CompilePilot",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Convert PDF to Images Online | CompilePilot",
      description:
        "Convert PDF pages into image files with CompilePilot. Choose available settings and download the results.",
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
        name: "Convert PDF to Images Online Free | CompilePilot",
        description:
          "Convert PDF pages into image files online with CompilePilot. Upload a PDF, choose from the available conversion options, and download the resulting images.",
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
        name: "CompilePilot PDF to Images",
        url: pageUrl,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        description:
          "An online PDF-to-image conversion tool that converts PDF pages into image files using the output options supported by the page.",
        browserRequirements:
          "Requires a modern web browser with JavaScript enabled.",
        isPartOf: {
          "@id": "https://compilepilot.com/#website",
        },
      },
    ],
  },
};
