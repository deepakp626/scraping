import {
  Wine,
  Database,
  Sliders,
  Globe,
  Settings,
  Zap,
  Clock,
  Search,
  Sparkles,
  BarChart3,
  MapPin,
} from "lucide-react";

export const liquorScrapingData = {
  // Hero section
  heroTitlePrefix: "Web Scraping for",
  heroTitleHighlight: "Liquor, Wine & Beer",
  heroTitleSuffix: "Data",
  heroDescription:
    "Extract detailed product specifications, real-time pricing, stock availability, vintage years, and ratings across online distributors, delivery apps, and local retailers.",
  heroHighlights: [
    "Extract SKU-level catalog data including ABV, vintage, and volume",
    "Monitor dynamic retail prices, discounts, and tax applications",
    "Track stock levels and out-of-stock statuses in real time",
    "Extract user reviews, ratings, and expert tasting notes",
    "Bypass age-verification gates and anti-bot systems automatically",
    "Aggregate listings from major delivery apps and retail chains",
  ],
  heroImage: "/services/liquor-or-alchol-data-scraping/liquor-hero.svg",
  heroImageAlt: "Liquor data scraping hero illustration",
  heroCtaIcon: Wine,
  sampleDataLink: "/contact",
  allServicesLink: "/services",

  // Stats section
  stats: [
    { value: "30+", label: "E-Commerce Sites" },
    { value: "5M+", label: "Products Indexed" },
    { value: "99.9%", label: "Accuracy Rate" },
    { value: "Hourly", label: "Price Updates" },
  ],

  // About/Explanation section
  aboutTitle: "What is Liquor & Alcohol Data Scraping?",
  aboutDescription:
    "Liquor and alcohol data scraping is the automated extraction of product catalog specifications, real-time prices, store inventory metrics, and brand distribution signals from online wine stores, beverage marketplaces, and on-demand delivery portals. Beverage brands, distributors, market researchers, and retail software developers use this data to perform price optimization, monitor brand positioning, forecast inventory, and enrich product search indexes.",
  aboutBulletPoints: [
    "Extract product details including label name, region, winery/distillery, and grape/grain type.",
    "Scrape dynamic pricing, multi-buy discounts, and loyalty club markdowns.",
    "Collect real-time stock levels and availability flags across locations.",
    "Parse technical metrics like Alcohol by Volume (ABV), vintage year, and bottle capacity.",
    "Capture expert review scores, user star ratings, and flavor profile tags.",
  ],

  // Detailed Compilation of Data Fields
  dataFieldsTitle: "Structured Alcohol & Beverage Data Fields",
  dataFieldsDescription:
    "We clean and structure wine, beer, and spirits catalog metrics from online stores and distribution networks into a unified dataset ready for pricing analysis and stock intelligence.",
  dataFieldsImage: "/services/liquor-or-alchol-data-scraping/liquor-data-mockup.svg",
  dataFieldsLeft: [
    "Brand & Product Name",
    "Beverage Category (Wine/Spirits/Beer)",
    "Sub-type (e.g., IPA, Cabernet, Gin)",
    "Vintage Year",
    "Alcohol by Volume (ABV) %",
    "Bottle Volume (ml/oz)",
    "Country / Region of Origin",
    "Winery, Distillery, or Brewer",
  ],
  dataFieldsRight: [
    "Current Retail Price",
    "Original / MSRP Price",
    "Discounts & Promotion Text",
    "Stock Status & In-Store Quantity",
    "UPC / EAN / Barcode",
    "Wine Enthusiast / Critic Scores",
    "User Rating & Review Counts",
    "Merchant or Store Location",
  ],

  // Powerful Features section
  featuresSectionTitle: "Enterprise Capabilities for Liquor Data Scraping",
  featureBlocks: [
    {
      title: "Automated Age Verification Bypassing",
      description:
        "Our scraper is equipped with session-handling and cookie management to navigate past legal age-verification screens on retail websites without manual intervention.",
      image: "/services/liquor-or-alchol-data-scraping/age-gate-bypass.svg",
      imageAlt: "Age gate bypass illustration",
      bulletPoints: [
        {
          title: "Stateful Session Handling",
          desc: "Maintain cookies and tokens across request sequences to emulate confirmed-age user sessions.",
        },
        {
          title: "Automatic Verification Mocking",
          desc: "Handle age confirmation clicks, date of birth forms, and popups automatically.",
        },
        {
          title: "Zero Interruption Operations",
          desc: "Ensure seamless crawling runs without triggering infinite loops on age checks.",
        },
      ],
    },
    {
      title: "SKU Matching & Pricing Intelligence",
      description:
        "Compare pricing for identical products across multiple vendors, including Total Wine, Wine.com, Drizly, and BevMo, by utilizing automated UPC and brand-matching algorithms.",
      image: "/services/liquor-or-alchol-data-scraping/sku-matching.svg",
      imageAlt: "SKU matching illustration",
      bulletPoints: [
        {
          title: "UPC & EAN Cross-Referencing",
          desc: "Map products to standardized barcodes to ensure highly accurate cross-retailer pricing.",
        },
        {
          title: "Promo & Multi-Buy Tracking",
          desc: "Capture buy-one-get-one promotions, case discount pricing, and member-only specials.",
        },
        {
          title: "Dynamic Markup Analysis",
          desc: "Track pricing discrepancies between a retailer's direct site and their listings on on-demand delivery apps.",
        },
      ],
    },
    {
      title: "Live Inventory & Store-Level Stock Tracking",
      description:
        "Crawl stock availability indicators down to specific postal codes and local brick-and-mortar stores to build real-time local product maps.",
      image: "/services/liquor-or-alchol-data-scraping/inventory-tracking.svg",
      imageAlt: "Inventory tracking illustration",
      bulletPoints: [
        {
          title: "Zip-Code Level Ingestion",
          desc: "Extract inventory counts and out-of-stock statuses across specific local store locations.",
        },
        {
          title: "Out-of-Stock Alerting",
          desc: "Trigger instant notices when key brand items go out of stock at major distribution nodes.",
        },
        {
          title: "Shelf Share Audits",
          desc: "Measure brand visibility and category representation on online retail pages.",
        },
      ],
    },
    {
      title: "Critic Reviews & Tasting Data Ingestion",
      description:
        "Aggregate critic ratings, expert scores (e.g. Wine Advocate, Wine Spectator), flavor descriptors, and consumer comments to fuel recommendation engines.",
      image: "/services/liquor-or-alchol-data-scraping/review-aggregation.svg",
      imageAlt: "Review aggregation illustration",
      bulletPoints: [
        {
          title: "Expert Score Capture",
          desc: "Scrape 100-point critic scores, tasting panel results, and awards tags.",
        },
        {
          title: "Tasting Note Parsing",
          desc: "Extract flavor profile descriptors like 'oaky', 'fruity', or 'tannic' using NLP text processing.",
        },
        {
          title: "Consumer Review Aggregation",
          desc: "Collect user ratings and comments across Vivino, CellarTracker, and retail platforms.",
        },
      ],
    },
  ],

  // Benefits section
  benefitsTitle: "Why Beverage Brands & Retailers Trust Us",
  benefits: [
    {
      title: "Optimize Pricing & Promotions",
      content:
        "Adjust your catalog prices dynamically based on competitor price movements, discount schedules, and local market rate variations.",
    },
    {
      title: "Monitor Brand Distribution & MAP Compliance",
      content:
        "Identify unapproved resellers and ensure retail partners comply with Minimum Advertised Price (MAP) rules across all digital storefronts.",
    },
    {
      title: "Fuel E-Commerce Search & Recommendations",
      content:
        "Enhance your online wine or spirits store with accurate product specifications, vintage histories, critic scores, and tasting descriptions.",
    },
    {
      title: "Track Competitor Inventory & Supply Trends",
      content:
        "Gain competitive supply insights by detecting which product categories or imports are experiencing out-of-stock periods.",
    },
  ],
  benefitsImage: "/services/liquor-or-alchol-data-scraping/liquor-benefits.svg",
  benefitsImageAlt: "Liquor data benefits illustration",

  // Everything You Need section (Grid)
  gridSectionTitle: "Robust Ingestion Stack Built for Alcohol Portals",
  gridSectionDescription:
    "Our scaling scraping solution is tailored to handle age gates, geofenced catalogs, and dynamic pricing rules.",
  gridFeatures: [
    {
      icon: Sliders,
      title: "Age-Gate Bypass Engine",
      description:
        "Successfully handles dynamic, stateful popups and legal age-verification steps without interrupting execution.",
    },
    {
      icon: Globe,
      title: "Regional Proxies",
      description:
        "Crawl through regional IP addresses to capture city-specific prices, local taxes, and product catalogs.",
    },
    {
      icon: Settings,
      title: "Dynamic Javascript Renderers",
      description:
        "Render complex single-page apps (SPAs) and dynamic search listings using headless browser tech.",
    },
    {
      icon: Zap,
      title: "Dynamic Price Alerts",
      description:
        "Configure webhooks to receive real-time updates when target items drop in price or trigger new promotions.",
    },
    {
      icon: Clock,
      title: "Scheduled Sweeps",
      description:
        "Automate scraping intervals (hourly, daily, or weekly) to track fast-moving promotional events.",
    },
    {
      icon: Database,
      title: "Downstream Deliveries",
      description:
        "Deliver clean, structured JSON or CSV data directly into Snowflake, S3, or via a webhook endpoint.",
    },
  ],

  // Popular Use Cases section
  useCasesSectionTitle: "Liquor Data Scraping Use Cases",
  useCasesSectionDescription:
    "How beverage brands, distributors, and app creators utilize structured alcohol data.",
  useCases: [
    {
      icon: Search,
      title: "Beverage Search Engines",
      description:
        "Create rich online catalogs with accurate product listings, tasting profiles, critic points, and vintages.",
    },
    {
      icon: BarChart3,
      title: "Price Strategy Audits",
      description:
        "Analyze price variations, state taxes, and wholesale markups to plan pricing strategies and increase margins.",
    },
    {
      icon: Sparkles,
      title: "Market Distribution Audits",
      description:
        "Track where and at what price your brand's wines or spirits are being sold across domestic and foreign markets.",
    },
    {
      icon: MapPin,
      title: "Local Delivery Optimization",
      description:
        "Integrate live inventory feeds from local stores to ensure instant food/beverage delivery apps display accurate products.",
    },
  ],

  // Platforms section
  platformsSectionTitle: "Monitored Beverage Platforms & Retailers",
  platformsSectionDescription:
    "We extract product details, prices, reviews, and inventory status from leading beverage sites and local delivery apps.",
  platforms: [
    {
      imagePath: "/services/liquor-or-alchol-data-scraping/icons/totalwine.svg",
      name: "Total Wine",
    },
    {
      imagePath: "/services/liquor-or-alchol-data-scraping/icons/drizly.svg",
      name: "Drizly",
    },
    {
      imagePath: "/services/liquor-or-alchol-data-scraping/icons/bevmo.svg",
      name: "BevMo",
    },
    {
      imagePath: "/services/liquor-or-alchol-data-scraping/icons/wine.svg",
      name: "Wine.com",
    },
    {
      imagePath: "/services/liquor-or-alchol-data-scraping/icons/vivino.svg",
      name: "Vivino",
    },
  ],
};
