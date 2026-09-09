import { escapeHtml } from "@/lib/utils";
import { SITE } from "@/data/site";

export type QuoteEmailData = {
  name: string;
  business?: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  budget?: string;
  timeline?: string;
  details: string;
  submittedAt: Date;
  meta?: { referer?: string; ip?: string };
};

const NAVY = "#02167F";
const GOLD = "#FFD014";
const INK = "#04061A";

function row(label: string, value?: string): string {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #e6eaf5;font:600 12px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6b7392;width:38%;vertical-align:top;">${escapeHtml(
        label,
      )}</td>
      <td style="padding:14px 20px;border-bottom:1px solid #e6eaf5;font:500 15px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${INK};">${escapeHtml(
        value,
      )}</td>
    </tr>`;
}

export function quoteEmailSubject(data: QuoteEmailData): string {
  const who = data.business?.trim() || data.name;
  return `New Project Inquiry — ${data.service} — ${who}`;
}

export function quoteEmailHtml(data: QuoteEmailData): string {
  const timestamp = data.submittedAt.toLocaleString("en-NG", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Africa/Lagos",
  });

  const details = escapeHtml(data.details).replace(/\n/g, "<br />");
  const waNumber = data.phone.replace(/[^\d]/g, "");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>New Project Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#eef1f8;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(
    data.service,
  )} inquiry from ${escapeHtml(data.name)} — ${escapeHtml(data.budget || "budget not specified")}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef1f8;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 18px 46px rgba(2,22,127,.12);">

        <tr>
          <td style="background:${NAVY};padding:30px 28px;">
            <p style="margin:0 0 10px;font:700 11px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:${GOLD};">DSmart Web Studio</p>
            <h1 style="margin:0;font:800 26px/1.15 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#ffffff;letter-spacing:-.02em;">New Project Inquiry</h1>
            <p style="margin:10px 0 0;font:400 13px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:rgba(255,255,255,.72);">${escapeHtml(
              timestamp,
            )} (WAT)</p>
          </td>
        </tr>

        <tr>
          <td style="padding:22px 28px 6px;">
            <span style="display:inline-block;background:${GOLD};color:${INK};font:700 11px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;padding:9px 14px;border-radius:999px;">${escapeHtml(
              data.service,
            )}</span>
          </td>
        </tr>

        <tr>
          <td style="padding:14px 8px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${row("Name", data.name)}
              ${row("Business", data.business)}
              ${row("Email", data.email)}
              ${row("Phone / WhatsApp", data.phone)}
              ${row("Country", data.country)}
              ${row("Service", data.service)}
              ${row("Budget", data.budget)}
              ${row("Timeline", data.timeline)}
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 28px 6px;">
            <p style="margin:0 0 10px;font:600 12px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6b7392;">Project description</p>
            <div style="background:#f5f7fc;border-left:3px solid ${GOLD};border-radius:0 12px 12px 0;padding:16px 18px;font:400 15px/1.7 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${INK};">${details}</div>
          </td>
        </tr>

        <tr>
          <td style="padding:24px 28px 28px;">
            <a href="mailto:${escapeHtml(
              data.email,
            )}" style="display:inline-block;background:${NAVY};color:#ffffff;text-decoration:none;font:700 14px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:15px 22px;border-radius:10px;margin-right:8px;">Reply by email</a>
            <a href="https://wa.me/${waNumber}" style="display:inline-block;background:${GOLD};color:${INK};text-decoration:none;font:700 14px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:15px 22px;border-radius:10px;">Message on WhatsApp</a>
          </td>
        </tr>

        <tr>
          <td style="background:#f5f7fc;padding:18px 28px;border-top:1px solid #e6eaf5;">
            <p style="margin:0;font:400 12px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#6b7392;">
              Sent from the quote form on ${escapeHtml(SITE.url)}${
                data.meta?.referer ? ` · ${escapeHtml(data.meta.referer)}` : ""
              }
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export function quoteEmailText(data: QuoteEmailData): string {
  return [
    "NEW PROJECT INQUIRY",
    "",
    `Name: ${data.name}`,
    `Business: ${data.business || "—"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Country: ${data.country}`,
    `Service: ${data.service}`,
    `Budget: ${data.budget || "—"}`,
    `Timeline: ${data.timeline || "—"}`,
    "",
    "Project description:",
    data.details,
    "",
    `Submitted: ${data.submittedAt.toISOString()}`,
    `Source: ${SITE.url}`,
  ].join("\n");
}

/** Short summary suitable for a WhatsApp Cloud API notification body. */
export function quoteNotificationText(data: QuoteEmailData): string {
  return [
    `New project inquiry — ${data.service}`,
    `${data.name}${data.business ? ` (${data.business})` : ""}`,
    `${data.email} · ${data.phone} · ${data.country}`,
    data.budget ? `Budget: ${data.budget}` : null,
    data.timeline ? `Timeline: ${data.timeline}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}
