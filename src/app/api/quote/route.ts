import { NextResponse } from "next/server";
import { FIELD_MESSAGES, quoteSchema, sanitize } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import {
  isMailConfigured,
  missingMailVars,
  quoteEmailHtml,
  quoteEmailSubject,
  quoteEmailText,
  quoteNotificationText,
  sendMail,
  type QuoteEmailData,
} from "@/lib/email";
import { isWhatsAppApiConfigured, sendWhatsAppNotification } from "@/lib/whatsapp/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;

type QuoteResponse = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
  channels?: { email: boolean; whatsapp: boolean };
};

function fail(status: number, body: QuoteResponse, extraHeaders?: HeadersInit) {
  return NextResponse.json(body, { status, headers: extraHeaders });
}

export async function POST(request: Request): Promise<NextResponse<QuoteResponse>> {
  // --- rate limiting -------------------------------------------------------
  const ip = clientIp(request.headers);
  const limit = rateLimit(`quote:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limit.allowed) {
    return fail(
      429,
      {
        ok: false,
        message: "Too many requests. Please try again shortly, or message us on WhatsApp.",
      },
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  // --- body parsing --------------------------------------------------------
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return fail(413, { ok: false, message: "That request was too large." });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return fail(400, { ok: false, message: "Invalid request format." });
  }

  // Honeypot: a filled hidden field means a bot. Answer as though it worked so
  // the crawler learns nothing, and never touch the mail transport.
  if (
    typeof payload === "object" &&
    payload !== null &&
    typeof (payload as { company_website?: unknown }).company_website === "string" &&
    (payload as { company_website: string }).company_website.length > 0
  ) {
    return NextResponse.json({ ok: true, message: "Request received." });
  }

  // --- validation (server-side, never trusting the client) -----------------
  const parsed = quoteSchema.safeParse(payload);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = FIELD_MESSAGES[key] ?? issue.message;
    }
    return fail(422, {
      ok: false,
      message: "Please check the highlighted fields.",
      errors,
    });
  }

  const input = parsed.data;

  const data: QuoteEmailData = {
    name: sanitize(input.name),
    business: input.business ? sanitize(input.business) : undefined,
    email: sanitize(input.email).toLowerCase(),
    phone: sanitize(input.phone),
    country: sanitize(input.country),
    service: sanitize(input.service),
    budget: input.budget ? sanitize(input.budget) : undefined,
    timeline: input.timeline ? sanitize(input.timeline) : undefined,
    details: sanitize(input.details),
    submittedAt: new Date(),
    meta: { referer: request.headers.get("referer") || undefined, ip },
  };

  // --- delivery ------------------------------------------------------------
  const mailResult = await sendMail({
    subject: quoteEmailSubject(data),
    html: quoteEmailHtml(data),
    text: quoteEmailText(data),
    replyTo: data.email,
  });

  // Optional: real WhatsApp Business API notification when credentials exist.
  const whatsappResult = isWhatsAppApiConfigured()
    ? await sendWhatsAppNotification(quoteNotificationText(data), [
        data.name,
        data.service,
        data.phone,
      ])
    : ({ delivered: false, reason: "not-configured" } as const);

  if (!mailResult.sent) {
    if (mailResult.reason === "not-configured") {
      console.error(
        "[quote] SMTP is not configured — inquiry could not be emailed. Missing:",
        missingMailVars().join(", ") || "(none reported)",
      );
    } else {
      console.error("[quote] Mail delivery failed:", mailResult.error);
    }

    // Never lose the lead: log a structured record for recovery.
    console.info(
      "[quote] Unsent inquiry:",
      JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service,
        submittedAt: data.submittedAt.toISOString(),
      }),
    );

    if (!whatsappResult.delivered) {
      return fail(502, {
        ok: false,
        message:
          "We could not send your request automatically. Please continue on WhatsApp and we will pick it up right away.",
      });
    }
  }

  return NextResponse.json({
    ok: true,
    message: "Request received.",
    channels: { email: mailResult.sent, whatsapp: whatsappResult.delivered },
  });
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { ok: true, configured: { email: isMailConfigured(), whatsapp: isWhatsAppApiConfigured() } },
    { status: 200 },
  );
}
