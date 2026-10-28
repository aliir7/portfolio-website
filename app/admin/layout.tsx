import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import AdminShell from "@/components/admin/admin-shell";
import { ConfirmProvider } from "@/components/admin/confirm-provider";
import { requireAdmin } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "پنل مدیریت",
  robots: { index: false, follow: false },
};

// admin خارج از [locale] است و فارسی/RTL ثابت → html/body را خودش می‌سازد
export default async function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  await requireAdmin();

  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ConfirmProvider>
          <AdminShell>{children}</AdminShell>
        </ConfirmProvider>
        <Toaster richColors position="bottom-left" dir="rtl" />
      </body>
    </html>
  );
}
