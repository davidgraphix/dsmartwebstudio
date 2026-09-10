"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
import { displayUrl } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { PreviewVideo } from "./PreviewVideo";
import { useMediaQuery } from "./stage";

/* ------------------------------------------------------------------ frames */

/** Browser window used to present the desktop recording as a real product. */
function BrowserShell({
  url,
  children,
  className,
  chromeSlot,
}: {
  url: string;
  children: ReactNode;
  className?: string;
  chromeSlot?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/12 bg-navy-950 shadow-[0_40px_90px_-40px_rgba(1,7,44,0.85)] sm:rounded-2xl",
        "transition-shadow duration-500 group-hover/visual:shadow-[0_54px_110px_-40px_rgba(2,22,127,0.7)]",
        className,
      )}
    >
      <div className="flex items-center gap-2.5 border-b border-white/10 bg-white/[0.05] px-3 py-2.5 sm:gap-3.5 sm:px-4">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]/85 sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/85 sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]/85 sm:h-2.5 sm:w-2.5" />
        </div>

        <div className="hidden items-center gap-2 text-white/25 sm:flex" aria-hidden="true">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/[0.07] px-2.5 py-1 font-mono text-[9px] text-white/50 sm:text-[10.5px]">
          <svg
            width="9"
            height="9"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M7 10V7a5 5 0 0 1 10 0v3M5 10h14v10H5z"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
          </svg>
          <span className="truncate">{url}</span>
        </div>

        {chromeSlot}
      </div>
      {children}
    </div>
  );
}

/** Phone shell used to present the mobile recording. */
function PhoneShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <span
        className="absolute top-[19%] -left-[3px] h-[7%] w-[3px] rounded-l-sm bg-navy-950/80"
        aria-hidden="true"
      />
      <span
        className="absolute top-[29%] -left-[3px] h-[11%] w-[3px] rounded-l-sm bg-navy-950/80"
        aria-hidden="true"
      />
      <span
        className="absolute top-[24%] -right-[3px] h-[13%] w-[3px] rounded-r-sm bg-navy-950/80"
        aria-hidden="true"
      />

      <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(150deg,#1a1f3d,#01072c_45%,#04061a)] p-[3px] shadow-[0_34px_70px_-24px_rgba(1,7,44,0.9)] ring-1 ring-white/10">
        <div className="relative overflow-hidden rounded-[1.85rem] bg-black ring-1 ring-white/[0.06]">
          <div
            className="absolute top-[2.2%] left-1/2 z-20 h-[3.6%] w-[30%] -translate-x-1/2 rounded-full bg-black"
            aria-hidden="true"
          />
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ labels */

/**
 * Tells the visitor the visual is a real recording, without a play button —
 * the recording is already running.
 */
function LivePreviewBadge({
  tone = "dark",
  live = true,
}: {
  tone?: "dark" | "light";
  /** False when the visitor gets the poster instead of the recording. */
  live?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-[3px] text-[8.5px] font-bold tracking-[0.14em] uppercase ring-1 sm:text-[9.5px]",
        tone === "dark"
          ? "bg-white/[0.08] text-white/65 ring-white/10"
          : "bg-navy/6 text-navy/65 ring-navy/10",
      )}
    >
      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
        {live ? (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
        ) : null}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
      </span>
      {live ? "Live preview" : "Project preview"}
    </span>
  );
}

/** Hover affordance laid over the desktop frame. */
function OpenLiveOverlay({ project }: { project: Project }) {
  if (!project.liveUrl) return null;

  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${project.name} in a new tab`}
      className="absolute inset-0 z-10 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-gold sm:rounded-2xl"
    >
      <span className="pointer-events-none absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-[11px] font-bold tracking-[0.1em] text-white uppercase opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/visual:opacity-100">
        Open live site
        <Icon name="arrow-up-right" size={13} />
      </span>
    </a>
  );
}

/* ------------------------------------------------------------- composition */

type ShowcaseProps = {
  project: Project;
  /** Videos may attach a src. */
  load: boolean;
  /** Videos may play. */
  active: boolean;
  /** False when reduced motion or a frugal connection rules previews out. */
  motionAllowed?: boolean | null;
  /** Flips the phone to the opposite corner so it never sits over the copy. */
  mirrored?: boolean;
  className?: string;
};

/**
 * The project visual.
 *
 * Large screens get the layered composition: the desktop recording inside a
 * browser window, with the phone overlapping its lower corner. Small screens
 * get a compact segmented control instead, defaulting to the mobile recording,
 * because two device frames stacked in a phone-width column is just scrolling.
 *
 * Only the selected recording is mounted on small screens, so the toggle also
 * halves what gets downloaded there.
 */
export function DeviceShowcase({
  project,
  load,
  active,
  motionAllowed,
  mirrored,
  className,
}: ShowcaseProps) {
  const live = motionAllowed !== false;
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();
  const [view, setView] = useState<"mobile" | "desktop">("mobile");

  const url = displayUrl(project);

  if (!isDesktop) {
    return (
      <div className={cn("group/visual", className)}>
        <ViewToggle id={project.slug} value={view} onChange={setView} />

        <div className="mt-5">
          {view === "mobile" ? (
            <div className="mx-auto w-full max-w-[248px]">
              <PhoneShell>
                <PreviewVideo
                  source={project.media.mobile}
                  label={`${project.name} — mobile walkthrough`}
                  load={load}
                  active={active}
                  className="rounded-[1.85rem]"
                />
              </PhoneShell>
              <div className="mt-4 flex justify-center">
                <LivePreviewBadge tone="light" live={live} />
              </div>
            </div>
          ) : (
            <BrowserShell url={url} chromeSlot={<LivePreviewBadge live={live} />}>
              <PreviewVideo
                source={project.media.desktop}
                label={`${project.name} — desktop walkthrough`}
                load={load}
                active={active}
              />
            </BrowserShell>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("group/visual relative pb-16", className)}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={reduce ? { duration: 0 } : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative transition-transform duration-500 ease-out group-hover/visual:-translate-y-1"
      >
        <BrowserShell url={url} chromeSlot={<LivePreviewBadge live={live} />}>
          <PreviewVideo
            source={project.media.desktop}
            label={`${project.name} — desktop walkthrough`}
            load={load}
            active={active}
            videoClassName="transition-transform duration-700 ease-out group-hover/visual:scale-[1.015]"
          />
        </BrowserShell>
        <OpenLiveOverlay project={project} />
      </motion.div>

      {/* Phone overlaps the lower corner, forming the layered composition. */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40, rotate: mirrored ? 4 : -4 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-none absolute bottom-0 z-20 w-[22%] max-w-[196px] min-w-[136px]",
          mirrored ? "left-[3%]" : "right-[3%]",
        )}
      >
        <PhoneShell className="transition-transform duration-500 ease-out group-hover/visual:-translate-y-2">
          <PreviewVideo
            source={project.media.mobile}
            label={`${project.name} — mobile walkthrough`}
            load={load}
            active={active}
            className="rounded-[1.85rem]"
          />
        </PhoneShell>
      </motion.div>
    </div>
  );
}

/** Compact segmented control. Mobile first, because that is the priority view. */
function ViewToggle({
  id,
  value,
  onChange,
}: {
  /** Keeps the sliding pill scoped to one project when several are on screen. */
  id: string;
  value: "mobile" | "desktop";
  onChange: (next: "mobile" | "desktop") => void;
}) {
  const options = [
    { id: "mobile" as const, label: "Mobile", icon: "phone" as const },
    { id: "desktop" as const, label: "Desktop", icon: "browser" as const },
  ];

  return (
    <div
      role="tablist"
      aria-label="Choose preview device"
      className="mx-auto flex w-fit gap-1 rounded-full border border-line bg-mist p-1"
    >
      {options.map((option) => {
        const isActive = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors duration-200",
              isActive ? "text-white" : "text-ink/50",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId={`device-toggle-${id}`}
                className="absolute inset-0 rounded-full bg-navy"
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              />
            ) : null}
            <Icon name={option.icon} size={13} className="relative shrink-0" />
            <span className="relative">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
