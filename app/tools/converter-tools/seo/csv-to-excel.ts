import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/converter-tools/csv-to-excel";
const siteUrl = "https://compilepilot.com/";
const ogImage =
  "https://compilepilot.com/tools/converter-tools/csv-to-excel-og-image.png";

const pageTitle = "Free CSV to Excel Converter Online | CompilePilot";
const pageDescription =
  "Convert CSV to Excel online with CompilePilot. Transform supported CSV data into an Excel spreadsheet for easier editing and analysis.";
const socialTitle = "CSV to Excel Converter Online – CompilePilot";
const socialDescription =
  "Turn supported CSV data into an Excel spreadsheet with CompilePilot’s online CSV to Excel converter.";

export const csvToExcelSeo = {
  metadata: {
    title: { absolute: pageTitle },
    description: pageDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      type: "website",
      url: pageUrl,
      siteName: "CompilePilot",
      title: socialTitle,
      description: socialDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "CompilePilot CSV to Excel converter",
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
        name: "CompilePilot CSV to Excel Converter",
        url: pageUrl,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        description:
          "An online converter for transforming supported CSV data into an Excel spreadsheet.",
        browserRequirements: "Requires a modern web browser.",
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
