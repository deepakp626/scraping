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
  FileText,
  Bike,
  TrendingUp,
  ShoppingBag,
  MapPin,
  Star,
  DollarSign,
} from "lucide-react";

export const foodDeliveryDataScrapingData = {
  // ── Hero ─────────────────────────────────────────────────────────────
  heroTitlePrefix: "Food Delivery",
  heroTitleHighlight: "Platform Data",
  heroTitleSuffix: "Scraping Services",
  heroDescription:
    "Collect structured order, courier, menu, and pricing data from on-demand food delivery platforms. Help restaurants, aggregators, and logistics operators benchmark commissions, decode ranking algorithms, and win more orders.",
  heroHighlights: [
    "Scrape full restaurant onboarding & commission rate data",
    "Monitor platform ranking factors & search placement logic",
    "Track delivery partner earnings, incentives & bonus structures",
    "Extract cuisine-level demand heatmaps by postcode & city",
    "Benchmark platform service fees & packaging charge policies",
    "Capture customer reorder rates & loyalty program details",
    "Decode promotional mechanics: bundles, free delivery triggers",
    "Structured CSV / JSON delivery to your warehouse or BI tool",
  ],
  heroImage:
    "/services/food-delivery-data-scraping-service/food-delivery-hero.svg",
  heroImageAlt: "Food delivery platform data scraping hero illustration",
  heroCtaIcon: Bike,

  // ── Stats ─────────────────────────────────────────────────────────────
  stats: [
    { value: "40+", label: "Delivery Platforms" },
    { value: "120+", label: "Cities Covered" },
    { value: "98.7%", label: "Parse Accuracy" },
    { value: "Hourly", label: "Data Refresh" },
  ],

  // ── About ─────────────────────────────────────────────────────────────
  aboutTitle: "What is Food Delivery Platform Data Scraping?",
  aboutDescription:
    "Food delivery platform data scraping focuses specifically on the commercial and operational layer of on-demand delivery apps — the commission structures, ranking algorithms, courier pay models, promotional mechanics, and order-volume signals that restaurant owners, aggregator consultants, and last-mile logistics firms need to compete effectively. Unlike general restaurant or menu scraping, this discipline targets the hidden incentive and fee architecture that governs how dishes are surfaced, how couriers are routed, and how platform profitability is engineered on apps like Uber Eats, DoorDash, Deliveroo, Swiggy, and Zomato.",
  aboutBulletPoints: [
    "Extract platform commission tiers, onboarding fee schedules, and marketplace vs. self-delivery contract terms.",
    "Decode category ranking signals by analysing position shifts after price changes, rating updates, and promotional activations.",
    "Scrape courier pay-per-delivery rates, surge bonuses, and minimum earnings guarantees across regions.",
    "Monitor free-delivery threshold policies and platform-funded subsidy windows to model true customer acquisition cost.",
    "Aggregate demand-side order frequency, basket size ranges, and re-order interval data by cuisine type and city district.",
  ],

  // ── Data Fields ───────────────────────────────────────────────────────
  dataFieldsTitle: "Food Delivery Data Fields We Extract",
  dataFieldsDescription:
    "We normalise commercial, operational, and demand-side data points from food delivery platforms into a clean schema purpose-built for restaurant consultants, aggregator analysts, and logistics strategists.",
  dataFieldsImage:
    "/services/food-delivery-data-scraping-service/food-delivery-data-mockup.svg",
  dataFieldsLeft: [
    "Platform Commission Rate (%)",
    "Onboarding & Activation Fee",
    "Marketplace vs. Self-Delivery Flag",
    "Restaurant Ranking Position",
    "Search Keyword Placement",
    "Promoted Listing Badge & Cost",
    "Free Delivery Threshold Amount",
    "Platform Service Fee (Customer-Side)",
  ],
  dataFieldsRight: [
    "Delivery Partner Pay-Per-Drop",
    "Surge Bonus Trigger Conditions",
    "Estimated Order Volume Band",
    "Average Basket Size Range",
    "Re-Order Rate Indicator",
    "Cuisine Category Demand Score",
    "Postcode / Zone Demand Heatmap",
    "Promotional Mechanics & Bundle Rules",
  ],

  // ── Feature Blocks ────────────────────────────────────────────────────
  featuresSectionTitle:
    "Enterprise Features for Food Delivery Platform Intelligence",
  featureBlocks: [
    {
      title: "Platform Commission & Fee Architecture Scraping",
      description:
        "Uncover the real cost of selling on each delivery platform by scraping commission tier breakdowns, onboarding incentive schedules, packaging fee policies, and self-delivery vs. marketplace contract differentials — giving restaurant groups and consultants the data to negotiate better deals and optimise platform mix.",
      image:
        "/services/food-delivery-data-scraping-service/food-delivery-commission-scraping.svg",
      imageAlt: "Platform commission and fee architecture scraping illustration",
      bulletPoints: [
        {
          title: "Commission Tier Benchmarking",
          desc: "Compare base commission rates, introductory discount windows, and volume-based tier thresholds across Uber Eats, DoorDash, Deliveroo, Zomato, and Swiggy in one unified dataset.",
        },
        {
          title: "Hidden Fee Identification",
          desc: "Surface packaging surcharges, credit card processing fees, and platform marketing fund contributions that erode net margin beyond the headline commission rate.",
        },
        {
          title: "Contract Term Monitoring",
          desc: "Track changes to exclusivity clauses, minimum order value requirements, and early-termination fee disclosures as platforms update their partner agreements.",
        },
      ],
    },
    {
      title: "Ranking Algorithm & Search Placement Intelligence",
      description:
        "Understand what drives a restaurant to the top of the feed by systematically scraping listing positions before and after rating changes, price edits, promotional activations, and review volume shifts — building an evidence-based map of each platform's ranking algorithm.",
      image:
        "/services/food-delivery-data-scraping-service/food-delivery-ranking-intelligence.svg",
      imageAlt: "Food delivery ranking algorithm intelligence illustration",
      bulletPoints: [
        {
          title: "Position Tracking by Keyword",
          desc: "Monitor daily organic ranking changes for high-intent search terms like 'pizza near me' or 'healthy lunch' across target postcodes and delivery zones.",
        },
        {
          title: "Sponsored vs. Organic Split Analysis",
          desc: "Quantify the ratio of promoted listings to organic results per cuisine category to estimate minimum advertising spend required for visible placement.",
        },
        {
          title: "Rating-to-Rank Correlation Modelling",
          desc: "Correlate star rating thresholds, review velocity, and acceptance rate metrics with observed ranking position changes to reverse-engineer platform scoring logic.",
        },
      ],
    },
    {
      title: "Courier Pay, Incentives & Supply-Side Data",
      description:
        "Capture the courier-facing economics of each platform — base pay-per-delivery, time-based guarantees, surge multipliers, long-distance bonuses, and refer-a-friend incentive structures — to model driver supply, predict delivery capacity constraints, and benchmark gig worker earnings across markets.",
      image:
        "/services/food-delivery-data-scraping-service/food-delivery-courier-data.svg",
      imageAlt: "Courier pay and incentives data scraping illustration",
      bulletPoints: [
        {
          title: "Base Rate & Earnings Guarantee Extraction",
          desc: "Scrape published courier pay-per-drop rates, per-kilometre supplements, and platform minimum earnings guarantees across cities and day-parts.",
        },
        {
          title: "Surge Zone & Bonus Trigger Mapping",
          desc: "Identify which postcodes activate surge multipliers, at what demand thresholds bonuses are triggered, and how long incentive windows typically last.",
        },
        {
          title: "Driver Supply Density Estimation",
          desc: "Infer relative courier supply levels from ETA data and online driver-count signals to model delivery capacity constraints by city district and time of day.",
        },
      ],
    },
    {
      title: "Demand-Side Order Volume & Consumer Behaviour Data",
      description:
        "Extract consumer demand signals — estimated order frequency bands, basket size ranges, cuisine-level popularity trends, and postcode-level demand heatmaps — to power market entry decisions, dark kitchen site selection, and platform ad budget allocation for restaurant brands.",
      image:
        "/services/food-delivery-data-scraping-service/food-delivery-demand-data.svg",
      imageAlt: "Food delivery demand and consumer behaviour data illustration",
      bulletPoints: [
        {
          title: "Cuisine Demand Heatmapping",
          desc: "Score demand intensity for each cuisine category by delivery zone using review velocity, listing density, and estimated order volume signals as proxies.",
        },
        {
          title: "Basket Size & Re-Order Rate Inference",
          desc: "Estimate average basket sizes and repeat-customer rates from platform-published review counts, 'X orders this week' badges, and loyalty programme indicators.",
        },
        {
          title: "Peak Demand Window Detection",
          desc: "Identify lunch, evening, and weekend demand peaks by tracking listing availability, ETA fluctuations, and promotional activation patterns across time slots.",
        },
      ],
    },
  ],

  // ── Benefits ──────────────────────────────────────────────────────────
  benefitsTitle: "Why Restaurant Brands & Aggregators Choose Our Data",
  benefits: [
    {
      title: "Negotiate Better Platform Commission Rates",
      content:
        "Go into platform renegotiations armed with verified commission benchmarks, competitor fee data, and hidden charge breakdowns that reveal exactly how much margin each platform is extracting from your revenue.",
    },
    {
      title: "Climb the Ranking Without Overspending on Ads",
      content:
        "Use algorithmic ranking intelligence to prioritise the operational levers — rating improvement, acceptance rate, delivery time consistency — that drive organic position gains before committing budget to promoted placements.",
    },
    {
      title: "Identify the Highest-Demand Cuisines in Target Markets",
      content:
        "Enter new cities and delivery zones with confidence by using cuisine demand heatmaps and order volume signals to validate your concept before investing in kitchen fit-out or platform onboarding costs.",
    },
    {
      title: "Optimise Courier Costs for Dark Kitchen Operations",
      content:
        "Model true last-mile delivery costs using scraped courier pay rates, surge zone maps, and supply density data to select kitchen locations that minimise delivery time and maximise driver availability.",
    },
  ],
  benefitsImage:
    "/services/food-delivery-data-scraping-service/food-delivery-benefits.svg",
  benefitsImageAlt: "Food delivery platform data scraping benefits illustration",

  // ── Grid Features ─────────────────────────────────────────────────────
  gridSectionTitle: "Built for Food Delivery Platform Complexity",
  gridSectionDescription:
    "Food delivery apps are among the most aggressively defended scraping targets — geo-locked menus, device fingerprinting, session-bound tokens, and frequent API schema changes. Our infrastructure is engineered specifically for this environment.",
  gridFeatures: [
    {
      icon: Sliders,
      title: "App API Reverse Engineering",
      description:
        "Extract commission data, pay structures, and ranking signals directly from mobile app API endpoints by simulating authentic device sessions with rotating credentials.",
    },
    {
      icon: Globe,
      title: "Postcode-Precision Geo-Targeting",
      description:
        "Query each delivery platform from residential IPs pinned to specific postcodes to capture hyper-local fee structures, demand heatmaps, and courier surge zones.",
    },
    {
      icon: Settings,
      title: "Schema Change Auto-Detection",
      description:
        "Automatically detect and adapt to API schema changes, new field additions, and structural updates that delivery platforms push in weekly app releases.",
    },
    {
      icon: Zap,
      title: "Fee & Ranking Change Alerts",
      description:
        "Receive instant webhook or email notifications when a platform updates its commission tier schedule, changes ranking factors, or modifies courier pay structures.",
    },
    {
      icon: Clock,
      title: "Configurable Scraping Cadence",
      description:
        "Schedule data collection from hourly ranking snapshots to weekly commission audits — matched precisely to the update frequency of each target platform.",
    },
    {
      icon: Database,
      title: "BI-Ready Structured Output",
      description:
        "Receive clean, deduplicated JSON or CSV feeds piped directly into BigQuery, Snowflake, Redshift, or your internal BI dashboards with no post-processing required.",
    },
  ],

  // ── Use Cases ─────────────────────────────────────────────────────────
  useCasesSectionTitle: "Who Uses Food Delivery Platform Data",
  useCasesSectionDescription:
    "How restaurant groups, aggregator consultants, last-mile logistics firms, and food investment analysts put delivery platform intelligence to work.",
  useCases: [
    {
      icon: DollarSign,
      title: "Commission Renegotiation for Restaurant Groups",
      description:
        "Multi-site restaurant operators use verified commission benchmarks and hidden fee data to enter platform renegotiations with evidence-backed leverage and secure lower effective rates.",
    },
    {
      icon: TrendingUp,
      title: "Ranking Optimisation for Digital Marketing Agencies",
      description:
        "Agencies managing restaurant accounts on delivery platforms track organic position changes against operational variables to build ranking improvement playbooks for their clients.",
    },
    {
      icon: MapPin,
      title: "Dark Kitchen Site Selection for Cloud Kitchen Operators",
      description:
        "Virtual restaurant brands combine cuisine demand heatmaps, courier supply density data, and ETA benchmarks to shortlist the highest-ROI kitchen locations in target cities.",
    },
    {
      icon: BarChart3,
      title: "Market Due Diligence for Food-Tech Investors",
      description:
        "PE and venture investors conducting due diligence on food delivery or restaurant tech acquisitions use scraped platform data to validate order volume claims and benchmark competitive positioning.",
    },
  ],

  // ── Platforms ─────────────────────────────────────────────────────────
  platformsSectionTitle: "Platforms We Scrape for Delivery Intelligence",
  platformsSectionDescription:
    "We extract commission structures, ranking data, courier pay rates, and demand signals from major on-demand food delivery platforms across North America, Europe, the Middle East, South Asia, and Southeast Asia.",
  platforms: [
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/ubereats.svg",
      name: "Uber Eats",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/doordash.svg",
      name: "DoorDash",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/deliveroo.svg",
      name: "Deliveroo",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/grubhub.svg",
      name: "Grubhub",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/zomato.svg",
      name: "Zomato",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/swiggy.svg",
      name: "Swiggy",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/justeat.svg",
      name: "Just Eat",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/talabat.svg",
      name: "Talabat",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/glovo.svg",
      name: "Glovo",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/wolt.svg",
      name: "Wolt",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/foodpanda.svg",
      name: "Foodpanda",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/grab.svg",
      name: "GrabFood",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/rappi.svg",
      name: "Rappi",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/ifood.svg",
      name: "iFood",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/hungerstation.svg",
      name: "HungerStation",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/noon-food.svg",
      name: "Noon Food",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/bolt-food.svg",
      name: "Bolt Food",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/menulog.svg",
      name: "Menulog",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/skip-the-dishes.svg",
      name: "SkipTheDishes",
    },
    {
      imagePath:
        "/services/food-delivery-data-scraping-service/platform-icons/fantuan.svg",
      name: "Fantuan",
    },
  ],
};
