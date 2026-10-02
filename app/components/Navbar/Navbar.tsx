'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ToolsMegaMenu } from './ToolsMegaMenu';
import { DatasetsMegaMenu } from './DatasetsMegaMenu';
import { ServicesMegaMenu } from './ServicesMegaMenu';
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
  BrainCircuit,
  ShoppingBag,
  Users,
  Home,
  BarChart3,
  Database
} from 'lucide-react';

/**
 * Animation Variants
 */
const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20, staggerChildren: 0.1 }
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
      type: 'spring' as const,
      stiffness: 300,
      damping: 20
    }
  }
};

const mobileMenuVariants = {
  closed: { x: '100%', transition: { type: 'spring' as const, stiffness: 400, damping: 40 } },
  opened: { x: 0, transition: { type: 'spring' as const, stiffness: 400, damping: 40 } }
};

/**
 * Navbar Component
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    // { name: 'AI Tools', hasDropdown: true },
    { name: 'Tools', hasDropdown: true },
    { name: 'Datasets', hasDropdown: true },
    { name: 'Services', hasDropdown: true },
    { name: 'About', hasDropdown: false },
    { name: 'Resources', hasDropdown: true },
  ];

  const datasetsMenu = [
    {
      category: 'E-commerce',
      items: [
        { name: 'Amazon Products', desc: 'Global product & pricing data', icon: <ShoppingBag size={18} /> },
        { name: 'eBay Sold Items', desc: 'Market trend analysis', icon: <ShoppingBag size={18} /> },
        { name: 'Walmart Listings', desc: 'Retail inventory data', icon: <ShoppingBag size={18} /> },
      ]
    },
    {
      category: 'Social Media',
      items: [
        { name: 'Instagram Profiles', desc: 'Influencer & post metrics', icon: <Users size={18} /> },
        { name: 'Twitter Trends', desc: 'Real-time hashtag tracking', icon: <Twitter size={18} /> },
        { name: 'LinkedIn Jobs', desc: 'Career market insights', icon: <Users size={18} /> },
      ]
    },
    {
      category: 'Real Estate',
      items: [
        { name: 'Zillow Property', desc: 'Housing market valuations', icon: <Home size={18} /> },
        { name: 'Airbnb Reviews', desc: 'Short-term rental metrics', icon: <Home size={18} /> },
        { name: 'Realtor Listings', desc: 'Commercial & residential', icon: <Home size={18} /> },
      ]
    },
    {
      category: 'Finance',
      items: [
        { name: 'Crypto Prices', desc: 'Live exchange rates', icon: <BarChart3 size={18} /> },
        { name: 'Stock Markets', desc: 'Historical equity data', icon: <BarChart3 size={18} /> },
        { name: 'Company Reports', desc: 'SEC filings & data', icon: <Database size={18} /> },
      ]
    }
  ];

  const aiTools = [
    { name: 'AI Article Writer', desc: 'Generate high-quality blog posts', icon: <FileText size={18} /> },
    { name: 'Code Assistant', desc: 'AI-powered pair programming', icon: <Code size={18} /> },
    { name: 'Image Generator', desc: 'Turn text into stunning art', icon: <ImageIcon size={18} /> },
    { name: 'Smart Summarizer', desc: 'Condense long documents', icon: <Bot size={18} /> },
    { name: 'Data Insights', desc: 'Extract insights from data', icon: <BrainCircuit size={18} /> },
  ];

  const resourcesMenu = [
    { name: 'Blog', href: '/blog', desc: 'Read our latest insights and tutorials', icon: <FileText size={18} /> },
    // { name: 'Case Studies', href: '/case-studies', desc: 'See how we helped other businesses', icon: <BarChart3 size={18} /> },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-6 py-4 ${isScrolled ? 'mt-2' : 'mt-0'
          }`}
      >
        <div className={`relative w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${isScrolled
          ? 'bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl'
          : 'border-1 border-white/10 bg-secondary-theme'
          }`}>
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="group cursor-pointer"
          >
            <Link href="/" className='flex items-center gap-2'>
              <div className="flex justify-center items-center bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg rounded-xl w-10 h-10 group-hover:rotate-12 transition-transform">
                <Zap className="fill-white" size={20} />
              </div>
              <span className="font-bold text-white text-xl tracking-tight">
                Scraping
              </span>
            </Link>
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
                  className="flex items-center gap-1 py-2 font-medium text-slate-300 hover:text-white text-base transition-colors"
                >
                  <Link href="/about">{link.name}</Link>
                  {link.hasDropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                </motion.button>

                {/* Dropdown Bridge to prevent flickering */}
                {link.hasDropdown && activeDropdown === link.name && (
                  <div className="top-full right-0 left-0 z-[40] absolute h-4" />
                )}

                <AnimatePresence>
                  {link.hasDropdown && activeDropdown === link.name && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className={`absolute top-full mt-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl z-50 overflow-hidden ${link.name === 'Tools' || link.name === 'Datasets' || link.name === 'Services'
                          ? 'left-1/2 -translate-x-1/2 w-auto'
                          : link.name === 'AI Tools' || link.name === 'Resources'
                            ? 'left-0 w-96'
                            : 'left-0 w-64'
                        }`}
                    >
                      {link.name === 'Tools' ? (
                        <ToolsMegaMenu />
                      ) : link.name === 'AI Tools' ? (
                        <div className="flex flex-col gap-2">
                          <h3 className="mb-2 font-bold text-slate-500 text-xs uppercase tracking-wider">
                            Featured AI Tools
                          </h3>
                          {aiTools.map((tool) => (
                            <button key={tool.name} className="group flex items-start gap-4 hover:bg-slate-50 p-3 rounded-xl text-left transition-colors">
                              <div className="bg-orange-50 group-hover:bg-orange-100 mt-1 p-2 rounded-lg text-orange-600 group-hover:text-orange-700 transition-colors">
                                {tool.icon}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-800 group-hover:text-orange-600 text-base transition-colors">{tool.name}</div>
                                <div className="mt-0.5 text-slate-500 text-xs">{tool.desc}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : link.name === 'Datasets' ? (
                        <DatasetsMegaMenu />
                      ) : link.name === 'Services' ? (
                        <ServicesMegaMenu />
                      ) : link.name === 'Resources' ? (
                        <div className="flex flex-col gap-2">
                          <h3 className="mb-2 font-bold text-slate-500 text-xs uppercase tracking-wider">
                            Knowledge Center
                          </h3>
                          {resourcesMenu.map((item) => (
                            <Link href={item.href} key={item.name} className="group flex items-start gap-4 hover:bg-slate-50 p-3 rounded-xl text-left transition-colors">
                              <div className="bg-orange-50 group-hover:bg-orange-100 mt-1 p-2 rounded-lg text-orange-600 group-hover:text-orange-700 transition-colors">
                                {item.icon}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-800 group-hover:text-orange-600 text-base transition-colors">{item.name}</div>
                                <div className="mt-0.5 text-slate-500 text-xs">{item.desc}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <div className="p-4 text-slate-600 text-base">Content for {link.name}</div>
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
            <Link href="/contact" className="bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-500/20 px-5 py-2.5 rounded-xl font-bold text-white text-sm active:scale-95 transition-all">
              Contact
            </Link>
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
              className="md:hidden z-[60] fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial="closed"
              animate="opened"
              exit="closed"
              variants={mobileMenuVariants}
              className="md:hidden top-0 right-0 bottom-0 z-[70] fixed flex flex-col bg-slate-950 shadow-2xl p-8 border-white/5 border-l w-[85%] max-w-sm"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-bold text-white text-xl">NEXUS</span>
                <button onClick={() => setMobileMenuOpen(false)} className="hover:bg-white/5 p-2 rounded-lg text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <button key={link.name} className="flex justify-between items-center font-medium text-slate-300 hover:text-orange-400 text-3xl text-left transition-colors">
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={24} />}
                  </button>
                ))}
              </div>

              <div className="mt-auto">
                <button className="bg-orange-600 mb-6 py-4 rounded-xl w-full font-bold text-white">
                  Launch App
                </button>
                <div className="flex justify-center gap-6 text-slate-500">
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
//     <div className="bg-slate-950 selection:bg-orange-500/30 min-h-screen text-white">
//       <Navbar />
//     </div>
//   );
// }