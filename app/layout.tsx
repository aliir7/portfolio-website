import type { Metadata } from "next";
import Vazir from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Portfolio - AliRezaei",
  description: "Personal website for resume",
};

const vazir = Vazir({
  src: "./fonts/Vazir.ttf",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className="snap-y snap-mandatory scroll-smooth">
      <body
        className={`${vazir.className} "min-h-screen overflow-x-hidden bg-gradient-to-b from-[#12071f] to-[#2f204e] text-white antialiased`}
      >
        <ThemeProvider defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
