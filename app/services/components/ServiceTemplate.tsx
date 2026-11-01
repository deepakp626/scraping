"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight, LucideIcon, Sliders, Package, Camera, TrendingDown, Clock, Database, Search, Sparkles, Globe, Tag, ShoppingBag } from "lucide-react";

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
    <main className="bg-white min-h-screen overflow-hidden text-slate-900">
      {/* Ambient background blobs */}
      <div className="-z-10 fixed inset-0 overflow-hidden pointer-events-none">
        <div className="top-[-10%] right-[-5%] absolute bg-primary-theme/5 blur-3xl rounded-full w-[40rem] h-[40rem]" />
        <div className="top-[40%] left-[-10%] absolute bg-gradient-end-color/5 blur-3xl rounded-full w-[35rem] h-[35rem]" />
        <div className="right-[10%] bottom-[5%] absolute bg-primary-theme/5 blur-3xl rounded-full w-[30rem] h-[30rem]" />
      </div>

      {/* ══ HERO SECTION ══════════════════════════════════════ */}
      <section className="z-10 relative px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="items-center gap-12 lg:gap-16 grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Text content */}
            <div className="flex flex-col justify-center">
              <h1 className="mb-6 font-black text-4xl sm:text-5xl xl:text-6xl leading-[1.1] tracking-tight">
                {heroTitlePrefix}{" "}
                <span className="bg-clip-text bg-gradient-to-r from-primary-theme to-gradient-end-color text-transparent">
                  {heroTitleHighlight}
                </span>{" "}
                {heroTitleSuffix}
              </h1>

              <p className="mb-8 max-w-xl text-slate-600 text-base sm:text-lg leading-relaxed">
                {heroDescription}
              </p>

              <ul className="gap-2.5 grid grid-cols-1 sm:grid-cols-2 mb-10">
                {heroHighlights.slice(0, 8).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-700 text-sm md:text-base">
                    <CheckCircle2 size={15} className="text-primary-theme shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={sampleDataLink}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-theme to-gradient-end-color hover:shadow-lg hover:shadow-primary-theme/25 px-6 py-3 rounded-xl font-bold text-white text-sm hover:scale-105 transition-all duration-300"
                >
                  {HeroCtaIcon && <HeroCtaIcon size={16} />}
                  Get Free Sample Data
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href={allServicesLink}
                  className="inline-flex items-center gap-2 bg-slate-50 hover:bg-primary-theme/5 px-6 py-3 border border-slate-200 hover:border-primary-theme/40 rounded-xl font-bold text-slate-700 text-sm transition-all duration-300"
                >
                  View All Services
                </Link>
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="relative flex justify-center items-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-theme/10 to-gradient-end-color/10 blur-2xl rounded-3xl scale-95" />
              <div className="relative shadow-slate-200/60 shadow-xl mx-auto border border-slate-200/80 rounded-3xl w-full max-w-lg overflow-hidden">
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
        <section className="z-10 relative bg-slate-50/60 px-4 sm:px-6 lg:px-8 py-10 border-slate-100 border-y">
          <div className="mx-auto max-w-5xl">
            <div className="gap-6 grid grid-cols-2 sm:grid-cols-4 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1">
                  <span className="mb-2 font-black text-3xl sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="font-semibold text-slate-500 text-xs sm:text-sm uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ ABOUT / EXPLANATION SECTION ═══════════════════════ */}
      <section className="z-10 relative bg-white px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 font-black text-slate-900 text-3xl sm:text-4xl text-center leading-tight">
            {aboutTitle}
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-slate-500 text-base sm:text-lg text-center leading-relaxed">
            {aboutDescription}
          </p>

          {aboutBulletPoints && aboutBulletPoints.length > 0 && (
            <ul className="gap-4 grid grid-cols-1 sm:grid-cols-2 mx-auto max-w-4xl">
              {aboutBulletPoints.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-slate-50 px-5 py-4 border border-slate-200 hover:border-primary-theme rounded-xl transition-colors"
                >
                  <span className="flex flex-shrink-0 justify-center items-center bg-primary-theme/10 mt-0.5 rounded-full w-5 h-5 font-bold text-primary-theme text-xs">
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
      <section className="bg-white bg-gradient-to-br from-primary-theme/5 to-gradient-end-color/5 px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="mb-6 font-black text-slate-900 text-2xl md:text-3xl lg:text-4xl text-center leading-tight">
          {dataFieldsTitle}
        </h2>
        {dataFieldsDescription && (
          <p className="mx-auto mb-10 max-w-3xl text-slate-500 text-base sm:text-lg text-center leading-relaxed">
            {dataFieldsDescription}
          </p>
        )}

        <div className="flex md:flex-row flex-col justify-center items-center gap-8 mx-auto max-w-6xl">
          {/* Left Fields Grid */}
          <div className="items-center gap-4 grid grid-cols-2 [&>*]:bg-white w-full md:w-1/3 text-center">
            {dataFieldsLeft.map((field, idx) => (
              <div key={idx} className="shadow-md p-2 border border-slate-100 rounded-lg hover:scale-105 transition-transform duration-300">
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
          <div className="items-center gap-4 grid grid-cols-2 [&>*]:bg-white w-full md:w-1/3 text-center">
            {dataFieldsRight.map((field, idx) => (
              <div key={idx} className="shadow-md p-2 border border-slate-100 rounded-lg hover:scale-105 transition-transform duration-300">
                {field}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ POWERFUL FEATURES ROWS SECTION ═══════════════════ */}
      {featureBlocks && featureBlocks.length > 0 && (
        <section className="bg-white py-10 md:py-20">
          <h2 className="mb-6 font-black text-slate-900 text-2xl md:text-3xl lg:text-4xl text-center leading-tight">
            {featuresSectionTitle}
          </h2>

          <div className="space-y-16 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {featureBlocks.map((block, idx) => {
              const isImageLeft = idx % 2 === 0;
              return (
                <div key={idx} className="mt-8 rounded-3xl overflow-hidden">
                  <div className={`flex flex-col ${isImageLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 px-6 py-12 md:px-12`}>
                    {/* Image Side */}
                    <div className="flex justify-center items-center w-full md:w-1/2">
                      <div className="relative w-full max-w-[500px]">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-theme/20 to-gradient-end-color/20 blur-2xl rounded-2xl scale-105" />
                        <Image
                          className="relative shadow-2xl shadow-primary-theme/10 mx-auto border border-white/80 rounded-2xl w-full h-auto object-cover"
                          alt={block.imageAlt}
                          src={block.image}
                          width={500}
                          height={500}
                        />
                      </div>
                    </div>

                    {/* Text Side */}
                    <div className="flex flex-col gap-5 w-full md:w-1/2">
                      <h3 className="font-black text-slate-900 text-2xl md:text-3xl lg:text-4xl leading-tight">
                        {block.title}
                      </h3>

                      <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
                        {block.description}
                      </p>

                      <ul className="space-y-3">
                        {block.bulletPoints.map((item) => (
                          <li key={item.title} className="flex items-start gap-3">
                            <span className="flex flex-shrink-0 justify-center items-center bg-primary-theme/10 mt-0.5 rounded-full w-5 h-5 font-bold text-primary-theme text-xs">
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
          <div className="mx-auto px-6 max-w-7xl">
            <h2 className="mb-12 font-bold text-4xl text-center">
              {benefitsTitle}
            </h2>

            <div className="items-center gap-12 grid lg:grid-cols-2">
              {/* Left Accordion */}
              <div>
                {benefits.map((item, index) => (
                  <div key={index} className="border-slate-100 border-b">
                    <button
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

              {/* Right Image */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-[500px]">
                  <Image
                    src={benefitsImage}
                    alt={benefitsImageAlt}
                    width={500}
                    height={500}
                    className="shadow-md border border-slate-100 rounded-lg w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ GRID FEATURES SECTION ═════════════════════════════ */}
      {gridFeatures && gridFeatures.length > 0 && (
        <section className="z-10 relative px-4 sm:px-6 lg:px-8 py-20 border-slate-50 border-t">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <h2 className="mb-4 font-black text-slate-900 text-3xl sm:text-4xl">
                {gridSectionTitle}
              </h2>
              <p className="mx-auto max-w-3xl text-slate-600 text-lg sm:text-xl text-center leading-relaxed">
                {gridSectionDescription}
              </p>
            </div>

            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {gridFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="group flex flex-col gap-4 bg-slate-50 shadow-sm p-6 border border-slate-200/80 hover:border-primary-theme/30 rounded-3xl transition-all hover:-translate-y-1 duration-300 cursor-pointer"
                  >
                    <div className="bg-primary-theme/5 group-hover:bg-primary-theme p-3 border border-primary-theme/10 rounded-xl w-fit text-primary-theme group-hover:text-white transition-all duration-300">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="mb-1.5 font-bold text-slate-900 group-hover:text-primary-theme text-lg sm:text-xl transition-colors">
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
        <section className="z-10 relative px-4 sm:px-6 lg:px-8 py-20 border-slate-100 border-t">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <h2 className="mb-4 font-black text-slate-900 text-3xl sm:text-4xl">
                {useCasesSectionTitle}
              </h2>
              <p className="mx-auto max-w-xl text-slate-600 text-lg sm:text-xl">
                {useCasesSectionDescription}
              </p>
            </div>

            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2">
              {useCases.map((uc) => {
                const Icon = uc.icon;
                return (
                  <div
                    key={uc.title}
                    className="group flex gap-5 bg-slate-50 hover:bg-white hover:shadow-md p-6 border border-slate-200/80 hover:border-primary-theme/30 rounded-3xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="bg-primary-theme/5 group-hover:bg-primary-theme p-3 border border-primary-theme/10 rounded-xl h-fit text-primary-theme group-hover:text-white transition-all duration-300 shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="mb-1.5 font-bold text-slate-900 group-hover:text-primary-theme text-lg sm:text-xl transition-colors">
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
        <section className="py-16 border-slate-100 border-t">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mx-auto mb-10 w-[80%] text-center">
              <h2 className="mb-4 font-black text-slate-900 text-3xl sm:text-4xl">
                {platformsSectionTitle}
              </h2>
              <p className="mx-auto max-w-xl text-slate-600 text-lg sm:text-xl">
                {platformsSectionDescription}
              </p>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 my-8">
              {platforms.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center hover:bg-white shadow-sm hover:shadow-md px-4 py-3 border-2 border-slate-200 hover:border-primary-theme/30 rounded-lg w-[11rem] h-[8rem] transition-all duration-300 cursor-pointer"
                >
                  <div className="relative flex justify-center items-center mb-3 w-12 h-12">
                    <Image
                      src={item.imagePath}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="font-semibold text-center">
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
