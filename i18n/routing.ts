import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fa", "en"],
  defaultLocale: "fa",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

/**
 * Type-guard محلی — جایگزین `hasLocale` که در این بیلد از
 * `next-intl/routing` export نمی‌شود. همیشه به `Locale` narrow می‌کند،
 * مستقل از نوع دقیق `routing.locales`.
 */
export function hasLocale(value: string | null | undefined): value is Locale {
  return (routing.locales as readonly string[]).includes(value as string);
}

/** A saved cookie value (or nothing) to a supported locale. */
export function resolveLocale(value: string | null | undefined): Locale {
  return hasLocale(value) ? value : routing.defaultLocale;
}
