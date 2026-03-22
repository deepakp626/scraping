'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail,
  ArrowRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-slate-950 pt-16 pb-8 overflow-hidden z-10 w-full mt-auto">
      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                <Zap className="fill-white" size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Scraping
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Empowering your digital workflow with modern AI capabilities, beautiful designs, and enterprise-grade performance.
            </p>
            
            {/* Newsletter Input */}
            <div className="mt-2">
              <h4 className="text-sm font-semibold text-slate-200 mb-3">Subscribe to our newsletter</h4>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-slate-900 border border-white/10 text-slate-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500 w-full max-w-[240px] transition-all"
                />
                <button 
                  type="submit" 
                  className="bg-orange-600 hover:bg-orange-500 text-white rounded-xl px-4 py-2.5 transition-colors flex items-center justify-center shadow-lg shadow-orange-500/20 active:scale-95"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>

          {/* Links Grid Area */}
          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">Product</h3>
            <ul className="flex flex-col gap-3">
              {['Features', 'Integrations', 'Pricing', 'Changelog', 'Docs'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">AI Tools</h3>
            <ul className="flex flex-col gap-3">
              {['Article Writer', 'Image Generator', 'Smart Summarizer', 'Data Insights', 'Code Assistant'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">Company</h3>
            <ul className="flex flex-col gap-3">
              {['About Us', 'Careers', 'Blog', 'Contact', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-orange-400 text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Scraping Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">

            <div className="w-px h-4 bg-white/10 hidden sm:block"></div>

            <Link href="#" className="text-slate-400 hover:text-orange-400 transition-colors p-2 hover:bg-orange-500/10 rounded-lg">
              <Twitter size={18} />
            </Link>
            <Link href="#" className="text-slate-400 hover:text-orange-400 transition-colors p-2 hover:bg-orange-500/10 rounded-lg">
              <Github size={18} />
            </Link>
            <Link href="#" className="text-slate-400 hover:text-orange-400 transition-colors p-2 hover:bg-orange-500/10 rounded-lg">
              <Linkedin size={18} />
            </Link>
            <Link href="#" className="text-slate-400 hover:text-orange-400 transition-colors p-2 hover:bg-orange-500/10 rounded-lg">
              <Mail size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
