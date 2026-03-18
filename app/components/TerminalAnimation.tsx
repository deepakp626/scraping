'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronRight, Database } from 'lucide-react';

const terminalLines = [
  { text: "Initializing ScrapeFlow Engine v4.0.2...", type: "system" },
  { text: "Establishing secure proxy tunnel [US-RESIDENTIAL]...", type: "system" },
  { text: "GET https://target-ecommerce.com/p/iphone-15-pro", type: "request" },
  { text: "✔ 200 OK | Latency: 42ms | IP: 192.144.2.11", type: "success" },
  { text: "Running AI-Parser: Identifying price, stock, and variations...", type: "process" },
  { text: "Extraction complete. Mapping to Schema...", type: "process" },
  { text: "{ \"name\": \"iPhone 15 Pro\", \"price\": 999.00, \"currency\": \"USD\" }", type: "data" },
  { text: "Data successfully synced to PostgreSQL.", type: "success" },
  { text: "Cooldown: 150ms to prevent rate detection.", type: "wait" },
];

const TerminalAnimation = () => {
  const [activeLines, setActiveLines] = useState<{text: string; type: string}[]>([]);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;
    const interval = setInterval(() => {
      if (currentIndex < terminalLines.length) {
        setActiveLines(prev => [...prev, terminalLines[currentIndex]]);
        currentIndex++;
      } else if (currentIndex === terminalLines.length) {
        currentIndex++; // Prevent timeout from setting multiple times
        timeoutId = setTimeout(() => {
          setActiveLines([]);
          currentIndex = 0;
        }, 3000);
      }
    }, 800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-lg mx-auto"
    >
      <div className="relative bg-[#0d0d0f] border border-white/10 rounded-xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden">
        <div className="bg-[#16161a] px-5 py-4 flex items-center justify-between border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20" />
            <div className="w-3 h-3 rounded-full bg-amber-500/20" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
            <Globe size={14} className="text-purple-500" /> Instance: US-EAST-1
          </div>
          <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-tighter">
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-500" 
            />
            Connected
          </div>
        </div>

        <div className="p-8 font-mono text-[13px] leading-relaxed min-h-[440px] max-h-[440px] overflow-y-auto custom-scrollbar bg-[#0d0d0f]">
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {activeLines.map((line, idx) => line && (
                <motion.div 
                  key={idx} // Using index is fine here since the list only grows or resets
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-1">
                    {line.type === 'request' ? (
                      <ChevronRight size={14} className="text-blue-500" />
                    ) : line.type === 'data' ? (
                      <Database size={14} className="text-amber-500" />
                    ) : (
                      <div className={`w-1 h-3 rounded-full ${
                        line.type === 'success' ? 'bg-emerald-500' : 
                        line.type === 'system' ? 'bg-slate-600' : 'bg-purple-500'
                      }`} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <span className={`
                      ${line.type === 'request' ? 'text-blue-400 font-bold' : ''}
                      ${line.type === 'success' ? 'text-emerald-400' : ''}
                      ${line.type === 'process' ? 'text-slate-300' : ''}
                      ${line.type === 'data' ? 'text-amber-200 bg-amber-500/5 py-1 px-2 rounded border border-amber-500/10 block mt-2' : ''}
                      ${line.type === 'wait' ? 'text-slate-500 italic' : ''}
                      ${line.type === 'system' ? 'text-slate-500' : ''}
                    `}>
                      {line.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <motion.div 
              className="flex items-center gap-4"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <ChevronRight size={14} className="text-purple-500" />
              <div className="w-2 h-5 bg-purple-500" />
            </motion.div>
          </div>
        </div>

        <div className="bg-[#16161a] px-6 py-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          <div className="flex gap-4 text-slate-600">
            <span>RAM: 1.2GB / 4GB</span>
            <span>CPU: 12%</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500/50" /> UTF-8
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalAnimation;
