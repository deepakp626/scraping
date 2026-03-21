// finale hero section with combination
"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Database, 
  ArrowRight, 
  Activity, 
  Globe, 
  Code, 
  Cpu,
  Wifi
} from 'lucide-react';

const terminalLines = [
  { text: "Initializing ScrapeFlow v2.0...", type: "system" },
  { text: "Auth: Session verified", type: "system" },
  { text: "Proxy: US-RESIDENTIAL-7721", type: "system" },
  { text: "GET https://target-api.com/v1/data", type: "request" },
  { text: "✔ 200 OK | Payload: 1.2MB", type: "success" },
  { text: "AI-Parser: Extracting Schema...", type: "process" },
  { text: '{ "id": "XY-09", "val": 492.50 }', type: "data" },
  { text: "Syncing to Cloud Cluster...", type: "success" },
  { text: "Process optimized: +12% speed", type: "system" },
];

const HeroSection = () => {
  const [activeLines, setActiveLines] = useState<{text: string; type: string}[]>([]);
  const [lineIndex, setLineIndex] = useState(0);

  // Terminal logic for the small overlay
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (lineIndex < terminalLines.length) {
        setActiveLines((prev) => [...prev.slice(-4), terminalLines[lineIndex]]);
        setLineIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setActiveLines([]);
          setLineIndex(0);
        }, 2000);
      }
    }, 1200);
    return () => clearTimeout(timeout);
  }, [lineIndex]);

  return (
    <>
    <div className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-slate-950 text-slate-200">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-semibold w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Scraping Engine v2.0 Live
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
              Extract Data <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">
                Without Limits.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium">
              Transform any website into structured data instantly. Our resilient infrastructure handles proxies, captchas, and dynamic content automatically.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="px-8 py-4 bg-orange-600 hover:bg-orange-500 rounded-2xl text-white font-bold transition-all shadow-lg shadow-orange-500/25 active:scale-95 flex items-center justify-center gap-2">
                Start Extracting Free <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 bg-slate-900 border border-white/10 hover:bg-slate-800 rounded-2xl text-slate-300 font-bold transition-colors flex items-center justify-center gap-2">
                <Terminal size={20} /> View Docs
              </button>
            </div>
          </motion.div>

          {/* Right Side: Circle Animation Integration */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center w-full"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              
              {/* Backglow for the graphic */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-amber-500/10 blur-3xl rounded-full" />

              {/* Main Animated SVG background lines */}
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full relative z-10 drop-shadow-2xl"
                fill="none"
              >
                {/* Connecting Lines */}
                <motion.path
                  d="M100 200 L200 200 L300 200"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                  d="M200 100 L200 300"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                />

                {/* Orbital Rings */}
                <motion.circle
                  cx="200" cy="200" r="120"
                  stroke="rgba(255,255,255,0.05)" strokeWidth="1"
                />
                <motion.circle
                  cx="200" cy="200" r="160"
                  stroke="rgba(255,165,0,0.1)" strokeWidth="1" strokeDasharray="10 10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: '200px 200px' }}
                />

                {/* Floating Data Packets */}
                <motion.circle
                  cx="100" cy="200" r="4" fill="#fbbf24"
                  animate={{ cx: [100, 200], cy: [200, 200], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                  cx="200" cy="100" r="4" fill="#f97316"
                  animate={{ cx: [200, 200], cy: [100, 200], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                />
                <motion.circle
                  cx="200" cy="200" r="4" fill="#f97316"
                  animate={{ cx: [200, 300], cy: [200, 200], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.7 }}
                />
                <motion.circle
                  cx="200" cy="300" r="4" fill="#f97316"
                  animate={{ cx: [200, 200], cy: [300, 200], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: 0.2 }}
                />
              </svg>

              {/* HTML Nodes overlayed on top of SVG */}
              <div className="absolute inset-0 z-20 pointer-events-none">

                {/* Target Site Node - Left */}
                <motion.div
                  className="absolute left-[25%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-900 border-2 border-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20"
                  animate={{ x: "-50%", y: ["-50%", "-55%", "-50%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Globe className="text-amber-400" size={24} />
                </motion.div>

                {/* API Node - Top */}
                <motion.div
                  className="absolute left-[50%] top-[25%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-900 border-2 border-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20"
                  animate={{ x: "-50%", y: ["-50%", "-45%", "-50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Database className="text-orange-500" size={24} />
                </motion.div>

                {/* Processing Node - Bottom */}
                <motion.div
                  className="absolute left-[50%] top-[75%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-900 border-2 border-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20"
                  animate={{ x: "-50%", y: ["-50%", "-55%", "-50%"] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <Activity className="text-orange-500" size={24} />
                </motion.div>

                {/* Code Delivery Node - Right */}
                <motion.div
                  className="absolute left-[75%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-900 border-2 border-amber-400 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20"
                  animate={{ x: "-50%", y: ["-50%", "-45%", "-50%"] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  <Code className="text-amber-400" size={24} />
                </motion.div>

                {/* Center Core */}
                <motion.div
                  className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl shadow-orange-500/50"
                  animate={{ x: "-50%", y: "-50%", scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Terminal className="text-white" size={36} />
                </motion.div>

              </div>

              {/* ROBUST INTEGRATED TERMINAL (Bottom Right Overlay with Floating Animation) */}
              <motion.div 
                className="absolute bottom-[5%] right-[-12%] z-40 w-64 hidden md:block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -4.8, 0], // 0.3rem ≈ 4.8px
                }}
                transition={{ 
                  opacity: { delay: 1, duration: 0.5 },
                  y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                }}
              >
                <div className="bg-[#0a0a0c]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden font-mono text-[10px]">
                  {/* Robust Terminal Header */}
                  <div className="bg-[#121216] px-3 py-2.5 flex items-center justify-between border-b border-white/5">
                    <div className="flex gap-1.5 items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/40 border border-red-500/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40 border border-amber-500/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40 border border-emerald-500/20" />
                    </div>
                    <div className="flex items-center gap-1.5 opacity-60">
                      <Wifi size={10} className="text-orange-400" />
                      <span className="text-[8px] text-slate-400 font-bold uppercase tracking-[0.15em]">Console.sh</span>
                    </div>
                  </div>
                  
                  {/* Processing Sub-Header */}
                  <div className="px-3 py-1 bg-orange-500/5 flex items-center gap-2 border-b border-white/5">
                    <Cpu size={10} className="text-orange-500 animate-pulse" />
                    <span className="text-[8px] text-orange-300/70 font-medium">Core-Thread: #0921-Active</span>
                  </div>

                  {/* Terminal Content */}
                  <div className="p-4 h-36 overflow-hidden flex flex-col justify-end bg-gradient-to-b from-transparent to-orange-500/[0.02]">
                    <AnimatePresence mode="popLayout">
                      {activeLines.map((line, idx) => (
                        <motion.div 
                          key={`${line.text}-${idx}`}
                          initial={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-start gap-2 mb-1.5 last:mb-0"
                        >
                          <span className="text-orange-500/50 shrink-0 select-none">{">"}</span>
                          <span className={`leading-tight ${
                            line.type === 'success' ? 'text-emerald-400' : 
                            line.type === 'data' ? 'text-amber-300 italic' : 
                            line.type === 'request' ? 'text-sky-400' :
                            'text-slate-400'
                          }`}>
                            {line.text}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  {/* Terminal Footer Bar */}
                  <div className="px-3 py-1.5 bg-[#0a0a0c] flex items-center justify-between text-[8px] border-t border-white/5">
                    <span className="text-slate-600 font-bold uppercase">Node-Cluster-US</span>
                    <span className="text-emerald-500/70">8.2ms latency</span>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Tech Elements */}
              <div className="absolute top-[15%] right-0 hidden md:flex items-center gap-2 bg-slate-900 border border-white/10 px-4 py-2 rounded-xl text-xs font-mono text-orange-400 shadow-xl backdrop-blur-md z-30">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Scraper Connected
              </div>
              <div className="absolute bottom-[15%] left-0 hidden md:flex items-center gap-2 bg-slate-900 border border-white/10 px-4 py-2 rounded-xl text-xs font-mono text-slate-300 shadow-xl backdrop-blur-md z-30">
                <Activity size={14} className="text-orange-500" />
                Parsing JSON
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
   </>
  );
};

export default HeroSection;