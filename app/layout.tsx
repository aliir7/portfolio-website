import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.alirezaeii.ir";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "علی رضایی | برنامه‌نویس React و Next.js",
    template: "%s | علی رضایی",
  },
  description:
    "نمونه‌کارها، مهارت‌ها و رزومه علی رضایی، برنامه‌نویس React و Next.js ساکن تهران.",
  applicationName: "پورتفولیوی علی رضایی",
  authors: [{ name: "علی رضایی", url: siteUrl }],
  creator: "علی رضایی",
  publisher: "علی رضایی",
  category: "portfolio",
  alternates: {
    canonical: "/fa",
    languages: {
      fa: "/fa",
      en: "/en",
      "x-default": "/fa",
    },
  },
  openGraph: {
    type: "website",
    siteName: "پورتفولیوی علی رضایی",
    locale: "fa_IR",
    url: siteUrl,
    title: "پورتفولیوی علی رضایی",
    description:
      "نمونه‌کارها، مهارت‌ها و رزومه علی رضایی، برنامه‌نویس React و Next.js.",
    images: [{ url: "/assets/img/user_img.png", alt: "علی رضایی" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "پورتفولیوی علی رضایی",
    description:
      "نمونه‌کارها، مهارت‌ها و رزومه علی رضایی، برنامه‌نویس React و Next.js.",
    images: ["/assets/img/user_img.png"],
  },
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="h-full scroll-smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
