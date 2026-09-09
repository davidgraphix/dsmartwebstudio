# DSmart Web Studio

Marketing site and lead-generation system for DSmart Web Studio — a digital
development studio building websites, web applications, mobile apps, admin
dashboards and custom software.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** and
**Framer Motion**. Quote submissions are delivered by **Nodemailer**, with a
WhatsApp Cloud API seam ready to switch on.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in SMTP credentials
npm run dev                  # http://localhost:3000
```

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
npx tsc --noEmit # typecheck
```

---

## Project structure

```
src/
├── app/
│   ├── page.tsx                 Home (all marketing sections)
│   ├── layout.tsx               Fonts, metadata, providers, JSON-LD
│   ├── work/                    Project index + /work/[slug] case studies
│   ├── privacy/  terms/         Legal pages
│   ├── api/
│   │   ├── quote/               Quote endpoint (validation, rate limit, email)
│   │   ├── geo/                 Country detection from edge headers
│   │   └── rates/               NGN exchange rates, cached 12h
│   ├── sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx
│   └── globals.css              Design tokens, utilities, motion
│
├── components/
│   ├── layout/     Navbar, MobileMenu, Footer, StickyMobileCTA, Logo
│   ├── sections/   Hero, TrustStrip, Positioning, Services, Projects,
│   │               WhyUs, SeoSection, DashboardSection, Process, Pricing,
│   │               About, Faq, FinalCta
│   ├── projects/   ProjectCard, ProjectVisual
│   ├── pricing/    CurrencySelector
│   ├── quote/      QuoteModal, QuoteForm, Field
│   ├── visuals/    Frames, Charts, DashboardPreview, SearchPreview, ...
│   └── ui/         Button, Section, Heading, Icon, Modal, Skeleton, Badge
│
├── data/           site.ts · services.ts · pricing.ts · projects.ts · content.ts
├── lib/            currency/ · email/ · whatsapp/ · seo · validation · utils
└── providers/      CurrencyProvider, QuoteProvider
```

**All copy, pricing, services and contact details live in `src/data/`.** Nothing
is hard-coded inside a component, so content changes never require touching JSX.

---

## Adding a project

Projects are the highest-value section of the site. Add real entries to
`src/data/projects.ts`; the home page, `/work` index, case-study route, sitemap
and structured data all pick them up automatically.

```ts
export const PROJECTS: Project[] = [
  {
    slug: "acme-store",
    name: "Acme Store",
    category: "E-commerce",       // Websites | E-commerce | Web Apps | Software | UI/UX
    industry: "Retail",
    year: "2025",
    summary: "One line used on the project card.",
    description: "Longer intro shown on the case-study page.",
    challenge: "What the business needed to solve.",
    solution: "What we built and why.",
    designNotes: "Design system, typography, layout decisions.",
    features: ["Product management", "Paystack checkout", "Order tracking"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    results: [],                  // only real, measured outcomes
    liveUrl: "https://acmestore.com",
    images: [
      { src: "/projects/acme-hero.png", alt: "Acme Store homepage", width: 1600, height: 1000 },
    ],
    featured: true,               // renders as a full-width case-study card
  },
];
```

Notes:

- Screenshots go in `public/projects/`. Without images the card falls back to a
  typographic plate built from the project's own name — never stock imagery.
- Category filters appear automatically once more than one category is present.
- `results` should stay empty unless the numbers are real and verifiable.
- With no projects at all, the section renders a considered empty state rather
  than placeholder work.

---

## Pricing and currency

Base prices are stored in **NGN** in `src/data/pricing.ts`. Everything else is
derived:

- Visitor country comes from edge headers (`/api/geo`), falling back to the
  browser locale, then to NGN.
- Exchange rates come from `/api/rates` (cached 12 hours) with a configurable
  static table in `src/lib/currency/config.ts` as the fallback.
- A manual currency selector is always available in the pricing section and the
  footer, and the choice is remembered on the device.
- Converted amounts are rounded and labelled "approximate conversion" so they
  never read as a firm quote.

Changing a price, adding a tier, or adding a currency requires only a data edit.

---

## Quote flow and email

Six-step quote dialog: service → business details → project brief → budget →
timeline → review. Selecting a country re-bases the budget ranges into that
currency.

`POST /api/quote`:

1. Rate limits by IP (5 requests per 10 minutes).
2. Silently absorbs honeypot submissions.
3. Re-validates every field server-side with Zod — client validation is never
   trusted.
4. Sanitizes input, then sends an HTML + plain-text email via Nodemailer.
5. Returns a clear failure with a WhatsApp fallback if mail cannot be sent, and
   logs the enquiry so a lead is never silently lost.

Required environment variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
`SMTP_PASSWORD`, `MAIL_TO`. Credentials are read on the server only and are
never bundled into the client.

---

## WhatsApp

Click-to-chat is live everywhere (hero, sticky mobile bar, footer, quote success
state, error fallback) with pre-filled messages.

Automatic notifications to the business are **not faked with a wa.me link**.
`src/lib/whatsapp/notify.ts` implements the Meta WhatsApp Cloud API behind a
service abstraction. Set `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN` and
`WHATSAPP_NOTIFY_TO` and the quote endpoint starts sending real notifications —
no application changes needed.

---

## Analytics

`src/lib/analytics.ts` pushes to `window.dataLayer` and forwards to `gtag`.
Setting `NEXT_PUBLIC_GA_ID` loads GA4 and events start flowing:

`quote_started` · `quote_step_completed` · `quote_submitted` ·
`whatsapp_clicked` · `project_viewed` · `contact_submitted` · `pricing_viewed` ·
`currency_changed`

---

## SEO

- Per-page metadata, canonical URLs, Open Graph and Twitter cards.
- Generated `sitemap.xml`, `robots.txt` and web manifest.
- JSON-LD: `ProfessionalService` with a service catalogue, `WebSite`, `FAQPage`,
  `BreadcrumbList`, and `CreativeWork` per case study.
- Dynamic Open Graph image at `/opengraph-image`.
- One `<h1>` per page and semantic sectioning throughout.
- Set `GOOGLE_SITE_VERIFICATION` to add the Search Console meta tag.

---

## Accessibility

- Skip link as the first tab stop; visible focus rings site-wide.
- Focus-trapped, Escape-dismissible dialogs that restore focus on close.
- Labelled form controls with `aria-invalid`, `aria-describedby` and `role="alert"`
  error messaging.
- `prefers-reduced-motion` is honoured: animations resolve instantly to their
  final visible state rather than being skipped mid-animation.

---

## Deployment

Deploy anywhere that runs Next.js. On Vercel, country detection works out of the
box via `x-vercel-ip-country`; behind Cloudflare it uses `cf-ipcountry`.

Set `NEXT_PUBLIC_SITE_URL` to the production domain so canonical URLs, the
sitemap and share cards resolve correctly.
