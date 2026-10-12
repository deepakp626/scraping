import {
  ShoppingBag,
  Tag,
  Car,
  Store,
  Zap,
  Database,
  Plane,
  Pill,
  Utensils,
  Globe,
  Home,
  BarChart3,
  Film,
  Users,
  Briefcase,
  Wine
} from 'lucide-react';
import React from 'react';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  tagline: string;
  description: string;
  features: string[];
  link: string;
  targetWebsites: string[];
  extractedDataPoints: string[];
  detailedOverview: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'ecommerce',
    slug: 'ecommerce-scraping',
    title: 'Ecommerce Scraping',
    category: 'E-commerce',
    icon: ShoppingBag,
    tagline: 'Extract product details, pricing, reviews, and stock status.',
    description: 'Track changes on major marketplaces and direct-to-consumer stores. Monitor competitor pricing, product listings, variations, and customer sentiment automatically.',
    features: ['Price & Stock Monitoring', 'Variant & Option Mapping', 'Review & Sentiment Analytics'],
    link: '/services/ecommerce-scraping',
    targetWebsites: ['Amazon', 'eBay', 'Walmart', 'Target', 'BestBuy', 'Shopify Stores'],
    extractedDataPoints: ['Product Name', 'Price & Currency', 'Inventory Status', 'Variations (Size/Color)', 'Ratings & Reviews', 'Product Description', 'Images & Media'],
    detailedOverview: 'Supercharge your pricing intelligence and retail analytics. Extract product details, live price feeds, customer reviews, and stock availability across major ecommerce marketplaces and brand sites to optimize your sales strategy.'
  },
  {
    id: 'fashion',
    slug: 'fashion-scraping',
    title: 'Fashion Scraping',
    category: 'E-commerce',
    icon: Tag,
    tagline: 'Track fashion trends, colorways, sizes, and stock across brands.',
    description: 'Extract product assortments, specifications, and style characteristics. Ideal for inventory forecasting, visual merchandising, and competitor benchmarking.',
    features: ['High-res Image Extraction', 'Color & Size Mapping', 'New Arrival Alerts'],
    link: '/services/fashion-scraping',
    targetWebsites: ['ASOS', 'Zara', 'H&M', 'Nike', 'Nordstrom', 'Farfetch'],
    extractedDataPoints: ['Collection Names', 'Colorways & Sizes', 'Inventory Quantities', 'High-Res Images', 'Discount Rates', 'Material Specs'],
    detailedOverview: 'Track real-time catalog changes, inventory levels, trends, and seasonal collections across fashion portals. Perfect for brand monitoring, visual merchandising, and product line benchmarking.'
  },
  {
    id: 'car-rental',
    slug: 'car-rental-data-scraping',
    title: 'Car Rental Scraping',
    category: 'Travel & Transport',
    icon: Car,
    tagline: 'Extract rates, availability, and fleet configurations across regions.',
    description: 'Monitor vehicle rental prices, pick-up/drop-off locations, rental options, and insurance details from major global and local operators.',
    features: ['Geo-Targeted Rate Scraping', 'Fleet Availability Tracking', 'Dynamic Pricing Analytics'],
    link: '/services/car-rental-data-scraping',
    targetWebsites: ['Hertz', 'Avis', 'Enterprise', 'Kayak', 'Rentalcars.com', 'Sixt'],
    extractedDataPoints: ['Vehicle Class', 'Daily Rental Rates', 'Pick-up/Drop-off Times', 'Fuel Policies', 'Included Insurance', 'Provider Details'],
    detailedOverview: 'Acquire geotargeted rate listings, pick-up locations, and fleet availability from global car rental portals. Feed rates straight into competitive yield managers and dashboards.'
  },
  {
    id: 'grocery',
    slug: 'grocery-scraping',
    title: 'Grocery Scraping',
    category: 'Grocery & Retail',
    icon: Store,
    tagline: 'Track supermarket items, categories, local pricing, and discounts.',
    description: 'Monitor catalog availability and retail prices across different physical store locations, zip codes, and grocery delivery channels.',
    features: ['ZIP-Code Level Scraping', 'Multi-Store Comparison', 'Promo & Coupon Tracking'],
    link: '/services/grocery-scraping',
    targetWebsites: ['Kroger', 'Tesco', 'Instacart', 'Woolworths', 'Carrefour', 'Walmart Grocery'],
    extractedDataPoints: ['SKU & Barcodes', 'Regular & Sale Prices', 'Category Hierarchies', 'Promotions & Coupons', 'Store Location Data', 'Nutritional Information'],
    detailedOverview: 'Gather localized pricing, promotion mechanics, and shelf shares down to zip-code levels from regional supermarkets and delivery channels.'
  },
  {
    id: 'quick-commerce',
    slug: 'quick-commerce-scraping',
    title: 'Quick Commerce Scraping',
    category: 'Grocery & Retail',
    icon: Zap,
    tagline: 'Real-time share-of-shelf and stock tracking on quick delivery apps.',
    description: 'Track dynamic availability, delivery times, dark-store inventories, and flash promotions on quick commerce platforms down to sub-hour frequencies.',
    features: ['Sub-Hour Frequencies', 'Dark Store Coverage', 'Out-of-Stock Monitoring'],
    link: '/services/quick-commerce-scraping',
    targetWebsites: ['Gorillas', 'Flink', 'Getir', 'Gopuff', 'Zepto', 'Blinkit'],
    extractedDataPoints: ['Dark Store Stock', 'Delivery Time Estimates', 'Flash Sale Banner Data', 'Product Availability', 'Real-time Markups'],
    detailedOverview: 'Track dynamic out-of-stock listings, dark store inventories, and promotional placements on instant-delivery apps with sub-hour precision.'
  },
  {
    id: 'fmcg-data',
    slug: 'quick-commerce-fmcg-data-scraping',
    title: 'FMCG Data Scraping',
    category: 'Grocery & Retail',
    icon: Database,
    tagline: 'Monitor consumer brand visibility, ratings, and banners.',
    description: 'Collect search rankings, banner ads, organic shelf space, reviews, and ratings for consumer packaged goods to evaluate digital shelf performance.',
    features: ['Share of Search Tracking', 'Banner Ad Monitoring', 'Brand Competitor Auditing'],
    link: '/services/quick-commerce-fmcg-data-scraping',
    targetWebsites: ['Ocado', 'Sainsburys', 'Walmart', 'Instacart', 'Amazon Fresh'],
    extractedDataPoints: ['Search Result Rankings', 'Organic Shelf Share', 'Banner Advertisements', 'Competitor Brand Placements', 'Sponsored Listings'],
    detailedOverview: 'Audit digital shelf performance, share-of-search rankings, and brand visibility banners to measure compliance and evaluate digital marketing campaigns.'
  },
  {
    id: 'travel',
    slug: 'travel-data-scraping',
    title: 'Travel Scraping',
    category: 'Travel & Transport',
    icon: Plane,
    tagline: 'Scrape flights, hotels, tour packages, and vacation bookings.',
    description: 'Extract routes, fares, hotel availability, room rates, and user reviews from online travel agencies, airline sites, and hotel booking portals.',
    features: ['Multi-Source Fare Parsing', 'Hotel Inventory Mapping', 'Dynamic Price Extraction'],
    link: '/services/travel-data-scraping',
    targetWebsites: ['Booking.com', 'Expedia', 'Airbnb', 'Skyscanner', 'Tripadvisor', 'Agoda'],
    extractedDataPoints: ['Flight Schedules & Fares', 'Hotel Room Availability', 'Room Rates & Amenities', 'Review Sentiments', 'Location Coordinates'],
    detailedOverview: 'Collect lodging details, flight options, fare changes, and user reviews from across online travel portals. Enable dynamic booking models and competitive market dashboards.'
  },
  {
    id: 'healthcare',
    slug: 'healthcare-data-scraping',
    title: 'Healthcare Scraping',
    category: 'Other Industries',
    icon: Pill,
    tagline: 'Extract medical directories, pharma pricing, and clinical assets.',
    description: 'Acquire doctor directories, hospital listings, pharmaceutical pricing, FDA documents, and medical journal information with total precision and compliance.',
    features: ['Compliant Extraction', 'Directory Verification', 'Scientific Data Mapping'],
    link: '/services/healthcare-data-scraping',
    targetWebsites: ['Zocdoc', 'WebMD', 'FDA Catalog', 'PubMed', 'Pharma price books'],
    extractedDataPoints: ['Doctor Profiles & NPIs', 'Clinic Address & Contact', 'Drug List Prices', 'Scientific Journal Abstracts', 'FDA Approvals'],
    detailedOverview: 'Extract provider directories, medical assets, publication indexes, and FDA listings with absolute precision, adhering to strict GDPR, HIPAA-compliant standards.'
  },
  {
    id: 'food',
    slug: 'food-data-scraping',
    title: 'Food Scraping',
    category: 'Food & Delivery',
    icon: Utensils,
    tagline: 'Scrape restaurant listings, menus, operating hours, and details.',
    description: 'Extract restaurant details, locations, contact info, ratings, food items, ingredients, prices, and menus from major maps, portals, and directories.',
    features: ['Menu Hierarchy Parsing', 'Restaurant Metadata Crawling', 'Review Aggregation'],
    link: '/services/food-data-scraping',
    targetWebsites: ['Yelp', 'Tripadvisor', 'Zomato', 'OpenTable', 'Google Maps'],
    extractedDataPoints: ['Menu Item Lists', 'Prices & Portion Sizes', 'Operating Hours', 'Address & Geolocation', 'User Star Ratings', 'Reviews count'],
    detailedOverview: 'Scrape restaurant catalogs, structured menu listings, hours of operations, and coordinates across popular directories and review websites.'
  },
  {
    id: 'food-delivery',
    slug: 'food-delivery-data-scraping-service',
    title: 'Food Delivery Scraping',
    category: 'Food & Delivery',
    icon: Globe,
    tagline: 'Monitor delivery platforms for restaurant menus, pricing, and ratings.',
    description: 'Track price markups, exclusive promotions, menu coverage, delivery fees, and estimated delivery times across delivery providers in real-time.',
    features: ['Delivery Provider Comparison', 'Geo-targeted Coordinates', 'Promo & Markup Tracking'],
    link: '/services/food-delivery-data-scraping-service',
    targetWebsites: ['UberEats', 'DoorDash', 'Grubhub', 'Deliveroo', 'JustEat'],
    extractedDataPoints: ['Restaurant Menus', 'Delivery Fee Structures', 'Dynamic Estimated Delivery Times', 'Promotional Campaigns', 'Markup Adjustments'],
    detailedOverview: 'Track localized food menu listings, markups, and promotional details across multiple food delivery platforms in real time.'
  },
  {
    id: 'real-estate',
    slug: 'real-estate-property-data-scraping',
    title: 'Real Estate Scraping',
    category: 'Real Estate',
    icon: Home,
    tagline: 'Scrape property listings, agents, sales history, and metrics.',
    description: 'Collect buying/renting prices, property coordinates, listing descriptions, agent details, and historical transaction logs from property portals.',
    features: ['Interactive Map Parsing', 'Historical Price Mapping', 'Agent Contact Extraction'],
    link: '/services/real-estate-property-data-scraping',
    targetWebsites: ['Zillow', 'Redfin', 'Realtor.com', 'Rightmove', 'Trulia'],
    extractedDataPoints: ['Property Addresses', 'Sale & Rental Prices', 'Number of Beds/Baths', 'Agent Contact Info', 'Property Coordinate Mapping', 'Listing Description'],
    detailedOverview: 'Automate listing catalog extraction, coordinates mapping, sales history records, and agent listings from major regional property listing portals.'
  },
  {
    id: 'finance',
    slug: 'finance-and-stock-scraping',
    title: 'Finance & Stock Scraping',
    category: 'Finance & Stock',
    icon: BarChart3,
    tagline: 'Extract financial statements, stock prices, news, and reports.',
    description: 'Scrape real-time stock ticks, SEC filings, financial ratios, company press releases, and news sentiments to power financial and investment models.',
    features: ['SEC Filings Parser', 'Press Release Tracking', 'Market Data Extraction'],
    link: '/services/finance-and-stock-scraping',
    targetWebsites: ['Yahoo Finance', 'SEC Edgar', 'Bloomberg', 'Reuters', 'MarketWatch'],
    extractedDataPoints: ['Financial Statements (10-K/Q)', 'Live Stock Prices', 'Press Releases', 'News Sentiment Indicators', 'SEC Filings Links'],
    detailedOverview: 'Ingest stock quote histories, public SEC filings, and news publications. Feed parsed tables and sentiments directly into trading algorithms and market risk trackers.'
  },
  {
    id: 'ott-streaming',
    slug: 'ott-streaming-data-scraping-service',
    title: 'OTT Scraping',
    category: 'Media & Social',
    icon: Film,
    tagline: 'Monitor catalog content, popularity, pricing, and languages.',
    description: 'Acquire content listings, ratings, genres, release dates, and localized audio/subtitle availability across major streaming platforms.',
    features: ['Catalog Content Auditing', 'Region-specific Libraries', 'Metadata Enrichment'],
    link: '/services/ott-streaming-data-scraping-service',
    targetWebsites: ['Netflix', 'Amazon Prime', 'Disney+', 'HBO Max', 'Hulu'],
    extractedDataPoints: ['Content Catalogue Titles', 'Release Dates', 'Genre Categorization', 'Audio & Subtitle Languages', 'Regional Popularity Lists'],
    detailedOverview: 'Monitor content catalogs, regional license availability, launch dates, genre lists, and subtitles supported across major streaming channels.'
  },
  {
    id: 'social-media',
    slug: 'social-media-scraping-services',
    title: 'Social Media Scraping',
    category: 'Media & Social',
    icon: Users,
    tagline: 'Extract profiles, hashtags, posts, and engagement metrics.',
    description: 'Monitor public feeds, influencer profiles, comment sections, and trending topics across channels to perform brand auditing and market research.',
    features: ['Anti-detection Crawling', 'Engagement Rate Calculator', 'Trending Topics Tracking'],
    link: '/services/social-media-scraping-services',
    targetWebsites: ['Reddit', 'Twitter (X)', 'Instagram', 'Pinterest', 'YouTube'],
    extractedDataPoints: ['Hashtag Trends', 'Public Posts & Captions', 'Engagement Counters', 'Profile Bio Info', 'Comment Sentiments'],
    detailedOverview: 'Collect public social feeds, comments, profiles, and trending topics to build social listening tools, brand audits, and sentiment trackers.'
  },
  {
    id: 'recruitment',
    slug: 'recruitment-data-scraping-service',
    title: 'Recruitment Scraping',
    category: 'Other Industries',
    icon: Briefcase,
    tagline: 'Scrape jobs, requirements, salaries, and corporate trends.',
    description: 'Monitor hiring activities, job postings, remote options, technical skill requirements, and salary listings across job boards and career portals.',
    features: ['Salary Normalization', 'Skill Keyword Tagging', 'Hiring Volume Tracking'],
    link: '/services/recruitment-data-scraping-service',
    targetWebsites: ['Indeed', 'LinkedIn', 'Glassdoor', 'ZipRecruiter', 'Monster'],
    extractedDataPoints: ['Job Titles & Roles', 'Company Profiles', 'Salary Ranges', 'Required Skills Tags', 'Hiring Locations', 'Post Timestamps'],
    detailedOverview: 'Crawl open position listings, job profiles, and required capabilities. Track recruitment trends, wage variations, and active corporate hiring levels.'
  },
  {
    id: 'liquor',
    slug: 'liquor-or-alchol-data-scraping',
    title: 'Liquor Scraping',
    category: 'Other Industries',
    icon: Wine,
    tagline: 'Extract specs, pricing, and stocks for wines, spirits, and beers.',
    description: 'Monitor liquor inventories, vintage details, bottle sizes, alcohol percentage, pricing, and merchant offers across e-commerce distributors.',
    features: ['Age Gate Bypassing', 'SKU-Level Matching', 'Inventory Levels Crawling'],
    link: '/services/liquor-or-alchol-data-scraping',
    targetWebsites: ['Total Wine', 'Drizly', 'BevMo', 'Wine.com', 'Local Distributors'],
    extractedDataPoints: ['Bottle Volumes', 'Vintage Years', 'Alcohol By Volume (ABV)', 'Price Comparison', 'In-stock Quantities', 'Merchant Placements'],
    detailedOverview: 'Extract price details, catalog characteristics, and inventory status of wines, spirits, and beers. Navigate age-verification gates automatically.'
  }
];

export const getServiceBySlug = (slug: string): ServiceItem | undefined => {
  const decodedSlug = decodeURIComponent(slug);
  return servicesData.find((service) => service.slug === decodedSlug);
};

export const getAllServiceSlugs = (): string[] => {
  return servicesData.map((service) => service.slug);
};
