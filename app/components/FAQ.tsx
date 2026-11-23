"use client"
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'

const FAQ = () => {
    const pathname = usePathname();
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Hide the FAQ component on any subpages under /datasets/
    if (pathname?.startsWith('/datasets/')) {
        return null;
    }

    const faqs = [
        {
            q: "What types of data can you collect?",
            a: "We can collect virtually any publicly available data — product listings, prices, reviews, contact details, job postings, real estate listings, news articles, business directories, and much more.",
        },
        {
            q: "Which websites do you support?",
            a: "We support any public-facing website. This includes e-commerce platforms, job boards, real estate portals, social media directories, review sites, news outlets, and government data portals.",
        },
        {
            q: "How long does it take to deliver a dataset?",
            a: "Most datasets are delivered within 1–3 business days. Larger or more complex projects may take 3–7 days. We always provide a clear timeline before starting.",
        },
        {
            q: "In what formats is the data delivered?",
            a: "We deliver in CSV, Excel (XLSX), JSON, Google Sheets, or directly into your database (MySQL, PostgreSQL, MongoDB). Just let us know your preference.",
        },
        {
            q: "Can I get recurring/updated datasets?",
            a: "Yes! We offer scheduled data delivery — hourly, daily, weekly, or monthly. Your data stays fresh automatically.",
        },
        {
            q: "Is the data accurate and validated?",
            a: "Absolutely. Every dataset goes through our QA pipeline — deduplication, field validation, and completeness checks — before delivery.",
        },
    ];

    return (
        <section className="bg-gray-50 px-6 py-20">
            <div className="mx-auto max-w-3xl">
                <div className="mb-14 text-center">
                    <span className="font-semibold text-primary-theme text-sm uppercase tracking-widest">
                        FAQs
                    </span>
                    <h2 className="mt-2 font-bold text-secondary-theme text-3xl">
                        Frequently Asked Questions
                    </h2>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="flex justify-between items-center gap-4 hover:bg-orange-50 px-6 py-5 w-full text-left transition-colors cursor-pointer"
                            >
                                <span className="font-semibold text-secondary-theme text-lg">{faq.q}</span>
                                <span
                                    className={`shrink-0 w-7 h-7 rounded-full bg-primary-theme/10 text-primary-theme flex items-center justify-center font-bold text-lg transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}
                                >
                                    +
                                </span>
                            </button>
                            {openFaq === i && (
                                <div className="px-6 pt-4 pb-5 border-gray-50 border-t text-gray-500 text-base leading-relaxed">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQ