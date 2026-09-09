import { z } from "zod";
import { QUOTE_SERVICE_OPTIONS } from "@/data/services";
import { TIMELINE_OPTIONS } from "@/data/pricing";

/**
 * Shared schema — imported by the client form and by the API route so the
 * server never trusts client-side validation.
 */

const text = (min: number, max: number) => z.string().trim().min(min).max(max);

export const quoteSchema = z.object({
  service: z.enum(QUOTE_SERVICE_OPTIONS as unknown as [string, ...string[]]),
  name: text(2, 80),
  business: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().min(5).max(160).email(),
  phone: text(6, 30).regex(/^[+\d][\d\s()+-]{5,29}$/, "Enter a valid phone number"),
  country: text(2, 60),
  details: text(20, 3000),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  timeline: z.enum(TIMELINE_OPTIONS as unknown as [string, ...string[]]).optional(),
  /** Honeypot. Accepted by the schema so the route can silently absorb bots. */
  company_website: z.string().max(200).optional(),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const FIELD_MESSAGES: Record<string, string> = {
  service: "Select the service you need.",
  name: "Enter your full name (at least 2 characters).",
  business: "Business name is too long.",
  email: "Enter a valid email address.",
  phone: "Enter a valid phone or WhatsApp number.",
  country: "Select your country.",
  details: "Tell us a little more — at least 20 characters.",
  budget: "Select a budget range.",
  timeline: "Select a timeline.",
};

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;

/** Strips control characters and collapses whitespace before storage/sending. */
export function sanitize(value: string): string {
  return value.replace(CONTROL_CHARS, " ").replace(/[ \t]{2,}/g, " ").trim();
}
