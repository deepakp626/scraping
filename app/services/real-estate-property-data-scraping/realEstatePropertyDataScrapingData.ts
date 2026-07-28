import {
  Database,
  Sliders,
  Globe,
  Settings,
  Zap,
  Clock,
  Search,
  BarChart3,
  FileText,
  TrendingUp,
  MapPin,
  Star,
  DollarSign,
  Home,
  Building2,
  Layers,
  ShieldCheck,
} from "lucide-react";

export const realEstatePropertyDataScrapingData = {
  // ── Hero ─────────────────────────────────────────────────────────────
  heroTitlePrefix: "Real Estate &",
  heroTitleHighlight: "Property Data",
  heroTitleSuffix: "Scraping Services",
  heroDescription:
    "Collect structured property listings, price history, rental yields, agent details, and neighbourhood analytics from the world's leading real estate portals. Empower investors, developers, and PropTech platforms with accurate, always-fresh market intelligence.",
  heroHighlights: [
    "Scrape full property listings with photos, specs & floor plans",
    "Track sale & rental price trends across any location or postcode",
    "Extract agent contact details, ratings & transaction history",
    "Monitor days-on-market, price reductions & listing velocity",
    "Capture mortgage rates, stamp duty & ownership cost estimates",
    "Pull neighbourhood data: schools, transport links & crime scores",
    "Decode auction results, sold prices & capital growth timelines",
    "Delivered as clean CSV, JSON or direct database integration",
  ],
  heroImage:
    "/services/real-estate-property-data-scraping/real-estate-hero.svg",
  heroImageAlt: "Real estate property data scraping hero illustration",
  heroCtaIcon: Home,

  // ── Stats ─────────────────────────────────────────────────────────────
  stats: [
    { value: "60+", label: "Property Portals" },
    { value: "150+", label: "Cities Covered" },
    { value: "99.1%", label: "Data Accuracy" },
    { value: "Daily", label: "Price Updates" },
  ],

  // ── About ─────────────────────────────────────────────────────────────
  aboutTitle: "What is Real Estate Property Data Scraping?",
  aboutDescription:
    "Real estate data scraping is the automated collection of structured property information from listing portals, agent websites, auction platforms, and government land registries. It goes far beyond simply copying addresses — it captures the full commercial and analytical layer of the housing market: asking prices vs. sold prices, listing age, price reduction history, rental yield calculations, agent performance metrics, and hyper-local neighbourhood characteristics. Whether you are building a PropTech application, running an investment fund, advising developers, or powering a mortgage marketplace, scraped real estate data gives you the live market intelligence that manual research and paid data subscriptions cannot match for breadth, freshness, or cost.",
  aboutBulletPoints: [
    "Extract complete property listings including price, size, bedrooms, bathrooms, garage, garden, EPC rating, and council tax band.",
    "Track how long each property sits on the market before selling, and model the gap between asking price and final sold price.",
    "Scrape rental listings alongside sale listings to calculate live gross rental yields for any postcode or neighbourhood.",
    "Monitor agent activity — instruction volumes, average selling times, fee structures, and vendor review scores — to qualify estate agents.",
    "Collect sold price records from land registries and auction results to build robust capital growth and valuation datasets.",
  ],

  // ── Data Fields ───────────────────────────────────────────────────────
  dataFieldsTitle: "Property Data Fields We Extract",
  dataFieldsDescription:
    "We normalise listing, pricing, ownership, and neighbourhood data from real estate portals and public land records into a unified schema built for PropTech platforms, investment analysts, and property developers.",
  dataFieldsImage:
    "/services/real-estate-property-data-scraping/real-estate-data-mockup.svg",
  dataFieldsLeft: [
    "Property Address & Postcode",
    "Asking Price & Price History",
    "Number of Bedrooms & Bathrooms",
    "Internal Floor Area (sq ft / sq m)",
    "Property Type (Detached, Flat, etc.)",
    "Tenure (Freehold / Leasehold)",
    "EPC Energy Rating & Score",
    "Council Tax Band & Annual Cost",
  ],
  dataFieldsRight: [
    "Days on Market & Listing Date",
    "Price Reduction Count & Amount",
    "Estimated Rental Yield (%)",
    "Agent Name, Phone & Email",
    "Sold Price & Completion Date",
    "Nearby Schools & Ofsted Rating",
    "Transport Links & Walk Score",
    "Neighbourhood Crime Statistics",
  ],

  // ── Feature Blocks ────────────────────────────────────────────────────
  featuresSectionTitle:
    "Enterprise Features for Real Estate Market Intelligence",
  featureBlocks: [
    {
      title: "Property Listing & Price History Scraping",
      description:
        "Capture every detail of active and historic property listings — from headline asking price and floor plans to price reduction timelines, listing refresh events, and final sold price — giving investors, valuers, and platform builders the full pricing narrative for any property or postcode.",
      image:
        "/services/real-estate-property-data-scraping/real-estate-listing-scraping.svg",
      imageAlt: "Property listing and price history scraping illustration",
      bulletPoints: [
        {
          title: "Full Listing Attribute Extraction",
          desc: "Scrape bedrooms, bathrooms, floor area, property type, tenure, EPC rating, council tax band, parking, garden size, and all photos from every active listing across target portals.",
        },
        {
          title: "Price Reduction & Relisting Tracking",
          desc: "Log every asking-price change, property withdrawal, and relistings event so you can model seller motivation, time-on-market distributions, and discount-to-sold-price gaps by area.",
        },
        {
          title: "Sold Price & Land Registry Integration",
          desc: "Match live listings to historical sold price records from public land registries to calculate realistic capital growth rates and build comparable evidence for valuations.",
        },
      ],
    },
    {
      title: "Rental Yield & Investment Return Analysis",
      description:
        "Combine live rental asking prices with sale listing data to calculate gross and net rental yields at postcode, street, or property-type level — giving buy-to-let investors, fund managers, and mortgage brokers the financial metrics they need to evaluate acquisitions with confidence.",
      image:
        "/services/real-estate-property-data-scraping/real-estate-rental-yield.svg",
      imageAlt: "Rental yield and investment return analysis illustration",
      bulletPoints: [
        {
          title: "Gross Rental Yield Calculation",
          desc: "Pair scraped rental asking prices with concurrent sale prices for identical property types in the same postcode to compute live gross yield percentages at any granularity.",
        },
        {
          title: "Vacancy Rate & Demand Estimation",
          desc: "Track how quickly rental listings are removed from portals to infer local vacancy rates, landlord competition intensity, and tenant demand strength by neighbourhood.",
        },
        {
          title: "Furnished vs. Unfurnished Rent Premium",
          desc: "Compare rental prices across furnished and unfurnished categories to quantify the furnishing premium and help landlords make evidence-backed fit-out investment decisions.",
        },
      ],
    },
    {
      title: "Agent Performance & Market Coverage Intelligence",
      description:
        "Scrape agent instruction volumes, average days-to-sell records, fee disclosures, and vendor review scores across all active estate agents in your target market — enabling comparison platforms, recruitment tools, and developer vendor selection processes to be powered by real performance data.",
      image:
        "/services/real-estate-property-data-scraping/real-estate-agent-intelligence.svg",
      imageAlt: "Estate agent performance and market coverage illustration",
      bulletPoints: [
        {
          title: "Instruction Volume & Market Share",
          desc: "Count how many active and recently sold listings each agent holds in a target area to calculate their market share and identify the dominant players in any postcode.",
        },
        {
          title: "Average Selling Speed Benchmarking",
          desc: "Calculate mean days from first listing to sold status for each agent's portfolio so vendors and comparison sites can rank agents by proven speed of sale.",
        },
        {
          title: "Fee Structure & Review Score Extraction",
          desc: "Collect published fee percentages, minimum fees, tie-in period disclosures, and aggregated vendor review scores to power estate agent comparison and ranking platforms.",
        },
      ],
    },
    {
      title: "Neighbourhood & Location Data Enrichment",
      description:
        "Augment every property record with hyper-local context — Ofsted-rated school distances, public transport walk scores, planning application history, flood risk indicators, and crime rate statistics — so your platform or investment model scores locations as thoroughly as it scores buildings.",
      image:
        "/services/real-estate-property-data-scraping/real-estate-neighbourhood-data.svg",
      imageAlt: "Neighbourhood and location data enrichment illustration",
      bulletPoints: [
        {
          title: "School Proximity & Ofsted Rating Append",
          desc: "Attach the three nearest primary and secondary schools, their latest Ofsted inspection ratings, and walking distances to every property record in your dataset.",
        },
        {
          title: "Transport & Walkability Scoring",
          desc: "Calculate walking times to the nearest train station, bus stops, and high street for every property to support commuter-focused search filtering and location scoring models.",
        },
        {
          title: "Planning & Flood Risk Overlay",
          desc: "Layer planning application history, conservation area status, and Environment Agency flood risk zones onto property records to surface development potential and risk flags.",
        },
      ],
    },
  ],

  // ── Benefits ──────────────────────────────────────────────────────────
  benefitsTitle: "Why Investors & PropTech Platforms Choose Our Data",
  benefits: [
    {
      title: "Make Investment Decisions Backed by Live Market Data",
      content:
        "Stop relying on quarterly reports and dated paid data subscriptions. Our daily-refreshed scraped datasets give you the live asking prices, rental yields, and days-on-market figures you need to move quickly on acquisitions before the market shifts.",
    },
    {
      title: "Build Better PropTech Products Without a Data Team",
      content:
        "Launch your property search, valuation, or mortgage comparison platform without the overhead of building and maintaining your own scraping infrastructure. Receive clean, structured property feeds that plug directly into your database or API layer.",
    },
    {
      title: "Identify Undervalued Pockets Before They Go Mainstream",
      content:
        "Cross-reference listing volumes, price trends, transport improvement timelines, and school catchment changes to surface emerging neighbourhoods where capital growth potential is high but prices have not yet responded — giving your fund or portfolio a structural edge.",
    },
    {
      title: "Qualify and Track Agent Performance at Scale",
      content:
        "Power estate agent comparison platforms, developer vendor selection tools, and recruitment dashboards with verified agent performance data — instruction volumes, average selling times, fee structures — scraped continuously from live portals.",
    },
  ],
  benefitsImage:
    "/services/real-estate-property-data-scraping/real-estate-benefits.svg",
  benefitsImageAlt:
    "Real estate property data scraping benefits illustration",

  // ── Grid Features ─────────────────────────────────────────────────────
  gridSectionTitle: "Built for Real Estate Portal Complexity",
  gridSectionDescription:
    "Property portals are among the most scraping-resistant websites on the internet — aggressive bot detection, infinite scroll listings, postcode-gated search results, and daily anti-scraping infrastructure updates. Our stack is purpose-built for this environment.",
  gridFeatures: [
    {
      icon: Sliders,
      title: "Postcode-Level Geo-Targeting",
      description:
        "Query each portal from residential IPs matched to specific postcodes or ZIP codes to retrieve hyper-local listings, price data, and neighbourhood analytics that generic datacenter IPs cannot access.",
    },
    {
      icon: Globe,
      title: "Multi-Portal Normalisation",
      description:
        "Scrape Rightmove, Zoopla, OnTheMarket, Zillow, Realtor.com, Domain, and 50+ regional portals and normalise all listing fields into a single unified schema for instant cross-portal analysis.",
    },
    {
      icon: Settings,
      title: "Anti-Bot Bypass Infrastructure",
      description:
        "Navigate CAPTCHA challenges, browser fingerprinting checks, session-token requirements, and IP rate limits using stealth browser automation and residential proxy rotation purpose-built for real estate portals.",
    },
    {
      icon: Zap,
      title: "Price Change & New Listing Alerts",
      description:
        "Receive instant webhook or email notifications the moment a property in your watchlist reduces its asking price, gets relisted, or a new instruction matching your criteria appears on a target portal.",
    },
    {
      icon: Clock,
      title: "Flexible Scraping Cadence",
      description:
        "Configure data collection from real-time new listing monitoring and hourly price checks to weekly full-market crawls — matched to your analytical or platform use case and budget.",
    },
    {
      icon: Database,
      title: "BI-Ready Structured Delivery",
      description:
        "Receive clean, deduplicated property records delivered as JSON or CSV feeds, or piped directly into BigQuery, Snowflake, Redshift, or your own PostgreSQL instance with no manual processing.",
    },
  ],

  // ── Use Cases ─────────────────────────────────────────────────────────
  useCasesSectionTitle: "Who Uses Real Estate Property Data",
  useCasesSectionDescription:
    "How property investors, PropTech platforms, mortgage brokers, developers, and research firms put scraped real estate data to work every day.",
  useCases: [
    {
      icon: DollarSign,
      title: "Buy-to-Let Investment Analysis",
      description:
        "Individual and institutional buy-to-let investors use live rental yield data, vacancy rate indicators, and capital growth trend lines to identify the strongest income-generating postcodes before committing acquisition capital.",
    },
    {
      icon: TrendingUp,
      title: "PropTech Platform Data Feeds",
      description:
        "Property search engines, AVM valuation tools, and mortgage comparison platforms ingest our continuously updated listing feeds to power their search indexes, automated valuations, and affordability calculators.",
    },
    {
      icon: MapPin,
      title: "Developer Site Identification & Due Diligence",
      description:
        "Residential developers use planning history, listing density maps, and pricing trend data to identify underutilised land parcels, validate GDV assumptions, and benchmark competitor scheme pricing before acquiring sites.",
    },
    {
      icon: BarChart3,
      title: "Real Estate Fund Due Diligence & Research",
      description:
        "Private equity real estate funds and REITs use scraped sold price histories, rental trend data, and market supply velocity metrics to validate asset valuations, underwrite acquisitions, and monitor portfolio performance.",
    },
  ],

  // ── Platforms ─────────────────────────────────────────────────────────
  platformsSectionTitle: "Property Portals We Scrape",
  platformsSectionDescription:
    "We extract listing data, sold prices, rental yields, and agent details from the world's leading property portals across the UK, USA, Australia, Europe, the Middle East, and Southeast Asia.",
  platforms: [
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/rightmove.svg",
      name: "Rightmove",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/zoopla.svg",
      name: "Zoopla",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/onthemarket.svg",
      name: "OnTheMarket",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/zillow.svg",
      name: "Zillow",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/realtor.svg",
      name: "Realtor.com",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/redfin.svg",
      name: "Redfin",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/domain.svg",
      name: "Domain",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/realestate-com-au.svg",
      name: "REA Group",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/immobilienscout24.svg",
      name: "ImmoScout24",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/seloger.svg",
      name: "SeLoger",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/idealista.svg",
      name: "Idealista",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/bayut.svg",
      name: "Bayut",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/propertyfinder.svg",
      name: "Property Finder",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/99acres.svg",
      name: "99acres",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/magicbricks.svg",
      name: "MagicBricks",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/housing.svg",
      name: "Housing.com",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/iproperty.svg",
      name: "iProperty",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/propertyguru.svg",
      name: "PropertyGuru",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/funda.svg",
      name: "Funda",
    },
    {
      imagePath:
        "/services/real-estate-property-data-scraping/platform-icons/loopnet.svg",
      name: "LoopNet",
    },
  ],
};
