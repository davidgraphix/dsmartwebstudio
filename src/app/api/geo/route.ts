import { NextResponse } from "next/server";
import { currencyForCountry } from "@/lib/currency/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Approximate visitor country from edge/proxy headers.
 *
 * No third-party IP lookup and no personal data is stored. If nothing is
 * detected the client keeps its own fallback (locale/timezone, then NGN).
 */
export async function GET(request: Request): Promise<NextResponse> {
  const headers = request.headers;

  const country =
    headers.get("x-vercel-ip-country") ||
    headers.get("cf-ipcountry") ||
    headers.get("x-country-code") ||
    headers.get("fastly-client-country") ||
    null;

  const normalized = country && /^[A-Za-z]{2}$/.test(country) ? country.toUpperCase() : null;

  return NextResponse.json(
    {
      country: normalized,
      currency: normalized ? currencyForCountry(normalized) : null,
      detected: Boolean(normalized),
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
