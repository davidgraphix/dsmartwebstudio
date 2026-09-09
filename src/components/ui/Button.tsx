"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "gold" | "ghost" | "outline" | "outline-light" | "whatsapp";
type Size = "sm" | "md" | "lg";

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold " +
  "transition-[transform,background-color,color,box-shadow,border-color] duration-200 ease-out " +
  "will-change-transform active:translate-y-px disabled:pointer-events-none disabled:opacity-55";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-[0_10px_28px_-12px_rgba(2,22,127,0.75)] hover:bg-navy-600 hover:shadow-[0_16px_36px_-12px_rgba(2,22,127,0.85)] hover:-translate-y-0.5",
  gold:
    "bg-gold text-ink shadow-[0_10px_28px_-12px_rgba(255,208,20,0.8)] hover:bg-gold-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(255,208,20,0.9)]",
  ghost: "text-navy hover:bg-navy/6",
  outline:
    "border border-navy/20 text-navy bg-white/60 hover:border-navy/45 hover:bg-white hover:-translate-y-0.5",
  "outline-light":
    "border border-white/25 text-white hover:border-gold/70 hover:text-gold hover:-translate-y-0.5",
  whatsapp:
    "bg-[#1FA855] text-white hover:bg-[#25c264] hover:-translate-y-0.5 shadow-[0_10px_28px_-14px_rgba(31,168,85,0.9)]",
};

const SIZES: Record<Size, string> = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-12 px-5 text-[14.5px]",
  lg: "h-14 px-7 text-[15px] sm:text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  /** Nudges the trailing arrow on hover. */
  arrow?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
};

function content(children: ReactNode, icon?: IconName, arrow?: boolean) {
  return (
    <>
      {icon ? <Icon name={icon} size={18} className="shrink-0" /> : null}
      <span className="truncate">{children}</span>
      {arrow ? (
        <Icon
          name="arrow-right"
          size={18}
          className="shrink-0 transition-transform duration-300 ease-out group-hover/btn:translate-x-1"
        />
      ) : null}
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  arrow,
  fullWidth,
  className,
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && "w-full", className)}
      {...props}
    >
      {content(children, icon, arrow)}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  arrow,
  fullWidth,
  className,
  children,
  href,
  external,
  ...props
}: CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, "href"> & { href: string; external?: boolean }) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], fullWidth && "w-full", className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {content(children, icon, arrow)}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content(children, icon, arrow)}
    </Link>
  );
}
