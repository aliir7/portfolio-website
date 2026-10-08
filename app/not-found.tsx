import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AstronautSVG } from "@/components/not-found/astronaut-svg";

export default function RootNotFound() {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <main className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-24 text-center">
          <div className="relative w-full max-w-md">
            <span className="from-primary to-primary-dark pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 bg-linear-to-b bg-clip-text text-[8rem] leading-none font-black text-transparent select-none sm:text-[11rem]">
              404
            </span>
            <AstronautSVG
              label="Page not found"
              className="mx-auto w-72 sm:w-80"
            />
          </div>
          <div className="grid gap-3">
            <h1 className="text-3xl font-black sm:text-4xl">
              صفحه پیدا نشد / Page not found
            </h1>
            <p className="text-muted-foreground mx-auto max-w-sm text-sm sm:text-base">
              مسیری که دنبال آن بودید وجود ندارد.
            </p>
          </div>
          <Button asChild variant="cta">
            <Link href="/fa">بازگشت به خانه / Back home</Link>
          </Button>
        </main>
      </body>
    </html>
  );
}
