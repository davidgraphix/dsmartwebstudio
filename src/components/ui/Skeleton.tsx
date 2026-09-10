import { cn } from "@/lib/utils";

/**
 * Skeletons mirror the exact box model of the content they stand in for, so
 * swapping to real content causes no layout shift.
 */

export function Skeleton({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn(tone === "dark" ? "skeleton-dark" : "skeleton", className)}
      aria-hidden="true"
    />
  );
}

/** Mirrors the editorial project block: copy column beside a device frame. */
export function ProjectShowcaseSkeleton({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="space-y-4 lg:col-span-5">
        <Skeleton tone={tone} className="h-3 w-40 rounded-full" />
        <Skeleton tone={tone} className="h-10 w-3/5" />
        <Skeleton tone={tone} className="h-4 w-full" />
        <Skeleton tone={tone} className="h-4 w-4/5" />
        <div className="flex gap-2 pt-2">
          <Skeleton tone={tone} className="h-7 w-20 rounded-md" />
          <Skeleton tone={tone} className="h-7 w-16 rounded-md" />
          <Skeleton tone={tone} className="h-7 w-24 rounded-md" />
        </div>
      </div>
      <div className="lg:col-span-7">
        <Skeleton tone={tone} className="aspect-2/1 w-full rounded-2xl" />
      </div>
    </div>
  );
}

export function PriceSkeleton({ className }: { className?: string }) {
  return <Skeleton className={cn("h-11 w-40 rounded-lg", className)} />;
}

export function TextBlockSkeleton({ lines = 3, tone = "light" }: { lines?: number; tone?: "light" | "dark" }) {
  return (
    <div className="space-y-2.5">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          tone={tone}
          className={cn("h-4", index === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

export function CaseStudySkeleton() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <Skeleton className="h-3 w-28 rounded-full" />
        <Skeleton className="h-12 w-3/4" />
        <TextBlockSkeleton lines={2} />
      </div>
      <Skeleton className="aspect-16/9 w-full rounded-2xl" />
      <div className="grid gap-8 md:grid-cols-2">
        <TextBlockSkeleton lines={4} />
        <TextBlockSkeleton lines={4} />
      </div>
    </div>
  );
}
