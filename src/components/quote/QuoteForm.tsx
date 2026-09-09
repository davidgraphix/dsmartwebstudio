"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { OptionCard, SelectField, TextAreaField, TextField } from "./Field";
import { QUOTE_SERVICE_OPTIONS } from "@/data/services";
import { BUDGET_BANDS, TIMELINE_OPTIONS } from "@/data/pricing";
import { COUNTRIES, currencyForCountry } from "@/lib/currency/config";
import { useCurrency } from "@/providers/CurrencyProvider";
import { track } from "@/lib/analytics";
import { quoteWhatsAppMessage, whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type FormState = {
  service: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  country: string;
  details: string;
  budget: string;
  timeline: string;
  company_website: string;
};

const EMPTY: FormState = {
  service: "",
  name: "",
  business: "",
  email: "",
  phone: "",
  country: "",
  details: "",
  budget: "",
  timeline: "",
  company_website: "",
};

const STEPS = [
  { id: "service", title: "What do you need?", caption: "Pick the closest match." },
  { id: "about", title: "Tell us about your business", caption: "So we know who we’re talking to." },
  { id: "details", title: "Project details", caption: "The more context, the better the quote." },
  { id: "budget", title: "Budget", caption: "A range is enough at this stage." },
  { id: "timeline", title: "Timeline", caption: "When do you want this live?" },
  { id: "review", title: "Review & submit", caption: "One last look before it reaches us." },
] as const;

const SERVICE_HINTS: Record<string, string> = {
  "Business Website": "Credibility and lead generation",
  "E-commerce": "Sell products online",
  "Web Application": "Software in the browser",
  "Mobile App": "iOS and Android",
  "Custom Software": "Built around your workflow",
  "Admin Dashboard": "Manage your operations",
  "UI/UX Design": "Interface and experience design",
  SEO: "Search visibility and Search Console",
  Other: "Tell us in your own words",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+\d][\d\s()+-]{5,29}$/;

/** Client-side gate for each step. The server re-validates everything. */
function validateStep(step: number, form: FormState): Record<string, string> {
  const errors: Record<string, string> = {};

  if (step === 0 && !form.service) {
    errors.service = "Select the service you need.";
  }

  if (step === 1) {
    if (form.name.trim().length < 2) errors.name = "Enter your full name.";
    if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = "Enter a valid email address.";
    if (!PHONE_PATTERN.test(form.phone.trim()))
      errors.phone = "Enter a valid phone or WhatsApp number.";
    if (!form.country) errors.country = "Select your country.";
    if (form.business.trim().length > 120) errors.business = "Business name is too long.";
  }

  if (step === 2 && form.details.trim().length < 20) {
    errors.details = "Tell us a little more — at least 20 characters.";
  }

  if (step === 3 && !form.budget) errors.budget = "Select a budget range.";
  if (step === 4 && !form.timeline) errors.timeline = "Select a timeline.";

  return errors;
}

const FIELD_STEP: Record<string, number> = {
  service: 0,
  name: 1,
  business: 1,
  email: 1,
  phone: 1,
  country: 1,
  details: 2,
  budget: 3,
  timeline: 4,
};

export function QuoteForm({
  presetService,
  onClose,
}: {
  presetService?: string;
  onClose: () => void;
}) {
  const { formatRange, currency, setCurrency, isBase } = useCurrency();
  const reduce = useReducedMotion();

  const [step, setStep] = useState(presetService ? 1 : 0);
  const [form, setForm] = useState<FormState>({ ...EMPTY, service: presetService ?? "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const submitting = useRef(false);

  const budgetOptions = useMemo(
    () =>
      BUDGET_BANDS.map((band) => ({
        id: band.id,
        label: `${formatRange(band.minNGN, band.maxNGN)}${isBase ? "" : ` ${currency}`}`,
      })),
    [formatRange, currency, isBase],
  );

  const update = (key: keyof FormState, value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => {
      if (!previous[key]) return previous;
      const next = { ...previous };
      delete next[key];
      return next;
    });
  };

  const handleCountry = (value: string) => {
    update("country", value);
    const match = COUNTRIES.find((country) => country.name === value);
    // Selecting a country re-bases the budget ranges without a manual override.
    if (match && match.code !== "OTHER") setCurrency(currencyForCountry(match.code), "auto");
  };

  const goNext = () => {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    track("quote_step_completed", { step: STEPS[step].id, service: form.service });
    setStep((current) => Math.min(current + 1, STEPS.length - 1));
  };

  const goBack = () => setStep((current) => Math.max(current - 1, 0));

  const submit = async () => {
    if (submitting.current) return;

    // Re-run every gate before hitting the network.
    for (let index = 0; index < STEPS.length - 1; index += 1) {
      const stepErrors = validateStep(index, form);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        setStep(index);
        return;
      }
    }

    submitting.current = true;
    setStatus("sending");
    setServerMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as {
        ok: boolean;
        message?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
          const firstField = Object.keys(data.errors)[0];
          const target = firstField ? FIELD_STEP[firstField] : undefined;
          if (typeof target === "number") setStep(target);
        }
        setStatus("error");
        setServerMessage(data.message || "Something went wrong. Please try again.");
        return;
      }

      track("quote_submitted", {
        service: form.service,
        budget: form.budget,
        timeline: form.timeline,
        country: form.country,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setServerMessage(
        "We couldn’t reach the server. Check your connection, or continue on WhatsApp.",
      );
    } finally {
      submitting.current = false;
    }
  };

  if (status === "success") {
    return <SuccessState form={form} onClose={onClose} />;
  }

  const progress = ((step + 1) / STEPS.length) * 100;
  const current = STEPS[step];

  return (
    <div className="flex max-h-[90dvh] flex-col sm:max-h-[85dvh]">
      {/* Header */}
      <div className="shrink-0 border-b border-line bg-white px-5 pt-6 pb-5 sm:px-8 sm:pt-7">
        <p className="text-[10.5px] font-bold tracking-[0.18em] text-navy uppercase">
          Request a quote
        </p>
        <h2 id="quote-title" className="mt-2 font-display text-xl font-extrabold text-ink sm:text-2xl">
          {current.title}
        </h2>
        <p className="mt-1 text-[13.5px] text-ink/50">{current.caption}</p>

        <div className="mt-5 flex items-center gap-3">
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy/8"
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-label="Quote progress"
          >
            <motion.div
              className="h-full rounded-full bg-gold"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: reduce ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span className="shrink-0 font-mono text-[11.5px] text-ink/45">
            {step + 1}/{STEPS.length}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="scroll-slim min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: -18 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            {step === 0 ? (
              <fieldset>
                <legend className="sr-only">Service required</legend>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {QUOTE_SERVICE_OPTIONS.map((option) => (
                    <OptionCard
                      key={option}
                      name="service"
                      value={option}
                      label={option}
                      description={SERVICE_HINTS[option]}
                      checked={form.service === option}
                      onChange={(value) => {
                        update("service", value);
                        setErrors({});
                      }}
                    />
                  ))}
                </div>
                {errors.service ? (
                  <p role="alert" className="mt-3 text-[12.5px] text-red-600">
                    {errors.service}
                  </p>
                ) : null}
              </fieldset>
            ) : null}

            {step === 1 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Full name"
                  required
                  autoComplete="name"
                  value={form.name}
                  error={errors.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="Your name"
                />
                <TextField
                  label="Business name"
                  autoComplete="organization"
                  value={form.business}
                  error={errors.business}
                  onChange={(event) => update("business", event.target.value)}
                  placeholder="Company or brand"
                />
                <TextField
                  label="Email"
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  value={form.email}
                  error={errors.email}
                  onChange={(event) => update("email", event.target.value)}
                  placeholder="you@company.com"
                />
                <TextField
                  label="Phone / WhatsApp"
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  error={errors.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  placeholder="08160000000"
                />
                <SelectField
                  label="Country"
                  required
                  className="sm:col-span-2"
                  value={form.country}
                  error={errors.country}
                  onChange={(event) => handleCountry(event.target.value)}
                  options={[
                    { value: "", label: "Select your country" },
                    ...COUNTRIES.map((country) => ({
                      value: country.name,
                      label: country.name,
                    })),
                  ]}
                />
              </div>
            ) : null}

            {step === 2 ? (
              <TextAreaField
                label="Tell us about your project"
                required
                hint={`${form.details.trim().length}/20 min`}
                value={form.details}
                error={errors.details}
                onChange={(event) => update("details", event.target.value)}
                placeholder="What does your business do, what should the product do, and what does success look like?"
              />
            ) : null}

            {step === 3 ? (
              <fieldset>
                <legend className="sr-only">Budget range</legend>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {budgetOptions.map((option) => (
                    <OptionCard
                      key={option.id}
                      name="budget"
                      value={option.label}
                      label={option.label}
                      checked={form.budget === option.label}
                      onChange={(value) => update("budget", value)}
                    />
                  ))}
                </div>
                {!isBase ? (
                  <p className="mt-3 text-[12px] text-ink/45">
                    Ranges are converted from Nigerian naira and are approximate.
                  </p>
                ) : null}
                {errors.budget ? (
                  <p role="alert" className="mt-3 text-[12.5px] text-red-600">
                    {errors.budget}
                  </p>
                ) : null}
              </fieldset>
            ) : null}

            {step === 4 ? (
              <fieldset>
                <legend className="sr-only">Timeline</legend>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {TIMELINE_OPTIONS.map((option) => (
                    <OptionCard
                      key={option}
                      name="timeline"
                      value={option}
                      label={option}
                      checked={form.timeline === option}
                      onChange={(value) => update("timeline", value)}
                    />
                  ))}
                </div>
                {errors.timeline ? (
                  <p role="alert" className="mt-3 text-[12.5px] text-red-600">
                    {errors.timeline}
                  </p>
                ) : null}
              </fieldset>
            ) : null}

            {step === 5 ? (
              <Review form={form} onEdit={(target) => setStep(target)} />
            ) : null}

            {/* Honeypot — hidden from people, tempting to bots. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="company_website">Company website</label>
              <input
                id="company_website"
                name="company_website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company_website}
                onChange={(event) => update("company_website", event.target.value)}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {status === "error" && serverMessage ? (
          <div
            role="alert"
            className="mt-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <Icon name="shield" size={16} className="mt-0.5 shrink-0 text-red-500" />
            <div className="min-w-0">
              <p className="text-[13.5px] font-medium text-red-700">{serverMessage}</p>
              <a
                href={whatsappLink(
                  quoteWhatsAppMessage({
                    name: form.name || "there",
                    business: form.business,
                    service: form.service,
                    budget: form.budget,
                    timeline: form.timeline,
                    details: form.details,
                  }),
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_clicked", { source: "quote-error" })}
                className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-red-700 underline underline-offset-2"
              >
                Send it on WhatsApp instead
                <Icon name="arrow-up-right" size={13} />
              </a>
            </div>
          </div>
        ) : null}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-line bg-mist px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          {step > 0 ? (
            <Button variant="ghost" size="md" onClick={goBack} disabled={status === "sending"}>
              Back
            </Button>
          ) : null}

          <div className="ml-auto flex items-center gap-3">
            {step < STEPS.length - 1 ? (
              <Button variant="primary" size="md" arrow onClick={goNext}>
                Continue
              </Button>
            ) : (
              <Button
                variant="gold"
                size="md"
                arrow={status !== "sending"}
                onClick={submit}
                disabled={status === "sending"}
                aria-busy={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Request My Quote"}
              </Button>
            )}
          </div>
        </div>
        <p className="mt-3 text-[11.5px] text-ink/40">
          We reply by email or WhatsApp. Your details are only used to prepare your quote.
        </p>
      </div>
    </div>
  );
}

function Review({ form, onEdit }: { form: FormState; onEdit: (step: number) => void }) {
  const rows: { label: string; value: string; step: number }[] = [
    { label: "Service", value: form.service, step: 0 },
    { label: "Name", value: form.name, step: 1 },
    { label: "Business", value: form.business || "—", step: 1 },
    { label: "Email", value: form.email, step: 1 },
    { label: "Phone", value: form.phone, step: 1 },
    { label: "Country", value: form.country, step: 1 },
    { label: "Budget", value: form.budget, step: 3 },
    { label: "Timeline", value: form.timeline, step: 4 },
  ];

  return (
    <div className="space-y-5">
      <dl className="overflow-hidden rounded-xl border border-line">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={cn(
              "flex items-center gap-4 px-4 py-3",
              index % 2 === 0 ? "bg-white" : "bg-mist",
            )}
          >
            <dt className="w-24 shrink-0 text-[11.5px] font-bold tracking-[0.1em] text-ink/40 uppercase">
              {row.label}
            </dt>
            <dd className="min-w-0 flex-1 truncate text-[14px] font-medium text-ink">{row.value}</dd>
            <button
              type="button"
              onClick={() => onEdit(row.step)}
              className="shrink-0 text-[12px] font-semibold text-navy underline underline-offset-2 hover:text-navy-600"
            >
              Edit
            </button>
          </div>
        ))}
      </dl>

      <div className="rounded-xl border border-line bg-white p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11.5px] font-bold tracking-[0.1em] text-ink/40 uppercase">
            Project details
          </p>
          <button
            type="button"
            onClick={() => onEdit(2)}
            className="text-[12px] font-semibold text-navy underline underline-offset-2"
          >
            Edit
          </button>
        </div>
        <p className="mt-2 text-[14px] leading-relaxed whitespace-pre-line text-ink/70">
          {form.details}
        </p>
      </div>
    </div>
  );
}

function SuccessState({ form, onClose }: { form: FormState; onClose: () => void }) {
  const message = quoteWhatsAppMessage({
    name: form.name,
    business: form.business,
    service: form.service,
    budget: form.budget,
    timeline: form.timeline,
    details: form.details,
  });

  return (
    <div className="relative overflow-hidden px-6 py-12 text-center sm:px-10 sm:py-14">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(2,22,127,0.08)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-navy text-gold"
      >
        <Icon name="check" size={30} strokeWidth={2.4} />
      </motion.span>

      <h2 id="quote-title" className="relative mt-7 font-display text-2xl font-extrabold text-ink uppercase sm:text-3xl">
        Project request received
      </h2>
      <p className="relative mx-auto mt-4 max-w-md text-[14.5px] leading-relaxed text-ink/60">
        We’ve received your project details. We’ll review everything and get back to you shortly.
      </p>

      <div className="relative mx-auto mt-8 flex max-w-sm flex-col gap-3">
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_clicked", { source: "quote-success" })}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#1FA855] text-[15px] font-bold text-white transition-colors hover:bg-[#25c264]"
        >
          <Icon name="whatsapp" size={19} />
          Continue on WhatsApp
        </a>
        <Button variant="ghost" size="md" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
