"use client";

import Link from "next/link";
import { useState } from "react";
import { RiArrowRightLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import TagEditor, { type TagWithCount } from "./tag-editor";

export default function TagsManager({ initialTags }: { initialTags: TagWithCount[] }) {
  const [tags, setTags] = useState(initialTags);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">بلاگ</p>
          <h2 className="text-3xl font-black">تگ‌ها</h2>
          <p className="mt-2 text-muted-foreground">تگ‌ها را بساز، ویرایش کن یا حذف کن. حذف تگ پست‌ها را پاک نمی‌کند.</p>
        </div>
        <Button variant="ghost" asChild><Link href="/admin/blog"><RiArrowRightLine /> بازگشت به بلاگ</Link></Button>
      </section>

      <div className="grid gap-4">
        <h3 className="font-bold">تگ جدید</h3>
        <TagEditor onSaved={(tag) => setTags((current) => [...current, { ...tag, postCount: 0 }])} />
        <h3 className="mt-4 font-bold">{tags.length} تگ</h3>
        {tags.length === 0 && <p className="text-muted-foreground rounded-2xl border border-dashed p-8 text-center">هنوز تگی ساخته نشده است.</p>}
        {tags.map((tag) => (
          <TagEditor
            key={tag.id}
            tag={tag}
            onSaved={(saved) => setTags((current) => current.map((item) => (item.id === saved.id ? { ...item, ...saved } : item)))}
            onDeleted={() => setTags((current) => current.filter((item) => item.id !== tag.id))}
          />
        ))}
      </div>
    </div>
  );
}
