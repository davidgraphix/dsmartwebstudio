import { Container, Section } from "@/components/ui/Section";
import { ProjectCardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Section tone="light" spacing="none" className="pt-32 pb-24 sm:pt-40">
      <Container>
        <Skeleton className="h-3 w-24 rounded-full" />
        <Skeleton className="mt-5 h-12 w-72 max-w-full" />
        <Skeleton className="mt-4 h-5 w-full max-w-xl" />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
