import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/converter-tools/csv-to-json";
const siteUrl = "https://compilepilot.com/";
const ogImage =
  "https://compilepilot.com/tools/converter-tools/csv-to-json-og-image.png";

const pageTitle = "Free CSV to JSON Converter Online | CompilePilot";
const pageDescription =
  "Convert CSV data to JSON online with CompilePilot. Paste or upload supported CSV content and transform rows into structured JSON for development and data workflows.";
const socialTitle = "CSV to JSON Converter Online – CompilePilot";
const socialDescription =
  "Turn CSV rows into JSON data with CompilePilot’s online converter. Convert supported tabular content into structured JSON for your workflow.";

export const csvToJsonSeo = {
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
          alt: "CSV to JSON Converter - CompilePilot",
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
        name: "CSV to JSON Converter",
        url: pageUrl,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        description: pageDescription,
        featureList: [
          "CSV input",
          "JSON output",
          "Conversion of tabular rows into structured JSON",
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
