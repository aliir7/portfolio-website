import type { Metadata } from "next";
import AdminShell from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/auth-guard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "پنل مدیریت",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();
  return <AdminShell>{children}</AdminShell>;
}
