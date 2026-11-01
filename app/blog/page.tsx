import type { Metadata } from "next";
import BlogSchema from "@/app/components/blog-schema";
import BlogClient from "./BlogClient";

const pageUrl = "https://compilepilot.com/blog";

export const metadata: Metadata = {
  title: "Web Scraping Blog & Data Extraction Insights | CompilePilot",
  description:
    "Explore CompilePilot's blog for web scraping insights, data extraction guides, web data collection techniques, and practical tips for businesses and researchers.",
  keywords: [
    "web scraping blog",
    "data extraction guides",
    "web data collection",
    "web scraping tutorials",
    "data scraping tips",
    "scraping best practices",
    "data extraction techniques",
    "web scraping for business",
    "CompilePilot blog",
    "CompilePilot",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    type: "website",
    url: pageUrl,
    siteName: "CompilePilot",
    title: "Web Scraping & Data Extraction Insights | CompilePilot",
    description:
      "Explore insights and practical guides on web scraping, data extraction, and collecting publicly available web data for business, research, and data-driven projects.",
    images: [
      {
        url: "https://compilepilot.com/images/datasets/dataset-hero.png",
        width: 1200,
        height: 630,
        alt: "CompilePilot Blog - Web Scraping and Data Extraction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Scraping & Data Extraction Insights | CompilePilot",
    description:
      "Explore insights and practical guides on web scraping, data extraction, and collecting publicly available web data for business, research, and data-driven projects.",
    images: ["https://compilepilot.com/images/datasets/dataset-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogPage() {
  return (
    <>
      <BlogSchema />
      <BlogClient />
    </>
  );
}
