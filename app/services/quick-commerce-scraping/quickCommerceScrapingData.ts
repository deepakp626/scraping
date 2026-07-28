import {
  Zap,
  Sliders,
  Globe,
  Settings,
  Clock,
  Database,
  Search,
  Sparkles,
  Tag,
} from "lucide-react";

export const quickCommerceScrapingData = {
  // Hero section
  heroTitlePrefix: "Web Scraping for",
  heroTitleHighlight: "Quick Commerce",
  heroTitleSuffix: "Data",
  heroDescription:
    "Monitor live shelf inventory, delivery times, dynamic markups, and instant flash promos across dark stores and quick delivery platforms.",
  heroHighlights: [
    "Sub-hour frequency data feeds",
    "Track dark store stock & inventory limits",
    "Monitor dynamic delivery fees & ETAs",
    "Audit sponsored banner & search placements",
    "Compare delivery markup rates vs in-store prices",
    "Bypass cloudflare & mobile app anti-bot barriers",
  ],
  heroImage: "/services/quick-commerce-scraping/quick-commerce-hero.svg",
  heroImageAlt: "Quick Commerce scraping hero illustration",
  heroCtaIcon: Zap,

  // Stats section
  stats: [
    { value: "25+", label: "Quick Commerce Apps" },
    { value: "Sub-Hour", label: "Scraping Interval" },
    { value: "99.9%", label: "API Availability" },
    { value: "10M+", label: "Daily Queries" },
  ],

  // About/Explanation section
  aboutTitle: "What is Quick Commerce Data Scraping?",
  aboutDescription:
    "Quick commerce data scraping is the high-frequency extraction of inventory levels, dark store stock, delivery estimates, dynamic pricing, and promo banners from instant-delivery mobile applications and dark-store networks. Unlike traditional e-commerce, quick commerce requires sub-hour updates to capture rapid stock depletion and flash discount spikes.",
  aboutBulletPoints: [
    "Track micro-fulfillment dark store inventories with sub-hour precision.",
    "Extract live estimated delivery times (ETAs) and dynamic fee spikes.",
    "Audit share-of-shelf rankings and search results for key consumer terms.",
    "Monitor flash promotions, countdown deals, and markup percentages.",
    "Integrate real-time APIs to trigger replenishment or price adjustment scripts.",
  ],

  // Detailed Compilation of Data Fields
  dataFieldsTitle: "Structured Quick Commerce Data Fields",
  dataFieldsDescription:
    "We normalize data points across various instant delivery networks into a structured schema.",
  dataFieldsImage: "/services/quick-commerce-scraping/quick-commerce-data-mockup.svg",
  dataFieldsLeft: [
    "Product Name & Brand",
    "SKU / Barcode",
    "Dark Store ID & Coordinates",
    "Delivery Fee",
    "Estimated Delivery Time (ETA)",
    "Dynamic Price Surcharges",
    "Current Stock (Units)",
    "In Stock Status",
  ],
  dataFieldsRight: [
    "Category & Subcategory Hierarchy",
    "Platform Surcharge Margin",
    "Flash Sales Discount",
    "Promo End Countdown",
    "Sponsored Banner Placements",
    "Organic Search Position",
    "Item Weight / Volume",
    "Merchant Ratings & Review Counts",
  ],

  // Powerful Features section (4 sections, left-right alternating content sections)
  featuresSectionTitle: "Enterprise Features for Quick Commerce Scrapers",
  featureBlocks: [
    {
      title: "Sub-Hour Real-Time Dark Store Inventory Ingestion",
      description:
        "Quick commerce inventory turns over rapidly. Our scrapers are built to crawl dark store inventory levels on high frequencies (down to every 15-30 minutes) without triggering rate limits.",
      image: "/services/quick-commerce-scraping/quick-commerce-dark-store.svg",
      imageAlt: "Dark store inventory illustration",
      bulletPoints: [
        {
          title: "High-Frequency Scans",
          desc: "Run automated sweeps multiple times per hour.",
        },
        {
          title: "Micro-Fulfillment Stock Mapping",
          desc: "Measure inventory depth in real time to prevent out-of-stock events.",
        },
        {
          title: "Max Order Threshold Tracking",
          desc: "Calculate exact inventory levels by simulating shopping cart additions.",
        },
      ],
    },
    {
      title: "Delivery Time (ETA) & Dynamic Fees Monitoring",
      description:
        "Delivery speeds and dynamic pricing spikes are crucial conversion factors. We monitor and track ETAs and delivery fees across geographic target areas.",
      image: "/services/quick-commerce-scraping/quick-commerce-delivery-time.svg",
      imageAlt: "Delivery time and fees illustration",
      bulletPoints: [
        {
          title: "Dynamic Surcharge Auditing",
          desc: "Track peak hours, bad weather surcharges, and holiday price hikes.",
        },
        {
          title: "ETA Benchmarking",
          desc: "Monitor and map median delivery speeds across different neighborhood sectors.",
        },
        {
          title: "Distance & Route Mapping",
          desc: "Extract real-time transit distances and courier assignments.",
        },
      ],
    },
    {
      title: "Share-of-Shelf Auditing & Sponsored Ad Placements",
      description:
        "Understand your visibility on the digital shelf. Monitor organic positions, top search listings, and home-page banner slots to measure campaign compliance.",
      image: "/services/quick-commerce-scraping/quick-commerce-shelf-share.svg",
      imageAlt: "Share-of-shelf and banner ads illustration",
      bulletPoints: [
        {
          title: "Organic Search Rankings",
          desc: "Track search position daily for top consumer keywords.",
        },
        {
          title: "Banner Ad Audits",
          desc: "Verify that your paid promotions are running correctly on localized apps.",
        },
        {
          title: "Digital Shelf Share",
          desc: "Assess brand placement percentages compared to direct competitors.",
        },
      ],
    },
    {
      title: "Flash Promotion & Markups Analytics",
      description:
        "Quick delivery apps run frequent flash promotions that last only a few minutes or hours. We capture flyer deals, discount codes, and platform-specific markups.",
      image: "/services/quick-commerce-scraping/quick-commerce-flash-sales.svg",
      imageAlt: "Flash promotions illustration",
      bulletPoints: [
        {
          title: "Countdown Banner Alerts",
          desc: "Extract active promo time limits and discount rates.",
        },
        {
          title: "Markup Discrepancy Tracking",
          desc: "Track dynamic markups charged on apps versus physical store pricing.",
        },
        {
          title: "Promo Code Verification",
          desc: "Validate active discount code values automatically.",
        },
      ],
    },
  ],

  // Benefits section
  benefitsTitle: "Why Scraping Quick Commerce Data is Essential",
  benefits: [
    {
      title: "Prevent Out-of-Stock Loss",
      content:
        "Identify which of your products are running low in dark stores to trigger automatic replenishments and prevent sales loss.",
    },
    {
      title: "Benchmarking Delivery Speeds",
      content:
        "Evaluate courier fulfillment times and ETA accuracy to optimize logistics and customer satisfaction.",
    },
    {
      title: "Dynamic Surcharge Visibility",
      content:
        "Understand real-time delivery markup rates and surge charges to keep your pricing models competitive.",
    },
    {
      title: "Digital Shelf Compliance",
      content:
        "Audit sponsored banners and category shelf shares to make sure your CPG marketing campaigns are compliant.",
    },
  ],
  benefitsImage: "/services/quick-commerce-scraping/quick-commerce-benefits.svg",
  benefitsImageAlt: "Quick commerce scraping benefits illustration",

  // Everything You Need section (Grid)
  gridSectionTitle: "Robust Quick Commerce Ingestion Pipeline",
  gridSectionDescription:
    "Our systems handle API structures and anti-bot defense frameworks specific to modern mobile apps.",
  gridFeatures: [
    {
      icon: Sliders,
      title: "Mobile App API Crawling",
      description:
        "Extract data straight from Android/iOS app APIs by simulating real device payloads.",
    },
    {
      icon: Globe,
      title: "Highly Geotargeted Proxies",
      description:
        "Query dark stores from residential IPs placed in their immediate delivery radius.",
    },
    {
      icon: Settings,
      title: "Stock Level Mapping",
      description:
        "Measure precise unit counts by programmatically analyzing maximum purchase limits.",
    },
    {
      icon: Zap,
      title: "Sub-Hour Execution Cycles",
      description:
        "Re-crawl listings at high frequencies to catch rapid inventory turnovers.",
    },
    {
      icon: Clock,
      title: "Instant Alert Webhooks",
      description:
        "Receive automated Slack or Email alerts when critical items go out of stock.",
    },
    {
      icon: Database,
      title: "Cloud Data Destinations",
      description:
        "Export parsed datasets to Amazon S3, Google BigQuery, or Snowflake warehouses.",
    },
  ],

  // Popular Use Cases section
  useCasesSectionTitle: "Popular Quick Commerce Use Cases",
  useCasesSectionDescription:
    "How top consumer packaged goods brands and logistics providers leverage real-time datasets.",
  useCases: [
    {
      icon: Search,
      title: "Stock Replenishment Triggers",
      description:
        "Logistics engines consume live dark store stock feeds to automatically dispatch refill shipments before shelves empty.",
    },
    {
      icon: Sparkles,
      title: "CPG Retail Media Audits",
      description:
        "Brands track search rankings, sponsored ad placements, and banner compliance on instant-delivery apps.",
    },
    {
      icon: Globe,
      title: "Surcharge & Fee Benchmarking",
      description:
        "Operators compare dynamic delivery fees and surge pricing across regions to optimize their own fee structures.",
    },
    {
      icon: Tag,
      title: "Competitor Price Tracking",
      description:
        "Retailers scan instant delivery platforms to monitor competitor discounts and pricing markups in real-time.",
    },
  ],

  // Platforms section (20 to 25 company names as requested, logos will be handled by the user)
  platformsSectionTitle: "Extract Data from Major Quick Commerce Platforms",
  platformsSectionDescription:
    "We extract product data, stocks, fees, and ETAs from leading delivery apps globally.",
  platforms: [
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/getir.svg",
      name: "Getir",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/gorillas.svg",
      name: "Gorillas",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/flink.svg",
      name: "Flink",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/gopuff.svg",
      name: "Gopuff",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/zepto.svg",
      name: "Zepto",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/blinkit.svg",
      name: "Blinkit",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/zapp.svg",
      name: "Zapp",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/rappi.svg",
      name: "Rappi",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/jokr.svg",
      name: "Jokr",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/cajoo.svg",
      name: "Cajoo",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/dija.svg",
      name: "Dija",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/weezy.svg",
      name: "Weezy",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/gorillas-us.svg",
      name: "Gorillas US",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/uber-grocery.svg",
      name: "Uber Eats Grocery",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/dashmart.svg",
      name: "DoorDash DashMart",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/grubhub-goods.svg",
      name: "Grubhub Goods",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/deliveroo-hop.svg",
      name: "Deliveroo Hop",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/justeat-grocery.svg",
      name: "Just Eat Grocery",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/instacart-express.svg",
      name: "Instacart Express",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/wolt.svg",
      name: "Wolt",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/pedidosya.svg",
      name: "PedidosYa",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/talabat.svg",
      name: "Talabat Mart",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/glovo-express.svg",
      name: "Glovo Express",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/pandamart.svg",
      name: "Foodpanda Pandamart",
    },
    {
      imagePath: "/services/quick-commerce-scraping/quick-commerce-icons/grabmart.svg",
      name: "GrabMart",
    },
  ],
};