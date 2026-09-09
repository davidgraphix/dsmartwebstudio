"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Heading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/data/services";
import { useQuote } from "@/providers/QuoteProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Quote-form service name for each catalogue entry. */
const QUOTE_MAP: Record<string, string> = {
  "business-websites": "Business Website",
  ecommerce: "E-commerce",
  "web-applications": "Web Application",
  "mobile-apps": "Mobile App",
  "custom-software": "Custom Software",
  "admin-dashboards": "Admin Dashboard",
  seo: "SEO",
  "ui-ux": "UI/UX Design",
};

export function Services() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { openQuote } = useQuote();
  const reduce = useReducedMotion();

  return (
    <Section tone="dark" id="services" aria-labelledby="services-title">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />

      <Container>
        <SectionHeading
          id="services-title"
          tone="light"
          eyebrow="Capabilities"
          title="What we build"
          intro="Eight service lines that cover the whole life of a digital product — from the first wireframe to the search visibility that keeps it earning."
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => {
            const isOpen = expanded === service.id;
            return (
              <RevealItem key={service.id}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col bg-ink p-6 transition-colors duration-300",
                    isOpen ? "bg-navy-950" : "hover:bg-navy-950",
                  )}
                >
                  <span
                    className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-400 ease-out group-hover:scale-x-100"
                    aria-hidden="true"
                  />

                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/6 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-ink">
                      <Icon name={service.icon as IconName} size={20} />
                    </span>
                    <span className="font-mono text-[11px] text-white/25">{service.number}</span>
                  </div>

                  <h3 className="mt-5 font-display text-[17px] leading-tight font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/50">
                    {service.summary}
                  </p>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.ul
                        initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                          {service.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <Icon name="check" size={13} className="mt-0.5 shrink-0 text-gold" />
                              <span className="text-[12.5px] text-white/65">{item}</span>
                            </li>
                          ))}
                        </div>
                      </motion.ul>
                    ) : null}
                  </AnimatePresence>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : service.id)}
                      aria-expanded={isOpen}
                      className="-my-2 inline-flex items-center gap-1.5 rounded-md py-2 text-[12px] font-semibold text-white/45 transition-colors hover:text-gold"
                    >
                      {isOpen ? "Show less" : "What's included"}
                      <Icon
                        name={isOpen ? "minus" : "plus"}
                        size={13}
                        className="transition-transform duration-300"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openQuote({ service: QUOTE_MAP[service.id], source: `service-${service.id}` })
                      }
                      aria-label={`Request a quote for ${service.title}`}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-white/12 text-white/45 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink"
                    >
                      <Icon name="arrow-up-right" size={16} />
                    </button>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-12" delay={0.05}>
          <div className="flex flex-col items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-display text-lg font-bold text-white sm:text-xl">
                Not sure which one you need?
              </p>
              <p className="mt-1.5 text-[14px] text-white/55">
                Tell us the business problem. We’ll recommend the right build.
              </p>
            </div>
            <Button
              variant="gold"
              size="lg"
              arrow
              onClick={() => openQuote({ source: "services-cta" })}
              className="w-full shrink-0 sm:w-auto"
            >
              Discuss Your Project
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
