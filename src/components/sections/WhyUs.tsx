import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Heading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { DIFFERENTIATORS, STUDIO_FACTS } from "@/data/content";

export function WhyUs() {
  return (
    <Section tone="dark" id="why" aria-labelledby="why-title">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_0%,rgba(2,22,127,0.7)_0%,transparent_65%)]"
        aria-hidden="true"
      />

      <Container>
        <SectionHeading
          id="why-title"
          tone="light"
          eyebrow="Why DSmart Web Studio"
          title={
            <>
              We don’t just build it. We think about{" "}
              <span className="text-gold">what happens after launch.</span>
            </>
          }
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIATORS.map((item) => (
            <RevealItem key={item.number}>
              <div className="group relative h-full bg-ink p-7 transition-colors duration-300 hover:bg-navy-950 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-gold/70">{item.number}</span>
                  <Icon
                    name={item.icon as IconName}
                    size={20}
                    className="text-white/25 transition-colors duration-300 group-hover:text-gold"
                  />
                </div>
                <h3 className="mt-6 font-display text-lg font-extrabold tracking-[-0.02em] text-white uppercase">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/55">{item.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-12 grid gap-x-6 gap-y-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {STUDIO_FACTS.map((fact) => (
            <RevealItem key={fact.label}>
              <div>
                <p className="font-display text-3xl font-extrabold tracking-[-0.04em] text-gold sm:text-4xl">
                  {fact.value}
                </p>
                <p className="mt-2 text-[14px] font-semibold text-white">{fact.label}</p>
                <p className="mt-1 text-[12.5px] text-white/45">{fact.detail}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}
