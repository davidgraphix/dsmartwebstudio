import Image from "next/image";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { BrowserFrame } from "@/components/visuals/Frames";

/**
 * Project preview.
 *
 * Uses the real screenshot when one is supplied. With no screenshot it falls
 * back to a typographic plate built from the project's own name and category —
 * never a stock photo and never a fabricated interface.
 */
export function ProjectVisual({
  project,
  priority = false,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  project: Project;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const image = project.images?.[0];

  if (image) {
    return (
      <div className={cn("relative overflow-hidden bg-navy-950", className)}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-linear-to-br from-navy-900 via-navy to-navy-950 p-5 sm:p-8",
        className,
      )}
      style={
        project.accent
          ? { backgroundImage: `linear-gradient(140deg, ${project.accent}22, transparent 65%)` }
          : undefined
      }
    >
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
      <BrowserFrame
        url={project.liveUrl?.replace(/^https?:\/\//, "").replace(/\/$/, "") || "project"}
        className="w-full max-w-md transition-transform duration-700 ease-out group-hover:-translate-y-1.5"
      >
        <div className="flex min-h-[112px] flex-col justify-center gap-2 px-5 py-7 sm:min-h-[150px] sm:px-7">
          <span className="text-[10px] font-bold tracking-[0.2em] text-gold uppercase">
            {project.category}
          </span>
          <span className="font-display text-xl leading-tight font-extrabold text-white sm:text-2xl">
            {project.name}
          </span>
        </div>
      </BrowserFrame>
    </div>
  );
}
