import { NextResponse } from "next/server";
import { fetchRates } from "@/lib/currency/rates";

export const runtime = "nodejs";
export const revalidate = 43200; // 12 hours

/** NGN-based exchange rates with a static fallback table. */
export async function GET(): Promise<NextResponse> {
  const { rates, live } = await fetchRates();

  return NextResponse.json(
    { base: "NGN", rates, live, updatedAt: new Date().toISOString() },
    {
      headers: {
        "Cache-Control": "public, s-maxage=43200, stale-while-revalidate=86400",
      },
    },
  );
}
