import "server-only";

/**
 * Server-side WhatsApp notification abstraction.
 *
 * The site ships with click-to-chat only. This module is the seam where an
 * official provider (Meta WhatsApp Cloud API) is enabled later without
 * touching the API route or any component: set the environment variables and
 * `isWhatsAppApiConfigured()` starts returning true.
 *
 * It never falls back to a wa.me link and pretends a notification was sent —
 * an unconfigured provider returns `{ delivered: false, reason: ... }`.
 */

export type WhatsAppNotifyResult =
  | { delivered: true; provider: "meta-cloud-api"; messageId?: string }
  | { delivered: false; reason: "not-configured" | "provider-error"; error?: string };

type CloudApiConfig = {
  phoneNumberId: string;
  accessToken: string;
  recipients: string[];
  templateName?: string;
  templateLanguage: string;
  apiVersion: string;
};

function readConfig(): CloudApiConfig | null {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const recipients = (process.env.WHATSAPP_NOTIFY_TO || "")
    .split(",")
    .map((value) => value.trim().replace(/[^\d]/g, ""))
    .filter(Boolean);

  if (!phoneNumberId || !accessToken || recipients.length === 0) return null;

  return {
    phoneNumberId,
    accessToken,
    recipients,
    templateName: process.env.WHATSAPP_TEMPLATE_NAME,
    templateLanguage: process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en_US",
    apiVersion: process.env.WHATSAPP_API_VERSION || "v21.0",
  };
}

export function isWhatsAppApiConfigured(): boolean {
  return readConfig() !== null;
}

/**
 * Sends a notification to the business numbers through the Cloud API.
 * Templates are used when configured (required outside the 24-hour window);
 * otherwise a plain text message is attempted.
 */
export async function sendWhatsAppNotification(
  body: string,
  variables: string[] = [],
): Promise<WhatsAppNotifyResult> {
  const config = readConfig();
  if (!config) return { delivered: false, reason: "not-configured" };

  const endpoint = `https://graph.facebook.com/${config.apiVersion}/${config.phoneNumberId}/messages`;

  try {
    let lastId: string | undefined;

    for (const recipient of config.recipients) {
      const payload = config.templateName
        ? {
            messaging_product: "whatsapp",
            to: recipient,
            type: "template",
            template: {
              name: config.templateName,
              language: { code: config.templateLanguage },
              components: variables.length
                ? [
                    {
                      type: "body",
                      parameters: variables.map((text) => ({ type: "text", text })),
                    },
                  ]
                : undefined,
            },
          }
        : {
            messaging_product: "whatsapp",
            to: recipient,
            type: "text",
            text: { preview_url: false, body },
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        const detail = await response.text();
        return {
          delivered: false,
          reason: "provider-error",
          error: `HTTP ${response.status}: ${detail.slice(0, 200)}`,
        };
      }

      const data = (await response.json()) as { messages?: { id: string }[] };
      lastId = data.messages?.[0]?.id;
    }

    return { delivered: true, provider: "meta-cloud-api", messageId: lastId };
  } catch (error) {
    return {
      delivered: false,
      reason: "provider-error",
      error: error instanceof Error ? error.message : "Unknown provider error",
    };
  }
}
