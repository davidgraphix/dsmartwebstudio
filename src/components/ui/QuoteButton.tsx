"use client";

import { useQuote } from "@/providers/QuoteProvider";
import { Button } from "./Button";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Button>, "onClick" | "children"> & {
  service?: string;
  source: string;
  children?: React.ReactNode;
};

export function QuoteButton({
  service,
  source,
  children = "Request a Quote",
  ...props
}: Props) {
  const { openQuote } = useQuote();
  return (
    <Button onClick={() => openQuote({ service, source })} {...props}>
      {children}
    </Button>
  );
}
