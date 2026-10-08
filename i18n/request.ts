import { getRequestConfig } from "next-intl/server";
import { routing, type Locale } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale: Locale = routing.locales.includes(requestedLocale as Locale)
    ? (requestedLocale as Locale)
    : routing.defaultLocale;

  return {
    locale,
    // ✅ timeZone پایدار → حذف هشدار ENVIRONMENT_FALLBACK و جلوگیری از mismatch
    timeZone: "Asia/Tehran",
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
