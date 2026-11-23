import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/converter-tools/base64";
const siteUrl = "https://compilepilot.com/";
const ogImage =
  "https://compilepilot.com/tools/converter-tools/base64-og-image.png";

const pageTitle = "Free Base64 Encoder & Decoder Online | CompilePilot";
const pageDescription =
  "Encode text to Base64 or decode Base64 strings online with CompilePilot. Use the supported input modes to transform data for development and troubleshooting.";
const socialTitle = "Base64 Encoder & Decoder Online – CompilePilot";
const socialDescription =
  "Encode and decode Base64 text with CompilePilot’s online Base64 tool.";

export const base64Seo = {
  metadata: {
    title: { absolute: pageTitle },
    description: pageDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: pageUrl,
      siteName: "CompilePilot",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Base64 Encoder and Decoder - CompilePilot",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [ogImage],
    },
  } satisfies Metadata,
  schema: {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": `${siteUrl}#website` },
        mainEntity: { "@id": `${pageUrl}#webapp` },
      },
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}#webapp`,
        name: "Base64 Encoder and Decoder",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description: pageDescription,
        featureList: [
          "Base64 encoding",
          "Base64 decoding",
          "Text input and output",
        ],
        isPartOf: { "@id": `${siteUrl}#website` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "CompilePilot",
      },
    ],
  },
};
