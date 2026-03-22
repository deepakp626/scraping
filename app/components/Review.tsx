'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Data Scientist at TechNova",
    content: "The scraping tools provided by this platform have revolutionized how we gather market intelligence. The AI capabilities are unmatched, saving us countless hours of manual data processing.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Lead Developer at DataFlow",
    content: "Integration was incredibly smooth. The APIs are well-documented and the support team is exceptionally responsive. Easily the best data extraction service we've used.",
    avatar: "https://i.pravatar.cc/150?u=michael",
    rating: 3
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Marketing Director at GrowthOps",
    content: "We've seen a 300% increase in our lead generation efficiency since switching to these customized scrapers. The reliability and accuracy of the data is phenomenal.",
    avatar: "https://i.pravatar.cc/150?u=elena",
    rating: 5
  },
  {
    id: 4,
    name: "David Smith",
    role: "Founder at AnalyticsPro",
    content: "What impressed me most was the ability to handle complex dynamic websites without writing custom scripts. The visual interface is brilliant and intuitive.",
    avatar: "https://i.pravatar.cc/150?u=david",
    rating: 4
  }
];

const Review = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Stylings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-primary-theme/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 relative z-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Loved by <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-theme to-primary-light-theme">Developers</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            See what industry leaders are saying about our enterprise-grade data extraction and automation tools.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto z-20">
          {/* Slider Container */}
          <div className="relative h-[400px] md:h-[300px] w-full flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute w-full px-4 md:px-12"
              >
                <div className="bg-background/50 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl flex flex-col items-center text-center shadow-2xl relative">
                  <Quote className="absolute top-6 left-8 text-primary-theme/20" size={60} />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={20} 
                        className={i < reviews[currentIndex].rating ? "fill-primary-theme text-primary-theme" : "text-slate-600"} 
                      />
                    ))}
                  </div>

                  <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-8 relative z-10 font-medium italic">
                    "{reviews[currentIndex].content}"
                  </p>

                  <div className="flex items-center gap-4">
                    <img 
                      src={reviews[currentIndex].avatar} 
                      alt={reviews[currentIndex].name} 
                      className="w-12 h-12 rounded-full ring-2 ring-primary-theme/50"
                    />
                    <div className="text-left">
                      <h4 className="text-white font-bold">{reviews[currentIndex].name}</h4>
                      <p className="text-slate-400 text-sm">{reviews[currentIndex].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 mt-12 relative z-20">
            <button 
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary-theme/20 hover:border-primary-theme/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary-theme"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-3">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex 
                      ? 'w-8 h-2.5 bg-primary-theme' 
                      : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary-theme/20 hover:border-primary-theme/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary-theme"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;