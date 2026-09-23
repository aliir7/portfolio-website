"use client";

import { useLocale } from "@/lib/i18n";
import { Link } from "@/i18n/navigation";

export default function LanguageToggle({ label }: { label: string }) {
  const locale = useLocale();
  const nextLocale = locale === "fa" ? "en" : "fa";
  return (
    <Link
      href="/"
      locale={nextLocale}
      className="text-sm font-semibold transition-colors hover:text-primary"
      onClick={() => document.cookie = `portfolio-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`}
      aria-label={label}
    >
      {label}
    </Link>
  );
}
