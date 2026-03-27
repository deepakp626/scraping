"use client";

import React, { useState } from "react";
import Link from "next/link";

/* ─────────────────────────── DATA ─────────────────────────────── */

const stats = [
  { value: "10M+", label: "Data Records Delivered" },
  { value: "200+", label: "Websites Scraped" },
  { value: "50+", label: "Countries Covered" },
  { value: "2 Days", label: "Avg. Delivery Time" },
];

const features = [
  {
    icon: "🗂️",
    title: "Structured Datasets",
    desc: "Receive data in clean, structured formats — CSV, JSON, Excel, or directly into your database.",
  },
  {
    icon: "🌐",
    title: "Any Website",
    desc: "We extract data from any public website — e-commerce, real estate, job boards, directories, and more.",
  },
  {
    icon: "📍",
    title: "Location Targeted",
    desc: "Get geo-filtered datasets by city, region, or country — tailored exactly to your target market.",
  },
  {
    icon: "⚡",
    title: "Fast Turnaround",
    desc: "Most datasets are delivered within 1–3 business days depending on volume and complexity.",
  },
  {
    icon: "✅",
    title: "Validated & Clean",
    desc: "Every record is validated, deduplicated, and cleaned before delivery — no junk, no gaps.",
  },
  {
    icon: "🔄",
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

const faqs = [
  {
    q: "What types of data can you collect?",
    a: "We can collect virtually any publicly available data — product listings, prices, reviews, contact details, job postings, real estate listings, news articles, business directories, and much more.",
  },
  {
    q: "Which websites do you support?",
    a: "We support any public-facing website. This includes e-commerce platforms, job boards, real estate portals, social media directories, review sites, news outlets, and government data portals.",
  },
  {
    q: "How long does it take to deliver a dataset?",
    a: "Most datasets are delivered within 1–3 business days. Larger or more complex projects may take 3–7 days. We always provide a clear timeline before starting.",
  },
  {
    q: "In what formats is the data delivered?",
    a: "We deliver in CSV, Excel (XLSX), JSON, Google Sheets, or directly into your database (MySQL, PostgreSQL, MongoDB). Just let us know your preference.",
  },
  {
    q: "Can I get recurring/updated datasets?",
    a: "Yes! We offer scheduled data delivery — hourly, daily, weekly, or monthly. Your data stays fresh automatically.",
  },
  {
    q: "Is the data accurate and validated?",
    a: "Absolutely. Every dataset goes through our QA pipeline — deduplication, field validation, and completeness checks — before delivery.",
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

          {/* Hero visual card */}
          <div className="hidden lg:flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <p className="text-xs text-gray-400 mb-3 uppercase tracking-widest font-semibold">Sample Dataset Preview</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-primary-theme text-xs font-bold border-b border-white/10">
                      <th className="pb-2 pr-4">Product</th>
                      <th className="pb-2 pr-4">Price</th>
                      <th className="pb-2 pr-4">Rating</th>
                      <th className="pb-2">Location</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 text-xs">
                    {[
                      ["Laptop Pro X1", "$1,299", "4.8 ★", "New York"],
                      ["Smart Watch S5", "$349", "4.6 ★", "London"],
                      ["Wireless Buds", "$89", "4.7 ★", "Dubai"],
                      ["4K Monitor", "$599", "4.9 ★", "Sydney"],
                      ["Gaming Chair", "$279", "4.5 ★", "Toronto"],
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        {row.map((cell, j) => (
                          <td key={j} className="py-2 pr-4">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-semibold">Live extraction in progress…</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-theme/10 border border-primary-theme/20 rounded-xl p-4 text-center">
                <p className="text-2xl font-black text-primary-theme">500K+</p>
                <p className="text-gray-400 text-xs mt-1">Records this week</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-2xl font-black text-white">99.2%</p>
                <p className="text-gray-400 text-xs mt-1">Data accuracy</p>
              </div>
            </div>
          </div>
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
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                <h3 className="text-lg font-bold text-secondary-theme mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                  <h3 className="font-bold text-secondary-theme text-lg mb-2">{step.title}</h3>
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

      {/* ── Testimonials ────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary-theme text-sm font-semibold tracking-widest uppercase">
              Client Reviews
            </span>
            <h2 className="text-3xl font-bold mt-2 text-secondary-theme">
              What Our Clients Say About Us
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary-theme to-gradient-end-color flex items-center justify-center text-white font-black text-sm shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-secondary-theme text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-primary-theme text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
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
                    <td className="px-6 py-4 font-bold text-secondary-theme">{row.category}</td>
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

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-primary-theme text-sm font-semibold tracking-widest uppercase">
              FAQs
            </span>
            <h2 className="text-3xl font-bold mt-2 text-secondary-theme">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-orange-50 transition-colors"
                >
                  <span className="font-semibold text-secondary-theme text-sm">{faq.q}</span>
                  <span
                    className={`shrink-0 w-7 h-7 rounded-full bg-primary-theme/10 text-primary-theme flex items-center justify-center font-bold text-lg transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="relative bg-secondary-theme overflow-hidden py-24 px-6">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary-theme/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-end-color/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block mb-5 bg-primary-theme/15 border border-primary-theme/30 text-primary-theme text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full">
            🚀 Get Started Today
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
            Ready for Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-theme to-gradient-end-color">
              Custom Dataset?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Share your requirements and we&apos;ll get back to you within 24 hours
            with a timeline and quote. Fast, accurate, and fully customised to
            your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { icon: "⚡", text: "Avg. 2-Day Delivery" },
              { icon: "✅", text: "Validated & Clean Data" },
              { icon: "🌍", text: "Any Website · Any Location" },
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-linear-to-r from-primary-theme to-gradient-end-color text-white font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 text-base"
            >
              Request a Dataset →
            </Link>
            <Link
              href="/about"
              className="inline-block border border-white/20 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/10 transition-all duration-300 text-base"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}