"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Zap, Code, ShieldCheck } from 'lucide-react';

/**
 * FirecrawlFeatures Component (Next.js Client Component)
 * Enhanced with dynamic ranking and fluctuating live percentages.
 * Redesigned for a Premium Dark Experience.
 */
export default function FirecrawlFeatures() {
  // --- Logic for Dynamic Ranking (Speed Card) ---
  const [tableData, setTableData] = useState([
    { id: 1, url: '/docs', crawl: 400, scrape: 400 },
    { id: 2, url: '/templates', crawl: 741, scrape: 764, highlighted: true },
    { id: 3, url: '/login', crawl: 790, scrape: 716 },
    { id: 4, url: '/pricing', crawl: 717, scrape: 721 },
    { id: 5, url: '/careers', crawl: 685, scrape: 782 },
  ]);

  // --- Logic for Fluctuating Percentages (Reliability Card) ---
  const [percentages, setPercentages] = useState({
    firecrawl: 96,
    puppeteer: 79,
    curl: 75
  });

  useEffect(() => {
    // Interval changed to 2000ms as requested
    const interval = setInterval(() => {
      // 1. Randomly update crawl speeds and re-sort
      setTableData(prev => {
        const newData = prev.map(item => ({
          ...item,
          crawl: Math.max(300, item.crawl + (Math.random() > 0.5 ? 20 : -20)),
          scrape: Math.max(300, item.scrape + (Math.random() > 0.5 ? 20 : -20))
        }));
        // Sort by crawl speed (fastest first)
        return [...newData].sort((a, b) => a.crawl - b.crawl);
      });

      // 2. Randomly fluctuate competitor percentages slightly
      setPercentages(prev => ({
        ...prev,
        puppeteer: Math.min(82, Math.max(74, prev.puppeteer + (Math.random() > 0.5 ? 1 : -1))),
        curl: Math.min(78, Math.max(70, prev.curl + (Math.random() > 0.5 ? 1 : -1))),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-slate-950 p-6 md:p-12 lg:p-20 font-sans text-white overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <header className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-[0.2em]"
          >
            Performance First
          </motion.div>
          <h2 className="text-3xl md:text-7xl font-bold tracking-tight">
            Why Choose {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-500">
              Scraping
            </span>
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Reliability (Glassmorphism) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative bg-white/[0.03] backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-3xl overflow-hidden flex flex-col hover:border-orange-500/30 transition-colors duration-500"
          >
            <div className="p-8 pb-10">
              <div className="flex items-center gap-3 text-orange-500 mb-4 font-semibold tracking-wide">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest">Global Coverage</span>
              </div>
              <h3 className="text-3xl font-bold leading-[1.1] mb-4">
                Unmatched 
                <span className="text-white/40 font-medium"> Reliability.</span>
              </h3>
              <p className="text-base text-white/50 leading-relaxed font-light max-w-sm">
                Clean data delivered via our global proxy-free network. No blocks, no puppets.
              </p>
            </div>

            <div className="mt-auto p-8 bg-black/40 border-t border-white/5 space-y-6">
              <ComparisonRow 
                label="Scraping.dev" 
                value={percentages.firecrawl} 
                color="bg-gradient-to-r from-orange-500 to-amber-500"
                icon={<Zap className="text-white fill-white" size={20} />}
                isPrimary
              />
              <ComparisonRow 
                label="Puppeteer" 
                value={percentages.puppeteer} 
                color="bg-white/20"
                icon={<Code className="text-white/60" size={20} />}
              />
              <ComparisonRow 
                label="cURL" 
                value={percentages.curl} 
                color="bg-white/10"
                icon={<FileText className="text-white/40" size={20} />}
              />
            </div>
          </motion.div>

          {/* Card 2: Speed (Neon Accents) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative bg-white/[0.03] backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-3xl overflow-hidden flex flex-col hover:border-orange-500/30 transition-colors duration-500"
          >
            <div className="p-8 pb-10">
              <div className="flex items-center gap-3 text-orange-500 mb-4 font-semibold tracking-wide">
                <Zap className="w-5 h-5 fill-orange-500/20" />
                <span className="text-xs uppercase tracking-widest">Ultra-Low Latency</span>
              </div>
              <h3 className="text-3xl font-bold leading-[1.1] mb-4">
                Blazingly 
                <span className="text-white/40 font-medium"> Fast.</span>
              </h3>
              <p className="text-base text-white/50 leading-relaxed font-light max-w-sm">
                Dynamic re-ranking infrastructure optimized for millisecond-scale extraction.
              </p>
            </div>

            <div className="mt-auto border-t border-white/5 bg-black/40 relative min-h-[320px] overflow-hidden">
              <div className="p-8">
                 <table className="w-full text-left text-sm border-separate border-spacing-y-3">
                   <thead>
                     <tr className="text-white/30 font-medium border-b border-white/5">
                       <th className="pb-4 px-3 font-normal uppercase tracking-widest text-[10px]">Endpoint</th>
                       <th className="pb-4 font-normal uppercase tracking-widest text-[10px]">Crawl</th>
                       <th className="pb-4 font-normal uppercase tracking-widest text-[10px]">Scrape</th>
                     </tr>
                   </thead>
                   <tbody className="relative">
                     <AnimatePresence mode="popLayout">
                       {tableData.map((row) => (
                         <motion.tr 
                           key={row.id}
                           layout
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           transition={{ type: "spring", stiffness: 400, damping: 40 }}
                           className={`group bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-xl overflow-hidden ${row.highlighted ? 'bg-orange-500/5 ring-1 ring-orange-500/20' : ''}`}
                         >
                           <td className="py-4 px-3 font-medium rounded-l-xl">
                             <div className="flex flex-col">
                               <span className="text-[10px] text-white/20">scraping.dev</span>
                               <span className="text-sm text-white/80">{row.url}</span>
                             </div>
                           </td>
                           <td className={`py-4 transition-colors duration-500 font-mono ${row.crawl < 500 ? 'text-orange-400 font-bold' : 'text-white/30'}`}>
                             {row.crawl}ms
                           </td>
                           <td className={`py-4 rounded-r-xl transition-colors duration-500 font-mono ${row.scrape < 500 ? 'text-amber-400 font-bold' : 'text-white/30'}`}>
                             {row.scrape}ms
                           </td>
                         </motion.tr>
                       ))}
                     </AnimatePresence>
                   </tbody>
                 </table>
              </div>

              {/* Bottom Visual Element */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black via-black/90 to-transparent pointer-events-none flex items-end justify-center pb-10">
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: ["0 0 20px rgba(249, 115, 22, 0.2)", "0 0 40px rgba(249, 115, 22, 0.4)", "0 0 20px rgba(249, 115, 22, 0.2)"]
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-orange-500 shadow-orange-500/50 rounded-full p-4 border border-white/20 z-10"
                  >
                    <Zap className="text-white fill-white" size={32} />
                  </motion.div>
                  <div className="absolute bottom-0 w-full px-6 flex justify-between items-end gap-1.5 h-16 opacity-20 pointer-events-none">
                     {[...Array(30)].map((_, i) => (
                       <motion.div 
                          key={i} 
                          animate={{ height: [`${20 + Math.random() * 80}%`, `${20 + Math.random() * 80}%`] }}
                          transition={{ repeat: Infinity, duration: 1, repeatType: 'mirror', delay: i * 0.05 }}
                          className="bg-orange-500 w-full rounded-t-lg" 
                        />
                     ))}
                  </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function ComparisonRow({ label, value, color, icon, isPrimary = false }) {
  return (
    <div className="flex items-center gap-5 group/row">
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white/[0.03] border ${isPrimary ? 'border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.15)] bg-orange-500/5' : 'border-white/10'} group-hover/row:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <div className="flex-1 space-y-1.5">
        <div className="flex justify-between items-center text-xs font-bold uppercase tracking-[0.2em]">
          <span className={isPrimary ? "text-white" : "text-white/40"}>{label}</span>
          <motion.span 
            key={value}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={isPrimary ? "text-orange-400" : "text-white/20"}
          >
            {value}%
          </motion.span>
        </div>
        <div className="relative w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <motion.div 
            animate={{ width: `${value}%` }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
            className={`h-full relative ${color} rounded-full`}
          >
            {isPrimary && (
              <div className="absolute top-0 right-0 w-4 h-full bg-white/40 blur-sm" />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}