import Vazir from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";

const vazir = Vazir({
  src: "./fonts/Vazir.ttf",
  display: "swap",
});

export const metadata = {
  title: "پورتفولیو",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning={true}>
      <body className={`${vazir.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {/* پس‌زمینه ذرات - ثابت در پشت */}
          <div className="fixed inset-0 -z-10">
            <ParticleBackground />
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,138,0,0.04)] via-transparent to-[rgba(255,138,0,0.02)]" />
          </div>

          <Navbar />
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
