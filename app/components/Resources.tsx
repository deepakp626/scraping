"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, FileText, ArrowRight } from 'lucide-react';

const TABS = [
{
    id: 'blog',
    label: 'Blog',
    icon: <Newspaper size={18} />,
    content: [
      { 
        title: "The Future of AI Web Scraping", 
        desc: "Everything you need to know about the shift from tedious regex rules to LLM-powered extraction.", 
        tags: ["AI", "Web Dev"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        date: "Mar 20, 2026"
      },
      { 
        title: "Bypassing Modern Anti-Bot Systems", 
        desc: "Advanced techniques, fingerprint spoofing, and dynamic architecture for maintaining reliable data streams.", 
        tags: ["Security", "Architecture"],
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
        date: "Mar 10, 2026"
      },
    ]
  },

  {
    id: 'case-studies',
    label: 'Case Studies',
    icon: <FileText size={18} />,
    content: [
      { 
        title: "Global Tech Expansion", 
        desc: "How we helped a FinTech startup scale their data pipeline to 10M requests per day using our enterprise scraping grid.", 
        tags: ["FinTech", "Scaling"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        date: "Mar 15, 2026"
      },
      { 
        title: "Automated Competitor Analysis", 
        desc: "Monitoring 50k+ products daily for real-time pricing advantages without getting blocked by Cloudflare.", 
        tags: ["E-commerce", "Pricing"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        date: "Feb 28, 2026"
      },
    ]
  },

];

export default function Resources() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-theme/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-theme/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Learn & <span className="text-primary-theme">Grow</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Explore our latest insights, success stories, and technical guides designed to help you extract data more efficiently.
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          <div className="bg-slate-900/50 p-1.5 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative cursor-pointer px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span className="relative z-10">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-pill-resources"
                    className="absolute inset-0 bg-primary-theme/20 border border-primary-theme/30 rounded-xl "
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {TABS.find(t => t.id === activeTab)?.content.map((item, index) => (
                <ResourceCard key={index} item={item} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ResourceCard({ item, index }: { item: any, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-slate-900/50 rounded-3xl border border-white/10 overflow-hidden hover:border-primary-theme/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-theme/10 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-slate-800 animate-pulse" /> {/* Loading state */}
        <img 
          src={item.image} 
          alt={item.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
        
        {/* Tags */}
        <div className="absolute top-4 left-4 flex gap-2">
          {item.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-white bg-primary-theme/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-lg">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1 relative bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-400">
            {item.date}
          </span>
          <ArrowRight size={18} className="text-slate-600 group-hover:text-primary-theme transition-colors -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-theme transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-slate-400 leading-relaxed mb-8 line-clamp-3 flex-1">
          {item.desc}
        </p>
        
        <button className="flex items-center gap-2 text-sm font-bold text-primary-theme group-hover:gap-3 transition-all mt-auto self-start">
          Read Full Story <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}