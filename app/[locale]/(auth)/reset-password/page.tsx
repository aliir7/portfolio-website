import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import ResetPasswordForm from "@/components/auth/reset-password-form";

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ token?: string; error?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "auth" });
  return {
    title: t("resetPageTitle"),
    robots: { index: false, follow: false },
  };
}

export default async function ResetPasswordPage({
  params,
  searchParams,
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { token, error } = await searchParams;
  return <ResetPasswordForm token={token ?? null} linkError={error ?? null} />;
}
