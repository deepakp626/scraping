"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";
import "@/app/blog.css";

// Type matching the API response
interface BlogDetail {
  id: number;
  slug: string;
  title: string;
  description: string;
  html_content: string;
  date: string;
  thumbnail_image_url: string | null;
  thumbnail_image_name: string | null;
}

// ── Helpers ──

/** Strip HTML and estimate reading time (avg 200 wpm) */
function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const words = text.split(" ").filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Format ISO date for display */
function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/** Format ISO date for structured data */
function formatISODate(dateStr: string): string {
  try {
    return new Date(dateStr).toISOString();
  } catch {
    return dateStr;
  }
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<any>(
          API_ENDPOINTS.BLOG.GET_BLOG_BY_SLUG,
          { params: { slug } }
        );
        const blogData = response.data?.data || response.data;
        if (blogData && (blogData.title || blogData.html_content)) {
          setBlog(blogData);
        } else {
          setError(response.data?.message || 'Blog post not found.');
        }
      } catch (err: any) {
        const message =
          err?.response?.data?.detail ||
          err?.response?.data?.message ||
          "Failed to load blog post.";
        setError(typeof message === "string" ? message : JSON.stringify(message));
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Dynamic page title
  useEffect(() => {
    if (blog?.title) {
      document.title = `${blog.title} | Blog`;
    }
  }, [blog?.title]);

  // Compute reading time
  const readingTime = useMemo(() => {
    if (!blog?.html_content) return 0;
    return estimateReadingTime(blog.html_content);
  }, [blog?.html_content]);

  // Copy link handler
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  // JSON-LD structured data for SEO
  const jsonLd = useMemo(() => {
    if (!blog) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.description,
      datePublished: formatISODate(blog.date),
      dateModified: formatISODate(blog.date),
      image: blog.thumbnail_image_url || undefined,
      url: typeof window !== "undefined" ? window.location.href : "",
      author: {
        "@type": "Organization",
        name: "Scraping Team",
      },
      publisher: {
        "@type": "Organization",
        name: "Scraping Team",
      },
    };
  }, [blog]);

  // ── Loading state ──
  if (loading) {
    return (
      <main className="blog-page-css">
        <div className="blog-container">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center gap-2 mb-8 animate-pulse">
            <div className="bg-slate-200 rounded w-16 h-4" />
            <div className="bg-slate-200 rounded w-4 h-4" />
            <div className="bg-slate-200 rounded w-24 h-4" />
            <div className="bg-slate-200 rounded w-4 h-4" />
            <div className="bg-slate-200 rounded w-40 h-4" />
          </div>

          {/* Header skeleton */}
          <div className="blog-header-card" style={{ padding: "2rem" }}>
            <div className="space-y-4 animate-pulse">
              <div className="bg-slate-200 rounded w-32 h-4" />
              <div className="bg-slate-200 rounded w-3/4 h-10" />
              <div className="bg-slate-200 rounded w-1/2 h-5" />
              <div className="flex gap-4">
                <div className="bg-slate-200 rounded w-28 h-4" />
                <div className="bg-slate-200 rounded w-20 h-4" />
              </div>
            </div>
          </div>

          {/* Grid skeleton */}
          <div className="blog-grid">
            <div className="blog-article">
              <div className="bg-slate-200 rounded-[2rem] h-[360px] animate-pulse" />
              <div className="blog-content-card animate-pulse" style={{ padding: "2rem" }}>
                <div className="space-y-4">
                  <div className="bg-slate-200 rounded w-48 h-6" />
                  <div className="bg-slate-200 rounded w-full h-4" />
                  <div className="bg-slate-200 rounded w-5/6 h-4" />
                  <div className="bg-slate-200 rounded w-4/6 h-4" />
                  <div className="bg-slate-200 rounded w-full h-4" />
                  <div className="bg-slate-200 rounded w-3/4 h-4" />
                </div>
              </div>
            </div>
            <div className="blog-aside">
              <div className="bg-slate-200 rounded-[1.75rem] h-48 animate-pulse" />
              <div className="bg-slate-200 rounded-[1.75rem] h-56 animate-pulse" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <main className="blog-page-css">
        <div className="blog-container">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="blog-breadcrumb-sep" aria-hidden="true">/</span>
            <Link href="/blog">Blog</Link>
          </nav>

          <div
            className="blog-header-card"
            style={{
              borderColor: "#fecaca",
              backgroundColor: "#fef2f2",
              textAlign: "center",
              padding: "3rem 2rem",
            }}
          >
            <svg
              style={{ margin: "0 auto", width: 48, height: 48, color: "#f87171" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <h1
              style={{
                marginTop: "1rem",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#b91c1c",
              }}
            >
              Unable to load blog post
            </h1>
            <p style={{ marginTop: "0.5rem", color: "#dc2626", fontSize: "1rem" }}>
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="blog-cta-btn"
              style={{
                marginTop: "1.5rem",
                backgroundColor: "#ef4444",
                display: "inline-block",
                width: "auto",
                padding: "0.75rem 2rem",
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ── No blog found ──
  if (!blog) {
    return (
      <main className="blog-page-css">
        <div className="blog-container">
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="blog-breadcrumb-sep" aria-hidden="true">/</span>
            <Link href="/blog">Blog</Link>
          </nav>

          <div
            className="blog-header-card"
            style={{ textAlign: "center", padding: "3rem 2rem" }}
          >
            <svg
              style={{ margin: "0 auto", width: 56, height: 56, color: "#94a3b8" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <h1
              style={{
                marginTop: "1rem",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#334155",
              }}
            >
              Blog post not found
            </h1>
            <p
              style={{
                marginTop: "0.5rem",
                color: "#64748b",
                fontSize: "1rem",
              }}
            >
              The blog post you are looking for does not exist or has been removed.
            </p>
            <Link
              href="/blog"
              className="blog-cta-btn"
              style={{
                marginTop: "1.5rem",
                display: "inline-block",
                width: "auto",
                padding: "0.75rem 2rem",
                textDecoration: "none",
              }}
            >
              ← Browse all posts
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── Blog content ──
  return (
    <>
      {/* SEO: Dynamic head meta & JSON-LD structured data */}
      <Head>
        <title>{blog.title} | Blog</title>
        <meta name="description" content={blog.description} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:type" content="article" />
        {blog.thumbnail_image_url && (
          <meta property="og:image" content={blog.thumbnail_image_url} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.description} />
        <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : ""} />
      </Head>

      {/* JSON-LD Structured Data for Google rich results */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <main className="blog-page-css">
        <div className="blog-container">
          {/* ── Breadcrumb navigation (SEO + UX) ── */}
          <nav className="blog-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="blog-breadcrumb-sep" aria-hidden="true">/</span>
            <Link href="/blog">Blog</Link>
            <span className="blog-breadcrumb-sep" aria-hidden="true">/</span>
            <span className="blog-breadcrumb-current" aria-current="page">
              {(blog.title?.length ?? 0) > 50 ? blog.title.slice(0, 50) + "…" : (blog.title || "")}
            </span>
          </nav>

          {/* ── Header card ── */}
          <header className="blog-header-card">
            <p className="blog-label">Blog / Article</p>

            <h1 className="blog-title">{blog.title}</h1>

            <p className="blog-subtitle">{blog.description}</p>

            {/* Meta row: date + reading time */}
            <div className="blog-meta">
              <span className="blog-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {formatDate(blog.date)}
              </span>
              <span className="blog-meta-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {readingTime} min read
              </span>
            </div>
          </header>

          {/* ── Content grid ── */}
          <div className="blog-grid">
            {/* Main article column */}
            <article className="blog-article">
              {/* Thumbnail image */}
              {blog.thumbnail_image_url && (
                <div className="blog-image-card">
                  <img
                    src={blog.thumbnail_image_url}
                    alt={blog.title}
                    loading="eager"
                  />
                </div>
              )}

              {/* Blog HTML content */}
              <div className="blog-content-card">
                <div
                  className="blog-prose"
                  dangerouslySetInnerHTML={{ __html: blog.html_content }}
                />
              </div>

              {/* Back to blog link (bottom of article) */}
              <div className="blog-back-link">
                <Link href="/blog">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Back to all posts
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="blog-aside">
              {/* Share card */}
              <div className="blog-aside-card blog-share-card">
                <p className="blog-label">Share this article</p>
                <div className="blog-share-buttons">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-share-btn"
                    aria-label="Share on Twitter"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-share-btn"
                    aria-label="Share on LinkedIn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="blog-share-btn"
                    aria-label="Copy link"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    {linkCopied ? "Copied!" : "Copy link"}
                  </button>
                </div>
              </div>

              
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}
