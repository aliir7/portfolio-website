"use client";

import { Toaster } from "sonner";
import Header from "@/components/Header/Header";
import { LocaleProvider, type Locale } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { cn } from "@/lib/utils";

export default function Providers({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider locale={locale}>
      <ThemeProvider>
        <div className={cn("min-h-screen", locale === "en" && "font-english")}>
          <Header />
          {children}
          <Toaster
            richColors
            position={locale === "fa" ? "bottom-left" : "bottom-right"}
          />
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
}
