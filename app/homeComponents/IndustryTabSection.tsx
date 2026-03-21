"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
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
  Pill 
} from 'lucide-react';

const categories = [
  {
    id: 'ecommerce',
    title: 'Ecommerce Data',
    subtitle: 'Product Name, Prices',
    icon: <ShoppingCart size={20} />,
    image: "/images/hero/IndustryTabSection/Images/Ecommerce-Data-Scraping-services.png",
  },
  {
    id: 'liquor',
    title: 'Liquor & Alcohol',
    subtitle: 'Product Name, Price',
    icon: <Wine size={20} />,
    image: "/images/hero/IndustryTabSection/Images/Liquor-&-Alcohol-Scraping-Services.webp",
    data: {
      products: [
        { 
          name: 'La Lecciaia Brunello di Montalcino', 
          year: '2018', 
          origin: 'Italy • Sangiovese', 
          price: '$44.99',
          tags: ['95 Wine Enthusiast', '92 James Suckling', '91 Vinous'],
          img: '🍷'
        },
        { 
          name: 'Tenuta di Capraia Chianti Classico', 
          year: '2019', 
          origin: 'Italy • Sangiovese', 
          price: '$44.99',
          tags: ['94 Vinous', '94 Decanter', '91 Wine Spectator'],
          img: '🍾'
        },
        { 
          name: 'Santa Giulia Brunello di Montalcino', 
          year: '2019', 
          origin: 'Italy • Sangiovese', 
          price: '$34.99',
          tags: ['93 Vinous', '92 James Suckling'],
          img: '🍷'
        }
      ],
      table: [
        { name: "Jack Daniel's", price: '$ 32', brand: "Jack Daniel's", abv: '40', size: '750 ml' },
        { name: 'Grey Goose Vodka', price: '$ 45', brand: 'Grey Goose', abv: '40', size: '1 L' },
        { name: 'Budweiser', price: '$ 16', brand: 'Budweiser', abv: '5', size: '355 ml' },
        { name: 'Corona', price: '$ 12', brand: 'Corona', abv: '4.5', size: '355 ml' },
        { name: 'Heineken', price: '$ 15', brand: 'Heineken', abv: '5', size: '355 ml' },
      ]
    }
  },
  {
    id: 'hotel',
    title: 'Hotel Data Scraping',
    subtitle: 'Property Name, Price/Night',
    icon: <Hotel size={20} />,
    image: "/images/hero/IndustryTabSection/Images/Hotel-Data-Scraping-Services.webp",
    data: {
      products: [
        { name: 'Grand Hyatt', brand: 'Luxury', price: '$450/nt', spec: 'NYC' },
        { name: 'Hilton Garden', brand: 'Business', price: '$220/nt', spec: 'London' }
      ],
      table: [
        { name: 'Marriott Bonvoy', price: '$350', brand: 'Marriott', rating: '4.5', location: 'Paris' },
        { name: 'Sheraton', price: '$280', brand: 'Starwood', rating: '4.2', location: 'Tokyo' }
      ]
    }
  },
  { id: 'quick_commerce', title: 'Quick Commerce Data', subtitle: 'Product Name, Prices', icon: <Zap size={20} />, image: "/images/hero/IndustryTabSection/Images/Quick-Commerce-Data-Scraping-Services.webp" },
  { id: 'travel', title: 'Travel Data', subtitle: 'Flight, Hotel', icon: <Plane size={20} />, image: "/images/hero/IndustryTabSection/Images/Travel-Data-Scraping-Services.webp" },
  { id: 'restaurant', title: 'Restaurant Data', subtitle: 'Restaurant Name, Reviews', icon: <Utensils size={20} />, image: "/images/hero/IndustryTabSection/Images/Restaurant-Data-Scraping-Services.webp" },
  { id: 'food_delivery', title: 'Food Delivery Data', subtitle: 'Menu, Pricing', icon: <MessageSquare size={20} />, image: "/images/hero/IndustryTabSection/Images/Food-Delivery-Data-Scraping-Services.webp" },
  { id: 'car_rental', title: 'Car Rental Data', subtitle: 'Vehicles, Location', icon: <Car size={20} />, image: "/images/hero/IndustryTabSection/Images/Car-rental-Data-Scraping-services.webp" },
  { id: 'real_estate', title: 'Real Estate Data', subtitle: 'Property Name, Location', icon: <Home size={20} />, image: "/images/hero/IndustryTabSection/Images/Real-Estate-Data-Scraping-Services.webp" },
  { id: 'ott', title: 'OTT Media Data', subtitle: 'Movie Name, Genre', icon: <Film size={20} />, image: "/images/hero/IndustryTabSection/Images/OTT-Media-Data-Scraping-Services.webp" },
  { id: 'grocery', title: 'Grocery & Supermarket', subtitle: 'Product Name, Price', icon: <Store size={20} />, image: "/images/hero/IndustryTabSection/Images/Grocery-&-Supermarket-Scraping-Services.webp" },
  { id: 'pharma', title: 'Pharmaceutical Data', subtitle: 'Product Name, Price', icon: <Pill size={20} />, image: "/images/hero/IndustryTabSection/Images/Pharmaceutical-Data-Scraping-Services.webp" },
];

export default function IndustryTabSection() {
  const [activeTab, setActiveTab] = useState('liquor');
  const sectionRef = useRef<HTMLDivElement>(null);

  const activeCategory = categories.find(c => c.id === activeTab) || categories[1];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Which Data Can We <span className="text-orange-600">Extract?</span>
          </h1>
          <p className="text-gray-600 max-w-3xl text-lg leading-relaxed">
            Gain valuable insights with our powerful data extraction services. Whether you're 
            looking to optimize operations or make data-driven decisions, we've got you covered!
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs (Left on Desktop, Top on Mobile) */}
<div className="w-full lg:w-2/3 grid grid-cols-2 gap-3">
  {categories.map((cat) => (
    <button
      key={cat.id}
      onClick={() => {
        setActiveTab(cat.id);
        // On mobile, scroll to content area when a tab is clicked
        if (window.innerWidth < 1024) {
          sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }}
      className={`
        flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left
        ${activeTab === cat.id 
          ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-100 scale-[1.02]' 
          : 'bg-white text-gray-600 border-gray-200 hover:border-orange-200 hover:bg-orange-50'
        }
      `}
    >
      <div className={`
        p-2 rounded-lg transition-colors
        ${activeTab === cat.id ? 'bg-white/20' : 'bg-gray-100'}
      `}>
        {cat.icon}
        
      </div>
      <div>
        <h4 className="font-bold text-sm leading-tight">{cat.title}</h4>
        <p className={`text-[10px] mt-0.5 opacity-80 ${activeTab === cat.id ? 'text-orange-100' : 'text-gray-400'}`}>
          {cat.subtitle}
        </p>
      </div>
    </button>
  ))}
</div>

          {/* Main Display Area (Right on Desktop, Bottom on Mobile) */}
          <div ref={sectionRef} className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6 pb-0">
                  {/* Category Image */}
                  {activeCategory.image && (
                    <div className="mb-8 w-full h-auto overflow-hidden rounded-xl shadow-lg border border-gray-100">
                      <Image 
                        src={activeCategory.image} 
                        alt={activeCategory.title}
                        width={800}
                        height={400}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}



                </div>
              </motion.div>
            </AnimatePresence>
          </div>


        </div>
      </div>
    </div>
  );
}   