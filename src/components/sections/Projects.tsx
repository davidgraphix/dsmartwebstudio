"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { ORDERED_PROJECTS, availableFilters, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

/**
 * The portfolio.
 *
 * Every project is a full-width editorial block rather than a card, and the
 * order is the studio's own — strongest technical and business work first.
 * Nothing here is project-specific: the list comes from `data/projects.ts`.
 */
export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();
  const filters = availableFilters();

  const visible = useMemo(
    () =>
      filter === "All"
        ? ORDERED_PROJECTS
        : ORDERED_PROJECTS.filter((project) => project.category === filter),
    [filter],
  );

  return (
    <Section tone="light" id="work" aria-labelledby="work-title" spacing="lg">
      <Container>
        <div className="max-w-4xl">
          <Eyebrow className="mb-6">Selected work</Eyebrow>
          <h2 id="work-title" className="display-2 text-ink uppercase">
            We don’t just show mockups.
            <br />
            <span className="text-navy">We show what we actually built.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink/65 sm:text-lg">
            From e-commerce platforms and business websites to research products and custom
            applications, these are real products running in production. Every preview below is a
            screen recording of the live site.
          </p>
        </div>

        {filters.length > 2 ? (
          <Reveal className="mt-10">
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="scroll-slim -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
            >
              {filters.map((option) => {
                const isActive = filter === option;
                return (
                  <button
                    key={option}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setFilter(option)}
                    className={cn(
                      "relative shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors duration-200",
                      isActive ? "text-white" : "text-ink/55 hover:text-navy",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="project-filter"
                        className="absolute inset-0 rounded-full bg-navy"
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ) : (
                      <span className="absolute inset-0 rounded-full border border-line" />
                    )}
                    <span className="relative">{option}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        ) : null}

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28 lg:space-y-36">
          {visible.map((project, index) => (
            <ProjectShowcase
              // Keying on the filter forces a clean remount, so the stage
              // registry never holds an entry for a project that left the page.
              key={`${filter}-${project.slug}`}
              project={project}
              index={index}
            />
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-14 rounded-2xl border border-dashed border-line py-16 text-center text-[15px] text-ink/45">
            No projects in this category yet.
          </p>
        ) : null}

        {/* Conversion step after the work */}
        <Reveal className="mt-24 sm:mt-32">
          <div className="relative overflow-hidden rounded-2xl bg-navy p-8 text-white sm:p-12 lg:p-16">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_80%_at_85%_0%,rgba(255,208,20,0.16)_0%,transparent_60%)]"
              aria-hidden="true"
            />
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <h3
                  className={cn(
                    "font-display text-[clamp(1.7rem,1.1rem+2vw,2.75rem)] leading-[1.05] font-extrabold tracking-[-0.035em] uppercase",
                    reduce ? undefined : "text-balance-tight",
                  )}
                >
                  Your project could be <span className="text-gold">next.</span>
                </h3>
                <p className="mt-5 text-[15px] leading-relaxed text-white/65 sm:text-base">
                  Have an idea, business or digital product that needs to be built properly? Tell us
                  the goal and we’ll scope the build.
                </p>
              </div>

              <div className="flex w-full shrink-0 flex-col gap-3 sm:flex-row lg:w-auto">
                <QuoteButton source="projects-cta" variant="gold" size="lg" arrow>
                  Start a Project
                </QuoteButton>
                <WhatsAppButton
                  source="projects-cta"
                  variant="outline-light"
                  size="lg"
                  message="Hello DSmart Web Studio, I'd like a quote for a project."
                >
                  Request a Quote
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
