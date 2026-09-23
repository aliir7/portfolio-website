import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import Providers from "@/components/Providers";
import type { Locale } from "@/i18n/routing";

const siteUrl = "https://www.alirezaeii.ir";

const localeMetadata = {
  fa: {
    title: "پورتفولیوی علی رضایی",
    description: "نمونه‌کارها و رزومه علی رضایی، برنامه‌نویس React و Next.js ساکن تهران.",
    locale: "fa_IR",
  },
  en: {
    title: "Ali Rezaei Portfolio",
    description: "The portfolio and resume of Ali Rezaei, a React and Next.js developer based in Tehran.",
    locale: "en_US",
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "fa" && locale !== "en") notFound();

  const content = localeMetadata[locale];
  return {
    title: content.title,
    description: content.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fa: "/fa",
        en: "/en",
        "x-default": "/fa",
      },
    },
    openGraph: {
      type: "website" as const,
      siteName: "Ali Rezaei Portfolio",
      url: `${siteUrl}/${locale}`,
      locale: content.locale,
      title: content.title,
      description: content.description,
      images: [{ url: "/assets/img/user_img.png", alt: locale === "fa" ? "علی رضایی" : "Ali Rezaei" }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: content.title,
      description: content.description,
      images: ["/assets/img/user_img.png"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (locale !== "fa" && locale !== "en") notFound();
  const typedLocale = locale as Locale;
  setRequestLocale(typedLocale);
  const messages = await getMessages();
  return (
    <Providers locale={typedLocale} messages={messages}>{children}</Providers>
  );
}
