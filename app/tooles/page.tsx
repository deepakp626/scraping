"use client";
import React from "react";
import { PdfToolsSection } from "./pdf-tooles/page";
import { ImageToolsSection } from "./image-tooles/page";
import { CodingToolsSection } from "./coding-tooles/page";
import { ConverterToolsSection } from "./converter-tools/page";

export default function Hero() {
  return (
    <>
    <section className=" from-gray-900 via-gray-800 to-gray-900 text-black min-h-80 flex items-center">
      <div className="container mx-auto px-6 py-20 grid md:grid-cols-1 gap-10 items-center">
        
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Turn Data Into <span className="text-primary-theme">Decisions</span>—Faster
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            Analyze industry datasets, uncover trends, and make smarter business 
            decisions with powerful, easy-to-use tools.
          </p>

          <p className="text-gray-600 mb-10">
            From travel insights to retail analytics, everything you need in one platform.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-primary-theme hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold transition">
              Get Started Free
            </button>

            <button className="border border-gray-500 hover:border-white px-6 py-3 rounded-xl font-semibold transition">
              Explore Datasets
            </button>
          </div>
        </div>



      </div>
    </section>
    <section className=" px-4 md:px-10 bg-gray-50">
      {/* </section> */}
      <PdfToolsSection />

      {/* Image Tools */}
      <ImageToolsSection />

      {/* Coding Tools */}
      <CodingToolsSection />

      {/* Converter Tools */}
      <ConverterToolsSection />
    </section>
    </>
  );
}






