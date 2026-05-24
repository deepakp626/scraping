import Link from 'next/link'
import React from 'react'

const CTA = () => {
    {/* ── CTA ───────────────────────────────────────────────────── */ }
    return (
        <section className="relative bg-secondary-theme overflow-hidden py-24 px-6">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-primary-theme/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gradient-end-color/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <span className="inline-block mb-5 bg-primary-theme/15 border border-primary-theme/30 text-primary-theme text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full">
                    🚀 Get Started Today
                </span>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-5">
                    Ready for Your{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-theme to-gradient-end-color">
                        Custom Dataset?
                    </span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                    Share your requirements and we&apos;ll get back to you within 24 hours
                    with a timeline and quote. Fast, accurate, and fully customised to
                    your needs.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {[
                        { icon: "⚡", text: "Avg. 2-Day Delivery" },
                        { icon: "✅", text: "Validated & Clean Data" },
                        { icon: "🌍", text: "Any Website · Any Location" },
                    ].map((item) => (
                        <div
                            key={item.text}
                            className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-gray-300"
                        >
                            <span>{item.icon}</span>
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/contact"
                        className="inline-block bg-linear-to-r from-primary-theme to-gradient-end-color text-white font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300 text-base"
                    >
                        Request a Dataset →
                    </Link>
                    <Link
                        href="/about"
                        className="inline-block border border-white/20 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/10 transition-all duration-300 text-base"
                    >
                        Learn More About Us
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default CTA