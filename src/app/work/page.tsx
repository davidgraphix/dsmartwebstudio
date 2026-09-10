import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Section";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";
import { ORDERED_PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Work — Web, App & Software Projects",
  description:
    "Selected projects by DSmart Web Studio: e-commerce platforms, business websites, research products, corporate sites and custom applications, shown as live screen recordings.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: `${SITE.url}/` },
            { name: "Work", url: `${SITE.url}/work` },
          ]),
        )}
      />

      <Section tone="dark" spacing="none" className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_70%_at_20%_0%,#02167F_0%,transparent_60%)]"
          aria-hidden="true"
        />
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[12.5px] text-white/45">
              <li>
                <Link href="/" className="transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/75">Work</li>
            </ol>
          </nav>
          <h1 className="display-2 text-white uppercase">
            Selected <span className="text-gold">work</span>
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-lg">
            Products we designed, built and optimized. Every preview below is a screen recording of
            the live site, not a mockup.
          </p>
        </Container>
      </Section>

      <Section tone="light" spacing="lg">
        <Container>
          <div className="space-y-20 sm:space-y-28 lg:space-y-36">
            {ORDERED_PROJECTS.map((project, index) => (
              <ProjectShowcase key={project.slug} project={project} index={index} />
            ))}
          </div>

          <Reveal className="mt-24 sm:mt-32">
            <div className="flex flex-col items-start gap-6 rounded-2xl bg-navy p-8 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-lg">
                <p className="font-display text-xl font-extrabold uppercase sm:text-2xl">
                  Your project could be <span className="text-gold">next.</span>
                </p>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/60">
                  Have an idea, business or digital product that needs to be built properly? Tell us
                  the goal and we’ll scope it.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                <QuoteButton source="work-page-cta" variant="gold" size="lg" arrow>
                  Start a Project
                </QuoteButton>
                <WhatsAppButton
                  source="work-page-cta"
                  variant="outline-light"
                  size="lg"
                  message="Hello DSmart Web Studio, I'd like a quote for a project."
                >
                  Request a Quote
                </WhatsAppButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
