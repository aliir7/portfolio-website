"use client";

import { useEffect } from "react";
import ErrorState from "@/components/ErrorState";

// The admin panel is Persian-only, so its texts are not translated.
export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      title="مشکلی پیش آمد"
      description="در بارگذاری این بخش خطایی رخ داد. دوباره تلاش کن یا به داشبورد برگرد."
      retryLabel="تلاش دوباره"
      homeLabel="داشبورد"
      homeHref="/admin"
      onRetry={reset}
    />
  );
}
