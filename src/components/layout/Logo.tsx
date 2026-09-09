import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Wordmark. The monogram tile carries the yellow so the lockup keeps working
 * on both navy and white backgrounds.
 */
export function Logo({
  tone = "light",
  className,
  href = "/",
}: {
  tone?: "light" | "dark";
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn("group flex items-center gap-2.5 rounded-lg", className)}
      aria-label="DSmart Web Studio — home"
    >
      <span
        aria-hidden="true"
        className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-[10px] bg-gold font-display text-[17px] font-extrabold text-navy transition-transform duration-300 group-hover:-rotate-6"
      >
        D
        <span className="absolute inset-x-0 bottom-0 h-[3px] bg-navy/85" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[15px] font-extrabold tracking-[-0.02em]",
            tone === "light" ? "text-white" : "text-ink",
          )}
        >
          DSmart
        </span>
        <span
          className={cn(
            "mt-0.5 text-[9.5px] font-semibold tracking-[0.24em] uppercase",
            tone === "light" ? "text-white/55" : "text-ink/45",
          )}
        >
          Web Studio
        </span>
      </span>
    </Link>
  );
}
