import LoginForm from "@/components/auth/login-form";
import  { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";


type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth" });
  return {
    title: t("loginPageTitle"),
    robots: { index: false, follow: false },
  } satisfies Metadata;
}

export default function LoginPage() {
  return <LoginForm />;
}