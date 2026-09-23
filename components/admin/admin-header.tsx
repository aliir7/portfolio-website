"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddLine, RiArrowLeftSLine, RiExternalLinkLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AdminThemeToggle from "./admin-theme-toggle";

const pageLabels: Record<string, string> = {
  "/admin": "داشبورد",
  "/admin/projects": "پروژه‌ها",
  "/admin/projects/new": "افزودن پروژه",
  "/admin/profile": "پروفایل",
  "/admin/profile/skills/new": "افزودن مهارت",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const pageLabel = pageLabels[pathname] ?? "پنل مدیریت";
  const isProjectsPage = pathname === "/admin/projects";

  return (
    <header className="glass-panel sticky top-4 z-10 mx-4 mt-4 rounded-3xl px-4 py-3 lg:mx-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="shrink-0 md:hidden" />
          <div className="min-w-0">
            <nav aria-label="مسیر صفحه" className="text-muted-foreground mb-1 flex items-center gap-1 text-xs">
              <Link href="/admin" className="transition-colors hover:text-primary">
                پنل مدیریت
              </Link>
              {pathname !== "/admin" && (
                <>
                  <RiArrowLeftSLine className="size-3.5" aria-hidden="true" />
                  <span>{pageLabel}</span>
                </>
              )}
            </nav>
            <h1 className="truncate text-lg font-bold">{pageLabel}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isProjectsPage && (
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/admin/projects/new">
                <RiAddLine />
                پروژه جدید
              </Link>
            </Button>
          )}
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link href="/fa">
              <RiExternalLinkLine />
              مشاهده سایت
            </Link>
          </Button>
          <AdminThemeToggle />
        </div>
      </div>
    </header>
  );
}
