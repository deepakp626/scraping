import {
  Store,
  Sliders,
  Globe,
  Settings,
  Zap,
  Clock,
  Database,
  Search,
  Sparkles,
  Tag,
} from "lucide-react";

export const groceryScrapingData = {
  // Hero section
  heroTitlePrefix: "Web Scraping for",
  heroTitleHighlight: "Grocery & Supermarket",
  heroTitleSuffix: "Data",
  heroDescription:
    "Extract localized supermarket item pricing, dynamic stock inventory, promotions, and product catalogs down to zip-code levels automatically.",
  heroHighlights: [
    "ZIP-code level price monitoring",
    "Track inventory levels & out-of-stock items",
    "Extract promotional pricing & digital coupons",
    "Scan SKU lists, barcodes & nutritional information",
    "Scale scraping across regional stores & delivery apps",
    "Bypass anti-bot systems & regional firewalls seamlessly",
  ],
  heroImage: "/services/grocery-scraping/grocery-hero.png",
  heroImageAlt: "Grocery scraping hero illustration",
  heroCtaIcon: Store,

  // Stats section
  stats: [
    { value: "100+", label: "Supermarket Brands" },
    { value: "99.95%", label: "Pipeline Success Rate" },
    { value: "15M+", label: "Daily Items Monitored" },
    { value: "Zip-Level", label: "Location Precision" },
  ],

  // About/Explanation section
  aboutTitle: "What is Grocery & Supermarket Data Scraping?",
  aboutDescription:
    "Grocery data scraping is the automated extraction of supermarket catalogs, localized pricing, stock counts, discounts, and item details from ecommerce portals, supermarket sites, and quick-delivery applications. Since prices vary heavily by location, our scraping pipeline queries data relative to specific physical branches and ZIP codes, feeding dynamic yield engines and market monitors.",
  aboutBulletPoints: [
    "Track localized grocery prices, including regional store variances.",
    "Collect SKU details, UPC barcodes, ingredient lists, and nutritional facts.",
    "Monitor stock levels and out-of-stock events to analyze supply chain gaps.",
    "Extract digital coupons, BOGO deals, multi-buy discounts, and loyalty pricing.",
    "Ingest data from quick commerce instant-delivery apps on sub-hour cycles.",
  ],

  // Detailed Compilation of Data Fields
  dataFieldsTitle: "Comprehensive Grocery Data Fields We Extract",
  dataFieldsDescription:
    "We parse complex grocery listings into highly structured, schema-compliant data feeds for instant analysis.",
  dataFieldsImage: "/services/grocery-scraping/grocery-data-mockup.png",
  dataFieldsLeft: [
    "Product Name & Brand",
    "SKU / UPC Barcode",
    "Store Location & ZIP Code",
    "Regular Price",
    "Sale & Promo Price",
    "Discount Percentage",
    "Inventory Stock Level",
    "Out of Stock Status",
  ],
  dataFieldsRight: [
    "Category & Subcategory Hierarchy",
    "Package Size / Weight (e.g. oz, grams)",
    "Nutritional Information & Calories",
    "Allergens & Dietary Tags",
    "Ingredients List",
    "Active Promotions & BOGO",
    "User Ratings & Reviews Count",
    "Product Image URL",
  ],

  // Powerful Features section
  featuresSectionTitle: "Enterprise Features for Grocery Scrapers",
  featureBlocks: [
    {
      title: "ZIP-Code Level Scraping and Localized Pricing",
      description:
        "Grocery pricing fluctuates dramatically across states, cities, and zip codes due to regional logistics, taxes, and local competition. Our scraping infrastructure simulates local search sessions from target coordinates.",
      image: "/services/grocery-scraping/grocery-zipcode.png",
      imageAlt: "ZIP-code level scraping illustration",
      bulletPoints: [
        {
          title: "Location Coordinates Spanning",
          desc: "Extract pricing exactly as seen by customers at specific local store branches.",
        },
        {
          title: "Proxy-Based Geo-Targeting",
          desc: "Use residential IP networks matching target store-locator coordinates.",
        },
        {
          title: "Delivery Zip-Code Mapping",
          desc: "Collect instant delivery pricing from platforms like Instacart down to local warehouses.",
        },
      ],
    },
    {
      title: "Real-Time Inventory Tracking & Out-of-Stock Alerts",
      description:
        "Avoid supply chain blindness. Track product availability, digital shelf shares, and out-of-stock rates to optimize stock levels and monitor competitors.",
      image: "/services/grocery-scraping/grocery-inventory.png",
      imageAlt: "Inventory and stock alert illustration",
      bulletPoints: [
        {
          title: "Out-of-Stock Rate Tracking",
          desc: "Measure product displacement and catalog changes in real time.",
        },
        {
          title: "Stock Quantity Approximations",
          desc: "Scrape inventory depth by checking max order thresholds.",
        },
        {
          title: "Share of Voice & Shelf Share",
          desc: "Calculate brand visibility indexes for organic category listings.",
        },
      ],
    },
    {
      title: "Promotions, Coupons & Discount Monitoring",
      description:
        "Supermarket promotions change on weekly cycles. We capture promotional mechanics, digital coupons, and store-specific markups automatically.",
      image: "/services/grocery-scraping/grocery-promotions.svg",
      imageAlt: "Promotions and discounts illustration",
      bulletPoints: [
        {
          title: "Loyalty Card Program Pricing",
          desc: "Extract hidden member-only prices and loyalty discounts.",
        },
        {
          title: "Multibuy Promo Tracking",
          desc: "Detect buy-one-get-one, mix-and-match, and bulk discounts.",
        },
        {
          title: "Dynamic Coupon Scraping",
          desc: "Audit digital coupon codes and barcode clip values.",
        },
      ],
    },
  ],

  // Benefits section
  benefitsTitle: "Why Choose Our Grocery Web Scraping Services?",
  benefits: [
    {
      title: "Precise Local Pricing Feeds",
      content:
        "Optimize your product pricing strategy by monitoring store-by-store prices, discounts, and regional discrepancies. Increase margins and stay ahead of competitor updates.",
    },
    {
      title: "Assortment & Stock Auditing",
      content:
        "Identify assortment gaps and high out-of-stock categories to optimize your supply chains and capture unmet consumer demand.",
    },
    {
      title: "Digital Shelf Insights",
      content:
        "Monitor your brand's shelf space share, organic visibility, and search ranks on supermarkets and quick delivery platforms.",
    },
    {
      title: "Efficient Promotion Optimization",
      content:
        "Deconstruct competitor promotional cycles (weekly flyers, flash sales, discount coupons) to build smarter marketing campaigns.",
    },
  ],
  benefitsImage: "/services/grocery-scraping/grocery-benefits.svg",
  benefitsImageAlt: "Grocery scraping benefits illustration",

  // Everything You Need section (Grid)
  gridSectionTitle: "State-of-the-Art Grocery Scraping Engine",
  gridSectionDescription:
    "Our enterprise pipeline bypasses anti-bot defenses, handles complex geographic location parameters, and handles high-frequency data ingestion.",
  gridFeatures: [
    {
      icon: Sliders,
      title: "Advanced Location Querying",
      description:
        "Query grocery websites with accurate coordinates, zip codes, and specific physical store branch selectors.",
    },
    {
      icon: Globe,
      title: "Smart Geo-Proxies",
      description:
        "Route scraping queries through exact residential locations matching targeted grocery store branches.",
    },
    {
      icon: Settings,
      title: "Nutrition & Allergen Mapping",
      description:
        "Acquire full nutrient indexes, ingredient specifications, and dietary tags (e.g., vegan, gluten-free).",
    },
    {
      icon: Zap,
      title: "Sub-Hour Quick Commerce scans",
      description:
        "Query instant delivery platforms multiple times an hour to track rapid stock depletion.",
    },
    {
      icon: Clock,
      title: "Custom Scheduled Sweeps",
      description:
        "Run scrapers weekly for pricing updates, daily for inventory changes, or on custom event triggers.",
    },
    {
      icon: Database,
      title: "Seamless Cloud Integration",
      description:
        "Ingest raw databases straight into AWS S3, Google Cloud, Snowflake, or custom API endpoints.",
    },
  ],

  // Popular Use Cases section
  useCasesSectionTitle: "Popular Grocery Data Use Cases",
  useCasesSectionDescription:
    "See how retailers, CPG brands, and price aggregators utilize scraped grocery datasets.",
  useCases: [
    {
      icon: Search,
      title: "Competitor Pricing Benchmarking",
      description:
        "Supermarket chains analyze competitor local prices to adjust pricing dynamically, maintaining a low-cost image or boosting margins.",
    },
    {
      icon: Sparkles,
      title: "CPG Digital Shelf Audit",
      description:
        "Consumer packaged goods (CPG) brands monitor product placements, out-of-stock events, and sponsored ad compliance on retailer portals.",
    },
    {
      icon: Globe,
      title: "Delivery Platform Aggregator",
      description:
        "Delivery apps and price comparison tools fetch accurate catalogs and live pricing to ensure consistency across their platforms.",
    },
    {
      icon: Tag,
      title: "Coupon & Promo Syndication",
      description:
        "Marketing firms and cash-back platforms compile active grocery coupons, discounts, and flyer deals automatically.",
    },
  ],

  // Platforms section
  platformsSectionTitle: "Extract Data from Top Grocery Platforms",
  platformsSectionDescription:
    "We scrape product lists, prices, options, and locations from leading physical supermarkets and quick delivery platforms.",
  platforms: [
    {
      imagePath: "/services/grocery-scraping/grocery-icons/walmart.svg",
      name: "Walmart Grocery",
    },
    {
      imagePath: "/services/grocery-scraping/grocery-icons/kroger.svg",
      name: "Kroger",
    },
    {
      imagePath: "/services/grocery-scraping/grocery-icons/tesco.svg",
      name: "Tesco",
    },
    {
      imagePath: "/services/grocery-scraping/grocery-icons/carrefour.svg",
      name: "Carrefour",
    },
    {
      imagePath: "/services/grocery-scraping/grocery-icons/instacart.svg",
      name: "Instacart",
    },
    {
      imagePath: "/services/grocery-scraping/grocery-icons/woolworths.svg",
      name: "Woolworths",
    },
    {
      imagePath: "/services/grocery-scraping/grocery-icons/target.svg",
      name: "Target",
    },
    {
      imagePath: "/services/grocery-scraping/grocery-icons/aldi.svg",
      name: "Aldi",
    },
  ],
};
