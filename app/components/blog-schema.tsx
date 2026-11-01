import React from "react";

export default function BlogSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://compilepilot.com/blog#webpage",
    url: "https://compilepilot.com/blog",
    name: "Web Scraping Blog & Data Extraction Insights | CompilePilot",
    description:
      "Explore CompilePilot's blog for web scraping insights, data extraction guides, web data collection techniques, and practical tips for businesses and researchers.",
    isPartOf: {
      "@id": "https://compilepilot.com/#website",
    },
    about: {
      "@id": "https://compilepilot.com/#organization",
    },
    publisher: {
      "@id": "https://compilepilot.com/#organization",
    },
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
