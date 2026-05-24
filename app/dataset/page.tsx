"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, ShoppingBag, Truck, Apple, ShoppingCart, Home, Wine, Share2, Globe } from 'lucide-react';


/* ─────────────────────────── DATA ─────────────────────────────── */

const stats = [
  { value: "10M+", label: "Data Records Delivered" },
  { value: "200+", label: "Websites Scraped" },
  { value: "50+", label: "Countries Covered" },
  { value: "2 Days", label: "Avg. Delivery Time" },
];

const features = [
  {
    imagePath: "/images/datasets/database.png",
    title: "Structured Datasets",
    desc: "Receive data in clean, structured formats — CSV, JSON, Excel, or directly into your database.",
  },
  {
    imagePath: "/images/datasets/www.png",
    title: "Any Website",
    desc: "We extract data from any public website — e-commerce, real estate, job boards, directories, and more.",
  },
  {
    imagePath: "/images/datasets/gps.png",
    title: "Location Targeted",
    desc: "Get geo-filtered datasets by city, region, or country — tailored exactly to your target market.",
  },
  {
    imagePath: "/images/datasets/lightning.png",
    title: "Fast Turnaround",
    desc: "Most datasets are delivered within 1–3 business days depending on volume and complexity.",
  },
  {
    imagePath: "/images/datasets/check-button.png",
    title: "Validated & Clean",
    desc: "Every record is validated, deduplicated, and cleaned before delivery — no junk, no gaps.",
  },
  {
    imagePath: "/images/datasets/automation.png",
    title: "Recurring Updates",
    desc: "Set up automated delivery schedules — daily, weekly, or monthly fresh data drops.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Share Your Requirement",
    desc: "Tell us the website, data fields, location filters, and output format you need.",
  },
  {
    step: "02",
    title: "We Analyse & Plan",
    desc: "Our team reviews the source, estimates volume, and sends you a timeline & quote within 24 hours.",
  },
  {
    step: "03",
    title: "Extraction & Cleaning",
    desc: "We scrape, process, validate, and clean the data — removing duplicates and filling gaps.",
  },
  {
    step: "04",
    title: "Dataset Delivered",
    desc: "Your clean, structured dataset lands in your inbox or preferred destination on time.",
  },
];

const whyUs = [
  { icon: "🎯", title: "100% Custom", desc: "Every dataset is built specifically for your requirements — no generic off-the-shelf data." },
  { icon: "🔒", title: "Secure & Confidential", desc: "Your requirements and the delivered data are kept strictly confidential." },
  { icon: "🌍", title: "Global Reach", desc: "We collect data from websites across 50+ countries in multiple languages." },
  { icon: "💬", title: "Dedicated Support", desc: "A dedicated specialist manages your project from start to delivery." },
  { icon: "📦", title: "Multiple Formats", desc: "CSV, Excel, JSON, Google Sheets, SQL — you choose how you want the data." },
  { icon: "♻️", title: "Scalable Volume", desc: "From hundreds to millions of records — we scale to match your needs." },
];

const testimonials = [
  {
    name: "James Carter",
    role: "Market Research Analyst, DataEdge Inc.",
    text: "The team delivered a massive e-commerce pricing dataset across 5 countries within 2 days. Incredibly fast and perfectly formatted. We use them every month now.",
    avatar: "JC",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager, PropTrack",
    text: "We needed real estate listings from 10 cities. The data was clean, structured, and ready to plug straight into our analytics platform. Excellent service.",
    avatar: "PS",
  },
  {
    name: "Mohammed Al-Rashid",
    role: "Head of Data, TalentBridge",
    text: "Fantastic job collecting job listings data from multiple portals filtered by location. Saved us weeks of manual work. Will definitely use them again.",
    avatar: "MA",
  },
];


const datasetCategories = [
  {
    category: "E-Commerce",
    examples: ["Product listings", "Prices & discounts", "Seller ratings", "Reviews & ratings"],
    delivery: "1–2 days",
    formats: "CSV, JSON, Excel",
  },
  {
    category: "Real Estate",
    examples: ["Property listings", "Rent & sale prices", "Agent contacts", "Location details"],
    delivery: "1–3 days",
    formats: "CSV, Excel, Sheets",
  },
  {
    category: "Job Market",
    examples: ["Job titles & descriptions", "Salary ranges", "Company details", "Location & remote info"],
    delivery: "1–2 days",
    formats: "CSV, JSON",
  },
  {
    category: "Business Directories",
    examples: ["Company names", "Contact numbers", "Emails & websites", "Address & category"],
    delivery: "2–3 days",
    formats: "CSV, Excel, JSON",
  },
  {
    category: "News & Media",
    examples: ["Article headlines", "Authors & dates", "Categories & tags", "Full article text"],
    delivery: "1–2 days",
    formats: "JSON, CSV",
  },
  {
    category: "Reviews & Ratings",
    examples: ["Star ratings", "Review text", "Reviewer details", "Product/Service info"],
    delivery: "2–3 days",
    formats: "CSV, JSON, Excel",
  },
];

/* ─────────────────────────── PAGE ─────────────────────────────── */

export default function DatasetPage() {


  return (
    <main className="bg-white text-gray-800 overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-secondary-theme overflow-hidden py-24 px-6">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-theme/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-gradient-end-color/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block mb-4 bg-primary-theme/15 border border-primary-theme/30 text-primary-theme text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full">
              📊 Custom Dataset Services
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
              Get Any{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-theme to-gradient-end-color">
                Dataset
              </span>{" "}
              From Any Website
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              We collect, clean, and deliver structured datasets from any
              public website — filtered by your location, category, and field
              requirements. Ready in as few as{" "}
              <span className="text-primary-theme font-semibold">1–3 business days</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-block bg-linear-to-r from-primary-theme to-gradient-end-color text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 text-center"
              >
                Request a Dataset →
              </Link>
              <Link
                href="#categories"
                className="inline-block border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 text-center"
              >
                Browse Categories
              </Link>
            </div>
          </div>

          {/* hero image */}
          <Image
            src="/images/datasets/dataset-hero.png"
            // src="/images/datasets/dataset-hero.svg"
            alt="Hero Image"
            width={500}
            height={500}
            className="w-full h-auto"
          />



        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────── */}
      <section className="bg-primary-theme py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-black">{s.value}</p>
              <p className="text-sm mt-1 font-medium opacity-90">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary-theme text-sm font-semibold tracking-widest uppercase">
              What You Get
            </span>
            <h2 className="text-3xl font-bold mt-2 text-secondary-theme">
              Everything Included in Every Dataset
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              From extraction to delivery — we handle it all so you can
              focus on using the data.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <Image src={f.imagePath} alt={f.title} width={50} height={50} className="mb-4 group-hover:scale-110 transition-transform duration-300" />
                {/* <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div> */}
                <h3 className="text-lg font-bold text-secondary-theme mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/*    IndustrySolutions tab section  */}
      <IndustrySolutions />

      {/* ── How It Works ─────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary-theme text-sm font-semibold tracking-widest uppercase">
              How It Works
            </span>
            <h2 className="text-3xl font-bold mt-2 text-secondary-theme">
              Your Dataset in 4 Simple Steps
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              A streamlined process — from your request to a clean dataset in your hands.
            </p>
          </div>

          {/* Steps with connecting line */}
          <div className="relative">
            {/* Horizontal connector (desktop) */}
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-orange-200 z-0" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {processSteps.map((step) => (
                <div key={step.step} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary-theme to-gradient-end-color flex items-center justify-center text-white font-black text-xl shadow-lg mb-5">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-secondary-theme text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block bg-linear-to-r from-primary-theme to-gradient-end-color text-white font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
            >
              Start Your Dataset Request →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ─────────────────────────────────────────── */}
      <section className="bg-secondary-theme py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary-theme text-sm font-semibold tracking-widest uppercase">
              Why Choose Us
            </span>
            <h2 className="text-3xl font-bold mt-2 text-white">
              Why Clients Trust Our Dataset Service
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              We&apos;re not just scrapers — we&apos;re your dedicated data partner.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item) => (
              <div
                key={item.title}
                className="bg-white/5 hover:bg-primary-theme/10 border border-white/10 hover:border-primary-theme/30 rounded-2xl p-7 transition-all duration-300 cursor-default group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── Dataset Categories ─────────────────────────────────────── */}
      <section id="categories" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary-theme text-sm font-semibold tracking-widest uppercase">
              Dataset Categories
            </span>
            <h2 className="text-3xl font-bold mt-2 text-secondary-theme">
              Popular Dataset Types We Deliver
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Browse common categories or request any custom dataset — we
              handle any niche website and data type.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-secondary-theme text-white">
                <tr>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Data Fields (Examples)</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Delivery</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Formats</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {datasetCategories.map((row, i) => (
                  <tr
                    key={row.category}
                    className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-orange-50 transition-colors`}
                  >
                    <td className="px-6 py-4 font-semibold text-secondary-theme">{row.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {row.examples.map((ex) => (
                          <span
                            key={ex}
                            className="bg-orange-50 text-primary-theme border border-orange-100 rounded-full px-3 py-0.5 text-xs font-medium"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-semibold">{row.delivery}</td>
                    <td className="px-6 py-4 text-gray-500">{row.formats}</td>
                    <td className="px-6 py-4">
                      <Link
                        href="/contact"
                        className="inline-block bg-primary-theme text-white text-xs font-bold px-4 py-2 rounded-full hover:scale-105 transition-transform duration-200"
                      >
                        Request →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>


    </main>
  );
}


const IndustrySolutions = () => {
  const [activeTab, setActiveTab] = useState(6); // Default to Social Media (index 6)
  

  const industries = [
    {
      id: 0,
      title: "Retail Datasets",
      description: "Monitor product pricing, availability, and customer reviews across major e-commerce platforms to stay competitive.",
      icon: "/images/datasets/IndustryIcon/Real-Estate-Datasets.svg",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 1,
      title: "Logistics Datasets",
      description: "Optimize supply chain routes and delivery performance with real-time tracking data and logistics analytics.",
      icon: "/images/datasets/IndustryIcon/Restaurant-&-Food-Delivery-Tracking.svg",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "Grocery Datasets",
      description: "Track fresh produce trends, inventory levels, and regional grocery pricing for better procurement strategies.",
      icon:  "/images/datasets/IndustryIcon/Grocery-Datasets.svg",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      title: "E-commerce Datasets",
      description: "Deep dive into marketplace dynamics, seller ratings, and global product catalogues for market research.",
      icon:  "/images/datasets/IndustryIcon/Ecommerce-Datasets.svg",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 4,
      title: "Real Estate Datasets",
      description: "Aggregate property listings, historical price data, and neighborhood demographics for investment analysis.",
      icon:  "/images/datasets/IndustryIcon/Real-Estate-Datasets.svg",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    },

    {
      id: 5,
      title: "Social Media Datasets",
      description: "Track influencers, engagement metrics, trending content, and hashtags across global platforms for branding and audience analysis.",
      icon:  "/images/datasets/IndustryIcon/Social-Media-Datasets.svg",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    },
{
  "id": 6,
  "title": "Travel Datasets",
  "description": "Analyze flight patterns, tourist flows, and seasonal travel demands to optimize your service offerings.",
  "icon": "/images/datasets/IndustryIcon/Travel-Datasets.svg",
  "image": "https://imgs.search.brave.com/cW8puSGmiO-PbTkZ6BUlW5odyu78mpNgfx0wH3x_FvA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDg5/NTU2NDc4L3Bob3Rv/L3RyYXZlbGxpbmct/dG9vbHMuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPVF0TEdD/Wm5Pckg1dnk4UTM5/SGk5ZDZUVjNfSU14/YjNramdkTkRoOFFa/Sms9"
},
{
  "id": 7,
  "title": "Liquor Datasets",
  "description": "Track consumer preferences, spirits market trends, and regional sales performance to refine your inventory.",
  "icon": "/images/datasets/IndustryIcon/Liquor-Datasets.svg",
  "image": "https://imgs.search.brave.com/Mzf19Ezuoo8O6eu0eLMwCwOTDTEr8riqvGprbKtH5fQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTA2/MDE4NzkwL3Bob3Rv/L2dyb2Nlcnktc3Rv/cmUtbGlxdW9yLWRl/cGFydG1lbnQuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUZo/dXJVOFhzbTFfLTls/R2hVblBieE9HUnZD/VS1OWUlFN0dyWFdV/X0NCYTQ9"
}
  ];

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollTo = direction === 'left'
      ? container.scrollLeft - 200
      : container.scrollLeft + 200;

    container.scrollTo({ left: scrollTo, behavior: 'smooth' });
  };

  const currentData = industries.find((ind) => ind.id === activeTab) ?? industries[0];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans" >
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Explore Industry-Specific Solutions Offered by Scraping Toolkit
        </h2>
        <p className="text-slate-600 max-w-4xl mx-auto leading-relaxed">
          At Scraping Toolkit, we deliver highly focused, industry-ready datasets designed to meet the specific demands of different business verticals. Each dataset is structured to capture the most relevant, actionable information from trusted online sources. Here is our full list of industry-specific dataset services below:
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="relative flex items-center justify-center mb-16">
        <button 
          onClick={() => scroll('left')}
          className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors z-10 hidden md:block"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex-1 flex justify-center overflow-x-auto gap-4 px-4 py-4 scrollbar-hide no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setActiveTab(industry.id)}
              className={`shrink-0 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-lg transition-all duration-300 transform cursor-pointer ${
                activeTab === industry.id 
                  ? 'bg-primary-theme text-black shadow-xl scale-110 -translate-y-2' 
                  : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-300 shadow-md'
              }`}
            >
              {/* {industry.icon} */}
              {/* <Image src={industry.icon} alt={industry.title} width={50} height={50} className="focus:text-black" /> */}
            
              <Image
                src={industry.icon}
                alt={industry.title}
                width={50}
                height={50}
                className={`${
                  activeTab === industry.id 
                    ? "brightness-0 invert" 
                    : "opacity-50"
                }`}
              />
            </button>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors z-10 hidden md:block"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden shadow-sm min-h-100">
        {/* Text Content */}
        <div className="p-8 md:p-12 order-2 lg:order-1 animate-fadeIn">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 transition-all">
            {currentData.title}
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed mb-8">
            {currentData.description}
          </p>
          <button 
            className="flex items-center gap-3 px-8 py-3 rounded-full text-white font-semibold transition-all hover:opacity-90 active:scale-95 shadow-lg group"
            style={{ 
              background: `linear-gradient(90deg, var(--primary) 0%, var(--gradient-end) 100%)`,
              backgroundColor: 'var(--primary)' 
            }}
          >
            <span>View More</span>
            <div className="bg-white/20 rounded-full p-1 transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Image Display */}
        <div className="relative h-75 lg:h-full overflow-hidden order-1 lg:order-2">
          <div className="absolute inset-0 bg-slate-200 animate-pulse" />
          <img 
            key={activeTab} // Forces re-animation on tab change
            src={currentData.image} 
            alt={currentData.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 animate-slideInRight"
            style={{ 
              borderBottomLeftRadius: '100px',
              borderTopLeftRadius: '20px'
            }}
          />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.6s cubic-bezier(0.2, 1, 0.3, 1) forwards; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};
