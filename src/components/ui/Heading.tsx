import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em]",
        tone === "dark" ? "text-navy/70" : "text-gold",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-7", tone === "dark" ? "bg-navy/30" : "bg-gold/60")}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  id,
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  id?: string;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        action && "lg:flex-row lg:items-end lg:justify-between lg:gap-12",
        className,
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <Eyebrow tone={tone} className="mb-5">
            {eyebrow}
          </Eyebrow>
        ) : null}
        <h2
          id={id}
          className={cn("display-2 uppercase", tone === "dark" ? "text-ink" : "text-white")}
        >
          {title}
        </h2>
        {intro ? (
          <p
            className={cn(
              "mt-5 max-w-2xl text-[15px] leading-relaxed sm:text-lg",
              tone === "dark" ? "text-ink/65" : "text-white/65",
              align === "center" && "mx-auto",
            )}
          >
            {intro}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/** Wraps a word in the brand yellow — used inside headline strings. */
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-gold">{children}</span>;
}
