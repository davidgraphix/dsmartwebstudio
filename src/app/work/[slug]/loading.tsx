import { Container, Section } from "@/components/ui/Section";
import { CaseStudySkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Section tone="light" spacing="none" className="pt-32 pb-24 sm:pt-40">
      <Container>
        <CaseStudySkeleton />
      </Container>
    </Section>
  );
}
