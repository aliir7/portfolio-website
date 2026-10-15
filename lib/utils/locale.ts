import { cookies } from "next/headers";
import { LOCALE_COOKIE } from "@/i18n/config";
import { resolveLocale, type Locale } from "@/i18n/routing";

export type LocalizedAuthPath =
  | "/login"
  | "/forgot-password"
  | "/reset-password";

export async function getCurrentLocale(): Promise<Locale> {
  const store = await cookies();
  return resolveLocale(store.get(LOCALE_COOKIE)?.value);
}

export async function withLocale(path: LocalizedAuthPath): Promise<string> {
  return `/${await getCurrentLocale()}${path}`;
}
