"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BASE_CURRENCY,
  CURRENCIES,
  FALLBACK_RATES,
  currencyForCountry,
  type CurrencyCode,
} from "@/lib/currency/config";
import { formatFromNGN, formatRangeFromNGN } from "@/lib/currency/format";
import { track } from "@/lib/analytics";

const STORAGE_KEY = "dsws.currency";
const COUNTRY_KEY = "dsws.country";

type CurrencyContextValue = {
  currency: CurrencyCode;
  country: string | null;
  rates: Record<CurrencyCode, number>;
  /** True once detection and rate loading have settled. */
  ready: boolean;
  /** True when rates came from the live provider rather than the fallback table. */
  liveRates: boolean;
  isBase: boolean;
  setCurrency: (code: CurrencyCode, source?: "manual" | "auto") => void;
  format: (amountNGN: number) => string;
  formatRange: (minNGN: number, maxNGN: number | null) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function isCurrencyCode(value: string | null): value is CurrencyCode {
  return Boolean(value && value in CURRENCIES);
}

/** Last-resort guess from the browser locale when no geo header is present. */
function currencyFromLocale(): CurrencyCode | null {
  if (typeof navigator === "undefined") return null;
  const locale = navigator.language || "";
  const region = locale.split("-")[1];
  if (!region) return null;
  const guessed = currencyForCountry(region);
  return guessed === BASE_CURRENCY && region.toUpperCase() !== "NG" ? null : guessed;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(BASE_CURRENCY);
  const [country, setCountry] = useState<string | null>(null);
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(FALLBACK_RATES);
  const [liveRates, setLiveRates] = useState(false);
  const [ready, setReady] = useState(false);

  // Detection: stored preference wins, then geo headers, then locale, then NGN.
  // Runs off the effect body so state settles in a callback, not synchronously.
  useEffect(() => {
    let cancelled = false;

    const resolve = async () => {
      let stored: string | null = null;
      let storedCountry: string | null = null;

      try {
        stored = window.localStorage.getItem(STORAGE_KEY);
        storedCountry = window.localStorage.getItem(COUNTRY_KEY);
      } catch {
        /* storage can be unavailable in private mode */
      }

      if (cancelled) return;
      if (storedCountry) setCountry(storedCountry);

      if (isCurrencyCode(stored)) {
        setCurrencyState(stored);
        setReady(true);
        return;
      }

      try {
        const response = await fetch("/api/geo", { cache: "no-store" });
        if (!response.ok) throw new Error("geo unavailable");

        const data = (await response.json()) as {
          country: string | null;
          currency: string | null;
        };
        if (cancelled) return;

        if (data.country) {
          setCountry(data.country);
          try {
            window.localStorage.setItem(COUNTRY_KEY, data.country);
          } catch {
            /* non-fatal */
          }
        }

        if (isCurrencyCode(data.currency)) {
          setCurrencyState(data.currency);
          setReady(true);
          return;
        }
        throw new Error("geo empty");
      } catch {
        if (cancelled) return;
        const fromLocale = currencyFromLocale();
        if (fromLocale) setCurrencyState(fromLocale);
        setReady(true);
      }
    };

    const handle = window.setTimeout(() => void resolve(), 0);

    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, []);

  // Rates are only needed once a non-base currency is in play.
  useEffect(() => {
    if (currency === BASE_CURRENCY || liveRates) return;
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch("/api/rates");
        if (!response.ok) return;
        const data = (await response.json()) as {
          rates: Record<CurrencyCode, number>;
          live: boolean;
        };
        if (cancelled || !data.rates) return;
        setRates({ ...FALLBACK_RATES, ...data.rates });
        setLiveRates(Boolean(data.live));
      } catch {
        /* keep the fallback table */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [currency, liveRates]);

  const setCurrency = useCallback((code: CurrencyCode, source: "manual" | "auto" = "manual") => {
    setCurrencyState(code);
    setReady(true);
    if (source === "manual") {
      try {
        window.localStorage.setItem(STORAGE_KEY, code);
      } catch {
        /* storage can be unavailable in private mode */
      }
      track("currency_changed", { currency: code });
    }
  }, []);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      country,
      rates,
      ready,
      liveRates,
      isBase: currency === BASE_CURRENCY,
      setCurrency,
      format: (amountNGN: number) => formatFromNGN(amountNGN, currency, rates),
      formatRange: (minNGN: number, maxNGN: number | null) =>
        formatRangeFromNGN(minNGN, maxNGN, currency, rates),
    }),
    [currency, country, rates, ready, liveRates, setCurrency],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within <CurrencyProvider>");
  return context;
}
