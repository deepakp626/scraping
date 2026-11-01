import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import FoodClient from "./FoodClient";

const pageUrl = "https://compilepilot.com/services/food-data-scraping";

export const metadata: Metadata = {
  title: "Food & Restaurant Data Scraping Services | CompilePilot",
  description:
    "Extract restaurant listings, menus, food prices, opening hours, ratings, reviews and location data. Get clean, structured food industry insights with CompilePilot.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Food & Restaurant Data Scraping Services | CompilePilot",
    description:
      "Collect restaurant profiles, structured menus, item prices, operating hours, ratings, reviews and geolocation data from food directories and discovery platforms. Turn accessible food data into structured insights with CompilePilot.",
    url: pageUrl,
    siteName: "CompilePilot",
    type: "website",
    images: [
      {
        url: "https://compilepilot.com/services/food-data-scraping/food-hero.png",
        width: 1200,
        height: 630,
        alt: "Food Data Scraping by CompilePilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Food & Restaurant Data Scraping Services | CompilePilot",
    description:
      "Collect restaurant listings, menus, food prices, ratings, reviews and location data with structured food industry datasets from CompilePilot.",
    images: [
      "https://compilepilot.com/services/food-data-scraping/food-hero.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FoodDataScrapingPage() {
  return (
    <>
      <ServiceSchema
        pageUrl={pageUrl}
        pageName="Food & Restaurant Data Scraping Services | CompilePilot"
        pageDescription="Extract restaurant listings, menus, food prices, opening hours, ratings, reviews and location data. Get clean, structured food industry insights with CompilePilot."
        serviceName="Food & Restaurant Data Scraping"
        serviceType="Restaurant, menu and food industry data extraction"
        serviceDescription="Structured collection of accessible restaurant profiles, menu categories and items, prices, operating hours, ratings, reviews, cuisine classifications and location information, subject to source permissions and applicable requirements."
      />
      <FoodClient />
    </>
  );
}
