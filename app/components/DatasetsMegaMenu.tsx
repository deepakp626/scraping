'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Hotel,
  Plane,
  Utensils,
  Wine,
  Film,
  Zap,
  MessageSquare,
  Car,
  Home,
  Store,
  Pill,
  Package,
  MapPin,
  Star,
  TrendingUp,
  Database,
  Tag,
  BarChart2,
  Clock,
  Layers,
  Globe,
  ShieldCheck,
  AlertCircle,
  Truck,
  DollarSign,
  Search,
  Building2,
  Percent,
  CalendarRange,
} from 'lucide-react';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export type DatasetItem = {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  link: string;
};

export type DatasetIndustry = {
  id: string;
  label: string;
  tabIcon: React.ComponentType<{ size?: number; className?: string }>;
  datasets: DatasetItem[];
  href: string;
};

// ─────────────────────────────────────────────
// DATA — one source of truth per industry
// ─────────────────────────────────────────────

export const datasetIndustries: DatasetIndustry[] = [
  {
    id: 'ecommerce',
    label: 'E-commerce',
    tabIcon: ShoppingCart,
    href: '/datasets/ecommerce',
    datasets: [
      { name: 'Product Listings', icon: Package, link: '/datasets/ecommerce/product-listings' },
      { name: 'Pricing Data', icon: TrendingUp, link: '/datasets/ecommerce/pricing-data' },
      { name: 'Reviews & Ratings', icon: Star, link: '/datasets/ecommerce/reviews-ratings' },
      { name: 'Seller Profiles', icon: Store, link: '/datasets/ecommerce/seller-profiles' },
      { name: 'Category Taxonomy', icon: Layers, link: '/datasets/ecommerce/category-taxonomy' },
      { name: 'Stock Availability', icon: AlertCircle, link: '/datasets/ecommerce/stock-availability' },
      { name: 'Discount & Offers', icon: Percent, link: '/datasets/ecommerce/discounts-offers' },
      { name: 'Brand Intelligence', icon: Tag, link: '/datasets/ecommerce/brand-intelligence' },
    ],
  },
  {
    id: 'grocery',
    label: 'Grocery',
    tabIcon: Store,
    href: '/datasets/grocery',
    datasets: [
      { name: 'SKU Catalog', icon: Package, link: '/datasets/grocery/sku-catalog' },
      { name: 'Price Monitoring', icon: TrendingUp, link: '/datasets/grocery/price-monitoring' },
      { name: 'Availability', icon: AlertCircle, link: '/datasets/grocery/availability' },
      { name: 'Promotions & Deals', icon: Percent, link: '/datasets/grocery/promotions' },
      { name: 'Nutritional Data', icon: ShieldCheck, link: '/datasets/grocery/nutritional-data' },
      { name: 'Store Locations', icon: MapPin, link: '/datasets/grocery/store-locations' },
      { name: 'Brand Coverage', icon: Tag, link: '/datasets/grocery/brand-coverage' },
      { name: 'Category Trends', icon: BarChart2, link: '/datasets/grocery/category-trends' },
    ],
  },
  {
    id: 'quick_commerce',
    label: 'Quick Commerce',
    tabIcon: Zap,
    href: '/datasets/quick-commerce',
    datasets: [
      { name: 'Dark Store Data', icon: Store, link: '/datasets/quick-commerce/dark-store-data' },
      { name: 'Delivery Slots', icon: Clock, link: '/datasets/quick-commerce/delivery-slots' },
      { name: 'Category Pricing', icon: DollarSign, link: '/datasets/quick-commerce/category-pricing' },
      { name: 'Brand Presence', icon: Tag, link: '/datasets/quick-commerce/brand-presence' },
      { name: 'ETA Tracking', icon: Truck, link: '/datasets/quick-commerce/eta-tracking' },
      { name: 'Availability Signals', icon: AlertCircle, link: '/datasets/quick-commerce/availability' },
      { name: 'Platform Coverage', icon: Globe, link: '/datasets/quick-commerce/platform-coverage' },
      { name: 'Demand Index', icon: TrendingUp, link: '/datasets/quick-commerce/demand-index' },
    ],
  },
  {
    id: 'travel',
    label: 'Travel',
    tabIcon: Plane,
    href: '/datasets/travel',
    datasets: [
      { name: 'Flight Schedules', icon: Plane, link: '/datasets/travel/flight-schedules' },
      { name: 'Fare Tracker', icon: DollarSign, link: '/datasets/travel/fare-tracker' },
      { name: 'Hotel Rates', icon: Hotel, link: '/datasets/travel/hotel-rates' },
      { name: 'Traveller Reviews', icon: Star, link: '/datasets/travel/reviews' },
      { name: 'Route Coverage', icon: Globe, link: '/datasets/travel/route-coverage' },
      { name: 'Seat Availability', icon: CalendarRange, link: '/datasets/travel/seat-availability' },
      { name: 'Airline Profiles', icon: Building2, link: '/datasets/travel/airline-profiles' },
      { name: 'Holiday Packages', icon: Package, link: '/datasets/travel/holiday-packages' },
    ],
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    tabIcon: Utensils,
    href: '/datasets/restaurant',
    datasets: [
      { name: 'Menu Data', icon: Utensils, link: '/datasets/restaurant/menu-data' },
      { name: 'Ratings & Reviews', icon: Star, link: '/datasets/restaurant/ratings-reviews' },
      { name: 'Location Data', icon: MapPin, link: '/datasets/restaurant/location-data' },
      { name: 'Cuisine Tags', icon: Tag, link: '/datasets/restaurant/cuisine-tags' },
      { name: 'Operating Hours', icon: Clock, link: '/datasets/restaurant/operating-hours' },
      { name: 'Price Range', icon: DollarSign, link: '/datasets/restaurant/price-range' },
      { name: 'Chain Profiles', icon: Building2, link: '/datasets/restaurant/chain-profiles' },
      { name: 'Delivery Partners', icon: Truck, link: '/datasets/restaurant/delivery-partners' },
    ],
  },
  {
    id: 'food_delivery',
    label: 'Food Delivery',
    tabIcon: MessageSquare,
    href: '/datasets/food-delivery',
    datasets: [
      { name: 'Platform Listings', icon: Store, link: '/datasets/food-delivery/platform-listings' },
      { name: 'Delivery Fees', icon: DollarSign, link: '/datasets/food-delivery/delivery-fees' },
      { name: 'Order Volume', icon: TrendingUp, link: '/datasets/food-delivery/order-volume' },
      { name: 'Menu Pricing', icon: Package, link: '/datasets/food-delivery/menu-pricing' },
      { name: 'ETA Data', icon: Clock, link: '/datasets/food-delivery/eta-data' },
      { name: 'Promotions', icon: Percent, link: '/datasets/food-delivery/promotions' },
      { name: 'Restaurant Rank', icon: BarChart2, link: '/datasets/food-delivery/restaurant-rank' },
      { name: 'Zone Coverage', icon: MapPin, link: '/datasets/food-delivery/zone-coverage' },
    ],
  },
  {
    id: 'hotel',
    label: 'Hotel',
    tabIcon: Hotel,
    href: '/datasets/hotel',
    datasets: [
      { name: 'Property Listings', icon: Hotel, link: '/datasets/hotel/property-listings' },
      { name: 'Rate Parity', icon: TrendingUp, link: '/datasets/hotel/rate-parity' },
      { name: 'Guest Reviews', icon: Star, link: '/datasets/hotel/guest-reviews' },
      { name: 'Availability', icon: CalendarRange, link: '/datasets/hotel/availability' },
      { name: 'Amenities Data', icon: ShieldCheck, link: '/datasets/hotel/amenities-data' },
      { name: 'OTA Coverage', icon: Globe, link: '/datasets/hotel/ota-coverage' },
      { name: 'Location Data', icon: MapPin, link: '/datasets/hotel/location-data' },
      { name: 'Star Ratings', icon: BarChart2, link: '/datasets/hotel/star-ratings' },
    ],
  },
  {
    id: 'liquor',
    label: 'Liquor & Alcohol',
    tabIcon: Wine,
    href: '/datasets/liquor',
    datasets: [
      { name: 'Product Catalog', icon: Wine, link: '/datasets/liquor/product-catalog' },
      { name: 'Pricing Data', icon: DollarSign, link: '/datasets/liquor/pricing-data' },
      { name: 'Availability', icon: MapPin, link: '/datasets/liquor/availability' },
      { name: 'Expert Ratings', icon: Star, link: '/datasets/liquor/ratings' },
      { name: 'Brand Profiles', icon: Tag, link: '/datasets/liquor/brand-profiles' },
      { name: 'Category Data', icon: Layers, link: '/datasets/liquor/category-data' },
      { name: 'Market Trends', icon: TrendingUp, link: '/datasets/liquor/market-trends' },
      { name: 'Retailer Coverage', icon: Store, link: '/datasets/liquor/retailer-coverage' },
    ],
  },
  {
    id: 'real_estate',
    label: 'Real Estate',
    tabIcon: Home,
    href: '/datasets/real-estate',
    datasets: [
      { name: 'Property Listings', icon: Home, link: '/datasets/real-estate/property-listings' },
      { name: 'Price Trends', icon: TrendingUp, link: '/datasets/real-estate/price-trends' },
      { name: 'Location Insights', icon: MapPin, link: '/datasets/real-estate/location-insights' },
      { name: 'Agent Profiles', icon: Building2, link: '/datasets/real-estate/agent-profiles' },
      { name: 'Rental Yields', icon: DollarSign, link: '/datasets/real-estate/rental-yields' },
      { name: 'Project Data', icon: Layers, link: '/datasets/real-estate/project-data' },
      { name: 'Market Reports', icon: BarChart2, link: '/datasets/real-estate/market-reports' },
      { name: 'Availability', icon: CalendarRange, link: '/datasets/real-estate/availability' },
    ],
  },
  {
    id: 'car_rental',
    label: 'Car Rental',
    tabIcon: Car,
    href: '/datasets/car-rental',
    datasets: [
      { name: 'Fleet Inventory', icon: Car, link: '/datasets/car-rental/fleet-inventory' },
      { name: 'Rate Data', icon: DollarSign, link: '/datasets/car-rental/rate-data' },
      { name: 'Location Coverage', icon: MapPin, link: '/datasets/car-rental/location-coverage' },
      { name: 'Availability', icon: CalendarRange, link: '/datasets/car-rental/availability' },
      { name: 'Vehicle Specs', icon: Database, link: '/datasets/car-rental/vehicle-specs' },
      { name: 'Vendor Profiles', icon: Building2, link: '/datasets/car-rental/vendor-profiles' },
      { name: 'Price Comparison', icon: TrendingUp, link: '/datasets/car-rental/price-comparison' },
      { name: 'Customer Reviews', icon: Star, link: '/datasets/car-rental/customer-reviews' },
    ],
  },
  {
    id: 'ott',
    label: 'OTT Media',
    tabIcon: Film,
    href: '/datasets/ott-media',
    datasets: [
      { name: 'Content Catalog', icon: Film, link: '/datasets/ott-media/content-catalog' },
      { name: 'Ratings & Reviews', icon: Star, link: '/datasets/ott-media/ratings-reviews' },
      { name: 'Platform Coverage', icon: Globe, link: '/datasets/ott-media/platform-coverage' },
      { name: 'Genre Metadata', icon: Tag, link: '/datasets/ott-media/genre-metadata' },
      { name: 'Cast & Crew', icon: Database, link: '/datasets/ott-media/cast-crew' },
      { name: 'Release Dates', icon: CalendarRange, link: '/datasets/ott-media/release-dates' },
      { name: 'Trending Titles', icon: TrendingUp, link: '/datasets/ott-media/trending-titles' },
      { name: 'Language Data', icon: Layers, link: '/datasets/ott-media/language-data' },
    ],
  },
  {
    id: 'pharma',
    label: 'Pharmaceutical',
    tabIcon: Pill,
    href: '/datasets/pharmaceutical',
    datasets: [
      { name: 'Drug Listings', icon: Pill, link: '/datasets/pharmaceutical/drug-listings' },
      { name: 'Price Comparison', icon: DollarSign, link: '/datasets/pharmaceutical/price-comparison' },
      { name: 'Availability', icon: AlertCircle, link: '/datasets/pharmaceutical/availability' },
      { name: 'Manufacturer Data', icon: Building2, link: '/datasets/pharmaceutical/manufacturer-data' },
      { name: 'Approval Status', icon: ShieldCheck, link: '/datasets/pharmaceutical/approval-status' },
      { name: 'Therapeutic Class', icon: Tag, link: '/datasets/pharmaceutical/therapeutic-class' },
      { name: 'Market Trends', icon: BarChart2, link: '/datasets/pharmaceutical/market-trends' },
      { name: 'Substitute Drugs', icon: Search, link: '/datasets/pharmaceutical/substitute-drugs' },
    ],
  },
];

// ─────────────────────────────────────────────
// ANIMATION VARIANTS  (matches ToolsMegaMenu)
// ─────────────────────────────────────────────

const panelVariants = {
  hidden: { opacity: 0, x: 10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.15 } },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export function DatasetsMegaMenu() {
  const [activeTab, setActiveTab] = useState<string>(datasetIndustries[0].id);

  const activeIndustry = datasetIndustries.find((ind) => ind.id === activeTab)!;

  return (
    <div style={{ minWidth: 680, maxWidth: 780 }}>
      {/* ── Horizontal tab bar (identical pattern to ToolsMegaMenu) ── */}
      <div className="flex items-center gap-1 border-b border-white/10 mb-4 pb-0 overflow-x-auto scrollbar-none">
        {datasetIndustries.map((ind) => {
          const TabIcon = ind.tabIcon;
          const isActive = ind.id === activeTab;
          return (
            <button
              key={ind.id}
              onMouseEnter={() => setActiveTab(ind.id)}
              onClick={() => setActiveTab(ind.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                isActive ? 'text-orange-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <TabIcon size={14} />
              {ind.label}
              {/* Animated underline — same layoutId pattern */}
              {isActive && (
                <motion.span
                  layoutId="datasets-tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}

        {/* View all — pushed to the right, same as ToolsMegaMenu */}
        <Link
          href={activeIndustry.href}
          className="ml-auto flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-medium transition-colors px-2 py-1 shrink-0"
        >
          View all {activeIndustry.label} →
        </Link>
      </div>

      {/* ── Dataset grid panel (same 4-column grid as ToolsMegaMenu) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: 'repeat(4, minmax(0,1fr))' }}
          >
            {activeIndustry.datasets.slice(0, 16).map((dataset) => {
              const Icon = dataset.icon;
              return (
                <Link
                  key={dataset.name}
                  href={dataset.link}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all group"
                >
                  <div className="shrink-0 p-1.5 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                    <Icon
                      size={14}
                      className="text-orange-400 group-hover:text-orange-300 transition-colors"
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors leading-tight">
                    {dataset.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* More datasets link */}
          {activeIndustry.datasets.length > 16 && (
            <Link
              href={activeIndustry.href}
              className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500 hover:text-orange-400 transition-colors pl-1"
            >
              +{activeIndustry.datasets.length - 16} more datasets →
            </Link>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default DatasetsMegaMenu;
