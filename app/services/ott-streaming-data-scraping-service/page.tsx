import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import OttStreamingClient from "./OttStreamingClient";

const pageUrl =
  "https://compilepilot.com/services/ott-streaming-data-scraping-service";

export const metadata: Metadata = {
  title: "OTT Streaming Data Scraping Services | CompilePilot",
  description:
    "Collect OTT platform catalogs, titles, genres, release dates, ratings and publicly listed availability. Get structured streaming market data with CompilePilot.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "OTT & Streaming Platform Data Scraping | CompilePilot",
    description:
      "Monitor publicly listed streaming catalogs, titles, genres, release dates, ratings, language details and platform availability. Turn accessible OTT metadata into structured insights with CompilePilot.",
    url: pageUrl,
    siteName: "CompilePilot",
    type: "website",
    images: [
      {
        url: "https://compilepilot.com/services/ott-streaming-data-scraping-service/1-hero.png",
        width: 1200,
        height: 630,
        alt: "OTT Streaming Data Scraping Service by CompilePilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OTT Streaming Data Scraping Services | CompilePilot",
    description:
      "Track streaming catalogs, titles, genres, release dates, ratings and platform availability with structured OTT metadata from CompilePilot.",
    images: [
      "https://compilepilot.com/services/ott-streaming-data-scraping-service/1-hero.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function OttStreamingDataScrapingServicePage() {
  return (
    <>
      <ServiceSchema
        pageUrl={pageUrl}
        pageName="OTT Streaming Data Scraping Services | CompilePilot"
        pageDescription="Collect OTT platform catalogs, titles, genres, release dates, ratings and publicly listed availability. Get structured streaming market data with CompilePilot."
        serviceName="OTT Streaming Data Scraping Services"
        serviceType="OTT platform catalog and streaming metadata extraction"
        serviceDescription="Structured collection of publicly accessible OTT catalog metadata, including titles, genres, release dates, language information, ratings and listed platform availability, subject to source permissions and applicable requirements."
      />
      <OttStreamingClient />
    </>
  );
}
