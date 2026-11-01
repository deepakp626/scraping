import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import GroceryScrapingClient from "./groceryScrapingClient";

export const metadata: Metadata = {
  title: "Grocery Data Scraping Services | Supermarket Data | CompilePilot",
  description:
    "Extract supermarket product catalogs, local grocery prices, promotions, stock availability, SKU and UPC details, and product information. Get structured grocery data with CompilePilot.",
  alternates: {
    canonical: "https://compilepilot.com/services/grocery-scraping",
  },
  openGraph: {
    type: "website",
    url: "https://compilepilot.com/services/grocery-scraping",
    siteName: "CompilePilot",
    title: "Grocery & Supermarket Data Scraping | CompilePilot",
    description:
      "Collect grocery product listings, store-level prices, discounts, coupons, availability, barcodes, and product details from supermarket websites and grocery platforms. Turn public grocery data into structured insights with CompilePilot.",
    images: [
      {
        url: "/services/grocery-scraping/grocery-hero.png",
        width: 1200,
        height: 630,
        alt: "CompilePilot grocery and supermarket data scraping",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grocery & Supermarket Data Scraping | CompilePilot",
    description:
      "Collect grocery product listings, local supermarket prices, discounts, coupons, stock availability, and product details. Get clean, structured grocery data with CompilePilot.",
    images: ["/services/grocery-scraping/grocery-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function GroceryScrapingPage() {
  return (
    <>
      <ServiceSchema
        pageUrl="https://compilepilot.com/services/grocery-scraping"
        pageName="Grocery Data Scraping Services | CompilePilot"
        pageDescription="Grocery and supermarket data extraction covering product catalogs, local pricing, promotions, stock availability, and product details."
        serviceName="Grocery & Supermarket Data Scraping"
        serviceType="Grocery and supermarket product data extraction"
        serviceDescription="Structured extraction of grocery product names, brands, SKU and UPC identifiers, store or ZIP-code location, regular and promotional prices, discounts, availability indicators, package sizes, ingredients, nutritional information, allergens, and publicly displayed ratings and review counts."
      />
      <GroceryScrapingClient />
    </>
  );
}
