import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import RealEstateClient from "./RealEstateClient";

const pageUrl =
  "https://compilepilot.com/services/real-estate-property-data-scraping";

export const metadata: Metadata = {
  title: "Real Estate Data Scraping Services | CompilePilot",
  description:
    "Extract property listings, sale and rental prices, agent details, price history and neighbourhood data. Get structured real estate insights with CompilePilot.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Real Estate & Property Data Scraping | CompilePilot",
    description:
      "Collect property listings, asking and sold prices, rental data, agent details and neighbourhood insights from real estate portals. Turn accessible property information into structured market intelligence with CompilePilot.",
    url: pageUrl,
    siteName: "CompilePilot",
    type: "website",
    images: [
      {
        url: "https://compilepilot.com/services/real-estate-property-data-scraping/real-estate-hero.png",
        width: 1200,
        height: 630,
        alt: "Real estate and property data scraping by CompilePilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate & Property Data Scraping | CompilePilot",
    description:
      "Track property listings, sale and rental prices, price history, agent details and neighbourhood data with structured datasets from CompilePilot.",
    images: [
      "https://compilepilot.com/services/real-estate-property-data-scraping/real-estate-hero.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RealEstatePropertyDataScrapingPage() {
  return (
    <>
      <ServiceSchema
        pageUrl={pageUrl}
        pageName="Real Estate Data Scraping Services | CompilePilot"
        pageDescription="Extract property listings, sale and rental prices, agent details, price history and neighbourhood data. Get structured real estate insights with CompilePilot."
        serviceName="Real Estate & Property Data Scraping"
        serviceType="Real estate listing, pricing and property market data extraction"
        serviceDescription="Structured collection of accessible property listing details, asking and sold prices, rental listings, price history, agent information and neighbourhood attributes, subject to source permissions and applicable requirements."
      />
      <RealEstateClient />
    </>
  );
}
