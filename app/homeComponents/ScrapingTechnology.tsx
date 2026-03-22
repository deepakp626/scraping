"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { 
  Flame,
  Network,
  Bot,
  Sparkles
} from "lucide-react";

// Images from public/images/ScrapingTechnology:
// beautifulsoup.svg, cheerio.svg, linux.svg, playwright.svg, puppeteer.svg, python.svg, scrapy.svg, selenium.svg

const technologies = [
  { 
    name: "Python", 
    image: "/images/ScrapingTechnology/python.svg", 
    description: "The most popular language for web scraping and data science." 
  },
  { 
    name: "Playwright", 
    image: "/images/ScrapingTechnology/playwright.svg", 
    description: "Fast, reliable, and capable of handling modern web apps." 
  },
  { 
    name: "Selenium", 
    image: "/images/ScrapingTechnology/selenium.svg", 
    description: "The industry standard for browser automation and testing." 
  },
  { 
    name: "Scrapy", 
    image: "/images/ScrapingTechnology/scrapy.svg", 
    description: "A fast high-level web crawling and web scraping framework." 
  },
  { 
    name: "Puppeteer", 
    image: "/images/ScrapingTechnology/puppeteer.svg", 
    description: "Google's powerful library for controlling headless Chrome." 
  },
  { 
    name: "Beautiful Soup", 
    image: "/images/ScrapingTechnology/beautifulsoup.svg", 
    description: "Simple and intuitive library for parsing HTML and XML documents." 
  },
  { 
    name: "Cheerio", 
    image: "/images/ScrapingTechnology/cheerio.svg", 
    description: "Blazingly fast jQuery implementation for server-side scraping." 
  },
  { 
    name: "Linux", 
    image: "/images/ScrapingTechnology/linux.svg", 
    description: "The robust foundation for scaling high-performance scrapers." 
  },
  { 
    name: "Firecrawl", 
    icon: Flame, 
    description: "LLM-powered API to extract clean, structured markdown from any URL." 
  },
  { 
    name: "ScrapeGraphAI", 
    icon: Network, 
    description: "Next-gen Python library using LLMs to create scraping pipelines." 
  },
  { 
    name: "AgentQL", 
    icon: Bot, 
    description: "AI-driven query language for resilient and dynamic web scraping." 
  },
  { 
    name: "Jina AI", 
    icon: Sparkles, 
    description: "Advanced Reader API designed specifically for LLM content extraction." 
  },
];

const ScrapingTechnology = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header content */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-secondary-theme mb-6"
          >
            Powered by <span className="text-primary-theme">World-Class</span> Tech
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            We leverage the most advanced and reliable tools in the industry to ensure your data is delivered accurately and efficiently.
          </motion.p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:border-primary-theme/30 hover:shadow-2xl hover:shadow-primary-theme/5 transition-all duration-300 group flex flex-col items-center text-center cursor-pointer"
            >
              <div className="flex flex-col items-center flex-1">
                {/* Image or Icon Container */}
                <div className="mb-6 p-4 rounded-2xl bg-slate-50 w-20 h-20 flex items-center justify-center group-hover:bg-primary-theme/5 transition-all duration-300 relative">
                  {tech.image ? (
                    <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                      <Image
                        src={tech.image}
                        alt={tech.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : tech.icon ? (
                    <tech.icon className="w-10 h-10 text-slate-400 group-hover:text-primary-theme transition-all duration-300 transform group-hover:rotate-6" />
                  ) : null}
                </div>
                {/* Tech Name */}
                <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-primary-theme transition-colors">
                  {tech.name}
                </h3>
                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-600">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrapingTechnology;
