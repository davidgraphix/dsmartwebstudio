"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { NAV_ITEMS, SOCIAL_LINKS, SITE, WHATSAPP_NUMBERS } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useQuote } from "@/providers/QuoteProvider";
import { Logo } from "./Logo";

/**
 * Full-screen editorial menu rather than a slide-in drawer: oversized type,
 * numbered items and a staggered reveal.
 */
export function MobileMenu({ onClose }: { onClose: () => void }) {
  const { openQuote } = useQuote();
  const reduce = useReducedMotion();

  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const itemMotion = (index: number) =>
    reduce
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.08 + index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <motion.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-100 flex flex-col bg-ink lg:hidden"
      initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 36px) 40px)", opacity: 1 }}
      animate={
        reduce ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 36px) 40px)", opacity: 1 }
      }
      exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 36px) 40px)", opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-navy/60 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative flex h-16 shrink-0 items-center justify-between px-5 sm:h-20 sm:px-8">
        <Logo tone="light" href="/" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          autoFocus
          className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
        >
          <Icon name="close" size={20} />
        </button>
      </div>

      <nav className="scroll-slim relative flex-1 overflow-y-auto px-5 pt-4 pb-8 sm:px-8" aria-label="Mobile">
        <ul className="divide-y divide-white/8 border-y border-white/8">
          {NAV_ITEMS.map((item, index) => (
            <motion.li key={item.href} {...itemMotion(index)}>
              <Link
                href={item.href}
                onClick={onClose}
                className="group flex items-baseline gap-4 py-4 transition-colors"
              >
                <span className="font-mono text-[11px] text-gold/70">
                  0{index + 1}
                </span>
                <span className="font-display text-3xl font-extrabold tracking-[-0.03em] text-white uppercase transition-colors group-hover:text-gold sm:text-4xl">
                  {item.label}
                </span>
                <Icon
                  name="arrow-up-right"
                  size={18}
                  className="ml-auto self-center text-white/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold"
                />
              </Link>
            </motion.li>
          ))}
        </ul>

        <motion.div className="mt-8 space-y-3" {...itemMotion(NAV_ITEMS.length)}>
          <Button
            variant="gold"
            size="lg"
            fullWidth
            arrow
            onClick={() => {
              onClose();
              openQuote({ source: "mobile-menu" });
            }}
          >
            Start a Project
          </Button>
          <WhatsAppButton source="mobile-menu" size="lg" fullWidth />
        </motion.div>

        <motion.div className="mt-9 space-y-5" {...itemMotion(NAV_ITEMS.length + 1)}>
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/35 uppercase">Email</p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-1 block text-sm font-medium text-white/85 hover:text-gold"
            >
              {SITE.email}
            </a>
          </div>
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/35 uppercase">WhatsApp</p>
            <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1">
              {WHATSAPP_NUMBERS.map((number) => (
                <a
                  key={number.e164}
                  href={`https://wa.me/${number.e164}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white/85 hover:text-gold"
                >
                  {number.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex gap-2.5 pt-1">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 text-white/60 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon
                  name={social.name.toLowerCase() as "tiktok" | "instagram" | "facebook"}
                  size={18}
                />
              </a>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.div>
  );
}
