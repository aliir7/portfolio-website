import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorksListing, { worksMetadata } from "@/components/Works/WorksListing";
import { hasLocale } from "@/i18n/routing";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return hasLocale(locale) ? worksMetadata(locale, 1) : {};
}

export default async function WorksPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  return <WorksListing locale={locale} page={1} />;
}
