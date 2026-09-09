import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, jsonLd } from "@/lib/seo";
import { PROJECTS } from "@/data/projects";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Work — Web, App & Software Projects",
  description:
    "Selected projects by DSmart Web Studio: business websites, e-commerce stores, web applications, admin dashboards and custom software.",
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
            Products we designed, built and optimized — from business websites to full management
            systems.
          </p>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          {PROJECTS.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {PROJECTS.map((project, index) => (
                <ProjectCard key={project.slug} project={project} priority={index < 2} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-line bg-mist p-10 text-center sm:p-16">
              <h2 className="font-display text-2xl font-extrabold text-ink">
                Case studies are being published.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink/55">
                We publish a project only once we can show the real product and describe it
                accurately. Message us and we’ll walk you through live builds directly.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <WhatsAppButton
                  source="work-page-empty"
                  size="lg"
                  message="Hello DSmart Web Studio, I'd like to see examples of your work."
                >
                  See our work on WhatsApp
                </WhatsAppButton>
                <QuoteButton source="work-page-empty" variant="outline" size="lg" arrow>
                  Start a Project
                </QuoteButton>
              </div>
            </div>
          )}

          <Reveal className="mt-14">
            <div className="flex flex-col items-start gap-5 rounded-2xl bg-navy p-7 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
              <div>
                <p className="font-display text-xl font-bold">Have a project like this?</p>
                <p className="mt-1.5 text-[14px] text-white/60">
                  Tell us what you need and we’ll scope it properly.
                </p>
              </div>
              <QuoteButton
                source="work-page-cta"
                variant="gold"
                size="lg"
                arrow
                className="w-full shrink-0 sm:w-auto"
              >
                Start Your Project
              </QuoteButton>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
