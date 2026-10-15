"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import ErrorState from "@/components/ErrorState";

// Catches errors thrown by pages under the locale layout. Errors thrown by the layout itself
// (e.g. the content queries when the database is down) end in `app/global-error.tsx`.
export default function LocaleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("errorPage");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorState title={t("title")} description={t("description")} retryLabel={t("retry")} homeLabel={t("home")} onRetry={reset} />;
}
