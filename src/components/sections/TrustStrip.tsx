import { Container, Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Heading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TRUST_POINTS } from "@/data/content";

export function TrustStrip() {
  return (
    <Section tone="light" spacing="sm" className="border-b border-line" aria-labelledby="trust-title">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
          <div className="lg:w-64 lg:shrink-0">
            <Eyebrow className="mb-4">Standard, not extra</Eyebrow>
            <h2 id="trust-title" className="display-3 text-ink uppercase">
              We build for results
            </h2>
          </div>

          <RevealGroup className="grid flex-1 gap-x-6 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
            {TRUST_POINTS.map((point) => (
              <RevealItem key={point.title}>
                <div className="group flex items-start gap-3.5">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-navy/6 text-navy transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                    <Icon name={point.icon as IconName} size={17} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[14.5px] leading-snug font-semibold text-ink">{point.title}</p>
                    <p className="mt-0.5 text-[13px] text-ink/50">{point.detail}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
