import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import FoodDeliveryClient from "./FoodDeliveryClient";

const pageUrl =
  "https://compilepilot.com/services/food-delivery-data-scraping-service";

export const metadata: Metadata = {
  title: "Food Delivery Data Scraping Services | CompilePilot",
  description:
    "Monitor food delivery platform commissions, restaurant rankings, service fees, promotions, delivery availability and market demand. Get structured platform insights with CompilePilot.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Food Delivery Platform Data Scraping Services | CompilePilot",
    description:
      "Collect food delivery platform data including restaurant commissions, listing positions, service fees, promotions, delivery zones and demand signals. Turn accessible marketplace information into structured insights with CompilePilot.",
    url: pageUrl,
    siteName: "CompilePilot",
    type: "website",
    images: [
      {
        url: "https://compilepilot.com/services/food-delivery-data-scraping-service/food-delivery-hero.png",
        width: 1200,
        height: 630,
        alt: "Food Delivery Platform Data Scraping Services by CompilePilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Food Delivery Data Scraping Services | CompilePilot",
    description:
      "Track delivery platform commissions, restaurant rankings, fees, promotions and demand signals with structured food delivery market data from CompilePilot.",
    images: [
      "https://compilepilot.com/services/food-delivery-data-scraping-service/food-delivery-hero.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FoodDeliveryDataScrapingPage() {
  return (
    <>
      <ServiceSchema
        pageUrl={pageUrl}
        pageName="Food Delivery Data Scraping Services | CompilePilot"
        pageDescription="Monitor food delivery platform commissions, restaurant rankings, service fees, promotions, delivery availability and market demand. Get structured platform insights with CompilePilot."
        serviceName="Food Delivery Platform Data Scraping"
        serviceType="Food delivery marketplace and platform data extraction"
        serviceDescription="Structured collection of accessible food delivery marketplace information, such as published restaurant commission and fee information, listing positions, promotional offers, delivery zones, menu details and market demand indicators, subject to source permissions and applicable requirements."
      />
      <FoodDeliveryClient />
    </>
  );
}
