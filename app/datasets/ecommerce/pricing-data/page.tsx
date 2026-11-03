import type { Metadata } from "next";
import PricingDataClient from "./PricingDataClient";

export const metadata: Metadata = {
  title: "E-commerce Pricing Dataset | Historical Price Intelligence & MAP Tracking",
  description:
    "Access verified real-time and historical e-commerce pricing datasets across Amazon, Walmart, Target, eBay, and 50+ global retail channels. Track active prices, MSRP, discounts, Buy Box winners, and MAP violation telemetry.",
  keywords: [
    "ecommerce pricing dataset",
    "historical price tracking data",
    "competitor pricing intelligence",
    "amazon price history dataset",
    "walmart pricing data",
    "map violation monitoring data",
    "buy box tracker dataset",
    "dynamic repricing feed",
    "retail price elasticity dataset",
    "CompilePilot datasets",
  ],
  alternates: {
    canonical: "https://compilepilot.com/datasets/ecommerce/pricing-data",
  },
  openGraph: {
    type: "website",
    url: "https://compilepilot.com/datasets/ecommerce/pricing-data",
    siteName: "CompilePilot",
    title: "E-commerce Pricing Dataset | Historical Price Intelligence | CompilePilot",
    description:
      "High-accuracy, verified e-commerce pricing datasets covering 1.2B+ price points across Amazon, Walmart, Target, and leading retail platforms. Delivered in CSV, JSON, or Parquet.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CompilePilot E-commerce Pricing Dataset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-commerce Pricing Dataset | CompilePilot",
    description:
      "Structured e-commerce pricing datasets covering 1.2B+ price observations across global retail marketplaces. Clean, timestamped, and delivered in CSV, JSON, or Parquet.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EcommercePricingDataPage() {
  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://compilepilot.com/datasets/ecommerce/pricing-data#webpage",
        url: "https://compilepilot.com/datasets/ecommerce/pricing-data",
        name: "E-commerce Pricing Dataset | Historical Price Intelligence & MAP Tracking",
        description:
          "Access verified real-time and historical e-commerce pricing datasets across Amazon, Walmart, Target, eBay, and 50+ global retail channels.",
        isPartOf: {
          "@id": "https://compilepilot.com/#website",
        },
        breadcrumb: {
          "@id": "https://compilepilot.com/datasets/ecommerce/pricing-data#breadcrumb",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://compilepilot.com/datasets/ecommerce/pricing-data#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://compilepilot.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Datasets",
            item: "https://compilepilot.com/datasets",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "E-commerce",
            item: "https://compilepilot.com/datasets/ecommerce",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Pricing Data",
            item: "https://compilepilot.com/datasets/ecommerce/pricing-data",
          },
        ],
      },
      {
        "@type": "Dataset",
        "@id": "https://compilepilot.com/datasets/ecommerce/pricing-data#dataset",
        name: "E-commerce Pricing & Historical Intelligence Dataset",
        description:
          "Longitudinal pricing dataset featuring over 1.2 billion price observations captured across Amazon, Walmart, Target, eBay, and global e-commerce platforms. Includes active checkout prices, MSRP benchmarks, discounts, coupon values, Buy Box rotations, rolling 30-day moving averages, and MAP violation status.",
        url: "https://compilepilot.com/datasets/ecommerce/pricing-data",
        keywords: [
          "ecommerce pricing dataset",
          "historical price tracking",
          "map violation monitoring",
          "buy box tracker",
          "competitor price intelligence",
        ],
        creator: {
          "@type": "Organization",
          name: "CompilePilot",
          url: "https://compilepilot.com",
        },
        distribution: [
          {
            "@type": "DataDownload",
            encodingFormat: "text/csv",
            contentUrl: "https://compilepilot.com/datasets/ecommerce/pricing-data",
          },
          {
            "@type": "DataDownload",
            encodingFormat: "application/json",
            contentUrl: "https://compilepilot.com/datasets/ecommerce/pricing-data",
          },
          {
            "@type": "DataDownload",
            encodingFormat: "application/x-parquet",
            contentUrl: "https://compilepilot.com/datasets/ecommerce/pricing-data",
          },
        ],
        variableMeasured: [
          "Current Active Price",
          "List / MSRP Benchmark",
          "Discount Percentage",
          "Coupon Discount Value",
          "MAP Price",
          "MAP Violation Flag",
          "Buy Box Winner",
          "Buy Box Price",
          "30-Day Moving Average",
          "All-Time Lowest Price",
          "All-Time Highest Price",
          "Price Change 7D Percent",
          "Competing Offers Count",
          "Lowest 3P Price",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://compilepilot.com/datasets/ecommerce/pricing-data#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "What information is included in the E-commerce Pricing Dataset?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The dataset includes real-time selling prices, list / MSRP anchor prices, digital clip coupons, promotional deal types (Lightning Deals, Rollbacks), 7-day and 30-day price trends, all-time historic high and low benchmarks, currency codes, Buy Box winner details, competing 3rd-party offer counts, and automated MAP violation flags across 50+ normalized fields.",
            },
          },
          {
            "@type": "Question",
            name: "How frequently is pricing data refreshed and updated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We support flexible cadences based on market volatility: continuous sub-hourly streaming (every 15 to 60 minutes), daily batch feeds, weekly historical summaries, or custom scheduled snapshots.",
            },
          },
          {
            "@type": "Question",
            name: "Can I use this dataset to detect MAP violations and unauthorized sellers?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Every record can be cross-referenced against your brand's Minimum Advertised Price (MAP) thresholds. The dataset flags violations, calculates the exact discount margin below MAP, identifies unauthorized 3rd-party sellers, and captures timestamped proof.",
            },
          },
          {
            "@type": "Question",
            name: "How is historical pricing data structured and stored?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Historical data is organized as longitudinal time-series records. Each record pairs canonical SKU/ASIN identifiers with exact timestamped price observations, Buy Box ownership changes, and discount deltas.",
            },
          },
          {
            "@type": "Question",
            name: "What file formats and cloud delivery channels are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Datasets are provided in clean, validated industry-standard formats including CSV, JSON, NDJSON (JSON Lines), and Apache Parquet, with automated delivery into AWS S3, Google Cloud Storage, Snowflake, Databricks, PostgreSQL, or REST APIs.",
            },
          },
          {
            "@type": "Question",
            name: "How can I access a sample pricing dataset for my category?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can request a free sample pricing dataset by clicking the 'Request Dataset Sample' button on this page or by submitting an inquiry through our contact form. Our data engineering team will deliver a representative time-series sample covering your target marketplaces.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(datasetJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PricingDataClient />
    </>
  );
}
