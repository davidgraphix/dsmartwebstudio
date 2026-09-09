import { PRIMARY_WHATSAPP, WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_NUMBERS } from "@/data/site";

export type WhatsAppTarget = (typeof WHATSAPP_NUMBERS)[number];

/** Builds a click-to-chat URL with an optional pre-filled message. */
export function whatsappLink(message?: string, e164: string = PRIMARY_WHATSAPP.e164): string {
  const text = encodeURIComponent(message?.trim() || WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${e164}?text=${text}`;
}

export type QuoteSummary = {
  name: string;
  business?: string;
  service: string;
  budget?: string;
  timeline?: string;
  details?: string;
};

/** Human-readable summary the visitor can send straight into the chat. */
export function quoteWhatsAppMessage(summary: QuoteSummary): string {
  const lines = [
    `Hello DSmart Web Studio, I just submitted a project request.`,
    ``,
    `Name: ${summary.name}`,
    summary.business ? `Business: ${summary.business}` : null,
    `Service: ${summary.service}`,
    summary.budget ? `Budget: ${summary.budget}` : null,
    summary.timeline ? `Timeline: ${summary.timeline}` : null,
    summary.details ? `` : null,
    summary.details ? `Project: ${summary.details}` : null,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

export { PRIMARY_WHATSAPP, WHATSAPP_NUMBERS };
