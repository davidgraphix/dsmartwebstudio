"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { track } from "@/lib/analytics";

/** The quote flow is heavy and conversion-critical, so it is code-split. */
const QuoteModal = dynamic(() => import("@/components/quote/QuoteModal"), { ssr: false });

type OpenOptions = { service?: string; source?: string };

type QuoteContextValue = {
  isOpen: boolean;
  presetService?: string;
  openQuote: (options?: OpenOptions) => void;
  closeQuote: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetService, setPresetService] = useState<string | undefined>(undefined);

  const openQuote = useCallback((options?: OpenOptions) => {
    setPresetService(options?.service);
    setIsOpen(true);
    track("quote_started", { service: options?.service, source: options?.source });
  }, []);

  const closeQuote = useCallback(() => setIsOpen(false), []);

  const value = useMemo<QuoteContextValue>(
    () => ({ isOpen, presetService, openQuote, closeQuote }),
    [isOpen, presetService, openQuote, closeQuote],
  );

  return (
    <QuoteContext.Provider value={value}>
      {children}
      {isOpen ? <QuoteModal presetService={presetService} onClose={closeQuote} /> : null}
    </QuoteContext.Provider>
  );
}

export function useQuote(): QuoteContextValue {
  const context = useContext(QuoteContext);
  if (!context) throw new Error("useQuote must be used within <QuoteProvider>");
  return context;
}
