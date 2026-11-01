import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import HealthcareClient from "./HealthcareClient";

const pageUrl = "https://compilepilot.com/services/healthcare-data-scraping";

export const metadata: Metadata = {
  title: "Healthcare & Pharma Data Scraping Services | CompilePilot",
  description:
    "Extract public provider listings, pharma prices, FDA updates, clinical trial records and medical research data. Get structured healthcare insights with CompilePilot.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Healthcare & Pharmaceutical Data Scraping | CompilePilot",
    description:
      "Collect publicly accessible healthcare and pharma information, including provider directories, drug pricing, FDA approvals, recalls, clinical trial records and medical research publications. Turn complex sources into structured data with CompilePilot.",
    url: pageUrl,
    siteName: "CompilePilot",
    type: "website",
    images: [
      {
        url: "https://compilepilot.com/services/healthcare-data-scraping/healthcare-hero.png",
        width: 1200,
        height: 630,
        alt: "Healthcare and pharmaceutical data scraping by CompilePilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare & Pharma Data Scraping Services | CompilePilot",
    description:
      "Track public provider listings, pharmaceutical pricing, FDA updates, clinical trials and medical research with structured data from CompilePilot.",
    images: [
      "https://compilepilot.com/services/healthcare-data-scraping/healthcare-hero.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HealthcareDataScrapingPage() {
  return (
    <>
      <ServiceSchema
        pageUrl={pageUrl}
        pageName="Healthcare & Pharma Data Scraping Services | CompilePilot"
        pageDescription="Extract public provider listings, pharma prices, FDA updates, clinical trial records and medical research data. Get structured healthcare insights with CompilePilot."
        serviceName="Healthcare & Pharma Data Scraping Services"
        serviceType="Healthcare, pharmaceutical and medical research data extraction"
        serviceDescription="Structured collection of publicly accessible professional provider listings, pharmaceutical pricing information, regulatory updates, clinical trial registry records and medical research publication metadata, subject to source permissions and applicable privacy requirements. Patient records and protected health information are excluded."
      />
      <HealthcareClient />
    </>
  );
}
