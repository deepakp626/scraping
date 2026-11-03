import {
  Package,
  TrendingUp,
  AlertCircle,
  Percent,
  ShieldCheck,
  MapPin,
  Tag,
  BarChart2
} from 'lucide-react';
import { SiblingDataset } from '@/app/datasets/components/DatasetTemplate';

export const getGrocerySiblingDatasets = (currentSlug: string): SiblingDataset[] => [
  {
    name: "SKU Catalog",
    slug: "/datasets/grocery/sku-catalog",
    desc: "Comprehensive supermarket SKU inventories, UPC/EAN barcodes, pack sizes, and department taxonomies.",
    icon: Package,
    badge: "Master Catalog",
    active: currentSlug === "sku-catalog"
  },
  {
    name: "Price Monitoring",
    slug: "/datasets/grocery/price-monitoring",
    desc: "Store-level shelf prices, unit pricing (per oz/kg/count), inflation benchmarks, and cross-chain comparisons.",
    icon: TrendingUp,
    badge: "Price Intel",
    active: currentSlug === "price-monitoring"
  },
  {
    name: "Availability",
    slug: "/datasets/grocery/availability",
    desc: "Real-time stock status, regional out-of-stock rates, fulfillment backorders, and restock lead-times.",
    icon: AlertCircle,
    badge: "Supply Chain",
    active: currentSlug === "availability"
  },
  {
    name: "Promotions & Deals",
    slug: "/datasets/grocery/promotions",
    desc: "Weekly circulars, BOGO offers, multi-buy discounts, loyalty member savings, and digital manufacturer coupons.",
    icon: Percent,
    badge: "Promotions",
    active: currentSlug === "promotions"
  },
  {
    name: "Nutritional Data",
    slug: "/datasets/grocery/nutritional-data",
    desc: "Detailed ingredients lists, allergen warnings, macro/micronutrients, organic certifications, and diet labels.",
    icon: ShieldCheck,
    badge: "Compliance",
    active: currentSlug === "nutritional-data"
  },
  {
    name: "Store Locations",
    slug: "/datasets/grocery/store-locations",
    desc: "Geo-coded supermarket branches, store IDs, delivery radius, operating hours, and curbside pickup facilities.",
    icon: MapPin,
    badge: "Geospatial",
    active: currentSlug === "store-locations"
  },
  {
    name: "Brand Coverage",
    slug: "/datasets/grocery/brand-coverage",
    desc: "CPG brand share of shelf, private-label vs national brand penetration, manufacturer distribution footprints.",
    icon: Tag,
    badge: "CPG Insights",
    active: currentSlug === "brand-coverage"
  },
  {
    name: "Category Trends",
    slug: "/datasets/grocery/category-trends",
    desc: "Demand shifts, fresh produce seasonality, emerging dietary trends, category assortment velocity, and volume stats.",
    icon: BarChart2,
    badge: "Market Trends",
    active: currentSlug === "category-trends"
  }
];
