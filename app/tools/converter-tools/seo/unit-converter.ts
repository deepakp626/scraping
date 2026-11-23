import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/converter-tools/unit-converter";
const siteUrl = "https://compilepilot.com/";
const ogImage =
  "https://compilepilot.com/tools/converter-tools/unit-converter-og-image.png";

const pageTitle = "Free Online Unit Converter | CompilePilot";
const pageDescription =
  "Convert values between supported measurement units with CompilePilot’s online unit converter. Select a category, enter a value, and view the converted result.";
const socialTitle = "Online Unit Converter – CompilePilot";
const socialDescription =
  "Convert measurements between supported units using CompilePilot’s simple online unit converter.";

export const unitConverterSeo = {
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
          alt: "Unit Converter - CompilePilot",
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
        name: "Unit Converter",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description: pageDescription,
        featureList: [
          "Measurement unit conversion",
          "Category-based unit selection",
          "Converted value display",
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
