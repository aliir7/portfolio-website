import { getRequestConfig } from "next-intl/server";
import { TIME_ZONE } from "./config";
import { hasLocale, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    timeZone: TIME_ZONE,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
