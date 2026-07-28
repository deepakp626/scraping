import {
  Film,
  Play,
  Star,
  Globe,
  Search,
  ShieldCheck,
  Database,
  Clock,
  Layers,
  Zap,
  Calendar,
  TrendingUp,
  Heart,
} from "lucide-react";

export const ottStreamingData = {
  // Hero section
  heroTitlePrefix: "OTT Streaming",
  heroTitleHighlight: "Content Data",
  heroTitleSuffix: "Scraping",
  heroDescription:
    "Collect streaming catalogue metadata, pricing, availability, release dates, and viewer ratings from top OTT platforms and content distributors.",
  heroHighlights: [
    "Catalog metadata across multiple streaming platforms",
    "Regional availability and licensing window insights",
    "Pricing and subscription tier changes",
    "Content ratings, genres, and cast/crew details",
    "New release and trending show tracking",
    "Data delivery optimized for content strategy teams",
  ],
  heroImage: "/services/ott-streaming-data-scraping-service/ott-streaming-hero.svg",
  heroImageAlt: "OTT streaming data scraping hero illustration",
  heroCtaIcon: Film,
  sampleDataLink: "/contact",
  allServicesLink: "/services",

  // Stats section
  stats: [
    { value: "85+", label: "Streaming Sources" },
    { value: "1M+", label: "Titles Indexed" },
    { value: "99.5%", label: "Data Freshness" },
    { value: "24/7", label: "Platform Monitoring" },
  ],

  // About/Explanation section
  aboutTitle: "What is OTT Streaming Data Scraping?",
  aboutDescription:
    "OTT streaming data scraping gathers structured information from video-on-demand platforms, delivery apps, and content libraries. This data helps media teams, licensing analysts, and streaming products understand availability, pricing, audience demand, and content performance across providers.",
  aboutBulletPoints: [
    "Capture title metadata, cast/crew information, genres, and descriptions.",
    "Track where each title is available by country, device, and subscription tier.",
    "Monitor pricing changes, promotional offers, and ad-supported availability.",
    "Gather viewer ratings, reviews, popularity rankings, and trending charts.",
    "Support content acquisition, catalog planning, and competitive benchmarking.",
  ],

  // Detailed Compilation of Data Fields
  dataFieldsTitle: "Key OTT Streaming Data Fields",
  dataFieldsDescription:
    "We normalize catalogue, pricing, and availability details into a structured dataset for media analytics, content intelligence, and product operations.",
  dataFieldsImage: "/services/ott-streaming-data-scraping-service/ott-streaming-data-mockup.svg",
  dataFieldsLeft: [
    "Title name, year, and content type",
    "Genre tags and content categories",
    "Cast, director, writers, and production credits",
    "Synopsis, runtime, and age rating",
    "Service availability by country and region",
    "Subscription tier levels and access rules",
    "Window start and end dates",
    "Release type (original, licensed, exclusive)",
  ],
  dataFieldsRight: [
    "Pricing plan and add-on fee details",
    "Viewer rating and review counts",
    "Trending rank and popularity score",
    "New release / premiere date tracking",
    "Ad-supported, premium, or free tiers",
    "Content language, subtitles, and dubbing options",
    "Episode and season counts",
    "Related title recommendations",
  ],

  // Powerful Features section
  featuresSectionTitle: "OTT Data Scraping Features",
  featureBlocks: [
    {
      title: "Global Content Availability Tracking",
      description:
        "Detect where each title is licensed, geo-blocked, or locally restricted. Our scrapers follow content feeds and catalogue APIs to keep availability windows updated across countries.",
      image: "/services/ott-streaming-data-scraping-service/ott-streaming-availability.svg",
      imageAlt: "Regional availability tracking illustration",
      bulletPoints: [
        {
          title: "Country-by-country Rights Mapping",
          desc: "Track which markets have access to each show or movie and when rights expire.",
        },
        {
          title: "Platform & Device Support",
          desc: "Monitor availability on mobile, connected TV, and web for each service tier.",
        },
        {
          title: "Window Period Alerts",
          desc: "Receive updates when titles enter or exit catalogues and licensing windows change.",
        },
      ],
    },
    {
      title: "Pricing, Promo, and Subscription Intelligence",
      description:
        "Understand how OTT services price content and subscriptions, including bundle deals, trial offers, and ad-supported changes. This helps you benchmark packages and forecast revenue impact.",
      image: "/services/ott-streaming-data-scraping-service/ott-streaming-pricing.svg",
      imageAlt: "Pricing intelligence illustration",
      bulletPoints: [
        {
          title: "Subscription Tier Comparison",
          desc: "Track pricing differences across basic, premium, and ad-supported plans.",
        },
        {
          title: "Offer & Promo Monitoring",
          desc: "Capture discount campaigns, bundle pricing, and limited-time content offers.",
        },
        {
          title: "Price Change History",
          desc: "Log changes to subscription fees and content add-ons over time.",
        },
      ],
    },
    {
      title: "Content Performance and Trend Analytics",
      description:
        "Measure what content is trending, gaining viewers, or losing momentum. We extract popularity signals and ratings so you can spot hits, niche titles, and churn risk early.",
      image: "/services/ott-streaming-data-scraping-service/ott-streaming-trends.svg",
      imageAlt: "Content trend analytics illustration",
      bulletPoints: [
        {
          title: "Trending Charts",
          desc: "Extract daily top charts, new release movers, and binge-worthy rankings.",
        },
        {
          title: "Rating Momentum",
          desc: "Track how average ratings and review sentiment change after premieres.",
        },
        {
          title: "Series & Episode Popularity",
          desc: "Compare season performance, completion rates, and viewer engagement metrics.",
        },
      ],
    },
  ],

  // Benefits section
  benefitsTitle: "Why Choose OTT Streaming Scraping",
  benefits: [
    {
      title: "Better Content Planning",
      content:
        "Use accurate availability, pricing, and trend data to decide which titles to acquire, promote, or localize for each market.",
    },
    {
      title: "Competitive Catalog Intelligence",
      content:
        "Compare competing OTT services catalogue depth, exclusive content, and release timing across regions.",
    },
    {
      title: "Faster Rights Management",
      content:
        "Track licensing windows and territory restrictions to avoid rights gaps and revenue leakage.",
    },
    {
      title: "Audience Signal Visibility",
      content:
        "See what content is resonating through ratings, trending positions, and popularity signals so your editorial strategy stays data-driven.",
    },
  ],
  benefitsImage: "/services/ott-streaming-data-scraping-service/ott-streaming-benefits.svg",
  benefitsImageAlt: "OTT streaming data benefits illustration",

  // Everything You Need section (Grid)
  gridSectionTitle: "Data Your Streaming Team Needs",
  gridSectionDescription:
    "From licensing windows to trending content, we deliver the critical OTT data points media teams rely on.",
  gridFeatures: [
    {
      icon: Play,
      title: "Catalogue Metadata",
      description:
        "Extract titles, genres, cast, synopsis, and release types across all streaming catalogues.",
    },
    {
      icon: Globe,
      title: "Global Rights Coverage",
      description:
        "Map regional availability and licensing windows for every title in your universe.",
    },
    {
      icon: Star,
      title: "Ratings & Popularity",
      description:
        "Collect ratings, review counts, and trending rank signals for content performance analysis.",
    },
    {
      icon: Layers,
      title: "Subscription Tier Data",
      description:
        "Track which shows are available on free, ad-supported, and premium plans.",
    },
    {
      icon: Clock,
      title: "Release & Premiere Monitoring",
      description:
        "Watch new releases, season drops, and content rollouts as they go live.",
    },
    {
      icon: Database,
      title: "Clean Delivery",
      description:
        "Receive normalized datasets that integrate directly into BI tools and content intelligence systems.",
    },
  ],

  // Popular Use Cases section
  useCasesSectionTitle: "How OTT Teams Use Scraped Data",
  useCasesSectionDescription:
    "These are the most common use cases for OTT catalogue, pricing, and trend intelligence.",
  useCases: [
    {
      icon: Search,
      title: "Content Acquisition",
      description:
        "Identify gaps in your catalogue and competitive titles to acquire or license for your platform.",
    },
    {
      icon: Zap,
      title: "Pricing & Subscription Strategy",
      description:
        "Benchmark plan pricing, ad-supported offers, and promotional bundles across services.",
    },
    {
      icon: TrendingUp,
      title: "Trend Discovery",
      description:
        "Spot viral shows, breakout series, and shifting viewer preferences across markets.",
    },
    {
      icon: Heart,
      title: "Audience Engagement",
      description:
        "Use ratings and popularity signals to improve editorial curation and retention campaigns.",
    },
  ],

  // Platforms section
  platformsSectionTitle: "OTT Platforms & Content Sources",
  platformsSectionDescription:
    "We scrape major streaming platforms, content aggregators, and metadata services used by media intelligence teams.",
  platforms: [
    {
      imagePath: "/services/ott-streaming-data-scraping-service/ott-icon-netflix.svg",
      name: "Netflix",
    },
    {
      imagePath: "/services/ott-streaming-data-scraping-service/ott-icon-amazon-prime.svg",
      name: "Amazon Prime Video",
    },
    {
      imagePath: "/services/ott-streaming-data-scraping-service/ott-icon-disney.svg",
      name: "Disney+",
    },
    {
      imagePath: "/services/ott-streaming-data-scraping-service/ott-icon-hbo-max.svg",
      name: "HBO Max",
    },
    {
      imagePath: "/services/ott-streaming-data-scraping-service/ott-icon-hulu.svg",
      name: "Hulu",
    },
    {
      imagePath: "/services/ott-streaming-data-scraping-service/ott-icon-paramount.svg",
      name: "Paramount+",
    },
    {
      imagePath: "/services/ott-streaming-data-scraping-service/ott-icon-apple-tv.svg",
      name: "Apple TV+",
    },
  ],
};
