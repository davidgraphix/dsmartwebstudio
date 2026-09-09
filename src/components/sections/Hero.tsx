"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HeroShowcase } from "@/components/visuals/HeroShowcase";
import { useQuote } from "@/providers/QuoteProvider";
import { track } from "@/lib/analytics";
import { whatsappLink } from "@/lib/whatsapp";
import { CAPABILITY_MARQUEE } from "@/data/content";

const EYEBROW = ["Digital Products", "Web", "Software", "SEO"];

export function Hero() {
  const { openQuote } = useQuote();
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? // Explicitly settle on the visible state — the server rendered the
        // hidden one, so returning no props would leave it hidden.
        { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative isolate overflow-hidden bg-ink pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-20" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_15%_-10%,#02167F_0%,transparent_58%),radial-gradient(90%_70%_at_92%_8%,rgba(2,22,127,0.55)_0%,transparent_60%)]" />
        <div className="grid-lines absolute inset-0 opacity-70" />
        <div className="noise absolute inset-0 opacity-[0.16] mix-blend-overlay" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ink to-transparent" />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-12 xl:gap-16">
          {/* Copy */}
          <div className="max-w-2xl">
            <motion.div {...rise(0)} className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
              {EYEBROW.map((word, index) => (
                <span key={word} className="flex items-center gap-2.5">
                  {index > 0 ? (
                    <span className="h-1 w-1 rounded-full bg-gold/60" aria-hidden="true" />
                  ) : null}
                  <span className="text-[10px] font-bold tracking-[0.22em] text-gold uppercase sm:text-[11px]">
                    {word}
                  </span>
                </span>
              ))}
            </motion.div>

            <motion.h1
              {...rise(0.08)}
              className="display-1 mt-6 text-white uppercase"
            >
              We build{" "}
              <span className="text-gold underline decoration-gold/30 decoration-[6px] underline-offset-[0.1em]">
                digital products
              </span>{" "}
              that help businesses grow.
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className="mt-7 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-lg"
            >
              Websites, web apps, mobile apps and business systems engineered for performance,
              visibility and sales.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                variant="gold"
                size="lg"
                arrow
                onClick={() => openQuote({ source: "hero" })}
                className="sm:min-w-[200px]"
              >
                Start a Project
              </Button>
              <ButtonLink href="#work" variant="outline-light" size="lg" icon="layers">
                View Our Work
              </ButtonLink>
            </motion.div>

            <motion.div {...rise(0.32)} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_clicked", { source: "hero-inline" })}
                className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-white/60 transition-colors hover:text-white"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1FA855]/15 text-[#34d374] transition-colors group-hover:bg-[#1FA855]/25">
                  <Icon name="whatsapp" size={16} />
                </span>
                Or chat with us on WhatsApp
              </a>
              <span className="inline-flex items-center gap-2 text-[13px] text-white/45">
                <Icon name="check" size={14} className="text-gold" />
                Free project consultation
              </span>
            </motion.div>
          </div>

          {/* Showcase */}
          <div className="relative lg:pl-4">
            <HeroShowcase />
          </div>
        </div>
      </div>

      {/* Capability marquee */}
      <div className="mask-fade-x relative mt-24 overflow-hidden border-y border-white/8 py-4 sm:mt-28">
        <div className="flex w-max motion-safe:animate-marquee motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
              aria-hidden={copy === 1}
            >
              {CAPABILITY_MARQUEE.map((item) => (
                <li
                  key={`${copy}-${item}`}
                  className="flex shrink-0 items-center gap-8 text-[12px] font-semibold tracking-[0.16em] whitespace-nowrap text-white/35 uppercase sm:gap-12 sm:text-[13px]"
                >
                  {item}
                  <span className="h-1 w-1 rounded-full bg-gold/50" aria-hidden="true" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
