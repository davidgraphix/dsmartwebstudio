import Link from "next/link";
import type { Metadata } from "next";
import { Container, Section } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section tone="dark" spacing="none" className="flex min-h-[80vh] items-center pt-32 pb-24">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,#02167F_0%,transparent_60%)]"
        aria-hidden="true"
      />
      <Container>
        <div className="max-w-xl">
          <p className="font-mono text-[13px] text-gold">404</p>
          <h1 className="display-2 mt-4 text-white uppercase">
            That page isn&apos;t <span className="text-gold">here.</span>
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-white/60 sm:text-lg">
            The link may be out of date. Head back to the homepage, or take a look at what we build.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" variant="gold" size="lg" arrow>
              Back to homepage
            </ButtonLink>
            <ButtonLink href="/work" variant="outline-light" size="lg">
              View our work
            </ButtonLink>
          </div>
          <p className="mt-8 text-[13.5px] text-white/40">
            Looking for something specific?{" "}
            <Link href="/#contact" className="text-gold underline underline-offset-4">
              Contact us
            </Link>
            .
          </p>
        </div>
      </Container>
    </Section>
  );
}
