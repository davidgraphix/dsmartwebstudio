/**
 * Project / case-study data.
 *
 * ACCURACY RULE: every field here is verifiable from the live site, from the
 * media files in /public/projects, or was supplied directly by the studio.
 * Nothing is invented — no fabricated clients, metrics, testimonials or
 * technologies. Where something could not be verified it is simply omitted.
 *
 * Verification notes (checked against the live sites):
 *   - Every project serves `/_next/static`, so Next.js + React are confirmed.
 *   - Tailwind utility classes are present in the served markup of all nine.
 *   - Feature lists come from the sites' own navigation, sitemaps and headings.
 *   - Video dimensions were read from each MP4's `avc1` sample entry.
 *
 * Adding a project = adding one object below. No component changes needed.
 */

/** Coarse taxonomy used by the filter row. Keep this list short. */
export type ProjectCategory = "E-commerce" | "Platforms" | "Business" | "Creative";

export type ProjectResult = {
  label: string;
  value: string;
};

/** Intrinsic pixel size of a recording, used to reserve exact layout space. */
export type VideoSource = {
  src: string;
  width: number;
  height: number;
  /** Poster frame shown before playback and whenever video is unavailable. */
  poster?: string;
};

export type ProjectMedia = {
  desktop: VideoSource;
  mobile: VideoSource;
};

export type Project = {
  slug: string;
  /** Display order in the portfolio. Lower first. Never sorted alphabetically. */
  order: number;
  name: string;
  /** Filter bucket. */
  category: ProjectCategory;
  /** Precise label shown on the project itself, e.g. "E-commerce / Printing". */
  discipline: string;
  /** Editorial subtitle under the project name. */
  title: string;
  /** One-paragraph summary used in the showcase. */
  summary: string;
  /** Longer description used on the case-study page. */
  description?: string;
  challenge?: string;
  solution?: string;
  designNotes?: string;
  responsiveNotes?: string;
  /** Verified from the live site only. */
  features: string[];
  /** Verified from the served markup only. */
  technologies: string[];
  /** Verified outcomes only. Empty everywhere until real numbers exist. */
  results?: ProjectResult[];
  liveUrl?: string;
  media: ProjectMedia;
  /** Set when the project has enough written material for a case-study page. */
  caseStudy?: boolean;
  /** Gets the largest visual treatment in the showcase. */
  featured?: boolean;
  client?: string;
  industry?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "printpalash",
    order: 1,
    name: "PrintPalash",
    category: "E-commerce",
    discipline: "E-commerce / Printing Platform",
    title: "E-commerce Printing Platform",
    summary:
      "A full-featured printing e-commerce platform designed to help customers discover printing products, explore services, view pricing and place orders online.",
    description:
      "PrintPalash sells printing, packaging and branding products to businesses in Lagos, Nigeria. The platform carries a deep product catalogue organised into fifteen categories, each product on its own indexable page, alongside a services section, quote requests, order tracking and a blog.",
    challenge:
      "A printing business has an unusually wide catalogue — paper bags, packaging boxes, banners, apparel, stationery, invitations — and most of it is priced by specification rather than by a single fixed number. The site had to make that range browsable, keep every product findable in search, and give customers a way to request a price without abandoning the visit.",
    solution:
      "We built a category-driven catalogue where every product and every category has its own URL, so the range is fully crawlable. Product pages sit alongside a dedicated quote flow, an order-tracking page and WhatsApp click-to-chat, giving customers three separate routes to an order depending on how ready they are to buy.",
    designNotes:
      "The interface leads with product imagery and category entry points rather than marketing copy, so a visitor lands on something they can browse immediately. Supporting content — the money-back guarantee, the FAQ and the blog — carries the trust argument without crowding the catalogue.",
    responsiveNotes:
      "The catalogue reflows from a multi-column grid on desktop to a single scrollable column on phones, with the quote and WhatsApp actions kept within thumb reach throughout.",
    features: [
      "Product catalogue across fifteen printing categories",
      "Individual product pages with their own URLs",
      "Dedicated quote request flow",
      "Order tracking page",
      "WhatsApp click-to-chat ordering",
      "Services, about, blog and contact sections",
      "Money-back guarantee and FAQ content",
      "XML sitemap, robots.txt and canonical URLs",
      "Structured data for search engines",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "SEO", "Structured Data"],
    liveUrl: "https://printpalash.com/",
    industry: "Printing, packaging and branding",
    caseStudy: true,
    featured: true,
    media: {
      desktop: {
        src: "/projects/printpalash/printpalash-vid.mp4",
        poster: "/projects/printpalash/desktop.webp",
        width: 1280,
        height: 626,
      },
      mobile: {
        src: "/projects/printpalash/printpalash-mobile.mp4",
        poster: "/projects/printpalash/mobile.webp",
        width: 274,
        height: 598,
      },
    },
  },
  {
    slug: "summy-solutions",
    order: 2,
    name: "Summy Solutions",
    category: "E-commerce",
    discipline: "E-commerce / Electronics & Appliances",
    title: "E-commerce Store & Digital Shopping Experience",
    summary:
      "An e-commerce platform built for an electronics and appliances business, designed around product discovery, a working cart and customer accounts.",
    description:
      "Summy Solution & Technology Ventures sells televisions, refrigerators, air conditioners and home appliances with nationwide delivery in Nigeria. The storefront pairs a product catalogue with a shopping cart, customer accounts, in-app notifications and a light/dark interface.",
    challenge:
      "Appliance buyers compare carefully before they commit, and they do it across devices. The store needed to hold a session together — cart, account, notifications — rather than send people back to the start every time they returned.",
    solution:
      "We built the storefront around persistent shopping state: a cart that survives navigation, an account area, and a notification surface for order and delivery updates, all within a single responsive interface.",
    designNotes:
      "The interface uses a restrained, neutral surface so product photography carries the page, and supports both a light and a dark theme rather than forcing one.",
    responsiveNotes:
      "The catalogue, cart and account panels are built for a single-column phone layout first, then widen into a multi-column grid on larger screens.",
    features: [
      "Product catalogue for electronics and appliances",
      "Shopping cart with persistent state",
      "Customer account area",
      "In-app notifications",
      "Light and dark theme support",
      "Nationwide delivery presentation",
      "Responsive storefront layout",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://www.summysolutions.com/",
    industry: "Electronics and home appliances",
    caseStudy: true,
    media: {
      desktop: {
        src: "/projects/summy-solutions/summy.mp4",
        poster: "/projects/summy-solutions/desktop.webp",
        width: 1280,
        height: 642,
      },
      mobile: {
        src: "/projects/summy-solutions/summy-mobile.mp4",
        poster: "/projects/summy-solutions/mobile.webp",
        width: 276,
        height: 598,
      },
    },
  },
  {
    slug: "blackcircle",
    order: 3,
    name: "BlackCircle",
    category: "Platforms",
    discipline: "Financial Intelligence / Research Platform",
    title: "African Market Intelligence Platform",
    summary:
      "A research-driven platform delivering market intelligence, financial commentary and structured insight focused on African capital markets.",
    description:
      "BlackCircle publishes research and commentary on African capital markets, opening with a live market pulse — NGX All-Share Index, treasury bills, inflation and FX — and running into long-form analysis, featured research, a market briefing and institutional programmes.",
    challenge:
      "Financial research is dense by nature. The platform had to carry indicator data, dated commentary, long analytical pieces and an institutional offer in one place without any of it collapsing into an undifferentiated wall of text.",
    solution:
      "We separated the platform into distinct reading modes: a market pulse strip for at-a-glance indicators, a briefing panel for what the desk is watching today, a commentary stream organised by theme, and a publications library for long-form research. Institutional programmes sit on their own track with a separate enquiry path.",
    designNotes:
      "The design is deliberately restrained and editorial — typographic hierarchy carries the weight rather than decoration, which is what a research audience expects and what keeps dense pages readable.",
    responsiveNotes:
      "Indicator tiles wrap into a scannable grid on phones and the article streams reflow to single-column reading widths.",
    features: [
      "Market pulse indicators: NGX ASI, treasury bills, inflation and FX watch",
      "Daily market briefing panel",
      "Commentary and analysis with dated articles",
      "Featured research and publications library",
      "Market Scoop subscription",
      "Institutional programmes section",
      "Thematic taxonomy across macro, markets, policy and fintech",
      "Editorial article layouts",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://blackcircle.vercel.app/",
    industry: "Financial research and market intelligence",
    caseStudy: true,
    featured: true,
    media: {
      desktop: {
        src: "/projects/blackcircle/blackcircle.mp4",
        poster: "/projects/blackcircle/desktop.webp",
        width: 1280,
        height: 626,
      },
      mobile: {
        src: "/projects/blackcircle/blackcircle-mobile.mp4",
        poster: "/projects/blackcircle/mobile.webp",
        width: 276,
        height: 596,
      },
    },
  },
  {
    slug: "global-ease-hr",
    order: 4,
    name: "Global Ease HR",
    category: "Business",
    discipline: "Corporate Website / HR Consulting & Academy",
    title: "HR Consulting & Academy Platform",
    summary:
      "A structured corporate platform combining HR consulting services, professional training, insights, job opportunities and organisational resources.",
    description:
      "Global Ease HR helps startups, SMEs and growing businesses build compliant, scalable and people-centred workplaces. The site runs two businesses side by side — an advisory practice and a training academy — plus an insights desk and a job board.",
    challenge:
      "Two audiences arrive at the same site with different intent. A company director is looking for advisory and outsourcing; an individual professional is looking for certification and coaching. Both had to find their path quickly without the site feeling split in half.",
    solution:
      "We gave the consulting practice and the academy their own clearly labelled service tracks, then used a shared insights desk, team profiles and FAQ to carry credibility across both. Job openings and a consultation booking sit as separate, direct entry points.",
    designNotes:
      "A calm corporate visual language, heavy on structure and whitespace, so a page carrying four services, four programmes and a blog still reads as orderly.",
    responsiveNotes:
      "Service and programme grids collapse to stacked cards on phones, keeping the consultation call to action reachable at every breakpoint.",
    features: [
      "HR Advisory & Strategy service track",
      "HR Operations & Outsourcing service track",
      "Performance Management service track",
      "Training & Development service track",
      "HR Academy with professional certification",
      "Leadership & People Management programme",
      "Corporate training programmes",
      "Executive coaching and mentorship",
      "Job openings board",
      "HR insights blog with dated articles",
      "Team profiles",
      "FAQ and consultation booking",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://globaleasehr.com/",
    industry: "HR consulting and professional training",
    caseStudy: true,
    media: {
      desktop: {
        src: "/projects/globalease/globalease.mp4",
        poster: "/projects/globalease/desktop.webp",
        width: 1280,
        height: 620,
      },
      mobile: {
        src: "/projects/globalease/globalease-mobile.mp4",
        poster: "/projects/globalease/mobile.webp",
        width: 274,
        height: 594,
      },
    },
  },
  {
    slug: "riseclear",
    order: 5,
    name: "RiseClear Property Services",
    category: "Business",
    discipline: "Service Business / Property Cleaning",
    title: "Conversion-Focused Service Business Website",
    summary:
      "A conversion-focused website for a Winnipeg property services company, designed to present services clearly and drive quote requests.",
    description:
      "RiseClear provides residential and commercial cleaning across Winnipeg, Manitoba, alongside window cleaning, post-construction cleaning and permanent LED lighting installation. Every route through the site ends at a free quote request.",
    challenge:
      "Local service buyers decide fast and they decide on trust. The site had to state what is offered, prove the business is credible, and get to a quote request before attention ran out.",
    solution:
      "We built a short path to conversion: services stated plainly, a three-step explanation of how the work runs, credibility signals — insured and bonded, satisfaction guarantee, locally based — and a quote form reachable from every section. Local search markup and a canonical URL support discovery in the Winnipeg market.",
    designNotes:
      "Clean, bright and uncluttered, matching what people expect from a cleaning brand, with the quote action given the strongest visual weight on the page.",
    responsiveNotes:
      "Service cards stack on phones and the quote request stays a single tap away throughout the scroll.",
    features: [
      "Residential cleaning service pages",
      "Commercial cleaning service pages",
      "Window cleaning",
      "Post-construction cleaning",
      "Permanent LED lighting installation",
      "Free quote request form",
      "Three-step service process explanation",
      "Insured, bonded and satisfaction guarantee sections",
      "Local structured data and canonical URL",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Structured Data", "Local SEO"],
    liveUrl: "https://www.risecleaning.ca/",
    industry: "Property and cleaning services",
    caseStudy: true,
    media: {
      desktop: {
        src: "/projects/rise-clear/riseclear.mp4",
        poster: "/projects/rise-clear/desktop.webp",
        width: 1280,
        height: 654,
      },
      mobile: {
        src: "/projects/rise-clear/riseclear-mobile.mp4",
        poster: "/projects/rise-clear/mobile.webp",
        width: 272,
        height: 596,
      },
    },
  },
  {
    slug: "genz-hr",
    order: 6,
    name: "Gen Z HR",
    category: "Platforms",
    discipline: "HR / Editorial & Community Platform",
    title: "A Culture-First Platform for the Future of Work",
    summary:
      "A bold editorial and community platform built around modern workplace culture, career clarity and honest conversations about the future of work.",
    description:
      "Gen Z HR is a culture-forward HR brand writing for young professionals about work as it actually is. The platform is organised around three pillars — career conversations, workplace culture and community building — and runs an article stream plus a community signup.",
    challenge:
      "The audience is a generation that has learned to ignore corporate HR communication. A conventional consultancy layout would have been dismissed on sight.",
    solution:
      "We built the platform as an editorial product rather than a service brochure: oversized display typography, a strong voice in the headline treatment, three named content pillars, and articles that lead with a real position rather than a job title.",
    designNotes:
      "Deliberately loud typography and high-contrast composition, tuned to the brand's voice. This project exists in the portfolio partly to show design range against the more conservative corporate work.",
    responsiveNotes:
      "The oversized display type is set fluidly so it scales down without breaking, and the article stream becomes a single reading column on phones.",
    features: [
      "Career Conversations content pillar",
      "Workplace Culture content pillar",
      "Community Building content pillar",
      "Editorial article stream",
      "Community signup",
      "Oversized editorial typography system",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://genz-hr-bdl6.vercel.app/",
    industry: "HR media and community",
    caseStudy: true,
    media: {
      desktop: {
        src: "/projects/genzhr/genzhr.mp4",
        poster: "/projects/genzhr/desktop.webp",
        width: 1280,
        height: 618,
      },
      mobile: {
        src: "/projects/genzhr/genzhr-mbile.mp4",
        poster: "/projects/genzhr/mobile.webp",
        width: 278,
        height: 596,
      },
    },
  },
  {
    slug: "wonder-pictures",
    order: 7,
    name: "Wonder Pictures",
    category: "Creative",
    discipline: "Creative / Videography & Media",
    title: "Cinematic Videography & Creative Media Website",
    summary:
      "A cinematic digital experience for a videography and production brand, built to showcase films, services and visual storytelling.",
    description:
      "Wonder Pictures produces cinematic films for weddings, brands and events. The site is built around the work itself — a featured film gallery, a service list spanning wedding films through music videos, a four-step process and client testimonials.",
    challenge:
      "For a film company, the website is a showreel. Anything that delayed a visitor from seeing actual footage was working against the business.",
    solution:
      "We put the work first: a featured film gallery high on the page, services described in a single scan, and a four-step process — discover, shoot, edit, deliver — that answers the practical question without interrupting the visual argument.",
    designNotes:
      "A dark, cinematic surface so footage and stills sit on a neutral ground, with typography kept quiet enough to let the imagery lead.",
    responsiveNotes:
      "The film gallery reflows from a wide grid to a full-bleed vertical sequence on phones so footage stays large.",
    features: [
      "Featured film gallery",
      "Wedding films service",
      "Event coverage service",
      "Brand and commercial films",
      "Music videos",
      "Video editing service",
      "Four-step process: discover, shoot, edit, deliver",
      "Client testimonials",
      "Brand logo wall",
      "Booking call to action",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://wonderpictures-beta.vercel.app/",
    industry: "Videography and film production",
    caseStudy: true,
    media: {
      desktop: {
        src: "/projects/wonderfilms/wonderfilms.mp4",
        poster: "/projects/wonderfilms/desktop.webp",
        width: 1280,
        height: 622,
      },
      mobile: {
        src: "/projects/wonderfilms/wonderfilms-mobile.mp4",
        poster: "/projects/wonderfilms/mobile.webp",
        width: 278,
        height: 596,
      },
    },
  },
  {
    slug: "damzypictures",
    order: 8,
    name: "DamzyPictures",
    category: "Creative",
    discipline: "Photography / Videography & Multimedia",
    title: "Photography & Multimedia Platform",
    summary:
      "A visual portfolio website for a creative media brand offering photography, videography, live streaming and multimedia services.",
    description:
      "DamzyPictures is a visual storytelling company covering photography, videography, live streaming, content creation, drone work and multimedia production. The site presents the service range alongside a featured works gallery and direct WhatsApp booking.",
    challenge:
      "Six distinct services, one brand. The site needed to show the full range without diluting the portfolio, and to convert enquiries on the channel the audience actually uses.",
    solution:
      "We paired a clear six-service breakdown with a featured works gallery spanning weddings, corporate events, studio portraits and documentary work, then routed booking straight to WhatsApp rather than through a form nobody would fill in.",
    designNotes:
      "Imagery-led with a restrained type system, and a stated values section — creativity, professionalism, excellence, reliability — carrying the credibility argument.",
    responsiveNotes:
      "The works gallery becomes a full-width vertical sequence on phones, with the WhatsApp booking action persistently reachable.",
    features: [
      "Photography services",
      "Videography services",
      "Live streaming",
      "Content creation",
      "Drone services",
      "Multimedia production",
      "Featured works gallery covering weddings, corporate events, studio portraits and documentary",
      "Client testimonials",
      "WhatsApp booking",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://www.damzypictures.com/",
    industry: "Photography and visual media",
    caseStudy: true,
    media: {
      desktop: {
        src: "/projects/damzypictures/damzypictures.mp4",
        poster: "/projects/damzypictures/desktop.webp",
        width: 1280,
        height: 640,
      },
      mobile: {
        src: "/projects/damzypictures/damzypictures-mobile.mp4",
        poster: "/projects/damzypictures/mobile.webp",
        width: 278,
        height: 596,
      },
    },
  },
];

export const PROJECT_FILTERS: ("All" | ProjectCategory)[] = [
  "All",
  "E-commerce",
  "Platforms",
  "Business",
  "Creative",
];

/** Portfolio order is editorial and deliberate — never sort alphabetically. */
export const ORDERED_PROJECTS = [...PROJECTS].sort((a, b) => a.order - b.order);

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/** Filters are only worth rendering once there is enough work to filter. */
export function availableFilters(): ("All" | ProjectCategory)[] {
  const present = new Set(PROJECTS.map((p) => p.category));
  return PROJECT_FILTERS.filter((f) => f === "All" || present.has(f));
}

export const FEATURED_PROJECTS = ORDERED_PROJECTS.filter((p) => p.featured);

/** Two-digit index used as the editorial project number, e.g. "04". */
export function projectNumber(project: Project): string {
  return String(project.order).padStart(2, "0");
}

/** Hostname shown in the browser-frame address bar. */
export function displayUrl(project: Project): string {
  if (!project.liveUrl) return project.slug;
  return project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
