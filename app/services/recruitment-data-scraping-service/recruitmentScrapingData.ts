import {
  Briefcase,
  Database,
  Sliders,
  Globe,
  Settings,
  Zap,
  Clock,
  Search,
  Sparkles,
  BarChart3,
  MapPin,
} from "lucide-react";

export const recruitmentScrapingData = {
  // Hero section
  heroTitlePrefix: "Enterprise Web Scraping for",
  heroTitleHighlight: "Recruitment & Job",
  heroTitleSuffix: "Data",
  heroDescription:
    "Extract active job postings, company profiles, salary benchmarks, hiring locations, and required skills across leading career platforms and job boards at scale.",
  heroHighlights: [
    "Scrape job titles, descriptions, requirements, and benefits",
    "Track salary bands and compensation ranges across industries",
    "Monitor company profile metadata, ratings, and scale of hiring",
    "Extract tech stacks and specific skill keyword requirements",
    "Gather remote/hybrid/on-site designations and location metrics",
    "Bypass anti-bot mechanisms on complex job portals and networks",
  ],
  heroImage: "/services/recruitment-data-scraping-service/recruitment-hero.svg",
  heroImageAlt: "Recruitment data scraping hero illustration",
  heroCtaIcon: Briefcase,
  sampleDataLink: "/contact",
  allServicesLink: "/services",

  // Stats section
  stats: [
    { value: "40+", label: "Job Boards" },
    { value: "100M+", label: "Jobs Crawled" },
    { value: "99.8%", label: "Accuracy Rate" },
    { value: "Daily", label: "Refresh Cycles" },
  ],

  // About/Explanation section
  aboutTitle: "What is Recruitment & Job Data Scraping?",
  aboutDescription:
    "Recruitment and job data scraping is the automated extraction of employment listings, career postings, salary trends, company reviews, and skill specifications from major job directories and company portals. HR tech platforms, recruitment agencies, market analysts, and corporate enterprises use this data to perform salary benchmarking, track hiring momentum, gather competitive talent intelligence, and populate job board aggregators.",
  aboutBulletPoints: [
    "Extract complete job post details including title, department, level, and description.",
    "Scrape advertised compensation figures, benefits packages, and bonus schemes.",
    "Identify technical skill sets, certifications, and experience requirements.",
    "Track company headcount growth, hiring volume, and employee ratings.",
    "Capture geolocation data, remote work options, and office location coordinates.",
  ],

  // Detailed Compilation of Data Fields
  dataFieldsTitle: "Structured Recruitment & Job Data Fields",
  dataFieldsDescription:
    "We clean and structure employment data from public boards, career sites, and corporate networks into a unified, query-ready format for human resources planning and market intelligence.",
  dataFieldsImage: "/services/recruitment-data-scraping-service/recruitment-data-mockup.svg",
  dataFieldsLeft: [
    "Job Title & Role Level",
    "Company Name & Profile Link",
    "Department & Function",
    "Job Description & Specs",
    "Required Tech Stack & Skills",
    "Years of Experience Needed",
    "Educational Requirements",
    "Employment Type (Full-time/Part-time)",
  ],
  dataFieldsRight: [
    "Salary Band & Currency",
    "Benefits & Compensation Perks",
    "Work Mode (Remote/Hybrid/Onsite)",
    "Country, City, & Postcode",
    "Geographical Coordinates",
    "Post Date & Expiry Date",
    "Apply Link / Application Form URL",
    "Company Size & Industry Sector",
  ],

  // Powerful Features section
  featuresSectionTitle: "Enterprise Features for Recruitment Data Extraction",
  featureBlocks: [
    {
      title: "Real-time Job Board Aggregation",
      description:
        "Gather the latest job listings across multiple global and regional platforms like LinkedIn, Indeed, Glassdoor, and ZipRecruiter to build a unified talent directory or monitor industry hiring patterns.",
      image: "/services/recruitment-data-scraping-service/job-board-scraping.svg",
      imageAlt: "Job board aggregation illustration",
      bulletPoints: [
        {
          title: "Multi-Source Extraction",
          desc: "Extract positions simultaneously from LinkedIn, Indeed, and local job directories.",
        },
        {
          title: "Deduplication Engine",
          desc: "Automatically consolidate duplicate listings posted across different boards by the same company.",
        },
        {
          title: "Dead Link Detection",
          desc: "Instantly flag and remove closed roles when pages return 404 or redirect.",
        },
      ],
    },
    {
      title: "Salary Benchmarking & Compensation Analysis",
      description:
        "Extract stated salary ranges, hourly rates, signing bonuses, and non-monetary benefits to track real-time wage shifts and construct dynamic salary benchmarking indexes.",
      image: "/services/recruitment-data-scraping-service/salary-analysis.svg",
      imageAlt: "Salary analysis illustration",
      bulletPoints: [
        {
          title: "Compensation Ranges",
          desc: "Capture minimum, maximum, and median salary fields across various roles.",
        },
        {
          title: "Benefits Analysis",
          desc: "Parse mentions of health plans, equity options, parental leave, and tuition reimbursement.",
        },
        {
          title: "Regional Wage Disparity",
          desc: "Benchmark compensation differences for identical roles across states, cities, or countries.",
        },
      ],
    },
    {
      title: "Skill & Technology Demand Mapping",
      description:
        "Analyze job requirements to map the demand velocity of specific software, languages, certifications, and soft skills to identify emerging industry skill trends.",
      image: "/services/recruitment-data-scraping-service/skills-mapping.svg",
      imageAlt: "Skills demand mapping illustration",
      bulletPoints: [
        {
          title: "Tech Stack Parsing",
          desc: "Automatically identify mentioned tech stacks (e.g., Python, AWS, React) within job descriptions.",
        },
        {
          title: "Required Certifications",
          desc: "Extract certifications like PMP, AWS Certified, CISSP, or CPA to track compliance demands.",
        },
        {
          title: "Experience Categorization",
          desc: "Tag and organize job postings by required seniority level (Junior, Mid, Senior, Lead, Executive).",
        },
      ],
    },
    {
      title: "Employer Brand & Headcount Monitoring",
      description:
        "Scrape corporate profiles, employee ratings, review trends, and dynamic headcount data to analyze competitor attrition and hiring volume shifts.",
      image: "/services/recruitment-data-scraping-service/brand-monitoring.svg",
      imageAlt: "Employer brand monitoring illustration",
      bulletPoints: [
        {
          title: "Hiring Velocity Tracking",
          desc: "Measure the frequency and quantity of job postings to evaluate competitor growth curves.",
        },
        {
          title: "Review Sentiment Mining",
          desc: "Extract star ratings and textual reviews from employee portals to evaluate organizational sentiment.",
        },
        {
          title: "Sector Allocation",
          desc: "Map which departments (e.g., Sales, Engineering, Support) competitors are prioritizing for hiring.",
        },
      ],
    },
  ],

  // Benefits section
  benefitsTitle: "Why HR Tech & Enterprise Teams Choose Us",
  benefits: [
    {
      title: "Power Talent Aggregation Platforms",
      content:
        "Supply your job board, niche employment site, or resume-matching platform with a continuous stream of clean, deduplicated job postings from thousands of company career portals.",
    },
    {
      title: "Optimize Dynamic Salary Indexes",
      content:
        "Build accurate, real-time compensation models to assist HR teams in setting competitive wages and job seekers in negotiating fair pay.",
    },
    {
      title: "Execute Advanced Competitive Intel",
      content:
        "Identify when competitors are building out new teams (e.g., starting a new AI division) by tracking changes in their job posts and tech stack requirements.",
    },
    {
      title: "Enable Precision Market Mapping",
      content:
        "Trace talent migrations, geographic job density, and remote work adoption to guide corporate relocation or site selection plans.",
    },
  ],
  benefitsImage: "/services/recruitment-data-scraping-service/recruitment-benefits.svg",
  benefitsImageAlt: "Recruitment data benefits illustration",

  // Everything You Need section (Grid)
  gridSectionTitle: "Designed for Enterprise Scale Recruitment Ingestion",
  gridSectionDescription:
    "Our robust parsing infrastructure extracts and structures data from dynamic portals, enterprise applicant tracking systems (ATS), and localized job boards.",
  gridFeatures: [
    {
      icon: Sliders,
      title: "ATS Ingestion Adapters",
      description:
        "Systematically parse listings from major ATS portals including Workday, Greenhouse, Lever, and Taleo.",
    },
    {
      icon: Globe,
      title: "Localized Residential Proxies",
      description:
        "Route requests through city-specific residential IPs to extract geo-dependent listings and local wage differences.",
    },
    {
      icon: Settings,
      title: "Dynamic Content Rendering",
      description:
        "Use browser rendering to crawl job boards that load listings dynamically with JavaScript.",
    },
    {
      icon: Zap,
      title: "Real-time Hiring Alerts",
      description:
        "Get immediate webhook notifications when specific target companies publish new job openings.",
    },
    {
      icon: Clock,
      title: "Scheduled Execution",
      description:
        "Set scraping schedules to run daily, weekly, or monthly to keep job databases continuously fresh.",
    },
    {
      icon: Database,
      title: "Clean Schema Delivery",
      description:
        "Export recruitment data in normalized format straight to BigQuery, Snowflake, S3, or via REST API.",
    },
  ],

  // Popular Use Cases section
  useCasesSectionTitle: "Recruitment Data Use Cases",
  useCasesSectionDescription:
    "How recruitment firms, HR tech platforms, and market research institutions leverage structured job data.",
  useCases: [
    {
      icon: Search,
      title: "Job Aggregator Portals",
      description:
        "Populate niche job boards and aggregate portals with thousands of active listings crawled from direct employer websites.",
    },
    {
      icon: BarChart3,
      title: "Labor Market Analysis",
      description:
        "Analyze macro hiring trends, salary inflation, and changing skill demands for economic reporting or investment research.",
    },
    {
      icon: Sparkles,
      title: "Sales Lead Generation",
      description:
        "Identify companies with growing hiring budgets in specific segments to trigger B2B sales outreach.",
    },
    {
      icon: MapPin,
      title: "Geographical HR Planning",
      description:
        "Map regions with high concentrations of specific talent (e.g. software engineering) to decide new office locations.",
    },
  ],

  // Platforms section
  platformsSectionTitle: "Monitored Job Boards & Recruitment Networks",
  platformsSectionDescription:
    "We extract job listings and company profiles from the world's leading professional platforms and job directories.",
  platforms: [
    {
      imagePath: "/services/recruitment-data-scraping-service/icons/linkedin.svg",
      name: "LinkedIn",
    },
    {
      imagePath: "/services/recruitment-data-scraping-service/icons/indeed.svg",
      name: "Indeed",
    },
    {
      imagePath: "/services/recruitment-data-scraping-service/icons/glassdoor.svg",
      name: "Glassdoor",
    },
    {
      imagePath: "/services/recruitment-data-scraping-service/icons/ziprecruiter.svg",
      name: "ZipRecruiter",
    },
    {
      imagePath: "/services/recruitment-data-scraping-service/icons/monster.svg",
      name: "Monster",
    },
  ],
};
