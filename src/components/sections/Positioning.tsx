import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { POSITIONING_ROWS } from "@/data/content";
import { QuoteButton } from "@/components/ui/QuoteButton";

const PILLARS = ["Design", "Development", "SEO", "Performance", "Conversion"];

export function Positioning() {
  return (
    <Section tone="mist" id="approach" aria-labelledby="positioning-title">
      <div className="grid-lines-light pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <Container>
        <SectionHeading
          id="positioning-title"
          eyebrow="Positioning"
          title={
            <>
              Your website should do <span className="text-navy">more than look good.</span>
            </>
          }
          intro="A beautiful website means very little if customers can’t find you, trust you or take action. We build digital experiences that combine design, development, SEO, performance and conversion."
        />

        <Reveal className="mt-8" delay={0.05}>
          <div className="flex flex-wrap items-center gap-2">
            {PILLARS.map((pillar, index) => (
              <span key={pillar} className="flex items-center gap-2">
                {index > 0 ? (
                  <Icon name="plus" size={12} className="text-navy/35" aria-hidden="true" />
                ) : null}
                <span className="rounded-full border border-navy/12 bg-white px-3.5 py-1.5 text-[12px] font-semibold text-navy">
                  {pillar}
                </span>
              </span>
            ))}
          </div>
        </Reveal>

        {/* Comparison */}
        <div className="mt-14 grid gap-4 lg:grid-cols-2 lg:gap-6">
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-white/70 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-ink/5 text-ink/35">
                  <Icon name="browser" size={17} />
                </span>
                <h3 className="font-display text-[13px] font-bold tracking-[0.14em] text-ink/45 uppercase">
                  Just a website
                </h3>
              </div>
              <ul className="mt-6 space-y-0">
                {POSITIONING_ROWS.map((row) => (
                  <li
                    key={row.basic}
                    className="flex items-center gap-3 border-b border-line py-3.5 last:border-0"
                  >
                    <Icon name="minus" size={14} className="shrink-0 text-ink/25" />
                    <span className="text-[14.5px] text-ink/50">{row.basic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-2xl bg-navy p-6 text-white shadow-[0_30px_70px_-30px_rgba(2,22,127,0.8)] sm:p-8">
              <div
                className="pointer-events-none absolute -top-16 -right-16 h-52 w-52 rounded-full bg-gold/12 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-ink">
                  <Icon name="growth" size={17} />
                </span>
                <h3 className="font-display text-[13px] font-bold tracking-[0.14em] text-gold uppercase">
                  A business growth engine
                </h3>
              </div>
              <RevealGroup className="relative mt-6" stagger={0.05}>
                {POSITIONING_ROWS.map((row) => (
                  <RevealItem key={row.better}>
                    <div className="flex items-center gap-3 border-b border-white/10 py-3.5 last:border-0">
                      <Icon name="check" size={14} className="shrink-0 text-gold" />
                      <span className="text-[14.5px] font-medium text-white">{row.better}</span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10" delay={0.08}>
          <QuoteButton source="positioning" variant="primary" size="lg" arrow>
            Build the second one
          </QuoteButton>
        </Reveal>
      </Container>
    </Section>
  );
}
