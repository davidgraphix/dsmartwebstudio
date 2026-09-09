/**
 * Currency configuration.
 *
 * Base currency is NGN — every price in `data/pricing.ts` is stored in naira
 * and converted for display only. Conversions are labelled as approximate and
 * rounded to a "nice" number so they never read as an exact quote.
 */

export type CurrencyCode = "NGN" | "USD" | "GBP" | "EUR" | "CAD" | "GHS" | "ZAR" | "AED";

export type Currency = {
  code: CurrencyCode;
  symbol: string;
  label: string;
  /** Rounding step applied after conversion, in the target currency. */
  roundTo: number;
  /** Currencies with large unit values keep no decimals. */
  maximumFractionDigits: number;
};

export const BASE_CURRENCY: CurrencyCode = "NGN";

export const CURRENCIES: Record<CurrencyCode, Currency> = {
  NGN: { code: "NGN", symbol: "₦", label: "Nigerian Naira", roundTo: 1000, maximumFractionDigits: 0 },
  USD: { code: "USD", symbol: "$", label: "US Dollar", roundTo: 10, maximumFractionDigits: 0 },
  GBP: { code: "GBP", symbol: "£", label: "British Pound", roundTo: 10, maximumFractionDigits: 0 },
  EUR: { code: "EUR", symbol: "€", label: "Euro", roundTo: 10, maximumFractionDigits: 0 },
  CAD: { code: "CAD", symbol: "CA$", label: "Canadian Dollar", roundTo: 10, maximumFractionDigits: 0 },
  GHS: { code: "GHS", symbol: "GH₵", label: "Ghanaian Cedi", roundTo: 10, maximumFractionDigits: 0 },
  ZAR: { code: "ZAR", symbol: "R", label: "South African Rand", roundTo: 50, maximumFractionDigits: 0 },
  AED: { code: "AED", symbol: "AED", label: "UAE Dirham", roundTo: 10, maximumFractionDigits: 0 },
};

export const CURRENCY_LIST: Currency[] = Object.values(CURRENCIES);

/**
 * ISO-3166 alpha-2 → currency. Anything not listed falls back to USD when a
 * country is detected, and to NGN when detection fails entirely.
 */
export const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  NG: "NGN",
  US: "USD",
  GB: "GBP",
  CA: "CAD",
  GH: "GHS",
  ZA: "ZAR",
  AE: "AED",
  KE: "USD",
  IE: "EUR",
  DE: "EUR",
  FR: "EUR",
  ES: "EUR",
  IT: "EUR",
  NL: "EUR",
  BE: "EUR",
  PT: "EUR",
  AT: "EUR",
  FI: "EUR",
  GR: "EUR",
  SK: "EUR",
  SI: "EUR",
  LT: "EUR",
  LV: "EUR",
  EE: "EUR",
  LU: "EUR",
  CY: "EUR",
  MT: "EUR",
  HR: "EUR",
};

/**
 * Fallback exchange rates: units of the target currency per 1 NGN.
 * Deliberately configurable — override with NEXT_PUBLIC-free server env or
 * let /api/rates refresh them from a live source.
 */
export const FALLBACK_RATES: Record<CurrencyCode, number> = {
  NGN: 1,
  USD: 1 / 1550,
  GBP: 1 / 1980,
  EUR: 1 / 1680,
  CAD: 1 / 1130,
  GHS: 1 / 105,
  ZAR: 1 / 85,
  AED: 1 / 422,
};

export const COUNTRIES: { code: string; name: string }[] = [
  { code: "NG", name: "Nigeria" },
  { code: "GH", name: "Ghana" },
  { code: "KE", name: "Kenya" },
  { code: "ZA", name: "South Africa" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "IE", name: "Ireland" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "NL", name: "Netherlands" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "AU", name: "Australia" },
  { code: "IN", name: "India" },
  { code: "OTHER", name: "Other" },
];

export function currencyForCountry(countryCode?: string | null): CurrencyCode {
  if (!countryCode) return BASE_CURRENCY;
  const code = countryCode.toUpperCase();
  return COUNTRY_CURRENCY[code] ?? (code === "OTHER" ? BASE_CURRENCY : "USD");
}
