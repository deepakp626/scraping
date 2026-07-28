"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  BarChart3,
  Tag,
  Star,
  RefreshCw,
  Database,
  ShieldCheck,
  Globe,
  Zap,
  TrendingUp,
  Package,
  Search,
  Clock,
} from "lucide-react";

/* ─── Static data ─────────────────────────────────────────── */

const ecommerIcons = [
    {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
    {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
        {
      imagePath: "/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg",
      name: "Flipkard"
    },
]

const benefits = [
  {
    title: "Real-Time Product Insights",
    content:
      "Track product availability, pricing, and category updates from multiple online stores in real time to stay informed and competitive.",
  },
  {
    title: "Accurate Data Collection",
    content:
      "Collect structured product information including names, prices, ratings, reviews, and images with high accuracy.",
  },
  {
    title: "Business Growth",
    content:
      "Use reliable market data to identify opportunities, optimize strategies, and improve overall business performance.",
  },
  {
    title: "Trend Analysis",
    content:
      "Analyze changing customer preferences, product demand, and market trends to make better business decisions.",
  },
  {
    title: "Performance Monitoring",
    content:
      "Monitor competitors and evaluate pricing, promotions, and inventory updates to maintain your market position.",
  },
  {
    title: "Smarter Decisions",
    content:
      "Transform collected data into meaningful insights that help your team make faster and more informed decisions.",
  },
];

const features = [
  {
    icon: BarChart3,
    title: "Price Monitoring",
    description:
      "Track real-time pricing across thousands of SKUs and marketplaces simultaneously, catching every flash sale and competitor price drop.",
  },
  {
    icon: Tag,
    title: "Product Catalog Sync",
    description:
      "Extract full product details — titles, descriptions, images, variants, and attributes — and keep your catalog in perfect sync.",
  },
  {
    icon: Star,
    title: "Review & Sentiment",
    description:
      "Aggregate customer reviews, ratings, and Q&A data to reveal sentiment trends and product improvement opportunities.",
  },
  {
    icon: Package,
    title: "Stock Availability",
    description:
      "Monitor inventory levels across warehouses and regions, alerting you before out-of-stock situations impact your revenue.",
  },
  {
    icon: RefreshCw,
    title: "Dynamic Updates",
    description:
      "Schedule hourly, daily, or custom-frequency crawls so your datasets are always fresh and decision-ready.",
  },
  {
    icon: Database,
    title: "Multi-Format Delivery",
    description:
      "Receive clean, structured data via CSV, JSON, Excel, or direct integration into your database or BI tool.",
  },
];

const useCases = [
  {
    icon: TrendingUp,
    title: "Competitor Intelligence",
    description:
      "Benchmark your pricing, assortment, and promotions against direct competitors on Amazon, Walmart, eBay, and beyond.",
  },
  {
    icon: Search,
    title: "Market Research",
    description:
      "Discover trending categories, top-performing SKUs, and white-space opportunities before your rivals do.",
  },
  {
    icon: Globe,
    title: "Global Marketplace Coverage",
    description:
      "Scrape localized data from 100+ regional e-commerce platforms to power geo-specific pricing strategies.",
  },
  {
    icon: Clock,
    title: "Demand Forecasting",
    description:
      "Feed historical pricing and stock data into demand-forecasting models to optimise reorder levels and reduce waste.",
  },
];

const highlights = [
  "Amazon, eBay, Walmart & 500+ marketplaces",
  "Direct-to-consumer & brand websites",
  "Product listings, variants & bundles",
  "Pricing, discounts & coupon codes",
  "Customer reviews & star ratings",
  "Stock levels & shipping details",
  "Seller & merchant profiles",
  "Sponsored & organic rankings",
];

const stats = [
  { value: "500+", label: "E-commerce Platforms" },
  { value: "99.5%", label: "Data Accuracy" },
  { value: "10M+", label: "Daily Records" },
  { value: "24/7", label: "Monitoring" },
];

/* ─── Page Component ──────────────────────────────────────── */

export default function EcommercePage() {
    const [active, setActive] = useState(0);
  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* Ambient background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] rounded-full bg-orange-500/5 blur-3xl" />
        <div className="absolute top-[40%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-red-500/5 blur-3xl" />
        <div className="absolute bottom-[5%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-orange-400/5 blur-3xl" />
      </div>

      {/* ══ HERO SECTION ══════════════════════════════════════ */}
      <section className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Text content */}
            <div className="flex flex-col justify-center">
              {/* Badge */}

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] mb-6">
                Web Scraping{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  eCommerce
                </span>{" "}
                Product Data
              </h1>

              {/* Body copy */}
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                Collect real-time, accurate data from e-commerce platforms with
                our powerful scraping API. Empower your business with actionable
                insights to enhance decision-making and stay competitive in
                today&apos;s fast-paced digital economy.
              </p>

              {/* Bullet highlights */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-10">
                {highlights.slice(0, 6).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={15} className="text-orange-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                >
                  <ShoppingBag size={16} />
                  Get Free Sample Data
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold text-sm hover:border-orange-500/40 hover:bg-orange-50/50 transition-all duration-300"
                >
                  View All Services
                </Link>
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/10 to-red-500/10 blur-2xl scale-95" />
              <div className="relative w-full max-w-lg mx-auto rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl shadow-slate-200/60">
                <Image
                  src="/services/ecommerce-data-scraping/ecommerce-data-scraping-hero-image.png"
                  alt="Ecommerce data scraping illustration"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ════════════════════════════════════════ */}
      <section className="relative z-10 border-y border-slate-100 bg-slate-50/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <span className="text-3xl sm:text-4xl font-black mb-2">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section with some information */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 text-center mb-6 leading-tight">
            What Are E-Commerce &amp;{" "}
            <span className="text-orange-500">Retail Data Scraping</span> API Services?
          </h2>

          {/* Paragraph */}
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-10">
            E-commerce data scraping API and retail data extraction services are powerful tools that
            help businesses extract actionable insights from online retail platforms. These APIs
            streamline data collection, enabling companies to monitor product prices, analyze customer
            reviews, and track competitor strategies in real time. By providing accurate and
            up-to-date information, these services empower businesses to optimize their pricing,
            understand market trends, and enhance their competitive edge.
          </p>

          {/* List */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              "Monitor product prices and availability for dynamic pricing strategies.",
              "Track competitors\u2019 offerings with the Competitor Price Monitoring API.",
              "Analyze customer reviews and ratings using the Customer Reviews Scraping API.",
              "Identify sales trends and seasonal patterns with the Market Trends Analysis API.",
              "Extract detailed product descriptions, images, and specifications efficiently.",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 hover:border-orange-400 transition-colors"
              >
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xs font-bold">
                  ✓
                </span>
                <span className="text-slate-600 text-base leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Detaile information Data field  */}

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white bg-gradient-to-br from-orange-50 to-red-50">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 text-center mb-6 leading-tight " >Detailed Compilation of Data Fields</h2>
        <p className="text-slate-500 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-10">Explore our detailed compilation, providing insights into your business needs. This overview covers essential elements for practical analysis, helping you make informed decisions. Click or hover on fields to map them to the phone mockup.</p>


        {/* this in display flex show image top in mobole and than show tect in tab and in desktop view show fist text div and than image and than third text div */}
        <div className="flex flex-col md:flex-row justify-center ">


          <div className="grid items-center grid-cols-2 grid-rows-5 gap-4 text-center  [&>*]:bg-white">
            <div className="p-2  rounded-lg shadow-lg ">Product Name</div>
            <div className="p-2  rounded-lg shadow-xl">Price</div>
            <div className="p-2  rounded-lg shadow-xl">Currency</div>
            <div className="p-2  rounded-lg shadow-xl">Category</div>
            <div className="p-2  rounded-lg shadow-xl">Brand</div>
            <div className="p-2  rounded-lg shadow-xl">Product ID</div>
            <div className="p-2  rounded-lg shadow-xl">Discounted Price</div>
            <div className="p-2 rounded-lg shadow-xl">Description</div>
            <div className="p-2 rounded-lg shadow-xl">Subcategory</div>
            <div className="p-2 rounded-lg shadow-xl">Availability Status</div>
          </div>

          <div className="flex justify-center ">
            <Image alt="Detailed Compilation of Data Fields" src={"/services/ecommerce-data-scraping/Gemini_Generated-removebg-preview_image.webp"} width={400} height={400} />
          </div>


          <div className="grid items-center grid-cols-2 grid-rows-5 gap-4 text-center [&>*]:bg-white">
            <div className="p-2  rounded-lg shadow-xl" >Shipping Costs</div>
            <div className="p-2  rounded-lg shadow-xl" >Delivery Time</div>
            <div className="p-2  rounded-lg shadow-xl" >Return Policy</div>
            <div className="p-2  rounded-lg shadow-xl" >Seller Name</div>
            <div className="p-2  rounded-lg shadow-xl" >Seller Rating</div>
            <div className="p-2  rounded-lg shadow-xl" >Number of Ratings</div>
            <div className="p-2 rounded-lg shadow-xl" >Reviews</div>
            <div className="p-2 rounded-lg shadow-xl" >Total Reviews</div>
            <div className="p-2 rounded-lg shadow-xl" >Total Reviews</div>
            <div className="p-2 rounded-lg shadow-xl" >Seller Information</div>
          </div>
        </div>

      </section>


      {/* Featues right and left content section  */}

      <section className=" py-10 md:py-20  bg-white    ">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 text-center mb-6 leading-tight">Powerful Features of Our E-Commerce Data Scraping Services</h2>

        {/* first div of left right content */}
        <div className="  mt-8 rounded-3xl overflow-hidden ">
          <div className="flex flex-col md:flex-row items-center gap-10 px-6 py-12 md:px-12">

            {/* Image Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="relative">
                {/* Glow blob behind image */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/20 to-red-400/20 blur-2xl scale-105" />
                <Image
                  className="relative mx-auto rounded-2xl shadow-2xl shadow-orange-200/60 border border-white/80 object-cover"
                  alt="Powerful Features of Our E-Commerce Data Scraping Services"
                  src="/services/ecommerce-data-scraping/vecteezy_online-shopping-concept_1903669.jpg"
                  width={500}
                  height={500}
                />
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 flex flex-col gap-5">
        
              {/* Heading */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                Real-Time E-Commerce{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  Data at Scale
                </span>
              </h2>

              {/* Description */}
              <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                Our E-Commerce Data APIs deliver accurate, structured, and real-time data from leading
                online marketplaces. With a single integration, power your analytics, pricing strategies,
                inventory monitoring, and business intelligence.
              </p>

              {/* Feature List */}
              <ul className="space-y-3">
                {[
                  {
                    title: "Product Information",
                    desc: "Product names, descriptions, images, specifications, SKUs, brands, and categories.",
                  },
                  {
                    title: "Pricing Intelligence",
                    desc: "Current prices, discounts, offers, historical price trends, and competitor pricing data.",
                  },
                  {
                    title: "Inventory & Availability",
                    desc: "Stock status, availability updates, delivery estimates, and real-time inventory changes.",
                  },
                  {
                    title: "Customer Insights",
                    desc: "Ratings, reviews, sentiment analysis, and buyer feedback for informed decision-making.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-3  "
                  >
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xs font-bold">
                      ✓
                    </span>
                    <span className="text-slate-600 text-sm md:text-base leading-relaxed">
                      <span className="font-bold text-slate-800">{item.title}: </span>
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>


        {/* Second left right content Div */}
      <div className="  mt-8 rounded-3xl overflow-hidden ">
          <div className="flex flex-col md:flex-row items-center gap-10 px-6 py-12 md:px-12">

            {/* Text Side */}
            <div className="w-full md:w-1/2 flex flex-col gap-5">
        
              {/* Heading */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                Seller & Merchant{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  Intelligence at a Glance
                </span>
              </h2>

              {/* Description */}
              <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                Go beyond product listings — extract rich seller profiles, fulfillment data, and
                marketplace rankings from 500+ global platforms. Our scraping infrastructure handles
                anti-bot systems, geo-restrictions, and pagination automatically so you get clean,
                structured data delivered straight to your pipeline.
              </p>

              {/* Feature List */}
              <ul className="space-y-3">
                {[
                  {
                    title: "Seller Profiles & Ratings",
                    desc: "Merchant names, storefronts, seller scores, feedback counts, and fulfillment types (FBA / FBM).",
                  },
                  {
                    title: "Search & Ranking Data",
                    desc: "Organic and sponsored product rankings, keyword positions, and Best Seller Rank (BSR) across categories.",
                  },
                  {
                    title: "Promotions & Deals",
                    desc: "Coupon codes, lightning deals, bundle offers, and limited-time discounts captured in real time.",
                  },
                  {
                    title: "Automated Data Delivery",
                    desc: "Scheduled exports via CSV, JSON, Excel, or direct API push to your warehouse, BI tool, or CRM.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xs font-bold">
                      ✓
                    </span>
                    <span className="text-slate-600 text-sm leading-relaxed">
                      <span className="font-bold text-slate-800">{item.title}: </span>
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>

            </div>

            {/* Image Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="relative">
                {/* Glow blob behind image */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/20 to-red-400/20 blur-2xl scale-105" />
                <Image
                  className="relative mx-auto rounded-2xl shadow-2xl shadow-orange-200/60 border border-white/80 object-cover"
                  alt="Powerful Features of Our E-Commerce Data Scraping Services"
                  src="/services/ecommerce-data-scraping/vecteezy_online-shopping-concept_1903669.jpg"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
      </div>


       {/* third left right content div  */}
        <div className="  mt-8 rounded-3xl overflow-hidden ">
          <div className="flex flex-col md:flex-row items-center gap-10 px-6 py-12 md:px-12">

            {/* Image Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="relative">
                {/* Glow blob behind image */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/20 to-red-400/20 blur-2xl scale-105" />
                <Image
                  className="relative mx-auto rounded-2xl shadow-2xl shadow-orange-200/60 border border-white/80 object-cover"
                  alt="Powerful Features of Our E-Commerce Data Scraping Services"
                  src="/services/ecommerce-data-scraping/vecteezy_online-shopping-concept_1903669.jpg"
                  width={500}
                  height={500}
                />
              </div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 flex flex-col gap-5">
        
              {/* Heading */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                Global Marketplace{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  Coverage & Research
                </span>
              </h2>

              {/* Description */}
              <p className="text-slate-500  text-base md:text-lg leading-relaxed">
                Unlock market trends before your competitors do. Our scraping engine covers 500+ regional
                and global e-commerce platforms — from Amazon and Walmart to Flipkart, Lazada, and niche
                DTC stores — giving you geo-specific insights to power location-aware strategies.
              </p>

              {/* Feature List */}
              <ul className="space-y-3">
                {[
                  {
                    title: "Trending Category Discovery",
                    desc: "Identify fast-rising product categories and emerging niches before they hit mainstream demand.",
                  },
                  {
                    title: "Regional Price Comparison",
                    desc: "Compare prices across countries and currencies to build geo-targeted pricing and localisation strategies.",
                  },
                  {
                    title: "Cross-Platform Coverage",
                    desc: "Scrape Amazon, eBay, Etsy, AliExpress, Shopify stores, and 490+ more platforms with one unified API.",
                  },
                  {
                    title: "White-Space Opportunity Detection",
                    desc: "Surface underserved product gaps and low-competition segments to guide your next product launch.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xs font-bold">
                      ✓
                    </span>
                    <span className="text-slate-600 text-sm leading-relaxed">
                      <span className="font-bold text-slate-800">{item.title}: </span>
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>

       {/*  fourth left rigjt content div */}
        <div className="  mt-8 rounded-3xl overflow-hidden ">
          <div className="flex flex-col md:flex-row items-center gap-10 px-6 py-12 md:px-12">

            {/* Text Side */}
            <div className="w-full md:w-1/2 flex flex-col gap-5">
        
              {/* Heading */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                Enterprise-Grade{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  Accuracy & Compliance
                </span>
              </h2>

              {/* Description */}
              <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                Data quality is non-negotiable. Our scraping infrastructure is built with 99.5% accuracy
                guarantees, smart deduplication, and GDPR-aligned collection practices. Whether you need
                a one-time snapshot or a continuous feed, we deliver data you can trust — at any scale.
              </p>

              {/* Feature List */}
              <ul className="space-y-3">
                {[
                  {
                    title: "99.5% Data Accuracy",
                    desc: "Rigorous validation pipelines catch errors, duplicates, and malformed records before delivery.",
                  },
                  {
                    title: "Anti-Bot Bypass",
                    desc: "Rotating proxies, CAPTCHA solving, and browser emulation ensure uninterrupted access to protected sites.",
                  },
                  {
                    title: "GDPR-Compliant Scraping",
                    desc: "Publicly available data only — collected, processed, and stored in line with international privacy regulations.",
                  },
                  {
                    title: "Scalable Infrastructure",
                    desc: "Handle millions of daily records with auto-scaling crawlers, guaranteed uptime SLAs, and 24/7 monitoring.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-xs font-bold">
                      ✓
                    </span>
                    <span className="text-slate-600 text-sm leading-relaxed">
                      <span className="font-bold text-slate-800">{item.title}: </span>
                      {item.desc}
                    </span>
                  </li>
                ))}
              </ul>

            </div>

            {/* Image Side */}
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div className="relative">
                {/* Glow blob behind image */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/20 to-red-400/20 blur-2xl scale-105" />
                <Image
                  className="relative mx-auto rounded-2xl shadow-2xl shadow-orange-200/60 border border-white/80 object-cover"
                  alt="Powerful Features of Our E-Commerce Data Scraping Services"
                  src="/services/ecommerce-data-scraping/vecteezy_online-shopping-concept_1903669.jpg"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
      </div>

      </section>


      {/*  benefit tab section */}

       <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Benefits of Our Data Scraping Services
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="">
            {benefits.map((item, index) => (
              <div key={index} className="border-b ">
                <button
                  onClick={() =>
                    setActive(active === index ? -1 : index)
                  }
                  className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
                >
                  <span className="text-xl font-semibold">
                    {item.title}
                  </span>

                  <span className="text-2xl">
                    {active === index ? "−" : "+"}
                  </span>
                </button>

                {active === index && (
                  <p className="pb-5 text-lg sm:text-xl text-gray-600 leading-7">
                    {item.content}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <Image
              src="/images/benefits.jpg"
              alt="Benefits"
              width={500}
              height={500}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>

      {/* ══ FEATURES SECTION ═════════════════════════════════ */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Everything You Need from{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                E-Commerce Data
              </span>
            </h2>
            {/* text-slate-500 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-10 */}
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed text-center max-w-3xl mx-auto mb-10">
              Our eCommerce scraping solution extracts every data point you need
              — at any scale, from any platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="group flex flex-col gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300 shadow-sm cursor-pointer"
                >
                  <div className="p-3 w-fit rounded-xl bg-orange-50 border border-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5 group-hover:text-orange-600 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      

      {/* ══ USE CASES SECTION ════════════════════════════════ */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
              Popular{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                Use Cases
              </span>
            </h2>
            <p className="text-slate-600 text-lg sm:text-xl max-w-xl mx-auto">
              Businesses across every industry use our eCommerce scraping
              solution to power critical decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {useCases.map((uc) => {
              const Icon = uc.icon;
              return (
                <div
                  key={uc.title}
                  className="group flex gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-orange-500/30 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="shrink-0 p-3 rounded-xl bg-orange-50 border border-orange-100 text-orange-600 h-fit group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5 group-hover:text-orange-600 transition-colors">
                      {uc.title}
                    </h3>
                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                      {uc.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Extract Data from Leading eCommerce Websites */}

      <section className="">
        <div className="container">
          <div className="w-[80%] mx-auto">

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 text-center"> Extract Data from Leading eCommerce Websites </h2>
            <p className="text-slate-600 text-lg sm:text-xl max-w-xl mx-auto text-center">We scrape data from all major eCommerce platforms, marketplaces, and online retailers worldwide.</p>
          </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4  place-items-center place-content-center  justify-items-center justify-center my-8 mx-auto">


              {
                ecommerIcons.map((item,index)=>{
                  return(
                <div key={index} className="flex flex-col justify-center items-center border-2 border-slate-200 rounded-lg shadow-md px-2 py-2 hover:border-orange-500/30 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer  w-[10rem] h-[8rem]">
                  {/* image */}
                  <div className="">
                      <Image
                        width={50}
                        height={50}
                        className="m-auto mb-4"
                        alt="ecommer scraper website flipkard"
                      src={"/services/ecommerce-data-scraping/ecommerce-icons/Flipkart.svg"} />
                  </div>
                  {/* name */}
                  <div className="">
                      <p className="font-semibold">Flipkart</p>
                  </div>
                </div>
                  )
                })
              }


              
            </div>

        </div>
      </section>

    </main>
  );
}
