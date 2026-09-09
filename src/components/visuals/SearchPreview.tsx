import { cn } from "@/lib/utils";
import { AreaChart } from "./Charts";
import { Icon } from "@/components/ui/Icon";

/**
 * Search-visibility mockups: a result snippet with rich-result markup and a
 * Search Console style performance panel. Illustrative interface content.
 */

export function SearchResultCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-white p-4 shadow-[0_20px_50px_-24px_rgba(2,22,127,0.35)] sm:p-5",
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-2 rounded-full border border-line bg-mist px-3.5 py-2">
        <Icon name="search" size={13} className="shrink-0 text-ink/35" />
        <span className="truncate text-[12px] text-ink/55">web development company near me</span>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy text-[10px] font-extrabold text-white">
            D
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] leading-tight font-semibold text-ink">
              Your Business
            </p>
            <p className="truncate font-mono text-[10px] text-ink/45">yourbusiness.com</p>
          </div>
        </div>

        <p className="text-[15px] leading-snug font-medium text-[#1a0dab] sm:text-base">
          Your Business — Services, Pricing &amp; Contact
        </p>
        <p className="text-[12.5px] leading-relaxed text-ink/60">
          Clear metadata, structured data and fast pages so search engines can read, index and
          present your business properly.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1.5">
          {["Services", "Pricing", "Contact"].map((link) => (
            <span key={link} className="text-[11.5px] font-medium text-[#1a0dab]">
              {link}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-3">
        {["Organization schema", "FAQ rich result", "Sitemap", "Canonical"].map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-1 rounded-md bg-navy/6 px-2 py-1 text-[10px] font-medium text-navy/70"
          >
            <Icon name="check" size={10} className="text-navy" />
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SearchConsolePanel({ className }: { className?: string }) {
  const metrics = [
    { label: "Clicks", value: "Tracked", dot: "bg-[#4285F4]" },
    { label: "Impressions", value: "Tracked", dot: "bg-[#7B61FF]" },
    { label: "Indexed pages", value: "Monitored", dot: "bg-gold" },
  ];

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/12 bg-navy-950 shadow-[0_28px_70px_-30px_rgba(1,7,44,0.9)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon name="google" size={14} className="text-white/70" />
          <span className="text-[11px] font-semibold text-white/80">Search Console</span>
        </div>
        <span className="rounded-full bg-[#4ade80]/15 px-2.5 py-1 text-[9px] font-semibold text-[#4ade80]">
          Verified
        </span>
      </div>

      <div className="grid grid-cols-3 divide-x divide-white/8 border-b border-white/8">
        {metrics.map((metric) => (
          <div key={metric.label} className="px-3 py-3">
            <div className="flex items-center gap-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full", metric.dot)} />
              <span className="truncate text-[9px] tracking-[0.08em] text-white/45 uppercase">
                {metric.label}
              </span>
            </div>
            <p className="mt-1 font-display text-[12px] font-bold text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="relative h-28 px-2 pt-3 pb-2 sm:h-32">
        <AreaChart stroke="#4285F4" fill="rgba(66,133,244,0.16)" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold to-transparent animate-[scan_3.4s_ease-in-out_infinite]"
          aria-hidden="true"
        />
      </div>

      <div className="flex items-center gap-2 border-t border-white/8 px-4 py-2.5">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
        <span className="text-[10px] text-white/50">Sitemap submitted · Indexing requested</span>
      </div>
    </div>
  );
}
