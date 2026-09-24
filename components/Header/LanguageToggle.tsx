"use client";

import { RiArrowDownSLine, RiCheckLine, RiTranslate2 } from "@remixicon/react";
import { useLocale } from "@/lib/i18n";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageToggle({ label }: { label: string }) {
  const locale = useLocale();

  const languages = [
    { value: "fa" as const, label: "فارسی" },
    { value: "en" as const, label: "English" },
  ];

  const setLocaleCookie = (nextLocale: "fa" | "en") => {
    document.cookie = `portfolio-locale=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild className="z-50">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 px-2 text-sm font-semibold"
          aria-label={label}
        >
          <RiTranslate2 className="size-4" />
          <span className="capitalize">{locale === "fa" ? "fa" : "en"}</span>
          <RiArrowDownSLine className="text-muted-foreground size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-36">
        {languages.map((language, index) => (
          <div key={language.value}>
            <DropdownMenuItem asChild className="justify-between">
              <Link
                href="/"
                locale={language.value}
                onClick={() => setLocaleCookie(language.value)}
              >
                <span>{language.label}</span>

                {locale === language.value && (
                  <RiCheckLine className="text-primary size-4" />
                )}
              </Link>
            </DropdownMenuItem>

            {index < languages.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
