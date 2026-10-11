import type { Locale, Localized, LocalizedText } from "@/types/content";

export const emptyLocalized = (): LocalizedText => ({ fa: "", en: "" });

function isLocalizedText(value: unknown): value is LocalizedText {
  return typeof value === "object" && value !== null && "fa" in value && "en" in value;
}

/** Resolves every `{ fa, en }` field of a DB row to one locale. The single place that does this. */
export function localize<T extends object>(row: T, locale: Locale): Localized<T> {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [
      key,
      isLocalizedText(value) ? value[locale] : value,
    ]),
  ) as Localized<T>;
}
