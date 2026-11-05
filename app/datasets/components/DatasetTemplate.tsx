'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Database,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Headphones,
  FileSpreadsheet,
  FileCode,
  Copy,
  Check,
  Compass,
  Server,
  Wrench,
  BookOpen,
  ExternalLink,
  LucideIcon
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   TYPES & INTERFACES FOR REUSABLE DATASET TEMPLATE
───────────────────────────────────────────────────────────── */

export interface DatasetBreadcrumb {
  label: string;
  href?: string;
}

export interface DatasetStatItem {
  label: string;
  value: string;
  subtext: string;
}

export interface DatasetMetaItem {
  label: string;
  value: string;
  isHighlight?: boolean;
}

export interface DataDictionaryField {
  name: string;
  type: string;
  desc: string;
}

export interface DataDictionaryGroup {
  title: string;
  desc: string;
  fields: DataDictionaryField[];
}

export interface SiblingDataset {
  name: string;
  slug: string;
  desc: string;
  icon: LucideIcon;
  badge: string;
  active?: boolean;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface DatasetTemplateProps {
  // Breadcrumbs
  breadcrumbs?: DatasetBreadcrumb[];

  // Hub Announcement Banner
  hubBannerText?: string;
  hubServiceLink?: string;
  hubServiceLinkLabel?: string;

  // Hero Section
  badgeText: string;
  badgeSubtext?: string;
  title: string;
  description: string;
  featurePoints?: string[];
  requestSampleLink?: string;
  requestSampleLabel?: string;
  schemaAnchorId?: string;
  customPipelineLink?: string;
  customPipelineLabel?: string;

  // Right Snapshot Card
  overviewCardTitle: string;
  liveBadgeText?: string;
  stats: DatasetStatItem[];
  metadataItems: DatasetMetaItem[];
  specialistCtaLabel?: string;
  specialistCtaLink?: string;

  // Interactive Sample Preview
  sampleSectionOverline?: string;
  sampleSectionTitle?: string;
  sampleSectionDescription?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonSample: any;
  csvSample: string;
  jsonFilename?: string;
  csvFilename?: string;
  sampleRecordCount?: string;

  // Data Dictionary Section
  dictionarySectionOverline?: string;
  dictionarySectionTitle?: string;
  dictionarySectionDescription?: string;
  attributeGroups: DataDictionaryGroup[];

  // Sibling Datasets Section
  siblingCategoryOverline?: string;
  siblingSectionTitle?: string;
  siblingSectionDescription?: string;
  siblingViewAllLink?: string;
  siblingViewAllLabel?: string;
  siblingDatasets: SiblingDataset[];

  // Explore More Section (Services, Tools, Blog)
  showExploreMore?: boolean;

  // FAQ Section
  faqSectionOverline?: string;
  faqSectionTitle?: string;
  faqSectionDescription?: string;
  faqs: FAQItem[];
}

/* ─────────────────────────────────────────────────────────────
   DEFAULT DATA FOR "EXPLORE MORE" BLOCK
───────────────────────────────────────────────────────────── */
const defaultExploreCards = [
  {
    type: 'service',
    badge: 'Primary Conversion Path',
    icon: Server,
    iconColor: 'bg-orange-100 text-primary-theme',
    title: 'Custom Web Scraping Services',
    description:
      'Need a bespoke continuous pipeline without worrying about rotating proxies, CAPTCHA solvers, bot detection, or schema changes? CompilePilot builds and maintains fully managed web scraping pipelines for enterprises worldwide.',
    highlights: [
      'Custom Marketplace Scrapers',
      'Real-time API & Webhook Notifications',
      '99.9% Extraction Uptime Guarantee'
    ],
    ctaText: 'Explore Scraping Services',
    ctaLink: '/services',
    subLinkText: 'View All 16+ Scraping Services →',
    subLinkHref: '/services',
    borderClass: 'border-2 border-primary-theme/30 hover:border-primary-theme'
  },
  {
    type: 'tool',
    icon: Wrench,
    iconColor: 'bg-sky-100 text-sky-600',
    title: 'Dataset & File Conversion Tools',
    description:
      'Transform, format, convert, and manage your downloaded dataset files with CompilePilot\'s free browser-based utilities. Convert CSV to Excel, split massive datasets, merge PDF reports, and extract structured text instantly.',
    highlights: [
      'CSV to Excel & Excel to CSV Converters',
      'Large File Splitters & Mergers',
      '100% Free & Client-Side Secure'
    ],
    ctaText: 'Explore Developer Tools',
    ctaLink: '/tools',
    borderClass: 'border border-slate-200 hover:border-slate-300'
  },
  {
    type: 'blog',
    icon: BookOpen,
    iconColor: 'bg-purple-100 text-purple-600',
    title: 'Engineering & Market Insights',
    description:
      'Stay ahead with our expert tutorials, benchmark reports, and data extraction methodologies. Learn how top brands track competitor catalogs, analyze price elasticity, and avoid anti-scraping blocks.',
    highlights: [
      'Catalog Scraping Best Practices',
      'Price Intelligence & Dynamic Repricing',
      'Web Scraping Legal & Compliance Guides'
    ],
    ctaText: 'Read CompilePilot Blog',
    ctaLink: '/blog',
    borderClass: 'border border-slate-200 hover:border-slate-300'
  }
];

export default function DatasetTemplate({
  breadcrumbs = [],
  hubBannerText = 'Datasets Discovery Hub: Browse verified catalog schemas, download samples, and explore cross-industry data feeds.',
  hubServiceLink = '/services/ecommerce-data-scraping',
  hubServiceLinkLabel = 'Custom Scraping Services',

  badgeText,
  badgeSubtext,
  title,
  description,
  featurePoints = [],
  requestSampleLink = '/contact',
  requestSampleLabel = 'Request Dataset Sample',
  schemaAnchorId = 'data-dictionary',
  customPipelineLink = '/services/ecommerce-data-scraping',
  customPipelineLabel = 'Need Custom Scraping Pipeline?',

  overviewCardTitle,
  liveBadgeText = 'Live Feed',
  stats,
  metadataItems,
  specialistCtaLabel = 'Talk to a Data Specialist',
  specialistCtaLink = '/contact',

  sampleSectionOverline = 'Live Data Sample',
  sampleSectionTitle = 'Explore the Dataset Schema',
  sampleSectionDescription = 'Review actual structured records delivered in our dataset. Every field is cleaned, typed, and normalized for direct loading into your business intelligence tools or ML pipelines.',
  jsonSample,
  csvSample,
  jsonFilename = 'dataset_sample.json',
  csvFilename = 'dataset_sample.csv',
  sampleRecordCount = '2 / 500M+ Records',

  dictionarySectionOverline = 'Data Dictionary',
  dictionarySectionTitle = 'Available Data Points & Field Specifications',
  dictionarySectionDescription = 'Every listing contains deep attributes parsed, validated, and normalized for instant analysis. You can request all fields or a tailored subset matching your schema.',
  attributeGroups,

  siblingCategoryOverline = 'Related Datasets',
  siblingSectionTitle = 'Explore Sibling Datasets',
  siblingSectionDescription = 'Complement your intelligence with specialized datasets targeting reviews, historical pricing, seller profiles, and inventory velocity.',
  siblingViewAllLink,
  siblingViewAllLabel = 'View All Datasets',
  siblingDatasets,

  showExploreMore = true,

  faqSectionOverline = 'Questions & Answers',
  faqSectionTitle = 'Frequently Asked Questions',
  faqSectionDescription = 'Learn more about our data collection methodology, licensing, accuracy guarantees, and delivery pipelines.',
  faqs
}: DatasetTemplateProps) {
  const [activeTab, setActiveTab] = useState<'json' | 'csv'>('json');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopy = () => {
    const textToCopy = activeTab === 'json' ? JSON.stringify(jsonSample, null, 2) : csvSample;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen text-slate-900">
      
      {/* ─────────────────────────────────────────────────────────────
          BREADCRUMBS (Responsive Font & Padding)
      ───────────────────────────────────────────────────────────── */}
      {breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="bg-slate-50/70 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-slate-500">
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-slate-400">/</span>}
                    {isLast ? (
                      <li className="font-semibold text-primary-theme truncate" aria-current="page">
                        {crumb.label}
                      </li>
                    ) : (
                      <li>
                        <Link
                          href={crumb.href || '/'}
                          className="hover:text-primary-theme transition-colors"
                        >
                          {crumb.label}
                        </Link>
                      </li>
                    )}
                  </React.Fragment>
                );
              })}
            </ol>
          </div>
        </nav>
      )}

      {/* ─────────────────────────────────────────────────────────────
          DISCOVERY HUB CALLOUT BANNER (Responsive Font & Layout)
      ───────────────────────────────────────────────────────────── */}
      {hubBannerText && (
        <section className="bg-orange-50/70 px-4 py-3 sm:py-3.5 border-b border-orange-200/60 text-slate-700 text-xs sm:text-sm">
          <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-2.5 sm:gap-3 mx-auto max-w-7xl">
            <div className="flex items-center gap-2">
              <span className="bg-orange-100 p-1 sm:p-1.5 rounded-md text-primary-theme shrink-0">
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </span>
              <span className="leading-snug">
                <strong className="font-semibold text-slate-900">Datasets Discovery Hub:</strong>{' '}
                {hubBannerText.replace(/^Datasets Discovery Hub:\s*/, '')}
              </span>
            </div>
            {hubServiceLink && (
              <div className="flex items-center gap-2 sm:gap-3 shrink-0 pt-1 sm:pt-0">
                <span className="hidden md:inline text-xs text-slate-500">Primary Conversion Path:</span>
                <Link
                  href={hubServiceLink}
                  className="inline-flex items-center gap-1 font-semibold text-primary-theme hover:underline text-xs sm:text-sm"
                >
                  <span>{hubServiceLinkLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION (Fluid Typography for Mobile, Tablet & Desktop)
      ───────────────────────────────────────────────────────────── */}
      <header className="relative bg-white pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 border-b border-slate-100 overflow-hidden">
        <div className="top-0 right-1/4 -z-10 absolute bg-orange-100/60 blur-3xl rounded-full w-72 h-72 pointer-events-none" />
        <div className="top-1/3 left-10 -z-10 absolute bg-red-100/50 blur-3xl rounded-full w-64 h-64 pointer-events-none" />

        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="items-center gap-8 sm:gap-10 lg:gap-12 grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6 lg:col-span-7">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-orange-50 px-3 sm:px-3.5 py-1.5 border border-orange-200/80 rounded-full font-semibold text-primary-theme text-xs sm:text-sm tracking-wide">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-theme animate-pulse" />
                <span>{badgeText}</span>
                {badgeSubtext && (
                  <>
                    <span className="hidden sm:inline text-slate-400">•</span>
                    <span className="hidden sm:inline font-normal text-slate-600">{badgeSubtext}</span>
                  </>
                )}
              </div>

              {/* H1 Heading */}
              <h1 className="font-extrabold text-slate-900 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.2] sm:leading-[1.18] tracking-tight">
                {title}
              </h1>

              {/* Descriptive Intro */}
              <p className="max-w-2xl text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">
                {description}
              </p>

              {/* Feature Points */}
              {featurePoints.length > 0 && (
                <div className="gap-2.5 sm:gap-3 grid grid-cols-2 sm:grid-cols-3 pt-1 sm:pt-2">
                  {featurePoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 font-medium text-slate-700 text-xs sm:text-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">{point}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
                <Link
                  href={requestSampleLink}
                  id="btn-request-sample"
                  className="inline-flex justify-center items-center gap-2 bg-linear-to-r from-primary-theme to-gradient-end-color shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold text-white text-xs sm:text-sm md:text-base hover:scale-[1.02] active:scale-[0.99] transition-all duration-200"
                >
                  <Database className="w-4 h-4" />
                  <span>{requestSampleLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {schemaAnchorId && (
                  <a
                    href={`#${schemaAnchorId}`}
                    className="inline-flex justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200/80 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-medium text-slate-800 text-xs sm:text-sm md:text-base transition-colors duration-150"
                  >
                    <span>View Schema Fields</span>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </a>
                )}

                {customPipelineLink && (
                  <Link
                    href={customPipelineLink}
                    className="inline-flex items-center gap-1.5 font-bold text-primary-theme hover:text-gradient-end-color text-xs sm:text-sm transition-colors"
                  >
                    <Server className="w-4 h-4" />
                    <span>{customPipelineLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

            </div>

            {/* Right Card: Snapshot & Metrics */}
            <div className="lg:col-span-5">
              <div className="relative bg-white shadow-slate-100 shadow-xl p-5 sm:p-7 border border-slate-200 rounded-2xl overflow-hidden">
                <div className="flex justify-between items-center pb-4 sm:pb-5 border-b border-slate-100">
                  <div>
                    <span className="font-semibold text-slate-400 text-[11px] sm:text-xs uppercase tracking-wider">
                      Dataset Overview
                    </span>
                    <h3 className="mt-0.5 font-bold text-slate-900 text-lg sm:text-xl">
                      {overviewCardTitle}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-emerald-50 px-2.5 sm:px-3 py-1 border border-emerald-200 rounded-full font-semibold text-emerald-700 text-xs">
                    <span className="bg-emerald-500 rounded-full w-2 h-2 animate-pulse" />
                    {liveBadgeText}
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="gap-3 sm:gap-4 grid grid-cols-2 py-4 sm:py-5 border-b border-slate-100">
                  {stats.map((stat, sIdx) => (
                    <div key={sIdx} className="bg-slate-50/80 p-3 sm:p-3.5 border border-slate-100 rounded-xl">
                      <span className="block mb-0.5 sm:mb-1 text-slate-500 text-[11px] sm:text-xs font-medium">
                        {stat.label}
                      </span>
                      <span className="font-extrabold text-slate-900 text-xl sm:text-2xl md:text-3xl leading-none">
                        {stat.value}
                      </span>
                      <span className="block mt-1 text-[10px] sm:text-[11px] text-slate-400">
                        {stat.subtext}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Metadata List */}
                <div className="space-y-2 sm:space-y-2.5 pt-4 sm:pt-5 text-xs sm:text-sm text-slate-600">
                  {metadataItems.map((item, mIdx) => (
                    <div key={mIdx} className="flex justify-between items-center">
                      <span className="text-slate-500">{item.label}:</span>
                      <span
                        className={`font-semibold ${
                          item.isHighlight ? 'text-emerald-700' : 'text-slate-800'
                        }`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Specialist Action */}
                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-100">
                  <Link
                    href={specialistCtaLink}
                    className="inline-flex justify-center items-center gap-2 hover:bg-orange-50 px-4 py-3 border border-primary-theme rounded-xl w-full font-semibold text-primary-theme text-xs sm:text-sm transition-colors"
                  >
                    <Headphones className="w-4 h-4" />
                    <span>{specialistCtaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: INTERACTIVE SAMPLE DATA PREVIEW
      ───────────────────────────────────────────────────────────── */}
      <section id="sample-preview" className="bg-slate-50/70 py-10 sm:py-14 border-b border-slate-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex md:flex-row flex-col justify-between md:items-end gap-4 mb-6 sm:mb-8">
            <div>
              <span className="font-bold text-primary-theme text-[11px] sm:text-xs uppercase tracking-wider">
                {sampleSectionOverline}
              </span>
              <h2 className="mt-1 font-extrabold text-slate-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                {sampleSectionTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                {sampleSectionDescription}
              </p>
            </div>

            {/* Format toggle & copy button */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              <div className="inline-flex bg-slate-200/80 p-1 border border-slate-300 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveTab('json')}
                  className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'json'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-primary-theme" />
                  <span>JSON Format</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('csv')}
                  className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'csv'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CSV Format</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 shadow-xs px-3 sm:px-3.5 py-2 border border-slate-300 rounded-xl font-semibold text-slate-700 text-xs transition-colors cursor-pointer"
                title="Copy sample snippet"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Viewer Block */}
          <div className="bg-[#0b1120] shadow-2xl border border-slate-800 rounded-2xl overflow-hidden text-slate-200">
            <div className="flex justify-between items-center bg-[#0f172a] px-4 sm:px-5 py-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="inline-block bg-rose-500 rounded-full w-2.5 sm:w-3 h-2.5 sm:h-3" />
                <span className="inline-block bg-amber-500 rounded-full w-2.5 sm:w-3 h-2.5 sm:h-3" />
                <span className="inline-block bg-emerald-500 rounded-full w-2.5 sm:w-3 h-2.5 sm:h-3" />
                <span className="ml-2 sm:ml-3 font-mono text-slate-400 text-xs sm:text-sm">
                  {activeTab === 'json' ? jsonFilename : csvFilename}
                </span>
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-slate-400">
                {sampleRecordCount}
              </span>
            </div>

            <div className="p-4 sm:p-5 max-h-96 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed">
              <pre className="text-slate-300">
                {activeTab === 'json' ? JSON.stringify(jsonSample, null, 2) : csvSample}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: COMPLETE DATA DICTIONARY & ATTRIBUTES
      ───────────────────────────────────────────────────────────── */}
      <section id={schemaAnchorId} className="bg-white py-12 sm:py-16 border-b border-slate-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <div className="mx-auto mb-10 sm:mb-14 max-w-3xl text-center">
            <span className="font-bold text-primary-theme text-[11px] sm:text-xs uppercase tracking-wider">
              {dictionarySectionOverline}
            </span>
            <h2 className="mt-1.5 sm:mt-2 font-extrabold text-slate-900 text-2xl sm:text-3xl lg:text-4xl tracking-tight">
              {dictionarySectionTitle}
            </h2>
            <p className="mt-2.5 sm:mt-3 text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
              {dictionarySectionDescription}
            </p>
          </div>

          <div className="gap-5 sm:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {attributeGroups.map((group, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between bg-white hover:shadow-lg p-5 sm:p-6 border border-slate-200 hover:border-primary-theme/50 rounded-2xl transition-all duration-200"
              >
                <div>
                  <h3 className="flex items-center gap-2 mb-2 font-bold text-slate-900 text-base sm:text-lg ">
                    {group.title}
                  </h3>
                  <p className="mb-4 pb-3 border-b border-slate-100 text-slate-500 text-xs sm:text-base leading-normal">
                    {group.desc}
                  </p>

                  <ul className="space-y-3">
                    {group.fields.map((field, fIdx) => (
                      <li key={fIdx} className="text-xs sm:text-sm">
                        <div className="flex justify-between items-center font-semibold text-slate-800">
                          <span>{field.name}</span>
                          <span className="bg-slate-100 px-2 py-0.5 rounded-md font-mono text-[12px] sm:text-xs text-slate-600">
                            {field.type}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] sm:text-sm text-slate-500 leading-snug">
                          {field.desc}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 text-right">
                  <span className="font-semibold text-[11px] sm:text-xs text-primary-theme">
                    {group.fields.length} Verified Attributes
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SIBLING DATASETS SECTION
      ───────────────────────────────────────────────────────────── */}
      {siblingDatasets.length > 0 && (
        <section className="bg-slate-50/60 py-12 sm:py-16 border-b border-slate-200">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            
            <div className="flex md:flex-row flex-col justify-between md:items-end gap-3 sm:gap-4 mb-8 sm:mb-10">
              <div>
                <span className="font-bold text-primary-theme text-[11px] sm:text-xs uppercase tracking-wider">
                  {siblingCategoryOverline}
                </span>
                <h2 className="mt-1 font-extrabold text-slate-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
                  {siblingSectionTitle}
                </h2>
                <p className="mt-2 max-w-2xl text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  {siblingSectionDescription}
                </p>
              </div>
              {siblingViewAllLink && (
                <Link
                  href={siblingViewAllLink}
                  className="inline-flex items-center gap-1.5 font-semibold text-primary-theme text-xs sm:text-sm hover:underline shrink-0"
                >
                  <span>{siblingViewAllLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
              )}
            </div>

            <div className="gap-4 sm:gap-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {siblingDatasets.map((ds) => {
                const IconComp = ds.icon;
                return (
                  <Link
                    key={ds.name}
                    href={ds.slug}
                    className={`group relative rounded-2xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between ${
                      ds.active
                        ? 'bg-orange-50/50 border-primary-theme ring-2 ring-primary-theme/20 shadow-md'
                        : 'bg-white border-slate-200 hover:border-primary-theme/60 hover:shadow-lg'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div className={`w-9 sm:w-10 h-9 sm:h-10 rounded-xl flex items-center justify-center ${
                          ds.active ? 'bg-primary-theme text-white' : 'bg-orange-50 text-primary-theme group-hover:bg-primary-theme group-hover:text-white'
                        } transition-colors`}>
                          <IconComp size={18} />
                        </div>
                        <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          ds.active
                            ? 'bg-primary-theme text-white'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-orange-100 group-hover:text-primary-theme'
                        }`}>
                          {ds.badge}
                        </span>
                      </div>

                      <h3 className="mb-1 font-bold text-slate-900 group-hover:text-primary-theme text-sm sm:text-lg transition-colors">
                        {ds.name}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-base line-clamp-3 leading-relaxed">
                        {ds.desc}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100 font-semibold text-primary-theme text-xs sm:text-sm">
                      <span>{ds.active ? 'Viewing Now' : 'Explore Dataset'}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION: EXPLORE MORE (SERVICES, TOOLS, BLOGS)
      ───────────────────────────────────────────────────────────── */}
      {showExploreMore && (
        <section className="bg-slate-50/80 py-14 sm:py-20 border-b border-slate-200">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            
            <div className="mx-auto mb-10 sm:mb-14 max-w-3xl text-center">
              <span className="font-bold text-primary-theme text-[11px] sm:text-xs uppercase tracking-wider">
                03. Explore More
              </span>
              <h2 className="mt-1.5 sm:mt-2 font-extrabold text-slate-900 text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                Comprehensive Scraping Services, Tools & Engineering Guides
              </h2>
              <p className="mt-2.5 sm:mt-3 text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                Extend your data workflow with our full-stack web scraping solutions, free file utilities, and data science articles.
              </p>
            </div>

            <div className="gap-6 sm:gap-8 grid grid-cols-1 lg:grid-cols-3">
              {defaultExploreCards.map((card, cIdx) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={cIdx}
                    className={`relative flex flex-col justify-between bg-white shadow-sm hover:shadow-xl p-6 sm:p-7 rounded-2xl overflow-hidden transition-all duration-300 ${card.borderClass}`}
                  >
                    {card.badge && (
                      <div className="top-0 right-0 absolute bg-primary-theme shadow-xs px-3 py-0.5 sm:py-1 rounded-bl-xl font-bold text-[10px] sm:text-[11px] text-white uppercase tracking-wider">
                        {card.badge}
                      </div>
                    )}

                    <div>
                      <div className={`flex justify-center items-center mb-4 sm:mb-5 rounded-xl w-11 sm:w-12 h-11 sm:h-12 ${card.iconColor}`}>
                        <IconComponent size={22} />
                      </div>

                      <h3 className="mb-2 font-bold text-slate-900 text-lg sm:text-xl">
                        {card.title}
                      </h3>

                      <p className="mb-5 sm:mb-6 text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {card.description}
                      </p>

                      <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 font-medium text-slate-700 text-xs sm:text-sm">
                        {card.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
                      <Link
                        href={card.ctaLink}
                        className={`inline-flex justify-center items-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl w-full font-semibold text-xs sm:text-sm transition-all ${
                          card.type === 'service'
                            ? 'bg-linear-to-r from-primary-theme to-gradient-end-color shadow-md text-white hover:scale-[1.01]'
                            : 'border border-slate-300 hover:border-primary-theme text-slate-700 hover:text-primary-theme'
                        }`}
                      >
                        <span>{card.ctaText}</span>
                        {card.type === 'tool' ? <ExternalLink className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                      </Link>

                      {card.subLinkText && (
                        <Link
                          href={card.subLinkHref || '#'}
                          className="font-semibold text-slate-500 hover:text-primary-theme text-xs text-center transition-colors pt-1"
                        >
                          {card.subLinkText}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          FREQUENTLY ASKED QUESTIONS (FAQ) SECTION
      ───────────────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section className="bg-white py-12 sm:py-16">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            
            <div className="mb-8 sm:mb-12 text-center">
              <span className="font-bold text-primary-theme text-[11px] sm:text-xs uppercase tracking-wider">
                {faqSectionOverline}
              </span>
              <h2 className="mt-1.5 sm:mt-2 font-extrabold text-slate-900 text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                {faqSectionTitle}
              </h2>
              <p className="mt-2 text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                {faqSectionDescription}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex justify-between items-center p-4 sm:p-5 w-full font-bold text-slate-900 hover:text-primary-theme text-sm sm:text-base md:text-lg text-left transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="pr-2">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-primary-theme' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pt-1 pb-4 sm:pb-5 border-t border-slate-100 text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

    </div>
  );
}

