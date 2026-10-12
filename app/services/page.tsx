import React from 'react';
import { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Web Scraping & Data Extraction Services | Custom Datasets',
  description: 'Enterprise-grade web scraping services. Get high-quality, structured datasets for e-commerce, real estate, travel, finance, food, and more. Auto-scheduled, anti-bot bypassed, and fully validated.',
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
