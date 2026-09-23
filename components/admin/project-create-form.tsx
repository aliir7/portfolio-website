"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RiArrowRightLine, RiSaveLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createEmptyProject, localProjectRepository } from "@/lib/admin/project-repository";
import type { ProjectInput } from "@/lib/admin/types";

export default function ProjectCreateForm() {
  const router = useRouter();
  const [form, setForm] = useState<ProjectInput>(createEmptyProject());
  const update = (field: keyof ProjectInput, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const save = async () => {
    await localProjectRepository.create(form);
    router.push("/admin/projects");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium text-primary">پروژه‌ها</p>
          <h2 className="text-3xl font-black">افزودن پروژه</h2>
          <p className="mt-2 text-muted-foreground">اطلاعات پروژهٔ جدید را وارد کن تا به فهرست محتوا اضافه شود.</p>
        </div>
        <Button variant="ghost" onClick={() => router.push("/admin/projects")}><RiArrowRightLine /> بازگشت به پروژه‌ها</Button>
      </div>
      <Card className="glass-panel border-0">
        <CardHeader>
          <CardTitle>اطلاعات پروژه</CardTitle>
          <CardDescription>این نسخه فعلاً داده را در repository محلی نگهداری می‌کند.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="new-project-title" label="عنوان پروژه" value={form.title} onChange={(value) => update("title", value)} placeholder="مثلاً فروشگاه آنلاین" />
            <Field id="new-project-slug" label="Slug" value={form.slug} onChange={(value) => update("slug", value)} placeholder="project-slug" dir="ltr" />
          </div>
          <div className="grid gap-2"><Label htmlFor="new-project-description">توضیحات</Label><Textarea id="new-project-description" value={form.description} onChange={(event) => update("description", event.target.value)} placeholder="توضیح کوتاه پروژه" rows={4} /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2"><Label htmlFor="new-project-category">دسته‌بندی</Label><select id="new-project-category" value={form.category} onChange={(event) => update("category", event.target.value)} className="border-input bg-background/60 focus:ring-ring h-9 rounded-lg border px-3 text-sm outline-none focus:ring-2"><option value="frontend">Frontend</option><option value="fullstack">Full-stack</option><option value="dashboard">Dashboard</option></select></div>
            <Field id="new-project-tech" label="تکنولوژی‌ها" value={form.techStack.join(", ")} onChange={(value) => setForm((current) => ({ ...current, techStack: value.split(",").map((item) => item.trim()).filter(Boolean) }))} placeholder="Next.js, TypeScript, Tailwind" dir="ltr" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="new-project-repo" label="لینک GitHub" value={form.repoUrl} onChange={(value) => update("repoUrl", value)} placeholder="https://github.com/..." dir="ltr" />
            <Field id="new-project-live" label="لینک پروژه" value={form.liveUrl} onChange={(value) => update("liveUrl", value)} placeholder="https://..." dir="ltr" />
          </div>
          <div className="flex justify-end border-t border-border/60 pt-5">
            <Button onClick={save} disabled={!form.title.trim() || !form.slug.trim()}><RiSaveLine /> ذخیره پروژه</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function Field({ id, label, value, onChange, placeholder, dir }: { id: string; label: string; value: string; onChange: (value: string) => void; placeholder?: string; dir?: "ltr" | "rtl" }) {
  return <div className="grid gap-2"><Label htmlFor={id}>{label}</Label><Input id={id} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} dir={dir} /></div>;
}
