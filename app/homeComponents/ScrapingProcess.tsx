"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Database, Wand2, Eraser, BarChart3, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    id: '01',
    title: 'Identify Target Websites',
    description: 'Begin by selecting the e-commerce websites you want to scrape, focusing on those that provide the most valuable data for your needs.',
    icon: Globe,
  },
  {
    id: '02',
    title: 'Select Data Points',
    description: 'Determine the specific data points to extract, such as product names, prices, descriptions, and reviews, to ensure comprehensive insights.',
    icon: Database,
  },
  {
    id: '03',
    title: 'Use Scraping Tools',
    description: 'Utilize web scraping tools or libraries to automate the data extraction process, ensuring efficiency and accuracy in gathering the desired information.',
    icon: Wand2,
  },
  {
    id: '04',
    title: 'Data Cleaning',
    description: 'After extraction, clean the data to remove duplicates and irrelevant information, ensuring that the dataset is organized and useful for analysis.',
    icon: Eraser,
  },
  {
    id: '05',
    title: 'Analyze Extracted Data',
    description: 'Once cleaned, analyze the extracted e-commerce data to gain insights, identify trends, and make informed decisions that enhance your strategy.',
    icon: BarChart3,
  },
];

const ScrapingProcess = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="bg-[#f8faff] py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 mb-4 text-xs font-medium text-slate-500 bg-white rounded-full border border-slate-200 shadow-sm"
          >
            5-Step Proven Methodology
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-3xl md:text-5xl font-bold text-secondary-theme tracking-tight"
          >
            How We Extract <span className="text-primary-theme">Data From Any Source</span>
          </motion.h2>
        </div>

        {/* Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {steps.slice(0, 3).map((step) => (
            <StepCard key={step.id} step={step} variants={cardVariants} />
          ))}
        </motion.div>

        {/* Bottom Row - Centered */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-8"
        >
          {steps.slice(3).map((step) => (
            <div key={step.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.333rem)]">
              <StepCard step={step} variants={cardVariants} />
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Link href="/contact" className="group relative inline-flex items-center gap-3 px-10 py-4 bg-primary-theme text-white font-bold rounded-full shadow-xl shadow-primary-theme/20 hover:opacity-90 transition-all transform hover:scale-105 active:scale-95">
            Start Your Data Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const StepCard = ({ step, variants }: { step: any; variants: any }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(249,115,22,0.1)] group-hover:shadow-primary-theme/20 border border-primary-theme/5 flex flex-col h-full group"
    >
      {/* Step Badge */}
      <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary-theme text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg shadow-primary-theme/20 z-10">
        {step.id}
      </div>

      {/* Icon Container */}
      <div className="mb-6 p-4 bg-primary-theme/10 w-fit rounded-2xl group-hover:bg-primary-theme transition-colors duration-300">
        <step.icon className="w-8 h-8 text-primary-theme group-hover:text-white transition-colors duration-300" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-secondary-theme mb-4 group-hover:text-primary-theme transition-colors">
        {step.title}
      </h3>
      <p className="text-slate-500 leading-relaxed text-sm md:text-base">
        {step.description}
      </p>

      {/* Decorative corner element */}
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-primary-theme/5 rounded-tl-[2.5rem] rounded-br-[2.5rem] -z-0" />
    </motion.div>
  );
};

export default ScrapingProcess;