/**
 * Pricing architecture.
 *
 * Base prices are stored in NGN (minor-unit free, plain naira integers) so a
 * single edit here updates every currency shown on the site. Adding, removing
 * or re-ordering a tier requires no component changes.
 */

export type PricingTier = {
  id: string;
  name: string;
  /** Base price in NGN. `null` renders as "Custom Quote". */
  basePriceNGN: number | null;
  /** Copy used when there is no fixed price. */
  priceLabel?: string;
  tagline: string;
  description: string;
  features: string[];
  /** Highlighted card. Only one tier should set this. */
  featured?: boolean;
  ctaLabel: string;
  /** Pre-selects a service in the quote flow. */
  quoteService: string;
  timeline: string;
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Starter Website",
    basePriceNGN: 150000,
    tagline: "Get online, properly.",
    description: "A professional website for small businesses and personal brands.",
    features: [
      "Responsive design on every screen",
      "Up to 5 pages",
      "Contact form & WhatsApp integration",
      "Basic SEO setup",
      "Mobile optimization",
      "Deployment & domain configuration",
    ],
    ctaLabel: "Start with Starter",
    quoteService: "Business Website",
    timeline: "1–2 weeks typical",
  },
  {
    id: "business",
    name: "Business Website",
    basePriceNGN: 250000,
    tagline: "Built to convert.",
    description: "For businesses that need stronger functionality and conversion.",
    features: [
      "Custom UI/UX design",
      "Advanced pages & sections",
      "Technical SEO implementation",
      "Google Search Console setup",
      "Analytics & event tracking",
      "Contact / lead management system",
      "Performance optimization",
    ],
    featured: true,
    ctaLabel: "Start with Business",
    quoteService: "Business Website",
    timeline: "2–4 weeks typical",
  },
  {
    id: "custom",
    name: "Custom App / Software",
    basePriceNGN: null,
    priceLabel: "Custom Quote",
    tagline: "Scoped to your workflow.",
    description: "For products with real business logic behind the interface.",
    features: [
      "Web applications",
      "Admin dashboards",
      "Business management systems",
      "E-commerce platforms",
      "SaaS products",
      "Mobile applications",
      "Custom software integrations",
    ],
    ctaLabel: "Request a Custom Quote",
    quoteService: "Custom Software",
    timeline: "Scoped during discovery",
  },
];

/** Included with every project, shown under the pricing grid. */
export const PRICING_INCLUDED = [
  "Responsive across all devices",
  "Search-engine ready markup",
  "Performance optimization",
  "Post-launch support window",
  "Training on how to manage it",
  "Analytics-ready setup",
];

/**
 * Budget bands for the quote form, expressed in NGN so they can be converted
 * to the visitor's currency with the same rate table used by pricing.
 */
export type BudgetBand = {
  id: string;
  minNGN: number;
  maxNGN: number | null;
};

export const BUDGET_BANDS: BudgetBand[] = [
  { id: "band-1", minNGN: 100000, maxNGN: 250000 },
  { id: "band-2", minNGN: 250000, maxNGN: 500000 },
  { id: "band-3", minNGN: 500000, maxNGN: 1000000 },
  { id: "band-4", minNGN: 1000000, maxNGN: null },
];

export const TIMELINE_OPTIONS = [
  "ASAP",
  "1–2 weeks",
  "1 month",
  "2–3 months",
  "Flexible",
] as const;

export type TimelineOption = (typeof TIMELINE_OPTIONS)[number];
