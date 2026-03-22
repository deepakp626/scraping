'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        countryCode: '+1',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic would go here
        console.log('Form submitted:', formData);
        // You can add a toast notification here
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <main className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Hero / Info Section */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                                Get in <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-600">Touch</span>
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                                Have a question about our scraping tools? Want to discuss a custom feature? We'd love to hear from you.
                            </p>
                        </div>

                        <div className="flex flex-col gap-6 mt-4">
                            {/* Contact Method 1 */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                                    <Mail className="text-primary-theme" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Email Us</h3>
                                    <p className="text-slate-400 text-sm mb-1">Our friendly team is here to help.</p>
                                    <a href="mailto:hello@scraping.inc" className="text-primary-theme hover:text-orange-300 transition-colors font-medium">hello@scraping.inc</a>
                                </div>
                            </div>

                            {/* Contact Method 2 */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                                    <MapPin className="text-primary-theme" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Office</h3>
                                    <p className="text-slate-400 text-sm mb-1">Come say hello at our office HQ.</p>
                                    <span className="text-primary-theme font-medium">100 Innovation Drive, Tech City, CA 94043</span>
                                </div>
                            </div>

                            {/* Contact Method 3 */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                                    <Phone className="text-primary-theme" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Phone</h3>
                                    <p className="text-slate-400 text-sm mb-1">Mon-Fri from 8am to 5pm.</p>
                                    <a href="tel:+11234567890" className="text-primary-theme hover:text-orange-300 transition-colors font-medium">+1 (123) 456-7890</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-300">First Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="bg-slate-950 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary-theme focus:ring-1 focus:ring-primary-theme transition-all"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-slate-950 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary-theme focus:ring-1 focus:ring-primary-theme transition-all"
                                        placeholder="john@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-slate-300">Phone Number</label>
                                    <div className="flex relative items-center">
                                        <select
                                            name="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleChange}
                                            className="bg-slate-900 border border-white/10 border-r-0 text-slate-300 rounded-l-xl px-4 py-3 focus:outline-none focus:border-primary-theme focus:ring-1 focus:ring-primary-theme transition-all cursor-pointer appearance-none z-10"
                                        >
                                            <option value="+1">US (+1)</option>
                                            <option value="+44">UK (+44)</option>
                                            <option value="+91">IN (+91)</option>
                                            <option value="+61">AU (+61)</option>
                                            <option value="+971">AE (+971)</option>
                                        </select>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-slate-950 border border-white/10 text-white rounded-r-xl px-4 py-3 focus:outline-none focus:border-primary-theme focus:ring-1 focus:ring-primary-theme transition-all"
                                            placeholder="555-0100"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="subject" className="text-sm font-medium text-slate-300">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="bg-slate-950 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary-theme focus:ring-1 focus:ring-primary-theme transition-all"
                                        placeholder="How can we help you?"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-300">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="bg-slate-950 border border-white/10 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary-theme focus:ring-1 focus:ring-primary-theme transition-all resize-none"
                                    placeholder="Tell us a little about your project..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-linear-to-r from-primary-theme to-orange-500 hover:from-orange-400 hover:to-amber-500 text-white rounded-xl px-6 py-4 font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-[0.98]"
                            >
                                Send Message
                                <Send size={18} />
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Contact;