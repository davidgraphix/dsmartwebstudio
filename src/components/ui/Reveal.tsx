"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

/**
 * Scroll-reveal wrapper.
 *
 * Animates once, respects `prefers-reduced-motion` by rendering the final
 * state immediately, and uses transform/opacity only so it stays on the
 * compositor.
 */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance travelled, in px. */
  y?: number;
  x?: number;
  as?: ElementType;
  once?: boolean;
  amount?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  x = 0,
  as = "div",
  once = true,
  amount = 0.25,
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as "div"];

  // The server cannot know the visitor's motion preference, so it always
  // renders the hidden starting state. Reduced motion therefore has to settle
  // explicitly on the visible state rather than render no motion props at all,
  // which would strand that inline opacity: 0.
  const hidden = reduce ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x };

  return (
    <MotionTag
      className={className}
      initial={hidden}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={reduce ? { duration: 0 } : { duration: 0.62, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/** Parent that staggers its `RevealItem` children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.075,
  delay = 0,
  as = "div",
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: ElementType;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as "div"];

  const variants: Variants = {
    hidden: {},
    show: {
      transition: reduce
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: stagger, delayChildren: delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

/** Same shape, but the hidden state is already visible. */
const staticItemVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag className={className} variants={reduce ? staticItemVariants : itemVariants}>
      {children}
    </MotionTag>
  );
}
