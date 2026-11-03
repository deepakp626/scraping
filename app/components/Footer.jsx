'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { name: 'E-commerce Scraping', href: '/services/ecommerce-data-scraping' },
    { name: 'Real Estate Scraping', href: '/services/real-estate-property-data-scraping' },
    { name: 'Travel & Hospitality', href: '/services/travel-data-scraping' },
    { name: 'Grocery Scraping', href: '/services/grocery-scraping' },
    { name: 'Quick Commerce Scraping', href: '/services/quick-commerce-scraping' },
    { name: 'Finance & Stock Scraping', href: '/services/finance-and-stock-scraping' },
    { name: 'Social Media Scraping', href: '/services/social-media-scraping-services' },
    { name: 'Food Delivery Scraping', href: '/services/food-delivery-data-scraping-service' },
  ];

  const toolLinks = [
    { name: 'PDF Tools & Converters', href: '/tooles/pdf-tooles' },
    { name: 'Image Compression & Resize', href: '/tooles/image-tooles' },
    { name: 'JSON Formatter & Validator', href: '/tooles/json-tooles' },
    { name: 'Online Code Playgrounds', href: '/tooles/coding-tooles' },
    { name: 'File & Data Converters', href: '/tooles/converter-tools' },
    { name: 'Merge PDF Documents', href: '/tooles/pdf-tooles/merge-pdf' },
    { name: 'Compress Image Files', href: '/tooles/image-tooles/compress-image' },
    { name: 'JSON to CSV Converter', href: '/tooles/json-tooles/json-to-csv' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Datasets Discovery Hub', href: '/datasets' },
    { name: 'E-commerce Datasets', href: '/datasets/ecommerce' },
    { name: 'Engineering Blog', href: '/blog' },
    { name: 'Contact & Support', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-slate-950 pt-16 pb-8 overflow-hidden z-10 w-full mt-auto">
      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Brand & Newsletter Column */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-10 h-10 bg-linear-to-tr from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Zap className="fill-white text-white" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white flex items-center">
                  Compile<span className="text-orange-400">Pilot</span>
                </span>
                <span className="text-[10px] text-orange-400 font-semibold tracking-wider -mt-0.5">
                  compilepilot.com
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Enterprise-grade web scraping solutions, verified catalog datasets, and free high-performance developer tools built for modern engineering teams.
            </p>
            
            {/* Newsletter Input */}
            <div className="mt-2">
              <h4 className="text-sm font-semibold text-slate-200 mb-3">Subscribe to our newsletter</h4>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-slate-900 border border-white/10 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500 w-full max-w-[240px] transition-all"
                />
                <button 
                  type="submit" 
                  aria-label="Subscribe"
                  className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl px-4 py-2.5 transition-colors flex items-center justify-center shadow-lg shadow-orange-500/20 active:scale-95"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>

          {/* Services Column */}
          <div className="sm:col-span-1 lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Scraping Services</h3>
              <span className="text-[10px] font-semibold bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/20">Enterprise</span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-orange-400 text-sm transition-colors block truncate">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1.5">
                <Link href="/services" className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors">
                  <span>Explore All 16+ Services</span>
                  <ChevronRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools Column */}
          <div className="sm:col-span-1 lg:col-span-3">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Developer Tools</h3>
              <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">Free</span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {toolLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 hover:text-orange-400 text-sm transition-colors block truncate">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1.5">
                <Link href="/tooles" className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors">
                  <span>Explore All 50+ Tools</span>
                  <ChevronRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">Company</h3>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-400 hover:text-orange-400 text-sm transition-colors block truncate">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} CompilePilot. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="w-px h-4 bg-white/10 hidden sm:block"></div>

            <Link href="mailto:deepakcontact626@gmail.com" aria-label="Email Us" className="text-slate-400 hover:text-orange-400 transition-colors p-2 hover:bg-orange-500/10 rounded-lg">
              <Mail size={18} />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-slate-400 hover:text-orange-400 transition-colors p-2 hover:bg-orange-500/10 rounded-lg">
              <Twitter size={18} />
            </Link>
            <Link href="#" aria-label="GitHub" className="text-slate-400 hover:text-orange-400 transition-colors p-2 hover:bg-orange-500/10 rounded-lg">
              <Github size={18} />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-slate-400 hover:text-orange-400 transition-colors p-2 hover:bg-orange-500/10 rounded-lg">
              <Linkedin size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
