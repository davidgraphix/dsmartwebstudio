import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "navy",
  className,
}: {
  children: ReactNode;
  tone?: "navy" | "gold" | "light" | "outline-light";
  className?: string;
}) {
  const tones = {
    navy: "bg-navy/8 text-navy",
    gold: "bg-gold text-ink",
    light: "bg-white/10 text-white",
    "outline-light": "border border-white/18 text-white/80",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Tag({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 font-mono text-[11px] tracking-tight",
        tone === "dark"
          ? "bg-white/8 text-white/70 ring-1 ring-white/10"
          : "bg-navy/6 text-navy/75 ring-1 ring-navy/8",
      )}
    >
      {children}
    </span>
  );
}
