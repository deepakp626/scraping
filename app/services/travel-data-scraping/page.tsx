import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import TravelClient from "./TravelClient";

const pageUrl = "https://compilepilot.com/services/travel-data-scraping";

export const metadata: Metadata = {
  title: "Travel Data Scraping Services | CompilePilot",
  description:
    "Extract travel prices, hotel rates, availability, reviews and destination data from travel websites. Get clean, structured insights with CompilePilot.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Travel & Hospitality Data Scraping Services | CompilePilot",
    description:
      "Collect travel and hospitality data including hotel pricing, room availability, flight details, reviews, ratings and destination information. Turn publicly accessible travel data into structured insights with CompilePilot.",
    url: pageUrl,
    siteName: "CompilePilot",
    type: "website",
    images: [
      {
        url: "https://compilepilot.com/services/travel-data-scraping/travel-hero.png",
        width: 1200,
        height: 630,
        alt: "Travel and hospitality data scraping by CompilePilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel & Hospitality Data Scraping Services | CompilePilot",
    description:
      "Track travel prices, hotel availability, ratings, reviews and destination information with structured travel data from CompilePilot.",
    images: [
      "https://compilepilot.com/services/travel-data-scraping/travel-hero.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TravelDataScrapingPage() {
  return (
    <>
      <ServiceSchema
        pageUrl={pageUrl}
        pageName="Travel Data Scraping Services | CompilePilot"
        pageDescription="Extract travel prices, hotel rates, availability, reviews and destination data from travel websites. Get clean, structured insights with CompilePilot."
        serviceName="Travel Data Scraping Services"
        serviceType="Travel and hospitality data extraction"
        serviceDescription="Structured collection of publicly accessible travel and hospitality information, such as accommodation rates, availability, property details, ratings, reviews and destination data, subject to source permissions and applicable requirements."
      />
      <TravelClient />
    </>
  );
}
