import { notFound } from "next/navigation";
import Providers from "@/components/Providers";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return locale === "en"
    ? { title: "Ali Rezaei Portfolio", description: "Professional portfolio and resume" }
    : { title: "پورتفولیوی علی رضایی", description: "نمونه کارها و رزومه حرفه‌ای" };
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (locale !== "fa" && locale !== "en") notFound();
  const typedLocale = locale as Locale;
  return (
    <Providers locale={typedLocale}>{children}</Providers>
  );
}
