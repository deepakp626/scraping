'use client';

import React from 'react';
import DatasetTemplate, {
  DataDictionaryGroup,
  SiblingDataset,
  FAQItem
} from '@/app/datasets/components/DatasetTemplate';
import {
  Package,
  TrendingUp,
  Star,
  Store,
  Layers,
  AlertCircle,
  Percent,
  Tag
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   SAMPLE DATA FOR PREVIEW TABS
───────────────────────────────────────────────────────────── */
const jsonSample = [
  {
    asin: "B08N5WRWNW",
    upc_ean: "0194252097038",
    sku: "APL-MBP-M1-256",
    product_name: "Apple MacBook Pro 13-inch (M1 Chip, 8GB RAM, 256GB SSD) - Space Gray",
    brand: "Apple",
    category_path: "Electronics > Computers & Tablets > Laptops > Traditional Laptops",
    marketplace: "amazon.com",
    currency: "USD",
    current_price: 1199.00,
    list_price: 1299.00,
    discount_percent: 7.7,
    availability_status: "In Stock",
    stock_quantity: 42,
    rating: 4.8,
    review_count: 18450,
    bsr_rank: 3,
    bsr_category: "Laptops",
    buy_box_winner: "Amazon.com Services LLC",
    seller_type: "1st Party (Amazon)",
    fulfillment: "FBA - Ships from Amazon",
    images: [
      "https://images.compilepilot.com/sample/mbp-front.jpg",
      "https://images.compilepilot.com/sample/mbp-side.jpg"
    ],
    last_updated: "2026-11-02T18:45:00Z"
  },
  {
    asin: "B09G9FPHP6",
    upc_ean: "0194252707241",
    sku: "APL-IPD-MINI-64",
    product_name: "Apple iPad mini (6th Generation, Wi-Fi, 64GB) - Starlight",
    brand: "Apple",
    category_path: "Electronics > Computers & Tablets > Tablets",
    marketplace: "amazon.com",
    currency: "USD",
    current_price: 469.00,
    list_price: 499.00,
    discount_percent: 6.0,
    availability_status: "In Stock",
    stock_quantity: 115,
    rating: 4.7,
    review_count: 9210,
    bsr_rank: 12,
    bsr_category: "Tablets",
    buy_box_winner: "Apple Authorized Reseller",
    seller_type: "3rd Party (Featured)",
    fulfillment: "FBA - Prime Eligible",
    images: [
      "https://images.compilepilot.com/sample/ipad-mini.jpg"
    ],
    last_updated: "2026-11-02T19:10:00Z"
  }
];

const csvSample = `asin,upc_ean,sku,product_name,brand,category_path,marketplace,currency,current_price,list_price,discount_percent,availability_status,rating,review_count,bsr_rank,buy_box_winner
B08N5WRWNW,0194252097038,APL-MBP-M1-256,"Apple MacBook Pro 13-inch (M1, 256GB)",Apple,"Electronics > Laptops",amazon.com,USD,1199.00,1299.00,7.7,In Stock,4.8,18450,3,"Amazon.com Services LLC"
B09G9FPHP6,0194252707241,APL-IPD-MINI-64,"Apple iPad mini (6th Gen, 64GB)",Apple,"Electronics > Tablets",amazon.com,USD,469.00,499.00,6.0,In Stock,4.7,9210,12,"Apple Authorized Reseller"
B0BDHWDR12,0194253398417,APL-WCH-S8-41,"Apple Watch Series 8 GPS 41mm",Apple,"Electronics > Wearables",amazon.com,USD,329.00,399.00,17.5,In Stock,4.9,7890,5,"Amazon.com"`;

/* ─────────────────────────────────────────────────────────────
   DATA DICTIONARY ATTRIBUTE GROUPS
───────────────────────────────────────────────────────────── */
const attributeGroups: DataDictionaryGroup[] = [
  {
    title: "1. Core Identifiers & Taxonomy",
    desc: "Critical unique keys for catalog deduplication, SKU mapping, and cross-retailer product matching.",
    fields: [
      { name: "Product Title / Name", type: "String", desc: "Full official product listing title as rendered on retailer page" },
      { name: "ASIN / UPC / EAN / GTIN", type: "String", desc: "Universal product barcodes and marketplace standard identification codes" },
      { name: "Brand & Manufacturer", type: "String", desc: "Verified brand entity, parent brand, and manufacturing company name" },
      { name: "Category Breadcrumbs", type: "Array / Text", desc: "Full hierarchical department taxonomy (L1 > L2 > L3 > L4 category tree)" },
      { name: "Canonical URL", type: "String (URL)", desc: "Direct permanent URL pointing to the live listing page" }
    ]
  },
  {
    title: "2. Pricing, Discounts & Buy Box",
    desc: "Granular pricing intelligence for price-drop alerts, MAP monitoring, and competitor parity.",
    fields: [
      { name: "Current Selling Price", type: "Float / Numeric", desc: "Real-time active checkout price including active instant discounts" },
      { name: "List / MSRP Price", type: "Float / Numeric", desc: "Original strike-through benchmark price or manufacturer suggested retail price" },
      { name: "Discount Percentage", type: "Percentage", desc: "Computed savings percentage between MSRP and active sale price" },
      { name: "Currency Code", type: "ISO-4217", desc: "Normalized billing currency (USD, EUR, GBP, CAD, INR, etc.)" },
      { name: "Buy Box Winner", type: "String", desc: "Merchant/Seller currently winning the default 'Add to Cart' / Buy Box" }
    ]
  },
  {
    title: "3. Inventory & Availability Signals",
    desc: "Stock tracking and distribution insights across fulfillment channels.",
    fields: [
      { name: "Stock Status", type: "Enum", desc: "Status values: 'In Stock', 'Out of Stock', 'Backorder', or 'Pre-order'" },
      { name: "Quantity Remaining", type: "Integer (if public)", desc: "Inventory count displayed (e.g., 'Only 4 left in stock - order soon')" },
      { name: "Fulfillment Model", type: "String", desc: "Fulfillment method (FBA, Ships from Amazon, Walmart WFS, Merchant Fulfilled)" },
      { name: "Fast Shipping Badges", type: "Boolean / String", desc: "Prime, Walmart+, Next-Day delivery eligibility indicators" }
    ]
  },
  {
    title: "4. Ratings, Reviews & Social Proof",
    desc: "Sentiment data and popularity metrics for assortment ranking and market research.",
    fields: [
      { name: "Average Star Rating", type: "Float (1.0 - 5.0)", desc: "Normalized aggregate rating score calculated across customer reviews" },
      { name: "Total Review Count", type: "Integer", desc: "Total cumulative volume of customer reviews submitted for this SKU" },
      { name: "Best Seller Rank (BSR)", type: "Integer", desc: "Numeric sales velocity rank within parent and sub-categories" },
      { name: "Badges & Flags", type: "Array", desc: "Marketplace badges such as 'Best Seller', 'Amazon's Choice', or 'Over 1K bought past month'" }
    ]
  },
  {
    title: "5. Media, Specifications & Variants",
    desc: "Rich catalog assets and technical metadata for feed syndication and search engines.",
    fields: [
      { name: "High-Res Image URLs", type: "Array (URLs)", desc: "Direct links to full-resolution main image and supplementary angle shots" },
      { name: "Color & Size Variants", type: "Object / Array", desc: "Linked sibling SKU variations including color, size, pack counts, and style" },
      { name: "Technical Specifications", type: "Key-Value Pairs", desc: "Structured attribute table (dimensions, weight, model year, voltage, material)" },
      { name: "Product Bullet Points", type: "Array (Strings)", desc: "Key feature highlights and promotional bullets provided by the seller" }
    ]
  },
  {
    title: "6. Seller & Merchant Intelligence",
    desc: "Marketplace seller ecosystem analysis and competitor merchant profiling.",
    fields: [
      { name: "Merchant / Seller Name", type: "String", desc: "Trading entity or company name operating the storefront" },
      { name: "Seller Feedback Rating", type: "Float & Count", desc: "Merchant lifetime feedback percentage and positive review ratio" },
      { name: "Merchant Origin / Country", type: "ISO Country", desc: "Registered physical address and country of operation for the seller" },
      { name: "Number of Active Sellers", type: "Integer", desc: "Total count of competitive 3rd-party merchants offering the same ASIN/SKU" }
    ]
  }
];

/* ─────────────────────────────────────────────────────────────
   SIBLING DATASETS IN E-COMMERCE
───────────────────────────────────────────────────────────── */
const ecommerceDatasets: SiblingDataset[] = [
  {
    name: "Product Listings",
    slug: "/datasets/ecommerce/product-listings",
    desc: "Complete catalog specifications, ASINs, brand hierarchy, variants, and listing metadata.",
    icon: Package,
    badge: "Current Dataset",
    active: true
  },
  {
    name: "Pricing Data",
    slug: "/datasets/ecommerce/pricing-data",
    desc: "Historical & real-time pricing trends, MAP violations, strike-through rates, and Buy Box trackers.",
    icon: TrendingUp,
    badge: "Popular"
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
    q: "What information is included in the Product Listings Dataset?",
    a: "The dataset provides comprehensive product catalog intelligence across 45+ normalized attributes. Key fields include universal identifiers (ASIN, UPC, EAN, SKU), canonical product URLs, brand and manufacturer details, hierarchical category breadcrumbs (L1–L4 taxonomy), active pricing and strike-through MSRP, computed discount percentages, real-time stock availability, Buy Box winner details, fulfillment methods (FBA/WFS/Merchant Fulfilled), customer review counts, average star ratings, Best Seller Rank (BSR), high-resolution image URLs, and variant matrices (color, size, pack configurations)."
  },
  {
    q: "Which marketplaces are covered?",
    a: "We extract and maintain product listings across all major global retail marketplaces and shopping engines. Coverage includes Amazon (US, UK, DE, FR, JP, IN, CA, AU, and more), Walmart, eBay, Target, Best Buy, Home Depot, Wayfair, Flipkart, AliExpress, as well as direct-to-consumer storefronts powered by Shopify, WooCommerce, and Magento. Custom and regional marketplace targets can also be added upon request."
  },
  {
    q: "How frequently is the data updated?",
    a: "Update frequencies can be tailored to your use case: real-time streaming, hourly, daily, weekly, bi-weekly, or monthly automated deliveries. We also provide historical catalog snapshots on demand. For dynamic pricing, stock monitoring, and high-velocity categories, our continuous web scraping pipelines deliver fresh data feeds as often as required."
  },
  {
    q: "What file formats are available?",
    a: "Datasets are provided in clean, validated industry-standard formats including CSV, JSON, NDJSON (JSON Lines), Parquet, and Excel (XLSX). Data can be delivered via direct automated pipelines into AWS S3 buckets, Google Cloud Storage, Azure Blob, Snowflake, PostgreSQL, or accessed on demand through our secure REST API and webhook integrations."
  },
  {
    q: "Can I request custom product attributes?",
    a: "Yes. Every dataset can be fully customized to include specific attributes and metadata according to your business requirements. We support custom category filtering, brand whitelists/blacklists, geographic postal code / zip-code level scraping, seller footprint intelligence, custom rating/review thresholds, and specialized attribute mapping tailored to your internal database schema."
  },
  {
    q: "How can I access a sample dataset?",
    a: "You can access a free sample dataset immediately by clicking the 'Request Dataset Sample' button on this page or by submitting an inquiry through our contact form. Our data solutions team will provide a representative sample in your preferred format (CSV, JSON, or Parquet) covering your target marketplace and category so you can evaluate the schema and data quality."
  }
];

export default function ProductListingsClient() {
  return (
    <DatasetTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Datasets', href: '/datasets' },
        { label: 'E-commerce', href: '/datasets/ecommerce' },
        { label: 'Product Listings' }
      ]}
      hubBannerText="Datasets Discovery Hub: Browse verified catalog schemas, download samples, and explore cross-industry data feeds."
      hubServiceLink="/services/ecommerce-data-scraping"
      hubServiceLinkLabel="Custom Scraping Services"
      badgeText="Verified E-commerce Dataset"
      badgeSubtext="500M+ Products Normalized"
      title="E-commerce Product Listings Datasets & Global Catalog Intelligence"
      description="Welcome to CompilePilot's E-commerce Product Listings Discovery Hub. Access structured, high-accuracy product listing datasets aggregated across the world's leading retail marketplaces—including Amazon, Walmart, eBay, Target, and custom merchant storefronts. Obtain enriched product attributes, universal barcodes (ASIN, UPC, EAN), active pricing, stock states, and comprehensive category taxonomies ready for analytics, price benchmarking, and AI ingestion."
      featurePoints={[
        "99.8% Field Precision",
        "50+ Retail Platforms",
        "CSV, JSON & Parquet",
        "Daily / Weekly Updates",
        "Direct Cloud Delivery",
        "Custom Geo Targeting"
      ]}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/ecommerce-data-scraping"
      customPipelineLabel="Need Custom Scraping Pipeline?"
      overviewCardTitle="Product Listings Feed"
      liveBadgeText="Live Feed"
      stats={[
        { label: "Catalog Size", value: "500M+", subtext: "SKUs indexed" },
        { label: "Attributes / SKU", value: "45+", subtext: "Normalized fields" },
        { label: "Update Cadence", value: "Hourly+", subtext: "Custom schedules" },
        { label: "Coverage", value: "50+", subtext: "Countries supported" }
      ]}
      metadataItems={[
        { label: "File Formats", value: "CSV, JSON, NDJSON, Parquet" },
        { label: "Delivery Channels", value: "S3, GCS, SFTP, Snowflake, API" },
        { label: "Compliance", value: "100% Ethical Public Web Data", isHighlight: true }
      ]}
      specialistCtaLabel="Talk to a Data Specialist"
      specialistCtaLink="/contact"
      sampleSectionOverline="Live Data Sample"
      sampleSectionTitle="Explore the E-commerce Product Listings Schema"
      sampleSectionDescription="Review actual structured records delivered in our dataset. Every field is cleaned, typed, and normalized for direct loading into your business intelligence tools or ML pipelines."
      jsonSample={jsonSample}
      csvSample={csvSample}
      jsonFilename="ecommerce_product_listings_sample.json"
      csvFilename="ecommerce_product_listings_sample.csv"
      sampleRecordCount="2 / 500M+ Records"
      dictionarySectionOverline="Data Dictionary"
      dictionarySectionTitle="Available Data Points & Field Specifications"
      dictionarySectionDescription="Every e-commerce listing contains deep attributes parsed, validated, and normalized for instant analysis. You can request all fields or a tailored subset matching your schema."
      attributeGroups={attributeGroups}
      siblingCategoryOverline="E-Commerce Category"
      siblingSectionTitle="More E-commerce Datasets"
      siblingSectionDescription="Complement your product listing intelligence with specialized e-commerce datasets targeting reviews, historical pricing, seller profiles, and inventory velocity."
      siblingViewAllLink="/datasets/ecommerce"
      siblingViewAllLabel="View All E-commerce Datasets"
      siblingDatasets={ecommerceDatasets}
      showExploreMore={true}
      faqSectionOverline="Questions & Answers"
      faqSectionTitle="Frequently Asked Questions"
      faqSectionDescription="Learn more about our data collection methodology, licensing, accuracy guarantees, and delivery pipelines."
      faqs={faqs}
    />
  );
}
