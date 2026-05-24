"use client";

import React from "react";
import { motion } from "framer-motion";

const posts = [
  {
    id: 1,
    title: "Mastering Web Scraping in 2026",
    desc: "Learn modern scraping techniques using Python, Playwright, and APIs.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    date: "March 20, 2026",
  },
  {
    id: 2,
    title: "Next.js Performance Tips",
    desc: "Optimize your Next.js apps for lightning-fast performance.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    date: "March 18, 2026",
  },
  {
    id: 3,
    title: "Build AI Tools with FastAPI",
    desc: "Step-by-step guide to building AI-powered APIs.",
    image: "https://images.unsplash.com/photo-1677442135136-760c813a7434",
    date: "March 15, 2026",
  },
  {
    id: 4,
    title: "The Future of Data Extraction",
    desc: "How AI and machine learning are transforming large-scale data extraction workflows.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    date: "March 12, 2026",
  },
  {
    id: 5,
    title: "Scaling Distributed Crawlers",
    desc: "Architectural patterns for crawling millions of pages without getting blocked.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    date: "March 10, 2026",
  },
  {
    id: 6,
    title: "Bypassing Advanced Anti-Bots",
    desc: "Strategies for ethical scraping when dealing with Cloudflare and Datadome.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    date: "March 5, 2026",
  },
  {
    id: 7,
    title: "GraphQL vs REST for Data Mining",
    desc: "Which API paradigm offers the best efficiency for automated data collection?",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    date: "March 1, 2026",
  },
  {
    id: 8,
    title: "Automating Browsers with Puppeteer",
    desc: "A deep dive into headless browser automation for dynamic single-page applications.",
    image: "https://images.unsplash.com/photo-1627398246734-d8bc74bead10",
    date: "February 25, 2026",
  },
  {
    id: 9,
    title: "Data Pipelines with Apache Airflow",
    desc: "Orchestrate your scraping jobs and ETL workflows like a pro.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    date: "February 20, 2026",
  }
];

export default function Blog() {
  return (
    <div className="container mx-auto min-h-screen from-orange-50 to-white px-6 py-12 pt-18">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Our Blog
        </h1>
        <p className="text-gray-500 mt-3">
          Insights, tutorials & latest tech updates
        </p>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >
            <img
              src={`${post.image}?auto=format&fit=crop&w=800&q=80`}
              alt={post.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-5">
              <p className="text-sm text-orange-500 font-medium">
                {post.date}
              </p>
              <h2 className="text-xl font-semibold mt-2 text-gray-800">
                {post.title}
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                {post.desc}
              </p>

              <button className="mt-4 inline-block text-orange-600 font-medium hover:underline">
                Read More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center bg-orange-500 text-white py-10 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl md:text-3xl font-bold">
          Stay Updated 🚀
        </h2>
        <p className="mt-2 text-orange-100">
          Subscribe to get latest blog updates directly in your inbox
        </p>

        <div className="mt-5 flex justify-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg text-black w-64 outline-none"
          />
          <button className="bg-black px-5 py-2 rounded-lg hover:bg-gray-800 transition">
            Subscribe
          </button>
        </div>
      </motion.div>
    </div>
  );
}
