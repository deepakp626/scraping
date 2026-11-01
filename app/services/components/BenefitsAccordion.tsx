"use client";

import React, { useState } from "react";
import { BenefitItem } from "./ServiceTemplate";

interface BenefitsAccordionProps {
  benefits: BenefitItem[];
}

export default function BenefitsAccordion({ benefits }: BenefitsAccordionProps) {
  const [activeBenefit, setActiveBenefit] = useState<number>(0);

  if (!benefits || benefits.length === 0) return null;

  return (
    <div>
      {benefits.map((item, index) => (
        <div key={index} className="border-slate-100 border-b">
          <button
            type="button"
            onClick={() =>
              setActiveBenefit(activeBenefit === index ? -1 : index)
            }
            className="flex justify-between items-center py-5 outline-none focus:outline-none w-full text-left cursor-pointer"
          >
            <span className="font-semibold hover:text-primary-theme text-xl transition-colors">
              {item.title}
            </span>
            <span className="text-slate-400 text-2xl">
              {activeBenefit === index ? "−" : "+"}
            </span>
          </button>

          {activeBenefit === index && (
            <p className="pb-5 text-slate-600 text-base sm:text-lg leading-relaxed">
              {item.content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
