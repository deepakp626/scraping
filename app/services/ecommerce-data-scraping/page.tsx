import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import EcommercePageClient from "./EcommercePageClient";

export const metadata: Metadata = {
  title: "E-commerce Data Scraping Services | CompilePilot",
  description:
    "Extract e-commerce product data, prices, reviews, inventory, and competitor insights from online marketplaces. Get accurate, structured retail data with CompilePilot.",
  alternates: {
    canonical: "https://compilepilot.com/services/ecommerce-data-scraping",
  },
  openGraph: {
    type: "website",
    url: "https://compilepilot.com/services/ecommerce-data-scraping",
    siteName: "CompilePilot",
    title: "E-commerce Product Data Scraping Services | CompilePilot",
    description:
      "Collect product listings, competitor prices, customer reviews, ratings, and inventory data from e-commerce websites. CompilePilot delivers structured retail data for smarter business decisions.",
    images: [
      {
        url: "/services/ecommerce-data-scraping/ecommerce-data-scraping-hero-image.png",
        width: 1200,
        height: 630,
        alt: "CompilePilot E-commerce Data Scraping Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce Product Data Scraping Services | CompilePilot",
    description:
      "Collect product listings, competitor prices, customer reviews, ratings, and inventory data from e-commerce websites. CompilePilot delivers structured retail data for smarter business decisions.",
    images: ["/services/ecommerce-data-scraping/ecommerce-data-scraping-hero-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EcommercePage() {
  return (
    <>
      <ServiceSchema
        pageUrl="https://compilepilot.com/services/ecommerce-data-scraping"
        pageName="E-commerce Data Scraping Services | CompilePilot"
        pageDescription="Extract e-commerce product data, prices, reviews, inventory, and competitor insights from online marketplaces."
        serviceName="E-commerce & Retail Data Scraping"
        serviceType="E-commerce Product Data Scraping and Retail Data Extraction"
        serviceDescription="E-commerce data extraction services covering product listings, prices, discounts, inventory, customer reviews, ratings, seller information, and marketplace data."
      />
      <EcommercePageClient />
    </>
  );
}
