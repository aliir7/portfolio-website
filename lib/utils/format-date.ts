import type { Locale } from "@/types";

/** Long date in the reader's language; Persian uses the Jalali calendar by default. */
export function formatDate(date: Date, locale: Locale, withTime = false) {
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
    dateStyle: "long",
    ...(withTime && { timeStyle: "short" }),
  }).format(date);
}
