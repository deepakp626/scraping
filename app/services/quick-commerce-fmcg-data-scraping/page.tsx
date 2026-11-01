import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import FmcgClient from "./FmcgClient";

const pageUrl =
  "https://compilepilot.com/services/quick-commerce-fmcg-data-scraping";

export const metadata: Metadata = {
  title: "FMCG & Quick Commerce Data Scraping | CompilePilot",
  description:
    "Track FMCG product rankings, share of search, retail media placements, competitor prices, reviews and availability across retail and quick-commerce platforms.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "FMCG & Quick Commerce Data Scraping | CompilePilot",
    description:
      "Monitor FMCG digital shelf performance across retail and quick-commerce platforms. Track product visibility, sponsored placements, competitor pricing, promotions and reviews with structured data from CompilePilot.",
    url: pageUrl,
    siteName: "CompilePilot",
    type: "website",
    images: [
      {
        url: "https://compilepilot.com/services/quick-commerce-fmcg-data-scraping/fmcg-hero.png",
        width: 1200,
        height: 630,
        alt: "FMCG and quick-commerce data scraping by CompilePilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FMCG & Quick Commerce Data Scraping | CompilePilot",
    description:
      "Track FMCG visibility, retail media placements, competitor pricing, promotions and product availability across retail and quick-commerce platforms.",
    images: [
      "https://compilepilot.com/services/quick-commerce-fmcg-data-scraping/fmcg-hero.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function QuickCommerceFmcgDataScrapingPage() {
  return (
    <>
      <ServiceSchema
        pageUrl={pageUrl}
        pageName="FMCG & Quick Commerce Data Scraping | CompilePilot"
        pageDescription="Track FMCG product rankings, share of search, retail media placements, competitor prices, reviews and availability across retail and quick-commerce platforms."
        serviceName="FMCG & Quick Commerce Data Scraping"
        serviceType="FMCG, CPG and quick-commerce data extraction"
        serviceDescription="Structured collection of publicly accessible retail and quick-commerce product, pricing, availability, search visibility, sponsored placement and review data, subject to source permissions and applicable requirements."
      />
      <FmcgClient />
    </>
  );
}
