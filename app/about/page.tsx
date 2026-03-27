import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Web Scraping & Data Extraction Services",
  description:
    "Learn about our professional web scraping and data extraction services. We deliver custom datasets from any website and any location based on your requirements.",
};

const stats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "50+", label: "Countries Covered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "2 Days", label: "Avg. Delivery Time" },
];

const services = [
  {
    icon: "🌐",
    title: "Web Scraping Services",
    description:
      "We extract structured data from any public website — e-commerce platforms, real estate portals, news sites, social media, directories, and more. Our scrapers are robust, scalable, and handle dynamic JS-rendered pages, pagination, and anti-bot protections.",
  },
  {
    icon: "📦",
    title: "Data Extraction Services",
    description:
      "Our extraction pipelines clean, transform, and deliver structured data in your preferred format — CSV, JSON, Excel, or directly into your database. We handle login-protected pages, AJAX-heavy sites, and multi-step workflows.",
  },
  {
    icon: "📍",
    title: "Location-Based Data Collection",
    description:
      "Need data from a specific city, region, or country? We tailor scrapers to collect geo-targeted information — local business listings, property prices, job postings — from any location around the globe.",
  },
  {
    icon: "📊",
    title: "Custom Dataset Delivery",
    description:
      "Tell us which website and what data you need. We build a bespoke extraction pipeline, validate the data for accuracy, and deliver a clean, ready-to-use dataset within as few as 1–3 business days.",
  },
  {
    icon: "🔄",
    title: "Scheduled & Automated Scraping",
    description:
      "Get fresh data on a recurring schedule — hourly, daily, or weekly. We set up automated pipelines that continuously monitor websites and push updated datasets to your storage or API endpoint.",
  },
  {
    icon: "🛡️",
    title: "Ethical & Compliant Scraping",
    description:
      "We scrape only publicly available data while respecting robots.txt guidelines, rate limits, and applicable regulations. Our processes are responsible, efficient, and non-disruptive to target servers.",
  },
];

const datasetProcess = [
  {
    step: "01",
    title: "Share Your Requirements",
    description:
      "Tell us the website URL, the data fields you need (e.g., product name, price, reviews), any filters (location, category, date range), and your desired output format.",
  },
  {
    step: "02",
    title: "We Analyse & Quote",
    description:
      "Our team evaluates the website structure, data volume, and complexity. We provide a clear timeline and pricing — typically within 24 hours of receiving your request.",
  },
  {
    step: "03",
    title: "Extraction & Validation",
    description:
      "We build and run the custom scraper. Every dataset is cleaned, validated, and checked for completeness before delivery.",
  },
  {
    step: "04",
    title: "Dataset Delivered",
    description:
      "You receive your dataset in the agreed format (CSV, JSON, Excel, Google Sheets, or database). Most projects are completed in 1–5 business days.",
  },
];

const useCases = [
  { icon: "🛒", label: "E-commerce Price Monitoring" },
  { icon: "🏠", label: "Real Estate Listings" },
  { icon: "💼", label: "Job & Talent Market Data" },
  { icon: "📰", label: "News & Media Monitoring" },
  { icon: "⭐", label: "Review & Sentiment Analysis" },
  { icon: "🗺️", label: "Local Business Directories" },
  { icon: "📈", label: "Market Research Datasets" },
  { icon: "🔬", label: "Academic & Research Data" },
  { icon: "✈️", label: "Travel & Hospitality Data" },
  { icon: "🤝", label: "Lead Generation Lists" },
  { icon: "💊", label: "Healthcare & Pharma Data" },
  { icon: "🌍", label: "Geo-Targeted Data Worldwide" },
];

const aboutUs = [
    { emoji: "⚡", text: "Fast Delivery" },
    { emoji: "🎯", text: "High Accuracy" },
    { emoji: "🔒", text: "Secure & Private" },
    { emoji: "🌍", text: "Global Coverage" },
  ]

export default function About() {
  return (
    <main className="bg-white text-gray-800 overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative bg-secondary-theme text-white py-24 px-6 text-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 rounded-full bg-primary-theme/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 rounded-full bg-gradient-end-color/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block mb-4 text-primary-theme text-sm font-semibold tracking-widest uppercase">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            Professional{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-theme to-gradient-end-color">
              Web Scraping
            </span>{" "}
            &amp; Data Extraction Services
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            We help businesses, researchers, and entrepreneurs unlock the power
            of publicly available web data. From any website, any location —
            delivered as a clean, structured dataset tailored to your exact
            requirements.
          </p>
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

      {/* ── Who We Are ────────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary-theme text-sm font-semibold tracking-widest uppercase">
              Who We Are
            </span>
            <h2 className="text-3xl font-bold mt-2 mb-5 text-secondary-theme">
              Your Trusted Data Partner
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We are a dedicated team of data engineers and web scraping
              specialists with years of experience collecting, processing, and
              delivering web data at scale. We work with startups, enterprises,
              and research institutions across the globe.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Whether you need a one-time dataset or a continuous data feed, we
              build custom solutions that fit your exact requirements — on time
              and within budget.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {aboutUs.map((item) => (
              <div
                key={item.text}
                className="bg-orange-50 border border-orange-100 cursor-pointer rounded-2xl p-5 flex flex-col items-center text-center gap-2 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{item.emoji}</span>
                <span className="font-semibold text-secondary-theme">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary-theme text-sm font-semibold tracking-widest uppercase">
              What We Offer
            </span>
            <h2 className="text-3xl font-bold mt-2 text-secondary-theme">
              Our Core Services
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              End-to-end data collection, extraction, and delivery — from any
              website, in any format, at any scale.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-secondary-theme mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dataset Process ───────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold mt-2 text-secondary-theme">
            Get Your Custom Dataset in Days
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Simply tell us which website you need data from and we handle
            everything — extraction, cleaning, and delivery.
          </p>
        </div>
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden sm:block absolute left-8 top-0 h-full w-0.5 bg-orange-200" />
          <div className="space-y-10">
            {datasetProcess.map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="shrink-0 w-16 h-16 rounded-full bg-linear-to-br from-primary-theme to-gradient-end-color flex items-center justify-center text-white font-black text-lg shadow-lg z-10">
                  {item.step}
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 flex-1 border border-gray-100">
                  <h3 className="font-bold text-secondary-theme text-xl mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-md leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ─────────────────────────────────────────────── */}
      <section className="bg-secondary-theme py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary-theme text-sm font-semibold tracking-widest uppercase">
              Industries We Serve
            </span>
            <h2 className="text-3xl font-bold mt-2 text-white">
              Data for Every Use Case
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto">
              No matter your industry or requirement, we can collect the data
              you need from across the web.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {useCases.map((uc) => (
              <div
                key={uc.label}
                className="bg-white/5 hover:bg-primary-theme/20 border border-white/10 rounded-xl px-4 py-5 flex flex-col items-center text-center gap-2 transition-colors duration-300 cursor-default"
              >
                <span className="text-3xl">{uc.icon}</span>
                <span className="text-white text-sm font-medium">{uc.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="relative bg-secondary-theme overflow-hidden py-24 px-6">
        {/* Glow blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary-theme/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-end-color/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block mb-5 bg-primary-theme/15 border border-primary-theme/30 text-primary-theme text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full">
            🚀 Get Started Today
          </span>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Ready to Get Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-theme to-gradient-end-color">
              Custom Dataset?
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us which website you need data from, specify your fields and
            location filters, and we&apos;ll deliver a clean, structured dataset —
            often within{" "}
            <span className="text-primary-theme font-semibold">
              1–3 business days
            </span>
            . No hidden fees. No long waits.
          </p>

          {/* Trust highlights */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { icon: "⚡", text: "Fast Delivery — Avg. 2 Days" },
              { icon: "✅", text: "Validated & Clean Data" },
              { icon: "🌍", text: "Any Website, Any Location" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-gray-300"
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-linear-to-r from-primary-theme to-gradient-end-color text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-primary-theme/40 hover:scale-105 transition-all duration-300 text-base"
            >
              Request a Dataset →
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-white/20 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/10 transition-all duration-300 text-base"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}