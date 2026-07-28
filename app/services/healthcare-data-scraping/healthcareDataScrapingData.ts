import {
  Database,
  Sliders,
  Globe,
  Settings,
  Zap,
  Clock,
  Search,
  Sparkles,
  BarChart3,
  FileText,
  Pill,
  ShieldCheck,
} from "lucide-react";

export const healthcareDataScrapingData = {
  // Hero section
  heroTitlePrefix: "Web Scraping for",
  heroTitleHighlight: "Healthcare & Pharma",
  heroTitleSuffix: "Data",
  heroDescription:
    "Extract physician directories, hospital listings, pharmaceutical pricing, FDA drug approvals, clinical trial records, and medical journal abstracts with full compliance-awareness and enterprise-grade accuracy.",
  heroHighlights: [
    "Scrape doctor profiles, NPIs, and provider directories at scale",
    "Monitor pharmaceutical drug pricing across 50+ retail & wholesale channels",
    "Track FDA drug approvals, recalls, and regulatory filings",
    "Extract clinical trial data from ClinicalTrials.gov and global registries",
    "Aggregate medical journal abstracts and PubMed publications",
    "Bypass complex anti-bot systems on healthcare portals",
  ],
  heroImage: "/services/healthcare-data-scraping/healthcare-hero.svg",
  heroImageAlt: "Healthcare data scraping hero illustration",
  heroCtaIcon: Pill,

  // Stats section
  stats: [
    { value: "50+", label: "Healthcare Platforms" },
    { value: "10M+", label: "Provider Records" },
    { value: "99.9%", label: "Data Accuracy" },
    { value: "HIPAA", label: "Compliance-Aware" },
  ],

  // About/Explanation section
  aboutTitle: "What is Healthcare Data Scraping?",
  aboutDescription:
    "Healthcare data scraping is the systematic, automated extraction of publicly available medical information from provider directories, hospital networks, pharmaceutical databases, government regulatory portals, clinical trial registries, and academic medical publications. Health-tech companies, pharmaceutical firms, insurance carriers, and healthcare analytics teams rely on scraped medical data to build provider networks, monitor drug pricing, track regulatory changes, and power clinical decision support tools — all while operating within publicly accessible data boundaries.",
  aboutBulletPoints: [
    "Extract physician profiles, NPI numbers, specializations, and contact details from provider directories.",
    "Monitor branded and generic drug pricing across pharmacy chains, wholesale distributors, and PBMs.",
    "Track FDA approval timelines, drug recalls, and regulatory submission statuses.",
    "Scrape clinical trial eligibility criteria, phase statuses, and outcome results.",
    "Aggregate medical research abstracts, citations, and publication metadata from PubMed and journals.",
  ],

  // Detailed Compilation of Data Fields
  dataFieldsTitle: "Structured Healthcare Data Fields",
  dataFieldsDescription:
    "We normalize healthcare data from provider directories, pharma databases, and regulatory portals into a unified schema ready for analytics, CRM enrichment, and compliance workflows.",
  dataFieldsImage:
    "/services/healthcare-data-scraping/healthcare-data-mockup.svg",
  dataFieldsLeft: [
    "Physician Name & Credentials",
    "NPI Number & License State",
    "Specialty & Sub-Specialty",
    "Clinic / Hospital Affiliation",
    "Practice Address & Phone",
    "Insurance Plans Accepted",
    "Drug Brand & Generic Name",
    "NDC Code & Manufacturer",
  ],
  dataFieldsRight: [
    "Drug List Price & WAC",
    "FDA Approval Date & Status",
    "Drug Recall Category & Reason",
    "Clinical Trial ID & Phase",
    "Trial Eligibility Criteria",
    "Trial Outcome & Status",
    "PubMed Article Title & DOI",
    "Journal Name & Publication Date",
  ],

  // Powerful Features section
  featuresSectionTitle: "Enterprise Features for Healthcare Data Scraping",
  featureBlocks: [
    {
      title: "Physician & Provider Directory Scraping",
      description:
        "Build and enrich comprehensive provider databases by scraping physician profiles, NPI records, specialty codes, hospital affiliations, and office contact details from national directories, payer networks, and state licensing boards at scale.",
      image:
        "/services/healthcare-data-scraping/healthcare-provider-directory.svg",
      imageAlt: "Provider directory scraping illustration",
      bulletPoints: [
        {
          title: "NPI & License Verification",
          desc: "Extract NPI numbers, DEA registrations, and state license statuses to power credentialing and provider verification workflows.",
        },
        {
          title: "Multi-Directory Aggregation",
          desc: "Consolidate provider data from Zocdoc, Healthgrades, Doximity, Vitals, and insurer network portals into a single unified schema.",
        },
        {
          title: "Specialty & Affiliation Mapping",
          desc: "Capture physician specialties, sub-specialties, hospital group affiliations, and practice ownership details for market segmentation.",
        },
      ],
    },
    {
      title: "Pharmaceutical Pricing Intelligence",
      description:
        "Track branded and generic drug prices across retail pharmacies, wholesale distributors, PBM formularies, and government drug pricing schedules in real time to support market access strategy and contract negotiations.",
      image:
        "/services/healthcare-data-scraping/healthcare-pharma-pricing.svg",
      imageAlt: "Pharmaceutical pricing intelligence illustration",
      bulletPoints: [
        {
          title: "WAC & List Price Monitoring",
          desc: "Scrape Wholesale Acquisition Cost (WAC), Average Wholesale Price (AWP), and retail list prices for branded and generic drugs.",
        },
        {
          title: "Pharmacy Benefit Manager Formularies",
          desc: "Extract PBM tier placements, prior authorization requirements, and step therapy protocols across major commercial formularies.",
        },
        {
          title: "340B & Government Pricing",
          desc: "Monitor 340B ceiling prices, Medicaid rebate-eligible pricing, and VA Federal Supply Schedule rates for compliance and access planning.",
        },
      ],
    },
    {
      title: "FDA Regulatory & Approval Tracking",
      description:
        "Stay ahead of regulatory milestones by automatically monitoring FDA drug approval decisions, PDUFA dates, biologics license applications, device clearances, drug recalls, and safety label updates from FDA.gov and related government portals.",
      image: "/services/healthcare-data-scraping/healthcare-fda-tracking.svg",
      imageAlt: "FDA regulatory tracking illustration",
      bulletPoints: [
        {
          title: "NDA / BLA Approval Monitoring",
          desc: "Track New Drug Application and Biologics License Application submission dates, review statuses, and final approval decisions.",
        },
        {
          title: "Drug Recall & Safety Alerts",
          desc: "Capture Class I, II, and III drug recall notifications, lot numbers, and market withdrawal details as they are published.",
        },
        {
          title: "Device 510(k) & PMA Tracking",
          desc: "Extract medical device clearance and Pre-Market Approval records including intended use, predicate devices, and decision dates.",
        },
      ],
    },
    {
      title: "Clinical Trial & Medical Research Data",
      description:
        "Accelerate clinical intelligence by scraping trial registries, eligibility criteria, phase progression, site locations, and published outcomes from ClinicalTrials.gov, WHO ICTRP, and major academic medical journal databases.",
      image:
        "/services/healthcare-data-scraping/healthcare-clinical-trials.svg",
      imageAlt: "Clinical trial data scraping illustration",
      bulletPoints: [
        {
          title: "Trial Registry Extraction",
          desc: "Scrape NCT IDs, sponsor names, trial phases, enrollment numbers, and primary endpoints from global clinical trial registries.",
        },
        {
          title: "PubMed Abstract Aggregation",
          desc: "Extract publication titles, abstracts, MeSH terms, and citation counts from PubMed and open-access journal portals.",
        },
        {
          title: "Site & Investigator Mapping",
          desc: "Identify trial site locations, lead investigators, and recruitment statuses to support site feasibility and competitive landscape analysis.",
        },
      ],
    },
  ],

  // Benefits section
  benefitsTitle: "Why Healthcare Firms Trust Our Data Scraping Services",
  benefits: [
    {
      title: "Accelerate Provider Network Builds",
      content:
        "Eliminate manual outreach by automatically scraping and enriching physician and facility profiles from dozens of public directories and payer portals to build your provider network faster.",
    },
    {
      title: "Optimize Drug Pricing Strategy",
      content:
        "Feed real-time competitor drug pricing, WAC changes, and formulary tier shifts into your market access models to make faster, more informed launch and contract decisions.",
    },
    {
      title: "Stay Ahead of Regulatory Changes",
      content:
        "Automatically track FDA approval calendars, recall databases, and label change notifications so your medical affairs and regulatory teams never miss a critical milestone.",
    },
    {
      title: "Power Clinical & Market Intelligence",
      content:
        "Aggregate clinical trial data, publication trends, and competitive pipeline intelligence into dashboards that drive smarter R&D investment and commercial planning decisions.",
    },
  ],
  benefitsImage: "/services/healthcare-data-scraping/healthcare-benefits.svg",
  benefitsImageAlt: "Healthcare data scraping benefits illustration",

  // Everything You Need section (Grid)
  gridSectionTitle: "Robust Healthcare Data Ingestion Pipeline",
  gridSectionDescription:
    "Our enterprise scraping infrastructure handles JavaScript-heavy medical portals, login-gated drug databases, CAPTCHA layers, and complex government regulatory site structures at scale.",
  gridFeatures: [
    {
      icon: Sliders,
      title: "Provider Directory Crawling",
      description:
        "Systematically crawl paginated physician and facility directories across national databases, specialty societies, and insurer network portals with high reliability.",
    },
    {
      icon: Globe,
      title: "Multi-Region Geo-Targeting",
      description:
        "Query healthcare portals from state-specific IPs to access regionally licensed provider listings, localized drug pricing, and market-specific formulary data.",
    },
    {
      icon: Settings,
      title: "Login-Gated Data Extraction",
      description:
        "Access gated pharma pricing platforms, PBM formulary tools, and hospital contract portals using authenticated session and cookie management.",
    },
    {
      icon: Zap,
      title: "Regulatory Change Alerts",
      description:
        "Trigger instant webhook notifications when FDA approval statuses, drug recall classifications, or formulary tier placements change.",
    },
    {
      icon: Clock,
      title: "Scheduled Compliance Monitoring",
      description:
        "Configure recurring scraping runs aligned to FDA publication cycles, quarterly price list updates, and clinical trial registry refresh schedules.",
    },
    {
      icon: Database,
      title: "Structured Data Delivery",
      description:
        "Receive clean, normalized JSON or CSV outputs delivered directly to BigQuery, Snowflake, AWS S3, or your health-tech API endpoints.",
    },
  ],

  // Popular Use Cases section
  useCasesSectionTitle: "Popular Healthcare Data Use Cases",
  useCasesSectionDescription:
    "How health-tech companies, pharmaceutical firms, insurance carriers, and medical research organizations leverage scraped healthcare data at enterprise scale.",
  useCases: [
    {
      icon: Search,
      title: "Provider CRM Enrichment",
      description:
        "Health-tech and pharma sales teams enrich CRM records with verified NPI data, specialty codes, and affiliation details scraped from national provider directories.",
    },
    {
      icon: BarChart3,
      title: "Market Access & Formulary Analytics",
      description:
        "Market access teams monitor competitor drug tier placements, prior authorization rules, and price changes across PBM formularies to refine launch strategies.",
    },
    {
      icon: Sparkles,
      title: "Competitive Pipeline Intelligence",
      description:
        "R&D and business development teams track competitor clinical trial phases, enrollment milestones, and publication outputs to benchmark pipeline progress.",
    },
    {
      icon: FileText,
      title: "Medical Literature Mining",
      description:
        "Medical affairs and evidence teams aggregate PubMed abstracts, real-world evidence publications, and clinical guideline updates to support medical education and HTA submissions.",
    },
  ],

  // Platforms section
  platformsSectionTitle:
    "Extract Healthcare Data from Leading Medical Platforms",
  platformsSectionDescription:
    "We scrape provider profiles, drug pricing, regulatory filings, and clinical research data from major global and regional healthcare databases, government portals, and medical directories.",
  platforms: [
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/zocdoc.svg",
      name: "Zocdoc",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/healthgrades.svg",
      name: "Healthgrades",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/webmd.svg",
      name: "WebMD",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/doximity.svg",
      name: "Doximity",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/vitals.svg",
      name: "Vitals",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/nppes.svg",
      name: "NPPES NPI Registry",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/fda-gov.svg",
      name: "FDA.gov",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/clinicaltrials.svg",
      name: "ClinicalTrials.gov",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/pubmed.svg",
      name: "PubMed",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/who-ictrp.svg",
      name: "WHO ICTRP",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/cms-gov.svg",
      name: "CMS.gov",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/rxlist.svg",
      name: "RxList",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/drugs-com.svg",
      name: "Drugs.com",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/goodrx.svg",
      name: "GoodRx",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/rxnorm.svg",
      name: "RxNorm",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/nih-reporter.svg",
      name: "NIH Reporter",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/cochrane.svg",
      name: "Cochrane Library",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/medscape.svg",
      name: "Medscape",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/hospital-compare.svg",
      name: "Hospital Compare",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/icd-codes.svg",
      name: "ICD Codes Portal",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/epocrates.svg",
      name: "Epocrates",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/practo.svg",
      name: "Practo",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/1mg.svg",
      name: "1mg",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/netmeds.svg",
      name: "Netmeds",
    },
    {
      imagePath:
        "/services/healthcare-data-scraping/healthcare-icons/apollo.svg",
      name: "Apollo Pharmacy",
    },
  ],
};
