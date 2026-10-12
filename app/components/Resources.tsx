"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, FileText, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { apiClient } from '@/lib/apiClient';
import { API_ENDPOINTS } from '@/lib/apiEndpoints';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  html_content: string;
  date: string;
  thumbnail_image_url: string | null;
  thumbnail_image_name: string | null;
}

interface Pagination {
  page: number;
  limit: number;
  total_records: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

interface PaginatedBlogsResponse {
  data: BlogPost[];
  pagination: Pagination;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const BLOGS_PER_PAGE = 6;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800";

// ─── Static Case Study data ───────────────────────────────────────────────────

const CASE_STUDIES = [
  {
    id: 'cs-1',
    title: "Global Tech Expansion",
    desc: "How we helped a FinTech startup scale their data pipeline to 10M requests per day using our enterprise scraping grid.",
    tags: ["FinTech", "Scaling"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    date: "Mar 15, 2026",
    slug: "#"
  },
  {
    id: 'cs-2',
    title: "Automated Competitor Analysis",
    desc: "Monitoring 50k+ products daily for real-time pricing advantages without getting blocked by Cloudflare.",
    tags: ["E-commerce", "Pricing"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    date: "Feb 28, 2026",
    slug: "#"
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(raw: string) {
  try {
    return new Date(raw).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return raw;
  }
}

const TABS = [
  { id: 'blog' as const, label: 'Blog', icon: <Newspaper size={18} /> },
  { id: 'case-studies' as const, label: 'Case Studies', icon: <FileText size={18} /> },
];

export default function Resources() {
  const [activeTab, setActiveTab] = useState<'blog' | 'case-studies'>('blog');
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = useCallback(async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<PaginatedBlogsResponse>(
        API_ENDPOINTS.BLOG.GET_PAGINATED_BLOGS,
        {
          params: {
            page,
            limit: BLOGS_PER_PAGE,
          },
        }
      );
      setBlogs(response.data.data);
      setPagination(response.data.pagination);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage, fetchBlogs]);

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
                    className="absolute inset-0 bg-primary-theme/20 border border-primary-theme/30 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'blog' && (
              <motion.div
                key="blog-tab"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Loading State */}
                {loading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Array.from({ length: BLOGS_PER_PAGE }).map((_, index) => (
                      <div
                        key={index}
                        className="bg-slate-900/50 rounded-3xl border border-white/10 overflow-hidden animate-pulse flex flex-col h-[420px]"
                      >
                        <div className="h-56 bg-slate-800/60 w-full" />
                        <div className="p-6 flex flex-col flex-1 space-y-4">
                          <div className="h-4 bg-slate-800/60 rounded w-1/4" />
                          <div className="h-6 bg-slate-800/60 rounded w-3/4" />
                          <div className="h-4 bg-slate-800/60 rounded w-full" />
                          <div className="h-4 bg-slate-800/60 rounded w-2/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Error State */}
                {!loading && error && (
                  <div className="flex flex-col items-center justify-center py-16 bg-slate-900/40 rounded-3xl border border-red-500/20 text-center px-4">
                    <AlertCircle className="text-red-400 w-12 h-12 mb-4 animate-bounce" />
                    <p className="text-red-400 font-medium mb-4">{error}</p>
                    <button
                      onClick={() => fetchBlogs(currentPage)}
                      className="px-6 py-2.5 bg-primary-theme/20 border border-primary-theme/40 text-primary-theme rounded-xl font-semibold hover:bg-primary-theme/30 transition-all cursor-pointer"
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {/* Empty State */}
                {!loading && !error && blogs.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 bg-slate-900/40 rounded-3xl border border-white/10 text-center px-4">
                    <Newspaper className="text-slate-500 w-12 h-12 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Blog Posts Found</h3>
                    <p className="text-slate-400 text-sm">Check back later for fresh articles and updates.</p>
                  </div>
                )}

                {/* Blog Grid */}
                {!loading && !error && blogs.length > 0 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {blogs.map((blog, index) => (
                        <BlogCard key={blog.id} blog={blog} index={index} />
                      ))}
                    </div>

                    {/* View All Link */}
                    <div className="mt-12 text-center">
                      <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-theme/20 hover:bg-primary-theme/30 border border-primary-theme/30 text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-theme/20"
                      >
                        View All Articles <ArrowRight size={18} />
                      </Link>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {activeTab === 'case-studies' && (
              <motion.div
                key="case-studies-tab"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {CASE_STUDIES.map((item, index) => (
                  <CaseStudyCard key={item.id} item={item} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ blog, index }: { blog: BlogPost; index: number }) {
  const imageUrl = blog.thumbnail_image_url || FALLBACK_IMAGE;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group bg-slate-900/50 rounded-3xl border border-white/10 overflow-hidden hover:border-primary-theme/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-theme/10 flex flex-col"
    >
      {/* Image Container */}
      <Link href={`/blog/${blog.slug}`} className="relative h-64 w-full overflow-hidden block">
        <img
          src={imageUrl}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2">
          <span className="text-[10px] uppercase tracking-wider font-bold text-white bg-primary-theme/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-lg">
            Article
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1 relative bg-slate-900/80 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-400">
            {formatDate(blog.date)}
          </span>
          <ArrowRight size={18} className="text-slate-600 group-hover:text-primary-theme transition-colors -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300" />
        </div>

        <Link href={`/blog/${blog.slug}`} className="group-hover:text-primary-theme transition-colors">
          <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2">
            {blog.title}
          </h3>
        </Link>

        <p className="text-slate-400 leading-relaxed mb-8 line-clamp-3 flex-1">
          {blog.description}
        </p>

        <Link
          href={`/blog/${blog.slug}`}
          className="flex items-center gap-2 text-sm font-bold text-primary-theme group-hover:gap-3 transition-all mt-auto self-start"
        >
          Read Full Story <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}

function CaseStudyCard({ item, index }: { item: typeof CASE_STUDIES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group bg-slate-900/50 rounded-3xl border border-white/10 overflow-hidden hover:border-primary-theme/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-theme/10 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-64 w-full overflow-hidden">
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