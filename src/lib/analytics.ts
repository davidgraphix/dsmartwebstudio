/**
 * Analytics event layer.
 *
 * Events are pushed to `window.dataLayer` and forwarded to `gtag` when it
 * exists, so adding Google Analytics 4 is a matter of setting
 * NEXT_PUBLIC_GA_ID — no component changes.
 */

export type AnalyticsEvent =
  | "quote_started"
  | "quote_step_completed"
  | "quote_submitted"
  | "whatsapp_clicked"
  | "project_viewed"
  | "contact_submitted"
  | "pricing_viewed"
  | "currency_changed";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: EventParams = {}): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });

  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
