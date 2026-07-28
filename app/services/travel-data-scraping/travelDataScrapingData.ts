import {
  Database,
  Sliders,
  Globe,
  Settings,
  Zap,
  Clock,
  Search,
  Sparkles,
  Map,
  BarChart3,
  Plane,
} from "lucide-react";

export const travelDataScrapingData = {
  // Hero section
  heroTitlePrefix: "Web Scraping for",
  heroTitleHighlight: "Travel & Tourism",
  heroTitleSuffix: "Data",
  heroDescription:
    "Extract real-time flight fares, hotel rates, tour packages, vacation rentals, and traveler reviews from OTAs, airline portals, and hotel booking platforms to fuel pricing intelligence and demand forecasting.",
  heroHighlights: [
    "Monitor live flight fares across 100+ airlines and GDS channels",
    "Track hotel room rates, availability & occupancy patterns",
    "Scrape tour package pricing from global OTAs",
    "Extract vacation rental listings and nightly rates",
    "Aggregate traveler reviews and sentiment from booking platforms",
    "Bypass advanced anti-bot systems on travel portals",
  ],
  heroImage: "/services/travel-data-scraping/travel-hero.svg",
  heroImageAlt: "Travel data scraping hero illustration",
  heroCtaIcon: Plane,

  // Stats section
  stats: [
    { value: "100+", label: "Travel Platforms" },
    { value: "1B+", label: "Fares Tracked Monthly" },
    { value: "99.9%", label: "Data Accuracy" },
    { value: "Real-Time", label: "Data Freshness" },
  ],

  // About/Explanation section
  aboutTitle: "What is Travel Data Scraping?",
  aboutDescription:
    "Travel data scraping is the automated extraction of flight prices, hotel availability, vacation package deals, car rental rates, and traveler review data from online travel agencies (OTAs), airline booking systems, hotel portals, and review platforms. Airlines, hotels, travel aggregators, and revenue management teams rely on scraped travel data to benchmark competitor pricing, optimize dynamic fare strategies, understand demand patterns, and personalize travel recommendations at scale.",
  aboutBulletPoints: [
    "Extract historical and real-time airfare trends across routes and cabin classes.",
    "Monitor hotel room pricing, rate parity, and minimum stay requirements.",
    "Scrape tour package availability, inclusions, and seasonal pricing variations.",
    "Aggregate vacation rental nightly rates and host policies by destination.",
    "Collect traveler reviews, ratings, and sentiment from multiple booking platforms.",
  ],

  // Detailed Compilation of Data Fields
  dataFieldsTitle: "Structured Travel Data Fields",
  dataFieldsDescription:
    "We normalize travel data from OTAs, airline portals, and hotel booking engines into a unified schema ready for analytics and revenue management pipelines.",
  dataFieldsImage: "/services/travel-data-scraping/travel-data-mockup.svg",
  dataFieldsLeft: [
    "Flight Route & Airline",
    "Departure & Arrival Time",
    "Cabin Class & Fare Type",
    "Ticket Price & Taxes",
    "Baggage Allowance",
    "Number of Stops",
    "Hotel Name & Star Rating",
    "Room Type & Rate Plan",
  ],
  dataFieldsRight: [
    "Hotel Amenities & Policies",
    "Occupancy & Availability",
    "Tour Package Inclusions",
    "Destination & Duration",
    "Vacation Rental Nightly Rate",
    "Car Rental Class & Rate",
    "Review Score & Count",
    "Review Text & Sentiment",
  ],

  // Powerful Features section
  featuresSectionTitle: "Enterprise Features for Travel Data Scraping",
  featureBlocks: [
    {
      title: "Real-Time Flight Fare Tracking",
      description:
        "Monitor airfare fluctuations across thousands of routes, airlines, and booking classes in real time. Our scrapers handle dynamic pricing engines, JavaScript-rendered search results, and session-based fare locking to deliver accurate, timestamped fare data for every query.",
      image: "/services/travel-data-scraping/travel-flight-fares.svg",
      imageAlt: "Flight fare tracking illustration",
      bulletPoints: [
        {
          title: "Multi-Route Fare Monitoring",
          desc: "Track departure and return fares across hundreds of routes simultaneously from multiple airline and OTA sources.",
        },
        {
          title: "Cabin Class Breakdown",
          desc: "Extract economy, premium economy, business, and first-class fares with full baggage and ancillary fee details.",
        },
        {
          title: "Historical Fare Indexing",
          desc: "Build time-series fare databases to identify price trends, booking windows, and demand seasonality.",
        },
      ],
    },
    {
      title: "Hotel Rate Parity & Availability Scraping",
      description:
        "Ensure rate parity and uncover pricing inconsistencies across OTAs and direct hotel channels. We scrape room rates, cancellation policies, minimum stay requirements, and availability calendars across global hotel inventory at scale.",
      image: "/services/travel-data-scraping/travel-hotel-rates.svg",
      imageAlt: "Hotel rate parity monitoring illustration",
      bulletPoints: [
        {
          title: "Rate Parity Auditing",
          desc: "Detect and flag rate disparities between OTAs, metasearch engines, and direct hotel booking channels.",
        },
        {
          title: "Occupancy Calendar Extraction",
          desc: "Scrape property availability calendars to assess competitor occupancy patterns by date and season.",
        },
        {
          title: "Room Type & Policy Mapping",
          desc: "Extract detailed room specifications, bed configurations, and cancellation policy data per rate plan.",
        },
      ],
    },
    {
      title: "Tour Package & Vacation Rental Intelligence",
      description:
        "Stay ahead of competitor tour operators and vacation rental hosts by monitoring package inclusions, nightly rates, property amenities, and promotional offers across global booking platforms and listing aggregators.",
      image: "/services/travel-data-scraping/travel-packages.svg",
      imageAlt: "Tour packages and vacation rental illustration",
      bulletPoints: [
        {
          title: "Package Inclusion Extraction",
          desc: "Scrape tour itineraries, inclusions, exclusions, and pricing tiers from global and regional package operators.",
        },
        {
          title: "Vacation Rental Rate Monitoring",
          desc: "Track nightly, weekly, and monthly rates for vacation rentals across Airbnb, Vrbo, Booking.com, and regional platforms.",
        },
        {
          title: "Seasonal Pricing Analysis",
          desc: "Identify peak season pricing patterns, minimum stay rules, and early-bird promotional discounts.",
        },
      ],
    },
    {
      title: "Traveler Reviews & Sentiment Analytics",
      description:
        "Aggregate thousands of traveler reviews, star ratings, response times, and verified guest feedback from leading booking platforms, review aggregators, and meta-search sites to fuel reputation management and product improvement strategies.",
      image: "/services/travel-data-scraping/travel-reviews.svg",
      imageAlt: "Traveler reviews and sentiment illustration",
      bulletPoints: [
        {
          title: "Multi-Platform Review Aggregation",
          desc: "Collect reviews from TripAdvisor, Google Travel, Booking.com, Expedia, and Airbnb in a unified schema.",
        },
        {
          title: "Sentiment Score Analysis",
          desc: "Process extracted review texts through NLP pipelines to quantify category-level guest satisfaction scores.",
        },
        {
          title: "Competitor Review Benchmarking",
          desc: "Compare your property or airline ratings against direct competitors over rolling time periods.",
        },
      ],
    },
  ],

  // Benefits section
  benefitsTitle: "Why Travel Brands Trust Our Data Scraping Services",
  benefits: [
    {
      title: "Optimize Revenue Management",
      content:
        "Feed real-time competitor fare and rate data into your revenue management system to make dynamic pricing decisions that maximize yield across every booking channel.",
    },
    {
      title: "Enforce Rate Parity",
      content:
        "Automatically detect and alert on rate parity violations across all OTAs and metasearch channels before they erode your direct booking strategy.",
    },
    {
      title: "Understand Market Demand",
      content:
        "Analyze competitor availability calendars, search frequency trends, and seasonal demand shifts to plan inventory and capacity more effectively.",
    },
    {
      title: "Enhance Guest Experience",
      content:
        "Mine traveler reviews at scale to identify recurring pain points, surface unmet expectations, and benchmark your service quality against the competition.",
    },
  ],
  benefitsImage: "/services/travel-data-scraping/travel-benefits.svg",
  benefitsImageAlt: "Travel data scraping benefits illustration",

  // Everything You Need section (Grid)
  gridSectionTitle: "Robust Travel Data Ingestion Pipeline",
  gridSectionDescription:
    "Our enterprise-grade scraping stack handles JavaScript-heavy booking engines, session-based fare queries, CAPTCHA challenges, and complex anti-bot protections at global scale.",
  gridFeatures: [
    {
      icon: Sliders,
      title: "Dynamic Fare Search Scraping",
      description:
        "Simulate real traveler search sessions across airline booking engines and OTAs to capture accurate, session-locked fare data at scale.",
    },
    {
      icon: Globe,
      title: "Multi-Region Geo-Targeting",
      description:
        "Query travel platforms from destination-specific residential IPs to capture geo-restricted pricing, local-currency rates, and market-specific promotions.",
    },
    {
      icon: Settings,
      title: "Login-Gated Rate Extraction",
      description:
        "Access loyalty member-exclusive fares, corporate rate contracts, and partner pricing pages using authenticated session management.",
    },
    {
      icon: Zap,
      title: "Real-Time Price Change Alerts",
      description:
        "Trigger instant webhook notifications when flight fares, hotel rates, or vacation package prices shift beyond your defined thresholds.",
    },
    {
      icon: Clock,
      title: "Scheduled Monitoring Campaigns",
      description:
        "Configure automated scraping campaigns to intensify data collection during peak booking windows, holiday seasons, and promotional events.",
    },
    {
      icon: Database,
      title: "Structured Data Delivery",
      description:
        "Receive clean, normalized JSON or CSV feeds directly into BigQuery, Snowflake, AWS S3, or your own revenue management API.",
    },
  ],

  // Popular Use Cases section
  useCasesSectionTitle: "Popular Travel Data Use Cases",
  useCasesSectionDescription:
    "How airlines, hotel chains, OTAs, and travel analytics firms leverage scraped travel data at enterprise scale.",
  useCases: [
    {
      icon: Search,
      title: "Competitive Fare Intelligence",
      description:
        "Airlines and OTAs monitor competitor pricing across routes and booking windows to fine-tune dynamic fare algorithms and maximize load factor.",
    },
    {
      icon: BarChart3,
      title: "Hotel Revenue Optimization",
      description:
        "Revenue managers ingest competitor rate data daily to adjust room pricing strategies, enforce rate parity, and improve RevPAR performance.",
    },
    {
      icon: Sparkles,
      title: "Demand Forecasting Models",
      description:
        "Travel analytics teams feed historical fare trends, review volumes, and availability data into ML models to predict future demand and optimize inventory.",
    },
    {
      icon: Map,
      title: "Destination Trend Analysis",
      description:
        "Tourism boards and travel media companies scrape search trends, package pricing, and review volumes to identify emerging destination hotspots.",
    },
  ],

  // Platforms section
  platformsSectionTitle: "Extract Travel Data from Leading Global Platforms",
  platformsSectionDescription:
    "We scrape flight fares, hotel rates, package deals, and traveler reviews from major global and regional online travel agencies, airline portals, and review platforms.",
  platforms: [
    {
      imagePath: "/services/travel-data-scraping/travel-icons/expedia.svg",
      name: "Expedia",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/booking.svg",
      name: "Booking.com",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/tripadvisor.svg",
      name: "TripAdvisor",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/airbnb.svg",
      name: "Airbnb",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/kayak.svg",
      name: "Kayak",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/skyscanner.svg",
      name: "Skyscanner",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/google-flights.svg",
      name: "Google Flights",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/hotels-com.svg",
      name: "Hotels.com",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/agoda.svg",
      name: "Agoda",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/priceline.svg",
      name: "Priceline",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/orbitz.svg",
      name: "Orbitz",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/vrbo.svg",
      name: "Vrbo",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/trivago.svg",
      name: "Trivago",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/momondo.svg",
      name: "Momondo",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/cheapflights.svg",
      name: "CheapFlights",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/makemytrip.svg",
      name: "MakeMyTrip",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/yatra.svg",
      name: "Yatra",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/cleartrip.svg",
      name: "Cleartrip",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/goibibo.svg",
      name: "Goibibo",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/ixigo.svg",
      name: "Ixigo",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/traveloka.svg",
      name: "Traveloka",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/klook.svg",
      name: "Klook",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/viator.svg",
      name: "Viator",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/getyourguide.svg",
      name: "GetYourGuide",
    },
    {
      imagePath: "/services/travel-data-scraping/travel-icons/hostelworld.svg",
      name: "Hostelworld",
    },
  ],
};
