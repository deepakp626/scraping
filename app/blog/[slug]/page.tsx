import React from "react";
interface PageProps {
  params: {
    slug: string;
  };
}

const posts: Record<
  string,
  {
    title: string;
    subtitle: string;
    date: string;
    author: string;
    image: string;
    tags: string[];
  }
> = {
  "mastering-web-scraping": {
    title: "Mastering Web Scraping in 2026",
    subtitle:
      "A modern guide to extracting reliable data from websites, APIs, and dynamic pages.",
    date: "March 20, 2026",
    author: "Amina Adeyemi",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Data", "Automation", "Scraping"],
  },
  "nextjs-performance-tips": {
    title: "Next.js Performance Tips",
    subtitle: "Optimize your Next.js app for lightning-fast delivery and smoother UX.",
    date: "March 18, 2026",
    author: "Devin Ross",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "Performance", "Frontend"],
  },
};

export default function BlogPostPage({ params }: PageProps) {
  const post = posts[params.slug] || posts["mastering-web-scraping"];
  const relatedPosts = Object.values(posts).filter(
    (item) => item.title !== post.title
  );

  return (
    <main className="blog-page-css min-h-screen bg-white text-slate-900 mt-10">
      <div className="container mx-auto px-0 py-14 lg:py-14">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.2)]">
          <div className="space-y-4 text-slate-700">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-500/90">
              Blog / Article
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 md:text-5xl">
              {post.title}
            </h1>
            <p className="max-w-3xl text-slate-600 leading-8">
              {post.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              <span>By {post.author}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[2.65fr_0.95fr]">
          <article className="space-y-8">
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/40">
              <img
                src={post.image}
                alt={post.title}
                className="h-[420px] w-full object-cover"
              />
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-8 shadow-lg shadow-slate-200/50">
              <div className="mt-8 space-y-6 text-slate-700">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Introduction
                </h2>
                <p className="leading-8 text-slate-600">
                  In a world where data is the new currency, a reliable scraping
                  pipeline is no longer optional — it is essential. This post
                  walks through the best practices for building resilient
                  extraction workflows, handling JavaScript-heavy pages, and
                  maintaining clean data at scale.
                </p>

                <section className="rounded-3xl border border-orange-100 bg-orange-50 p-6">
                  <h3 className="text-sm uppercase tracking-[0.25em] text-orange-500">
                    Quick takeaway
                  </h3>
                  <p className="mt-3 text-slate-700 leading-7">
                    Use a combination of structured HTML parsing, API-first
                    extraction, and headless browser rendering to cover both
                    static and dynamic sources with confidence.
                  </p>
                </section>

                <h2 className="text-2xl font-semibold text-slate-900">
                  Build with durability in mind
                </h2>
                <p className="leading-8 text-slate-600">
                  Start by modelling how the target website changes over time.
                  Keep selectors resilient, prefer semantic element lookups, and
                  log failed responses to automatically adapt your scraping
                  strategy before it breaks.
                </p>

                <section className="rounded-3xl border border-slate-200 bg-white p-6">
                  <h3 className="text-lg font-semibold text-slate-900">Pro tip</h3>
                  <p className="mt-4 text-slate-600 leading-7">
                    Combine browser automation with API requests to reduce
                    overhead and avoid missed data when the page relies on
                    client-side rendering.
                  </p>
                </section>

                <h3 className="text-xl font-semibold text-slate-900">
                  Practical checklist
                </h3>
                <ul className="space-y-3 pl-5 text-slate-600 marker:text-orange-500">
                  <li>Audit the page structure before building selectors.</li>
                  <li>Use request throttling to stay within rate limits.</li>
                  <li>Cache stable resources and refresh only changed data.</li>
                  <li>Validate scraped values with schema rules.</li>
                </ul>

                <p className="leading-8 text-slate-600">
                  At the end of the day, successful scraping is a balance of
                  speed, accuracy, and ethics. When you build with the right
                  tooling and clear workflows, data extraction becomes a repeatable
                  advantage rather than a one-off experiment.
                </p>
              </div>
            </div>
          </article>

          <aside className="space-y-8">


            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/30">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
                Related posts
              </p>

              <div className="mt-5 space-y-4">
                {relatedPosts.map((related) => (
                  <div
                    key={related.title}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-sm text-orange-500">{related.date}</p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {related.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-orange-100 bg-orange-50 p-6 text-slate-900 shadow-lg shadow-orange-100">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-600">
                Join the conversation
              </p>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                Get blog updates first
              </h3>
              <p className="mt-3 text-slate-600 leading-7">
                Subscribe for weekly insights on scraping, automation, and data
                engineering.
              </p>
              <button className="mt-6 w-full rounded-2xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-400">
                Subscribe now
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
