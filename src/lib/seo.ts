import { SITE, SOCIAL_LINKS, WHATSAPP_NUMBERS } from "@/data/site";
import { SERVICES } from "@/data/services";
import { FAQS } from "@/data/content";

/**
 * Structured data builders. Everything here describes the studio factually —
 * no aggregate ratings or review counts, because there are none to report.
 */

export function organizationSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    slogan: SITE.tagline,
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/icon.svg`,
    },
    image: `${SITE.url}/opengraph-image`,
    telephone: WHATSAPP_NUMBERS.map((number) => `+${number.e164}`),
    sameAs: SOCIAL_LINKS.map((social) => social.href),
    areaServed: SITE.areaServed.map((name) => ({ "@type": "Place", name })),
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    knowsAbout: [
      "Web development",
      "Web design",
      "Software development",
      "Mobile app development",
      "E-commerce development",
      "Search engine optimization",
      "UI/UX design",
      "Admin dashboards",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital product services",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          serviceType: service.title,
          provider: { "@id": `${SITE.url}/#organization` },
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "en",
    publisher: { "@id": `${SITE.url}/#organization` },
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function creativeWorkSchema(project: {
  name: string;
  slug: string;
  summary: string;
  liveUrl?: string;
  technologies: string[];
  category: string;
}) {
  return {
    "@type": "CreativeWork",
    "@id": `${SITE.url}/work/${project.slug}#project`,
    name: project.name,
    description: project.summary,
    url: project.liveUrl,
    genre: project.category,
    keywords: project.technologies.join(", "),
    creator: { "@id": `${SITE.url}/#organization` },
  };
}

/** Wraps one or more schema nodes in a single @graph document. */
export function jsonLd(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
