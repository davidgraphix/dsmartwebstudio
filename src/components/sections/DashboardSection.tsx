import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { BrowserFrame } from "@/components/visuals/Frames";
import { DashboardPreview } from "@/components/visuals/DashboardPreview";
import { DASHBOARD_CAPABILITIES } from "@/data/content";
import { QuoteButton } from "@/components/ui/QuoteButton";

export function DashboardSection() {
  return (
    <Section tone="dark" id="dashboards" aria-labelledby="dashboard-title">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_55%_at_15%_100%,rgba(2,22,127,0.75)_0%,transparent_60%)]"
        aria-hidden="true"
      />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <Container>
        <SectionHeading
          id="dashboard-title"
          tone="light"
          eyebrow="Business systems"
          title={
            <>
              Your business shouldn’t need a developer{" "}
              <span className="text-gold">for every update.</span>
            </>
          }
          intro="We build custom admin dashboards so your team can run the day-to-day without opening a code editor or waiting on us."
        />

        <Reveal className="mt-14" y={30}>
          <BrowserFrame url="admin.yourbusiness.com/overview" className="mx-auto max-w-5xl">
            <DashboardPreview />
          </BrowserFrame>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] text-gold uppercase">
              Manage everything in one place
            </p>
            <RevealGroup className="mt-6 flex flex-wrap gap-2" stagger={0.035}>
              {DASHBOARD_CAPABILITIES.map((item) => (
                <RevealItem key={item}>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-3.5 py-2 text-[13px] font-medium text-white/80 transition-colors hover:border-gold/50 hover:text-white">
                    <Icon name="check" size={12} className="text-gold" />
                    {item}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-6 sm:p-8">
              <h3 className="font-display text-xl font-extrabold text-white">
                Built around how you actually work
              </h3>
              <ul className="mt-5 space-y-3.5">
                {[
                  "Role-based access for your team",
                  "Live metrics instead of guesswork",
                  "Exports and reports you can share",
                  "Notifications when something needs attention",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Icon name="check" size={14} className="mt-0.5 shrink-0 text-gold" />
                    <span className="text-[14px] text-white/65">{item}</span>
                  </li>
                ))}
              </ul>
              <QuoteButton
                source="dashboard-section"
                service="Admin Dashboard"
                variant="gold"
                size="lg"
                arrow
                fullWidth
                className="mt-7"
              >
                Build My Business System
              </QuoteButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
