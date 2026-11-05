import type { Metadata } from "next";
import BlogPostClient, { type BlogDetail } from "./BlogPostClient";
import { API_ENDPOINTS } from "@/lib/apiEndpoints";

type BlogApiEnvelope = {
  success?: boolean;
  message?: string;
  data?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isBlogDetail(value: unknown): value is BlogDetail {
  return (
    isRecord(value) &&
    typeof value.id === "number" &&
    typeof value.slug === "string" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.html_content === "string" &&
    typeof value.date === "string" &&
    (value.thumbnail_image_url === null ||
      typeof value.thumbnail_image_url === "string") &&
    (value.thumbnail_image_name === null ||
      typeof value.thumbnail_image_name === "string") &&
    (value.meta_title === undefined ||
      value.meta_title === null ||
      typeof value.meta_title === "string") &&
    (value.meta_description === undefined ||
      value.meta_description === null ||
      typeof value.meta_description === "string") &&
    (value.image_alt === undefined ||
      value.image_alt === null ||
      typeof value.image_alt === "string") &&
    (value.meta_keywords === undefined ||
      value.meta_keywords === null ||
      typeof value.meta_keywords === "string")
  );
}

async function fetchBlog(slug: string): Promise<{
  blog: BlogDetail | null;
  error: string | null;
}> {
  try {
    const url = new URL(API_ENDPOINTS.BLOG.GET_BLOG_BY_SLUG);
    url.searchParams.set("slug", slug);
    const response = await fetch(url, { cache: "no-store" });
    let payload: unknown;

    try {
      payload = await response.json();
    } catch {
      return { blog: null, error: "The blog API returned an invalid response." };
    }

    const envelope = isRecord(payload) ? (payload as BlogApiEnvelope) : null;
    const message =
      typeof envelope?.message === "string" ? envelope.message : null;

    if (!response.ok || envelope?.success === false) {
      return {
        blog: null,
        error: message || "Failed to load blog post.",
      };
    }

    const blogData = envelope?.data ?? payload;
    if (!isBlogDetail(blogData)) {
      return {
        blog: null,
        error: message || "Blog post not found.",
      };
    }

    return { blog: blogData, error: null };
  } catch (error) {
    return {
      blog: null,
      error:
        error instanceof Error && error.message
          ? error.message
          : "Failed to load blog post.",
    };
  }
}

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://compilepilot.com").replace(
    /\/$/,
    ""
  );
}

function getCanonicalUrl(slug: string) {
  return `${getSiteUrl()}/blog/${encodeURIComponent(slug)}`;
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const canonicalUrl = getCanonicalUrl(slug);
  const { blog } = await fetchBlog(slug);

  if (!blog) {
    return {
      title: { absolute: "Blog post | CompilePilot" },
      alternates: { canonical: canonicalUrl },
      robots: { index: false, follow: true },
    };
  }

  const title = blog.meta_title || blog.title;
  const description = blog.meta_description || blog.description;
  const image = blog.thumbnail_image_url || undefined;
  const imageAlt = blog.image_alt || blog.title;
  const keywords = blog.meta_keywords
    ?.split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  return {
    title: { absolute: title },
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      siteName: "CompilePilot",
      title,
      description,
      ...(image
        ? {
            images: [
              {
                url: image,
                alt: imageAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const { blog, error } = await fetchBlog(slug);
  const canonicalUrl = getCanonicalUrl(blog?.slug || slug);
  const jsonLd = blog
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.meta_description || blog.description,
        datePublished: blog.date,
        dateModified: blog.date,
        image: blog.thumbnail_image_url || undefined,
        url: canonicalUrl,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": canonicalUrl,
        },
        author: {
          "@type": "Organization",
          name: "CompilePilot",
        },
        publisher: {
          "@type": "Organization",
          name: "CompilePilot",
        },
        ...(blog.meta_keywords ? { keywords: blog.meta_keywords } : {}),
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <BlogPostClient blog={blog} error={error} />
    </>
  );
}
