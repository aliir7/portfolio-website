"use client";
import { Toaster } from "sonner";
import Header from "@/components/Header/Header";
import type { Locale } from "@/i18n/routing";
import { ThemeProvider } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from "next-intl";
import type { AbstractIntlMessages } from "next-intl";

export default function Providers({
  locale,
  messages,
  timeZone,
  children,
}: {
  locale: Locale;
  messages: AbstractIntlMessages;
  timeZone?: string;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={timeZone}
    >
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
    </NextIntlClientProvider>
  );
}
