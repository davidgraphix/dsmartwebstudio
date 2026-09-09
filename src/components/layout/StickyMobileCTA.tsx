"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { useQuote } from "@/providers/QuoteProvider";
import { track } from "@/lib/analytics";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * Mobile-only action bar.
 *
 * Appears once the visitor is past the hero, can be dismissed for the session,
 * and steps aside while the quote dialog is open.
 */
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { openQuote, isOpen } = useQuote();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const scrolledPastHero = window.scrollY > window.innerHeight * 0.7;
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 220;
      setVisible(scrolledPastHero && !nearBottom);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const show = visible && !dismissed && !isOpen;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={reduce ? { opacity: 0 } : { y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-80 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-ink/95 p-2 shadow-[0_-8px_40px_-12px_rgba(1,7,44,0.8)] backdrop-blur-lg">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_clicked", { source: "sticky-mobile" })}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#1FA855] text-[14px] font-bold text-white"
            >
              <Icon name="whatsapp" size={18} />
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => openQuote({ source: "sticky-mobile" })}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gold text-[14px] font-bold text-ink"
            >
              Request Quote
              <Icon name="arrow-right" size={16} />
            </button>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Hide quick actions"
              className="grid h-12 w-10 shrink-0 place-items-center rounded-xl text-white/40 transition-colors hover:text-white"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
