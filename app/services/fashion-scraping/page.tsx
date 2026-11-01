import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import FashionScrapingClient from "./FashionScrapingClient";

export const metadata: Metadata = {
  title:
    "Fashion Data Scraping Services | Apparel & Product Data | CompilePilot",
  description:
    "Extract fashion product catalogs, prices, sizes, colors, inventory, and reviews from online retailers. Get clean, structured apparel data with CompilePilot.",
  alternates: {
    canonical: "https://compilepilot.com/services/fashion-scraping",
  },
  openGraph: {
    type: "website",
    url: "https://compilepilot.com/services/fashion-scraping",
    siteName: "CompilePilot",
    title: "Fashion & Apparel Data Scraping Services | CompilePilot",
    description:
      "Collect fashion product listings, SKU variants, size and color availability, prices, discounts, images, and customer reviews. CompilePilot delivers structured apparel data for retail analysis.",
    images: [
      {
        url: "/services/fashion-scraping/fashion-hero.png",
        width: 1200,
        height: 630,
        alt: "CompilePilot fashion and apparel data scraping services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion & Apparel Data Scraping Services | CompilePilot",
    description:
      "Collect fashion product listings, SKU variants, size and color availability, prices, discounts, images, and customer reviews. Get structured apparel data with CompilePilot.",
    images: ["/services/fashion-scraping/fashion-hero.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function FashionScrapingPage() {
  return (
    <>
      <ServiceSchema
        pageUrl="https://compilepilot.com/services/fashion-scraping"
        pageName="Fashion Data Scraping Services | CompilePilot"
        pageDescription="Extract fashion product catalogs, prices, sizes, colors, inventory, and reviews from online retailers."
        serviceName="Fashion & Apparel Data Scraping"
        serviceType="Fashion and apparel product data extraction"
        serviceDescription="Structured extraction of fashion product catalogs, SKU and article IDs, brands, prices, discounts, size and color variants, material details, stock status, product image URLs, ratings, reviews, seller details, and delivery information."
      />
      <FashionScrapingClient />
    </>
  );
}
