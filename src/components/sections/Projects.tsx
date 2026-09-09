"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PROJECTS, availableFilters, type Project, type ProjectCategory } from "@/data/projects";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

/** Featured projects break the grid; the rest fill a two-column layout. */
function layout(projects: Project[]) {
  const blocks: ({ kind: "featured"; project: Project } | { kind: "grid"; projects: Project[] })[] = [];
  let bucket: Project[] = [];

  for (const project of projects) {
    if (project.featured) {
      if (bucket.length) {
        blocks.push({ kind: "grid", projects: bucket });
        bucket = [];
      }
      blocks.push({ kind: "featured", project });
    } else {
      bucket.push(project);
    }
  }
  if (bucket.length) blocks.push({ kind: "grid", projects: bucket });
  return blocks;
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();
  const filters = availableFilters();

  const visible = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  const blocks = useMemo(() => layout(visible), [visible]);
  const hasProjects = PROJECTS.length > 0;

  return (
    <Section tone="light" id="work" aria-labelledby="work-title">
      <Container>
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title="Built. Shipped. Results."
          intro="Real products, live on the internet. Each one designed, developed and optimized end to end."
          action={
            hasProjects ? (
              <ButtonLink href="/work" variant="outline" size="md" arrow>
                All projects
              </ButtonLink>
            ) : null
          }
        />

        {/* Filters — only worth showing once there is enough work to filter */}
        {hasProjects && filters.length > 2 ? (
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
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
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

        {hasProjects ? (
          <div className="mt-10 space-y-6 sm:mt-12 sm:space-y-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {blocks.map((block, index) =>
                block.kind === "featured" ? (
                  <motion.div
                    key={`featured-${block.project.slug}`}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    onViewportEnter={() =>
                      track("project_viewed", { project: block.project.slug })
                    }
                  >
                    <ProjectCard project={block.project} featured priority={index === 0} />
                  </motion.div>
                ) : (
                  <motion.div
                    key={`grid-${index}`}
                    layout={!reduce}
                    className="grid gap-6 md:grid-cols-2"
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {block.projects.map((project) => (
                      <ProjectCard key={project.slug} project={project} />
                    ))}
                  </motion.div>
                ),
              )}
            </AnimatePresence>

            {visible.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-line py-14 text-center text-[15px] text-ink/45">
                No projects in this category yet.
              </p>
            ) : null}
          </div>
        ) : (
          <ProjectsPlaceholder />
        )}

        {/* Conversion step after the work */}
        <Reveal className="mt-12" delay={0.05}>
          <div className="flex flex-col items-start gap-5 rounded-2xl bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-display text-lg font-bold sm:text-xl">
                Want something like this for your business?
              </p>
              <p className="mt-1.5 text-[14px] text-white/60">
                Tell us the goal. We’ll scope the build and send you a quote.
              </p>
            </div>
            <QuoteButton
              source="projects-cta"
              variant="gold"
              size="lg"
              arrow
              className="w-full shrink-0 sm:w-auto"
            >
              Build Something Like This
            </QuoteButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/**
 * Shown while the public case-study library is being prepared. It sets
 * expectations honestly instead of filling the section with invented work.
 */
function ProjectsPlaceholder() {
  const anatomy = [
    { label: "The challenge", detail: "What the business needed to solve." },
    { label: "The build", detail: "Design decisions, architecture and features." },
    { label: "The stack", detail: "Every technology used in the product." },
    { label: "After launch", detail: "SEO, performance and what we optimized." },
  ];

  return (
    <Reveal className="mt-12">
      <div className="overflow-hidden rounded-2xl border border-line bg-mist">
        <div className="grid lg:grid-cols-2">
          <div className="p-7 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-navy/12 bg-white px-3 py-1.5 text-[11px] font-bold tracking-[0.12em] text-navy uppercase">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              Case studies in production
            </span>

            <h3 className="mt-6 font-display text-2xl leading-tight font-extrabold text-ink sm:text-3xl">
              Our case studies are being published here.
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/60">
              We publish a project only once we can show the real product and describe what it does
              accurately. In the meantime, we’ll walk you through live builds directly.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton
                source="projects-empty"
                size="lg"
                message="Hello DSmart Web Studio, I'd like to see examples of your work."
              >
                See our work on WhatsApp
              </WhatsAppButton>
              <QuoteButton source="projects-empty" variant="outline" size="lg" arrow>
                Start a Project
              </QuoteButton>
            </div>
          </div>

          <div className="border-t border-line bg-white p-7 sm:p-10 lg:border-t-0 lg:border-l">
            <p className="text-[11px] font-bold tracking-[0.18em] text-ink/40 uppercase">
              What a DSmart case study covers
            </p>
            <ul className="mt-6 space-y-5">
              {anatomy.map((item, index) => (
                <li key={item.label} className="flex gap-4">
                  <span className="font-mono text-[11px] text-navy/45">0{index + 1}</span>
                  <div>
                    <p className="text-[14.5px] font-semibold text-ink">{item.label}</p>
                    <p className="mt-0.5 text-[13px] text-ink/50">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-2 border-t border-line pt-5 text-[12.5px] text-ink/45">
              <Icon name="shield" size={14} className="text-navy" />
              No stock mockups. No invented results.
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
