"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";
import apiClient from "@/lib/apiClient";

// Types for the API response
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

const BLOGS_PER_PAGE = 9;

export default function Blog() {
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for pagination
  const getPageNumbers = (): (number | "...")[] => {
    if (!pagination) return [];
    const { total_pages } = pagination;
    if (total_pages <= 5) {
      return Array.from({ length: total_pages }, (_, i) => i + 1);
    }
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(total_pages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < total_pages - 2) pages.push("...");
    pages.push(total_pages);
    return pages;
  };

  // Format date string nicely
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="from-orange-50 to-white mx-auto px-6 py-12 pt-18 min-h-screen container">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="font-bold text-gray-800 text-4xl md:text-5xl">
          Our Blog
        </h1>
        <p className="mt-3 text-gray-500">
          Insights, tutorials & latest tech updates
        </p>
      </motion.div>

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 mx-auto mb-8 p-6 border border-red-200 rounded-xl max-w-md text-center"
        >
          <p className="font-medium text-red-600">{error}</p>
          <button
            onClick={() => fetchBlogs(currentPage)}
            className="bg-red-100 hover:bg-red-200 mt-3 px-4 py-2 rounded-lg text-red-700 text-sm transition"
          >
            Try Again
          </button>
        </motion.div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: BLOGS_PER_PAGE }).map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="bg-gray-200 w-full h-48" />
              <div className="p-5 space-y-3">
                <div className="bg-gray-200 rounded w-24 h-4" />
                <div className="bg-gray-200 rounded w-3/4 h-6" />
                <div className="bg-gray-200 rounded w-full h-4" />
                <div className="bg-gray-200 rounded w-28 h-4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Blog Grid */}
      {!loading && !error && blogs.length > 0 && (
        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden transition"
            >
              <Link href={`/blog/${post.slug}`}>
                {post.thumbnail_image_url ? (
                  <img
                    src={post.thumbnail_image_url}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="flex justify-center items-center bg-gradient-to-br from-orange-100 to-orange-200 w-full h-48">
                    <span className="text-4xl">📝</span>
                  </div>
                )}
              </Link>

              <div className="p-5">
                <p className="font-medium text-orange-500 text-sm">
                  {formatDate(post.date)}
                </p>
                <h2 className="mt-2 font-semibold text-gray-800 text-xl line-clamp-2">
                  {post.title}
                </h2>
                <p className="mt-2 text-gray-500 text-sm line-clamp-2">
                  {post.description}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-4 font-medium text-orange-600 hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && blogs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 text-center"
        >
          <span className="text-5xl">📭</span>
          <p className="mt-4 font-medium text-gray-600 text-lg">
            No blog posts yet.
          </p>
          <p className="mt-1 text-gray-400 text-sm">
            Check back soon for fresh content!
          </p>
        </motion.div>
      )}

      {/* Pagination Controls */}
      {!loading && pagination && pagination.total_pages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center items-center gap-2 mt-12"
        >
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.has_previous}
            className="px-4 py-2 border border-gray-300 disabled:opacity-40 rounded-lg text-gray-600 text-sm transition hover:bg-orange-50 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page as number)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-orange-500 text-white shadow-md"
                    : "border border-gray-300 text-gray-600 hover:bg-orange-50"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.has_next}
            className="px-4 py-2 border border-gray-300 disabled:opacity-40 rounded-lg text-gray-600 text-sm transition hover:bg-orange-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </motion.div>
      )}

      {/* Pagination Info */}
      {!loading && pagination && pagination.total_records > 0 && (
        <p className="mt-4 text-center text-gray-400 text-sm">
          Showing page {pagination.page} of {pagination.total_pages} ({pagination.total_records} total posts)
        </p>
      )}

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-orange-500 shadow-lg mt-16 py-10 rounded-2xl text-white text-center"
      >
        <h2 className="font-bold text-2xl md:text-3xl">
          Stay Updated 🚀
        </h2>
        <p className="mt-2 text-orange-100">
          Subscribe to get latest blog updates directly in your inbox
        </p>

        <div className="flex justify-center gap-2 mt-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg outline-none w-64 text-black"
          />
          <button className="bg-black hover:bg-gray-800 px-5 py-2 rounded-lg transition">
            Subscribe
          </button>
        </div>
      </motion.div>
    </div>
  );
}
