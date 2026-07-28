import {
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
  Utensils,
} from "lucide-react";

export const foodScrapingData = {
  // Hero section
  heroTitlePrefix: "Web Scraping for",
  heroTitleHighlight: "Food & Restaurant",
  heroTitleSuffix: "Data",
  heroDescription:
    "Extract restaurant listings, structured menus, food item pricing, operating hours, customer reviews, and geolocation data from major food directories, maps, and review platforms at enterprise scale.",
  heroHighlights: [
    "Scrape full restaurant menus with prices, categories & ingredients",
    "Extract operating hours, contact details & geolocation coordinates",
    "Aggregate customer ratings, review counts & sentiment data",
    "Monitor competitor menu changes and food pricing trends",
    "Collect cuisine types, dietary tags & allergen information",
    "Bypass anti-bot systems on major food directories & maps",
  ],
  heroImage: "/services/food-data-scraping/food-hero.svg",
  heroImageAlt: "Food data scraping hero illustration",
  heroCtaIcon: Utensils,

  // Stats section
  stats: [
    { value: "80+", label: "Food Platforms" },
    { value: "50M+", label: "Restaurants Indexed" },
    { value: "99.9%", label: "Data Accuracy" },
    { value: "Real-Time", label: "Data Freshness" },
  ],

  // About/Explanation section
  aboutTitle: "What is Food & Restaurant Data Scraping?",
  aboutDescription:
    "Food and restaurant data scraping is the automated extraction of structured information from restaurant directories, food review portals, map-based discovery platforms, and food delivery aggregators. Restaurant chains, food-tech startups, hospitality analytics firms, and market research companies rely on scraped food data to build competitive intelligence tools, power menu recommendation engines, track competitor pricing, analyze dining trends, and enrich location-based food discovery applications.",
  aboutBulletPoints: [
    "Extract complete restaurant profiles including name, cuisine, category, and brand ownership.",
    "Scrape structured menu hierarchies including categories, items, descriptions, and prices.",
    "Collect operating hours, reservation links, delivery options, and contact details.",
    "Aggregate star ratings, review counts, and consumer sentiment across platforms.",
    "Capture geolocation data, neighborhood tags, and map-linked address coordinates.",
  ],

  // Detailed Compilation of Data Fields
  dataFieldsTitle: "Structured Food & Restaurant Data Fields",
  dataFieldsDescription:
    "We normalize restaurant and menu data from directories, maps, and review portals into a unified schema ready for analytics, recommendation engines, and market intelligence platforms.",
  dataFieldsImage: "/services/food-data-scraping/food-data-mockup.svg",
  dataFieldsLeft: [
    "Restaurant Name & Brand",
    "Cuisine Type & Category",
    "Menu Section & Item Name",
    "Item Description & Ingredients",
    "Menu Item Price",
    "Dietary Tags & Allergens",
    "Operating Hours & Holidays",
    "Reservation & Booking Link",
  ],
  dataFieldsRight: [
    "Phone Number & Website",
    "Full Address & Postcode",
    "Latitude & Longitude",
    "Google Maps / Yelp ID",
    "Star Rating & Review Count",
    "Review Text & Date",
    "Delivery & Dine-In Options",
    "Price Range & Payment Types",
  ],

  // Powerful Features section
  featuresSectionTitle: "Enterprise Features for Food Data Scraping",
  featureBlocks: [
    {
      title: "Restaurant Directory & Profile Scraping",
      description:
        "Build exhaustive restaurant databases by scraping complete business profiles across Yelp, Google Maps, TripAdvisor, Zomato, and OpenTable — including contact details, cuisine classifications, chain ownership, amenities, and geo-coordinates at city and country scale.",
      image: "/services/food-data-scraping/food-directory-scraping.svg",
      imageAlt: "Restaurant directory scraping illustration",
      bulletPoints: [
        {
          title: "Multi-Directory Aggregation",
          desc: "Consolidate restaurant profiles from Yelp, Google Maps, TripAdvisor, and Zomato into a single, deduplicated database.",
        },
        {
          title: "Chain & Franchise Mapping",
          desc: "Identify chain restaurants, map franchise locations, and link individual outlets to parent brand entities.",
        },
        {
          title: "Amenity & Feature Extraction",
          desc: "Capture outdoor seating, parking availability, Wi-Fi, accessibility features, and accepted payment methods.",
        },
      ],
    },
    {
      title: "Menu Data & Item Pricing Extraction",
      description:
        "Scrape complete menu hierarchies — categories, subcategories, items, descriptions, prices, portion sizes, and dietary flags — directly from restaurant websites, food delivery apps, and listing portals to power menu intelligence and competitive benchmarking.",
      image: "/services/food-data-scraping/food-menu-scraping.svg",
      imageAlt: "Menu and pricing data extraction illustration",
      bulletPoints: [
        {
          title: "Structured Menu Hierarchy",
          desc: "Extract full menu trees including appetizers, mains, desserts, beverages, and combo meals with item-level pricing.",
        },
        {
          title: "Dietary & Allergen Tags",
          desc: "Capture vegetarian, vegan, gluten-free, halal, and allergen classifications for each menu item.",
        },
        {
          title: "Price Change Detection",
          desc: "Monitor competitor menu pricing movements and trigger alerts when item prices are updated or new items are added.",
        },
      ],
    },
    {
      title: "Ratings, Reviews & Sentiment Mining",
      description:
        "Aggregate consumer feedback at scale by scraping star ratings, review texts, verified diner statuses, and response counts from TripAdvisor, Yelp, Google Maps, and Zomato — enabling sentiment analysis, reputation monitoring, and competitive benchmarking.",
      image: "/services/food-data-scraping/food-reviews-scraping.svg",
      imageAlt: "Restaurant reviews and ratings scraping illustration",
      bulletPoints: [
        {
          title: "Cross-Platform Review Aggregation",
          desc: "Collect review texts and ratings from Yelp, TripAdvisor, Google Maps, and Zomato in a unified review schema.",
        },
        {
          title: "Sentiment & Topic Analysis",
          desc: "Feed scraped review texts into NLP pipelines to classify sentiment and surface recurring themes like service, food quality, or ambiance.",
        },
        {
          title: "Competitor Rating Benchmarking",
          desc: "Track competitor rating trends over time to identify service quality gaps and benchmark your own restaurant performance.",
        },
      ],
    },
    {
      title: "Geolocation & Market Coverage Mapping",
      description:
        "Extract geo-coded restaurant data with latitude/longitude coordinates, neighborhood classifications, and city-level density metrics to power location intelligence, market gap analysis, and site selection models for new restaurant openings.",
      image: "/services/food-data-scraping/food-geo-mapping.svg",
      imageAlt: "Restaurant geolocation mapping illustration",
      bulletPoints: [
        {
          title: "Geo-Coordinate Extraction",
          desc: "Scrape precise latitude and longitude values for every restaurant record to power map visualization and proximity analytics.",
        },
        {
          title: "Neighborhood & Zone Tagging",
          desc: "Classify restaurants by neighborhood, district, and delivery zone to enable hyper-local market analysis.",
        },
        {
          title: "Restaurant Density Analytics",
          desc: "Measure cuisine category density and competitive saturation by area to identify expansion opportunities.",
        },
      ],
    },
  ],

  // Benefits section
  benefitsTitle: "Why Food Businesses Trust Our Data Scraping Services",
  benefits: [
    {
      title: "Build Richer Food Discovery Products",
      content:
        "Power restaurant recommendation engines, food discovery apps, and local search tools with comprehensive, up-to-date restaurant profiles, menus, and ratings scraped from dozens of platforms.",
    },
    {
      title: "Monitor Competitor Menus & Pricing",
      content:
        "Track competitor menu changes, new item launches, and pricing adjustments in near real time to inform your own menu strategy and promotional planning.",
    },
    {
      title: "Optimize Market Expansion Decisions",
      content:
        "Use geo-coded restaurant density data and cuisine gap analysis to identify underserved markets and prioritize new restaurant or cloud kitchen expansion locations.",
    },
    {
      title: "Improve Guest Reputation Management",
      content:
        "Aggregate competitor and self-review data across platforms to proactively manage your online reputation and respond faster to emerging service issues.",
    },
  ],
  benefitsImage: "/services/food-data-scraping/food-benefits.svg",
  benefitsImageAlt: "Food data scraping benefits illustration",

  // Everything You Need section (Grid)
  gridSectionTitle: "Robust Food Data Ingestion Pipeline",
  gridSectionDescription:
    "Our enterprise scraping stack handles JavaScript-heavy food portals, map-embedded listings, CAPTCHA-protected review pages, and dynamic menu rendering at global scale.",
  gridFeatures: [
    {
      icon: Sliders,
      title: "Menu Hierarchy Crawling",
      description:
        "Systematically crawl nested menu structures across restaurant websites, food delivery apps, and listing portals to extract every category, item, and price combination.",
    },
    {
      icon: Globe,
      title: "Multi-Region Geo-Targeting",
      description:
        "Query food directories from city-specific residential IPs to capture accurate localized menus, regional pricing, and market-specific restaurant listings.",
    },
    {
      icon: Settings,
      title: "Map API Data Extraction",
      description:
        "Extract restaurant data embedded within Google Maps, Apple Maps, and Bing Places using browser-based rendering to capture all map-layer attributes.",
    },
    {
      icon: Zap,
      title: "Real-Time Menu Change Alerts",
      description:
        "Trigger instant webhook notifications when competitor restaurants update their menus, change prices, or add new items.",
    },
    {
      icon: Clock,
      title: "Scheduled Monitoring Runs",
      description:
        "Configure recurring scraping campaigns on hourly, daily, or weekly schedules to keep restaurant data fresh across all your monitored platforms.",
    },
    {
      icon: Database,
      title: "Structured Data Delivery",
      description:
        "Receive clean, normalized JSON or CSV feeds delivered directly into BigQuery, Snowflake, AWS S3, or your own food-tech API endpoint.",
    },
  ],

  // Popular Use Cases section
  useCasesSectionTitle: "Popular Food & Restaurant Data Use Cases",
  useCasesSectionDescription:
    "How food-tech companies, restaurant chains, hospitality analytics firms, and market research organizations leverage scraped food data at enterprise scale.",
  useCases: [
    {
      icon: Search,
      title: "Restaurant Discovery Platforms",
      description:
        "Food-tech startups and aggregators scrape restaurant profiles, menus, and ratings to build comprehensive local dining discovery and search products.",
    },
    {
      icon: BarChart3,
      title: "Menu Intelligence & Pricing Strategy",
      description:
        "Restaurant chains and QSR brands monitor competitor menus and pricing across cities to fine-tune their own item pricing and promotional calendars.",
    },
    {
      icon: Sparkles,
      title: "Food Trend & Category Analysis",
      description:
        "Market research firms analyze scraped menu data at scale to identify emerging cuisine trends, dietary preference shifts, and new food category growth.",
    },
    {
      icon: MapPin,
      title: "Site Selection & Expansion Planning",
      description:
        "Restaurant groups and cloud kitchen operators use geo-coded competitor density data to pinpoint optimal locations for new outlet or dark kitchen openings.",
    },
  ],

  // Platforms section
  platformsSectionTitle: "Extract Food Data from Leading Restaurant Platforms",
  platformsSectionDescription:
    "We scrape restaurant profiles, menus, ratings, and reviews from major global and regional food directories, maps, delivery apps, and hospitality portals.",
  platforms: [
    {
      imagePath: "/services/food-data-scraping/food-icons/yelp.svg",
      name: "Yelp",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/tripadvisor.svg",
      name: "TripAdvisor",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/zomato.svg",
      name: "Zomato",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/google-maps.svg",
      name: "Google Maps",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/opentable.svg",
      name: "OpenTable",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/doordash.svg",
      name: "DoorDash",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/ubereats.svg",
      name: "Uber Eats",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/grubhub.svg",
      name: "Grubhub",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/seamless.svg",
      name: "Seamless",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/swiggy.svg",
      name: "Swiggy",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/foursquare.svg",
      name: "Foursquare",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/menulog.svg",
      name: "Menulog",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/eatigo.svg",
      name: "Eatigo",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/chope.svg",
      name: "Chope",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/talabat.svg",
      name: "Talabat",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/hungerstation.svg",
      name: "HungerStation",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/wolt.svg",
      name: "Wolt",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/bolt-food.svg",
      name: "Bolt Food",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/justeat.svg",
      name: "Just Eat",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/deliveroo.svg",
      name: "Deliveroo",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/ifood.svg",
      name: "iFood",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/rappi.svg",
      name: "Rappi",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/pedidosya.svg",
      name: "PedidosYa",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/meituan.svg",
      name: "Meituan",
    },
    {
      imagePath: "/services/food-data-scraping/food-icons/foodpanda.svg",
      name: "Foodpanda",
    },
  ],
};
