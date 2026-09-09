import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SEO_CHECKLIST } from "@/data/content";
import { SearchConsolePanel, SearchResultCard } from "@/components/visuals/SearchPreview";
import { QuoteButton } from "@/components/ui/QuoteButton";

export function SeoSection() {
  return (
    <Section tone="mist" id="seo" aria-labelledby="seo-title">
      <div className="grid-lines-light pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <SectionHeading
              id="seo-title"
              eyebrow="Search visibility"
              title={
                <>
                  Be found. Be trusted. <span className="text-navy">Get more customers.</span>
                </>
              }
              intro="SEO is a development decision, not a service we bolt on afterwards. Structure, metadata, speed and indexing are handled while the product is being built."
            />

            <RevealGroup className="mt-10 grid gap-x-5 gap-y-3 sm:grid-cols-2" stagger={0.04}>
              {SEO_CHECKLIST.map((item) => (
                <RevealItem key={item}>
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy text-white">
                      <Icon name="check" size={11} />
                    </span>
                    <span className="text-[14px] font-medium text-ink/75">{item}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal className="mt-9" delay={0.05}>
              <div className="rounded-xl border border-navy/12 bg-white p-4 sm:p-5">
                <p className="flex items-start gap-2.5 text-[13px] leading-relaxed text-ink/55">
                  <Icon name="shield" size={15} className="mt-0.5 shrink-0 text-navy" />
                  <span>
                    We build and optimize sites to improve search visibility. No agency can
                    guarantee a Google ranking, and we won’t pretend otherwise.
                  </span>
                </p>
              </div>
            </Reveal>

            <Reveal className="mt-8" delay={0.08}>
              <QuoteButton source="seo-section" service="SEO" variant="primary" size="lg" arrow>
                Get an SEO-Ready Website
              </QuoteButton>
            </Reveal>
          </div>

          <Reveal className="space-y-5 lg:sticky lg:top-28" delay={0.1} y={30}>
            <SearchResultCard />
            <SearchConsolePanel />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
