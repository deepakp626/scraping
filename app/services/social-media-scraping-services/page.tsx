import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import SocialMediaClient from "./SocialMediaClient";

const pageUrl =
  "https://compilepilot.com/services/social-media-scraping-services";

export const metadata: Metadata = {
  title: "Social Media Data Scraping Services | CompilePilot",
  description:
    "Collect publicly available social media posts, hashtags, engagement metrics and trend data for research and brand monitoring. Get structured datasets with CompilePilot.",
  keywords: [
    "social media data scraping",
    "social media scraping services",
    "social data extraction",
    "scrape social media posts",
    "hashtag tracking",
    "social media sentiment analysis",
    "engagement metrics scraping",
    "public social media data",
    "social listening datasets",
    "influencer tracking data",
    "CompilePilot",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Social Media Data Scraping & Public Data Insights | CompilePilot",
    description:
      "Organize publicly accessible social media posts, hashtags, engagement indicators, topics and trend signals into structured datasets for research, brand monitoring and market analysis with CompilePilot.",
    url: pageUrl,
    siteName: "CompilePilot",
    type: "website",
    images: [
      {
        url: "https://compilepilot.com/services/social-media-scraping-services/social-media-hero.svg",
        width: 1200,
        height: 630,
        alt: "Social Media Scraping Services by CompilePilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Media Data Scraping Services | CompilePilot",
    description:
      "Analyze public posts, hashtags, engagement indicators and emerging topics with structured social media datasets from CompilePilot.",
    images: [
      "https://compilepilot.com/services/social-media-scraping-services/social-media-hero.svg",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SocialMediaScrapingServicesPage() {
  return (
    <>
      <ServiceSchema
        pageUrl={pageUrl}
        pageName="Social Media Data Scraping Services | CompilePilot"
        pageDescription="Collect publicly available social media posts, hashtags, engagement metrics and trend data for research and brand monitoring. Get structured datasets with CompilePilot."
        serviceName="Social Media Data Scraping Services"
        serviceType="Public social media content and trend data extraction"
        serviceDescription="Structured collection of publicly accessible social media content and aggregate indicators, such as public posts, hashtags, topics and engagement counts, subject to platform terms, source permissions, privacy obligations and applicable requirements."
      />
      <SocialMediaClient />
    </>
  );
}
