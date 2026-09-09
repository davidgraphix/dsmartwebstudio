import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Chrome-less browser window used to frame product mockups. */
export function BrowserFrame({
  children,
  url = "app.yourbusiness.com",
  className,
  tone = "dark",
}: {
  children: ReactNode;
  url?: string;
  className?: string;
  tone?: "dark" | "light";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border shadow-[0_30px_80px_-30px_rgba(1,7,44,0.8)] sm:rounded-2xl",
        dark ? "border-white/12 bg-navy-950" : "border-line bg-white",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b px-3 py-2.5 sm:gap-3 sm:px-4",
          dark ? "border-white/10 bg-white/[0.04]" : "border-line bg-mist",
        )}
      >
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#FF5F57]/80 sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-[#FEBC2E]/80 sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-[#28C840]/80 sm:h-2.5 sm:w-2.5" />
        </div>
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[9px] sm:text-[10px]",
            dark ? "bg-white/[0.06] text-white/45" : "bg-white text-ink/45",
          )}
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 10V7a5 5 0 0 1 10 0v3M5 10h14v10H5z"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
          </svg>
          <span className="truncate">{url}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

/** Phone shell for mobile-app mockups. */
export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.75rem] border-[5px] border-navy-950 bg-navy-950 shadow-[0_28px_60px_-24px_rgba(1,7,44,0.9)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.35rem] bg-white">
        <div
          className="absolute top-1.5 left-1/2 z-10 h-3.5 w-16 -translate-x-1/2 rounded-full bg-navy-950"
          aria-hidden="true"
        />
        {children}
      </div>
    </div>
  );
}

/** Floating info card used around the hero composition. */
export function FloatCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-3 shadow-[0_22px_50px_-24px_rgba(1,7,44,0.9)] sm:rounded-2xl sm:p-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
