import {
  Database,
  Sliders,
  Globe,
  Settings,
  Zap,
  Clock,
  Search,
  Sparkles,
  Tag,
  BarChart3,
} from "lucide-react";

export const fmcgScrapingData = {
  // Hero section
  heroTitlePrefix: "Web Scraping for",
  heroTitleHighlight: "FMCG & CPG",
  heroTitleSuffix: "Data",
  heroDescription:
    "Track share-of-search, digital shelf visibility, brand banner placements, ratings, and competitor product rankings across major retail and quick commerce platforms.",
  heroHighlights: [
    "Monitor share-of-search for branded keywords",
    "Audit sponsored & organic shelf share placements",
    "Track product ratings, reviews & sentiment trends",
    "Extract competitor SKU pricing & promotional data",
    "Benchmark brand visibility across 50+ retail portals",
    "Bypass advanced anti-bot systems on retail platforms",
  ],
  heroImage: "/services/quick-commerce-fmcg-data-scraping/fmcg-hero.svg",
  heroImageAlt: "FMCG data scraping hero illustration",
  heroCtaIcon: Database,

  // Stats section
  stats: [
    { value: "50+", label: "Retail Platforms" },
    { value: "500M+", label: "SKUs Monitored" },
    { value: "99.9%", label: "Data Accuracy" },
    { value: "Real-Time", label: "Data Freshness" },
  ],

  // About/Explanation section
  aboutTitle: "What is FMCG & CPG Data Scraping?",
  aboutDescription:
    "FMCG (Fast-Moving Consumer Goods) data scraping is the systematic, automated extraction of brand visibility metrics, digital shelf performance, pricing intelligence, and consumer sentiment data from retail portals, e-commerce marketplaces, and quick commerce apps. For CPG brands, understanding how products rank organically, how banner ads perform, and how competitor SKUs are priced across hundreds of platforms is critical for digital shelf strategy and retail media investment decisions.",
  aboutBulletPoints: [
    "Track organic and sponsored search positions for branded and category keywords.",
    "Audit banner advertisement placements and promotional compliance at scale.",
    "Monitor product ratings, review counts, and sentiment shifts across platforms.",
    "Extract competitor brand SKU details, pricing, and promotional cadences.",
    "Measure digital shelf share and out-of-stock rates by category and region.",
  ],

  // Detailed Compilation of Data Fields
  dataFieldsTitle: "Structured FMCG & CPG Data Fields",
  dataFieldsDescription:
    "We normalize FMCG data across retail portals, supermarkets, and quick commerce apps into a unified schema ready for analytics.",
  dataFieldsImage:
    "/services/quick-commerce-fmcg-data-scraping/fmcg-data-mockup.svg",
  dataFieldsLeft: [
    "Product Name & Brand",
    "SKU / EAN / Barcode",
    "Organic Search Rank",
    "Sponsored Ad Position",
    "Regular Price",
    "Promotional Price",
    "Discount Percentage",
    "In-Stock Status",
  ],
  dataFieldsRight: [
    "Category & Subcategory",
    "Banner Ad Placement",
    "Star Rating & Review Count",
    "Review Sentiment Score",
    "Product Image URLs",
    "Packaging Size / Weight",
    "Retailer Name & Region",
    "Competitor Brand Mentions",
  ],

  // Powerful Features section
  featuresSectionTitle: "Enterprise Features for FMCG Data Scraping",
  featureBlocks: [
    {
      title: "Share-of-Search & Organic Shelf Rank Tracking",
      description:
        "Know exactly where your brand appears across category search pages on retailer websites and apps. Our scrapers extract paginated search result sets for hundreds of keywords daily to calculate your share-of-search and organic shelf visibility index.",
      image:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-search-rank.svg",
      imageAlt: "Share-of-search and shelf rank illustration",
      bulletPoints: [
        {
          title: "Keyword-Level Position Tracking",
          desc: "Monitor search rank for both branded and category-level consumer search terms.",
        },
        {
          title: "Share-of-Search Calculation",
          desc: "Measure the ratio of search real estate your brand occupies vs. competitors.",
        },
        {
          title: "Category Page Auditing",
          desc: "Track your position within curated category landing pages across platforms.",
        },
      ],
    },
    {
      title: "Sponsored Banner & Retail Media Ad Monitoring",
      description:
        "Retail media investment is growing rapidly. We audit sponsored product listings, category banner placements, and home-page hero ads to verify your media spend is delivering maximum visibility and ensure compliance with retailer agreements.",
      image:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-banner-ads.svg",
      imageAlt: "Banner ad placement monitoring illustration",
      bulletPoints: [
        {
          title: "Sponsored Slot Verification",
          desc: "Confirm your paid placements appear at expected positions during campaign windows.",
        },
        {
          title: "Competitor Ad Intelligence",
          desc: "Track which competitors are running sponsored ads on your category keywords.",
        },
        {
          title: "Banner Creative Auditing",
          desc: "Capture rendered banner creatives to validate brand guidelines are followed.",
        },
      ],
    },
    {
      title: "Product Ratings, Reviews & Sentiment Analysis",
      description:
        "Consumer trust is built on ratings and reviews. We scrape star ratings, review texts, and verified purchase counts across every SKU, enabling sentiment analysis and reputation monitoring at product level.",
      image:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-ratings.svg",
      imageAlt: "Product ratings and reviews illustration",
      bulletPoints: [
        {
          title: "Star Rating Trend Tracking",
          desc: "Monitor rating drift over time to detect quality issues early.",
        },
        {
          title: "Review Text Extraction",
          desc: "Scrape verified review texts for NLP sentiment and topic modelling.",
        },
        {
          title: "Q&A Section Crawling",
          desc: "Extract consumer questions and brand responses to improve product content.",
        },
      ],
    },
    {
      title: "Competitor SKU & Pricing Intelligence",
      description:
        "Keep pace with competitor price moves and promotional activities. We track competitor SKU catalogues, pricing, discount events, and new product launches to feed your pricing and assortment strategy engines.",
      image:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-competitor.svg",
      imageAlt: "Competitor pricing intelligence illustration",
      bulletPoints: [
        {
          title: "Daily Price Change Alerts",
          desc: "Get notified instantly when a competitor adjusts their product pricing.",
        },
        {
          title: "New SKU Launch Detection",
          desc: "Identify competitor product launches and line extensions as they go live.",
        },
        {
          title: "Promo Frequency Analysis",
          desc: "Understand how often competitors run markdowns and seasonal discount events.",
        },
      ],
    },
  ],

  // Benefits section
  benefitsTitle: "Why FMCG Brands Trust Our Data Scraping Services",
  benefits: [
    {
      title: "Optimize Retail Media ROI",
      content:
        "Verify that your sponsored banner and search ad placements are live, correctly positioned, and driving the expected share-of-shelf on every platform you invest in.",
    },
    {
      title: "Win on the Digital Shelf",
      content:
        "Monitor organic search rankings and category page positions across 50+ retailers to identify gaps in shelf visibility and maximize consumer discovery.",
    },
    {
      title: "React Faster to Competitor Moves",
      content:
        "Get daily competitor pricing, promotion, and new SKU intelligence so your revenue management teams can respond faster than ever.",
    },
    {
      title: "Build Stronger Brand Equity",
      content:
        "Aggregate review sentiment, rating trends, and consumer Q&As to proactively address product quality concerns and drive higher conversion rates.",
    },
  ],
  benefitsImage:
    "/services/quick-commerce-fmcg-data-scraping/fmcg-benefits.svg",
  benefitsImageAlt: "FMCG data scraping benefits illustration",

  // Everything You Need section (Grid)
  gridSectionTitle: "Robust FMCG Data Ingestion Pipeline",
  gridSectionDescription:
    "Our enterprise-grade scraping stack handles JavaScript-heavy retail portals, login-gated pricing pages, and complex anti-bot protections at scale.",
  gridFeatures: [
    {
      icon: Sliders,
      title: "Keyword-Level Search Scraping",
      description:
        "Crawl paginated search result pages for hundreds of branded and generic keywords across multiple retail platforms simultaneously.",
    },
    {
      icon: Globe,
      title: "Multi-Region Geo-Targeting",
      description:
        "Query retailer websites from region-specific residential IPs to capture accurate localized pricing and shelf data.",
    },
    {
      icon: Settings,
      title: "Login-Gated Price Extraction",
      description:
        "Access member-only and loyalty pricing pages using authenticated session management and cookie rotation.",
    },
    {
      icon: Zap,
      title: "Real-Time Change Detection",
      description:
        "Trigger instant webhook alerts when critical price, rating, or shelf position changes are detected.",
    },
    {
      icon: Clock,
      title: "Scheduled Campaign Monitoring",
      description:
        "Configure automated scraping campaigns to intensify monitoring during promotional windows and peak retail seasons.",
    },
    {
      icon: Database,
      title: "Structured Data Delivery",
      description:
        "Receive clean, normalized JSON or CSV feeds directly into BigQuery, Snowflake, AWS S3, or your own API endpoint.",
    },
  ],

  // Popular Use Cases section
  useCasesSectionTitle: "Popular FMCG & CPG Data Use Cases",
  useCasesSectionDescription:
    "How leading consumer goods brands, retail media agencies, and market research firms leverage FMCG data at scale.",
  useCases: [
    {
      icon: Search,
      title: "Digital Shelf Audit Automation",
      description:
        "CPG brands replace expensive manual audits with automated daily scraping of search ranks, stock status, and content compliance across all retail partners.",
    },
    {
      icon: BarChart3,
      title: "Revenue Management & Pricing",
      description:
        "Revenue managers ingest daily competitor pricing feeds to fine-tune promotional pricing strategies and protect margin across product lines.",
    },
    {
      icon: Sparkles,
      title: "Retail Media Campaign Verification",
      description:
        "Brand and agency teams verify sponsored search and banner ad placements are live and correctly positioned during campaign flights.",
    },
    {
      icon: Tag,
      title: "Assortment & New Product Tracking",
      description:
        "Category managers track competitor new product launches, SKU expansions, and range deletions to keep their own assortment competitive.",
    },
  ],

  // Platforms section
  platformsSectionTitle: "Extract FMCG Data from Leading Retail Platforms",
  platformsSectionDescription:
    "We scrape product rankings, pricing, banners, and reviews from major global and regional grocery, e-commerce, and quick commerce platforms.",
  platforms: [
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/amazon-fresh.svg",
      name: "Amazon Fresh",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/walmart.svg",
      name: "Walmart",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/ocado.svg",
      name: "Ocado",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/sainsburys.svg",
      name: "Sainsbury's",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/tesco.svg",
      name: "Tesco",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/asda.svg",
      name: "Asda",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/morrisons.svg",
      name: "Morrisons",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/kroger.svg",
      name: "Kroger",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/instacart.svg",
      name: "Instacart",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/carrefour.svg",
      name: "Carrefour",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/albertsons.svg",
      name: "Albertsons",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/target.svg",
      name: "Target",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/costco.svg",
      name: "Costco",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/aldi.svg",
      name: "Aldi",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/lidl.svg",
      name: "Lidl",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/blinkit.svg",
      name: "Blinkit",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/zepto.svg",
      name: "Zepto",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/swiggy-instamart.svg",
      name: "Swiggy Instamart",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/bigbasket.svg",
      name: "BigBasket",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/gorillas.svg",
      name: "Gorillas",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/getir.svg",
      name: "Getir",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/woolworths.svg",
      name: "Woolworths",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/coles.svg",
      name: "Coles",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/flipkart-grocery.svg",
      name: "Flipkart Grocery",
    },
    {
      imagePath:
        "/services/quick-commerce-fmcg-data-scraping/fmcg-icons/jiomart.svg",
      name: "JioMart",
    },
  ],
};
