import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/converter-tools/audio-converter";
const siteUrl = "https://compilepilot.com/";
const ogImage =
  "https://compilepilot.com/tools/converter-tools/audio-converter-og-image.png";

const pageTitle = "Online Audio Converter | CompilePilot";
const pageDescription =
  "Convert supported audio files between available formats with CompilePilot. Choose a source file and an output format supported by the converter.";
const socialTitle = "Audio Converter Online – CompilePilot";
const socialDescription =
  "Convert audio files between supported formats using CompilePilot’s online audio converter.";

export const audioConverterSeo = {
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
          alt: "Audio Converter - CompilePilot",
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
        name: "Audio Converter",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description: pageDescription,
        featureList: [
          "Audio file conversion",
          "Available output format selection",
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
