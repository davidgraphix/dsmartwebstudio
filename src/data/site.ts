/**
 * Single source of truth for brand, contact and navigation data.
 * Nothing in this file should be duplicated inside components.
 */

export const SITE = {
  name: "DSmart Web Studio",
  shortName: "DSmart",
  legalName: "DSmart Web Studio",
  tagline: "Digital products designed to help businesses grow.",
  description:
    "DSmart Web Studio designs and builds websites, web applications, mobile apps, admin dashboards and custom software engineered for performance, search visibility and sales.",
  // The custom domain does not resolve yet, so the live Vercel URL is the
  // production origin for canonical links, the sitemap and Open Graph tags.
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://dsmartwebstudio.vercel.app").replace(
    /\/$/,
    "",
  ),
  locale: "en_NG",
  email: "dsmartwebstudio@gmail.com",
  founded: "2023",
  areaServed: ["Nigeria", "United Kingdom", "United States", "Canada", "Worldwide"],
} as const;

/** Local display format vs. E.164 used for click-to-chat links. */
export const WHATSAPP_NUMBERS = [
  { label: "0816 049 9031", e164: "2348160499031" },
  { label: "0903 517 7568", e164: "2349035177568" },
] as const;

export const PRIMARY_WHATSAPP = WHATSAPP_NUMBERS[0];

export const SOCIAL_LINKS = [
  { name: "TikTok", href: "https://www.tiktok.com/@dsmartwebstudio", handle: "@dsmartwebstudio" },
  { name: "Instagram", href: "https://www.instagram.com/dsmartwebstudio", handle: "@dsmartwebstudio" },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61594092998047",
    handle: "DSmart Web Studio",
  },
] as const;

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
];

export const FOOTER_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/#work" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const LEGAL_NAV: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

/** Default pre-filled click-to-chat message. */
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hello DSmart Web Studio, I found your website and I'd like to discuss a project.";
