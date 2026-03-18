'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Settings, 
  Shield, 
  Zap, 
  Search,
  Github,
  Twitter,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Code,
  Bot,
  Sparkles,
  BrainCircuit
} from 'lucide-react';

/**
 * Animation Variants
 */
const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20, staggerChildren: 0.1 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 }
};

const dropdownVariants = {
  hidden: { 
    opacity: 0, 
    y: 15,
    scale: 0.95,
    transition: { duration: 0.2 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      type: 'spring', 
      stiffness: 300, 
      damping: 20 
    }
  }
};

const mobileMenuVariants = {
  closed: { x: '100%', transition: { type: 'spring', stiffness: 400, damping: 40 } },
  opened: { x: 0, transition: { type: 'spring', stiffness: 400, damping: 40 } }
};

/**
 * Navbar Component
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'AI Tools', hasDropdown: true },
    { name: 'Tools', hasDropdown: true },
    { name: 'About', hasDropdown: false },
    { name: 'Contact', hasDropdown: false },
    { name: 'Resources', hasDropdown: false },
  ];

  const aiTools = [
    { name: 'AI Article Writer', desc: 'Generate high-quality blog posts', icon: <FileText size={18} /> },
    { name: 'Code Assistant', desc: 'AI-powered pair programming', icon: <Code size={18} /> },
    { name: 'Image Generator', desc: 'Turn text into stunning art', icon: <ImageIcon size={18} /> },
    { name: 'Smart Summarizer', desc: 'Condense long documents', icon: <Bot size={18} /> },
    { name: 'Data Insights', desc: 'Extract insights from data', icon: <BrainCircuit size={18} /> },
  ];

  const toolsMenu = [
    {
      category: 'Document Tools',
      items: [
        { name: 'PDF Converter', desc: 'Convert files to PDF', icon: <FileText size={18} /> },
        { name: 'PDF Merger', desc: 'Combine multiple PDFs', icon: <FileText size={18} /> },
        { name: 'Word to PDF', desc: 'Convert Word docs', icon: <FileText size={18} /> },
      ]
    },
    {
      category: 'Image Tools',
      items: [
        { name: 'Image Compressor', desc: 'Reduce file size', icon: <ImageIcon size={18} /> },
        { name: 'Format Converter', desc: 'PNG, JPG, WebP', icon: <ImageIcon size={18} /> },
        { name: 'Background Remover', desc: 'AI background removal', icon: <ImageIcon size={18} /> },
      ]
    },
    {
      category: 'Developer Tools',
      items: [
        { name: 'JSON Formatter', desc: 'Beautify & validate', icon: <Code size={18} /> },
        { name: 'Regex Tester', desc: 'Test regular expressions', icon: <Code size={18} /> },
        { name: 'API Tester', desc: 'Test REST & GraphQL', icon: <Zap size={18} /> },
      ]
    }
  ];

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-6 py-4 ${
          isScrolled ? 'mt-2' : 'mt-0'
        }`}
      >
        <div className={`relative w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
          isScrolled 
            ? 'bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl' 
            : 'bg-transparent'
        }`}>
          {/* Logo */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
              <Zap className="fill-white" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Scraping
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className={link.name === 'Tools' ? 'static' : 'relative'}
                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <motion.button
                  variants={itemVariants}
                  className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                </motion.button>

                <AnimatePresence>
                  {link.hasDropdown && activeDropdown === link.name && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className={`absolute top-full mt-4 bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl z-50 overflow-hidden ${
                        link.name === 'Tools' ? 'left-0 w-full' : link.name === 'AI Tools' ? 'left-0 w-80' : 'left-0 w-64'
                      }`}
                    >
                      {link.name === 'Tools' ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {toolsMenu.map((category) => (
                            <div key={category.category} className="flex flex-col gap-3">
                              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                                {category.category}
                              </h3>
                              <div className="flex flex-col gap-2">
                                {category.items.map((tool) => (
                                  <button key={tool.name} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group">
                                    <div className="mt-1 text-orange-400 group-hover:text-orange-300 transition-colors p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20">
                                      {tool.icon}
                                    </div>
                                    <div>
                                      <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{tool.name}</div>
                                      <div className="text-xs text-slate-400 mt-0.5">{tool.desc}</div>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : link.name === 'AI Tools' ? (
                        <div className="flex flex-col gap-2">
                          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
                            Featured AI Tools
                          </h3>
                          {aiTools.map((tool) => (
                            <button key={tool.name} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors text-left group">
                              <div className="mt-1 text-orange-400 group-hover:text-orange-300 transition-colors p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20">
                                {tool.icon}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{tool.name}</div>
                                <div className="text-xs text-slate-400 mt-0.5">{tool.desc}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <div className="p-4 text-sm text-slate-400">Content for {link.name}</div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Actions */}
          <motion.div variants={itemVariants} className="hidden md:flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-white transition-colors">
              <Search size={20} />
            </button>
            <button className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 rounded-xl text-sm font-bold text-white transition-all shadow-lg shadow-orange-500/20 active:scale-95">
              Get Started
            </button>
          </motion.div>

          {/* Mobile Button */}
          <motion.button 
            variants={itemVariants}
            className="md:hidden p-2 text-slate-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial="closed"
              animate="opened"
              exit="closed"
              variants={mobileMenuVariants}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-slate-950 z-[70] p-8 md:hidden shadow-2xl border-l border-white/5 flex flex-col"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-xl font-bold text-white">NEXUS</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-white/5 rounded-lg text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <button key={link.name} className="text-3xl font-medium text-slate-300 hover:text-orange-400 transition-colors text-left flex justify-between items-center">
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={24} />}
                  </button>
                ))}
              </div>

              <div className="mt-auto">
                <button className="w-full py-4 bg-orange-600 rounded-xl font-bold text-white mb-6">
                  Launch App
                </button>
                <div className="flex gap-6 justify-center text-slate-500">
                  <Github className="hover:text-white cursor-pointer" />
                  <Twitter className="hover:text-white cursor-pointer" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

// /**
//  * Main Page / Layout Component
//  */
// export default function App() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white selection:bg-orange-500/30">
//       <Navbar />
//     </div>
//   );
// }