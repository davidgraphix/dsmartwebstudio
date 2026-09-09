import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import { CurrencySelector } from "@/components/pricing/CurrencySelector";
import { FOOTER_NAV, LEGAL_NAV, SITE, SOCIAL_LINKS, WHATSAPP_NUMBERS } from "@/data/site";
import { SERVICES } from "@/data/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-ink pt-16 pb-8 text-white sm:pt-20">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-[14.5px] leading-relaxed text-white/55">
              {SITE.tagline}
            </p>

            <div className="mt-7 flex gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${SITE.name} on ${social.name}`}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 text-white/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
                >
                  <Icon
                    name={social.name.toLowerCase() as "tiktok" | "instagram" | "facebook"}
                    size={18}
                  />
                </a>
              ))}
            </div>

            <div className="mt-8">
              <CurrencySelector tone="dark" id="footer-currency" />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <nav aria-labelledby="footer-nav-heading">
              <h2
                id="footer-nav-heading"
                className="text-[10.5px] font-bold tracking-[0.18em] text-white/40 uppercase"
              >
                Navigation
              </h2>
              <ul className="mt-5 space-y-2.5">
                {FOOTER_NAV.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="inline-block py-1 text-[14px] text-white/65 transition-colors hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-services-heading">
              <h2
                id="footer-services-heading"
                className="text-[10.5px] font-bold tracking-[0.18em] text-white/40 uppercase"
              >
                Services
              </h2>
              <ul className="mt-5 space-y-2.5">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <Link
                      href="/#services"
                      className="inline-block py-1 text-[14px] text-white/65 transition-colors hover:text-gold"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-[10.5px] font-bold tracking-[0.18em] text-white/40 uppercase">
                Contact
              </h2>
              <ul className="mt-5 space-y-3.5">
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-start gap-2.5 py-1 text-[14px] break-all text-white/65 transition-colors hover:text-gold"
                  >
                    <Icon name="mail" size={15} className="mt-0.5 shrink-0 text-white/35" />
                    {SITE.email}
                  </a>
                </li>
                {WHATSAPP_NUMBERS.map((number) => (
                  <li key={number.e164}>
                    <a
                      href={`https://wa.me/${number.e164}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 py-1 text-[14px] text-white/65 transition-colors hover:text-gold"
                    >
                      <Icon name="whatsapp" size={15} className="shrink-0 text-white/35" />
                      {number.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/40">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[13px] text-white/40 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
