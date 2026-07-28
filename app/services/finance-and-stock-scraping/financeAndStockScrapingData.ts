import {
  TrendingUp,
  BarChart3,
  DollarSign,
  Globe,
  Search,
  ShieldCheck,
  Database,
  Settings,
  Clock,
  MapPin,
  Zap,
  FileText,
} from "lucide-react";

export const financeAndStockScrapingData = {
  // Hero section
  heroTitlePrefix: "Financial Market &",
  heroTitleHighlight: "Stock Data",
  heroTitleSuffix: "Scraping",
  heroDescription:
    "Extract real-time pricing, fundamentals, earnings, analyst ratings, and sentiment signals from top finance portals, stock exchanges, and investment research sites.",
  heroHighlights: [
    "Live quote and volume extraction across major exchanges",
    "Structured fundamentals, ratios, and earnings metrics",
    "Analyst ratings, target prices, and research sentiment",
    "Corporate actions, filings, and event calendar tracking",
    "ETF holdings, sector exposures, and index membership",
    "Automated data feeds for trading desks and fintech apps",
  ],
  heroImage: "/services/finance-and-stock-scraping/finance-stock-hero.svg",
  heroImageAlt: "Finance and stock market scraping hero illustration",
  heroCtaIcon: TrendingUp,
  sampleDataLink: "/contact",
  allServicesLink: "/services",

  // Stats section
  stats: [
    { value: "120+", label: "Finance Sources" },
    { value: "5M+", label: "Quotes Processed Daily" },
    { value: "99.8%", label: "Data Delivery SLA" },
    { value: "24/7", label: "Market Monitoring" },
  ],

  // About/Explanation section
  aboutTitle: "What is Finance & Stock Market Data Scraping?",
  aboutDescription:
    "Finance and stock market data scraping collects pricing, company fundamentals, ratings, and event data from financial portals, broker platforms, regulatory filings, and news sites. It helps traders, analysts, fintech products and investment teams build timely insights and avoid manual data collection delays.",
  aboutBulletPoints: [
    "Capture end-of-day and intraday stock quotes across exchanges.",
    "Extract ratios like P/E, EBITDA, revenue growth, dividend yield, and payout metrics.",
    "Monitor earnings releases, SEC filings, corporate actions, and event calendars.",
    "Track analyst upgrades, downgrades, target prices, and sentiment shifts.",
    "Pull index membership, ETF holdings, sector weights, and benchmark performance.",
  ],

  // Detailed Compilation of Data Fields
  dataFieldsTitle: "Finance & Stock Data Fields We Scrape",
  dataFieldsDescription:
    "We normalize raw financial content into a consistent schema so your models, dashboards, and data feeds are ready without manual cleanup.",
  dataFieldsImage: "/services/finance-and-stock-scraping/finance-stock-data-mockup.svg",
  dataFieldsLeft: [
    "Ticker symbol & company name",
    "Last trade price & recent change",
    "Volume, average volume, and liquidity metrics",
    "Bid / ask spread and market depth indicators",
    "Market capitalization & free float",
    "52-week high / low and price range",
    "Exchange listing and trading currency",
    "Sector, industry, and region classification",
  ],
  dataFieldsRight: [
    "Trailing & forward P/E ratios",
    "Revenue, EBITDA, net income, and cash flow growth",
    "Dividend yield, payout ratio, and distribution dates",
    "Insider transactions and ownership history",
    "Analyst consensus rating and target price",
    "Earnings date, guidance, and beat / miss signals",
    "SEC EDGAR filings, proxy statements, and corporate actions",
    "ETF holdings, shares outstanding, and institutional ownership",
  ],

  // Powerful Features section
  featuresSectionTitle: "How Our Finance Scraping Works",
  featureBlocks: [
    {
      title: "Real-Time Quote & Market Depth Extraction",
      description:
        "Capture live bid/ask spreads, trade sizes, and quote updates from equity pages, exchange feeds, and broker-level market data portals. Our engine keeps pace with active markets while retaining clean output for downstream analytics.",
      image: "/services/finance-and-stock-scraping/finance-stock-quotes.svg",
      imageAlt: "Real-time quote extraction illustration",
      bulletPoints: [
        {
          title: "Intraday Price Tracking",
          desc: "Follow minute-by-minute price moves, volume surges, and trend shifts for key tickers.",
        },
        {
          title: "Order Book Signals",
          desc: "Scrape bid/ask depth where available to detect short-term liquidity and directional pressure.",
        },
        {
          title: "High-Frequency Refresh",
          desc: "Refresh quotes at the cadence your strategy requires, from minutes to seconds.",
        },
      ],
    },
    {
      title: "Fundamentals, Filings & Corporate Event Capture",
      description:
        "Extract financial statements, regulatory filings, and corporate event details from investor relations pages, EDGAR archives, and analyst research portals. This gives you the underlying context behind every price move.",
      image: "/services/finance-and-stock-scraping/finance-stock-fundamentals.svg",
      imageAlt: "Financial fundamentals illustration",
      bulletPoints: [
        {
          title: "Statement Metrics",
          desc: "Pull revenue, net income, EBITDA, cash flow, leverage ratios, and balance sheet items from trusted sources.",
        },
        {
          title: "Earnings & Guidance",
          desc: "Capture reported results, future forecasts, and management commentary as structured data.",
        },
        {
          title: "Corporate Actions",
          desc: "Track dividends, splits, buybacks, mergers, and other events that affect share economics.",
        },
      ],
    },
    {
      title: "Analyst Ratings & Sentiment Signal Generation",
      description:
        "Monitor analyst recommendations, target price changes, headline sentiment, and market commentary from top finance portals. Convert these signals into clean structured inputs for screening and alerting workflows.",
      image: "/services/finance-and-stock-scraping/finance-stock-sentiment.svg",
      imageAlt: "Analyst sentiment illustration",
      bulletPoints: [
        {
          title: "Rating Change Alerts",
          desc: "Extract buy, hold, and sell recommendations along with price target revisions.",
        },
        {
          title: "News Sentiment Mapping",
          desc: "Measure positive and negative sentiment from headlines, research notes, and earnings coverage.",
        },
        {
          title: "Trend Signal Generation",
          desc: "Capture momentum and sector rotation signals from combined price and sentiment data.",
        },
      ],
    },
  ],

  // Benefits section
  benefitsTitle: "Why Finance Teams Choose Our Data",
  benefits: [
    {
      title: "Faster Model Calibration",
      content:
        "Receive clean, normalized market and fundamentals data immediately when markets move so your models and dashboards reflect live conditions instead of stale spreadsheets.",
    },
    {
      title: "Better Risk Oversight",
      content:
        "Monitor corporate events, insider transactions, and analyst rating shifts across your watchlist to identify risk factors before they affect portfolios.",
    },
    {
      title: "Competitive Intelligence",
      content:
        "Compare valuation spreads, sentiment, and sector exposures across peers to uncover relative value and market positioning insights.",
    },
    {
      title: "Automated Delivery",
      content:
        "Get scraped financial datasets delivered as CSV, JSON, API payloads, or cloud exports so your trading desk, research team, or fintech product can consume them without manual processing.",
    },
  ],
  benefitsImage: "/services/finance-and-stock-scraping/finance-stock-benefits.svg",
  benefitsImageAlt: "Finance and stock data benefits illustration",

  // Everything You Need section (Grid)
  gridSectionTitle: "What Our Finance Data Pipeline Provides",
  gridSectionDescription:
    "Everything you need to support trading desks, investment research, fund operations, and fintech products with reliable market and corporate data.",
  gridFeatures: [
    {
      icon: BarChart3,
      title: "Price & Performance Metrics",
      description:
        "Extract historical returns, volatility, and benchmark comparison data for every ticker.",
    },
    {
      icon: Database,
      title: "Clean Structured Delivery",
      description:
        "Receive deduplicated datasets ready for BI, analytics, or database ingestion.",
    },
    {
      icon: Settings,
      title: "Custom Field Mapping",
      description:
        "Map scraped fields to your internal schema, including custom ratios and proprietary scoring metrics.",
    },
    {
      icon: ShieldCheck,
      title: "Compliance-Safe Extraction",
      description:
        "Gather only publicly accessible financial data while respecting terms of service and regulator expectations.",
    },
    {
      icon: Clock,
      title: "Always-On Monitoring",
      description:
        "Continuously watch key tickers, sectors, or watchlists for new events and data updates.",
    },
    {
      icon: Globe,
      title: "Global Exchange Coverage",
      description:
        "Support multiple markets including NYSE, NASDAQ, LSE, HKEX, and leading regional exchanges.",
    },
  ],

  // Popular Use Cases section
  useCasesSectionTitle: "Finance Use Cases Powered by Scraped Data",
  useCasesSectionDescription:
    "From investment research to product data feeds, these are the most common ways customers use finance and stock scraping.",
  useCases: [
    {
      icon: Search,
      title: "Quantitative Research",
      description:
        "Feed price, volume, fundamentals, and sentiment into quant backtests and algorithmic models.",
    },
    {
      icon: Zap,
      title: "Earnings Season Tracking",
      description:
        "Monitor release dates, surprise beats/misses, and sentiment shifts during earnings cycles.",
    },
    {
      icon: MapPin,
      title: "Global Market Intelligence",
      description:
        "Track cross-border stock performance, foreign listings, and regional macro signals in one unified dataset.",
    },
    {
      icon: FileText,
      title: "Fintech Data Feeds",
      description:
        "Power dashboards, screening tools, and portfolio analytics with live financial datasets.",
    },
  ],

  // Platforms section
  platformsSectionTitle: "Sources We Scrape for Finance & Stock Insights",
  platformsSectionDescription:
    "We gather data from the major finance portals, market data platforms, regulatory archives, and research sites used by professional investors.",
  platforms: [
    {
      imagePath: "/services/finance-and-stock-scraping/finance-icons/yahoo-finance.svg",
      name: "Yahoo Finance",
    },
    {
      imagePath: "/services/finance-and-stock-scraping/finance-icons/google-finance.svg",
      name: "Google Finance",
    },
    {
      imagePath: "/services/finance-and-stock-scraping/finance-icons/bloomberg.svg",
      name: "Bloomberg",
    },
    {
      imagePath: "/services/finance-and-stock-scraping/finance-icons/marketwatch.svg",
      name: "MarketWatch",
    },
    {
      imagePath: "/services/finance-and-stock-scraping/finance-icons/finviz.svg",
      name: "Finviz",
    },
    {
      imagePath: "/services/finance-and-stock-scraping/finance-icons/sec.svg",
      name: "SEC EDGAR",
    },
    {
      imagePath: "/services/finance-and-stock-scraping/finance-icons/iex-cloud.svg",
      name: "IEX Cloud",
    },
    {
      imagePath: "/services/finance-and-stock-scraping/finance-icons/alpha-vantage.svg",
      name: "Alpha Vantage",
    },
  ],
};
