"use client";

import { useEffect, useState } from "react";
import { RiAddLine, RiSaveLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import type { AdminProject, ProjectInput } from "@/lib/admin/types";
import { createEmptyProject } from "@/lib/admin/project-repository";

export default function ProjectForm({ project, open, onOpenChange, onSave }: { project: AdminProject | null; open: boolean; onOpenChange: (open: boolean) => void; onSave: (input: ProjectInput) => Promise<void> }) {
  const [form, setForm] = useState<ProjectInput>(createEmptyProject());

  useEffect(() => {
    if (project) {
      const { id: _id, ...input } = project;
      setForm(input);
    } else {
      setForm(createEmptyProject());
    }
  }, [project, open]);

  const update = (field: keyof ProjectInput, value: string) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="glass-panel w-full border-0 sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{project ? "ویرایش پروژه" : "افزودن پروژه"}</SheetTitle>
          <SheetDescription>اطلاعات پروژه را وارد کن. این نسخه فعلاً فقط در حافظه مرورگر نگهداری می‌شود.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-5 overflow-y-auto px-4 pb-4">
          <div className="grid gap-2"><Label htmlFor="project-title">عنوان پروژه</Label><Input id="project-title" value={form.title} onChange={(event) => update("title", event.target.value)} placeholder="مثلاً فروشگاه آنلاین" /></div>
          <div className="grid gap-2"><Label htmlFor="project-slug">Slug</Label><Input id="project-slug" value={form.slug} onChange={(event) => update("slug", event.target.value)} placeholder="project-slug" dir="ltr" /></div>
          <div className="grid gap-2"><Label htmlFor="project-description">توضیحات</Label><Textarea id="project-description" value={form.description} onChange={(event) => update("description", event.target.value)} placeholder="توضیح کوتاه پروژه" /></div>
          <div className="grid gap-2"><Label htmlFor="project-category">دسته‌بندی</Label><select id="project-category" value={form.category} onChange={(event) => update("category", event.target.value)} className="border-input bg-background/60 focus:ring-ring h-9 rounded-lg border px-3 text-sm outline-none focus:ring-2"><option value="frontend">Frontend</option><option value="fullstack">Full-stack</option><option value="dashboard">Dashboard</option></select></div>
          <div className="grid gap-2"><Label htmlFor="project-tech">تکنولوژی‌ها</Label><Input id="project-tech" value={form.techStack.join(", ")} onChange={(event) => setForm((current) => ({ ...current, techStack: event.target.value.split(",").map((item) => item.trim()).filter(Boolean) }))} placeholder="Next.js, TypeScript, Tailwind" dir="ltr" /></div>
          <div className="grid gap-2"><Label htmlFor="project-repo">لینک GitHub</Label><Input id="project-repo" value={form.repoUrl} onChange={(event) => update("repoUrl", event.target.value)} placeholder="https://github.com/..." dir="ltr" /></div>
          <div className="grid gap-2"><Label htmlFor="project-live">لینک پروژه</Label><Input id="project-live" value={form.liveUrl} onChange={(event) => update("liveUrl", event.target.value)} placeholder="https://..." dir="ltr" /></div>
        </div>
        <SheetFooter>
          <Button onClick={() => onSave(form)} disabled={!form.title.trim() || !form.slug.trim()}><RiSaveLine /> ذخیره پروژه</Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>انصراف</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
