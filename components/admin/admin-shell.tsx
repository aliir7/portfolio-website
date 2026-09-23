"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDashboardLine, RiExternalLinkLine, RiFolderChartLine, RiUserSettingsLine } from "@remixicon/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import AdminHeader from "./admin-header";
import { ThemeProvider } from "@/lib/theme";

const links = [
  { href: "/admin", label: "داشبورد", icon: RiDashboardLine },
  { href: "/admin/projects", label: "پروژه‌ها", icon: RiFolderChartLine },
  { href: "/admin/profile", label: "پروفایل و مهارت‌ها", icon: RiUserSettingsLine },
];

export default function AdminShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div dir="rtl" className="admin-shell relative min-h-screen w-full overflow-x-hidden bg-background">
        <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
          <div className="absolute -top-32 -start-24 size-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="bg-secondary/40 absolute -end-32 top-1/3 size-112 rounded-full blur-3xl" />
          <div className="bg-primary/10 absolute bottom-0 start-1/3 size-96 rounded-full blur-3xl" />
        </div>
          <AdminSidebar />
          <AdminFrame>{children}</AdminFrame>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

function AdminFrame({ children }: Readonly<{ children: React.ReactNode }>) {
  const { open } = useSidebar();
  return (
    <div className={cn("relative z-10 min-h-screen min-w-0 flex-1 overflow-x-hidden transition-[padding] duration-200", open ? "md:pl-72" : "md:pl-28")}>
      <AdminHeader />
      <main className="mx-auto w-full max-w-[1600px] min-w-0 px-4 py-8 lg:px-8">{children}</main>
    </div>
  );
}

function AdminSidebar() {
  const pathname = usePathname();
  const { open, setOpenMobile, isMobile } = useSidebar();

  return (
    <Sidebar side="right" className="border-white/20 bg-white/45 shadow-2xl shadow-black/10 backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
      <SidebarHeader>
        <SidebarTrigger className="absolute top-1/2 end-[-52px] -translate-y-1/2 rounded-s-xl rounded-e-none border border-border/60 bg-background/80 shadow-md backdrop-blur-xl" />
        <div className={cn("flex items-center gap-3 px-2 py-2", !open && "justify-center px-0")}>
          <div className="bg-primary text-primary-foreground flex size-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black">ع</div>
          {open && (
            <div className="min-w-0">
              <p className="truncate font-bold">پنل ادمین</p>
              <p className="text-xs text-muted-foreground">نسخه نمایشی</p>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {open && <SidebarGroupLabel>ناوبری اصلی</SidebarGroupLabel>}
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton asChild isActive={pathname === link.href} tooltip={link.label}>
                  <Link href={link.href} onClick={() => isMobile && setOpenMobile(false)}>
                    <link.icon className="size-5 shrink-0" />
                    <span className="truncate">{link.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Link href="/fa" className={cn("text-muted-foreground flex items-center gap-2 rounded-2xl px-3 py-2 text-sm transition-colors hover:bg-primary/10 hover:text-foreground", !open && "justify-center px-0")} title={!open ? "مشاهده سایت" : undefined}>
          <RiExternalLinkLine className="size-4 shrink-0" />
          {open && "مشاهده سایت"}
        </Link>
        {open && <div className="border-border/60 bg-background/40 rounded-2xl border p-3 text-xs text-muted-foreground">حالت آزمایشی · داده‌ها local هستند</div>}
      </SidebarFooter>
    </Sidebar>
  );
}
