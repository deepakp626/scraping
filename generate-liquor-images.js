const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public/services/liquor-or-alchol-data-scraping');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// ─────────────────────────────────────────────────────────────
// 1. LIQUOR HERO IMAGE
// ─────────────────────────────────────────────────────────────
const svgHero = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" fill="none">
  <defs>
    <linearGradient id="hBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#fdfcfb"/>
      <stop offset="100%" stop-color="#f7f4ef"/>
    </linearGradient>

    <linearGradient id="wineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9f1239"/>
      <stop offset="100%" stop-color="#4c0519"/>
    </linearGradient>

    <linearGradient id="amberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d97706"/>
      <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>

    <linearGradient id="beerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>

    <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.8"/>
    </linearGradient>

    <filter id="shadowLg" x="-10%" y="-10%" width="125%" height="130%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#0f172a" flood-opacity="0.08"/>
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.04"/>
    </filter>

    <filter id="shadowSm" x="-10%" y="-10%" width="125%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.06"/>
    </filter>
  </defs>

  <rect width="1200" height="900" rx="24" fill="url(#hBg)"/>

  <g opacity="0.4">
    <circle cx="1020" cy="180" r="280" stroke="#fbcfe8" stroke-width="1.5" stroke-dasharray="6 6" fill="none"/>
    <circle cx="1020" cy="180" r="420" stroke="#fef3c7" stroke-width="1.5" stroke-dasharray="8 8" fill="none"/>
    <circle cx="160" cy="740" r="200" stroke="#fed7aa" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/>
  </g>

  <!-- Header Badge -->
  <g transform="translate(80, 50)">
    <rect width="360" height="42" rx="21" fill="#fdf2f8" stroke="#fbcfe8" stroke-width="1"/>
    <circle cx="24" cy="21" r="6" fill="#9f1239"/>
    <text x="42" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#9f1239" letter-spacing="1.2">
      ENTERPRISE BEVERAGE INTELLIGENCE
    </text>
  </g>

  <!-- Title Banner -->
  <text x="80" y="140" font-family="system-ui, -apple-system, sans-serif" font-size="38" font-weight="900" fill="#0f172a">
    Liquor, Wine &amp; Beer Catalog Scraper
  </text>
  <text x="80" y="176" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500" fill="#64748b">
    Real-time multi-retailer inventory, dynamic pricing index, ABV, and vintage parsing engine
  </text>

  <!-- 3 Beverage Category Showcase Cards -->

  <!-- Card 1: Fine Wine -->
  <g transform="translate(80, 220)" filter="url(#shadowLg)">
    <rect width="320" height="420" rx="20" fill="url(#glassGrad)" stroke="#f1f5f9" stroke-width="1.5"/>
    <rect width="320" height="6" rx="3" fill="url(#wineGrad)"/>

    <rect x="24" y="24" width="90" height="26" rx="13" fill="#ffe4e6"/>
    <text x="69" y="41" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#9f1239" text-anchor="middle">
      FINE WINE
    </text>

    <rect x="210" y="24" width="86" height="26" rx="13" fill="#ecfdf5"/>
    <text x="253" y="41" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#059669" text-anchor="middle">
      ★ 97 PTS
    </text>

    <!-- Stylized Wine Bottle Graphic -->
    <g transform="translate(135, 75)">
      <rect x="18" y="0" width="14" height="45" rx="3" fill="#9f1239"/>
      <rect x="16" y="2" width="18" height="12" rx="2" fill="#d97706"/>
      <path d="M 18 45 C 8 65, 0 85, 0 110 L 0 200 C 0 205, 5 210, 10 210 L 40 210 C 45 210, 50 205, 50 200 L 50 110 C 50 85, 42 65, 32 45 Z" fill="url(#wineGrad)"/>
      <rect x="5" y="115" width="40" height="60" rx="3" fill="#fff" opacity="0.95"/>
      <line x1="10" y1="128" x2="40" y2="128" stroke="#9f1239" stroke-width="2"/>
      <line x1="12" y1="138" x2="38" y2="138" stroke="#64748b" stroke-width="1.5"/>
      <line x1="15" y1="148" x2="35" y2="148" stroke="#64748b" stroke-width="1"/>
      <text x="25" y="165" font-family="sans-serif" font-size="8" font-weight="bold" fill="#d97706" text-anchor="middle">2018</text>
    </g>

    <text x="24" y="315" font-family="system-ui, sans-serif" font-size="17" font-weight="800" fill="#0f172a">
      Château Margaux 2018
    </text>
    <text x="24" y="338" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b">
      Premier Grand Cru • 13.5% ABV • 750ml
    </text>

    <g transform="translate(24, 355)">
      <line x1="0" y1="0" x2="272" y2="0" stroke="#f1f5f9" stroke-width="1"/>
      <text x="0" y="24" font-family="sans-serif" font-size="12" fill="#64748b">Best Market Price</text>
      <text x="272" y="24" font-family="sans-serif" font-size="17" font-weight="800" fill="#059669" text-anchor="end">$489.00</text>
      <text x="0" y="44" font-family="sans-serif" font-size="11" fill="#94a3b8">Tracked in 42 Stores</text>
      <text x="272" y="44" font-family="sans-serif" font-size="11" font-weight="600" fill="#0284c7" text-anchor="end">In Stock</text>
    </g>
  </g>

  <!-- Card 2: Premium Spirits -->
  <g transform="translate(440, 220)" filter="url(#shadowLg)">
    <rect width="320" height="420" rx="20" fill="url(#glassGrad)" stroke="#f1f5f9" stroke-width="1.5"/>
    <rect width="320" height="6" rx="3" fill="url(#amberGrad)"/>

    <rect x="24" y="24" width="105" height="26" rx="13" fill="#fef3c7"/>
    <text x="76" y="41" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#b45309" text-anchor="middle">
      SINGLE MALT
    </text>

    <rect x="200" y="24" width="96" height="26" rx="13" fill="#fee2e2"/>
    <text x="248" y="41" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#dc2626" text-anchor="middle">
      -14% PROMO
    </text>

    <g transform="translate(132, 75)">
      <rect x="18" y="0" width="20" height="15" rx="3" fill="#78350f"/>
      <rect x="21" y="15" width="14" height="30" fill="#f59e0b"/>
      <path d="M 21 45 C 5 55, -2 70, -2 95 L -2 200 C -2 205, 3 210, 8 210 L 48 210 C 53 210, 58 205, 58 200 L 58 95 C 58 70, 51 55, 35 45 Z" fill="url(#amberGrad)"/>
      <rect x="6" y="105" width="44" height="75" rx="3" fill="#fffdfa" opacity="0.95"/>
      <rect x="10" y="112" width="36" height="16" fill="#1e293b" rx="2"/>
      <text x="28" y="124" font-family="sans-serif" font-size="7" font-weight="bold" fill="#d97706" text-anchor="middle">12 YEAR</text>
      <line x1="12" y1="138" x2="44" y2="138" stroke="#78350f" stroke-width="1.5"/>
      <line x1="14" y1="148" x2="42" y2="148" stroke="#94a3b8" stroke-width="1"/>
      <text x="28" y="168" font-family="sans-serif" font-size="7" font-weight="600" fill="#0f172a" text-anchor="middle">43.0% ABV</text>
    </g>

    <text x="24" y="315" font-family="system-ui, sans-serif" font-size="17" font-weight="800" fill="#0f172a">
      Macallan 12 Double Cask
    </text>
    <text x="24" y="338" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b">
      Highland Single Malt • 43% ABV • 750ml
    </text>

    <g transform="translate(24, 355)">
      <line x1="0" y1="0" x2="272" y2="0" stroke="#f1f5f9" stroke-width="1"/>
      <text x="0" y="24" font-family="sans-serif" font-size="12" fill="#64748b">Price vs MSRP ($84)</text>
      <text x="272" y="24" font-family="sans-serif" font-size="17" font-weight="800" fill="#059669" text-anchor="end">$71.99</text>
      <text x="0" y="44" font-family="sans-serif" font-size="11" fill="#94a3b8">UPC: 08500092841</text>
      <text x="272" y="44" font-family="sans-serif" font-size="11" font-weight="600" fill="#d97706" text-anchor="end">Save $12.01</text>
    </g>
  </g>

  <!-- Card 3: Craft Beer -->
  <g transform="translate(800, 220)" filter="url(#shadowLg)">
    <rect width="320" height="420" rx="20" fill="url(#glassGrad)" stroke="#f1f5f9" stroke-width="1.5"/>
    <rect width="320" height="6" rx="3" fill="url(#beerGrad)"/>

    <rect x="24" y="24" width="95" height="26" rx="13" fill="#fef9c3"/>
    <text x="71" y="41" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#854d0e" text-anchor="middle">
      CRAFT BEER
    </text>

    <rect x="210" y="24" width="86" height="26" rx="13" fill="#e0e7ff"/>
    <text x="253" y="41" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#4338ca" text-anchor="middle">
      4.8 / 5.0
    </text>

    <g transform="translate(135, 80)">
      <ellipse cx="25" cy="10" rx="22" ry="7" fill="#cbd5e1"/>
      <ellipse cx="25" cy="9" rx="18" ry="5" fill="#94a3b8"/>
      <path d="M 3 10 L 3 190 C 3 198, 12 205, 25 205 C 38 205, 47 198, 47 190 L 47 10 Z" fill="url(#beerGrad)"/>
      <rect x="3" y="55" width="44" height="110" fill="#047857" opacity="0.9"/>
      <circle cx="25" cy="100" r="14" fill="#fbbf24"/>
      <text x="25" y="104" font-family="sans-serif" font-size="9" font-weight="900" fill="#064e3b" text-anchor="middle">IPA</text>
      <text x="25" y="132" font-family="sans-serif" font-size="7" font-weight="bold" fill="#ffffff" text-anchor="middle">HAZY DBL</text>
      <text x="25" y="148" font-family="sans-serif" font-size="6.5" font-weight="bold" fill="#a7f3d0" text-anchor="middle">8.4% ABV</text>
    </g>

    <text x="24" y="315" font-family="system-ui, sans-serif" font-size="17" font-weight="800" fill="#0f172a">
      King Julius Hazy DIPA
    </text>
    <text x="24" y="338" font-family="system-ui, sans-serif" font-size="12" font-weight="500" fill="#64748b">
      Tree House Brewing • 4-Pack Cans • 16oz
    </text>

    <g transform="translate(24, 355)">
      <line x1="0" y1="0" x2="272" y2="0" stroke="#f1f5f9" stroke-width="1"/>
      <text x="0" y="24" font-family="sans-serif" font-size="12" fill="#64748b">4-Pack Retail Price</text>
      <text x="272" y="24" font-family="sans-serif" font-size="17" font-weight="800" fill="#059669" text-anchor="end">$22.50</text>
      <text x="0" y="44" font-family="sans-serif" font-size="11" fill="#94a3b8">Brewery Freshness</text>
      <text x="272" y="44" font-family="sans-serif" font-size="11" font-weight="600" fill="#059669" text-anchor="end">Canned 4d ago</text>
    </g>
  </g>

  <!-- Bottom Metric Strip -->
  <g transform="translate(80, 675)" filter="url(#shadowSm)">
    <rect width="1040" height="175" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>

    <g transform="translate(40, 35)">
      <circle cx="28" cy="28" r="24" fill="#fdf2f8"/>
      <path d="M 22 18 L 34 18 C 34 26, 28 32, 28 36 L 28 42 L 20 42 L 20 36 C 20 32, 22 26, 22 18 Z" fill="#9f1239"/>
      <text x="68" y="24" font-family="sans-serif" font-size="12" font-weight="600" fill="#64748b">TOTAL PRODUCTS</text>
      <text x="68" y="52" font-family="sans-serif" font-size="28" font-weight="900" fill="#0f172a">5,000,000+</text>
      <text x="68" y="74" font-family="sans-serif" font-size="12" font-weight="600" fill="#059669">↑ Wine, Spirits &amp; Beer indexed</text>
    </g>

    <line x1="290" y1="30" x2="290" y2="145" stroke="#f1f5f9" stroke-width="2"/>

    <g transform="translate(320, 35)">
      <circle cx="28" cy="28" r="24" fill="#fef3c7"/>
      <circle cx="28" cy="28" r="12" fill="#d97706" opacity="0.2"/>
      <circle cx="28" cy="28" r="6" fill="#d97706"/>
      <text x="68" y="24" font-family="sans-serif" font-size="12" font-weight="600" fill="#64748b">AGE GATE SUCCESS</text>
      <text x="68" y="52" font-family="sans-serif" font-size="28" font-weight="900" fill="#0f172a">99.98%</text>
      <text x="68" y="74" font-family="sans-serif" font-size="12" font-weight="600" fill="#d97706">Automatic Session Tokens</text>
    </g>

    <line x1="560" y1="30" x2="560" y2="145" stroke="#f1f5f9" stroke-width="2"/>

    <g transform="translate(590, 35)">
      <circle cx="28" cy="28" r="24" fill="#ecfdf5"/>
      <path d="M 20 28 L 26 34 L 38 20" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <text x="68" y="24" font-family="sans-serif" font-size="12" font-weight="600" fill="#64748b">SCRAPE REFRESH</text>
      <text x="68" y="52" font-family="sans-serif" font-size="28" font-weight="900" fill="#0f172a">Hourly</text>
      <text x="68" y="74" font-family="sans-serif" font-size="12" font-weight="600" fill="#059669">Real-time Promo &amp; Stock Sync</text>
    </g>

    <line x1="820" y1="30" x2="820" y2="145" stroke="#f1f5f9" stroke-width="2"/>

    <g transform="translate(850, 35)">
      <circle cx="28" cy="28" r="24" fill="#eff6ff"/>
      <rect x="18" y="18" width="20" height="20" rx="4" fill="#3b82f6"/>
      <text x="68" y="24" font-family="sans-serif" font-size="12" font-weight="600" fill="#64748b">COVERAGE</text>
      <text x="68" y="52" font-family="sans-serif" font-size="28" font-weight="900" fill="#0f172a">30+ Portals</text>
      <text x="68" y="74" font-family="sans-serif" font-size="12" font-weight="600" fill="#2563eb">Retailers, Drizly &amp; Vivino</text>
    </g>
  </g>
</svg>
`;

// ─────────────────────────────────────────────────────────────
// 2. LIQUOR DATA MOCKUP (SCHEMA & FIELD INSPECTOR)
// ─────────────────────────────────────────────────────────────
const svgDataMockup = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" fill="none">
  <defs>
    <linearGradient id="dmBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#fcfbfa"/>
      <stop offset="100%" stop-color="#f5f0ea"/>
    </linearGradient>

    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>

    <filter id="shadowMain" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#0f172a" flood-opacity="0.08"/>
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#0f172a" flood-opacity="0.04"/>
    </filter>
  </defs>

  <rect width="1200" height="900" rx="24" fill="url(#dmBg)"/>

  <g transform="translate(80, 50)">
    <rect width="330" height="36" rx="18" fill="#fdf2f8" stroke="#fbcfe8" stroke-width="1"/>
    <circle cx="20" cy="18" r="5" fill="#9f1239"/>
    <text x="36" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#9f1239" letter-spacing="1">
      NORMALIZED ALCOHOL SCHEMA
    </text>
    <text x="0" y="75" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#0f172a">
      Structured Liquor &amp; Beverage Data Fields
    </text>
    <text x="0" y="105" font-family="system-ui, sans-serif" font-size="15" font-weight="500" fill="#64748b">
      Extraction schema covering vintage, ABV, bottle volume, pricing disparity, and critic tasting notes
    </text>
  </g>

  <g transform="translate(80, 185)" filter="url(#shadowMain)">
    <rect width="1040" height="660" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>

    <rect width="1040" height="52" rx="20" fill="url(#headerGrad)"/>
    <rect y="32" width="1040" height="20" fill="url(#headerGrad)"/>

    <circle cx="30" cy="26" r="6" fill="#ef4444"/>
    <circle cx="50" cy="26" r="6" fill="#f59e0b"/>
    <circle cx="70" cy="26" r="6" fill="#10b981"/>

    <text x="110" y="31" font-family="monospace" font-size="13" font-weight="600" fill="#e2e8f0">
      dataset::liquor_catalog_item_v2.json (SKU: WN-BRD-2018-750)
    </text>

    <rect x="880" y="14" width="130" height="24" rx="12" fill="#334155"/>
    <text x="945" y="30" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#38bdf8" text-anchor="middle">
      VALIDATED SCHEMA
    </text>

    <!-- LEFT COLUMN -->
    <g transform="translate(40, 80)">
      <text x="0" y="20" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#9f1239">
        PRODUCT SPECIFICATIONS &amp; ORIGIN
      </text>

      <g transform="translate(0, 35)">
        <rect width="460" height="48" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">Brand &amp; Product Name</text>
        <text x="444" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f172a" text-anchor="end">Château Margaux Grand Vin</text>
      </g>

      <g transform="translate(0, 93)">
        <rect width="460" height="48" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">Beverage Category</text>
        <rect x="340" y="11" width="104" height="26" rx="13" fill="#ffe4e6"/>
        <text x="392" y="28" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#9f1239" text-anchor="middle">Wine / Red</text>
      </g>

      <g transform="translate(0, 151)">
        <rect width="460" height="48" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">Sub-Type &amp; Grape</text>
        <text x="444" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f172a" text-anchor="end">Bordeaux Blend (Cabernet)</text>
      </g>

      <g transform="translate(0, 209)">
        <rect width="460" height="48" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">Vintage Year</text>
        <rect x="360" y="11" width="84" height="26" rx="13" fill="#fef3c7"/>
        <text x="402" y="28" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#b45309" text-anchor="middle">2018</text>
      </g>

      <g transform="translate(0, 267)">
        <rect width="460" height="48" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">Alcohol by Volume (ABV)</text>
        <text x="444" y="29" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#4f46e5" text-anchor="end">13.5% vol</text>
      </g>

      <g transform="translate(0, 325)">
        <rect width="460" height="48" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">Bottle Capacity / Size</text>
        <text x="444" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f172a" text-anchor="end">750 ml (Standard)</text>
      </g>

      <g transform="translate(0, 383)">
        <rect width="460" height="48" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">Country &amp; Appellation</text>
        <text x="444" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f172a" text-anchor="end">Margaux AOC, Bordeaux, FR</text>
      </g>

      <g transform="translate(0, 441)">
        <rect width="460" height="48" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">Winery / Producer</text>
        <text x="444" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f172a" text-anchor="end">Château Margaux Estate</text>
      </g>
    </g>

    <line x1="520" y1="80" x2="520" y2="580" stroke="#f1f5f9" stroke-width="2"/>

    <!-- RIGHT COLUMN -->
    <g transform="translate(540, 80)">
      <text x="0" y="20" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#059669">
        PRICING, STOCK &amp; CRITIC SCORES
      </text>

      <g transform="translate(0, 35)">
        <rect width="460" height="48" rx="10" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#065f46">Current Retail Price</text>
        <text x="444" y="30" font-family="system-ui, sans-serif" font-size="16" font-weight="900" fill="#047857" text-anchor="end">$489.00 USD</text>
      </g>

      <g transform="translate(0, 93)">
        <rect width="460" height="48" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">Original / MSRP Price</text>
        <text x="444" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#94a3b8" text-anchor="end" text-decoration="line-through">$540.00 USD</text>
      </g>

      <g transform="translate(0, 151)">
        <rect width="460" height="48" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">Promotions &amp; Discounts</text>
        <text x="444" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#dc2626" text-anchor="end">10% Off Case Order (6+)</text>
      </g>

      <g transform="translate(0, 209)">
        <rect width="460" height="48" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">Store Stock Status</text>
        <rect x="320" y="11" width="124" height="26" rx="13" fill="#dcfce7"/>
        <text x="382" y="28" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#15803d" text-anchor="middle">In Stock (18 units)</text>
      </g>

      <g transform="translate(0, 267)">
        <rect width="460" height="48" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">UPC / EAN Barcode</text>
        <text x="444" y="29" font-family="monospace" font-size="13" font-weight="700" fill="#0f172a" text-anchor="end">0 85000 92819 4</text>
      </g>

      <g transform="translate(0, 325)">
        <rect width="460" height="48" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">Critic Scores</text>
        <rect x="330" y="11" width="114" height="26" rx="13" fill="#e0e7ff"/>
        <text x="387" y="28" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#4338ca" text-anchor="middle">WS: 98 | WA: 97</text>
      </g>

      <g transform="translate(0, 383)">
        <rect width="460" height="48" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">User Rating &amp; Reviews</text>
        <text x="444" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f172a" text-anchor="end">4.8 ★ (1,840 reviews)</text>
      </g>

      <g transform="translate(0, 441)">
        <rect width="460" height="48" rx="10" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
        <text x="16" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="600" fill="#64748b">Store Location / Zip</text>
        <text x="444" y="29" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f172a" text-anchor="end">Total Wine #1102 (90210)</text>
      </g>
    </g>

    <g transform="translate(40, 595)">
      <rect width="960" height="45" rx="8" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
      <circle cx="24" cy="22" r="5" fill="#10b981"/>
      <text x="38" y="27" font-family="monospace" font-size="12" font-weight="600" fill="#047857">STATUS: 200 OK</text>
      <text x="210" y="27" font-family="monospace" font-size="12" fill="#64748b">Parsed 16/16 Attributes</text>
      <text x="430" y="27" font-family="monospace" font-size="12" fill="#64748b">Encoding: UTF-8 JSON</text>
      <text x="680" y="27" font-family="monospace" font-size="12" fill="#64748b">Delivery: Webhook / Snowflake S3</text>
      <rect x="880" y="10" width="70" height="25" rx="6" fill="#10b981"/>
      <text x="915" y="27" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">SYNCED</text>
    </g>
  </g>
</svg>
`;

// ─────────────────────────────────────────────────────────────
// 3. AGE GATE BYPASS IMAGE
// ─────────────────────────────────────────────────────────────
const svgAgeGate = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" fill="none">
  <defs>
    <linearGradient id="agBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#fdfcff"/>
      <stop offset="100%" stop-color="#f5f3ff"/>
    </linearGradient>

    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f46e5"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>

    <linearGradient id="passGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#047857"/>
    </linearGradient>

    <filter id="shadowMain" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#4f46e5" flood-opacity="0.1"/>
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.04"/>
    </filter>
  </defs>

  <rect width="1200" height="900" rx="24" fill="url(#agBg)"/>

  <g transform="translate(80, 50)">
    <rect width="320" height="36" rx="18" fill="#e0e7ff" stroke="#c7d2fe" stroke-width="1"/>
    <circle cx="20" cy="18" r="5" fill="#4338ca"/>
    <text x="36" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#4338ca" letter-spacing="1">
      AUTOMATED SESSION ENGINE
    </text>
    <text x="0" y="75" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#0f172a">
      Automated Age Verification Bypassing
    </text>
    <text x="0" y="105" font-family="system-ui, sans-serif" font-size="15" font-weight="500" fill="#64748b">
      Stateful cookie injection, simulated birthdate forms, and zero-interruption crawling
    </text>
  </g>

  <g transform="translate(80, 180)">
    <!-- LEFT STEP -->
    <g transform="translate(0, 0)" filter="url(#shadowMain)">
      <rect width="360" height="520" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect width="360" height="42" rx="18" fill="#334155"/>
      <rect y="24" width="360" height="18" fill="#334155"/>
      <circle cx="24" cy="21" r="5" fill="#ef4444"/>
      <circle cx="40" cy="21" r="5" fill="#f59e0b"/>
      <circle cx="56" cy="21" r="5" fill="#10b981"/>
      <text x="80" y="26" font-family="monospace" font-size="11" fill="#cbd5e1">https://retailer.com/age-gate</text>

      <g transform="translate(30, 70)">
        <rect width="300" height="230" rx="12" fill="#fff1f2" stroke="#fecdd3" stroke-width="1.5"/>
        <circle cx="150" cy="45" r="28" fill="#e11d48"/>
        <text x="150" y="52" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle">21+</text>

        <text x="150" y="98" font-family="system-ui, sans-serif" font-size="15" font-weight="800" fill="#881337" text-anchor="middle">
          Age Verification Required
        </text>
        <text x="150" y="118" font-family="system-ui, sans-serif" font-size="11" fill="#9f1239" text-anchor="middle">
          Please confirm you are of legal drinking age
        </text>

        <g transform="translate(35, 135)">
          <rect x="0" y="0" width="60" height="34" rx="6" fill="#ffffff" stroke="#fda4af"/>
          <text x="30" y="22" font-family="monospace" font-size="12" font-weight="bold" fill="#881337" text-anchor="middle">06</text>

          <rect x="75" y="0" width="60" height="34" rx="6" fill="#ffffff" stroke="#fda4af"/>
          <text x="105" y="22" font-family="monospace" font-size="12" font-weight="bold" fill="#881337" text-anchor="middle">14</text>

          <rect x="150" y="0" width="80" height="34" rx="6" fill="#ffffff" stroke="#fda4af"/>
          <text x="190" y="22" font-family="monospace" font-size="12" font-weight="bold" fill="#881337" text-anchor="middle">1992</text>
        </g>

        <rect x="35" y="180" width="230" height="36" rx="8" fill="#e11d48"/>
        <text x="150" y="203" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">
          CONFIRM AGE (21+)
        </text>
      </g>

      <g transform="translate(30, 325)">
        <text x="0" y="20" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#0f172a">
          Traditional Scraper Blocker
        </text>
        <text x="0" y="42" font-family="system-ui, sans-serif" font-size="12" fill="#64748b">
          Standard HTTP crawlers get stuck in infinite redirects or receive blank 403 Forbidden pages.
        </text>

        <rect x="0" y="80" width="300" height="40" rx="8" fill="#fee2e2"/>
        <text x="15" y="105" font-family="monospace" font-size="11" font-weight="bold" fill="#b91c1c">
          ⚠️ Bot Challenge: Loop Detected
        </text>
      </g>
    </g>

    <!-- CENTER STEP -->
    <g transform="translate(400, 40)" filter="url(#shadowMain)">
      <rect width="240" height="440" rx="18" fill="url(#shieldGrad)"/>

      <circle cx="120" cy="70" r="36" fill="#4338ca"/>
      <path d="M 120 45 L 145 58 L 145 85 C 145 102 120 115 120 115 C 120 115 95 102 95 85 L 95 58 Z" fill="#6366f1"/>
      <path d="M 112 78 L 118 84 L 132 68" stroke="#ffffff" stroke-width="3" stroke-linecap="round" fill="none"/>

      <text x="120" y="135" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#ffffff" text-anchor="middle">
        Bypass Engine
      </text>
      <text x="120" y="155" font-family="system-ui, sans-serif" font-size="11" font-weight="500" fill="#a5b4fc" text-anchor="middle">
        Stateful Headless Handler
      </text>

      <g transform="translate(20, 180)">
        <rect width="200" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-width="1"/>
        <text x="12" y="22" font-family="sans-serif" font-size="11" font-weight="700" fill="#a5b4fc">1. Token Synthesis</text>
        <text x="12" y="38" font-family="monospace" font-size="9" fill="#e0e7ff">auth_age_gate=true</text>

        <rect y="60" width="200" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-width="1"/>
        <text x="12" y="82" font-family="sans-serif" font-size="11" font-weight="700" fill="#a5b4fc">2. Cookie Persistence</text>
        <text x="12" y="98" font-family="monospace" font-size="9" fill="#e0e7ff">session_max_age=86400</text>

        <rect y="120" width="200" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" stroke-width="1"/>
        <text x="12" y="142" font-family="sans-serif" font-size="11" font-weight="700" fill="#a5b4fc">3. DOM Event Mock</text>
        <text x="12" y="158" font-family="monospace" font-size="9" fill="#10b981">dispatchEvent("Enter")</text>

        <rect y="180" width="200" height="40" rx="8" fill="#10b981"/>
        <text x="100" y="205" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">
          GATE BYPASS: 100%
        </text>
      </g>
    </g>

    <!-- RIGHT STEP -->
    <g transform="translate(680, 0)" filter="url(#shadowMain)">
      <rect width="360" height="520" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect width="360" height="42" rx="18" fill="url(#passGrad)"/>
      <circle cx="24" cy="21" r="5" fill="#a7f3d0"/>
      <text x="42" y="26" font-family="monospace" font-size="11" font-weight="bold" fill="#ffffff">
        STOREFRONT CATALOG ACCESSED
      </text>

      <g transform="translate(24, 65)">
        <text x="0" y="15" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#065f46">
          LIVE DATA STREAM UNLOCKED
        </text>

        <g transform="translate(0, 30)">
          <rect width="312" height="70" rx="10" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>
          <text x="14" y="24" font-family="sans-serif" font-size="12" font-weight="700" fill="#0f172a">Veuve Clicquot Yellow Label</text>
          <text x="14" y="42" font-family="sans-serif" font-size="11" fill="#64748b">Champagne Brut • 750ml</text>
          <text x="14" y="58" font-family="monospace" font-size="11" font-weight="bold" fill="#047857">$68.99 | In Stock: 24</text>
          <rect x="235" y="20" width="65" height="24" rx="12" fill="#dcfce7"/>
          <text x="267" y="36" font-family="sans-serif" font-size="10" font-weight="bold" fill="#15803d" text-anchor="middle">200 OK</text>
        </g>

        <g transform="translate(0, 115)">
          <rect width="312" height="70" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
          <text x="14" y="24" font-family="sans-serif" font-size="12" font-weight="700" fill="#0f172a">Hennessy XO Cognac</text>
          <text x="14" y="42" font-family="sans-serif" font-size="11" fill="#64748b">French Cognac • 40% ABV • 750ml</text>
          <text x="14" y="58" font-family="monospace" font-size="11" font-weight="bold" fill="#047857">$249.99 | In Stock: 6</text>
          <rect x="235" y="20" width="65" height="24" rx="12" fill="#dcfce7"/>
          <text x="267" y="36" font-family="sans-serif" font-size="10" font-weight="bold" fill="#15803d" text-anchor="middle">200 OK</text>
        </g>

        <g transform="translate(0, 200)">
          <rect width="312" height="70" rx="10" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
          <text x="14" y="24" font-family="sans-serif" font-size="12" font-weight="700" fill="#0f172a">Guinness Draught Stout</text>
          <text x="14" y="42" font-family="sans-serif" font-size="11" fill="#64748b">Irish Dry Stout 8-Pack Cans</text>
          <text x="14" y="58" font-family="monospace" font-size="11" font-weight="bold" fill="#047857">$16.49 | In Stock: 58</text>
          <rect x="235" y="20" width="65" height="24" rx="12" fill="#dcfce7"/>
          <text x="267" y="36" font-family="sans-serif" font-size="10" font-weight="bold" fill="#15803d" text-anchor="middle">200 OK</text>
        </g>

        <g transform="translate(0, 285)">
          <rect width="312" height="90" rx="10" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1"/>
          <text x="16" y="25" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#065f46">BYPASS BENCHMARKS</text>
          <text x="16" y="48" font-family="sans-serif" font-size="11" fill="#047857">✓ 0 Captcha Failures</text>
          <text x="16" y="68" font-family="sans-serif" font-size="11" fill="#047857">✓ Multi-Region Proxy Rotation</text>
          <text x="170" y="48" font-family="sans-serif" font-size="11" fill="#047857">✓ Continuous Feed</text>
          <text x="170" y="68" font-family="sans-serif" font-size="11" fill="#047857">✓ Hourly Freshness</text>
        </g>
      </g>
    </g>

    <path d="M 370 260 L 390 260" stroke="#6366f1" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/>
    <path d="M 650 260 L 670 260" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>
    <polygon points="675,260 667,255 667,265" fill="#10b981"/>
  </g>

  <!-- Bottom Badges -->
  <g transform="translate(80, 755)">
    <rect width="1040" height="95" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
    <g transform="translate(40, 25)">
      <circle cx="22" cy="22" r="18" fill="#e0e7ff"/>
      <text x="22" y="28" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#4338ca" text-anchor="middle">1</text>
      <text x="50" y="18" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Stateful Session Handling</text>
      <text x="50" y="38" font-family="system-ui, sans-serif" font-size="11.5" fill="#64748b">Persistent cookies prevent repetitive age challenge triggers</text>
    </g>
    <line x1="370" y1="20" x2="370" y2="75" stroke="#f1f5f9" stroke-width="2"/>
    <g transform="translate(400, 25)">
      <circle cx="22" cy="22" r="18" fill="#fef3c7"/>
      <text x="22" y="28" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#b45309" text-anchor="middle">2</text>
      <text x="50" y="18" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Automatic Mocking</text>
      <text x="50" y="38" font-family="system-ui, sans-serif" font-size="11.5" fill="#64748b">Automated date of birth entry &amp; pop-up dismissal</text>
    </g>
    <line x1="720" y1="20" x2="720" y2="75" stroke="#f1f5f9" stroke-width="2"/>
    <g transform="translate(750, 25)">
      <circle cx="22" cy="22" r="18" fill="#dcfce7"/>
      <text x="22" y="28" font-family="system-ui, sans-serif" font-size="15" font-weight="bold" fill="#15803d" text-anchor="middle">3</text>
      <text x="50" y="18" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Zero Interruption</text>
      <text x="50" y="38" font-family="system-ui, sans-serif" font-size="11.5" fill="#64748b">Non-stop crawler runs with 99.98% reliability</text>
    </g>
  </g>
</svg>
`;

// ─────────────────────────────────────────────────────────────
// 4. SKU MATCHING & PRICING INTELLIGENCE IMAGE
// ─────────────────────────────────────────────────────────────
const svgSkuMatching = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" fill="none">
  <defs>
    <linearGradient id="skuBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#fffbf7"/>
      <stop offset="100%" stop-color="#fdf4ea"/>
    </linearGradient>

    <linearGradient id="scanBeam" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.1"/>
      <stop offset="50%" stop-color="#ef4444" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#ef4444" stop-opacity="0.1"/>
    </linearGradient>

    <filter id="shadowMain" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#b45309" flood-opacity="0.08"/>
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.04"/>
    </filter>
  </defs>

  <rect width="1200" height="900" rx="24" fill="url(#skuBg)"/>

  <g transform="translate(80, 50)">
    <rect width="320" height="36" rx="18" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>
    <circle cx="20" cy="18" r="5" fill="#d97706"/>
    <text x="36" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#b45309" letter-spacing="1">
      BARCODE &amp; PRICE PARITY ENGINE
    </text>
    <text x="0" y="75" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#0f172a">
      SKU Matching &amp; Pricing Intelligence
    </text>
    <text x="0" y="105" font-family="system-ui, sans-serif" font-size="15" font-weight="500" fill="#64748b">
      Cross-referencing identical alcohol SKUs via UPC barcodes across Total Wine, Drizly, Wine.com &amp; BevMo
    </text>
  </g>

  <g transform="translate(80, 180)">
    <!-- LEFT: Master Target SKU -->
    <g transform="translate(0, 0)" filter="url(#shadowMain)">
      <rect width="420" height="520" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect width="420" height="8" rx="4" fill="#d97706"/>

      <rect x="24" y="24" width="130" height="26" rx="13" fill="#fef3c7"/>
      <text x="89" y="41" font-family="sans-serif" font-size="11" font-weight="bold" fill="#b45309" text-anchor="middle">
        MASTER TARGET SKU
      </text>

      <rect x="270" y="24" width="125" height="26" rx="13" fill="#ecfdf5"/>
      <text x="332" y="41" font-family="sans-serif" font-size="11" font-weight="bold" fill="#059669" text-anchor="middle">
        MATCH: 99.8%
      </text>

      <g transform="translate(30, 70)">
        <rect width="360" height="230" rx="14" fill="#fafaf9" stroke="#f5f5f4" stroke-width="1.5"/>

        <g transform="translate(45, 20)">
          <rect x="18" y="0" width="14" height="20" rx="2" fill="#78350f"/>
          <rect x="15" y="20" width="20" height="30" fill="#d97706"/>
          <path d="M 15 50 C 2 60, -4 75, -4 95 L -4 165 C -4 170, 0 175, 5 175 L 45 175 C 50 175, 54 170, 54 165 L 54 95 C 54 75, 48 60, 35 50 Z" fill="#b45309"/>
          <rect x="2" y="90" width="46" height="60" rx="2" fill="#fff" opacity="0.95"/>
          <rect x="5" y="95" width="40" height="12" fill="#1e293b"/>
          <text x="25" y="104" font-family="sans-serif" font-size="6.5" font-weight="bold" fill="#f59e0b" text-anchor="middle">BLUE LABEL</text>
        </g>

        <!-- Barcode Graphic -->
        <g transform="translate(150, 45)">
          <text x="0" y="0" font-family="sans-serif" font-size="11" font-weight="700" fill="#64748b">UPC-A BARCODE SCAN</text>

          <g transform="translate(0, 15)">
            <rect width="180" height="85" fill="#ffffff" stroke="#e2e8f0" rx="6"/>
            <rect x="15" y="12" width="3" height="50" fill="#000"/>
            <rect x="20" y="12" width="2" height="50" fill="#000"/>
            <rect x="25" y="12" width="4" height="42" fill="#000"/>
            <rect x="33" y="12" width="2" height="42" fill="#000"/>
            <rect x="40" y="12" width="5" height="42" fill="#000"/>
            <rect x="48" y="12" width="2" height="42" fill="#000"/>
            <rect x="55" y="12" width="3" height="42" fill="#000"/>
            <rect x="62" y="12" width="6" height="42" fill="#000"/>
            <rect x="73" y="12" width="2" height="42" fill="#000"/>
            <rect x="80" y="12" width="4" height="42" fill="#000"/>
            <rect x="88" y="12" width="3" height="50" fill="#000"/>
            <rect x="94" y="12" width="2" height="50" fill="#000"/>
            <rect x="100" y="12" width="4" height="42" fill="#000"/>
            <rect x="108" y="12" width="5" height="42" fill="#000"/>
            <rect x="117" y="12" width="2" height="42" fill="#000"/>
            <rect x="124" y="12" width="4" height="42" fill="#000"/>
            <rect x="132" y="12" width="3" height="42" fill="#000"/>
            <rect x="140" y="12" width="5" height="42" fill="#000"/>
            <rect x="150" y="12" width="2" height="42" fill="#000"/>
            <rect x="158" y="12" width="3" height="50" fill="#000"/>
            <rect x="163" y="12" width="2" height="50" fill="#000"/>
            <text x="90" y="76" font-family="monospace" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">
              0 88076 16186 8
            </text>

            <line x1="5" y1="36" x2="175" y2="36" stroke="#ef4444" stroke-width="2.5"/>
            <rect x="5" y="28" width="170" height="16" fill="url(#scanBeam)"/>
          </g>

          <text x="0" y="125" font-family="sans-serif" font-size="11" font-weight="600" fill="#059669">
            ✓ Barcode Verified across 4 Retailers
          </text>
        </g>
      </g>

      <g transform="translate(30, 320)">
        <text x="0" y="20" font-family="system-ui, sans-serif" font-size="18" font-weight="900" fill="#0f172a">
          Johnnie Walker Blue Label
        </text>
        <text x="0" y="42" font-family="system-ui, sans-serif" font-size="13" font-weight="500" fill="#64748b">
          Blended Scotch Whisky • 40% ABV • 750ml Bottle
        </text>

        <g transform="translate(0, 65)">
          <rect width="360" height="95" rx="12" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
          <text x="20" y="28" font-family="sans-serif" font-size="12" fill="#64748b">Cross-Retailer Price Spread</text>
          <text x="20" y="58" font-family="sans-serif" font-size="24" font-weight="900" fill="#0f172a">$179.99 — $209.50</text>
          <text x="20" y="80" font-family="sans-serif" font-size="12" font-weight="700" fill="#d97706">
            Spread Variance: 16.4% ($29.51 discrepancy)
          </text>
        </g>
      </g>
    </g>

    <!-- RIGHT: 4 Retailers -->
    <g transform="translate(460, 0)">
      <!-- Retailer 1: Total Wine -->
      <g transform="translate(0, 0)" filter="url(#shadowMain)">
        <rect width="580" height="115" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
        <rect width="6" height="115" rx="3" fill="#9f1239"/>
        <text x="24" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#0f172a">
          Total Wine &amp; More
        </text>
        <rect x="24" y="44" width="115" height="22" rx="11" fill="#f1f5f9"/>
        <text x="81" y="59" font-family="sans-serif" font-size="11" font-weight="600" fill="#475569" text-anchor="middle">In-Store &amp; Online</text>
        <text x="24" y="94" font-family="sans-serif" font-size="12" fill="#64748b">SKU: TW-491029 • Stock: 14 bottles left</text>

        <text x="550" y="42" font-family="sans-serif" font-size="26" font-weight="900" fill="#0f172a" text-anchor="end">
          $189.99
        </text>
        <text x="550" y="66" font-family="sans-serif" font-size="12" fill="#94a3b8" text-anchor="end">MSRP: $229.99</text>
        <rect x="440" y="78" width="110" height="24" rx="12" fill="#ecfdf5"/>
        <text x="495" y="94" font-family="sans-serif" font-size="11" font-weight="bold" fill="#059669" text-anchor="middle">
          -17% Off List
        </text>
      </g>

      <!-- Retailer 2: BevMo -->
      <g transform="translate(0, 135)" filter="url(#shadowMain)">
        <rect width="580" height="115" rx="14" fill="#ffffff" stroke="#059669" stroke-width="2"/>
        <rect width="6" height="115" rx="3" fill="#059669"/>
        <text x="24" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#0f172a">
          BevMo!
        </text>
        <rect x="24" y="44" width="135" height="22" rx="11" fill="#ecfdf5"/>
        <text x="91" y="59" font-family="sans-serif" font-size="11" font-weight="700" fill="#059669" text-anchor="middle">★ LOWEST PRICE</text>
        <text x="24" y="94" font-family="sans-serif" font-size="12" fill="#64748b">SKU: BM-881920 • Member Club Markdown</text>

        <text x="550" y="42" font-family="sans-serif" font-size="28" font-weight="900" fill="#059669" text-anchor="end">
          $179.99
        </text>
        <text x="550" y="66" font-family="sans-serif" font-size="12" font-weight="700" fill="#047857" text-anchor="end">Best Buy Deal</text>
        <rect x="420" y="78" width="130" height="24" rx="12" fill="#dcfce7"/>
        <text x="485" y="94" font-family="sans-serif" font-size="11" font-weight="bold" fill="#15803d" text-anchor="middle">
          Saves $29.51 vs High
        </text>
      </g>

      <!-- Retailer 3: Wine.com -->
      <g transform="translate(0, 270)" filter="url(#shadowMain)">
        <rect width="580" height="115" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
        <rect width="6" height="115" rx="3" fill="#2563eb"/>
        <text x="24" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#0f172a">
          Wine.com
        </text>
        <rect x="24" y="44" width="115" height="22" rx="11" fill="#eff6ff"/>
        <text x="81" y="59" font-family="sans-serif" font-size="11" font-weight="600" fill="#2563eb" text-anchor="middle">Direct Shipping</text>
        <text x="24" y="94" font-family="sans-serif" font-size="12" fill="#64748b">SKU: WC-339102 • StewardShip eligible</text>

        <text x="550" y="42" font-family="sans-serif" font-size="26" font-weight="900" fill="#0f172a" text-anchor="end">
          $199.99
        </text>
        <text x="550" y="66" font-family="sans-serif" font-size="12" fill="#64748b" text-anchor="end">+ Free Shipping 6+</text>
        <rect x="440" y="78" width="110" height="24" rx="12" fill="#f1f5f9"/>
        <text x="495" y="94" font-family="sans-serif" font-size="11" font-weight="bold" fill="#475569" text-anchor="middle">
          Standard Tier
        </text>
      </g>

      <!-- Retailer 4: Drizly -->
      <g transform="translate(0, 405)" filter="url(#shadowMain)">
        <rect width="580" height="115" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
        <rect width="6" height="115" rx="3" fill="#dc2626"/>
        <text x="24" y="32" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#0f172a">
          Drizly / On-Demand Apps
        </text>
        <rect x="24" y="44" width="135" height="22" rx="11" fill="#fef2f2"/>
        <text x="91" y="59" font-family="sans-serif" font-size="11" font-weight="700" fill="#dc2626" text-anchor="middle">DELIVERY MARKUP</text>
        <text x="24" y="94" font-family="sans-serif" font-size="12" fill="#64748b">SKU: DZ-001928 • Local 60-min delivery courier</text>

        <text x="550" y="42" font-family="sans-serif" font-size="26" font-weight="900" fill="#dc2626" text-anchor="end">
          $209.50
        </text>
        <text x="550" y="66" font-family="sans-serif" font-size="12" font-weight="600" fill="#dc2626" text-anchor="end">+$19.51 vs Total Wine</text>
        <rect x="420" y="78" width="130" height="24" rx="12" fill="#fee2e2"/>
        <text x="485" y="94" font-family="sans-serif" font-size="11" font-weight="bold" fill="#991b1b" text-anchor="middle">
          +10.2% App Markup
        </text>
      </g>
    </g>
  </g>

  <!-- Bottom Metric Strip -->
  <g transform="translate(80, 755)">
    <rect width="1040" height="95" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
    <g transform="translate(40, 25)">
      <circle cx="22" cy="22" r="18" fill="#fef3c7"/>
      <text x="22" y="28" font-family="sans-serif" font-size="14" font-weight="bold" fill="#b45309" text-anchor="middle">UPC</text>
      <text x="50" y="18" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Barcode Cross-Referencing</text>
      <text x="50" y="38" font-family="system-ui, sans-serif" font-size="11.5" fill="#64748b">Standardized UPC/EAN mapping prevents mismatched vintage or bottle sizes</text>
    </g>
    <line x1="400" y1="20" x2="400" y2="75" stroke="#f1f5f9" stroke-width="2"/>
    <g transform="translate(430, 25)">
      <circle cx="22" cy="22" r="18" fill="#fee2e2"/>
      <text x="22" y="28" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">%</text>
      <text x="50" y="18" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Multi-Buy &amp; Case Deals</text>
      <text x="50" y="38" font-family="system-ui, sans-serif" font-size="11.5" fill="#64748b">Scrapes case discounts, mix-and-match specials, and member-only pricing</text>
    </g>
    <line x1="770" y1="20" x2="770" y2="75" stroke="#f1f5f9" stroke-width="2"/>
    <g transform="translate(800, 25)">
      <circle cx="22" cy="22" r="18" fill="#ecfdf5"/>
      <text x="22" y="28" font-family="sans-serif" font-size="14" font-weight="bold" fill="#059669" text-anchor="middle">$$</text>
      <text x="50" y="18" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Dynamic Markup Audits</text>
      <text x="50" y="38" font-family="system-ui, sans-serif" font-size="11.5" fill="#64748b">Audits on-demand courier markups against physical in-store shelf tags</text>
    </g>
  </g>
</svg>
`;

// ─────────────────────────────────────────────────────────────
// 5. LIVE INVENTORY & STORE-LEVEL STOCK TRACKING IMAGE
// ─────────────────────────────────────────────────────────────
const svgInventory = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" fill="none">
  <defs>
    <linearGradient id="invBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>

    <filter id="shadowMain" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#0f172a" flood-opacity="0.08"/>
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.04"/>
    </filter>
  </defs>

  <rect width="1200" height="900" rx="24" fill="url(#invBg)"/>

  <g transform="translate(80, 50)">
    <rect width="320" height="36" rx="18" fill="#dcfce7" stroke="#bbf7d0" stroke-width="1"/>
    <circle cx="20" cy="18" r="5" fill="#16a34a"/>
    <text x="36" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#15803d" letter-spacing="1">
      STORE-LEVEL GEO-STOCK MAPS
    </text>
    <text x="0" y="75" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#0f172a">
      Live Inventory &amp; Store Stock Tracking
    </text>
    <text x="0" y="105" font-family="system-ui, sans-serif" font-size="15" font-weight="500" fill="#64748b">
      Postal-code localized crawling, out-of-stock threshold alerts, and retail shelf share audits
    </text>
  </g>

  <g transform="translate(80, 180)">
    <!-- LEFT: Regional Map -->
    <g transform="translate(0, 0)" filter="url(#shadowMain)">
      <rect width="520" height="520" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>

      <g transform="translate(20, 20)">
        <rect width="480" height="380" rx="14" fill="#f8fafc" stroke="#e2e8f0"/>

        <path d="M 0 100 Q 150 140, 280 90 T 480 120" stroke="#e2e8f0" stroke-width="12" fill="none"/>
        <path d="M 220 0 Q 230 180, 200 380" stroke="#e2e8f0" stroke-width="10" fill="none"/>
        <path d="M 80 200 Q 260 220, 480 280" stroke="#e2e8f0" stroke-width="8" fill="none"/>
        <path d="M 0 320 Q 180 260, 360 380" stroke="#e2e8f0" stroke-width="6" fill="none"/>

        <path d="M 400 0 C 370 120, 420 220, 390 380" stroke="#bae6fd" stroke-width="18" fill="none" opacity="0.6"/>

        <circle cx="220" cy="180" r="120" fill="#10b981" fill-opacity="0.06" stroke="#10b981" stroke-dasharray="4 4"/>
        <circle cx="220" cy="180" r="60" fill="#10b981" fill-opacity="0.1" stroke="#10b981"/>

        <!-- Pins -->
        <g transform="translate(180, 140)">
          <circle cx="16" cy="16" r="18" fill="#10b981" fill-opacity="0.2"/>
          <circle cx="16" cy="16" r="10" fill="#10b981"/>
          <rect x="-40" y="-38" width="112" height="30" rx="6" fill="#0f172a"/>
          <text x="16" y="-18" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">
            Store #104: 36 units
          </text>
        </g>

        <g transform="translate(300, 100)">
          <circle cx="16" cy="16" r="18" fill="#f59e0b" fill-opacity="0.2"/>
          <circle cx="16" cy="16" r="10" fill="#f59e0b"/>
          <rect x="-45" y="-38" width="122" height="30" rx="6" fill="#0f172a"/>
          <text x="16" y="-18" font-family="sans-serif" font-size="10" font-weight="bold" fill="#fef08a" text-anchor="middle">
            Store #118: 3 units ⚠️
          </text>
        </g>

        <g transform="translate(110, 240)">
          <circle cx="16" cy="16" r="18" fill="#ef4444" fill-opacity="0.2"/>
          <circle cx="16" cy="16" r="10" fill="#ef4444"/>
          <rect x="-45" y="-38" width="122" height="30" rx="6" fill="#0f172a"/>
          <text x="16" y="-18" font-family="sans-serif" font-size="10" font-weight="bold" fill="#fca5a5" text-anchor="middle">
            Store #201: Out of Stock
          </text>
        </g>

        <g transform="translate(340, 260)">
          <circle cx="16" cy="16" r="18" fill="#10b981" fill-opacity="0.2"/>
          <circle cx="16" cy="16" r="10" fill="#10b981"/>
          <rect x="-45" y="-38" width="122" height="30" rx="6" fill="#0f172a"/>
          <text x="16" y="-18" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">
            Warehouse: 148 cases
          </text>
        </g>
      </g>

      <g transform="translate(40, 425)">
        <circle cx="10" cy="10" r="6" fill="#10b981"/>
        <text x="24" y="14" font-family="sans-serif" font-size="12" font-weight="600" fill="#475569">In Stock (10+)</text>

        <circle cx="150" cy="10" r="6" fill="#f59e0b"/>
        <text x="164" y="14" font-family="sans-serif" font-size="12" font-weight="600" fill="#475569">Low Stock (&lt;5)</text>

        <circle cx="280" cy="10" r="6" fill="#ef4444"/>
        <text x="294" y="14" font-family="sans-serif" font-size="12" font-weight="600" fill="#475569">Out of Stock</text>

        <rect x="380" y="-3" width="90" height="24" rx="6" fill="#f1f5f9"/>
        <text x="425" y="13" font-family="monospace" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">Zip: 90210</text>
      </g>

      <g transform="translate(40, 465)">
        <text x="0" y="20" font-family="sans-serif" font-size="12" fill="#64748b">
          Active Local Geo-Nodes: 48 local retail stores indexed in 15-mile radius
        </text>
      </g>
    </g>

    <!-- RIGHT: Store Feed -->
    <g transform="translate(550, 0)">
      <g transform="translate(0, 0)" filter="url(#shadowMain)">
        <rect width="490" height="115" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
        <rect width="6" height="115" rx="3" fill="#10b981"/>
        <text x="24" y="32" font-family="sans-serif" font-size="15" font-weight="800" fill="#0f172a">
          Store #104 — Downtown Grand St.
        </text>
        <text x="24" y="52" font-family="sans-serif" font-size="12" fill="#64748b">
          Postal Code: 10002 • Last sync: 4 minutes ago
        </text>
        <rect x="24" y="70" width="130" height="26" rx="13" fill="#dcfce7"/>
        <text x="89" y="87" font-family="sans-serif" font-size="11" font-weight="700" fill="#15803d" text-anchor="middle">
          ✓ IN STOCK (36 BOTTLES)
        </text>
        <text x="460" y="45" font-family="sans-serif" font-size="28" font-weight="900" fill="#047857" text-anchor="end">
          36
        </text>
        <text x="460" y="65" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="end">Bottles on Shelf</text>
      </g>

      <g transform="translate(0, 135)" filter="url(#shadowMain)">
        <rect width="490" height="115" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
        <rect width="6" height="115" rx="3" fill="#f59e0b"/>
        <text x="24" y="32" font-family="sans-serif" font-size="15" font-weight="800" fill="#0f172a">
          Store #118 — Westside Galleria
        </text>
        <text x="24" y="52" font-family="sans-serif" font-size="12" fill="#64748b">
          Postal Code: 10023 • Last sync: 12 minutes ago
        </text>
        <rect x="24" y="70" width="130" height="26" rx="13" fill="#fef3c7"/>
        <text x="89" y="87" font-family="sans-serif" font-size="11" font-weight="700" fill="#b45309" text-anchor="middle">
          ⚠️ LOW STOCK (3 UNITS)
        </text>
        <text x="460" y="45" font-family="sans-serif" font-size="28" font-weight="900" fill="#d97706" text-anchor="end">
          3
        </text>
        <text x="460" y="65" font-family="sans-serif" font-size="11" fill="#d97706" text-anchor="end">Reorder Triggered</text>
      </g>

      <g transform="translate(0, 270)" filter="url(#shadowMain)">
        <rect width="490" height="115" rx="14" fill="#ffffff" stroke="#fecaca" stroke-width="1.5"/>
        <rect width="6" height="115" rx="3" fill="#ef4444"/>
        <text x="24" y="32" font-family="sans-serif" font-size="15" font-weight="800" fill="#0f172a">
          Store #201 — Midtown Plaza
        </text>
        <text x="24" y="52" font-family="sans-serif" font-size="12" fill="#64748b">
          Postal Code: 10018 • Last sync: 2 minutes ago
        </text>
        <rect x="24" y="70" width="140" height="26" rx="13" fill="#fee2e2"/>
        <text x="94" y="87" font-family="sans-serif" font-size="11" font-weight="700" fill="#dc2626" text-anchor="middle">
          ✕ OUT OF STOCK ALERT
        </text>
        <text x="460" y="45" font-family="sans-serif" font-size="28" font-weight="900" fill="#dc2626" text-anchor="end">
          0
        </text>
        <text x="460" y="65" font-family="sans-serif" font-size="11" fill="#dc2626" text-anchor="end">Restock: in 2 days</text>
      </g>

      <g transform="translate(0, 405)" filter="url(#shadowMain)">
        <rect width="490" height="115" rx="14" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
        <rect width="6" height="115" rx="3" fill="#2563eb"/>
        <text x="24" y="32" font-family="sans-serif" font-size="15" font-weight="800" fill="#0f172a">
          Central Hub — Brooklyn Distribution Terminal
        </text>
        <text x="24" y="52" font-family="sans-serif" font-size="12" fill="#64748b">
          Bulk Distribution Node • Feeds 18 Local Stores
        </text>
        <rect x="24" y="70" width="130" height="26" rx="13" fill="#eff6ff"/>
        <text x="89" y="87" font-family="sans-serif" font-size="11" font-weight="700" fill="#2563eb" text-anchor="middle">
          BULK INVENTORY
        </text>
        <text x="460" y="45" font-family="sans-serif" font-size="28" font-weight="900" fill="#2563eb" text-anchor="end">
          148
        </text>
        <text x="460" y="65" font-family="sans-serif" font-size="11" fill="#64748b" text-anchor="end">Cases Available</text>
      </g>
    </g>
  </g>

  <!-- Bottom Metric Strip -->
  <g transform="translate(80, 755)">
    <rect width="1040" height="95" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
    <g transform="translate(40, 25)">
      <circle cx="22" cy="22" r="18" fill="#dcfce7"/>
      <text x="22" y="28" font-family="sans-serif" font-size="14" font-weight="bold" fill="#16a34a" text-anchor="middle">ZIP</text>
      <text x="50" y="18" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Zip-Code Level Ingestion</text>
      <text x="50" y="38" font-family="system-ui, sans-serif" font-size="11.5" fill="#64748b">Extract stock availability and bottle counts down to specific neighborhood stores</text>
    </g>
    <line x1="390" y1="20" x2="390" y2="75" stroke="#f1f5f9" stroke-width="2"/>
    <g transform="translate(420, 25)">
      <circle cx="22" cy="22" r="18" fill="#fee2e2"/>
      <text x="22" y="28" font-family="sans-serif" font-size="14" font-weight="bold" fill="#dc2626" text-anchor="middle">!</text>
      <text x="50" y="18" font-family="sans-serif" font-size="13" font-weight="800" fill="#0f172a">Instant Out-of-Stock Alerting</text>
      <text x="50" y="38" font-family="sans-serif" font-size="11.5" fill="#64748b">Triggers automated webhooks to alert suppliers when inventory reaches zero</text>
    </g>
    <line x1="770" y1="20" x2="770" y2="75" stroke="#f1f5f9" stroke-width="2"/>
    <g transform="translate(800, 25)">
      <circle cx="22" cy="22" r="18" fill="#eff6ff"/>
      <text x="22" y="28" font-family="sans-serif" font-size="14" font-weight="bold" fill="#2563eb" text-anchor="middle">%</text>
      <text x="50" y="18" font-family="sans-serif" font-size="13" font-weight="800" fill="#0f172a">Digital Shelf Share Audits</text>
      <text x="50" y="38" font-family="sans-serif" font-size="11.5" fill="#64748b">Measure search placement and brand representation across online liquor portals</text>
    </g>
  </g>
</svg>
`;

// ─────────────────────────────────────────────────────────────
// 6. CRITIC REVIEWS & TASTING DATA INGESTION IMAGE
// ─────────────────────────────────────────────────────────────
const svgReviews = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" fill="none">
  <defs>
    <linearGradient id="revBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#fdfbfa"/>
      <stop offset="100%" stop-color="#f8f4f0"/>
    </linearGradient>

    <linearGradient id="rubyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#9f1239"/>
      <stop offset="100%" stop-color="#4c0519"/>
    </linearGradient>

    <filter id="shadowMain" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#881337" flood-opacity="0.08"/>
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.04"/>
    </filter>
  </defs>

  <rect width="1200" height="900" rx="24" fill="url(#revBg)"/>

  <g transform="translate(80, 50)">
    <rect width="320" height="36" rx="18" fill="#ffe4e6" stroke="#fecdd3" stroke-width="1"/>
    <circle cx="20" cy="18" r="5" fill="#be123c"/>
    <text x="36" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#9f1239" letter-spacing="1">
      SENSORY &amp; CRITIC AGGREGATOR
    </text>
    <text x="0" y="75" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#0f172a">
      Critic Reviews &amp; Tasting Data Ingestion
    </text>
    <text x="0" y="105" font-family="system-ui, sans-serif" font-size="15" font-weight="500" fill="#64748b">
      100-point critic scores, NLP sensory flavor descriptor extraction, and Vivino review mining
    </text>
  </g>

  <g transform="translate(80, 180)">
    <!-- LEFT: Critic Scores -->
    <g transform="translate(0, 0)" filter="url(#shadowMain)">
      <rect width="480" height="520" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect width="480" height="8" rx="4" fill="url(#rubyGrad)"/>

      <g transform="translate(30, 30)">
        <text x="0" y="18" font-family="system-ui, sans-serif" font-size="18" font-weight="900" fill="#0f172a">
          Château Mouton Rothschild 2016
        </text>
        <text x="0" y="38" font-family="sans-serif" font-size="13" font-weight="500" fill="#64748b">
          Pauillac Grand Cru Classé • Red Bordeaux Blend
        </text>
      </g>

      <g transform="translate(30, 95)">
        <g transform="translate(0, 0)">
          <rect width="200" height="85" rx="12" fill="#fff1f2" stroke="#fecdd3" stroke-width="1"/>
          <text x="16" y="24" font-family="sans-serif" font-size="11" font-weight="700" fill="#9f1239">WINE SPECTATOR</text>
          <text x="16" y="55" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#881337">98</text>
          <text x="56" y="55" font-family="sans-serif" font-size="14" font-weight="600" fill="#9f1239">/100</text>
          <text x="16" y="74" font-family="sans-serif" font-size="10" font-weight="600" fill="#be123c">Classic / Superb</text>
        </g>

        <g transform="translate(220, 0)">
          <rect width="200" height="85" rx="12" fill="#fef3c7" stroke="#fde68a" stroke-width="1"/>
          <text x="16" y="24" font-family="sans-serif" font-size="11" font-weight="700" fill="#b45309">WINE ADVOCATE (RP)</text>
          <text x="16" y="55" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#92400e">97+</text>
          <text x="65" y="55" font-family="sans-serif" font-size="14" font-weight="600" fill="#b45309">/100</text>
          <text x="16" y="74" font-family="sans-serif" font-size="10" font-weight="600" fill="#d97706">Extraordinary Depth</text>
        </g>

        <g transform="translate(0, 100)">
          <rect width="200" height="85" rx="12" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1"/>
          <text x="16" y="24" font-family="sans-serif" font-size="11" font-weight="700" fill="#047857">JAMES SUCKLING</text>
          <text x="16" y="55" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#065f46">99</text>
          <text x="56" y="55" font-family="sans-serif" font-size="14" font-weight="600" fill="#047857">/100</text>
          <text x="16" y="74" font-family="sans-serif" font-size="10" font-weight="600" fill="#059669">Near Perfection</text>
        </g>

        <g transform="translate(220, 100)">
          <rect width="200" height="85" rx="12" fill="#e0e7ff" stroke="#c7d2fe" stroke-width="1"/>
          <text x="16" y="24" font-family="sans-serif" font-size="11" font-weight="700" fill="#4338ca">DECANTER PANEL</text>
          <text x="16" y="55" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#312e81">97</text>
          <text x="56" y="55" font-family="sans-serif" font-size="14" font-weight="600" fill="#4338ca">/100</text>
          <text x="16" y="74" font-family="sans-serif" font-size="10" font-weight="600" fill="#4f46e5">Gold Medal Winner</text>
        </g>
      </g>

      <g transform="translate(30, 310)">
        <rect width="420" height="175" rx="14" fill="#fafaf9" stroke="#f5f5f4" stroke-width="1"/>
        <text x="20" y="28" font-family="sans-serif" font-size="13" font-weight="700" fill="#0f172a">
          CONSUMER CROWD RATINGS (VIVINO &amp; CELLARTRACKER)
        </text>

        <g transform="translate(20, 45)">
          <text x="0" y="32" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#0f172a">4.7</text>
          <g transform="translate(65, 12)" fill="#f59e0b">
            <polygon points="10,1 12,7 18,7 13,11 15,17 10,13 5,17 7,11 2,7 8,7"/>
            <polygon points="30,1 32,7 38,7 33,11 35,17 30,13 25,17 27,11 22,7 28,7"/>
            <polygon points="50,1 52,7 58,7 53,11 55,17 50,13 45,17 47,11 42,7 48,7"/>
            <polygon points="70,1 72,7 78,7 73,11 75,17 70,13 65,17 67,11 62,7 68,7"/>
            <polygon points="90,1 92,7 98,7 93,11 95,17 90,13 85,17 87,11 82,7 88,7"/>
          </g>
          <text x="65" y="36" font-family="sans-serif" font-size="12" fill="#64748b">Based on 3,842 user reviews</text>
        </g>

        <g transform="translate(20, 105)">
          <rect width="380" height="8" rx="4" fill="#e2e8f0"/>
          <rect width="320" height="8" rx="4" fill="#059669"/>
          <rect width="38" height="8" rx="4" fill="#f59e0b" x="320"/>
          <text x="0" y="24" font-family="sans-serif" font-size="11" font-weight="600" fill="#059669">92% 5-Star</text>
          <text x="80" y="24" font-family="sans-serif" font-size="11" fill="#64748b">6% 4-Star</text>
          <text x="380" y="24" font-family="sans-serif" font-size="11" fill="#94a3b8" text-anchor="end">2% &lt;3-Star</text>
        </g>
      </g>
    </g>

    <!-- RIGHT: NLP Notes -->
    <g transform="translate(510, 0)" filter="url(#shadowMain)">
      <rect width="530" height="520" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>

      <g transform="translate(30, 30)">
        <rect width="130" height="24" rx="12" fill="#fdf2f8"/>
        <text x="65" y="16" font-family="sans-serif" font-size="11" font-weight="bold" fill="#9f1239" text-anchor="middle">
          NLP TEXT MINING
        </text>
        <text x="0" y="48" font-family="system-ui, sans-serif" font-size="18" font-weight="900" fill="#0f172a">
          Extracted Tasting Notes &amp; Flavor Profile
        </text>
        <text x="0" y="70" font-family="sans-serif" font-size="13" fill="#64748b">
          Automatic keyword parsing from thousands of sommelier notes
        </text>
      </g>

      <g transform="translate(30, 125)">
        <rect x="0" y="0" width="135" height="36" rx="18" fill="#ffe4e6" stroke="#fecdd3"/>
        <text x="67" y="23" font-family="sans-serif" font-size="12" font-weight="700" fill="#881337" text-anchor="middle">🍇 Blackcurrant (94%)</text>

        <rect x="145" y="0" width="115" height="36" rx="18" fill="#fef3c7" stroke="#fde68a"/>
        <text x="202" y="23" font-family="sans-serif" font-size="12" font-weight="700" fill="#92400e" text-anchor="middle">🪵 Cedar Oak</text>

        <rect x="270" y="0" width="125" height="36" rx="18" fill="#f3e8ff" stroke="#e9d5ff"/>
        <text x="332" y="23" font-family="sans-serif" font-size="12" font-weight="700" fill="#6b21a8" text-anchor="middle">🌸 Violet Floral</text>

        <rect x="0" y="48" width="110" height="36" rx="18" fill="#ecfdf5" stroke="#a7f3d0"/>
        <text x="55" y="71" font-family="sans-serif" font-size="12" font-weight="700" fill="#065f46" text-anchor="middle">🌿 Fresh Mint</text>

        <rect x="120" y="48" width="150" height="36" rx="18" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="195" y="71" font-family="sans-serif" font-size="12" font-weight="700" fill="#334155" text-anchor="middle">☕ Roasted Espresso</text>

        <rect x="280" y="48" width="135" height="36" rx="18" fill="#fff7ed" stroke="#fed7aa"/>
        <text x="347" y="71" font-family="sans-serif" font-size="12" font-weight="700" fill="#9a3412" text-anchor="middle">🍫 Dark Truffle</text>

        <rect x="0" y="96" width="155" height="36" rx="18" fill="#ffe4e6" stroke="#fecdd3"/>
        <text x="77" y="119" font-family="sans-serif" font-size="12" font-weight="700" fill="#881337" text-anchor="middle">🍷 Silky Tannins (98%)</text>

        <rect x="165" y="96" width="145" height="36" rx="18" fill="#e0e7ff" stroke="#c7d2fe"/>
        <text x="237" y="119" font-family="sans-serif" font-size="12" font-weight="700" fill="#3730a3" text-anchor="middle">⛰️ Graphite Mineral</text>
      </g>

      <g transform="translate(30, 290)">
        <rect width="470" height="195" rx="14" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <text x="20" y="26" font-family="sans-serif" font-size="13" font-weight="700" fill="#0f172a">
          PALATE INTENSITY METRICS
        </text>

        <g transform="translate(20, 45)">
          <text x="0" y="12" font-family="sans-serif" font-size="12" fill="#64748b">Body Intensity</text>
          <text x="430" y="12" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="end">Full-Bodied (95%)</text>
          <rect y="20" width="430" height="8" rx="4" fill="#e2e8f0"/>
          <rect y="20" width="408" height="8" rx="4" fill="#9f1239"/>
        </g>

        <g transform="translate(20, 85)">
          <text x="0" y="12" font-family="sans-serif" font-size="12" fill="#64748b">Tannin Level</text>
          <text x="430" y="12" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="end">High / Structured (88%)</text>
          <rect y="20" width="430" height="8" rx="4" fill="#e2e8f0"/>
          <rect y="20" width="378" height="8" rx="4" fill="#d97706"/>
        </g>

        <g transform="translate(20, 125)">
          <text x="0" y="12" font-family="sans-serif" font-size="12" fill="#64748b">Acidity &amp; Balance</text>
          <text x="430" y="12" font-family="sans-serif" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="end">Crisp Balance (82%)</text>
          <rect y="20" width="430" height="8" rx="4" fill="#e2e8f0"/>
          <rect y="20" width="352" height="8" rx="4" fill="#059669"/>
        </g>
      </g>
    </g>
  </g>

  <!-- Bottom Strip -->
  <g transform="translate(80, 755)">
    <rect width="1040" height="95" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
    <g transform="translate(40, 25)">
      <circle cx="22" cy="22" r="18" fill="#ffe4e6"/>
      <text x="22" y="28" font-family="sans-serif" font-size="14" font-weight="bold" fill="#9f1239" text-anchor="middle">100</text>
      <text x="50" y="18" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Expert Score Capture</text>
      <text x="50" y="38" font-family="sans-serif" font-size="11.5" fill="#64748b">Scrape 100-point critic scores, tasting panel results, and international wine awards</text>
    </g>
    <line x1="390" y1="20" x2="390" y2="75" stroke="#f1f5f9" stroke-width="2"/>
    <g transform="translate(420, 25)">
      <circle cx="22" cy="22" r="18" fill="#fef3c7"/>
      <text x="22" y="28" font-family="sans-serif" font-size="14" font-weight="bold" fill="#b45309" text-anchor="middle">NLP</text>
      <text x="50" y="18" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#0f172a">Tasting Note Parsing</text>
      <text x="50" y="38" font-family="sans-serif" font-size="11.5" fill="#64748b">Extract flavor descriptors like 'oaky', 'fruity', or 'tannic' using automated NLP</text>
    </g>
    <line x1="770" y1="20" x2="770" y2="75" stroke="#f1f5f9" stroke-width="2"/>
    <g transform="translate(800, 25)">
      <circle cx="22" cy="22" r="18" fill="#ecfdf5"/>
      <text x="22" y="28" font-family="sans-serif" font-size="14" font-weight="bold" fill="#059669" text-anchor="middle">★</text>
      <text x="50" y="18" font-family="sans-serif" font-size="13" font-weight="800" fill="#0f172a">Consumer Sentiment</text>
      <text x="50" y="38" font-family="sans-serif" font-size="11.5" fill="#64748b">Aggregate Vivino &amp; CellarTracker ratings to power consumer recommendation engines</text>
    </g>
  </g>
</svg>
`;

// ─────────────────────────────────────────────────────────────
// 7. LIQUOR BENEFITS IMAGE
// ─────────────────────────────────────────────────────────────
const svgBenefits = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900" fill="none">
  <defs>
    <linearGradient id="benBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#fdfcfb"/>
      <stop offset="100%" stop-color="#f6f3ee"/>
    </linearGradient>

    <filter id="shadowMain" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#0f172a" flood-opacity="0.08"/>
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0f172a" flood-opacity="0.04"/>
    </filter>
  </defs>

  <rect width="1200" height="900" rx="24" fill="url(#benBg)"/>

  <g transform="translate(80, 50)">
    <rect width="320" height="36" rx="18" fill="#fdf2f8" stroke="#fbcfe8" stroke-width="1"/>
    <circle cx="20" cy="18" r="5" fill="#9f1239"/>
    <text x="36" y="23" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#9f1239" letter-spacing="1">
      ENTERPRISE VALUE &amp; ROI
    </text>
    <text x="0" y="75" font-family="system-ui, sans-serif" font-size="34" font-weight="900" fill="#0f172a">
      Why Beverage Brands &amp; Retailers Trust Us
    </text>
    <text x="0" y="105" font-family="system-ui, sans-serif" font-size="15" font-weight="500" fill="#64748b">
      Dynamic price optimization, MAP compliance, e-commerce catalog enrichment, and supply tracking
    </text>
  </g>

  <g transform="translate(80, 180)">
    <!-- Pillar 1 -->
    <g transform="translate(0, 0)" filter="url(#shadowMain)">
      <rect width="500" height="260" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect width="500" height="6" rx="3" fill="#059669"/>

      <g transform="translate(30, 30)">
        <circle cx="26" cy="26" r="24" fill="#ecfdf5"/>
        <text x="26" y="33" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#059669" text-anchor="middle">$</text>

        <text x="68" y="22" font-family="system-ui, sans-serif" font-size="17" font-weight="800" fill="#0f172a">
          Optimize Pricing &amp; Promotions
        </text>
        <text x="68" y="44" font-family="sans-serif" font-size="13" font-weight="600" fill="#059669">
          +16.4% Gross Margin Lift
        </text>

        <text x="0" y="90" font-family="sans-serif" font-size="13" fill="#475569">
          Adjust catalog prices dynamically based on competitor price movements, discount schedules, and local state tax applications.
        </text>

        <g transform="translate(0, 125)">
          <rect width="440" height="48" rx="8" fill="#f0fdf4" stroke="#bbf7d0"/>
          <text x="16" y="29" font-family="sans-serif" font-size="12" font-weight="600" fill="#065f46">
            Real-Time Competitor Price Sweeps
          </text>
          <text x="424" y="29" font-family="sans-serif" font-size="13" font-weight="800" fill="#047857" text-anchor="end">
            Hourly Frequency
          </text>
        </g>
      </g>
    </g>

    <!-- Pillar 2 -->
    <g transform="translate(540, 0)" filter="url(#shadowMain)">
      <rect width="500" height="260" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect width="500" height="6" rx="3" fill="#4f46e5"/>

      <g transform="translate(30, 30)">
        <circle cx="26" cy="26" r="24" fill="#e0e7ff"/>
        <path d="M 26 15 L 36 21 L 36 31 C 36 38 26 43 26 43 C 26 43 16 38 16 31 L 16 21 Z" fill="#4338ca"/>
        <path d="M 23 29 L 25 31 L 30 25" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none"/>

        <text x="68" y="22" font-family="system-ui, sans-serif" font-size="17" font-weight="800" fill="#0f172a">
          MAP Compliance &amp; Brand Audits
        </text>
        <text x="68" y="44" font-family="sans-serif" font-size="13" font-weight="600" fill="#4338ca">
          99.6% Distributor Adherence
        </text>

        <text x="0" y="90" font-family="sans-serif" font-size="13" fill="#475569">
          Identify unauthorized gray-market sellers and ensure licensed distributors comply with Minimum Advertised Price (MAP) rules.
        </text>

        <g transform="translate(0, 125)">
          <rect width="440" height="48" rx="8" fill="#eff6ff" stroke="#bfdbfe"/>
          <text x="16" y="29" font-family="sans-serif" font-size="12" font-weight="600" fill="#1e40af">
            MAP Price Deviation Alerts
          </text>
          <text x="424" y="29" font-family="sans-serif" font-size="13" font-weight="800" fill="#1d4ed8" text-anchor="end">
            Instant Webhooks
          </text>
        </g>
      </g>
    </g>

    <!-- Pillar 3 -->
    <g transform="translate(0, 290)" filter="url(#shadowMain)">
      <rect width="500" height="260" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect width="500" height="6" rx="3" fill="#9f1239"/>

      <g transform="translate(30, 30)">
        <circle cx="26" cy="26" r="24" fill="#ffe4e6"/>
        <text x="26" y="34" font-family="system-ui, sans-serif" font-size="18" font-weight="bold" fill="#9f1239" text-anchor="middle">★</text>

        <text x="68" y="22" font-family="system-ui, sans-serif" font-size="17" font-weight="800" fill="#0f172a">
          Fuel Catalog &amp; Recommendation Engines
        </text>
        <text x="68" y="44" font-family="sans-serif" font-size="13" font-weight="600" fill="#9f1239">
          +32% Online Conversion
        </text>

        <text x="0" y="90" font-family="sans-serif" font-size="13" fill="#475569">
          Enrich wine and spirits e-commerce catalogs with verified bottle specifications, vintages, critic scores, and tasting descriptors.
        </text>

        <g transform="translate(0, 125)">
          <rect width="440" height="48" rx="8" fill="#fff1f2" stroke="#fecdd3"/>
          <text x="16" y="29" font-family="sans-serif" font-size="12" font-weight="600" fill="#881337">
            Data Quality &amp; Attribute Completeness
          </text>
          <text x="424" y="29" font-family="sans-serif" font-size="13" font-weight="800" fill="#9f1239" text-anchor="end">
            99.9% Normalized
          </text>
        </g>
      </g>
    </g>

    <!-- Pillar 4 -->
    <g transform="translate(540, 290)" filter="url(#shadowMain)">
      <rect width="500" height="260" rx="18" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <rect width="500" height="6" rx="3" fill="#d97706"/>

      <g transform="translate(30, 30)">
        <circle cx="26" cy="26" r="24" fill="#fef3c7"/>
        <circle cx="26" cy="26" r="10" fill="#b45309"/>

        <text x="68" y="22" font-family="system-ui, sans-serif" font-size="17" font-weight="800" fill="#0f172a">
          Supply Chain &amp; Competitor Trends
        </text>
        <text x="68" y="44" font-family="sans-serif" font-size="13" font-weight="600" fill="#b45309">
          Zero Supply Blind Spots
        </text>

        <text x="0" y="90" font-family="sans-serif" font-size="13" fill="#475569">
          Detect early supply pinches, import bottlenecks, and out-of-stock trends to seize competitive inventory opportunities.
        </text>

        <g transform="translate(0, 125)">
          <rect width="440" height="48" rx="8" fill="#fefce8" stroke="#fef08a"/>
          <text x="16" y="29" font-family="sans-serif" font-size="12" font-weight="600" fill="#854d0e">
            Regional Stock Availability Forecasting
          </text>
          <text x="424" y="29" font-family="sans-serif" font-size="13" font-weight="800" fill="#a16207" text-anchor="end">
            100% Coverage
          </text>
        </g>
      </g>
    </g>
  </g>

  <!-- Bottom Trust Bar -->
  <g transform="translate(80, 755)">
    <rect width="1040" height="95" rx="16" fill="#1e293b"/>
    <g transform="translate(40, 25)">
      <circle cx="22" cy="22" r="18" fill="#334155"/>
      <text x="22" y="28" font-family="sans-serif" font-size="14" font-weight="bold" fill="#38bdf8" text-anchor="middle">API</text>
      <text x="50" y="18" font-family="sans-serif" font-size="13" font-weight="800" fill="#ffffff">REST &amp; Webhook Streaming</text>
      <text x="50" y="38" font-family="sans-serif" font-size="11.5" fill="#94a3b8">Real-time webhook notifications for price drops &amp; stock alerts</text>
    </g>
    <line x1="390" y1="20" x2="390" y2="75" stroke="#334155" stroke-width="2"/>
    <g transform="translate(420, 25)">
      <circle cx="22" cy="22" r="18" fill="#334155"/>
      <text x="22" y="28" font-family="sans-serif" font-size="14" font-weight="bold" fill="#34d399" text-anchor="middle">DW</text>
      <text x="50" y="18" font-family="sans-serif" font-size="13" font-weight="800" fill="#ffffff">Snowflake, BigQuery &amp; S3</text>
      <text x="50" y="38" font-family="sans-serif" font-size="11.5" fill="#94a3b8">Clean Parquet, JSON, and CSV deliveries direct to your warehouse</text>
    </g>
    <line x1="770" y1="20" x2="770" y2="75" stroke="#334155" stroke-width="2"/>
    <g transform="translate(800, 25)">
      <circle cx="22" cy="22" r="18" fill="#334155"/>
      <text x="22" y="28" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f472b6" text-anchor="middle">24/7</text>
      <text x="50" y="18" font-family="sans-serif" font-size="13" font-weight="800" fill="#ffffff">Enterprise SLA Guarantee</text>
      <text x="50" y="38" font-family="sans-serif" font-size="11.5" fill="#94a3b8">99.9% uptime with automated anti-bot maintenance</text>
    </g>
  </g>
</svg>
`;

const images = [
  { name: 'liquor-hero.png', svg: svgHero },
  { name: 'liquor-data-mockup.png', svg: svgDataMockup },
  { name: 'age-gate-bypass.png', svg: svgAgeGate },
  { name: 'sku-matching.png', svg: svgSkuMatching },
  { name: 'inventory-tracking.png', svg: svgInventory },
  { name: 'review-aggregation.png', svg: svgReviews },
  { name: 'liquor-benefits.png', svg: svgBenefits },
];

async function generateAll() {
  console.log('Rendering 7 high-resolution PNG images via Sharp...');
  for (const item of images) {
    const destPath = path.join(outputDir, item.name);
    const svgBuffer = Buffer.from(item.svg);
    await sharp(svgBuffer)
      .png({ quality: 100, compressionLevel: 8 })
      .toFile(destPath);
    const stats = fs.statSync(destPath);
    console.log(`Generated: ${item.name} (${stats.size} bytes)`);
  }
  console.log('All 7 images successfully generated in', outputDir);
}

generateAll().catch(err => {
  console.error('Generation error:', err);
  process.exit(1);
});
