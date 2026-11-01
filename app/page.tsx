import type { Metadata } from "next";
import Image from "next/image";
import HeroSection from "./homeComponents/HeroSection";
import Slider from "./components/Slider";
import FirecrawlFeatures from "./homeComponents/FireAnimation";
import IndustryTabSection from "./homeComponents/IndustryTabSection";
import TerminalAnimation from "./homeComponents/TerminalAnimation";
import ScrapingProcess from "./homeComponents/ScrapingProcess";
import CountSection from "./homeComponents/CountSection";
import ScrapingTechnology from "./homeComponents/ScrapingTechnology";

export const metadata: Metadata = {
  title: "Professional Web Scraping & Data Extraction | CompilePilot",
  description:
    "Get professional web scraping and data extraction services from CompilePilot. Collect publicly available web data and receive clean, structured datasets tailored to your business needs.",
  keywords: [
    "web scraping",
    "data extraction",
    "web scraping services",
    "data extraction services",
    "custom datasets",
    "public web data",
    "ecommerce data scraping",
    "structured datasets",
    "automated web scraping",
    "web crawling services",
    "data scraping tools",
    "enterprise web scraping",
    "CompilePilot",
  ],
  alternates: {
    canonical: "/",
  },
};

function HomepageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://compilepilot.com/#organization",
        name: "CompilePilot",
        url: "https://compilepilot.com/",
        logo: "https://compilepilot.com/logo.png",
      },
      {
        "@type": "WebSite",
        "@id": "https://compilepilot.com/#website",
        url: "https://compilepilot.com/",
        name: "CompilePilot",
        publisher: {
          "@id": "https://compilepilot.com/#organization",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen text-white">
      <HomepageSchema />
      <HeroSection />
      <section className="z-20 relative mx-auto -mt-10 px-4 container">
        <Slider />
      </section>
      <FirecrawlFeatures />
      <IndustryTabSection />
      <TerminalAnimation />
      <ScrapingProcess />
      <ScrapingTechnology />
      <CountSection />
    </main>
  );
}
