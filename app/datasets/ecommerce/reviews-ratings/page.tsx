'use client';

import React from 'react';
import DatasetTemplate, {
  DataDictionaryGroup,
  SiblingDataset,
  FAQItem
} from '@/app/datasets/components/DatasetTemplate';
import {
  Star,
  Package,
  TrendingUp,
  Store,
  Layers,
  AlertCircle,
  Percent,
  Tag
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   SAMPLE DATA FOR PREVIEW TABS (REVIEWS & RATINGS)
───────────────────────────────────────────────────────────── */
const jsonSample = [
  {
    review_id: "R3FX9210KWLM8A",
    asin: "B0D1XD1ZV3",
    sku: "APL-APP2-USBC",
    product_name: "Apple AirPods Pro (2nd Generation) with MagSafe Case (USB-C)",
    brand: "Apple",
    marketplace: "amazon.com",
    star_rating: 5.0,
    review_headline: "Unbelievable Active Noise Cancellation & Clear Sound",
    review_body: "Upgraded from the 1st gen AirPods Pro and the noise cancellation improvement is immediately noticeable on daily transit. The transparency mode sounds natural and USB-C makes charging convenient.",
    review_date: "2026-10-28T14:32:00Z",
    verified_purchase: true,
    reviewer_name: "Marcus K.",
    reviewer_badge: "Top 500 Reviewer",
    helpful_votes: 142,
    sentiment_polarity: 0.92,
    sentiment_label: "Positive",
    purchased_variant: "USB-C MagSafe Case",
    customer_images: [
      "https://images.compilepilot.com/sample/review-airpods-unboxing.jpg",
      "https://images.compilepilot.com/sample/review-airpods-case.jpg"
    ]
  },
  {
    review_id: "R18BQK29PZMT61",
    asin: "B09SWW583J",
    sku: "AMZ-KNDL-PW-16",
    product_name: "Kindle Paperwhite (16 GB) – 6.8\" display with adjustable warm light",
    brand: "Amazon",
    marketplace: "amazon.com",
    star_rating: 4.0,
    review_headline: "Great screen clarity, slight lag with large PDF files",
    review_body: "The warm light feature is fantastic for night reading and battery life easily lasts several weeks. However, turning pages in complex PDF files feels slightly slower than EPUB ebooks.",
    review_date: "2026-10-24T09:15:00Z",
    verified_purchase: true,
    reviewer_name: "Sarah T.",
    reviewer_badge: "Verified Buyer",
    helpful_votes: 38,
    sentiment_polarity: 0.65,
    sentiment_label: "Positive",
    purchased_variant: "16 GB - Black without Lockscreen Ads",
    customer_images: []
  }
];

const csvSample = `review_id,asin,sku,brand,marketplace,star_rating,review_headline,review_date,verified_purchase,helpful_votes,sentiment_label,purchased_variant
R3FX9210KWLM8A,B0D1XD1ZV3,APL-APP2-USBC,Apple,amazon.com,5.0,"Unbelievable Active Noise Cancellation",2026-10-28T14:32:00Z,true,142,Positive,"USB-C MagSafe Case"
R18BQK29PZMT61,B09SWW583J,AMZ-KNDL-PW-16,Amazon,amazon.com,4.0,"Great screen clarity slight lag with PDFs",2026-10-24T09:15:00Z,true,38,Positive,"16 GB Black"
R2L90P8N5Z321A,B08N5WRWNW,APL-MBP-M1-256,Apple,amazon.com,5.0,"Outstanding battery life and M1 speed",2026-10-19T11:05:00Z,true,89,Positive,"Space Gray 8GB 256GB"`;

/* ─────────────────────────────────────────────────────────────
   DATA DICTIONARY ATTRIBUTE GROUPS
───────────────────────────────────────────────────────────── */
const attributeGroups: DataDictionaryGroup[] = [
  {
    title: "1. Product Identification & Metadata",
    desc: "Catalog reference keys mapping customer feedback directly to exact items and variants.",
    fields: [
      { name: "Product Title / Name", type: "String", desc: "Normalized product title corresponding to customer review" },
      { name: "ASIN / UPC / EAN", type: "String", desc: "Universal product barcodes and retailer standard catalog codes" },
      { name: "SKU / Model Number", type: "String", desc: "Manufacturer specific part number or internal item SKU" },
      { name: "Brand & Manufacturer", type: "String", desc: "Brand company name associated with the reviewed item" },
      { name: "Marketplace & Domain", type: "String", desc: "Origin retailer platform (e.g., amazon.com, walmart.com, target.com)" }
    ]
  },
  {
    title: "2. Rating, Text & Sentiment Telemetry",
    desc: "Unstructured voice-of-customer copy and computed Natural Language Processing sentiment scores.",
    fields: [
      { name: "Star Rating Score", type: "Float (1.0 - 5.0)", desc: "Numeric customer evaluation score awarded to the item" },
      { name: "Review Headline / Title", type: "String", desc: "User-submitted summary title or headline of the feedback" },
      { name: "Review Body Text", type: "String (Long Text)", desc: "Full unstructured text body written by the customer" },
      { name: "Sentiment Polarity", type: "Float (-1.0 to 1.0)", desc: "Normalized sentiment polarity score computed via NLP models" },
      { name: "Aspect Sentiment Tags", type: "Array (Key-Value)", desc: "Feature-level sentiment breakdown (e.g., Battery: +0.8, Price: -0.2)" }
    ]
  },
  {
    title: "3. Reviewer Authenticity & Profile",
    desc: "Trust metrics, verification credentials, and reviewer history indicators.",
    fields: [
      { name: "Verified Purchase Flag", type: "Boolean", desc: "True if retailer confirmed reviewer purchased item through platform" },
      { name: "Reviewer Display Name", type: "String", desc: "Public username or pseudonym selected by reviewer" },
      { name: "Reviewer Profile ID", type: "String", desc: "Unique hashed identifier representing reviewer on the marketplace" },
      { name: "Reviewer Badges", type: "Array (Strings)", desc: "Accreditations such as 'Top 500 Reviewer', 'Vine Voice', or 'Early Reviewer'" },
      { name: "Reviewer Country", type: "ISO Country", desc: "Country origin registered on the reviewer public account" }
    ]
  },
  {
    title: "4. Social Proof, Helpfulness & Responses",
    desc: "Community engagement scores and official merchant customer service responses.",
    fields: [
      { name: "Helpful Votes Count", type: "Integer", desc: "Cumulative volume of other shoppers who voted review helpful" },
      { name: "Total Feedback Votes", type: "Integer", desc: "Total community votes received including helpful and unhelpful" },
      { name: "Merchant Response Text", type: "String (Optional)", desc: "Public reply posted by verified brand manufacturer or seller" },
      { name: "Response Timestamp", type: "ISO-8601", desc: "Date and time when merchant posted official resolution" }
    ]
  },
  {
    title: "5. User-Generated Media Assets",
    desc: "Rich media assets uploaded by verified consumers for visual sentiment auditing.",
    fields: [
      { name: "Customer Image URLs", type: "Array (URLs)", desc: "Direct CDN links to high-res customer unboxing and product photos" },
      { name: "Customer Video URLs", type: "Array (URLs)", desc: "Links to video demonstrations submitted with customer review" },
      { name: "Media Thumbnail Previews", type: "Array (URLs)", desc: "Compressed preview thumbnails for fast gallery indexing" }
    ]
  },
  {
    title: "6. Purchased Variants & Time Series",
    desc: "Variant SKU attributes and submission chronologies for longitudinal sentiment tracking.",
    fields: [
      { name: "Purchased Variant SKU", type: "String", desc: "Exact color, size, pack count, or style variant reviewed" },
      { name: "Review Submission Date", type: "ISO-8601", desc: "Precise UTC date and time when review was published" },
      { name: "Review Modified Date", type: "ISO-8601", desc: "Date when reviewer updated or amended earlier comments" },
      { name: "Days After Purchase", type: "Integer (if available)", desc: "Elapsed duration between delivery date and feedback submission" }
    ]
  }
];

/* ─────────────────────────────────────────────────────────────
   SIBLING DATASETS IN E-COMMERCE
───────────────────────────────────────────────────────────── */
const ecommerceDatasets: SiblingDataset[] = [
  {
    name: "Reviews & Ratings",
    slug: "/datasets/ecommerce/reviews-ratings",
    desc: "Customer review sentiments, verified purchase badges, review body text, and star breakdowns.",
    icon: Star,
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
    q: "What information is included in the Reviews & Ratings Dataset?",
    a: "The dataset includes full review body text, headline titles, verified purchase badges, star ratings (1.0 to 5.0), helpful vote counters, aspect-based sentiment scores, customer image and video links, reviewer metadata, and exact purchased variant details across 35+ normalized attributes."
  },
  {
    q: "How do you verify genuine customer reviews and filter bot spam?",
    a: "We extract verified purchase indicators directly from marketplace HTML tags, detect repetitive duplicate review text across sibling ASINs, and flag suspicious review velocity surges to ensure data hygiene for machine learning and brand analytics."
  },
  {
    q: "Is the review text suitable for LLM fine-tuning and sentiment analysis?",
    a: "Yes. All review texts are cleaned, UTF-8 normalized, deduplicated, and stripped of extraneous HTML or tracking scripts. The dataset is delivered in JSON Lines or Parquet, making it immediately ingestible for training customer support LLMs, fine-tuning sentiment classifiers, or voice-of-customer (VOC) modeling."
  },
  {
    q: "How frequently is customer review data refreshed?",
    a: "We provide scheduled daily, weekly, or monthly incremental feeds that only deliver newly posted reviews since the last scrape checkpoint. Historic backfills covering entire product review histories are also available upon request."
  },
  {
    q: "What delivery formats and cloud storage destinations are supported?",
    a: "Datasets are delivered in clean CSV, JSON, NDJSON (JSON Lines), and Apache Parquet. Automated direct pushes into AWS S3 buckets, Google Cloud Storage, Snowflake, Databricks, PostgreSQL, or REST API endpoints are fully supported."
  },
  {
    q: "How can I request a sample reviews dataset for my target category?",
    a: "You can request a free sample dataset by clicking the 'Request Dataset Sample' button on this page or through our contact form. Our team will supply a sample extract of 1,000+ verified customer reviews tailored to your target brands or marketplaces within 24 hours."
  }
];

export default function ReviewsRatingsPage() {
  return (
    <DatasetTemplate
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Datasets', href: '/datasets' },
        { label: 'E-commerce', href: '/datasets/ecommerce' },
        { label: 'Reviews & Ratings' }
      ]}
      hubBannerText="Datasets Discovery Hub: Browse verified review schemas, customer sentiment scores, and multi-retailer feedback feeds."
      hubServiceLink="/services/ecommerce-data-scraping"
      hubServiceLinkLabel="Custom Scraping Services"
      badgeText="Verified Reviews Dataset"
      badgeSubtext="250M+ Customer Reviews Indexed"
      title="E-commerce Customer Reviews & Sentiment Datasets"
      description="Access comprehensive, structured customer review datasets extracted across Amazon, Walmart, Target, Best Buy, and global shopping engines. Extract verified buyer tags, star rating distributions, full review bodies, customer unboxing photos, helpful vote tallies, and aspect-based sentiment scores engineered for voice-of-customer (VOC) analytics, product R&D, and LLM fine-tuning."
      featurePoints={[
        "Verified Buyer Verification",
        "Star Rating Distributions",
        "Aspect Sentiment Scoring",
        "Customer Photo URLs",
        "Helpful Vote Counters",
        "Multi-Language Support"
      ]}
      requestSampleLink="/contact"
      requestSampleLabel="Request Dataset Sample"
      schemaAnchorId="data-dictionary"
      customPipelineLink="/services/ecommerce-data-scraping"
      customPipelineLabel="Need Custom Review Scraper?"
      overviewCardTitle="Reviews & Sentiment Feed"
      liveBadgeText="Live Review Feed"
      stats={[
        { label: "Review Records", value: "250M+", subtext: "Clean text submissions" },
        { label: "Attribute Depth", value: "35+", subtext: "Fields per review" },
        { label: "Languages", value: "40+", subtext: "Global sentiment coverage" },
        { label: "Update Cadence", value: "Daily+", subtext: "Fresh feedback feeds" }
      ]}
      metadataItems={[
        { label: "File Formats", value: "CSV, JSON, NDJSON, Parquet" },
        { label: "Delivery Channels", value: "S3, Snowflake, BigQuery, PostgreSQL, API" },
        { label: "Compliance", value: "100% Ethical Public Web Data", isHighlight: true }
      ]}
      specialistCtaLabel="Talk to a Data Specialist"
      specialistCtaLink="/contact"
      sampleSectionOverline="Live Reviews Sample"
      sampleSectionTitle="Explore the Customer Reviews Schema"
      sampleSectionDescription="Inspect actual customer review records delivered in our dataset. Every field is cleaned, typed, and normalized for direct loading into NLP sentiment pipelines, BI dashboards, or machine learning models."
      jsonSample={jsonSample}
      csvSample={csvSample}
      jsonFilename="ecommerce_reviews_sentiment_sample.json"
      csvFilename="ecommerce_reviews_sentiment_sample.csv"
      sampleRecordCount="2 / 250M+ Records"
      dictionarySectionOverline="Data Dictionary"
      dictionarySectionTitle="Available Review Attributes & Field Specifications"
      dictionarySectionDescription="Every review record includes rich customer feedback data—from verified purchase badges and aspect sentiment polarities to customer media links and helpful vote counts."
      attributeGroups={attributeGroups}
      siblingCategoryOverline="E-Commerce Category"
      siblingSectionTitle="More E-commerce Datasets"
      siblingSectionDescription="Combine customer sentiment with full product catalog specifications, real-time pricing trends, seller directories, and stock availability signals."
      siblingViewAllLink="/datasets/ecommerce"
      siblingViewAllLabel="View All E-commerce Datasets"
      siblingDatasets={ecommerceDatasets}
      showExploreMore={true}
      faqSectionOverline="Questions & Answers"
      faqSectionTitle="Frequently Asked Questions"
      faqSectionDescription="Learn more about our review collection methodology, spam filtering, sentiment tagging, and cloud delivery pipelines."
      faqs={faqs}
    />
  );
}

