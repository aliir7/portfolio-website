import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { AstronautSVG } from "@/components/not-found/astronaut-svg";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ locale: string }> };

export default async function NotFound({ params }: Props) {
  const { locale } = await params;
  const isValid = routing.locales.includes(locale as Locale);
  const safeLocale: Locale = isValid
    ? (locale as Locale)
    : routing.defaultLocale;
  const t = await getTranslations({
    locale: safeLocale,
    namespace: "notFound",
  });

  const content = (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <div className="relative w-full max-w-md">
        <span className="stroke-custom pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 text-[8rem] leading-none font-black select-none sm:text-[11rem]">
          404
        </span>
        <AstronautSVG
          label={t("illustrationAlt")}
          className="mx-auto w-72 sm:w-80"
        />
      </div>

      <div className="grid gap-3">
        <h1 className="text-3xl font-black sm:text-4xl">{t("title")}</h1>
        <p className="text-muted-foreground mx-auto max-w-sm text-sm sm:text-base">
          {t("description")}
        </p>
      </div>

      <Button asChild variant="cta">
        <Link href={`/${safeLocale}`}>{t("backHome")}</Link>
      </Button>
    </main>
  );

  // locale معتبر → والد ([locale]/layout) html و Provider را ساخته؛ فقط محتوا
  if (isValid) return content;

  // locale نامعتبر → layout والد notFound() کرده و html نساخته؛ خودمان می‌سازیم
  return (
    <html
      lang={safeLocale}
      dir={safeLocale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{content}</body>
    </html>
  );
}
