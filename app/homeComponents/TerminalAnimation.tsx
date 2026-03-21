'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, Database, ChevronRight, FileJson, FileText, CheckCircle2 } from 'lucide-react';

const pythonScript = [
  "import scraping_hub as sh",
  "",
  "def extract_data(url):",
  "  engine = sh.init_engine()",
  "  engine.set_proxy('US-RES')",
  "  ",
  "  # Start Extraction",
  "  data = engine.scrape(url)",
  "  ",
  "  # Store Results",
  "  sh.save_csv(data, 'output.csv')",
  "  return data",
  "",
  "extract_data('ecommerce.com')"
];

const terminalLines = [
  { text: "> python main.py", type: "cmd" },
  { text: "Initializing ScrapeFlow Engine...", type: "system" },
  { text: "Establishing secure proxy [US-RES]...", type: "system" },
  { text: "GET https://ecommerce.com/p/iphone-15", type: "request" },
  { text: "✔ 200 OK | Latency: 45ms", type: "success" },
  { text: "Running AI-Parser...", type: "process" },
  { text: "Mapping to CSV Schema...", type: "process" },
  { text: "Data saved to output.csv", type: "success" },
];

const csvData = [
  ["ID", "Name", "Price", "Stock"],
  ["101", "iPhone 15 Pro", "$999", "In Stock"],
  ["102", "Pixel 8 Pro", "$899", "Out of Stock"],
  ["103", "Galaxy S23", "$799", "In Stock"],
];

const TerminalAnimation = () => {
  const [step, setStep] = useState(0); // 0: script, 1: terminal, 2: csv
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [activeTerminalLines, setActiveTerminalLines] = useState<typeof terminalLines>([]);
  const [showCsv, setShowCsv] = useState(false);

  // Connection line states
  const [line1Active, setLine1Active] = useState(false);
  const [line2Active, setLine2Active] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Step 0: Type code
    if (step === 0) {
      setLine1Active(false);
      setLine2Active(false);
      let lineIdx = 0;
      const typeInterval = setInterval(() => {
        if (lineIdx < pythonScript.length) {
          setTypedLines(prev => [...prev, pythonScript[lineIdx]]);
          lineIdx++;
        } else {
          clearInterval(typeInterval);
          setLine1Active(true); // Activate first line after script completes
          timer = setTimeout(() => setStep(1), 800);
        }
      }, 100);
      return () => clearInterval(typeInterval);
    }

    // Step 1: Run terminal
    if (step === 1) {
      let lineIdx = 0;
      const termInterval = setInterval(() => {
        if (lineIdx < terminalLines.length) {
          setActiveTerminalLines(prev => [...prev, terminalLines[lineIdx]]);
          lineIdx++;
        } else {
          clearInterval(termInterval);
          setLine2Active(true); // Activate second line after terminal completes
          timer = setTimeout(() => setStep(2), 800);
        }
      }, 500);
      return () => clearInterval(termInterval);
    }

    // Step 2: Show CSV
    if (step === 2) {
      setShowCsv(true);
      timer = setTimeout(() => {
        // Reset animation
        setStep(0);
        setTypedLines([]);
        setActiveTerminalLines([]);
        setShowCsv(false);
        setLine1Active(false);
        setLine2Active(false);
      }, 6000);
    }

    return () => clearTimeout(timer);
  }, [step]);

  // Helper component for connectivity lines
  const Connector = ({ active, vertical = false }: { active: boolean; vertical?: boolean }) => (
    <div className={`relative flex items-center justify-center ${vertical ? 'h-12 w-full my-2' : 'h-full w-12 mx-2'} hidden lg:flex`}>
      <div className={`absolute ${vertical ? 'w-px h-full' : 'h-px w-full'} bg-white/10`} />
      <motion.div 
        initial={false}
        animate={{ 
          scale: active ? 1 : 0.5,
          opacity: active ? 1 : 0,
          backgroundColor: active ? '#f97316' : '#64748b'
        }}
        className={`z-10 w-2 h-2 rounded-full ${active ? 'shadow-[0_0_10px_rgba(249,115,22,0.8)]' : ''}`}
      />
      <motion.div 
        initial={false}
        animate={{ 
          width: active ? (vertical ? '1px' : '100%') : '0%',
          height: active ? (vertical ? '100%' : '1px') : '0%',
          opacity: active ? 1 : 0
        }}
        className="absolute bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]"
      />
    </div>
  );

  return (
    <section className="py-24 px-4 bg-[#050505] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest mb-4"
          >
            How it works
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            From Script to <span className="text-orange-500">Insights</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our automated engine handles everything from code initialization to final data storage,
            giving you a clean dataset without the manual effort.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Pane 1: Python Script */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:flex-1 flex flex-col bg-slate-900/30 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            <div className="bg-slate-800/40 px-6 py-4 border-b border-white/5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
              </div>
              <div className="h-4 w-px bg-white/10 mx-2" />
              <Code size={16} className="text-blue-400" />
              <span className="text-xs font-mono text-slate-400 font-medium">extract.py</span>
            </div>
            <div className="p-8 font-mono text-[11px] min-h-[360px] max-h-[360px] overflow-y-auto text-slate-300 bg-black/20 custom-scrollbar">
              {typedLines.map((line, i) => line && (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -5 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="whitespace-pre flex items-start gap-4 mb-1"
                >
                  <span className="text-slate-600 select-none w-4 text-right">{i + 1}</span>
                  <span className={`
                    ${line.startsWith('#') ? 'text-slate-500 italic' : ''}
                    ${line.includes('def') || line.includes('import') || line.includes('return') ? 'text-orange-400' : ''}
                    ${line.includes('sh.') || line.includes('engine.') ? 'text-blue-300' : ''}
                    ${line.includes("'") ? 'text-emerald-300' : ''}
                    ${!line.startsWith('#') && !line.includes('def') && !line.includes('import') && !line.includes("'") ? 'text-slate-300' : ''}
                  `}>
                    {line}
                  </span>
                </motion.div>
              ))}
              {step === 0 && <span className="inline-block w-2.5 h-4 bg-orange-500 ml-1 animate-pulse align-middle" />}
            </div>
          </motion.div>

          {/* Connector 1 */}
          <Connector active={line1Active} />
          {/* Mobile Connector */}
          <div className="lg:hidden">
            <motion.div 
               animate={{ opacity: line1Active ? 1 : 0.3, scale: line1Active ? 1.2 : 1 }}
               className="p-2"
            >
               <ChevronRight className="rotate-90 text-orange-500" />
            </motion.div>
          </div>

          {/* Pane 2: Terminal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full lg:flex-1 flex flex-col bg-[#08080a] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.1)]"
          >
            <div className="bg-[#121215] px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal size={16} className="text-orange-500" />
                <span className="text-xs font-mono text-slate-400 font-medium tracking-wide">bash</span>
              </div>
              {step === 1 && (
                <div className="flex items-center gap-2 bg-orange-500/10 px-3 py-1 rounded-full text-[9px] text-orange-500 font-black uppercase tracking-widest border border-orange-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                  Active
                </div>
              )}
            </div>
            <div className="p-8 font-mono text-[10px] leading-relaxed min-h-[360px] max-h-[360px] bg-black/40 overflow-y-auto custom-scrollbar">
              {activeTerminalLines.map((line, i) => line && (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -5 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-3 flex items-start gap-4"
                >
                  <div className="mt-1">
                    {line.type === 'cmd' ? (
                       <ChevronRight size={14} className="text-orange-500" />
                    ) : line.type === 'success' ? (
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    ) : (
                       <div className="w-1.5 h-3 bg-slate-700/50 rounded-full" />
                    )}
                  </div>
                  <span className={`
                    ${line.type === 'success' ? 'text-emerald-400' : ''}
                    ${line.type === 'request' ? 'text-blue-300' : ''}
                    ${line.type === 'system' ? 'text-slate-500' : ''}
                    ${line.type === 'cmd' ? 'text-white font-bold' : 'text-slate-400'}
                  `}>
                    {line.text}
                  </span>
                </motion.div>
              ))}
              {step === 1 && <div className="w-2 h-4 bg-orange-500/40 animate-pulse mt-2 ml-8" />}
            </div>
          </motion.div>

          {/* Connector 2 */}
          <Connector active={line2Active} />
          {/* Mobile Connector */}
          <div className="lg:hidden">
            <motion.div 
               animate={{ opacity: line2Active ? 1 : 0.3, scale: line2Active ? 1.2 : 1 }}
               className="p-2"
            >
               <ChevronRight className="rotate-90 text-orange-500" />
            </motion.div>
          </div>

          {/* Pane 3: CSV Store */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="w-full lg:flex-1 flex flex-col bg-slate-900/30 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            {/* ... rest of your code for Pane 3 ... */}
            <div className="bg-slate-800/40 px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Database size={16} className="text-emerald-400" />
                <span className="text-xs font-mono text-slate-400 font-medium">storage / output.csv</span>
              </div>
              {showCsv && <CheckCircle2 size={16} className="text-emerald-500" />}
            </div>
            <div className="p-0 overflow-hidden min-h-[360px] max-h-[360px] flex flex-col justify-center bg-black/20">
              <AnimatePresence>
                {showCsv ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-6"
                  >
                    <div className="overflow-hidden rounded-xl border border-white/5 bg-slate-900/40">
                      <table className="w-full text-left font-mono text-[10px] border-collapse">
                        <thead>
                          <tr className="bg-slate-800/30 text-slate-500">
                            {csvData[0].map((h, i) => (
                              <th key={i} className="py-3 px-3 font-black uppercase tracking-tighter">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {csvData.slice(1).map((row, i) => (
                            <motion.tr 
                              key={i} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.15 }}
                              className="border-t border-white/5 hover:bg-white/5 transition-colors"
                            >
                              {row.map((cell, j) => (
                                <td key={j} className={`py-3 px-3 ${j === 2 ? 'text-emerald-400 font-bold' : 'text-slate-300'}`}>{cell}</td>
                              ))}
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-8 flex items-center gap-4 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20"
                    >
                      <div className="p-3 bg-emerald-500 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <FileText size={18} className="text-white" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-white uppercase tracking-widest mb-0.5">Dataset Ready</div>
                        <p className="text-[10px] text-emerald-500/80 font-medium">Cloud sync complete | 4KB written</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-6 py-20 px-10 text-center">
                    <div className="relative">
                      <FileJson size={48} className="text-slate-800" />
                      <motion.div 
                         initial={{ rotate: 0 }}
                         animate={{ rotate: 360 }}
                         transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                         className="absolute -inset-2 border-2 border-dashed border-slate-800 rounded-full"
                      />
                    </div>
                    <div className="space-y-2">
                       <div className="text-xs font-bold text-slate-700 uppercase tracking-[0.2em]">Awaiting Data</div>
                       <p className="text-[10px] text-slate-600">Sync will begin upon code execution</p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TerminalAnimation;
