import Link from "next/link";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Badge";
import { ProjectVisual } from "./ProjectVisual";

export function ProjectCard({
  project,
  featured = false,
  priority = false,
}: {
  project: Project;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-line bg-white transition-all duration-400 hover:-translate-y-1 hover:border-navy/20 hover:shadow-[0_28px_60px_-30px_rgba(2,22,127,0.45)]",
        featured && "lg:grid lg:grid-cols-2 lg:items-stretch",
      )}
    >
      <ProjectVisual
        project={project}
        priority={priority}
        sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
        className={cn("aspect-16/10 w-full", featured && "lg:aspect-auto lg:h-full lg:min-h-[340px]")}
      />

      <div className={cn("flex flex-col p-6 sm:p-7", featured && "lg:justify-center lg:p-10")}>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center rounded-full bg-navy/7 px-2.5 py-1 text-[10.5px] font-bold tracking-[0.12em] text-navy uppercase">
            {project.category}
          </span>
          {project.industry ? (
            <span className="text-[11.5px] text-ink/40">{project.industry}</span>
          ) : null}
          {project.year ? <span className="text-[11.5px] text-ink/35">{project.year}</span> : null}
        </div>

        <h3
          className={cn(
            "mt-4 font-display font-extrabold tracking-[-0.03em] text-ink",
            featured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          <Link href={`/work/${project.slug}`} className="before:absolute before:inset-0">
            {project.name}
          </Link>
        </h3>

        <p
          className={cn(
            "mt-3 leading-relaxed text-ink/55",
            featured ? "text-[15px] sm:text-base" : "text-[14px]",
          )}
        >
          {project.summary}
        </p>

        {project.features.length > 0 ? (
          <ul className="mt-5 space-y-1.5">
            {project.features.slice(0, featured ? 4 : 3).map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Icon name="check" size={13} className="mt-1 shrink-0 text-navy" />
                <span className="text-[13px] text-ink/60">{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {project.technologies.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, featured ? 6 : 4).map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
        ) : null}

        <div className="mt-6 flex items-center gap-4 border-t border-line pt-5">
          <span className="inline-flex items-center gap-2 text-[13.5px] font-bold text-navy">
            View Project
            <Icon
              name="arrow-right"
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
          {project.liveUrl ? (
            <span className="relative z-10 ml-auto">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink/45 transition-colors hover:text-navy"
              >
                Live site
                <Icon name="arrow-up-right" size={14} />
              </a>
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
