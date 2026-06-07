import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

// متادیتای پروژه (می‌توانی تغییر دهی)
export const metadata: Metadata = {
  title: "پورتفولیوی زوئی میلر",
  description: "نمونه کارها و رزومه حرفه‌ای",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="h-full scroll-smooth"
      suppressHydrationWarning
    >
      <body className={cn("min-h-screen font-sans antialiased")}>
        {children}
      </body>
    </html>
  );
}
