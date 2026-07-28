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

export interface ServiceLink {
  href: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
}

export interface ServiceGroup {
  title: string;
  links: ServiceLink[];
}

export const servicesColumns: ServiceGroup[][] = [
  // Column 1
  [
    {
      title: 'E-commerce & Retail',
      links: [
        { href: '/services/ecommerce-data-scraping', label: 'Ecommerce Scraping', icon: ShoppingBag },
        { href: '/services/fashion-scraping', label: 'Fashion Scraping', icon: Tag },
      ],
    },
    {
      title: 'Automotive & Mobility',
      links: [
        { href: '/services/car-rental-data-scraping', label: 'Car Rental Scraping', icon: Car },
      ],
    },
  ],
  // Column 2
  [
    {
      title: 'Grocery & FMCG',
      links: [
        { href: '/services/grocery-scraping', label: 'Grocery Scraping', icon: Store },
        { href: '/services/quick-commerce-scraping', label: 'Quick Commerce Scraping', icon: Zap },
        { href: '/services/quick-commerce-fmcg-data-scraping', label: 'FMCG Data Scraping', icon: Database },
      ],
    },
  ],
  // Column 3
  [
    {
      title: 'Travel & Hospitality',
      links: [
        { href: '/services/travel-data-scraping', label: 'Travel Scraping', icon: Plane },
        { href: '/services/car-rental-data-scraping', label: 'Car Rental Scraping', icon: Car },
      ],
    },
    {
      title: 'Healthcare & Pharma',
      links: [
        { href: '/services/healthcare-data-scraping', label: 'Healthcare Scraping', icon: Pill },
      ],
    },
  ],
  // Column 4
  [
    {
      title: 'Food & Restaurants',
      links: [
        { href: '/services/food-data-scraping', label: 'Food Scraping', icon: Utensils },
        { href: '/services/food-delivery-data-scraping-service', label: 'Food Delivery Scraping', icon: Globe },
      ],
    },
    {
      title: 'Real Estate & Local',
      links: [
        { href: '/services/real-estate-property-data-scraping', label: 'Real Estate Scraping', icon: Home },
      ],
    },
  ],
  // Column 5
  [
    {
      title: 'Finance & Legal',
      links: [
        { href: '/services/finance-and-stock-scraping', label: 'Finance & Stock Scraping', icon: BarChart3 },
      ],
    },
    {
      title: 'Media & Entertainment',
      links: [
        { href: '/services/ott-streaming-data-scraping-service', label: 'OTT Scraping', icon: Film },
        { href: '/services/social-media-scraping-services', label: 'Social Media Scraping', icon: Users },
      ],
    },
    {
      title: 'Emerging Industries',
      links: [
        { href: '/services/recruitment-data-scraping-service', label: 'Recruitment Scraping', icon: Briefcase },
        { href: '/services/liquor-or-alchol-data-scraping', label: 'Liquor Scraping', icon: Wine },
      ],
    },
  ],
];

export function ServicesMegaMenu() {
  return (
    <div style={{ minWidth: 980, maxWidth: 1100 }} className="grid grid-cols-5 gap-8 p-2 text-left">
      {servicesColumns.map((column, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-6">
          {column.map((group, groupIdx) => (
            <div key={groupIdx}>
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 underline underline-offset-6">
                {group.title}
              </h4>
              <div className="flex flex-col gap-2">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={`${link.href}-${link.label}`}
                      href={link.href}
                      className="flex items-center gap-2 text-base font-medium text-slate-700 hover:text-orange-600 transition-colors py-1 group"
                    >
                      <Icon size={16} className="text-slate-400 group-hover:text-orange-600 transition-colors shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ServicesMegaMenu;

