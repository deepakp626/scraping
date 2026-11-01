import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import QuickCommerceClient from "./QuickCommerceClient";

export const metadata: Metadata = {
  title: "Quick Commerce Data Scraping Services ",
  description:
    "Track quick-commerce product availability, dark-store stock, delivery times, fees and promotions. Get structured platform data for faster retail decisions.",
  alternates: {
    canonical: "https://compilepilot.com/services/quick-commerce-scraping",
  },
  openGraph: {
    type: "website",
    url: "https://compilepilot.com/services/quick-commerce-scraping",
    siteName: "CompilePilot",
    title: "Quick Commerce Data Scraping Services | CompilePilot",
    description:
      "Monitor dark-store inventory, product availability, delivery times, dynamic pricing, and flash promotions across quick-commerce platforms. Get structured data for smarter retail decisions.",
    images: [
      {
        url: "https://compilepilot.com/services/quick-commerce-scraping/quick-commerce-hero.png",
        width: 1200,
        height: 630,
        alt: "CompilePilot Quick Commerce Data Scraping Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quick Commerce Data Scraping Services | CompilePilot",
    description:
      "Track quick-commerce product availability, dark-store stock, delivery times, fees and promotions. Get structured platform data for faster retail decisions.",
    images: [
      "https://compilepilot.com/services/quick-commerce-scraping/quick-commerce-hero.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function QuickCommerceScrapingPage() {
  return (
    <>
      <ServiceSchema
        pageUrl="https://compilepilot.com/services/quick-commerce-scraping"
        pageName="Quick Commerce Data Scraping Services | CompilePilot"
        pageDescription="Monitor quick-commerce inventory, dark-store stock, delivery times, dynamic pricing, and promotions through structured data extraction."
        serviceName="Quick Commerce Data Scraping Services"
        serviceType="Quick Commerce Data Extraction and Monitoring"
        serviceDescription="Structured extraction of quick-commerce product information, SKU and barcode details, dark-store inventory, product availability, delivery fees, estimated delivery times, dynamic pricing, promotional offers, and digital shelf placement data."
      />
      <QuickCommerceClient />
    </>
  );
}
