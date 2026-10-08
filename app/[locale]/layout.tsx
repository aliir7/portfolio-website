import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import Providers from "@/components/Providers";
import { routing, type Locale } from "@/i18n/routing";

const DIR: Record<Locale, "rtl" | "ltr"> = { fa: "rtl", en: "ltr" };

const siteUrl = "https://www.alirezaeii.ir";

const localeMetadata = {
  fa: {
    title: "علی رضایی | برنامه‌نویس React و Next.js",
    description:
      "نمونه‌کارها و رزومه علی رضایی، برنامه‌نویس React و Next.js ساکن تهران.",
    locale: "fa_IR",
  },
  en: {
    title: "Ali Rezaei | React & Next.js Developer",
    description:
      "The portfolio and resume of Ali Rezaei, a React and Next.js developer based in Tehran.",
    locale: "en_US",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const content = localeMetadata[locale];
  return {
    title: { absolute: content.title },
    description: content.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { fa: "/fa", en: "/en", "x-default": "/fa" },
    },
    openGraph: {
      type: "website",
      siteName: "Ali Rezaei Portfolio",
      url: `${siteUrl}/${locale}`,
      locale: content.locale,
      title: content.title,
      description: content.description,
      images: [
        {
          url: "/assets/img/user_img.png",
          alt: locale === "fa" ? "علی رضایی" : "Ali Rezaei",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: ["/assets/img/user_img.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={DIR[locale]} suppressHydrationWarning>
      {/* body عمداً بدون className: استایل پایه از globals.css می‌آید
          تا سرور/کلاینت یکسان بمانند و hydration mismatch نگیرد */}
      <body suppressHydrationWarning>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}