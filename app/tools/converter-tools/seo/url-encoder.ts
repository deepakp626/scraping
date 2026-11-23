import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/converter-tools/url-encoder";
const siteUrl = "https://compilepilot.com/";
const ogImage =
  "https://compilepilot.com/tools/converter-tools/url-encoder-og-image.png";

const pageTitle = "Free URL Encoder & Decoder Online | CompilePilot";
const pageDescription =
  "Encode or decode URL text online with CompilePilot. Convert supported characters into URL-safe representations for web development and data handling.";
const socialTitle = "URL Encoder & Decoder Online – CompilePilot";
const socialDescription =
  "Encode and decode URL components with CompilePilot’s online URL tool.";

export const urlEncoderSeo = {
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
          alt: "URL Encoder and Decoder - CompilePilot",
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
        name: "URL Encoder and Decoder",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description: pageDescription,
        featureList: [
          "URL encoding",
          "URL decoding",
          "Text transformation for web workflows",
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
