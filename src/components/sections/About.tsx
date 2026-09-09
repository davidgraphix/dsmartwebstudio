import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ABOUT_POINTS } from "@/data/content";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Icon } from "@/components/ui/Icon";

export function About() {
  return (
    <Section tone="dark" id="about" aria-labelledby="about-title">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <SectionHeading
              id="about-title"
              tone="light"
              eyebrow="About the studio"
              title={
                <>
                  A studio for businesses that want{" "}
                  <span className="text-gold">the work to pay for itself.</span>
                </>
              }
            />
            <Reveal className="mt-8" delay={0.06}>
              <p className="max-w-lg text-[15px] leading-relaxed text-white/60 sm:text-base">
                DSmart Web Studio designs and builds digital products for businesses, startups,
                organizations and entrepreneurs. We handle design, engineering, SEO and the systems
                that keep a product running after launch.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <QuoteButton source="about" variant="gold" size="lg" arrow>
                  Work With Us
                </QuoteButton>
              </div>
            </Reveal>
          </div>

          <RevealGroup className="space-y-px overflow-hidden rounded-2xl border border-white/10 bg-white/8">
            {ABOUT_POINTS.map((point, index) => (
              <RevealItem key={point.label}>
                <div className="group bg-ink p-6 transition-colors duration-300 hover:bg-navy-950 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-gold/70">0{index + 1}</span>
                    <h3 className="font-display text-[13px] font-bold tracking-[0.14em] text-white uppercase">
                      {point.label}
                    </h3>
                    <Icon
                      name="arrow-right"
                      size={15}
                      className="ml-auto text-white/15 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold"
                    />
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{point.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
