"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const sliderItems = [
    { name: "P&G", src: "/images/slider/P-g.svg" },
    { name: "Unilever", src: "/images/slider/Unilever.svg" },
    { name: "Decathlon", src: "/images/slider/decathlon.svg" },
    { name: "Flipkart", src: "/images/slider/flipkart.svg" },
    { name: "L'Oreal", src: "/images/slider/loreal.svg" },
    { name: "Myntra", src: "/images/slider/myntra.svg" },
    { name: "Subway", src: "/images/slider/subway.svg" },
    { name: "Zomato", src: "/images/slider/zomato.svg" },
    { name: "Expedia", src: "/images/slider/Expedia_Logo.svg" },
    { name: "Food Panda", src: "/images/slider/Food-Panda.svg" },
    { name: "Godrej", src: "/images/slider/Godhrej-logo.svg" },
    { name: "Proximo Spirit", src: "/images/slider/Proximo-Spirit-logo.svg" },
    { name: "PwC", src: "/images/slider/PwC.png" },
    { name: "TATA Consumer", src: "/images/slider/TATA-Consumer-logo.svg" },
];

export default function Slider() {
    // We double the items to create the infinite scroll effect
    const doubledItems = [...sliderItems, ...sliderItems];

    return (
        <div className="w-full relative py-12 overflow-hidden bg-white/5 backdrop-blur-md rounded-3xl  shadow-2xl">


            {/* Decorative gradients for edge fading */}
            <div className="absolute inset-y-0 left-0 w-40 bg-linear-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 bg-linear-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

            <div className="flex overflow-hidden group">
                <motion.div
                    className="flex gap-12 pr-12 items-center"
                    animate={{
                        x: [0, "-50%"],
                    }}
                    transition={{
                        duration: 25,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    style={{ width: "fit-content" }}
                    whileHover={{ transition: { duration: 50 } }} // Optional: Slow down on hover
                >
                    {doubledItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-40 h-20 relative hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 flex items-center justify-center"
                        >
                            <img
                                src={item.src}
                                alt={item.name}
                                className="max-w-full max-h-full object-contain filter drop-shadow-lg"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Subtle bottom accent */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-linear-to-r from-transparent via-orange-500/30 to-transparent" />
        </div>
    );
}
