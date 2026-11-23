'use client';

import React from 'react';
import DatasetTemplate, {
  DataDictionaryGroup,
  SiblingDataset,
  FAQItem
} from '@/app/datasets/components/DatasetTemplate';
import {
  Percent,
  Package,
  TrendingUp,
  Star,
  Store,
  Layers,
  AlertCircle,
  Tag
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   SAMPLE DATA FOR PREVIEW TABS (DISCOUNTS & OFFERS)
───────────────────────────────────────────────────────────── */
const jsonSample = [
  {
    deal_id: "DEAL-AMZ-891042",
    asin: "B0B94T4S61",
    sku: "SAMS-TV-65-OLED",
    product_name: "SAMSUNG 65-Inch Class OLED 4K S90B Series Smart TV",
    brand: "SAMSUNG",
    marketplace: "amazon.com",
    original_list_price: 2599.99,
    deal_price: 1597.99,
    discount_amount: 1002.00,
    discount_percentage: 38.5,
    deal_type: "Lightning Deal",
    is_prime_exclusive: true,
    coupon_clipped_amount: 50.00,
    coupon_type: "Clip & Save Digital Voucher",
    final_effective_price: 1547.99,
    deal_start_time: "2026-11-03T12:00:00Z",
    deal_end_time: "2026-11-03T23:59:59Z",
    percentage_claimed: 78,
    is_limited_quantity: true,
    promotional_badges: ["Epic Daily Deal", "Prime Exclusive Savings"],
    seller_name: "Amazon.com Services LLC",
    last_deal_sync: "2026-11-03T18:40:00Z"
  },
  {
    deal_id: "DEAL-WMT-349012",
    asin: "B0912K87XZ",
    sku: "KEURIG-KSLIM-BLK",
    product_name: "Keurig K-Slim Single Serve Coffee Maker - Black",
    brand: "Keurig",
    marketplace: "walmart.com",
    original_list_price: 129.99,
    deal_price: 79.00,
    discount_amount: 50.99,
    discount_percentage: 39.2,
    deal_type: "Rollback",
    is_prime_exclusive: false,
    coupon_clipped_amount: 0.00,
    coupon_type: null,
    final_effective_price: 79.00,
    deal_start_time: "2026-11-01T00:00:00Z",
    deal_end_time: "2026-11-07T23:59:59Z",
    percentage_claimed: null,
    is_limited_quantity: false,
    promotional_badges: ["Rollback", "Popular Pick"],
    seller_name: "Walmart.com",
    last_deal_sync: "2026-11-03T18:45:00Z"
  }
];

const csvSample = `deal_id,asin,sku,brand,marketplace,list_price,deal_price,discount_percent,deal_type,coupon_value,final_price,claimed_percent,badges
DEAL-AMZ-891042,B0B94T4S61,SAMS-TV-65-OLED,SAMSUNG,amazon.com,2599.99,1597.99,38.5,"Lightning Deal",50.00,1547.99,78,"Prime Exclusive"
DEAL-WMT-349012,B0912K87XZ,KEURIG-KSLIM-BLK,Keurig,walmart.com,129.99,79.00,39.2,"Rollback",0.00,79.00,null,"Rollback"
DEAL-TGT-771290,B0BDHWDR12,APL-WCH-S8-41,Apple,target.com,399.00,329.00,17.5,"Target Circle Offer",20.00,309.00,null,"Target Circle 20% Off"`;

/* ─────────────────────────────────────────────────────────────
   DATA DICTIONARY ATTRIBUTE GROUPS
───────────────────────────────────────────────────────────── */
const attributeGroups: DataDictionaryGroup[] = [
  {
    title: "1. Promotion & Product Identification",
    desc: "Marketplace offer identifiers, catalog keys, and canonical promotional links.",
    fields: [
      { name: "Promotional Deal Token", type: "String", desc: "Unique deal session identifier assigned by marketplace" },
      { name: "Product Title / Name", type: "String", desc: "Full official product title associated with the promotional offer" },
      { name: "ASIN / UPC / EAN / GTIN", type: "String", desc: "Universal product barcodes and marketplace standard identifiers" },
      { name: "Brand & Manufacturer", type: "String", desc: "Parent brand name and manufacturing company" },
      { name: "Listing Offer URL", type: "String (URL)", desc: "Direct canonical link to the promotional deal product page" }
    ]
  },
  {
    title: "2. Pricing & Net Discount Metrics",
    desc: "Pre-deal benchmark prices, strike-through rates, and net percentage savings.",
    fields: [
      { name: "Original List / MSRP Price", type: "Float / Numeric", desc: "Pre-promotional reference price or strike-through MSRP" },
      { name: "Active Deal Sale Price", type: "Float / Numeric", desc: "Promotional selling price active during the deal window" },
      { name: "Net Dollar Savings ($)", type: "Float / Numeric", desc: "Total currency discount between original list price and deal price" },
      { name: "Discount Percentage (%)", type: "Percentage", desc: "Calculated savings percentage (e.g., '38.5% off')" },
      { name: "Effective Final Checkout Price", type: "Float / Numeric", desc: "Total price after factoring in additional clip-coupons and promo codes" }
    ]
  },
  {
    title: "3. Deal Classification & Promotion Types",
    desc: "Promotional taxonomy categorizing deal mechanics and buyer membership tiers.",
    fields: [
      { name: "Deal Type Classification", type: "Enum", desc: "Values: 'Lightning Deal', 'Deal of the Day', 'Rollback', 'Clearance', 'BOGO'" },
      { name: "Prime / Club Exclusive Flag", type: "Boolean", desc: "True if promotion requires paid membership (e.g., Prime, Walmart+, Target Circle)" },
      { name: "Bundle / Multi-Buy Offer", type: "String / Object", desc: "Details on multi-item bundle markdowns (e.g., 'Buy 2 Get 20% Off')" },
      { name: "Promotional Badges Array", type: "Array (Strings)", desc: "Marketplace badges such as 'Best Deal', 'Limited Time', 'Save 40%'" }
    ]
  },
  {
    title: "4. Digital Coupons & Voucher Incentives",
    desc: "Clip-and-save digital coupons, promo vouchers, and cart rebate incentives.",
    fields: [
      { name: "Coupon Clipped Dollar Value", type: "Float / Numeric", desc: "Fixed dollar reduction applied upon checking digital coupon box" },
      { name: "Coupon Percentage Value", type: "Percentage", desc: "Percentage discount applied at checkout via digital voucher" },
      { name: "Coupon Eligibility Criteria", type: "String", desc: "Minimum spend or quantity requirements (e.g., '$10 off orders over $50')" },
      { name: "Digital Coupon Code", type: "String (if public)", desc: "Promo voucher code required to unlock special discount" }
    ]
  },
  {
    title: "5. Temporal Windows & Deal Velocity",
    desc: "Promotion scheduling, time-remaining countdowns, and consumer claim rates.",
    fields: [
      { name: "Promotion Start Timestamp", type: "ISO-8601", desc: "Exact UTC date and time when deal became active" },
      { name: "Promotion End Timestamp", type: "ISO-8601", desc: "Scheduled expiration timestamp when deal reverts to standard price" },
      { name: "Percentage Claimed Progress", type: "Integer (0 - 100%)", desc: "Real-time stock progress bar for flash sales (e.g., '78% Claimed')" },
      { name: "Is Limited Quantity Flag", type: "Boolean", desc: "Flags whether promotion ends upon inventory exhaustion" }
    ]
  },
  {
    title: "6. Merchant & Competitive Context",
    desc: "Seller origin, sponsored placement signals, and competitive pricing parity.",
    fields: [
      { name: "Promoted Seller Name", type: "String", desc: "Merchant or 1st-party retail entity offering the promotional discount" },
      { name: "Is Sponsored Deal Placement", type: "Boolean", desc: "True if brand paid for premium homepage or deal-event placement" },
      { name: "Competitor Price Match Flag", type: "Boolean", desc: "Indicates automated price matching triggered by competitor sale" },
      { name: "Last Deal Audit Timestamp", type: "ISO-8601", desc: "UTC timestamp when promotional metrics were validated" }
    ]
  }
];

/* ─────────────────────────────────────────────────────────────
   SIBLING DATASETS IN E-COMMERCE
───────────────────────────────────────────────────────────── */
const ecommerceDatasets: SiblingDataset[] = [
  {
    name: "Discounts & Offers",
    slug: "/datasets/ecommerce/discounts-offers",
    desc: "Lightning deals, coupon codes, promotional banners, bundle markdowns, and flash sales.",
    icon: Percent,
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
    name: "Pricing Data",
    slug: "/datasets/ecommerce/pricing-data",
    desc: "Historical & real-time pricing trends, MAP violations, strike-through rates, and Buy Box trackers.",
    icon: TrendingUp,
    badge: "Price Intel"
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
    q: "What information is included in the Discounts & Offers Dataset?",
    a: "The dataset provides structured promotional data including original list prices, active deal prices, net percentage discounts, digital clip coupon dollar values, promotional deal types (Lightning Deals, Rollbacks, BOGO), percentage claimed progress, scheduled expiry countdowns, and merchant details across 40+ normalized fields."
  },
  {
    q: "How frequently is promotional and coupon data collected?",
    a: "Flash sales and lightning deals often expire within hours. We crawl deals continuously on an hourly or sub-hourly cadence, capturing flash sale launches, tracking claimed percentages, and archiving expired promotions in near real-time."
  },
  {
    q: "Can you capture clipped digital coupons and cart vouchers?",
    a: "Yes. Our extraction scrapers simulate live shopper checkout sessions to detect digital check-box coupons (e.g., 'Save an extra $30 with coupon'), promotional voucher codes, and multi-buy volume discounts that standard price scrapers miss."
  },
  {
    q: "Can this dataset help benchmark competitor promotional calendars?",
    a: "Yes. Enterprise brands and pricing teams analyze our historical promotions data to map competitor promotional cadence, anticipate seasonal sales (Black Friday, Prime Day, Cyber Week), and calculate net discount depth by category."
  },
  {
    q: "What delivery formats and cloud storage options are supported?",
    a: "Promotional feeds are provided in clean CSV, JSON, NDJSON (JSON Lines), and Apache Parquet formats. Automated sync into AWS S3, Google Cloud Storage, Snowflake, Kafka streams, or REST API endpoints is fully supported."
  },
  {
    q: "How can I request a sample discounts dataset for my product category?",
    a: "You can request a free sample dataset by clicking the 'Request Dataset Sample' button on this page or through our contact form. Our data solutions team will supply a sample extract of active promotional offers in your target category within 24 hours."
  }
];

export default function DiscountsOffersPage() {
  return (
    <DatasetTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Datasets', href: '/datasets' },
        { label: 'E-commerce', href: '/datasets/ecommerce' },
        { label: 'Discounts & Offers' }
      ]}
      hubBannerText="Datasets Discovery Hub: Browse verified promotional deals, digital coupons, and marketplace flash sale feeds."
      hubServiceLink="/services/ecommerce-data-scraping"
      hubServiceLinkLabel="Custom Scraping Services"
      badgeText="Verified Promotions Dataset"
      badgeSubtext="50M+ Active Offers Tracked Daily"
      title="E-commerce Promotional Deals, Discounts & Coupon Datasets"
      description="Capture promotional banners, instant digital coupons, lightning flash sales, bundle markdowns, and seasonal clearance discounts across leading retail marketplaces. Benchmark competitor promotional velocity, track coupon redemption windows, and measure real net discount depths engineered for dynamic pricing intelligence and retail promotion analytics."
      featurePoints={[
        "Digital Coupon Scraping",
        "Lightning Deal Trackers",
        "Bundle & BOGO Offers",
        "Net Discount Depth (%)",
        "Deal Duration Countdowns",
        "Promotional Tag Captures"
      ]}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/ecommerce-data-scraping"
      customPipelineLabel="Need Custom Deals Scraper?"
      overviewCardTitle="Promotions & Deals Feed"
      liveBadgeText="Live Deals Feed"
      stats={[
        { label: "Active Deals", value: "50M+", subtext: "Monitored daily" },
        { label: "Discount Range", value: "0–90%", subtext: "Verified savings" },
        { label: "Coverage", value: "45+", subtext: "Global shopping engines" },
        { label: "Update Speed", value: "Hourly+", subtext: "Flash sale captures" }
      ]}
      metadataItems={[
        { label: "File Formats", value: "CSV, JSON, NDJSON, Parquet" },
        { label: "Delivery Channels", value: "S3, Snowflake, BigQuery, Kafka, API" },
        { label: "Compliance", value: "100% Ethical Public Web Data", isHighlight: true }
      ]}
      specialistCtaLabel="Talk to a Data Specialist"
      specialistCtaLink="/contact"
      sampleSectionOverline="Live Deals Sample"
      sampleSectionTitle="Explore the Discounts & Offers Schema"
      sampleSectionDescription="Inspect actual promotional deal records delivered in our dataset. Every field is verified, timestamped, and normalized for direct loading into promotional monitoring tools, price intelligence dashboards, or BI pipelines."
      jsonSample={jsonSample}
      csvSample={csvSample}
      jsonFilename="ecommerce_discounts_offers_sample.json"
      csvFilename="ecommerce_discounts_offers_sample.csv"
      sampleRecordCount="2 / 50M+ Deals"
      dictionarySectionOverline="Data Dictionary"
      dictionarySectionTitle="Available Promotion Attributes & Field Specifications"
      dictionarySectionDescription="Every promotional record includes rich deal intelligence—from original list prices and active deal savings to digital coupons, claimed progress percentages, and duration countdowns."
      attributeGroups={attributeGroups}
      siblingCategoryOverline="E-Commerce Category"
      siblingSectionTitle="More E-commerce Datasets"
      siblingSectionDescription="Combine promotional data with full product catalogs, real-time pricing trends, stock availability, and merchant directories."
      siblingViewAllLink="/datasets/ecommerce"
      siblingViewAllLabel="View All E-commerce Datasets"
      siblingDatasets={ecommerceDatasets}
      showExploreMore={true}
      faqSectionOverline="Questions & Answers"
      faqSectionTitle="Frequently Asked Questions"
      faqSectionDescription="Learn more about our promotional scraping methodology, digital coupon captures, flash sale velocity tracking, and cloud delivery pipelines."
      faqs={faqs}
    />
  );
}

