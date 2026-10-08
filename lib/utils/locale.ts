import { cookies } from "next/headers";
import { routing, type Locale } from "@/i18n/routing";

export type LocalizedAuthPath =
  | "/login"
  | "/forgot-password"
  | "/reset-password";

/** لوکیشن فعلی کاربر را از کوکی می‌خواند (همان منطق proxy) */
export async function getCurrentLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get("portfolio-locale")?.value as Locale | undefined;
  return value && routing.locales.includes(value)
    ? value
    : routing.defaultLocale;
}

/** مسیرهای auth را با پیشوند لوکیشن می‌سازد: /fa/login */
export async function withLocale(path: LocalizedAuthPath): Promise<string> {
  return `/${await getCurrentLocale()}${path}`;
}