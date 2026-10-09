"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { NAV_ITEMS } from "@/data/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { useQuote } from "@/providers/QuoteProvider";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.split("#")[1]).filter(Boolean) as string[];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const { openQuote } = useQuote();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlights the nav item for the section currently in view.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <motion.header
        initial={reduce ? false : { y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-90 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
          scrolled
            ? "border-b border-navy/10 bg-white shadow-[0_8px_30px_-18px_rgba(2,22,127,0.4)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/92"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="container-x flex h-16 items-center justify-between gap-4 sm:h-20" aria-label="Primary">
          <Logo tone={scrolled ? "dark" : "light"} priority />

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const id = item.href.split("#")[1];
              const isActive = id ? active === id : false;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-lg px-3.5 py-2 text-[13.5px] font-semibold transition-colors duration-200",
                      scrolled
                        ? isActive
                          ? "text-navy"
                          : "text-ink/60 hover:text-navy"
                        : isActive
                          ? "text-gold"
                          : "text-white/70 hover:text-white",
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className={cn(
                          "absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full",
                          scrolled ? "bg-navy" : "bg-gold",
                        )}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Button
                size="sm"
                variant={scrolled ? "primary" : "gold"}
                arrow
                onClick={() => openQuote({ source: "navbar" })}
              >
                Start a Project
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(
                "grid h-10 w-10 place-items-center rounded-xl border transition-colors lg:hidden",
                scrolled
                  ? "border-navy/15 text-navy hover:bg-navy/5"
                  : "border-white/20 text-white hover:bg-white/10",
              )}
            >
              <Icon name="menu" size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? <MobileMenu onClose={() => setMenuOpen(false)} /> : null}
      </AnimatePresence>
    </>
  );
}
