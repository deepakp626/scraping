import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/converter-tools/xml-to-csv";
const siteUrl = "https://compilepilot.com/";
const ogImage =
  "https://compilepilot.com/tools/converter-tools/xml-to-csv-og-image.png";

const pageTitle = "Free XML to CSV Converter Online | CompilePilot";
const pageDescription =
  "Convert XML to CSV online with CompilePilot. Transform supported XML data into tabular CSV format for spreadsheet and data workflows.";
const socialTitle = "XML to CSV Converter Online – CompilePilot";
const socialDescription =
  "Convert supported XML data into CSV with CompilePilot’s online XML to CSV converter.";

export const xmlToCsvSeo = {
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
          alt: "CompilePilot XML to CSV converter",
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
        name: "CompilePilot XML to CSV Converter",
        url: pageUrl,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        description:
          "An online converter for transforming supported XML data into CSV format.",
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
