import Link from "next/link";
import type { ReactNode } from "react";
import { Container, Section } from "@/components/ui/Section";

/** Shared shell for the privacy and terms pages. */
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <Section tone="dark" spacing="none" className="pt-32 pb-14 sm:pt-40 sm:pb-16">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-[12.5px] text-white/45">
              <li>
                <Link href="/" className="transition-colors hover:text-gold">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/75">{title}</li>
            </ol>
          </nav>
          <h1 className="display-3 text-white uppercase">{title}</h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60">{intro}</p>
          <p className="mt-4 text-[12.5px] text-white/35">Last updated: {updated}</p>
        </Container>
      </Section>

      <Section tone="light" spacing="md">
        <Container>
          <div className="max-w-3xl space-y-10 [&_h2]:font-display [&_h2]:text-[13px] [&_h2]:font-bold [&_h2]:tracking-[0.16em] [&_h2]:text-navy [&_h2]:uppercase [&_li]:text-[15px] [&_li]:leading-relaxed [&_li]:text-ink/70 [&_p]:mt-4 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-ink/70 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </Container>
      </Section>
    </>
  );
}
