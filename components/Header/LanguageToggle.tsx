"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";

export default function LanguageToggle({ label }: { label: string }) {
  const locale = useLocale();
  const nextLocale = locale === "fa" ? "en" : "fa";
  return (
    <Link
      href={`/${nextLocale}`}
      className="text-sm font-semibold transition-colors hover:text-primary"
      onClick={() => document.cookie = `portfolio-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`}
      aria-label={label}
    >
      {label}
    </Link>
  );
}
