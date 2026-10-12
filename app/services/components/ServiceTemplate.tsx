"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, LucideIcon } from "lucide-react";

export interface StatItem {
  value: string;
  label: string;
}

export interface FeatureBlock {
  title: React.ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  bulletPoints: {
    title: string;
    desc: string;
  }[];
}

export interface BenefitItem {
  title: string;
  content: string;
}

export interface GridFeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface UseCaseItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface PlatformItem {
  imagePath: string;
  name: string;
}

export interface ServiceTemplateProps {
  // Hero section
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroTitleSuffix?: string;
  heroDescription: string;
  heroHighlights: string[];
  heroImage: string;
  heroImageAlt: string;
  heroCtaIcon?: LucideIcon;
  sampleDataLink?: string;
  allServicesLink?: string;

  // Stats section
  stats: StatItem[];

  // About/Explanation section
  aboutTitle: React.ReactNode;
  aboutDescription: string;
  aboutBulletPoints: string[];

  // Detailed Compilation of Data Fields
  dataFieldsTitle?: string;
  dataFieldsDescription?: string;
  dataFieldsImage: string;
  dataFieldsLeft: string[];
  dataFieldsRight: string[];

  // Powerful Features section
  featuresSectionTitle: string;
  featureBlocks: FeatureBlock[];

  // Benefits section
  benefitsTitle: string;
  benefits: BenefitItem[];
  benefitsImage: string;
  benefitsImageAlt?: string;

  // Everything You Need section (Grid)
  gridSectionTitle: React.ReactNode;
  gridSectionDescription: string;
  gridFeatures: GridFeatureItem[];

  // Popular Use Cases section
  useCasesSectionTitle: React.ReactNode;
  useCasesSectionDescription: string;
  useCases: UseCaseItem[];

  // Platforms section
  platformsSectionTitle: string;
  platformsSectionDescription: string;
  platforms: PlatformItem[];
}

export default function ServiceTemplate({
  heroTitlePrefix,
  heroTitleHighlight,
  heroTitleSuffix = "",
  heroDescription,
  heroHighlights,
  heroImage,
  heroImageAlt,
  heroCtaIcon: HeroCtaIcon,
  sampleDataLink = "/contact",
  allServicesLink = "/services",
  stats,
  aboutTitle,
  aboutDescription,
  aboutBulletPoints,
  dataFieldsTitle = "Detailed Compilation of Data Fields",
  dataFieldsDescription,
  dataFieldsImage,
  dataFieldsLeft,
  dataFieldsRight,
  featuresSectionTitle,
  featureBlocks,
  benefitsTitle,
  benefits,
  benefitsImage,
  benefitsImageAlt = "Benefits illustration",
  gridSectionTitle,
  gridSectionDescription,
  gridFeatures,
  useCasesSectionTitle,
  useCasesSectionDescription,
  useCases,
  platformsSectionTitle,
  platformsSectionDescription,
  platforms,
}: ServiceTemplateProps) {
  const [activeBenefit, setActiveBenefit] = useState(0);

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* Ambient background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] rounded-full bg-primary-theme/5 blur-3xl" />
        <div className="absolute top-[40%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-gradient-end-color/5 blur-3xl" />
        <div className="absolute bottom-[5%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-primary-theme/5 blur-3xl" />
      </div>

      {/* ══ HERO SECTION ══════════════════════════════════════ */}
      <section className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1] mb-6">
                {heroTitlePrefix}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-theme to-gradient-end-color">
                  {heroTitleHighlight}
                </span>{" "}
                {heroTitleSuffix}
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                {heroDescription}
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-10">
                {heroHighlights.slice(0, 8).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm md:text-base text-slate-700">
                    <CheckCircle2 size={15} className="text-primary-theme shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={sampleDataLink}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-theme to-gradient-end-color text-white font-bold text-sm hover:scale-105 hover:shadow-lg hover:shadow-primary-theme/25 transition-all duration-300"
                >
                  {HeroCtaIcon && <HeroCtaIcon size={16} />}
                  Get Free Sample Data
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href={allServicesLink}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-bold text-sm hover:border-primary-theme/40 hover:bg-primary-theme/5 transition-all duration-300"
                >
                  View All Services
                </Link>
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-theme/10 to-gradient-end-color/10 blur-2xl scale-95" />
              <div className="relative w-full max-w-lg mx-auto rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl shadow-slate-200/60">
                <Image
                  src={heroImage}
                  alt={heroImageAlt}
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ════════════════════════════════════════ */}
      {stats && stats.length > 0 && (
        <section className="relative z-10 border-y border-slate-100 bg-slate-50/60 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1">
                  <span className="text-3xl sm:text-4xl font-black mb-2">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ ABOUT / EXPLANATION SECTION ═══════════════════════ */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 text-center mb-6 leading-tight">
            {aboutTitle}
          </h2>

          <p className="text-slate-500 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-10">
            {aboutDescription}
          </p>

          {aboutBulletPoints && aboutBulletPoints.length > 0 && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {aboutBulletPoints.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 hover:border-primary-theme transition-colors"
                >
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary-theme/10 flex items-center justify-center text-primary-theme text-xs font-bold">
                    ✓
                  </span>
                  <span className="text-slate-600 text-sm sm:text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ══ DATA FIELDS COMPILATION SECTION ═══════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white bg-gradient-to-br from-primary-theme/5 to-gradient-end-color/5">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 text-center mb-6 leading-tight">
          {dataFieldsTitle}
        </h2>
        {dataFieldsDescription && (
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed text-center max-w-3xl mx-auto mb-10">
            {dataFieldsDescription}
          </p>
        )}

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-6xl mx-auto">
          {/* Left Fields Grid */}
          <div className="grid items-center grid-cols-2 gap-4 text-center [&>*]:bg-white w-full md:w-1/3">
            {dataFieldsLeft.map((field, idx) => (
              <div key={idx} className="p-2 rounded-lg shadow-md border border-slate-100 hover:scale-105 transition-transform duration-300">
                {field}
              </div>
            ))}
          </div>

          {/* Center Mockup Image */}
          <div className="flex justify-center w-full md:w-1/3 max-w-xs md:max-w-sm">
            <Image
              alt={dataFieldsTitle}
              src={dataFieldsImage}
              width={400}
              height={400}
              className="object-contain"
            />
          </div>

          {/* Right Fields Grid */}
          <div className="grid items-center grid-cols-2 gap-4 text-center [&>*]:bg-white w-full md:w-1/3">
            {dataFieldsRight.map((field, idx) => (
              <div key={idx} className="p-2 rounded-lg shadow-md border border-slate-100 hover:scale-105 transition-transform duration-300">
                {field}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ POWERFUL FEATURES ROWS SECTION ═══════════════════ */}
      {featureBlocks && featureBlocks.length > 0 && (
        <section className="py-10 md:py-20 bg-white">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 text-center mb-6 leading-tight">
            {featuresSectionTitle}
          </h2>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {featureBlocks.map((block, idx) => {
              const isImageLeft = idx % 2 === 0;
              return (
                <div key={idx} className="mt-8 rounded-3xl overflow-hidden">
                  <div className={`flex flex-col ${isImageLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 px-6 py-12 md:px-12`}>
                    {/* Image Side */}
                    <div className="w-full md:w-1/2 flex items-center justify-center">
                      <div className="relative w-full max-w-[500px]">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-theme/20 to-gradient-end-color/20 blur-2xl scale-105" />
                        <Image
                          className="relative mx-auto rounded-2xl shadow-2xl shadow-primary-theme/10 border border-white/80 object-cover w-full h-auto"
                          alt={block.imageAlt}
                          src={block.image}
                          width={500}
                          height={500}
                        />
                      </div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full md:w-1/2 flex flex-col gap-5">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                        {block.title}
                      </h3>

                      <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
                        {block.description}
                      </p>

                      <ul className="space-y-3">
                        {block.bulletPoints.map((item) => (
                          <li key={item.title} className="flex items-start gap-3">
                            <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-primary-theme/10 flex items-center justify-center text-primary-theme text-xs font-bold">
                              ✓
                            </span>
                            <span className="text-slate-600 text-sm sm:text-base leading-relaxed">
                              <span className="font-bold text-slate-800">{item.title}: </span>
                              {item.desc}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ══ BENEFITS TAB SECTION ══════════════════════════════ */}
      {benefits && benefits.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">
              {benefitsTitle}
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Accordion */}
              <div>
                {benefits.map((item, index) => (
                  <div key={index} className="border-b border-slate-100">
                    <button
                      onClick={() =>
                        setActiveBenefit(activeBenefit === index ? -1 : index)
                      }
                      className="w-full flex items-center justify-between py-5 text-left cursor-pointer outline-none focus:outline-none"
                    >
                      <span className="text-xl font-semibold hover:text-primary-theme transition-colors">
                        {item.title}
                      </span>
                      <span className="text-2xl text-slate-400">
                        {activeBenefit === index ? "−" : "+"}
                      </span>
                    </button>

                    {activeBenefit === index && (
                      <p className="pb-5 text-base sm:text-lg text-slate-600 leading-relaxed">
                        {item.content}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Image */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px]">
                  <Image
                    src={benefitsImage}
                    alt={benefitsImageAlt}
                    width={500}
                    height={500}
                    className="rounded-lg object-cover w-full h-auto border border-slate-100 shadow-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ GRID FEATURES SECTION ═════════════════════════════ */}
      {gridFeatures && gridFeatures.length > 0 && (
        <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
                {gridSectionTitle}
              </h2>
              <p className="text-slate-600 text-lg sm:text-xl leading-relaxed text-center max-w-3xl mx-auto">
                {gridSectionDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="group flex flex-col gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-primary-theme/30 hover:-translate-y-1 transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    <div className="p-3 w-fit rounded-xl bg-primary-theme/5 border border-primary-theme/10 text-primary-theme group-hover:bg-primary-theme group-hover:text-white transition-all duration-300">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5 group-hover:text-primary-theme transition-colors">
                        {feat.title}
                      </h3>
                      <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ USE CASES SECTION ════════════════════════════════ */}
      {useCases && useCases.length > 0 && (
        <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
                {useCasesSectionTitle}
              </h2>
              <p className="text-slate-600 text-lg sm:text-xl max-w-xl mx-auto">
                {useCasesSectionDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {useCases.map((uc) => {
                const Icon = uc.icon;
                return (
                  <div
                    key={uc.title}
                    className="group flex gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-primary-theme/30 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="shrink-0 p-3 rounded-xl bg-primary-theme/5 border border-primary-theme/10 text-primary-theme h-fit group-hover:bg-primary-theme group-hover:text-white transition-all duration-300">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5 group-hover:text-primary-theme transition-colors">
                        {uc.title}
                      </h3>
                      <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                        {uc.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══ BRAND / PLATFORMS SECTION ═════════════════════════ */}
      {platforms && platforms.length > 0 && (
        <section className="border-t border-slate-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-[80%] mx-auto mb-10 text-center">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
                {platformsSectionTitle}
              </h2>
              <p className="text-slate-600 text-lg sm:text-xl max-w-xl mx-auto">
                {platformsSectionDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 justify-center items-center my-8">
              {platforms.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center border-2 border-slate-200 rounded-lg shadow-sm px-4 py-3 hover:border-primary-theme/30 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer w-[11rem] h-[8rem]"
                >
                  <div className="mb-3 relative w-12 h-12 flex items-center justify-center">
                    <Image
                      src={item.imagePath}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center font-semibold ">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
