export type ClassValue = string | number | bigint | boolean | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter((value): value is string => typeof value === "string" && value.length > 0).join(" ");
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Escapes user-supplied text before it is interpolated into an HTML email. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
