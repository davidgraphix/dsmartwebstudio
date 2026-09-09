"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import { projectNumber } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Badge";
import { track } from "@/lib/analytics";
import { DeviceShowcase } from "./DeviceShowcase";
import { useMotionAllowed, useProjectStage } from "./stage";

/**
 * One project, presented as a mini case study rather than a card.
 *
 * The layout alternates side to side down the page, and the device
 * composition is the hero of each block. Everything on screen comes from the
 * project object, so a new project is a new entry in `data/projects.ts`.
 */
export function ProjectShowcase({
  project,
  index,
  className,
}: {
  project: Project;
  /** Drives the left/right alternation. */
  index: number;
  className?: string;
}) {
  const { ref, near, active } = useProjectStage();
  const motionAllowed = useMotionAllowed();
  const reduce = useReducedMotion();

  // Visual on the left for every second project.
  const mirrored = index % 2 === 1;

  // Nothing is fetched until the block is close AND motion previews are
  // appropriate for this visitor's connection and preferences.
  const load = near && motionAllowed === true;

  // The server cannot know the visitor's motion preference, so it renders the
  // hidden state. Reduced motion therefore has to settle on the visible state
  // explicitly rather than drop the motion props, which would strand opacity 0.
  const copyMotion = {
    initial: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
  } as const;

  const ease = [0.16, 1, 0.3, 1] as const;
  const step = (delay: number) =>
    reduce ? { duration: 0 } : { duration: 0.5, delay, ease };

  return (
    <article
      ref={ref}
      className={cn("group relative", className)}
      onMouseEnter={() => track("project_viewed", { project: project.slug })}
    >
      <div
        className={cn(
          "grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-20",
        )}
      >
        {/* Copy ------------------------------------------------------------ */}
        <div className={cn("lg:col-span-5", mirrored && "lg:order-2")}>
          <motion.div {...copyMotion} transition={step(0)}>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[13px] font-medium text-navy/45">
                {projectNumber(project)}
              </span>
              <span className="h-px w-8 bg-line" aria-hidden="true" />
              <span className="text-[10.5px] font-bold tracking-[0.16em] text-navy/70 uppercase">
                {project.discipline}
              </span>
            </div>

            <h3 className="mt-5 font-display text-[clamp(1.9rem,1.1rem+2.4vw,3.1rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-ink uppercase">
              {project.name}
            </h3>

            <p className="mt-2.5 font-display text-[15px] font-semibold text-navy sm:text-base">
              {project.title}
            </p>

            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink/60 sm:text-[15.5px]">
              {project.summary}
            </p>
          </motion.div>

          {project.features.length > 0 ? (
            <motion.ul
              {...copyMotion}
              transition={step(0.08)}
              className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            >
              {project.features.slice(0, 6).map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Icon name="check" size={13} className="mt-[5px] shrink-0 text-navy" />
                  <span className="text-[13px] leading-snug text-ink/60">{feature}</span>
                </li>
              ))}
            </motion.ul>
          ) : null}

          {project.technologies.length > 0 ? (
            <motion.div
              {...copyMotion}
              transition={step(0.14)}
              className="mt-7 flex flex-wrap gap-1.5"
            >
              {project.technologies.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </motion.div>
          ) : null}

          {project.disclosure ? (
            <p className="mt-5 max-w-lg border-l-2 border-line pl-3 text-[12.5px] leading-relaxed text-ink/40">
              {project.disclosure}
            </p>
          ) : null}

          <motion.div
            {...copyMotion}
            transition={step(0.2)}
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.08em] text-navy uppercase transition-colors hover:text-navy-600"
              >
                View live project
                <Icon
                  name="arrow-up-right"
                  size={16}
                  className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                />
              </a>
            ) : null}

            {project.caseStudy ? (
              <Link
                href={`/work/${project.slug}`}
                className="group/cta inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.08em] text-ink/45 uppercase transition-colors hover:text-navy"
              >
                View case study
                <Icon
                  name="arrow-right"
                  size={16}
                  className="transition-transform duration-300 group-hover/cta:translate-x-1"
                />
              </Link>
            ) : null}
          </motion.div>
        </div>

        {/* Visual ---------------------------------------------------------- */}
        <div className="lg:col-span-7">
          <DeviceShowcase
            project={project}
            load={load}
            active={active}
            motionAllowed={motionAllowed}
            mirrored={mirrored}
          />
        </div>
      </div>
    </article>
  );
}
