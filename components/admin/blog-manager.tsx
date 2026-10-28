"use client";

import Link from "next/link";
import { useState } from "react";
import { RiAddLine, RiDeleteBinLine, RiEditLine, RiExternalLinkLine } from "@remixicon/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { deleteBlogPostAction } from "@/lib/actions/blog.actions";
import { formatDate } from "@/lib/utils/format-date";
import { notifyResult } from "@/lib/utils/notify";
import { useConfirm } from "./confirm-provider";
import type { BlogPostWithTags } from "@/types";

export default function BlogManager({ initialPosts }: { initialPosts: BlogPostWithTags[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const confirm = useConfirm();

  const remove = async (post: BlogPostWithTags) => {
    const confirmed = await confirm({
      title: "حذف پست",
      description: `پست «${post.title}» برای همیشه حذف می‌شود و تصویرهای آپلودشده‌ی آن هم پاک می‌شوند.`,
      confirmLabel: "حذف",
      destructive: true,
    });
    if (!confirmed) return;
    if (notifyResult(await deleteBlogPostAction(post.id))) {
      setPosts((current) => current.filter((item) => item.id !== post.id));
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">محتوا</p>
          <h2 className="text-3xl font-black">بلاگ</h2>
          <p className="mt-2 text-muted-foreground">پیش‌نویس‌ها و پست‌های منتشرشده.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline"><Link href="/admin/blog/tags">مدیریت تگ‌ها</Link></Button>
          <Button asChild><Link href="/admin/blog/new"><RiAddLine /> پست جدید</Link></Button>
        </div>
      </section>
      {posts.length === 0 && <p className="text-muted-foreground rounded-2xl border border-dashed p-8 text-center">هنوز پستی ثبت نشده است.</p>}
      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="glass-panel border-0">
            <CardContent className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold" dir="auto">{post.title}</h3>
                  <Badge variant={post.status === "published" ? "default" : "outline"}>{post.status === "published" ? "منتشرشده" : "پیش‌نویس"}</Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  /{post.slug} · {formatDate(post.publishedAt ?? post.updatedAt, "fa")}
                  {post.tags.length > 0 && ` · ${post.tags.map((tag) => tag.name).join("، ")}`}
                </p>
              </div>
              <div className="flex shrink-0 gap-1">
                {post.status === "published" && (
                  <Button variant="ghost" size="icon" asChild aria-label="مشاهده در سایت">
                    <Link href={`/fa/blog/${post.slug}`} target="_blank"><RiExternalLinkLine /></Link>
                  </Button>
                )}
                <Button variant="ghost" size="icon" asChild aria-label="ویرایش"><Link href={`/admin/blog/${post.id}`}><RiEditLine /></Link></Button>
                <Button variant="ghost" size="icon" aria-label="حذف" onClick={() => remove(post)}><RiDeleteBinLine /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
