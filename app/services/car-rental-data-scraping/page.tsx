import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import CarRentalClient from "./CarRentalClient";

const pageUrl = "https://compilepilot.com/services/car-rental-data-scraping";

export const metadata: Metadata = {
  title: "Car Rental Data Scraping Services | CompilePilot",
  description:
    "Extract car rental prices, vehicle availability, rental terms, locations and customer reviews from car rental websites. Get structured rental market data with CompilePilot.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Car Rental & Vehicle Rental Data Scraping | CompilePilot",
    description:
      "Collect car rental listings, vehicle details, rental rates, availability, pickup locations, booking conditions and customer reviews. Turn publicly accessible rental data into structured insights with CompilePilot.",
    url: pageUrl,
    siteName: "CompilePilot",
    type: "website",
    images: [
      {
        url: "https://compilepilot.com/services/car-rental-data-scraping/car-rental-hero.png",
        width: 1200,
        height: 630,
        alt: "Car rental data scraping by CompilePilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Rental & Vehicle Rental Data Scraping | CompilePilot",
    description:
      "Track car rental prices, vehicle availability, rental conditions, locations and customer reviews with structured data from CompilePilot.",
    images: [
      "https://compilepilot.com/services/car-rental-data-scraping/car-rental-hero.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CarRentalDataScrapingPage() {
  return (
    <>
      <ServiceSchema
        pageUrl={pageUrl}
        pageName="Car Rental Data Scraping Services | CompilePilot"
        pageDescription="Extract car rental prices, vehicle availability, rental terms, locations and customer reviews from car rental websites. Get structured rental market data with CompilePilot."
        serviceName="Car Rental Data Scraping Services"
        serviceType="Car rental and vehicle rental data extraction"
        serviceDescription="Structured collection of publicly accessible car rental information, such as vehicle listings, rental rates, availability, pickup locations, rental conditions and customer reviews, subject to source permissions and applicable requirements."
      />
      <CarRentalClient />
    </>
  );
}
