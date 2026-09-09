"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { FAQS } from "@/data/content";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <Section tone="light" id="faq" spacing="md" aria-labelledby="faq-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:gap-20">
          <SectionHeading
            id="faq-title"
            eyebrow="Questions"
            title="Before you ask."
            intro="The things clients want to know before starting a project."
          />

          <RevealGroup className="divide-y divide-line border-y border-line" stagger={0.05}>
            {FAQS.map((faq, index) => {
              const isOpen = open === index;
              return (
                <RevealItem key={faq.q}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-trigger-${index}`}
                      className="flex w-full items-start justify-between gap-5 py-5 text-left"
                    >
                      <span
                        className={cn(
                          "font-display text-[16px] font-bold tracking-[-0.01em] transition-colors sm:text-[17px]",
                          isOpen ? "text-navy" : "text-ink",
                        )}
                      >
                        {faq.q}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full transition-all duration-300",
                          isOpen ? "rotate-180 bg-navy text-white" : "bg-navy/6 text-navy",
                        )}
                      >
                        <Icon name="chevron-down" size={14} />
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-panel-${index}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${index}`}
                        initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pr-10 pb-6 text-[14.5px] leading-relaxed text-ink/60">
                          {faq.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
