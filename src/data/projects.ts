/**
 * Project / case-study data.
 *
 * IMPORTANT: every field here must be verifiable from the live project or
 * supplied by the studio. Nothing in this file is invented — no fabricated
 * clients, metrics or testimonials. The array is intentionally empty until
 * real project data is added; the UI degrades to a considered empty state.
 */

export type ProjectCategory =
  | "Websites"
  | "E-commerce"
  | "Web Apps"
  | "Software"
  | "UI/UX";

export type ProjectResult = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  /** Client or industry — omit rather than guess. */
  client?: string;
  industry?: string;
  year?: string;
  /** One-line summary used on cards. */
  summary: string;
  /** Longer description used on the case-study page. */
  description?: string;
  challenge?: string;
  solution?: string;
  designNotes?: string;
  features: string[];
  technologies: string[];
  /** Verified outcomes only. Leave empty when none were measured. */
  results?: ProjectResult[];
  liveUrl?: string;
  /** Paths under /public. First image is the card preview. */
  images?: { src: string; alt: string; width: number; height: number }[];
  /** Brand accent sampled from the project, used for card theming. */
  accent?: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [];

export const PROJECT_FILTERS: ("All" | ProjectCategory)[] = [
  "All",
  "Websites",
  "E-commerce",
  "Web Apps",
  "Software",
  "UI/UX",
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

/** Filters are only worth rendering once there is enough work to filter. */
export function availableFilters(): ("All" | ProjectCategory)[] {
  const present = new Set(PROJECTS.map((p) => p.category));
  return PROJECT_FILTERS.filter((f) => f === "All" || present.has(f));
}

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);
