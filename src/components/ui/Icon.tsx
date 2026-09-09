import type { SVGProps } from "react";

/**
 * Hand-rolled icon set — a dependency-free alternative to shipping an icon
 * library. Every glyph shares a 24px grid and 1.6 stroke weight.
 */

export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "check"
  | "browser"
  | "cart"
  | "app-window"
  | "phone"
  | "code"
  | "dashboard"
  | "search"
  | "pen"
  | "target"
  | "growth"
  | "bolt"
  | "devices"
  | "google"
  | "whatsapp"
  | "mail"
  | "menu"
  | "close"
  | "chevron-down"
  | "plus"
  | "minus"
  | "sparkle"
  | "shield"
  | "globe"
  | "layers"
  | "tiktok"
  | "instagram"
  | "facebook";

const PATHS: Record<IconName, React.ReactNode> = {
  "arrow-right": <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" />,
  "arrow-up-right": <path d="M7 17 17 7m0 0H8.5M17 7v8.5" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  browser: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18M6.5 6.75h.01M9.25 6.75h.01" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.2l2.2 10.5h9.6L19 7.5H6" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  "app-window": (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18M9 9v10.5" />
    </>
  ),
  phone: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 5.5h3M11 18.5h2" />
    </>
  ),
  code: <path d="m8.5 7.5-5 4.5 5 4.5M15.5 7.5l5 4.5-5 4.5M13.5 4l-3 16" />,
  dashboard: (
    <>
      <rect x="3" y="3.5" width="7.5" height="7" rx="1.6" />
      <rect x="13.5" y="3.5" width="7.5" height="11" rx="1.6" />
      <rect x="3" y="13.5" width="7.5" height="7" rx="1.6" />
      <rect x="13.5" y="17.5" width="7.5" height="3" rx="1.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  pen: <path d="M4 20h4l11-11a2.4 2.4 0 0 0-3.4-3.4L4.6 16.6 4 20ZM14.5 6.5l3 3" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 4V2M12 22v-2M4 12H2M22 12h-2" />
    </>
  ),
  growth: <path d="M4 18.5 9.5 13l3.5 3.5L20 9m0 0h-5m5 0v5" />,
  bolt: <path d="M13.5 2.5 5 13.5h6L10.5 21.5 19 10.5h-6l.5-8Z" />,
  devices: (
    <>
      <rect x="2.5" y="5" width="13" height="10" rx="2" />
      <rect x="16.5" y="9" width="5" height="10.5" rx="1.6" />
      <path d="M6 19h6" />
    </>
  ),
  google: (
    <path d="M20.5 12.2c0-.7-.06-1.2-.18-1.75H12v3.2h4.9a4.2 4.2 0 0 1-1.8 2.75v2.3h2.9c1.7-1.57 2.5-3.9 2.5-6.5ZM12 21c2.4 0 4.4-.8 5.9-2.15l-2.9-2.25c-.8.55-1.83.87-3 .87-2.3 0-4.26-1.55-4.96-3.65H4.05v2.3A9 9 0 0 0 12 21ZM7.04 13.82a5.4 5.4 0 0 1 0-3.44v-2.3H4.05a9 9 0 0 0 0 8.04l3-2.3ZM12 6.6c1.3 0 2.47.45 3.4 1.33l2.55-2.55C16.4 3.95 14.4 3.1 12 3.1a9 9 0 0 0-7.95 4.9l3 2.3C7.74 8.2 9.7 6.6 12 6.6Z" />
  ),
  whatsapp: (
    <path d="M12.05 3.5a8.4 8.4 0 0 0-7.2 12.72L3.5 20.5l4.4-1.3a8.4 8.4 0 1 0 4.15-15.7Zm0 1.7a6.7 6.7 0 1 1-3.4 12.47l-.3-.18-2.42.71.72-2.36-.2-.32A6.7 6.7 0 0 1 12.05 5.2Zm-3.1 3.4c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.7 4.2 3.68 2.08.8 2.5.64 2.96.6.45-.05 1.45-.6 1.66-1.17.2-.58.2-1.07.14-1.17-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.32-.74-1.8-.19-.47-.39-.4-.54-.41h-.47Z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  menu: <path d="M3.5 7.5h17M3.5 16.5h17" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  "chevron-down": <path d="m6 9.5 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  sparkle: <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.8L12 18.5l-1.8-5.9L4.5 10.8 10.2 9 12 3.5Z" />,
  shield: <path d="M12 2.8 4.8 5.6v5.8c0 4.3 3 8 7.2 9.8 4.2-1.8 7.2-5.5 7.2-9.8V5.6L12 2.8Z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.4 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.4-3.6-8.5S9.6 5.9 12 3.5Z" />
    </>
  ),
  layers: <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Zm8.5 9L12 16.5 3.5 12m17 4.5L12 21l-8.5-4.5" />,
  tiktok: (
    <path d="M16.2 3h-2.7v12.1a2.4 2.4 0 1 1-2-2.37V9.98a5.5 5.5 0 1 0 4.7 5.44V9.3a6.4 6.4 0 0 0 3.6 1.12V7.5a3.7 3.7 0 0 1-3.6-3.7V3Z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M16.9 7.2h.01" />
    </>
  ),
  facebook: (
    <path d="M13.6 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6A22 22 0 0 0 14.4 3.5c-2.4 0-4 1.45-4 4.1v2.3H7.7V13h2.7v8h3.2Z" />
  ),
};

const FILLED: IconName[] = ["whatsapp", "tiktok", "facebook", "google", "bolt", "shield", "sparkle"];

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 20, ...props }: IconProps) {
  const filled = FILLED.includes(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
