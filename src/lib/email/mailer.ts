import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

/**
 * Nodemailer transport.
 *
 * Credentials are read from server-only environment variables and are never
 * bundled into the client. A missing configuration is reported rather than
 * silently swallowed, so the API route can respond honestly.
 */

export type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  from: string;
  to: string;
};

let cached: Transporter | null = null;

const REQUIRED_VARS = ["SMTP_HOST", "SMTP_USER", "SMTP_PASSWORD"] as const;

/** Names the variables that still need setting, for a clear server-side error. */
export function missingMailVars(): string[] {
  return REQUIRED_VARS.filter((name) => !process.env[name]?.trim());
}

export function readMailConfig(): MailConfig | null {
  if (missingMailVars().length > 0) return null;

  const host = process.env.SMTP_HOST!.trim();
  const user = process.env.SMTP_USER!.trim();

  // Google shows an app password as four groups of four characters. Pasted
  // straight from that screen it carries spaces, which Gmail then rejects at
  // AUTH — so strip all whitespace rather than fail on a copy-paste artefact.
  const password = process.env.SMTP_PASSWORD!.replace(/\s+/g, "");

  const port = Number(process.env.SMTP_PORT || 587);

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    user,
    password,
    from: resolveFrom(user),
    to: (process.env.MAIL_TO || "dsmartwebstudio@gmail.com").trim(),
  };
}

/**
 * Gmail only accepts a From address that matches the authenticated account or
 * one of its verified aliases. Anything else is rejected outright or silently
 * rewritten, so a mismatched MAIL_FROM is ignored in favour of the account
 * that actually holds the app password.
 */
function resolveFrom(user: string): string {
  const configured = process.env.MAIL_FROM?.trim();
  if (!configured) return `DSmart Web Studio <${user}>`;

  const address = configured.match(/<([^>]+)>/)?.[1] ?? configured;
  if (address.trim().toLowerCase() === user.toLowerCase()) return configured;

  console.warn(
    `[mail] MAIL_FROM (${address}) does not match SMTP_USER, which Gmail will reject. ` +
      `Sending as the authenticated account instead.`,
  );
  return `DSmart Web Studio <${user}>`;
}

export function isMailConfigured(): boolean {
  return readMailConfig() !== null;
}

export function getTransport(config: MailConfig): Transporter {
  if (cached) return cached;
  cached = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.password },
    pool: true,
    maxConnections: 2,
  });
  return cached;
}

export type SendMailResult =
  | { sent: true; messageId?: string }
  | { sent: false; reason: "not-configured" | "send-failed"; error?: string };

export async function sendMail(options: {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<SendMailResult> {
  const config = readMailConfig();
  if (!config) return { sent: false, reason: "not-configured" };

  try {
    const info = await getTransport(config).sendMail({
      from: config.from,
      to: config.to,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    return { sent: true, messageId: info.messageId };
  } catch (error) {
    return {
      sent: false,
      reason: "send-failed",
      error: error instanceof Error ? error.message : "Unknown mail error",
    };
  }
}
