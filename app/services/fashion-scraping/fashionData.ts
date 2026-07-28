import {
  Sliders,
  Package,
  Camera,
  TrendingDown,
  Clock,
  Database,
  Search,
  Sparkles,
  Globe,
  Tag,
  ShoppingBag,
} from "lucide-react";

export const fashionData = {
  // Hero section
  heroTitlePrefix: "Web Scraping",
  heroTitleHighlight: "Fashion & Apparel",
  heroTitleSuffix: "Product Data",
  heroDescription:
    "Extract real-time fashion catalog listings, trending apparel styles, pricing, variants, and colors from leading global fashion brands and retailers automatically.",
  heroHighlights: [
    "Track clothing sizes, colors & variants",
    "Monitor retail price drops & discounts",
    "Scrape high-res product image URLs",
    "Analyze customer sentiment & reviews",
    "Integrate data feeds into your ERP / BI",
    "Evade anti-bot protection automatically",
  ],
  heroImage: "/services/fashion-scraping/fashion-hero.png",
  heroImageAlt: "Fashion scraping hero illustration",
  heroCtaIcon: ShoppingBag,

  // Stats section
  stats: [
    { value: "300+", label: "Fashion Brands" },
    { value: "99.2%", label: "Variant Accuracy" },
    { value: "5M+", label: "Daily SKUs Monitored" },
    { value: "Hourly", label: "Refresh Available" },
  ],

  // About/Explanation section
  aboutTitle: "What Are Fashion & Apparel Data Scraping Services?",
  aboutDescription:
    "Fashion and apparel data scraping involves the automated extraction of product catalogs, pricing structure, inventory, size-color variants, and user reviews from online fashion stores. These services allow clothing brands, retailers, and market analysts to track style trends, optimize inventory pipelines, and refine pricing strategy dynamically to match shifting consumer demands.",
  aboutBulletPoints: [
    "Monitor size and color availability in real time across global brands.",
    "Track discount frequencies, markdown events, and end-of-season sales.",
    "Acquire product catalogs including attributes like material, fit, and pattern.",
    "Detect fast-moving fashion trends and new arrivals to align supply chain.",
    "Aggregate style images and descriptions for competitive analysis.",
  ],

  // Detailed Compilation of Data Fields
  dataFieldsTitle: "Detailed Compilation of Fashion Data Fields",
  dataFieldsDescription:
    "Our fashion scraper extracts comprehensive, structured data fields to capture the complex taxonomy of clothing, footwear, and accessory items.",
  dataFieldsImage: "/services/fashion-scraping/fashion-data-mockup.png",
  dataFieldsLeft: [
    "Product Name",
    "SKU / Article ID",
    "Brand & Designer",
    "Retail Price",
    "Discounted Price",
    "Size Availability",
    "Color Options",
    "Material & Composition",
    "Fit & Silhouette",
    "Washing Instructions",
  ],
  dataFieldsRight: [
    "High-Res Image URLs",
    "In-Stock Status",
    "Out-of-Stock Variants",
    "Category & Style",
    "Rating Score",
    "Reviews Count",
    "Review Text & Sentiment",
    "Seller Information",
    "Shipping & Delivery details",
    "Return Policies",
  ],

  // Powerful Features section
  featuresSectionTitle: "Powerful Features of Our Fashion Data Scraping Services",
  featureBlocks: [
    {
      title: "Real-Time Variant & SKU Mapping",
      description:
        "Fashion items are highly complex, with each product having dozens of size, color, and fit combinations. Our scrapers map out the full tree of variants for each listing, identifying which color-size combinations are popular and which are out of stock.",
      image: "/services/fashion-scraping/fashion-benefits.png",
      imageAlt: "Variant mapping illustration",
      bulletPoints: [
        {
          title: "Size Availability",
          desc: "Track XS to XXL sizes to know which items sell out fastest.",
        },
        {
          title: "Colorway Mapping",
          desc: "Identify color trends and exact hexadecimal matching where available.",
        },
        {
          title: "Variant-Specific Pricing",
          desc: "Bespoke pricing maps for size or color-based premium adjustments.",
        },
      ],
    },
    {
      title: "Digital Shelf & Visual Auditing",
      description:
        "Acquire high-resolution product imagery and rich descriptive tags automatically. Use image links to power machine learning visual search tools, catalog ingestion systems, or style trend analyzers.",
      image: "/services/fashion-scraping/fashion-benefits.png",
      imageAlt: "Visual auditing illustration",
      bulletPoints: [
        {
          title: "High-Res Image Extraction",
          desc: "Fetch all listing pictures, zoom levels, and color swatches.",
        },
        {
          title: "Structured Taxonomy Attributes",
          desc: "Classify items by cut, neck style, sleeve length, and fabric composition.",
        },
        {
          title: "SEO Meta Fields",
          desc: "Monitor how competitors structure titles, tags, and product descriptions.",
        },
      ],
    },
    {
      title: "Competitor Catalog & Inventory Auditing",
      description:
        "Track competitors' design launch frequencies, product counts, out-of-stock items, and inventory replacement cycles. Get warning signals when a popular design style runs low on stock elsewhere.",
      image: "/services/fashion-scraping/fashion-benefits.png",
      imageAlt: "Catalog auditing illustration",
      bulletPoints: [
        {
          title: "New Arrival Detection",
          desc: "Scan competitor new arrivals daily to track catalog updates.",
        },
        {
          title: "Out of Stock Rates",
          desc: "Understand which size categories are running low or out of stock.",
        },
        {
          title: "Assortment Depth",
          desc: "Benchmark catalog size, categories, and designer brand counts.",
        },
      ],
    },
    {
      title: "Dynamic Pricing & Discount Intel",
      description:
        "Scrape discount structures, active vouchers, category markdowns, and historical pricing logs across platforms. Feed raw data to auto-repricing engines to maintain an edge during seasonal sales.",
      image: "/services/fashion-scraping/fashion-benefits.png",
      imageAlt: "Pricing intelligence illustration",
      bulletPoints: [
        {
          title: "Price History Logs",
          desc: "Track pricing over time to isolate discount baselines.",
        },
        {
          title: "Promo Code Extraction",
          desc: "Extract checkout coupons, buy-one-get-one deals, and loyalty offers.",
        },
        {
          title: "Markdown Frequency",
          desc: "Analyze how long designs stay at full price before markdowns.",
        },
      ],
    },
  ],

  // Benefits section
  benefitsTitle: "Benefits of Our Apparel Scraping Services",
  benefits: [
    {
      title: "Dynamic Pricing & Markdown Alerts",
      content:
        "Understand retail markdown frequency and promotional strategies. React quickly to competitor drops with dynamic pricing configurations that protect margins.",
    },
    {
      title: "Accurate Trend Forecasting",
      content:
        "Analyze new product arrival speeds and style expansions to identify color palettes, fabric choices, and cuts gaining traction in the market.",
    },
    {
      title: "Inventory Pipeline Optimization",
      content:
        "Minimize out-of-stock and overstock issues by monitoring competitor and supplier stock depths at variant level.",
    },
    {
      title: "Consumer Sentiment Analytics",
      content:
        "Synthesize customer feedback and size fit reports to identify quality flaws or sizing discrepancies in competitor collections.",
    },
  ],
  benefitsImage: "/services/fashion-scraping/fashion-benefits.png",
  benefitsImageAlt: "Apparel scraping benefits",

  // Everything You Need section (Grid)
  gridSectionTitle: "Everything You Need from Fashion Data",
  gridSectionDescription:
    "Our apparel data extraction API handles complex website rendering, anti-scraping layers, and multi-country pricing automatically.",
  gridFeatures: [
    {
      icon: Sliders,
      title: "Variant Tree Mapping",
      description:
        "Map size, color, pattern, and regional availability combinations into unified product records.",
    },
    {
      icon: Package,
      title: "Stock Availability Tracking",
      description:
        "Audit stock levels and track velocity of fast-fashion items to predict trends.",
    },
    {
      icon: Camera,
      title: "High-Res Image Harvesting",
      description:
        "Download gallery, thumbnail, and zoom-scale product imagery for catalog ingestion.",
    },
    {
      icon: TrendingDown,
      title: "Markdown & Promo Alerts",
      description:
        "Monitor store-wide discount coupons, flash events, and category markdown timings.",
    },
    {
      icon: Clock,
      title: "Scheduled Extraction Runs",
      description:
        "Schedule hourly catalog crawls during product drops or daily checks for regular changes.",
    },
    {
      icon: Database,
      title: "Clean Data Pipeline Integrations",
      description:
        "Receive standard JSON/CSV output, or push directly into PostgreSQL, Snowflake, or AWS S3.",
    },
  ],

  // Popular Use Cases section
  useCasesSectionTitle: "Popular Use Cases in Fashion Industry",
  useCasesSectionDescription:
    "How retail buyers, designers, and pricing managers leverage apparel web scraping feeds.",
  useCases: [
    {
      icon: Search,
      title: "Competitor Assortment Auditing",
      description:
        "Compare competitor catalog sizes, item additions, product category splits, and designer counts to check gaps.",
    },
    {
      icon: Sparkles,
      title: "Trend Intelligence & Fit Analytics",
      description:
        "Discover trending necklines, hemlines, and fabrics. Audit size feedback to improve pattern measurements.",
    },
    {
      icon: Globe,
      title: "Global Supply Chain Planning",
      description:
        "Track local currency prices and distributor stock levels across North America, Europe, and Asia.",
    },
    {
      icon: Tag,
      title: "Dynamic Promo Management",
      description:
        "Formulate pricing actions based on active discounts, clearance cadences, and seasonal sales calendars.",
    },
  ],

  // Platforms section
  platformsSectionTitle: "Extract Data from Leading Fashion Brands & Marketplaces",
  platformsSectionDescription:
    "We scrape product listings, prices, sizes, and stock details from global fashion retailers.",
  platforms: [
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/flipkart.svg",
    name: "ASOS",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/flipkart.svg",
    name: "Zalando",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/flipkart.svg",
    name: "Zara",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/flipkart.svg",
    name: "H&M",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/flipkart.svg",
    name: "Shein",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/nike.svg",
    name: "Nike",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/adidas.svg",
    name: "Adidas",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/puma.svg",
    name: "Puma",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/uniqlo.svg",
    name: "Uniqlo",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/levi.svg",
    name: "Levi's",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/myntra.svg",
    name: "Myntra",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/ajio.svg",
    name: "AJIO",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/flipkart.svg",
    name: "Flipkart",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/amazon.svg",
    name: "Amazon",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/etsy.svg",
    name: "Etsy",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/ebay.svg",
    name: "eBay",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/aliexpress.svg",
    name: "AliExpress",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/alibaba.svg",
    name: "Alibaba",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/macys.svg",
    name: "Macy's",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/nordstrom.svg",
    name: "Nordstrom",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/sephora.svg",
    name: "Sephora",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/boohoo.svg",
    name: "Boohoo",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/farfetch.svg",
    name: "Farfetch",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/revolve.svg",
    name: "Revolve",
  },
  {
    imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/urban-outfitters.svg",
    name: "Urban Outfitters",
  },
]
};
