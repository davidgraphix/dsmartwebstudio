import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Heading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/data/content";
import { cn } from "@/lib/utils";

export function Process() {
  return (
    <Section tone="light" id="process" aria-labelledby="process-title">
      <Container>
        <SectionHeading
          id="process-title"
          eyebrow="How we work"
          title="From idea to launch."
          intro="A process you can follow. You always know what stage the project is in and what comes next."
        />

        <RevealGroup className="relative mt-14" stagger={0.06}>
          {/* Timeline spine */}
          <span
            className="absolute top-2 bottom-2 left-[19px] w-px bg-linear-to-b from-navy/25 via-navy/12 to-transparent md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-8 md:space-y-0">
            {PROCESS_STEPS.map((step, index) => {
              const onRight = index % 2 === 1;
              return (
                <RevealItem key={step.number} as="li">
                  <div className="relative flex gap-6 md:grid md:grid-cols-2 md:items-center md:gap-14">
                    <div
                      className={cn(
                        "group md:py-5",
                        onRight
                          ? "md:col-start-2 md:pl-14 md:text-left"
                          : "md:col-start-1 md:pr-14 md:text-right",
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center gap-3",
                          onRight ? "md:justify-start" : "md:justify-end",
                        )}
                      >
                        <span className="font-mono text-[12px] font-medium text-gold-700">
                          {step.number}
                        </span>
                        <h3 className="font-display text-lg font-extrabold tracking-[-0.02em] text-ink uppercase sm:text-xl">
                          {step.title}
                        </h3>
                      </div>
                      <p
                        className={cn(
                          "mt-2.5 max-w-md text-[14.5px] leading-relaxed text-ink/55",
                          onRight ? "md:mr-auto" : "md:ml-auto",
                        )}
                      >
                        {step.body}
                      </p>
                    </div>

                    {/* Timeline node */}
                    <span
                      className="absolute top-1 left-[11px] z-10 grid h-[18px] w-[18px] place-items-center rounded-full border-2 border-navy bg-white md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                      aria-hidden="true"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    </span>
                  </div>
                </RevealItem>
              );
            })}
          </ol>
        </RevealGroup>
      </Container>
    </Section>
  );
}
