import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header/Header";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "پورتفولیوی علی رضایی",
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
        <ThemeProvider storageKey="theme" defaultTheme="light">
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
