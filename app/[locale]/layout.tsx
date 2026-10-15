import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import Providers from "@/components/Providers";
import { TIME_ZONE } from "@/i18n/config";
import { hasLocale, type Locale } from "@/i18n/routing";
import { getSeo } from "@/lib/seo";
import { getPublicContent } from "@/query/content.query";

const DIR: Record<Locale, "rtl" | "ltr"> = { fa: "rtl", en: "ltr" };


const OG_LOCALE: Record<Locale, string> = { fa: "fa_IR", en: "en_US" };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  setRequestLocale(locale);

  const seo = await getSeo(locale);
  return {
    title: { default: seo.title, template: `%s | ${seo.name}` },
    description: seo.description,
    keywords: seo.keywords,
    applicationName: seo.name,
    authors: [{ name: seo.name, url: siteUrl }],
    creator: seo.name,
    publisher: seo.name,
    alternates: {
      canonical: `/${locale}`,
      languages: { fa: "/fa", en: "/en", "x-default": "/fa" },
    },
    openGraph: {
      type: "website",
      siteName: seo.name,
      url: `${siteUrl}/${locale}`,
      locale: OG_LOCALE[locale],
      title: seo.title,
      description: seo.description,
      images: [{ url: seo.image, alt: seo.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.image],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  setRequestLocale(locale);
  const [messages, content] = await Promise.all([getMessages(), getPublicContent(locale)]);

  return (
    <html lang={locale} dir={DIR[locale]} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers locale={locale} messages={messages} timeZone={TIME_ZONE} content={content}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
