"use client";

import { useCurrency } from "@/providers/CurrencyProvider";
import { CURRENCY_LIST, type CurrencyCode } from "@/lib/currency/config";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/**
 * Manual currency override. Detection is a convenience — this control is the
 * authority, and the choice is remembered on the device.
 */
export function CurrencySelector({
  tone = "light",
  className,
  id = "currency-select",
}: {
  tone?: "light" | "dark";
  className?: string;
  id?: string;
}) {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <label
        htmlFor={id}
        className={cn(
          "text-[11px] font-bold tracking-[0.14em] uppercase",
          tone === "dark" ? "text-white/45" : "text-ink/45",
        )}
      >
        Currency
      </label>
      <div className="relative">
        <select
          id={id}
          value={currency}
          onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
          className={cn(
            "h-11 cursor-pointer appearance-none rounded-xl border pr-9 pl-3.5 text-[13.5px] font-semibold transition-colors",
            tone === "dark"
              ? "border-white/15 bg-white/[0.06] text-white hover:border-white/30"
              : "border-line bg-white text-ink hover:border-navy/30",
          )}
        >
          {CURRENCY_LIST.map((item) => (
            <option key={item.code} value={item.code}>
              {item.code} · {item.symbol}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={15}
          className={cn(
            "pointer-events-none absolute top-1/2 right-3 -translate-y-1/2",
            tone === "dark" ? "text-white/50" : "text-ink/40",
          )}
        />
      </div>
    </div>
  );
}
