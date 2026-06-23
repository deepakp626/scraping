'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Tag,
  Car,
  Plane,
  Store,
  Zap,
  Database,
  Pill,
  Utensils,
  Globe,
  Home,
  BarChart3,
  Film,
  Users,
  Briefcase,
  Wine
} from 'lucide-react';

export function ServicesMegaMenu() {
  return (
    <div style={{ minWidth: 980, maxWidth: 1100 }} className="grid grid-cols-5 gap-8 p-2 text-left">
      {/* Column 1 */}
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 underline underline-offset-6">
            E-commerce & Retail
          </h4>
          <div className="flex flex-col gap-2">
            <Link href="/services/ecommerce-scraping" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <ShoppingBag size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Ecommerce Scraping</span>
            </Link>
            <Link href="/services/fashion-scraping" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Tag size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Fashion Scraping</span>
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 underline underline-offset-6">
            Automotive & Mobility
          </h4>
          <div className="flex flex-col gap-2">
            <Link href="/services/car-rental-data-scraping-service" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Car size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Car Rental Scraping</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 underline underline-offset-6">
            Grocery & FMCG
          </h4>
          <div className="flex flex-col gap-2">
            <Link href="/services/grocery-scraping" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Store size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Grocery Scraping</span>
            </Link>
            <Link href="/services/quick-commerce-scraping" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Zap size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Quick Commerce Scraping</span>
            </Link>
            <Link href="/services/quick-commerce-fmcg-data-scraping" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Database size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>FMCG Data Scraping</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Column 3 */}
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 underline underline-offset-6">
            Travel & Hospitality
          </h4>
          <div className="flex flex-col gap-2">
            <Link href="/services/travel-scraping" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Plane size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Travel Scraping</span>
            </Link>
            <Link href="/services/car-rental-data-scraping-service" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Car size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Car Rental Scraping</span>
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 underline underline-offset-6">
            Healthcare & Pharma
          </h4>
          <div className="flex flex-col gap-2">
            <Link href="/services/healthcare-scraping" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Pill size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Healthcare Scraping</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Column 4 */}
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 underline underline-offset-6">
            Food & Restaurants
          </h4>
          <div className="flex flex-col gap-2">
            <Link href="/services/food-scraping" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Utensils size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Food Scraping</span>
            </Link>
            <Link href="/services/food-delivery-data-scraping-service" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Globe size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Food Delivery Scraping</span>
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 underline underline-offset-6">
            Real Estate & Local
          </h4>
          <div className="flex flex-col gap-2">
            <Link href="/services/real-estate-property-data-scraping" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Home size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Real Estate Scraping</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Column 5 */}
      <div className="flex flex-col gap-6">
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 underline underline-offset-6">
            Finance & Legal
          </h4>
          <div className="flex flex-col gap-2">
            <Link href="/services/finance-&-stock-scraping" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <BarChart3 size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Finance & Stock Scraping</span>
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 underline underline-offset-6">
            Media & Entertainment
          </h4>
          <div className="flex flex-col gap-2">
            <Link href="/services/ott-streaming-data-scraping-service" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Film size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>OTT Scraping</span>
            </Link>
            <Link href="/services/social-media-scraping" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Users size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Social Media Scraping</span>
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 underline underline-offset-6">
            Emerging Industries
          </h4>
          <div className="flex flex-col gap-2">
            <Link href="/services/recruitment" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Briefcase size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Recruitment Scraping</span>
            </Link>
            <Link href="/services/liquor-or-alchol-data-scraping" className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group">
              <Wine size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
              <span>Liquor Scraping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesMegaMenu;
