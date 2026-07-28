import {
  Car,
  MapPin,
  Shield,
  Sliders,
  Globe,
  Settings,
  Clock,
  Database,
  Search,
  Sparkles,
  Tag,
} from "lucide-react";

export const carRentalData = {
  // Hero section
  heroTitlePrefix: "Web Scraping for",
  heroTitleHighlight: "Car Rental & Fleet",
  heroTitleSuffix: "Data",
  heroDescription:
    "Scrape real-time rental rates, availability, vehicle specs, and locations from leading car rental providers and travel search engines automatically.",
  heroHighlights: [
    "Geo-targeted rates & comparison monitoring",
    "Track vehicle models, classes & options",
    "Monitor pick-up & drop-off locations",
    "Extract insurance & additional package details",
    "Bypass anti-bot & geo-blocking effortlessly",
    "Scheduled crawls with live webhook updates",
  ],
  heroImage: "/services/car-rental-data-scraping/car-rental-hero.png",
  heroImageAlt: "Car Rental scraping hero illustration",
  heroCtaIcon: Car,

  // Stats section
  stats: [
    { value: "50+", label: "Rental Sites Scraped" },
    { value: "99.9%", label: "Scraping Uptime" },
    { value: "2M+", label: "Daily Rates Extracted" },
    { value: "Real-Time", label: "Availability Checks" },
  ],

  // About/Explanation section
  aboutTitle: "What is Car Rental Data Scraping?",
  aboutDescription:
    "Car rental data scraping is the automated process of extracting rental car availability, pricing, models, locations, and policy structures from car rental companies and travel search platforms. This data helps competitors, travel agencies, and aggregator platforms monitor the market, adjust pricing strategies, and discover demand trends across global pickup regions.",
  aboutBulletPoints: [
    "Track daily base rates, taxes, surcharge fees, and full-insurance additions.",
    "Monitor fleet sizes and classes (Economy, SUV, Luxury, EV) across cities.",
    "Obtain rental details like fuel policies, mileage limits, and age restrictions.",
    "Compare booking rates dynamically based on pickup-to-return duration.",
    "Feed raw datasets into price yield management tools in real time.",
  ],

  // Detailed Compilation of Data Fields
  dataFieldsTitle: "Comprehensive Car Rental Data Fields We Extract",
  dataFieldsDescription:
    "We extract rich, structured fields to capture every aspect of a vehicle rental offer, enabling detailed comparative analysis.",
  dataFieldsImage: "/services/car-rental-data-scraping/car-rental-data-mockup.png",
  dataFieldsLeft: [
    "Vehicle Brand & Model",
    "Car Rental Provider",
    "Vehicle Class (e.g., Economy, SUV)",
    "Daily Rental Rate",
    "Total Estimate Price",
    "Currency Type",
    "Pickup Location & Code",
    "Drop-off Location & Code",
    "Pickup Date & Time",
    "Drop-off Date & Time",
  ],
  dataFieldsRight: [
    "Passenger Capacity",
    "Luggage Capacity (Bags)",
    "Transmission (Manual/Auto)",
    "Fuel Type (Gas, Diesel, EV)",
    "Fuel Policy (e.g., Full to Full)",
    "Mileage Allowance (Unlimited/Limit)",
    "Included Insurance Packages",
    "Cancellation Policy",
    "Customer Rating & Reviews",
    "Latitude/Longitude Coordinates",
  ],

  // Powerful Features section
  featuresSectionTitle: "Powerful Features of Our Car Rental Scrapers",
  featureBlocks: [
    {
      title: "Geo-Targeted Pricing and Multi-Location Scraping",
      description:
        "Rental rates fluctuate heavily depending on the pickup branch and the user's IP location. Our scrapers utilize high-quality proxy networks to scan rates across thousands of airports and city locations worldwide.",
      image: "/services/car-rental-data-scraping/car-rental-benefits.png",
      imageAlt: "Geo-targeted scraping illustration",
      bulletPoints: [
        {
          title: "Airport vs. Off-Airport Branch Analysis",
          desc: "Compare premium airport surcharges with neighborhood pickup rates.",
        },
        {
          title: "IP Location Arbitrage",
          desc: "Identify international vs. domestic renter price discrepancies.",
        },
        {
          title: "Coordinate Mapping",
          desc: "Fetch exact locations, operation hours, and branch contacts.",
        },
      ],
    },
    {
      title: "Fleet Specifications and Category Mapping",
      description:
        "We normalize vehicle information across providers to ensure consistent classifications. Make standard comparisons between Hertz, Avis, and Enterprise groups easily.",
      image: "/services/car-rental-data-scraping/car-rental-fleet.png",
      imageAlt: "Fleet category mapping illustration",
      bulletPoints: [
        {
          title: "ACRISS Code Categorization",
          desc: "Classify vehicles using standard industry coding (e.g. CDMR, IFMR).",
        },
        {
          title: "Specs Extraction",
          desc: "Track transmission, fuel/battery specs, door counts, and amenities.",
        },
        {
          title: "EV Availability Tracking",
          desc: "Monitor hybrid and electric vehicle transition rates across fleets.",
        },
      ],
    },
    {
      title: "Dynamic Price & Yield Intelligence",
      description:
        "Track price sensitivity based on booking windows, seasonality, and occupancy levels. Empower yield engines with clean, high-frequency rental feeds.",
      image: "/services/car-rental-data-scraping/car-rental-pricing.png",
      imageAlt: "Yield intelligence illustration",
      bulletPoints: [
        {
          title: "Booking Window Analysis",
          desc: "Scrape rates for rentals 1 day, 7 days, 30 days, or 90 days out.",
        },
        {
          title: "Duration Discounting Tracking",
          desc: "Identify weekend promos, weekly discount rates, and long-term rental pricing.",
        },
        {
          title: "Fee Breakdown Extraction",
          desc: "Isolate airport taxes, young driver surcharges, and local fees.",
        },
      ],
    },
  ],

  // Benefits section
  benefitsTitle: "Why Use Our Car Rental Web Scraping Services?",
  benefits: [
    {
      title: "Real-Time Dynamic Pricing",
      content:
        "Optimize fleet yield management by tracking competitor rate changes instantly. Adjust your pricing dynamically to boost occupancy and profit margins.",
    },
    {
      title: "Market Demand & Fleet Intelligence",
      content:
        "Track fleet deployment and out-of-stock rates across competitive brands to discover which vehicle classes are in highest demand at specific hubs.",
    },
    {
      title: "Travel Aggregator Feeding",
      content:
        "Ensure accurate, updated price parity across booking systems, tour agencies, and travel comparison websites via clean, automated data feeds.",
    },
    {
      title: "Seamless Policy Comparison",
      content:
        "Gather granular intelligence on fuel guidelines, rental requirements, deposit amounts, and insurance coverage trends in the rental sector.",
    },
  ],
  benefitsImage: "/services/car-rental-data-scraping/car-rental-benefits.png",
  benefitsImageAlt: "Car rental scraping benefits illustration",

  // Everything You Need section (Grid)
  gridSectionTitle: "Everything You Need from Rental Data",
  gridSectionDescription:
    "Our enterprise-level data pipeline automates the complex extraction challenges unique to travel and car rental search websites.",
  gridFeatures: [
    {
      icon: Sliders,
      title: "Granular Search Queries",
      description:
        "Specify pick-up, drop-off locations, precise date ranges, times, and preferred rental companies.",
    },
    {
      icon: MapPin,
      title: "Geo-Proxy Precision",
      description:
        "Scrape localized prices exactly as seen by customers at specific airport counters or downtown garages.",
    },
    {
      icon: Settings,
      title: "Fleet Specifications Tracker",
      description:
        "Capture passenger numbers, luggage room, air conditioning, and transmission details automatically.",
    },
    {
      icon: Shield,
      title: "Add-on Surcharges Auditor",
      description:
        "Extract cost of child seats, additional drivers, GPS units, and optional insurance policies.",
    },
    {
      icon: Clock,
      title: "Scheduled High-Frequency Runs",
      description:
        "Run scraper sweeps multiple times daily during holiday spikes or weekly during low-demand periods.",
    },
    {
      icon: Database,
      title: "Clean API/S3 Integrations",
      description:
        "Access structured, cleaned data in CSV/JSON, or ingest via S3, BigQuery, or Snowflake dashboards.",
    },
  ],

  // Popular Use Cases section
  useCasesSectionTitle: "Popular Car Rental Use Cases",
  useCasesSectionDescription:
    "How travel agencies, booking systems, and rental operators harness car rental web scraping data.",
  useCases: [
    {
      icon: Search,
      title: "Competitor Rate Benchmarking",
      description:
        "Car rental companies compare their prices across categories against Hertz, Avis, and local vendors in real-time to adjust pricing models.",
    },
    {
      icon: Sparkles,
      title: "Aggregator Integration",
      description:
        "Compare pricing on aggregation platforms to check if your direct rates match the OTA (Online Travel Agency) listings.",
    },
    {
      icon: Globe,
      title: "Global Travel Indexing",
      description:
        "Analyze general travel demand and mobility indices across countries by tracking vehicle fleet availability and base rates.",
    },
    {
      icon: Tag,
      title: "Promotional Tracking",
      description:
        "Scrape promotional discount codes and active loyalty discounts offered by major car rental providers.",
    },
  ],

  // Platforms section
  platformsSectionTitle: "Extract Data from Major Car Rental Platforms & OTAs",
  platformsSectionDescription:
    "We scrape product listings, prices, sizes, and stock details from global car rental providers and travel comparison sites.",
  platforms: [
    {
      imagePath: "/services/car-rental-data-scraping/car-rental-icons/hertz.svg",
      name: "Hertz",
    },
    {
      imagePath: "/services/car-rental-data-scraping/car-rental-icons/avis.svg",
      name: "Avis",
    },
    {
      imagePath: "/services/car-rental-data-scraping/car-rental-icons/enterprise.svg",
      name: "Enterprise",
    },
    {
      imagePath: "/services/car-rental-data-scraping/car-rental-icons/sixt.svg",
      name: "Sixt",
    },
    {
      imagePath: "/services/car-rental-data-scraping/car-rental-icons/budget.svg",
      name: "Budget",
    },
    {
      imagePath: "/services/car-rental-data-scraping/car-rental-icons/national.svg",
      name: "National",
    },
    {
      imagePath: "/services/car-rental-data-scraping/car-rental-icons/alamo.svg",
      name: "Alamo",
    },
    {
      imagePath: "/services/car-rental-data-scraping/car-rental-icons/kayak.svg",
      name: "Kayak",
    },
    {
      imagePath: "/services/car-rental-data-scraping/car-rental-icons/expedia.svg",
      name: "Expedia",
    },
    {
      imagePath: "/services/car-rental-data-scraping/car-rental-icons/rentalcars.svg",
      name: "Rentalcars.com",
    },
  ],
};
