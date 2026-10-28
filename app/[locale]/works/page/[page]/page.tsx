import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorksListing, { worksMetadata } from "@/components/Works/WorksListing";
import { redirect } from "@/i18n/navigation";
import { hasLocale } from "@/i18n/routing";
import { parsePage } from "@/lib/pagination";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string; page: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, page } = await params;
  const number = parsePage(page);
  return hasLocale(locale) && number ? worksMetadata(locale, number) : {};
}

export default async function WorksPageN({ params }: Props) {
  const { locale, page } = await params;
  if (!hasLocale(locale)) notFound();

  const number = parsePage(page);
  if (number === null) notFound();
  if (number === 1) redirect({ href: "/works", locale }); // one canonical URL for the first page

  return <WorksListing locale={locale} page={number} />;
}
