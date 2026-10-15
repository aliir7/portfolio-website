"use client";

import "./globals.css";
import ErrorState from "@/components/ErrorState";

// Last resort: replaces the whole document, so it must render <html>/<body> itself and cannot use
// translations or providers. Both languages are shown.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ErrorState
          title="مشکلی پیش آمد / Something went wrong"
          description="سایت موقتاً در دسترس نیست. دوباره تلاش کن. / The site is temporarily unavailable. Please try again."
          retryLabel="تلاش دوباره / Try again"
          homeLabel="صفحه‌ی اصلی / Home"
          onRetry={reset}
        />
      </body>
    </html>
  );
}
