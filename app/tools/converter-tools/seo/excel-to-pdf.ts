import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/tools/converter-tools/excel-to-pdf";
const siteUrl = "https://compilepilot.com/";
const ogImage =
  "https://compilepilot.com/tools/converter-tools/excel-to-pdf-og-image.png";

const pageTitle = "Free Excel to PDF Converter Online | CompilePilot";
const pageDescription =
  "Convert Excel files to PDF online with CompilePilot. Turn supported spreadsheet files into PDF documents for easier sharing and viewing.";
const socialTitle = "Excel to PDF Converter Online – CompilePilot";
const socialDescription =
  "Convert supported Excel spreadsheets to PDF with CompilePilot’s online Excel to PDF converter.";

export const excelToPdfSeo = {
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
          alt: "CompilePilot Excel to PDF converter",
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
        name: "CompilePilot Excel to PDF Converter",
        url: pageUrl,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        description:
          "An online converter for transforming supported Excel spreadsheet files into PDF documents.",
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

export function getConverterToolSeo(slug: string) {
  return slug === "excel-to-pdf" ? excelToPdfSeo : undefined;
}
