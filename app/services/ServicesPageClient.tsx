'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Tag,
  Car,
  Plane,
  Store,
  Zap,
  Database,
  Pill,
  Utensils,
  Globe,
  Home,
  BarChart3,
  Film,
  Users,
  Briefcase,
  Wine,
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Server,
  Layers,
  Clock,
  Compass,
  Cpu,
  Sparkles,
  RefreshCw,
  Scale,
  Sliders,
  Code,
  Loader2,
  Send
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  tagline: string;
  description: string;
  features: string[];
  link: string;
}

const categories = [
  'All',
  'E-commerce',
  'Grocery & Retail',
  'Travel & Transport',
  'Food & Delivery',
  'Real Estate',
  'Finance & Stock',
  'Media & Social',
  'Other Industries'
];

const servicesData: ServiceItem[] = [
  {
    id: 'ecommerce',
    title: 'Ecommerce Scraping',
    category: 'E-commerce',
    icon: ShoppingBag,
    tagline: 'Extract product details, pricing, reviews, and stock status.',
    description: 'Track changes on major marketplaces and direct-to-consumer stores. Monitor competitor pricing, product listings, variations, and customer sentiment automatically.',
    features: ['Price & Stock Monitoring', 'Variant & Option Mapping', 'Review & Sentiment Analytics'],
    link: '/services/ecommerce-scraping'
  },
  {
    id: 'fashion',
    title: 'Fashion Scraping',
    category: 'E-commerce',
    icon: Tag,
    tagline: 'Track fashion trends, colorways, sizes, and stock across brands.',
    description: 'Extract product assortments, specifications, and style characteristics. Ideal for inventory forecasting, visual merchandising, and competitor benchmarking.',
    features: ['High-res Image Extraction', 'Color & Size Mapping', 'New Arrival Alerts'],
    link: '/services/fashion-scraping'
  },
  {
    id: 'car-rental',
    title: 'Car Rental Scraping',
    category: 'Travel & Transport',
    icon: Car,
    tagline: 'Extract rates, availability, and fleet configurations across regions.',
    description: 'Monitor vehicle rental prices, pick-up/drop-off locations, rental options, and insurance details from major global and local operators.',
    features: ['Geo-Targeted Rate Scraping', 'Fleet Availability Tracking', 'Dynamic Pricing Analytics'],
    link: '/services/car-rental-data-scraping'
  },
  {
    id: 'grocery',
    title: 'Grocery Scraping',
    category: 'Grocery & Retail',
    icon: Store,
    tagline: 'Track supermarket items, categories, local pricing, and discounts.',
    description: 'Monitor catalog availability and retail prices across different physical store locations, zip codes, and grocery delivery channels.',
    features: ['ZIP-Code Level Scraping', 'Multi-Store Comparison', 'Promo & Coupon Tracking'],
    link: '/services/grocery-scraping'
  },
  {
    id: 'quick-commerce',
    title: 'Quick Commerce Scraping',
    category: 'Grocery & Retail',
    icon: Zap,
    tagline: 'Real-time share-of-shelf and stock tracking on quick delivery apps.',
    description: 'Track dynamic availability, delivery times, dark-store inventories, and flash promotions on quick commerce platforms down to sub-hour frequencies.',
    features: ['Sub-Hour Frequencies', 'Dark Store Coverage', 'Out-of-Stock Monitoring'],
    link: '/services/quick-commerce-scraping'
  },
  {
    id: 'fmcg-data',
    title: 'FMCG Data Scraping',
    category: 'Grocery & Retail',
    icon: Database,
    tagline: 'Monitor consumer brand visibility, ratings, and banners.',
    description: 'Collect search rankings, banner ads, organic shelf space, reviews, and ratings for consumer packaged goods to evaluate digital shelf performance.',
    features: ['Share of Search Tracking', 'Banner Ad Monitoring', 'Brand Competitor Auditing'],
    link: '/services/quick-commerce-fmcg-data-scraping'
  },
  {
    id: 'travel',
    title: 'Travel Scraping',
    category: 'Travel & Transport',
    icon: Plane,
    tagline: 'Scrape flights, hotels, tour packages, and vacation bookings.',
    description: 'Extract routes, fares, hotel availability, room rates, and user reviews from online travel agencies, airline sites, and hotel booking portals.',
    features: ['Multi-Source Fare Parsing', 'Hotel Inventory Mapping', 'Dynamic Price Extraction'],
    link: '/services/travel-scraping'
  },
  {
    id: 'healthcare',
    title: 'Healthcare Scraping',
    category: 'Other Industries',
    icon: Pill,
    tagline: 'Extract medical directories, pharma pricing, and clinical assets.',
    description: 'Acquire doctor directories, hospital listings, pharmaceutical pricing, FDA documents, and medical journal information with total precision and compliance.',
    features: ['Compliant Extraction', 'Directory Verification', 'Scientific Data Mapping'],
    link: '/services/healthcare-data-scraping'
  },
  {
    id: 'food',
    title: 'Food Scraping',
    category: 'Food & Delivery',
    icon: Utensils,
    tagline: 'Scrape restaurant listings, menus, operating hours, and details.',
    description: 'Extract restaurant details, locations, contact info, ratings, food items, ingredients, prices, and menus from major maps, portals, and directories.',
    features: ['Menu Hierarchy Parsing', 'Restaurant Metadata Crawling', 'Review Aggregation'],
    link: '/services/food-data-scraping'
  },
  {
    id: 'food-delivery',
    title: 'Food Delivery Scraping',
    category: 'Food & Delivery',
    icon: Globe,
    tagline: 'Monitor delivery platforms for restaurant menus, pricing, and ratings.',
    description: 'Track price markups, exclusive promotions, menu coverage, delivery fees, and estimated delivery times across delivery providers in real-time.',
    features: ['Delivery Provider Comparison', 'Geo-targeted Coordinates', 'Promo & Markup Tracking'],
    link: '/services/food-delivery-data-scraping-service'
  },
  {
    id: 'real-estate',
    title: 'Real Estate Scraping',
    category: 'Real Estate',
    icon: Home,
    tagline: 'Scrape property listings, agents, sales history, and metrics.',
    description: 'Collect buying/renting prices, property coordinates, listing descriptions, agent details, and historical transaction logs from property portals.',
    features: ['Interactive Map Parsing', 'Historical Price Mapping', 'Agent Contact Extraction'],
    link: '/services/real-estate-property-data-scraping'
  },
  {
    id: 'finance',
    title: 'Finance & Stock Scraping',
    category: 'Finance & Stock',
    icon: BarChart3,
    tagline: 'Extract financial statements, stock prices, news, and reports.',
    description: 'Scrape real-time stock ticks, SEC filings, financial ratios, company press releases, and news sentiments to power financial and investment models.',
    features: ['SEC Filings Parser', 'Press Release Tracking', 'Market Data Extraction'],
    link: '/services/finance-and-stock-scraping'
  },
  {
    id: 'ott-streaming',
    title: 'OTT Scraping',
    category: 'Media & Social',
    icon: Film,
    tagline: 'Monitor catalog content, popularity, pricing, and languages.',
    description: 'Acquire content listings, ratings, genres, release dates, and localized audio/subtitle availability across major streaming platforms.',
    features: ['Catalog Content Auditing', 'Region-specific Libraries', 'Metadata Enrichment'],
    link: '/services/ott-streaming-data-scraping-service'
  },
  {
    id: 'social-media',
    title: 'Social Media Scraping',
    category: 'Media & Social',
    icon: Users,
    tagline: 'Extract profiles, hashtags, posts, and engagement metrics.',
    description: 'Monitor public feeds, influencer profiles, comment sections, and trending topics across channels to perform brand auditing and market research.',
    features: ['Anti-detection Crawling', 'Engagement Rate Calculator', 'Trending Topics Tracking'],
    link: '/services/social-media-scraping-services'
  },
  {
    id: 'recruitment',
    title: 'Recruitment Scraping',
    category: 'Other Industries',
    icon: Briefcase,
    tagline: 'Scrape jobs, requirements, salaries, and corporate trends.',
    description: 'Monitor hiring activities, job postings, remote options, technical skill requirements, and salary listings across job boards and career portals.',
    features: ['Salary Normalization', 'Skill Keyword Tagging', 'Hiring Volume Tracking'],
    link: '/services/recruitment-data-scraping-service'
  },
  {
    id: 'liquor',
    title: 'Liquor Scraping',
    category: 'Other Industries',
    icon: Wine,
    tagline: 'Extract specs, pricing, and stocks for wines, spirits, and beers.',
    description: 'Monitor liquor inventories, vintage details, bottle sizes, alcohol percentage, pricing, and merchant offers across e-commerce distributors.',
    features: ['Age Gate Bypassing', 'SKU-Level Matching', 'Inventory Levels Crawling'],
    link: '/services/liquor-or-alchol-data-scraping'
  }
];

const capabilities = [
  {
    icon: Server,
    title: 'IP Rotation & Residential Proxies',
    description: 'Bypass geolocation bans and rate limits using our pool of millions of clean residential proxies across 100+ countries.'
  },
  {
    icon: ShieldCheck,
    title: 'Anti-Bot Bypass Engine',
    description: 'Solve Captchas and evade detection systems like Cloudflare, Akamai, and Datadome with customized headless browser emulation.'
  },
  {
    icon: Clock,
    title: 'Automated Scheduling & Webhooks',
    description: 'Run extractions on a custom cron timetable — hourly, daily, or weekly. Receive alerts via webhook callbacks immediately when runs finish.'
  },
  {
    icon: Database,
    title: 'Multi-Format Delivery',
    description: 'Get clean structured data delivered to S3, Google Drive, or Postgres in your choice of CSV, JSON, Excel, or custom API schemas.'
  },
  {
    icon: Layers,
    title: 'Data Integrity Verification',
    description: 'Every record is passed through automated schema tests to filter empty rows, detect format drift, and ensure high reliability.'
  },
  {
    icon: Cpu,
    title: 'Dynamic JS Rendering',
    description: 'Load single-page applications (SPAs) and dynamic AJAX elements seamlessly. We execute Javascript exactly as a real browser does.'
  }
];

const keyFeatures = [
  {
    title: '99%+ Success Rate',
    description: 'Evade IP bans and anti-scraping firewalls using advanced browser fingerprinting and automatic retries.',
    icon: ShieldCheck,
  },
  {
    title: 'Rotating Proxies',
    description: 'Access millions of real user IPs across 190+ countries to scrape localized content safely.',
    icon: RefreshCw,
  },
  {
    title: 'JS Rendering',
    description: 'Execute React, Angular, Vue, and AJAX-heavy single-page applications accurately in headless mode.',
    icon: Code,
  },
  {
    title: 'Flexible Scraping',
    description: 'Get near-instant data via direct APIs, or schedule recurring bulk crawls using our robust cron engine.',
    icon: Clock,
  },
  {
    title: 'Clean Delivery',
    description: 'Receive data formatted exactly as you need it: JSON, CSV, Excel, or directly integrated into your databases.',
    icon: Database,
  },
  {
    title: 'GDPR / Legal Support',
    description: 'We only scrape publicly accessible data and fully respect privacy regulations and terms of service.',
    icon: Scale,
  },
  {
    title: 'Scalable Infrastructure',
    description: 'Our cloud architecture scales horizontally, allowing you to crawl high-volume sites without throttling.',
    icon: Layers,
  },
  {
    title: 'White-Label APIs',
    description: 'Expose scraping capabilities directly to your clients with custom branding and API gateways.',
    icon: Sliders,
  },
];

export default function ServicesPageClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    frequency: 'daily',
    volume: '50k-500k',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectField = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const filteredServices = useMemo(() => {
    return servicesData.filter((service) => {
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-hidden pb-16">
      {/* Background decorations */}
      <div className="absolute top-[10%] left-[-10%] w-[30rem] h-[30rem] rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[30rem] h-[30rem] rounded-full bg-red-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[40rem] h-[40rem] rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 pt-28 pb-16 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-semibold uppercase tracking-wider">
          <Sparkles size={14} className="text-orange-400 animate-pulse" />
          <span className="text-sm">Web Scraping Solutions</span>
        </div>
        <h1 className="text-xl font-black tracking-tight leading-none mb-6">
          Professional{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
            Web Scraping
          </span>{' '}
          Services
        </h1>
        <p className="text-slate-600 text-base max-w-3xl mx-auto mb-8 leading-relaxed">
          Scale your business with high-quality, structured data feeds. We design, build, and maintain custom data extraction pipelines for any website, any location, and any volume.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-lg mx-auto mb-12">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search web scraping services (e-commerce, real estate...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-2xl text-slate-900 placeholder-slate-400 outline-none transition-all shadow-sm"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'bg-slate-100 text-slate-600 border border-slate-200/80 hover:text-slate-900 hover:bg-slate-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 mb-24">
        {filteredServices.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group flex flex-col justify-between p-6 bg-slate-50 border border-slate-200/80 rounded-3xl hover:border-orange-500/30 transition-all duration-300 shadow-sm"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase font-bold tracking-widest text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100">
                        {service.category}
                      </span>
                      <div className="p-2 bg-slate-100 rounded-xl group-hover:bg-orange-50 transition-colors">
                        <Icon size={20} className="text-slate-500 group-hover:text-orange-600 transition-colors" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm font-semibold text-slate-700 mb-3 leading-snug">
                      {service.tagline}
                    </p>
                    <p className="text-base text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features checklist */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 size={15} className="text-orange-500 mt-0.5 shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <Link
                    href={service.link}
                    className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-orange-500 text-sm font-bold text-slate-700 hover:text-white transition-all group-hover:shadow-md duration-300 border border-slate-200 hover:border-orange-500"
                  >
                    <span className="text-sm">Request Data Set</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200 max-w-md mx-auto">
            <Compass className="mx-auto text-slate-400 mb-4 animate-bounce" size={40} />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No matching services</h3>
            <p className="text-slate-600 text-base mb-6">
              We build custom web scrapers for any website. Contact our team to design a bespoke extraction workflow.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-linear-to-r from-orange-500 to-red-600 text-white font-bold px-6 py-2.5 rounded-xl hover:scale-105 transition-all text-sm"
            >
              Get Custom Solution
            </Link>
          </div>
        )}
      </section>

      {/* Key Features & Benefits Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 border-t border-slate-100 pt-20 pb-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black mt-2 text-slate-900">
            Key Features &amp; Benefits
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-base">
            Engineered to bypass barriers, maintain consistent deliveries, and handle extreme web scraping scale.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {keyFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={index}
                className="group flex flex-col justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-orange-500/20 hover:-translate-y-1 transition-all duration-300 hover:bg-slate-100/50"
              >
                <div>
                  <div className="shrink-0 p-2.5 bg-orange-50 rounded-xl h-fit border border-orange-100 w-fit mb-4 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 text-orange-600">
                    <Icon size={20} className="transition-transform group-hover:rotate-[360deg] duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-0.5">{feat.title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 border-t border-slate-100 pt-20 pb-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black mt-2 text-slate-900">
            Built for Scale, Speed, &amp; Accuracy
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-base">
            Our cloud scraping engine handles javascript rendering, rate limiters, anti-bot layers, and data validation automatically.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <div
                key={index}
                className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all hover:bg-slate-100/50"
              >
                <div className="shrink-0 p-3 bg-orange-50 rounded-xl h-fit border border-orange-100">
                  <Icon size={20} className="text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{cap.title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed">{cap.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>


    </main>
  );
}
