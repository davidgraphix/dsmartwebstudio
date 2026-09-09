import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Adds the standard vertical rhythm. */
  spacing?: "none" | "sm" | "md" | "lg";
  tone?: "light" | "mist" | "dark" | "navy";
  as?: "section" | "div" | "footer" | "article";
  "aria-labelledby"?: string;
};

const SPACING = {
  none: "",
  sm: "py-14 sm:py-16",
  md: "py-18 sm:py-24 lg:py-28",
  lg: "py-22 sm:py-28 lg:py-36",
} as const;

const TONES = {
  light: "bg-white text-ink",
  mist: "bg-mist text-ink",
  dark: "bg-ink text-white",
  navy: "bg-navy text-white",
} as const;

export function Section({
  id,
  children,
  className,
  spacing = "md",
  tone = "light",
  as: Tag = "section",
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("relative isolate", TONES[tone], SPACING[spacing], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("container-x", className)}>{children}</div>;
}
