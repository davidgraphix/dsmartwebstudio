"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BrowserFrame, FloatCard, PhoneFrame } from "./Frames";
import { DashboardPreview } from "./DashboardPreview";
import { MobileAppScreen } from "./MobilePreview";
import { Icon } from "@/components/ui/Icon";
import { Sparkline } from "./Charts";

/**
 * Hero composition: a browser-framed dashboard with a phone and two floating
 * status cards. Only transform/opacity animate, and everything collapses to a
 * single readable column on small screens.
 */
export function HeroShowcase() {
  const reduce = useReducedMotion();

  const enter = (delay: number) =>
    reduce
      ? { initial: { opacity: 1, y: 0, scale: 1 }, animate: { opacity: 1, y: 0, scale: 1 } }
      : {
          initial: { opacity: 0, y: 26, scale: 0.97 },
          animate: { opacity: 1, y: 0, scale: 1 },
          transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-navy/45 blur-[80px]"
        aria-hidden="true"
      />

      <motion.div {...enter(0.15)} className="relative">
        <BrowserFrame url="admin.yourbusiness.com" className="w-full">
          <DashboardPreview />
        </BrowserFrame>
      </motion.div>

      {/* Phone — tucked into the lower-left corner */}
      <motion.div
        {...enter(0.35)}
        className="absolute -bottom-8 -left-3 w-[104px] sm:-bottom-10 sm:-left-6 sm:w-[128px] lg:-left-10 lg:w-[142px]"
      >
        <div className="motion-safe:animate-float-slow">
          <PhoneFrame>
            <MobileAppScreen />
          </PhoneFrame>
        </div>
      </motion.div>

      {/* Search visibility card */}
      <motion.div
        {...enter(0.5)}
        className="absolute -top-6 -right-2 w-[152px] sm:-top-8 sm:-right-5 sm:w-[188px] lg:-right-8"
      >
        <div className="motion-safe:animate-float-mid">
          <FloatCard>
            <div className="flex min-w-0 items-center gap-2">
              <Icon name="google" size={14} className="shrink-0 text-white/80" />
              <span className="truncate text-[9.5px] font-semibold tracking-[0.1em] text-white/55 uppercase">
                Search visibility
              </span>
            </div>
            <div className="mt-2 flex items-end justify-between gap-2">
              <div className="min-w-0">
                <p className="font-display text-lg font-extrabold text-white sm:text-xl">Indexed</p>
                <p className="truncate text-[9px] text-white/45">Sitemap submitted</p>
              </div>
              <Sparkline className="h-5 w-10 shrink-0 text-gold sm:w-12" />
            </div>
          </FloatCard>
        </div>
      </motion.div>

      {/* Performance card */}
      <motion.div
        {...enter(0.65)}
        className="absolute right-2 -bottom-6 w-[132px] sm:right-6 sm:-bottom-8 sm:w-[158px]"
      >
        <FloatCard className="flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/15">
            <span
              className="absolute inset-0 rounded-full bg-gold/25 motion-safe:animate-[pulse-ring_2.8s_ease-out_infinite]"
              aria-hidden="true"
            />
            <Icon name="bolt" size={15} className="relative text-gold" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-[13px] font-extrabold text-white">Optimized</p>
            <p className="truncate text-[9px] text-white/45">Core Web Vitals</p>
          </div>
        </FloatCard>
      </motion.div>
    </div>
  );
}
