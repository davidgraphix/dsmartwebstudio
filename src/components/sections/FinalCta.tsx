import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SITE, WHATSAPP_NUMBERS } from "@/data/site";

export function FinalCta() {
  return (
    <Section tone="navy" id="contact" spacing="lg" aria-labelledby="contact-title">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(255,208,20,0.14)_0%,transparent_60%)]"
        aria-hidden="true"
      />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow tone="light" className="justify-center">
              Start here
            </Eyebrow>
            <h2 id="contact-title" className="display-2 mt-6 text-white uppercase">
              Your next digital product <span className="text-gold">starts here.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-lg">
              Tell us what you’re building. We’ll help you turn the idea into a digital product
              built to perform.
            </p>
          </Reveal>

          <Reveal className="mt-10" delay={0.08}>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <QuoteButton source="final-cta" variant="gold" size="lg" arrow className="sm:min-w-[210px]">
                Request a Quote
              </QuoteButton>
              <WhatsAppButton source="final-cta" size="lg" />
            </div>
          </Reveal>

          <Reveal className="mt-14" delay={0.12}>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-white/12 bg-white/12 sm:grid-cols-2">
              <a
                href={`mailto:${SITE.email}`}
                className="group flex items-center gap-4 bg-navy p-6 text-left transition-colors hover:bg-navy-800"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                  <Icon name="mail" size={19} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10.5px] font-bold tracking-[0.16em] text-white/45 uppercase">
                    Email
                  </span>
                  <span className="mt-1 block truncate text-[14.5px] font-semibold text-white">
                    {SITE.email}
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4 bg-navy p-6 text-left">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-gold">
                  <Icon name="whatsapp" size={19} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10.5px] font-bold tracking-[0.16em] text-white/45 uppercase">
                    WhatsApp
                  </span>
                  <span className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
                    {WHATSAPP_NUMBERS.map((number) => (
                      <a
                        key={number.e164}
                        href={`https://wa.me/${number.e164}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14.5px] font-semibold text-white transition-colors hover:text-gold"
                      >
                        {number.label}
                      </a>
                    ))}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
