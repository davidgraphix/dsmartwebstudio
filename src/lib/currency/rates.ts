import { FALLBACK_RATES, type CurrencyCode } from "./config";

export type RateTable = Record<CurrencyCode, number>;

type ErApiResponse = { result?: string; rates?: Record<string, number> };

/**
 * Fetches live NGN-based rates, falling back to the configured table when the
 * provider is unavailable, slow or returns anything unexpected. Rates are
 * cached by the Next.js data cache, so a build never blocks on the network.
 */
export async function fetchRates(): Promise<{ rates: RateTable; live: boolean }> {
  const endpoint =
    process.env.EXCHANGE_RATES_URL || "https://open.er-api.com/v6/latest/NGN";

  try {
    const response = await fetch(endpoint, {
      next: { revalidate: 60 * 60 * 12 },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) throw new Error(`Rates HTTP ${response.status}`);

    const data = (await response.json()) as ErApiResponse;
    if (!data.rates) throw new Error("Rates payload missing");

    const rates = { ...FALLBACK_RATES };
    let matched = 0;
    for (const code of Object.keys(FALLBACK_RATES) as CurrencyCode[]) {
      const value = data.rates[code];
      if (typeof value === "number" && Number.isFinite(value) && value > 0) {
        rates[code] = value;
        matched += 1;
      }
    }
    rates.NGN = 1;
    if (matched < 3) throw new Error("Too few usable rates");
    return { rates, live: true };
  } catch {
    return { rates: { ...FALLBACK_RATES }, live: false };
  }
}
