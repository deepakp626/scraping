import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import LiquorClient from "./LiquorClient";

const pageUrl =
  "https://compilepilot.com/services/liquor-or-alchol-data-scraping";

export const metadata: Metadata = {
  title: "Alcohol & Beverage Data Scraping Services | CompilePilot",
  description:
    "Collect publicly listed beverage product details, prices, promotions, retailer locations and availability. Get structured alcohol market data with CompilePilot.",
  keywords: [
    "alcohol data scraping",
    "liquor data extraction",
    "beverage data scraping services",
    "wine price scraping",
    "beer catalog data",
    "spirits pricing intelligence",
    "retail alcohol availability",
    "alcohol market research data",
    "online liquor store scraping",
    "beverage product catalog datasets",
    "CompilePilot",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Alcohol & Beverage Market Data Scraping | CompilePilot",
    description:
      "Organize publicly listed beverage catalogs, product details, prices, promotions, retailer information and availability into structured datasets for market and competitor research with CompilePilot.",
    url: pageUrl,
    siteName: "CompilePilot",
    type: "website",
    images: [
      {
        url: "https://compilepilot.com/services/liquor-or-alchol-data-scraping/liquor-hero.png",
        width: 1200,
        height: 630,
        alt: "Liquor & Alcohol Data Scraping by CompilePilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alcohol & Beverage Data Scraping Services | CompilePilot",
    description:
      "Analyze publicly listed beverage products, prices, promotions, retailer details and availability with structured market data from CompilePilot.",
    images: [
      "https://compilepilot.com/services/liquor-or-alchol-data-scraping/liquor-hero.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LiquorScrapingPage() {
  return (
    <>
      <ServiceSchema
        pageUrl={pageUrl}
        pageName="Alcohol & Beverage Data Scraping Services | CompilePilot"
        pageDescription="Collect publicly listed beverage product details, prices, promotions, retailer locations and availability. Get structured alcohol market data with CompilePilot."
        serviceName="Alcohol & Beverage Data Scraping Services"
        serviceType="Public beverage catalog, pricing and retail market data extraction"
        serviceDescription="Structured collection of publicly accessible beverage product information, listed prices, promotions, retailer details and availability indicators for market research, subject to source permissions, age-related restrictions, advertising rules and applicable law."
      />
      <LiquorClient />
    </>
  );
}
