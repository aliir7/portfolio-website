"use client";

import Link from "next/link";
import { RiArrowLeftLine, RiCodeBoxLine, RiDraftLine, RiExternalLinkLine, RiFolderOpenLine, RiPulseLine } from "@remixicon/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockProjects } from "@/lib/admin/mock-data";

const stats = [
  { label: "کل پروژه‌ها", value: mockProjects.length, icon: RiCodeBoxLine, detail: "پروژه ثبت‌شده" },
  { label: "منتشرشده", value: mockProjects.filter((project) => project.status === "published").length, icon: RiPulseLine, detail: "قابل نمایش در سایت" },
  { label: "پیش‌نویس", value: mockProjects.filter((project) => project.status === "draft").length, icon: RiDraftLine, detail: "در انتظار انتشار" },
];

export default function DashboardOverview() {
  return (
    <div className="min-w-0 space-y-8">
      <section>
        <p className="mb-2 text-sm font-medium text-primary">نمای کلی</p>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tight">خوش آمدی، علی</h2>
            <p className="mt-2 text-muted-foreground">وضعیت محتوای پورتفولیو را از اینجا مدیریت کن.</p>
          </div>
          <Button asChild>
            <Link href="/admin/projects">مدیریت پروژه‌ها <RiArrowLeftLine /></Link>
          </Button>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="glass-panel border-0">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className="text-primary size-6" />
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-black">{stat.value}</p>
              <p className="mt-2 text-xs text-muted-foreground">{stat.detail}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      <section className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,0.7fr)]">
        <Card className="glass-panel min-w-0 border-0 overflow-hidden">
          <CardHeader className="flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>پروژه‌های اخیر</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">آخرین محتوای ثبت‌شده در پورتفولیو</p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/projects">مشاهده همه <RiArrowLeftLine /></Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-3">
            {mockProjects.map((project) => (
              <div key={project.id} className="bg-background/45 flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-border/60 p-3 sm:p-4">
                <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
                  <RiFolderOpenLine className="size-5" />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <h3 className="truncate font-bold">{project.title}</h3>
                  <p className="truncate text-sm text-muted-foreground">{project.description}</p>
                </div>
                <Badge className="shrink-0" variant={project.status === "published" ? "default" : "secondary"}>{project.status === "published" ? "منتشرشده" : "پیش‌نویس"}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="glass-panel min-w-0 border-0">
          <CardHeader>
            <CardTitle>شروع سریع</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">ابزارهای پرکاربرد مدیریت محتوا</p>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Link href="/admin/projects" className="bg-primary/10 hover:bg-primary/20 flex items-center justify-between rounded-2xl p-4 transition-colors">
              <span className="font-medium">مدیریت پروژه‌ها</span>
              <RiArrowLeftLine className="text-primary size-5" />
            </Link>
            <Link href="/fa" className="bg-background/45 hover:bg-background/70 border-border/60 flex items-center justify-between rounded-2xl border p-4 transition-colors">
              <span className="font-medium">مشاهده وب‌سایت</span>
              <RiExternalLinkLine className="text-muted-foreground size-5" />
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
