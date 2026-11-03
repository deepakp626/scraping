'use client';

import React from 'react';
import DatasetTemplate, {
  DataDictionaryGroup,
  SiblingDataset,
  FAQItem
} from '@/app/datasets/components/DatasetTemplate';
import {
  TrendingUp,
  Package,
  Star,
  Store,
  Layers,
  AlertCircle,
  Percent,
  Tag
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   SAMPLE DATA FOR PREVIEW TABS (PRICING DATASET)
───────────────────────────────────────────────────────────── */
const jsonSample = [
  {
    asin: "B09XS7JWHH",
    sku: "SNY-WH1000XM5-BLK",
    product_name: "Sony WH-1000XM5 Wireless Noise-Canceling Headphones - Black",
    brand: "Sony",
    category_path: "Electronics > Audio > Headphones > Over-Ear Headphones",
    marketplace: "amazon.com",
    currency: "USD",
    current_price: 348.00,
    list_price: 399.99,
    map_price: 349.99,
    map_violation: true,
    discount_percent: 13.0,
    coupon_discount: 0.00,
    price_change_7d_percent: -12.5,
    historic_30d_avg_price: 389.50,
    all_time_low_price: 328.00,
    all_time_high_price: 399.99,
    buy_box_winner: "Amazon.com Services LLC",
    buy_box_price: 348.00,
    seller_type: "1st Party (Amazon)",
    competing_offers_count: 14,
    lowest_3p_price: 345.50,
    shipping_cost: 0.00,
    deal_type: "Limited Time Deal",
    last_updated: "2026-11-03T18:45:00Z"
  },
  {
    asin: "B0979P6V28",
    sku: "DYS-V15-DET-YEL",
    product_name: "Dyson V15 Detect Cordless Vacuum Cleaner - Yellow/Iron",
    brand: "Dyson",
    category_path: "Home & Kitchen > Vacuums & Floor Care > Stick Vacuums",
    marketplace: "walmart.com",
    currency: "USD",
    current_price: 649.99,
    list_price: 749.99,
    map_price: 649.99,
    map_violation: false,
    discount_percent: 13.3,
    coupon_discount: 25.00,
    price_change_7d_percent: 0.0,
    historic_30d_avg_price: 699.99,
    all_time_low_price: 599.99,
    all_time_high_price: 749.99,
    buy_box_winner: "Dyson Official Store",
    buy_box_price: 649.99,
    seller_type: "Brand Direct",
    competing_offers_count: 8,
    lowest_3p_price: 639.00,
    shipping_cost: 0.00,
    deal_type: "Rollback",
    last_updated: "2026-11-03T19:10:00Z"
  }
];

const csvSample = `asin,sku,product_name,brand,marketplace,currency,current_price,list_price,map_price,map_violation,discount_percent,historic_30d_avg,buy_box_winner,buy_box_price,competing_offers,deal_type
B09XS7JWHH,SNY-WH1000XM5-BLK,"Sony WH-1000XM5 Wireless Headphones",Sony,amazon.com,USD,348.00,399.99,349.99,true,13.0,389.50,"Amazon.com Services LLC",348.00,14,"Limited Time Deal"
B0979P6V28,DYS-V15-DET-YEL,"Dyson V15 Detect Cordless Vacuum",Dyson,walmart.com,USD,649.99,749.99,649.99,false,13.3,699.99,"Dyson Official Store",649.99,8,"Rollback"
B0BDHWDR12,APL-WCH-S8-41,"Apple Watch Series 8 GPS 41mm",Apple,target.com,USD,329.00,399.00,329.00,false,17.5,379.00,"Target Stores",329.00,6,"Target Circle Deal"`;

/* ─────────────────────────────────────────────────────────────
   DATA DICTIONARY ATTRIBUTE GROUPS
───────────────────────────────────────────────────────────── */
const attributeGroups: DataDictionaryGroup[] = [
  {
    title: "1. Core Identifiers & Hierarchy",
    desc: "Cross-retailer mapping keys to harmonize SKU matching and competitor price tracking.",
    fields: [
      { name: "Product Title / Name", type: "String", desc: "Normalized product listing title as rendered across shopping platforms" },
      { name: "ASIN / UPC / EAN / GTIN", type: "String", desc: "Global barcode standards and unique marketplace identifiers" },
      { name: "SKU / Part Number", type: "String", desc: "Manufacturer part number (MPN) or merchant stock keeping unit" },
      { name: "Brand & Manufacturer", type: "String", desc: "Parent brand name, sub-brand, and verified manufacturer entity" },
      { name: "Product Listing URL", type: "String (URL)", desc: "Direct canonical link to the live item page on the marketplace" }
    ]
  },
  {
    title: "2. Real-Time Price Points",
    desc: "Granular live pricing feeds captured across checkout, cart, and product display pages.",
    fields: [
      { name: "Current Active Price", type: "Float / Numeric", desc: "Real-time active selling price displayed to standard shoppers" },
      { name: "List / MSRP Price", type: "Float / Numeric", desc: "Manufacturer suggested retail benchmark or strike-through anchor price" },
      { name: "Discount Percentage", type: "Percentage", desc: "Calculated savings percentage between original MSRP and current price" },
      { name: "Currency Code", type: "ISO-4217", desc: "Normalized billing currency (USD, EUR, GBP, CAD, INR, JPY, etc.)" },
      { name: "Shipping & Handling Fee", type: "Float / Numeric", desc: "Estimated standard domestic delivery surcharge or 'Free Delivery' flag" }
    ]
  },
  {
    title: "3. Promotions, Deals & Coupons",
    desc: "Promotional badge captures, clipped digital coupons, and temporary sale pricing.",
    fields: [
      { name: "Coupon Value / Discount", type: "Float / Numeric", desc: "Value of clip-and-save digital coupons (e.g., '$20 off coupon' or '5% off')" },
      { name: "Deal & Promotion Type", type: "Enum / String", desc: "Lightning Deal, Deal of the Day, Prime Exclusive, Rollback, or Clearance" },
      { name: "Effective Final Checkout Price", type: "Float / Numeric", desc: "Net calculated price incorporating active instant coupons and promo codes" },
      { name: "Promotion Expiry Timestamp", type: "ISO-8601", desc: "Scheduled expiration countdown or time limit for limited-time offers" }
    ]
  },
  {
    title: "4. Historical Price Trends & Elasticity",
    desc: "Longitudinal price changes and volatility index for algorithmic repricing and forecasting.",
    fields: [
      { name: "7-Day / 30-Day Price Delta", type: "Percentage", desc: "Percentage change comparing current price against 7-day and 30-day averages" },
      { name: "30-Day Moving Average", type: "Float / Numeric", desc: "Mean price calculated over the trailing 30 calendar days" },
      { name: "All-Time Lowest Price", type: "Float & Date", desc: "Lowest historic price recorded across tracking history with timestamp" },
      { name: "All-Time Highest Price", type: "Float & Date", desc: "Peak historic price recorded across tracking history with timestamp" },
      { name: "Price Volatility Score", type: "Float (0.0 - 1.0)", desc: "Normalized frequency and amplitude metric of price fluctuations" }
    ]
  },
  {
    title: "5. Buy Box & Competitive Dynamics",
    desc: "Merchant ownership, Buy Box rotation frequencies, and competing seller landscapes.",
    fields: [
      { name: "Buy Box Winner Name", type: "String", desc: "Merchant or trading entity currently winning the primary 'Add to Cart' button" },
      { name: "Buy Box Winner Price", type: "Float / Numeric", desc: "Exact active price offered by the winning Buy Box seller" },
      { name: "Fulfillment Channel", type: "String", desc: "Fulfillment model (FBA, Walmart WFS, Merchant Fulfilled, Direct Brand)" },
      { name: "Total Competing Sellers", type: "Integer", desc: "Count of alternative 3rd-party merchants offering the identical SKU" },
      { name: "Lowest Competing Offer", type: "Float / Numeric", desc: "Minimum price offered by any verified seller across all condition grades" }
    ]
  },
  {
    title: "6. MAP Compliance & Price Violations",
    desc: "Automated brand protection telemetry to safeguard Minimum Advertised Price agreements.",
    fields: [
      { name: "Manufacturer MAP Benchmark", type: "Float / Numeric", desc: "Contractual minimum advertised price specified by the manufacturer" },
      { name: "MAP Violation Status", type: "Boolean", desc: "Flags true whenever live selling price drops below contractual MAP threshold" },
      { name: "Violation Variance Margin", type: "Float / Numeric", desc: "Exact dollar or currency deviation below the agreed MAP benchmark" },
      { name: "Unauthorized Seller Flag", type: "Boolean", desc: "Highlights 3rd-party sellers not present on authorized distributor lists" },
      { name: "Detection Timestamp", type: "ISO-8601", desc: "Precise UTC timestamp when violation was detected and archived with proof" }
    ]
  }
];

/* ─────────────────────────────────────────────────────────────
   SIBLING DATASETS IN E-COMMERCE
───────────────────────────────────────────────────────────── */
const ecommerceDatasets: SiblingDataset[] = [
  {
    name: "Pricing Data",
    slug: "/datasets/ecommerce/pricing-data",
    desc: "Historical & real-time pricing trends, MAP violations, strike-through rates, and Buy Box trackers.",
    icon: TrendingUp,
    badge: "Current Dataset",
    active: true
  },
  {
    name: "Product Listings",
    slug: "/datasets/ecommerce/product-listings",
    desc: "Complete catalog specifications, ASINs, brand hierarchy, variants, and listing metadata.",
    icon: Package,
    badge: "Catalog Hub"
  },
  {
    name: "Reviews & Ratings",
    slug: "/datasets/ecommerce/reviews-ratings",
    desc: "Customer review sentiments, verified purchase badges, review body text, and star breakdowns.",
    icon: Star,
    badge: "High Volume"
  },
  {
    name: "Seller Profiles",
    slug: "/datasets/ecommerce/seller-profiles",
    desc: "Storefront details, 3P seller directories, ratings, inventory footprint, and merchant contact links.",
    icon: Store,
    badge: "Intelligence"
  },
  {
    name: "Category Taxonomy",
    slug: "/datasets/ecommerce/category-taxonomy",
    desc: "Hierarchical category tree mapping, department categorization, and breadcrumb structures.",
    icon: Layers,
    badge: "Catalog"
  },
  {
    name: "Stock Availability",
    slug: "/datasets/ecommerce/stock-availability",
    desc: "Out-of-stock frequency, lead times, replenishment intervals, and warehouse fulfillment metrics.",
    icon: AlertCircle,
    badge: "Supply Chain"
  },
  {
    name: "Discounts & Offers",
    slug: "/datasets/ecommerce/discounts-offers",
    desc: "Lightning deals, coupon codes, promotional banners, bundle markdowns, and flash sales.",
    icon: Percent,
    badge: "Promotions"
  },
  {
    name: "Brand Intelligence",
    slug: "/datasets/ecommerce/brand-intelligence",
    desc: "Share of voice, digital shelf placement, sponsored brand ad capture, and assortment benchmarks.",
    icon: Tag,
    badge: "Strategy"
  }
];

/* ─────────────────────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────────────────────── */
const faqs: FAQItem[] = [
  {
    q: "What information is included in the E-commerce Pricing Dataset?",
    a: "The dataset includes real-time selling prices, list / MSRP anchor prices, digital clip coupons, promotional deal types (Lightning Deals, Rollbacks), 7-day and 30-day price trends, all-time historic high and low benchmarks, currency codes, Buy Box winner details, competing 3rd-party offer counts, and automated MAP violation flags across 50+ normalized fields."
  },
  {
    q: "How frequently is pricing data refreshed and updated?",
    a: "We support flexible cadences based on market volatility: continuous sub-hourly streaming (every 15 to 60 minutes), daily batch feeds, weekly historical summaries, or custom scheduled snapshots. For fast-changing electronics, fashion, and grocery categories, our streaming scrapers ensure near real-time price change alerts."
  },
  {
    q: "Can I use this dataset to detect MAP violations and unauthorized sellers?",
    a: "Yes. Every record can be cross-referenced against your brand's Minimum Advertised Price (MAP) thresholds. The dataset flags violations, calculates the exact discount margin below MAP, identifies unauthorized 3rd-party sellers, and captures timestamped screenshots or page snapshots for legal and brand compliance enforcement."
  },
  {
    q: "How is historical pricing data structured and stored?",
    a: "Historical data is organized as longitudinal time-series records. Each record pairs canonical SKU/ASIN identifiers with exact timestamped price observations, Buy Box ownership changes, and discount deltas. You can analyze 30-day, 90-day, or multi-year pricing trends for price elasticity models and machine learning forecasting."
  },
  {
    q: "What file formats and cloud delivery channels are supported?",
    a: "Datasets are provided in clean, validated industry-standard formats including CSV, JSON, NDJSON (JSON Lines), and Apache Parquet. We support direct automated sync into AWS S3 buckets, Google Cloud Storage, Snowflake, Databricks, PostgreSQL, or streaming via Kafka and secure REST APIs."
  },
  {
    q: "How can I access a sample pricing dataset for my category?",
    a: "You can request a free sample pricing dataset by clicking the 'Request Dataset Sample' button on this page or by submitting an inquiry through our contact form. Our data engineering team will deliver a representative time-series sample covering your target marketplaces and product categories within 24 hours."
  }
];

export default function PricingDataClient() {
  return (
    <DatasetTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Datasets', href: '/datasets' },
        { label: 'E-commerce', href: '/datasets/ecommerce' },
        { label: 'Pricing Data' }
      ]}
      hubBannerText="Datasets Discovery Hub: Browse verified pricing schemas, historical time-series data, and cross-channel competitor feeds."
      hubServiceLink="/services/ecommerce-data-scraping"
      hubServiceLinkLabel="Custom Scraping Services"
      badgeText="Verified Pricing Dataset"
      badgeSubtext="1.2B+ Price Observations Recorded"
      title="E-commerce Pricing Datasets & Real-Time Price Intelligence"
      description="Access comprehensive real-time and historical e-commerce pricing datasets aggregated across Amazon, Walmart, Target, eBay, and 50+ global retail channels. Track active checkout prices, strike-through MSRPs, digital coupon clips, Buy Box rotations, and MAP violation telemetry engineered for automated dynamic repricing, market intelligence, and predictive retail analytics."
      featurePoints={[
        "99.9% Price Accuracy",
        "Sub-Hourly Update Cadence",
        "MAP Violation Telemetry",
        "5+ Years Price History",
        "Buy Box Winner Tracking",
        "Multi-Currency Normalization"
      ]}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/ecommerce-data-scraping"
      customPipelineLabel="Need Custom Pricing Scraper?"
      overviewCardTitle="Pricing Intelligence Feed"
      liveBadgeText="Live Price Feed"
      stats={[
        { label: "Price Points", value: "1.2B+", subtext: "Observations recorded" },
        { label: "Update Speed", value: "15 Min+", subtext: "High-frequency tracking" },
        { label: "Coverage", value: "50+", subtext: "Retail marketplaces" },
        { label: "History Depth", value: "5+ Years", subtext: "Clean time-series logs" }
      ]}
      metadataItems={[
        { label: "File Formats", value: "CSV, JSON, NDJSON, Parquet" },
        { label: "Delivery Channels", value: "S3, Snowflake, BigQuery, Kafka, API" },
        { label: "Compliance", value: "100% Ethical Public Web Data", isHighlight: true }
      ]}
      specialistCtaLabel="Talk to a Pricing Specialist"
      specialistCtaLink="/contact"
      sampleSectionOverline="Live Pricing Sample"
      sampleSectionTitle="Explore the E-commerce Pricing Schema"
      sampleSectionDescription="Inspect actual time-series pricing observations delivered in our feeds. Every field is verified, timestamped, and typed for seamless ingestion into your business intelligence tools, repricing algorithms, or econometric models."
      jsonSample={jsonSample}
      csvSample={csvSample}
      jsonFilename="ecommerce_pricing_intelligence_sample.json"
      csvFilename="ecommerce_pricing_intelligence_sample.csv"
      sampleRecordCount="2 / 1.2B+ Observations"
      dictionarySectionOverline="Data Dictionary"
      dictionarySectionTitle="Available Pricing Attributes & Field Specifications"
      dictionarySectionDescription="Every pricing record provides deep competitive telemetry—from active selling prices and instant coupon discounts to Buy Box winners, MAP violations, and rolling 30-day moving averages."
      attributeGroups={attributeGroups}
      siblingCategoryOverline="E-Commerce Category"
      siblingSectionTitle="More E-commerce Datasets"
      siblingSectionDescription="Combine pricing intelligence with full catalog specifications, seller profiles, inventory velocity, and customer sentiment reviews."
      siblingViewAllLink="/datasets/ecommerce"
      siblingViewAllLabel="View All E-commerce Datasets"
      siblingDatasets={ecommerceDatasets}
      showExploreMore={true}
      faqSectionOverline="Questions & Answers"
      faqSectionTitle="Frequently Asked Questions"
      faqSectionDescription="Learn more about our price collection methodology, time-series archiving, MAP violation detection, and high-frequency delivery options."
      faqs={faqs}
    />
  );
}

