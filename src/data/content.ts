/** Editorial content blocks used across the marketing sections. */

export const TRUST_POINTS = [
  { title: "Responsive on every screen", detail: "320px to 4K, tested." , icon: "devices" },
  { title: "SEO-ready from day one", detail: "Structured, indexable, fast.", icon: "search" },
  { title: "Fast & optimized", detail: "Performance budgets, not guesses.", icon: "bolt" },
  { title: "Custom admin dashboards", detail: "You manage your own business.", icon: "dashboard" },
  { title: "Google Search Console setup", detail: "Indexing configured properly.", icon: "google" },
  { title: "Conversion-focused UX", detail: "Every page has a next step.", icon: "target" },
] as const;

export const POSITIONING_ROWS = [
  { basic: "Looks good", better: "Looks good and converts" },
  { basic: "Online presence", better: "Search visibility" },
  { basic: "Static pages", better: "Business functionality" },
  { basic: "No data", better: "Analytics and insight" },
  { basic: "No management", better: "Admin dashboard" },
  { basic: "Build and forget", better: "Continuous optimization" },
] as const;

export const DIFFERENTIATORS = [
  {
    number: "01",
    title: "Design",
    body: "We create interfaces people understand and enjoy using.",
    icon: "pen",
  },
  {
    number: "02",
    title: "Development",
    body: "We build fast, scalable and maintainable digital products.",
    icon: "code",
  },
  {
    number: "03",
    title: "SEO",
    body: "We optimize for search engines and set up Google Search Console.",
    icon: "search",
  },
  {
    number: "04",
    title: "Conversion",
    body: "We structure pages around what gets visitors to take action.",
    icon: "target",
  },
  {
    number: "05",
    title: "Management",
    body: "We build admin dashboards so you can run your digital operations.",
    icon: "dashboard",
  },
  {
    number: "06",
    title: "Growth",
    body: "The goal isn’t launching a website. The goal is helping the business grow.",
    icon: "growth",
  },
] as const;

export const SEO_CHECKLIST = [
  "Technical SEO",
  "Metadata",
  "Structured data",
  "Sitemap",
  "Robots.txt",
  "Canonical URLs",
  "Google Search Console",
  "Indexing",
  "Page performance",
  "Mobile optimization",
  "Internal linking",
  "Search-friendly architecture",
] as const;

export const DASHBOARD_CAPABILITIES = [
  "Products",
  "Orders",
  "Customers",
  "Blog posts",
  "Services",
  "Employees",
  "Applications",
  "Content",
  "Analytics",
  "Notifications",
  "Business operations",
] as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    body: "Understand your business, goals, audience and requirements.",
  },
  {
    number: "02",
    title: "Strategy",
    body: "Define the structure, features, technology and user journey.",
  },
  {
    number: "03",
    title: "Design",
    body: "Create the visual system and the user experience.",
  },
  {
    number: "04",
    title: "Build",
    body: "Develop the website, application or software.",
  },
  {
    number: "05",
    title: "Test",
    body: "Test responsiveness, performance, accessibility and functionality.",
  },
  {
    number: "06",
    title: "Launch",
    body: "Deploy and configure the product.",
  },
  {
    number: "07",
    title: "Grow",
    body: "SEO, optimization, analytics and ongoing improvements.",
  },
] as const;

export const ABOUT_POINTS = [
  {
    label: "Who we are",
    body: "A digital development studio building websites, applications and business software.",
  },
  {
    label: "What we build",
    body: "Digital products: business websites, e-commerce, web and mobile apps, dashboards and custom systems.",
  },
  {
    label: "How we think",
    body: "Design, engineering, SEO and conversion are one decision, not four separate stages.",
  },
  {
    label: "Why businesses choose us",
    body: "We take responsibility for what happens after launch, not just the handover.",
  },
] as const;

export const CAPABILITY_MARQUEE = [
  "Business Websites",
  "E-commerce",
  "Web Applications",
  "Mobile Apps",
  "Custom Software",
  "Admin Dashboards",
  "Technical SEO",
  "UI/UX Design",
  "Performance Optimization",
  "Business Automation",
  "Google Search Console",
  "Analytics",
] as const;

/** Real, checkable capability statements — no invented metrics. */
export const STUDIO_FACTS = [
  { value: "8", label: "Service lines", detail: "Design through to growth" },
  { value: "100%", label: "Custom builds", detail: "No templates, no page builders" },
  { value: "24h", label: "Typical first response", detail: "On quote requests" },
  { value: "Post-launch", label: "Support included", detail: "Every project" },
] as const;

export const FAQS = [
  {
    q: "How much does a website cost?",
    a: "A starter business website begins from ₦150,000 and a full business website from ₦250,000. Web applications, dashboards and custom software are quoted after a short discovery conversation, because the price follows the scope.",
  },
  {
    q: "How long does a project take?",
    a: "A starter website is typically 1–2 weeks. A business website is usually 2–4 weeks. Applications and custom software depend on scope and are scheduled during the strategy stage.",
  },
  {
    q: "Do you handle SEO as well?",
    a: "Yes. Technical SEO, metadata, structured data, sitemaps, canonical URLs and Google Search Console setup are built into the development process rather than added afterwards. We build and optimize sites to improve search visibility; no one can guarantee rankings.",
  },
  {
    q: "Will I be able to update the website myself?",
    a: "Yes, when the project includes an admin dashboard. We build management interfaces so you can update products, orders, content and other business data without a developer.",
  },
  {
    q: "Do you work with businesses outside Nigeria?",
    a: "Yes. We work with businesses, startups and organizations internationally, and pricing can be discussed in your local currency.",
  },
  {
    q: "What do you need from me to start?",
    a: "A clear description of your business, what you want the product to do, any content or branding you already have, and your target timeline. We handle the rest of the planning with you.",
  },
] as const;
