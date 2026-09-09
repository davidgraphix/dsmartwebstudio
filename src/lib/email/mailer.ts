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

export function readMailConfig(): MailConfig | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  if (!host || !user || !password) return null;

  const port = Number(process.env.SMTP_PORT || 587);

  return {
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    user,
    password,
    from: process.env.MAIL_FROM || `DSmart Web Studio <${user}>`,
    to: process.env.MAIL_TO || "dsmartwebstudio@gmail.com",
  };
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
