import { Container, Section } from "@/components/ui/Section";
import { ProjectShowcaseSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Section tone="light" spacing="none" className="pt-32 pb-24 sm:pt-40">
      <Container>
        <Skeleton className="h-3 w-24 rounded-full" />
        <Skeleton className="mt-5 h-12 w-72 max-w-full" />
        <Skeleton className="mt-4 h-5 w-full max-w-xl" />
        <div className="mt-16 space-y-24">
          {Array.from({ length: 2 }).map((_, index) => (
            <ProjectShowcaseSkeleton key={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
