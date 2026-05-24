"use client"
import React, { useState } from 'react'

const FAQ = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

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
        <section className="bg-gray-50 py-20 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-primary-theme text-sm font-semibold tracking-widest uppercase">
                        FAQs
                    </span>
                    <h2 className="text-3xl font-bold mt-2 text-secondary-theme">
                        Frequently Asked Questions
                    </h2>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-orange-50 transition-colors"
                            >
                                <span className="font-semibold text-secondary-theme text-lg">{faq.q}</span>
                                <span
                                    className={`shrink-0 w-7 h-7 rounded-full bg-primary-theme/10 text-primary-theme flex items-center justify-center font-bold text-lg transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}
                                >
                                    +
                                </span>
                            </button>
                            {openFaq === i && (
                                <div className="px-6 pb-5 text-gray-500 text-base leading-relaxed border-t border-gray-50 pt-4">
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