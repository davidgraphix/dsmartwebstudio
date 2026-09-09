"use client";

import { track } from "@/lib/analytics";
import { whatsappLink } from "@/lib/whatsapp";
import { ButtonLink } from "./Button";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof ButtonLink>, "href" | "external" | "children"> & {
  message?: string;
  e164?: string;
  source: string;
  children?: React.ReactNode;
};

export function WhatsAppButton({
  message,
  e164,
  source,
  variant = "whatsapp",
  icon = "whatsapp",
  children = "Chat on WhatsApp",
  ...props
}: Props) {
  return (
    <ButtonLink
      href={whatsappLink(message, e164)}
      external
      variant={variant}
      icon={icon}
      onClick={() => track("whatsapp_clicked", { source })}
      {...props}
    >
      {children}
    </ButtonLink>
  );
}
