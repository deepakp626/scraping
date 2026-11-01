import type { Metadata } from "next";
import ServiceSchema from "../components/ServiceSchema";
import FinanceStockClient from "./FinanceStockClient";

const pageUrl = "https://compilepilot.com/services/finance-and-stock-scraping";

export const metadata: Metadata = {
  title: "Financial & Stock Data Scraping Services | CompilePilot",
  description:
    "Extract stock prices, market data, company fundamentals, earnings, analyst ratings and financial filings. Get clean, structured financial datasets with CompilePilot.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Financial Market & Stock Data Scraping | CompilePilot",
    description:
      "Collect stock quotes, trading volumes, company fundamentals, earnings data, analyst ratings, corporate actions and ETF holdings. Turn accessible financial information into structured datasets with CompilePilot.",
    url: pageUrl,
    siteName: "CompilePilot",
    type: "website",
    images: [
      {
        url: "https://compilepilot.com/services/finance-and-stock-scraping/finance-stock-hero.png",
        width: 1200,
        height: 630,
        alt: "Financial market and stock data scraping by CompilePilot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Market & Stock Data Scraping | CompilePilot",
    description:
      "Collect stock prices, company fundamentals, earnings, analyst ratings and financial filings with structured market data from CompilePilot.",
    images: [
      "https://compilepilot.com/services/finance-and-stock-scraping/finance-stock-hero.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FinanceAndStockScrapingPage() {
  return (
    <>
      <ServiceSchema
        pageUrl={pageUrl}
        pageName="Financial & Stock Data Scraping Services | CompilePilot"
        pageDescription="Extract stock prices, market data, company fundamentals, earnings, analyst ratings and financial filings. Get clean, structured financial datasets with CompilePilot."
        serviceName="Financial Market & Stock Data Scraping"
        serviceType="Financial market and stock data extraction"
        serviceDescription="Structured collection of accessible market quotes, trading volumes, company fundamentals, earnings information, analyst ratings, corporate actions, regulatory filings and ETF holdings, subject to source permissions and applicable requirements."
      />
      <FinanceStockClient />
    </>
  );
}
