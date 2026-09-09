import { BASE_CURRENCY, CURRENCIES, type CurrencyCode } from "./config";

/** Rounds up to the currency's rounding step so prices never look precise. */
export function convertFromNGN(
  amountNGN: number,
  currency: CurrencyCode,
  rates: Partial<Record<CurrencyCode, number>>,
): number {
  if (currency === BASE_CURRENCY) return amountNGN;
  const rate = rates[currency];
  if (!rate || !Number.isFinite(rate) || rate <= 0) return amountNGN;
  const raw = amountNGN * rate;
  const step = CURRENCIES[currency].roundTo;
  return Math.max(step, Math.round(raw / step) * step);
}

export function formatAmount(amount: number, currency: CurrencyCode): string {
  const meta = CURRENCIES[currency];
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: meta.maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(amount);
  return `${meta.symbol}${formatted}`;
}

export function formatFromNGN(
  amountNGN: number,
  currency: CurrencyCode,
  rates: Partial<Record<CurrencyCode, number>>,
): string {
  return formatAmount(convertFromNGN(amountNGN, currency, rates), currency);
}

/** "₦100,000 – ₦250,000" / "₦1,000,000+" */
export function formatRangeFromNGN(
  minNGN: number,
  maxNGN: number | null,
  currency: CurrencyCode,
  rates: Partial<Record<CurrencyCode, number>>,
): string {
  const min = formatFromNGN(minNGN, currency, rates);
  if (maxNGN === null) return `${min}+`;
  return `${min} – ${formatFromNGN(maxNGN, currency, rates)}`;
}
