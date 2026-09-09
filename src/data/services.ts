export type ServiceIcon =
  | "browser"
  | "cart"
  | "app-window"
  | "phone"
  | "code"
  | "dashboard"
  | "search"
  | "pen";

export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  icon: ServiceIcon;
  /** Shown in the expandable detail row of the service card. */
  deliverables: string[];
};

export const SERVICES: Service[] = [
  {
    id: "business-websites",
    number: "01",
    title: "Business Websites",
    summary:
      "Professional websites designed to establish credibility and turn visitors into customers.",
    icon: "browser",
    deliverables: [
      "Custom design system",
      "Conversion-focused page structure",
      "Lead capture & contact flows",
      "Content management options",
    ],
  },
  {
    id: "ecommerce",
    number: "02",
    title: "E-commerce",
    summary:
      "Online stores with product management, payments, orders and scalable architecture.",
    icon: "cart",
    deliverables: [
      "Product & inventory management",
      "Payment gateway integration",
      "Order and delivery tracking",
      "Customer accounts",
    ],
  },
  {
    id: "web-applications",
    number: "03",
    title: "Web Applications",
    summary: "Custom web applications built around your business processes.",
    icon: "app-window",
    deliverables: [
      "Authentication & user roles",
      "Database design",
      "Business logic & workflows",
      "Third-party API integration",
    ],
  },
  {
    id: "mobile-apps",
    number: "04",
    title: "Mobile Apps",
    summary: "Modern mobile experiences for startups and businesses.",
    icon: "phone",
    deliverables: [
      "iOS & Android from one codebase",
      "Push notifications",
      "Offline-friendly patterns",
      "App store preparation",
    ],
  },
  {
    id: "custom-software",
    number: "05",
    title: "Custom Software",
    summary: "Business systems designed around your exact workflow.",
    icon: "code",
    deliverables: [
      "Requirements & process mapping",
      "Role-based access control",
      "Reporting & exports",
      "Scalable architecture",
    ],
  },
  {
    id: "admin-dashboards",
    number: "06",
    title: "Admin Dashboards",
    summary:
      "Powerful dashboards to manage users, products, orders, content, analytics and operations.",
    icon: "dashboard",
    deliverables: [
      "Realtime metrics & charts",
      "Content and catalogue management",
      "Team permissions",
      "Activity logs & notifications",
    ],
  },
  {
    id: "seo",
    number: "07",
    title: "SEO & Google Visibility",
    summary:
      "Technical SEO, metadata, structured data, indexing and Google Search Console setup.",
    icon: "search",
    deliverables: [
      "Technical SEO foundation",
      "Structured data & rich results",
      "Search Console & sitemap setup",
      "Performance and Core Web Vitals",
    ],
  },
  {
    id: "ui-ux",
    number: "08",
    title: "UI/UX Design",
    summary: "User-centered interfaces designed for usability, clarity and conversion.",
    icon: "pen",
    deliverables: [
      "User flows & wireframes",
      "Design system & components",
      "Interactive prototypes",
      "Accessibility review",
    ],
  },
];

/** Options used by the quote form — kept in sync with the service list. */
export const QUOTE_SERVICE_OPTIONS = [
  "Business Website",
  "E-commerce",
  "Web Application",
  "Mobile App",
  "Custom Software",
  "Admin Dashboard",
  "UI/UX Design",
  "SEO",
  "Other",
] as const;

export type QuoteServiceOption = (typeof QUOTE_SERVICE_OPTIONS)[number];
