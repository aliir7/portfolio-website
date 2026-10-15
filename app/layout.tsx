import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";


// Language-dependent text (title, description, Open Graph, ...) is built from the database in
// `app/[locale]/layout.tsx`; only technical defaults live here.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  category: "portfolio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// ⚠️ root layout عمداً <html>/<body> نمی‌سازد؛
// این کار را [locale] و admin انجام می‌دهند تا dir پویا باشد.
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}