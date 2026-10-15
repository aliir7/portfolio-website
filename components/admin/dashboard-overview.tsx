import Link from "next/link";
import type { ReactNode } from "react";
import {
  RiArrowLeftLine,
  RiArticleLine,
  RiDraftLine,
  RiExternalLinkLine,
  RiFolderOpenLine,
  RiMailLine,
} from "@remixicon/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils/format-date";
import type { DashboardData } from "@/query/dashboard.query";

const statusLabel = (status: "draft" | "published") => (status === "published" ? "منتشرشده" : "پیش‌نویس");

function ListCard({ title, href, children }: { title: string; href: string; children: ReactNode }) {
  return (
    <Card className="glass-panel min-w-0 overflow-hidden border-0">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button asChild variant="ghost" size="sm">
          <Link href={href}>مشاهده همه <RiArrowLeftLine /></Link>
        </Button>
      </CardHeader>
      <CardContent className="grid gap-3">{children}</CardContent>
    </Card>
  );
}

function Row({ icon: Icon, title, detail, badge }: { icon: typeof RiMailLine; title: string; detail: string; badge?: ReactNode }) {
  return (
    <div className="bg-background/45 border-border/60 flex min-w-0 items-center gap-3 rounded-2xl border p-3">
      <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-bold" dir="auto">{title}</h3>
        <p className="text-muted-foreground truncate text-sm" dir="auto">{detail}</p>
      </div>
      {badge}
    </div>
  );
}

export default function DashboardOverview({ data }: { data: DashboardData }) {
  const { counts, recentMessages, recentPosts, recentProjects } = data;
  const stats = [
    { label: "پروژه‌ها", value: counts.projectCount, detail: `${counts.publishedProjectCount} منتشرشده`, icon: RiFolderOpenLine, href: "/admin/projects" },
    { label: "پست‌های بلاگ", value: counts.postCount, detail: `${counts.publishedPostCount} منتشرشده`, icon: RiArticleLine, href: "/admin/blog" },
    { label: "پیام‌های خوانده‌نشده", value: counts.unreadMessageCount, detail: `از ${counts.messageCount} پیام`, icon: RiMailLine, href: "/admin/messages" },
    {
      label: "پیش‌نویس‌ها",
      value: counts.projectCount - counts.publishedProjectCount + counts.postCount - counts.publishedPostCount,
      detail: "پروژه و پست در انتظار انتشار",
      icon: RiDraftLine,
      href: "/admin/blog",
    },
  ];

  return (
    <div className="min-w-0 space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">نمای کلی</p>
          <h2 className="text-3xl font-black tracking-tight">داشبورد</h2>
          <p className="mt-2 text-muted-foreground">وضعیت محتوای پورتفولیو را از اینجا مدیریت کن.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild><Link href="/admin/blog/new">پست جدید</Link></Button>
          <Button asChild variant="outline"><Link href="/admin/projects/new">پروژه جدید</Link></Button>
          <Button asChild variant="ghost"><Link href="/fa" target="_blank">مشاهده وب‌سایت <RiExternalLinkLine /></Link></Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="glass-panel hover:border-primary/60 h-full border transition-colors">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className="text-primary size-6" />
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-black">{stat.value}</p>
                <p className="text-muted-foreground mt-2 text-xs">{stat.detail}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section className="grid min-w-0 gap-4 xl:grid-cols-3">
        <ListCard title="پیام‌های اخیر" href="/admin/messages">
          {recentMessages.length === 0 && <p className="text-muted-foreground text-sm">پیامی وجود ندارد.</p>}
          {recentMessages.map((message) => (
            <Row
              key={message.id}
              icon={RiMailLine}
              title={message.name}
              detail={`${formatDate(message.createdAt, "fa")} · ${message.message}`}
              badge={!message.readAt && <Badge className="shrink-0">جدید</Badge>}
            />
          ))}
        </ListCard>
        <ListCard title="پست‌های اخیر" href="/admin/blog">
          {recentPosts.length === 0 && <p className="text-muted-foreground text-sm">پستی وجود ندارد.</p>}
          {recentPosts.map((post) => (
            <Row
              key={post.id}
              icon={RiArticleLine}
              title={post.title}
              detail={formatDate(post.updatedAt, "fa")}
              badge={<Badge className="shrink-0" variant={post.status === "published" ? "default" : "secondary"}>{statusLabel(post.status)}</Badge>}
            />
          ))}
        </ListCard>
        <ListCard title="پروژه‌های اخیر" href="/admin/projects">
          {recentProjects.length === 0 && <p className="text-muted-foreground text-sm">پروژه‌ای وجود ندارد.</p>}
          {recentProjects.map((project) => (
            <Row
              key={project.id}
              icon={RiFolderOpenLine}
              title={project.title.fa}
              detail={project.description.fa}
              badge={<Badge className="shrink-0" variant={project.status === "published" ? "default" : "secondary"}>{statusLabel(project.status)}</Badge>}
            />
          ))}
        </ListCard>
      </section>
    </div>
  );
}
