import type { Metadata } from "next";

const pageUrl = "https://compilepilot.com/dataset";
const siteUrl = "https://compilepilot.com/";
const ogImage = "https://compilepilot.com/datasets/dataset-og-image.png";
const pageTitle =
  "Custom Dataset Services | Web Data Collection – CompilePilot";
const pageDescription =
  "Get custom datasets from public websites with CompilePilot. Request structured, cleaned data filtered by location, category, and fields, delivered in CSV, JSON, Excel, or other supported formats.";
const socialTitle =
  "Custom Dataset Services – Collect, Clean & Deliver Web Data | CompilePilot";
const socialDescription =
  "Turn public website data into structured datasets with CompilePilot. Define your target website, fields, location, and preferred delivery format.";
const twitterTitle = "Custom Dataset Services – CompilePilot";
const twitterDescription =
  "Request custom, structured datasets from public websites with location and field-based filtering.";

export const datasetsMetadata: Metadata = {
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
        alt: "Custom Dataset Services - CompilePilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: twitterTitle,
    description: twitterDescription,
    images: [ogImage],
  },
};

export function buildDatasetsSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: { "@id": `${siteUrl}#website` },
        mainEntity: { "@id": `${pageUrl}#service` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Custom Dataset Collection and Delivery",
        serviceType:
          "Custom public website data collection, structuring, cleaning, and delivery",
        url: pageUrl,
        description:
          "A custom dataset service that collects information from public websites, applies requested location and field filters, cleans and validates records, and delivers structured data in supported formats.",
        provider: {
          "@type": "Organization",
          name: "CompilePilot",
          url: siteUrl,
        },
        areaServed: "Worldwide",
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: pageUrl,
        },
      },
    ],
  };
}
