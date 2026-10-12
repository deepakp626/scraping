'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ToolsMegaMenu, toolCategories } from './ToolsMegaMenu';
import { DatasetsMegaMenu, datasetIndustries } from './DatasetsMegaMenu';
import { ServicesMegaMenu, servicesColumns } from './ServicesMegaMenu';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Zap,
  Search,
  FileText,
  Code,
  Users,
  BarChart3,
  Database,
  Briefcase,
  BookOpen,
  ArrowRight,
  Mail,
  Sparkles,
  ExternalLink,
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
    y: 12,
    scale: 0.97,
    transition: { duration: 0.18, ease: 'easeOut' as const }
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 320,
      damping: 24
    }
  }
};

const mobileMenuVariants = {
  closed: { x: '100%', transition: { type: 'spring' as const, stiffness: 350, damping: 35 } },
  opened: { x: 0, transition: { type: 'spring' as const, stiffness: 350, damping: 35 } }
};

/**
 * Navbar Component
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Mobile Accordion and Tab States
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [activeMobileToolTab, setActiveMobileToolTab] = useState<string>(toolCategories[0]?.id || 'pdf');
  const [activeMobileDatasetTab, setActiveMobileDatasetTab] = useState<string>(datasetIndustries[0]?.id || 'ecommerce');
  
  // Flattened service groups for mobile
  const allServiceGroups = servicesColumns.flat();
  const [activeMobileServiceGroup, setActiveMobileServiceGroup] = useState<string>(allServiceGroups[0]?.title || 'E-commerce & Retail');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    // { name: 'AI Tools', hasDropdown: true },
    { name: 'Tools', hasDropdown: true },
    { name: 'Datasets', hasDropdown: true },
    { name: 'Services', hasDropdown: true },
    { name: 'About', hasDropdown: false },
    { name: 'Resources', hasDropdown: true },
  ];

  const resourcesMenu = [
    {
      name: 'Blog & Articles',
      href: '/blog',
      desc: 'In-depth web scraping tutorials & technical guides',
      icon: <FileText size={18} className="text-orange-600" />
    },
    {
      name: 'Case Studies',
      href: '/blog',
      desc: 'Real-world data extraction stories and benchmarks',
      icon: <BarChart3 size={18} className="text-orange-600" />
    },
    {
      name: 'Developer Tools',
      href: '/tooles',
      desc: 'PDF, Image, JSON & Code transformation utilities',
      icon: <Code size={18} className="text-orange-600" />
    },
    {
      name: 'Dataset Catalog',
      href: '/dataset',
      desc: 'Pre-scraped industry datasets ready for download',
      icon: <Database size={18} className="text-orange-600" />
    }
  ];

  const activeMobileToolCategory = toolCategories.find((c) => c.id === activeMobileToolTab) || toolCategories[0];
  const activeMobileIndustry = datasetIndustries.find((ind) => ind.id === activeMobileDatasetTab) || datasetIndustries[0];
  const activeServiceGroupData = allServiceGroups.find((g) => g.title === activeMobileServiceGroup) || allServiceGroups[0];

  const toggleMobileSubmenu = (menuName: string) => {
    setExpandedMobileMenu((prev) => (prev === menuName ? null : menuName));
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-6 py-4 ${
          isScrolled ? 'mt-1' : 'mt-0'
        }`}
      >
        <div
          className={`relative w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
            isScrolled
              ? 'bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl'
              : 'border border-white/10 bg-secondary-theme shadow-lg'
          }`}
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="group cursor-pointer">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex justify-center items-center bg-gradient-to-br from-orange-500 to-amber-600 shadow-md shadow-orange-500/20 rounded-xl w-10 h-10 group-hover:rotate-6 transition-transform">
                <Zap className="fill-white text-white" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-xl leading-none tracking-tight">
                  Compile<span className="text-orange-400">Pilot</span>
                </span>
                <span className="mt-0.5 font-semibold text-[10px] text-orange-400 tracking-wider">
                  compilepilot.com
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isMegaMenu = link.name === 'Tools' || link.name === 'Datasets' || link.name === 'Services';
              return (
                <div
                  key={link.name}
                  className={isMegaMenu ? 'static' : 'relative'}
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {link.hasDropdown ? (
                    <button
                      type="button"
                      onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                      className={`flex items-center gap-1.5 py-2 font-medium text-sm lg:text-[15px] transition-colors cursor-pointer ${
                        activeDropdown === link.name ? 'text-white' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 text-slate-400 ${
                          activeDropdown === link.name ? 'rotate-180 text-orange-400' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href="/about"
                      className="flex items-center gap-1 py-2 font-medium text-slate-300 lg:text-[15px] hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}

                  {/* Dropdown Hover Bridge to prevent premature closing */}
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
                        className={`absolute top-full mt-3 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xl z-50 overflow-hidden ${
                          isMegaMenu
                            ? 'left-1/2 -translate-x-1/2 w-auto max-w-[calc(100vw-3rem)]'
                            : link.name === 'Resources'
                              ? 'left-0 w-96'
                              : 'left-0 w-64'
                        }`}
                      >
                        {link.name === 'Tools' ? (
                          <ToolsMegaMenu />
                        ) : link.name === 'Datasets' ? (
                          <DatasetsMegaMenu />
                        ) : link.name === 'Services' ? (
                          <ServicesMegaMenu />
                        ) : link.name === 'Resources' ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center mb-2 pb-2 border-slate-100 border-b">
                              <h3 className="font-bold text-slate-500 text-xs uppercase tracking-wider">
                                Knowledge Center
                              </h3>
                              <Link
                                href="/blog"
                                className="font-semibold text-orange-600 hover:text-orange-700 text-xs transition-colors"
                              >
                                View all →
                              </Link>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              {resourcesMenu.map((item) => (
                                <Link
                                  href={item.href}
                                  key={item.name}
                                  className="group flex items-start gap-3.5 hover:bg-orange-50/50 p-2.5 rounded-xl text-left transition-colors"
                                >
                                  <div className="bg-orange-50 group-hover:bg-orange-100 mt-0.5 p-2 rounded-lg transition-colors shrink-0">
                                    {item.icon}
                                  </div>
                                  <div>
                                    <div className="font-semibold text-slate-800 group-hover:text-orange-600 text-sm transition-colors">
                                      {item.name}
                                    </div>
                                    <div className="mt-0.5 text-slate-500 text-xs leading-normal">
                                      {item.desc}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <motion.div variants={itemVariants} className="hidden md:flex items-center gap-3">
            <Link
              href="/dataset"
              className="hover:bg-white/5 p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
              title="Search Datasets"
            >
              <Search size={19} />
            </Link>
            <Link
              href="/contact"
              className="bg-gradient-to-r from-orange-500 hover:from-orange-600 to-amber-600 hover:to-amber-700 shadow-md shadow-orange-500/20 px-5 py-2.5 rounded-xl font-semibold text-white text-sm active:scale-95 transition-all"
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Mobile Menu Hamburger Button */}
          <motion.button
            variants={itemVariants}
            className="md:hidden hover:bg-white/10 p-2 rounded-xl text-slate-300 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile navigation"
          >
            <Menu size={26} />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="md:hidden z-[60] fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial="closed"
              animate="opened"
              exit="closed"
              variants={mobileMenuVariants}
              className="md:hidden top-0 right-0 bottom-0 z-[70] fixed flex flex-col bg-white shadow-2xl border-slate-200 border-l w-full sm:w-[440px] max-w-full text-slate-900"
            >
              {/* Drawer Header */}
              <div className="top-0 z-10 sticky flex justify-between items-center bg-white px-5 py-4 border-slate-100 border-b">
                <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2.5">
                  <div className="flex justify-center items-center bg-gradient-to-br from-orange-500 to-amber-600 shadow-sm rounded-xl w-9 h-9">
                    <Zap className="fill-white text-white" size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 text-lg leading-none tracking-tight">
                      Compile<span className="text-orange-600">Pilot</span>
                    </span>
                    <span className="mt-0.5 font-semibold text-[10px] text-orange-600 tracking-wider">
                      compilepilot.com
                    </span>
                  </div>
                </Link>

                <button
                  onClick={closeMobileMenu}
                  className="hover:bg-slate-100 p-2 rounded-xl text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Drawer Content (Scrollable) */}
              <div className="flex-1 px-4 py-3 divide-y divide-slate-100 overflow-y-auto">
                {/* 1. TOOLS SECTION */}
                <div className="py-2.5">
                  <button
                    onClick={() => toggleMobileSubmenu('Tools')}
                    className="group flex justify-between items-center py-2 w-full text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center bg-orange-50 rounded-lg w-8 h-8 text-orange-600 shrink-0">
                        <Code size={18} />
                      </div>
                      <span className="font-semibold text-slate-800 group-hover:text-orange-600 text-base transition-colors">
                        Tools
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-full font-medium text-[11px] text-slate-400">
                        {toolCategories.length} Categories
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-200 ${
                          expandedMobileMenu === 'Tools' ? 'rotate-180 text-orange-600' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedMobileMenu === 'Tools' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pt-2 overflow-hidden"
                      >
                        {/* Category Selector Tabs */}
                        <div className="flex items-center gap-1.5 pb-2 overflow-x-auto scrollbar-none">
                          {toolCategories.map((cat) => {
                            const TabIcon = cat.tabIcon;
                            const isActive = activeMobileToolTab === cat.id;
                            return (
                              <button
                                key={cat.id}
                                onClick={() => setActiveMobileToolTab(cat.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                  isActive
                                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                <TabIcon size={13} />
                                <span>{cat.label}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Category Items Grid */}
                        <div className="gap-1.5 grid grid-cols-2 bg-slate-50/70 mt-2 p-2 border border-slate-100 rounded-xl">
                          {activeMobileToolCategory.tools.slice(0, 10).map((tool) => {
                            const ToolIcon = tool.icon;
                            return (
                              <Link
                                key={tool.name}
                                href={tool.link}
                                onClick={closeMobileMenu}
                                className="group flex items-center gap-2 hover:bg-white p-1.5 rounded-lg text-slate-700 hover:text-orange-600 transition-colors"
                              >
                                <div className="bg-white group-hover:bg-orange-50 shadow-2xs p-1 rounded text-orange-600 shrink-0">
                                  <ToolIcon size={13} />
                                </div>
                                <span className="font-medium text-xs truncate leading-tight">
                                  {tool.name}
                                </span>
                              </Link>
                            );
                          })}
                        </div>

                        {/* View all link for category */}
                        <div className="mt-2 text-right">
                          <Link
                            href={`/tooles/${activeMobileToolCategory.id}-tooles`}
                            onClick={closeMobileMenu}
                            className="inline-flex items-center gap-1 font-semibold text-orange-600 hover:text-orange-700 text-xs"
                          >
                            <span>View all {activeMobileToolCategory.label} tools</span>
                            <ChevronRight size={13} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. DATASETS SECTION */}
                <div className="py-2.5">
                  <button
                    onClick={() => toggleMobileSubmenu('Datasets')}
                    className="group flex justify-between items-center py-2 w-full text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center bg-orange-50 rounded-lg w-8 h-8 text-orange-600 shrink-0">
                        <Database size={18} />
                      </div>
                      <span className="font-semibold text-slate-800 group-hover:text-orange-600 text-base transition-colors">
                        Datasets
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-full font-medium text-[11px] text-slate-400">
                        {datasetIndustries.length} Industries
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-200 ${
                          expandedMobileMenu === 'Datasets' ? 'rotate-180 text-orange-600' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedMobileMenu === 'Datasets' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pt-2 overflow-hidden"
                      >
                        {/* Industry Selector Tabs */}
                        <div className="flex items-center gap-1.5 pb-2 overflow-x-auto scrollbar-none">
                          {datasetIndustries.map((ind) => {
                            const TabIcon = ind.tabIcon;
                            const isActive = activeMobileDatasetTab === ind.id;
                            return (
                              <button
                                key={ind.id}
                                onClick={() => setActiveMobileDatasetTab(ind.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                  isActive
                                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                <TabIcon size={13} />
                                <span>{ind.label}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Industry Datasets Grid */}
                        <div className="gap-1.5 grid grid-cols-2 bg-slate-50/70 mt-2 p-2 border border-slate-100 rounded-xl">
                          {activeMobileIndustry.datasets.slice(0, 8).map((dataset) => {
                            const DatasetIcon = dataset.icon;
                            return (
                              <Link
                                key={dataset.name}
                                href={dataset.link}
                                onClick={closeMobileMenu}
                                className="group flex items-center gap-2 hover:bg-white p-1.5 rounded-lg text-slate-700 hover:text-orange-600 transition-colors"
                              >
                                <div className="bg-white group-hover:bg-orange-50 shadow-2xs p-1 rounded text-orange-600 shrink-0">
                                  <DatasetIcon size={13} />
                                </div>
                                <span className="font-medium text-xs truncate leading-tight">
                                  {dataset.name}
                                </span>
                              </Link>
                            );
                          })}
                        </div>

                        {/* View all industry datasets link */}
                        <div className="mt-2 text-right">
                          <Link
                            href={activeMobileIndustry.href}
                            onClick={closeMobileMenu}
                            className="inline-flex items-center gap-1 font-semibold text-orange-600 hover:text-orange-700 text-xs"
                          >
                            <span>View all {activeMobileIndustry.label} datasets</span>
                            <ChevronRight size={13} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. SERVICES SECTION */}
                <div className="py-2.5">
                  <button
                    onClick={() => toggleMobileSubmenu('Services')}
                    className="group flex justify-between items-center py-2 w-full text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center bg-orange-50 rounded-lg w-8 h-8 text-orange-600 shrink-0">
                        <Briefcase size={18} />
                      </div>
                      <span className="font-semibold text-slate-800 group-hover:text-orange-600 text-base transition-colors">
                        Services
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-full font-medium text-[11px] text-slate-400">
                        {allServiceGroups.length} Sectors
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-200 ${
                          expandedMobileMenu === 'Services' ? 'rotate-180 text-orange-600' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedMobileMenu === 'Services' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pt-2 overflow-hidden"
                      >
                        {/* Sector Tabs */}
                        <div className="flex items-center gap-1.5 pb-2 overflow-x-auto scrollbar-none">
                          {allServiceGroups.map((group) => {
                            const isActive = activeMobileServiceGroup === group.title;
                            return (
                              <button
                                key={group.title}
                                onClick={() => setActiveMobileServiceGroup(group.title)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                  isActive
                                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/30'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {group.title}
                              </button>
                            );
                          })}
                        </div>

                        {/* Services List for Active Sector */}
                        <div className="flex flex-col gap-1.5 bg-slate-50/70 mt-2 p-2.5 border border-slate-100 rounded-xl">
                          {activeServiceGroupData.links.map((link) => {
                            const ServiceIcon = link.icon;
                            return (
                              <Link
                                key={`${link.href}-${link.label}`}
                                href={link.href}
                                onClick={closeMobileMenu}
                                className="group flex justify-between items-center bg-white hover:bg-orange-50 shadow-2xs p-2 rounded-lg text-slate-700 hover:text-orange-600 transition-colors"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="bg-orange-50 group-hover:bg-orange-100 p-1 rounded text-orange-600 transition-colors">
                                    <ServiceIcon size={14} />
                                  </div>
                                  <span className="font-semibold text-xs">{link.label}</span>
                                </div>
                                <ChevronRight size={14} className="text-slate-400 group-hover:text-orange-600" />
                              </Link>
                            );
                          })}
                        </div>

                        {/* View all services link */}
                        <div className="mt-2 text-right">
                          <Link
                            href="/services"
                            onClick={closeMobileMenu}
                            className="inline-flex items-center gap-1 font-semibold text-orange-600 hover:text-orange-700 text-xs"
                          >
                            <span>Explore all Scraping Services</span>
                            <ChevronRight size={13} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. RESOURCES SECTION */}
                <div className="py-2.5">
                  <button
                    onClick={() => toggleMobileSubmenu('Resources')}
                    className="group flex justify-between items-center py-2 w-full text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center bg-orange-50 rounded-lg w-8 h-8 text-orange-600 shrink-0">
                        <BookOpen size={18} />
                      </div>
                      <span className="font-semibold text-slate-800 group-hover:text-orange-600 text-base transition-colors">
                        Resources
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-full font-medium text-[11px] text-slate-400">
                        Blog & Guides
                      </span>
                      <ChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-200 ${
                          expandedMobileMenu === 'Resources' ? 'rotate-180 text-orange-600' : ''
                        }`}
                      />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedMobileMenu === 'Resources' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pt-2 overflow-hidden"
                      >
                        <div className="flex flex-col gap-2 bg-slate-50/70 p-2.5 border border-slate-100 rounded-xl">
                          {resourcesMenu.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={closeMobileMenu}
                              className="group flex items-start gap-3 bg-white hover:bg-orange-50 shadow-2xs p-2 rounded-lg text-slate-700 hover:text-orange-600 transition-colors"
                            >
                              <div className="bg-orange-50 group-hover:bg-orange-100 mt-0.5 p-1.5 rounded-lg text-orange-600 shrink-0">
                                {item.icon}
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-slate-800 group-hover:text-orange-600 text-xs">
                                  {item.name}
                                </div>
                                <div className="mt-0.5 text-[11px] text-slate-500 leading-tight">
                                  {item.desc}
                                </div>
                              </div>
                              <ChevronRight size={14} className="mt-1 text-slate-400 group-hover:text-orange-600 shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 5. ABOUT (DIRECT LINK) */}
                <div className="py-2.5">
                  <Link
                    href="/about"
                    onClick={closeMobileMenu}
                    className="group flex justify-between items-center py-2 w-full text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center bg-orange-50 rounded-lg w-8 h-8 text-orange-600 shrink-0">
                        <Users size={18} />
                      </div>
                      <span className="font-semibold text-slate-800 group-hover:text-orange-600 text-base transition-colors">
                        About Us
                      </span>
                    </div>
                    <ChevronRight size={18} className="text-slate-400 group-hover:text-orange-600" />
                  </Link>
                </div>

                {/* 6. CONTACT (DIRECT LINK) */}
                <div className="py-2.5">
                  <Link
                    href="/contact"
                    onClick={closeMobileMenu}
                    className="group flex justify-between items-center py-2 w-full text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex justify-center items-center bg-orange-50 rounded-lg w-8 h-8 text-orange-600 shrink-0">
                        <Mail size={18} />
                      </div>
                      <span className="font-semibold text-slate-800 group-hover:text-orange-600 text-base transition-colors">
                        Contact Us
                      </span>
                    </div>
                    <ChevronRight size={18} className="text-slate-400 group-hover:text-orange-600" />
                  </Link>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="bg-slate-50/80 mt-auto p-4 border-slate-100 border-t">
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="flex justify-center items-center gap-2 bg-gradient-to-r from-orange-500 hover:from-orange-600 to-amber-600 hover:to-amber-700 shadow-md shadow-orange-500/20 px-4 py-3 rounded-xl w-full font-semibold text-white text-sm active:scale-[0.98] transition-all"
                >
                  <span>Request Custom Scraping</span>
                  <ArrowRight size={16} />
                </Link>

                <div className="flex justify-between items-center mt-3 pt-2 text-[11px] text-slate-400">
                  <span>Enterprise Grade Scalability</span>
                  <span>99.9% Pipeline Uptime</span>
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