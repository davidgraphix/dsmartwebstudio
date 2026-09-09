import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Positioning } from "@/components/sections/Positioning";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { WhyUs } from "@/components/sections/WhyUs";
import { SeoSection } from "@/components/sections/SeoSection";
import { DashboardSection } from "@/components/sections/DashboardSection";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema, jsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "DSmart Web Studio — Web Development, Software & SEO",
  description:
    "We build websites, web apps, mobile apps, admin dashboards and custom software engineered for performance, search visibility and sales. Request a quote today.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd(faqSchema())} />
      <Hero />
      <TrustStrip />
      <Positioning />
      <Services />
      <Projects />
      <WhyUs />
      <SeoSection />
      <DashboardSection />
      <Process />
      <Pricing />
      <About />
      <Faq />
      <FinalCta />
    </>
  );
}
