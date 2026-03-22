"use client";

import React from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { Users, Database, Globe2, CheckCircle2 } from "lucide-react";

const stats = [
  {
    label: "Active Users",
    value: 1000,
    suffix: "+",
    icon: Users,
    description: "Trusting our scraping engine daily",
  },
  {
    label: "Data Points",
    value: 5,
    suffix: "M+",
    icon: Database,
    description: "Extracted across various sources",
  },
  {
    label: "Success Rate",
    value: 99.9,
    suffix: "%",
    decimals: 1,
    icon: CheckCircle2,
    description: "Reliable data extraction process",
  },
  {
    label: "Websites",
    value: 500,
    suffix: "+",
    icon: Globe2,
    description: "Supported e-commerce platforms",
  },
];

const CountSection = () => {
  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className=" px-4 sm:px-6 lg:px-8 hover:cursor-pointer   ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center flex flex-col items-center"
            >
              {/* Icon */}
              <div className="mb-6 p-4 rounded-2xl bg-primary-theme/5 text-primary-theme group-hover:bg-primary-theme group-hover:text-white transition-all duration-300">
                <stat.icon className="w-8 h-8" />
              </div>

              {/* Number */}
              <div className="text-4xl md:text-5xl font-black text-secondary-theme mb-2 tracking-tight">
                <CountUp
                  end={stat.value}
                  duration={2.5}
                  separator=","
                  decimals={stat.decimals || 0}
                  suffix={stat.suffix}
                  enableScrollSpy
                  scrollSpyOnce
                />
              </div>

              {/* Label */}
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {stat.label}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-md leading-relaxed max-w-[200px]">
                {stat.description}
              </p>

              {/* Bottom Decorative Line */}
              <div className="w-12 h-1 bg-primary-theme/20 rounded-full mt-6 group-hover:w-24 group-hover:bg-primary-theme transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountSection;
