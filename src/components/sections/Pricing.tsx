"use client";

import { useEffect, useRef } from "react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PriceSkeleton } from "@/components/ui/Skeleton";
import { CurrencySelector } from "@/components/pricing/CurrencySelector";
import { PRICING_INCLUDED, PRICING_TIERS } from "@/data/pricing";
import { useCurrency } from "@/providers/CurrencyProvider";
import { useQuote } from "@/providers/QuoteProvider";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Pricing() {
  const { format, currency, isBase, ready } = useCurrency();
  const { openQuote } = useQuote();
  const seen = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fires once when the pricing section actually enters the viewport.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !seen.current) {
          seen.current = true;
          track("pricing_viewed", { currency });
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [currency]);

  return (
    <Section tone="mist" id="pricing" aria-labelledby="pricing-title">
      <Container>
        <div ref={sectionRef}>
          <SectionHeading
            id="pricing-title"
            eyebrow="Investment"
            title="Clear pricing. No surprises."
            intro="Every project is quoted properly, but here is where things realistically start."
            action={<CurrencySelector />}
          />
        </div>

        <RevealGroup className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <RevealItem key={tier.id}>
              <article
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-300 sm:p-8",
                  tier.featured
                    ? "border-navy bg-navy text-white shadow-[0_34px_80px_-36px_rgba(2,22,127,0.85)] lg:-translate-y-3"
                    : "border-line bg-white hover:-translate-y-1 hover:border-navy/25 hover:shadow-[0_24px_60px_-34px_rgba(2,22,127,0.4)]",
                )}
              >
                {tier.featured ? (
                  <>
                    <span
                      className="pointer-events-none absolute -top-20 -right-16 h-52 w-52 rounded-full bg-gold/15 blur-3xl"
                      aria-hidden="true"
                    />
                    <span className="absolute top-6 right-6 rounded-full bg-gold px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-ink uppercase">
                      Most chosen
                    </span>
                  </>
                ) : null}

                <div className="relative">
                  <h3
                    className={cn(
                      "font-display text-[13px] font-bold tracking-[0.14em] uppercase",
                      tier.featured ? "text-gold" : "text-navy",
                    )}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-[14.5px]",
                      tier.featured ? "text-white/65" : "text-ink/55",
                    )}
                  >
                    {tier.tagline}
                  </p>

                  <div className="mt-7 min-h-[76px]">
                    {tier.basePriceNGN === null ? (
                      <p
                        className={cn(
                          "font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl",
                          tier.featured ? "text-white" : "text-ink",
                        )}
                      >
                        {tier.priceLabel}
                      </p>
                    ) : !ready ? (
                      <PriceSkeleton />
                    ) : (
                      <>
                        <p
                          className={cn(
                            "text-[11px] font-bold tracking-[0.16em] uppercase",
                            tier.featured ? "text-white/45" : "text-ink/40",
                          )}
                        >
                          Starting from
                        </p>
                        <p
                          className={cn(
                            "mt-1 font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl",
                            tier.featured ? "text-white" : "text-ink",
                          )}
                        >
                          {format(tier.basePriceNGN)}
                        </p>
                        {!isBase ? (
                          <p
                            className={cn(
                              "mt-1 text-[11.5px]",
                              tier.featured ? "text-white/45" : "text-ink/40",
                            )}
                          >
                            Approximate conversion from ₦
                            {tier.basePriceNGN.toLocaleString("en-US")}
                          </p>
                        ) : null}
                      </>
                    )}
                  </div>

                  <p
                    className={cn(
                      "mt-4 border-t pt-5 text-[14px] leading-relaxed",
                      tier.featured ? "border-white/12 text-white/70" : "border-line text-ink/60",
                    )}
                  >
                    {tier.description}
                  </p>

                  <ul className="mt-6 space-y-2.5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Icon
                          name="check"
                          size={14}
                          className={cn("mt-0.5 shrink-0", tier.featured ? "text-gold" : "text-navy")}
                        />
                        <span
                          className={cn(
                            "text-[13.5px]",
                            tier.featured ? "text-white/75" : "text-ink/65",
                          )}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-auto pt-8">
                  <p
                    className={cn(
                      "mb-4 text-[12px]",
                      tier.featured ? "text-white/45" : "text-ink/40",
                    )}
                  >
                    {tier.timeline}
                  </p>
                  <Button
                    variant={tier.featured ? "gold" : "primary"}
                    size="lg"
                    fullWidth
                    arrow
                    onClick={() =>
                      openQuote({ service: tier.quoteService, source: `pricing-${tier.id}` })
                    }
                  >
                    {tier.ctaLabel}
                  </Button>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10" delay={0.05}>
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <p className="text-[11px] font-bold tracking-[0.18em] text-ink/40 uppercase">
              Included with every project
            </p>
            <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {PRICING_INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <Icon name="check" size={14} className="shrink-0 text-navy" />
                  <span className="text-[13.5px] text-ink/65">{item}</span>
                </li>
              ))}
            </ul>
            {!isBase ? (
              <p className="mt-6 flex items-start gap-2 border-t border-line pt-5 text-[12.5px] text-ink/45">
                <Icon name="globe" size={14} className="mt-0.5 shrink-0 text-navy/60" />
                Prices are set in Nigerian naira. Amounts shown in {currency} are an approximate
                conversion and are confirmed in your quote.
              </p>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
