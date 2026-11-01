import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import RecruitmentClient from "./RecruitmentClient";

const pageUrl =
  "https://compilepilot.com/services/recruitment-data-scraping-service";

export const metadata: Metadata = {
  title: "Recruitment Data Scraping Services | CompilePilot",
  description:
    "Collect public job listings, salary ranges, skills, hiring trends and employer details. Get structured recruitment market data with CompilePilot.",
  keywords: [
    "recruitment data scraping",
    "job posting scraping",
    "job board data extraction",
    "salary data scraping",
    "hiring trends data",
    "workforce analytics data",
    "scrape job listings",
    "career portal scraping",
    "skills market data",
    "employer data extraction",
    "CompilePilot",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Recruitment & Job Market Data Scraping | CompilePilot",
    description:
      "Monitor public job vacancies, salary ranges, required skills, employer details, locations and hiring trends. Turn accessible recruitment data into structured workforce insights with CompilePilot.",
    url: pageUrl,
    siteName: "CompilePilot",
    type: "website",
    images: [
      {
        url: "https://compilepilot.com/services/recruitment-data-scraping-service/recruitment-hero.png",
        width: 1200,
        height: 630,
        alt: "Recruitment Data Scraping Service by CompilePilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruitment Data Scraping Services | CompilePilot",
    description:
      "Track public job listings, salary ranges, skills, employer details and hiring trends with structured recruitment data from CompilePilot.",
    images: [
      "https://compilepilot.com/services/recruitment-data-scraping-service/recruitment-hero.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RecruitmentScrapingPage() {
  return (
    <>
      <ServiceSchema
        pageUrl={pageUrl}
        pageName="Recruitment Data Scraping Services | CompilePilot"
        pageDescription="Collect public job listings, salary ranges, skills, hiring trends and employer details. Get structured recruitment market data with CompilePilot."
        serviceName="Recruitment Data Scraping Services"
        serviceType="Public job listing and recruitment market data extraction"
        serviceDescription="Structured collection of publicly accessible job listings, advertised salary ranges, job titles, skills, employer information, locations and hiring trend indicators, subject to source permissions and applicable privacy requirements."
      />
      <RecruitmentClient />
    </>
  );
}
