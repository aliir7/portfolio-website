"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RiAddLine, RiDeleteBinLine, RiEditLine, RiExternalLinkLine, RiSearchLine } from "@remixicon/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ProjectForm from "./project-form";
import { localProjectRepository } from "@/lib/admin/project-repository";
import type { AdminProject, ProjectInput } from "@/lib/admin/types";
import { mockProjects } from "@/lib/admin/mock-data";

export default function ProjectsManager() {
  const [items, setItems] = useState<AdminProject[]>(mockProjects);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<AdminProject | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const filtered = useMemo(() => items.filter((item) => `${item.title} ${item.description} ${item.techStack.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [items, query]);

  const save = async (input: ProjectInput) => {
    const saved = editing ? await localProjectRepository.update(editing.id, input) : await localProjectRepository.create(input);
    setItems((current) => editing ? current.map((item) => item.id === saved.id ? saved : item) : [saved, ...current]);
    setFormOpen(false);
    setEditing(null);
  };

  const remove = async (id: string) => {
    if (!window.confirm("این پروژه حذف شود؟")) return;
    await localProjectRepository.delete(id);
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="mb-2 text-sm font-medium text-primary">محتوا</p><h2 className="text-3xl font-black">مدیریت پروژه‌ها</h2><p className="mt-2 text-muted-foreground">پروژه‌های نمایش‌داده‌شده در پورتفولیو را مدیریت کن.</p></div>
        <Button asChild><Link href="/admin/projects/new"><RiAddLine /> افزودن پروژه</Link></Button>
      </section>
      <Card className="glass-panel border-0">
        <CardHeader className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>{items.length} پروژه</CardTitle>
          <div className="relative w-full sm:max-w-xs"><RiSearchLine className="text-muted-foreground absolute start-3 top-1/2 size-4 -translate-y-1/2" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجوی پروژه..." className="ps-9" /></div>
        </CardHeader>
        <CardContent className="grid gap-3">
          {filtered.map((project) => (
            <div key={project.id} className="bg-background/45 border-border/60 flex flex-col gap-4 rounded-2xl border p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="min-w-0"><div className="mb-2 flex flex-wrap items-center gap-2"><h3 className="font-bold">{project.title}</h3><Badge variant={project.status === "published" ? "default" : "secondary"}>{project.status === "published" ? "منتشرشده" : "پیش‌نویس"}</Badge></div><p className="line-clamp-1 text-sm text-muted-foreground">{project.description}</p><div className="mt-3 flex flex-wrap gap-1.5">{project.techStack.map((tech) => <Badge key={tech} variant="outline">{tech}</Badge>)}</div></div>
              <div className="flex shrink-0 items-center gap-2"><Button variant="ghost" size="icon" asChild disabled={!project.repoUrl}><a href={project.repoUrl || "#"} target="_blank" rel="noopener noreferrer" aria-label={`مشاهده ${project.title}`}><RiExternalLinkLine /></a></Button><Button variant="outline" size="sm" onClick={() => { setEditing(project); setFormOpen(true); }}><RiEditLine /> ویرایش</Button><Button variant="destructive" size="icon" onClick={() => remove(project.id)} aria-label={`حذف ${project.title}`}><RiDeleteBinLine /></Button></div>
            </div>
          ))}
          {!filtered.length && <p className="py-10 text-center text-muted-foreground">پروژه‌ای با این جست‌وجو پیدا نشد.</p>}
        </CardContent>
      </Card>
      <ProjectForm project={editing} open={formOpen} onOpenChange={(open) => { setFormOpen(open); if (!open) setEditing(null); }} onSave={save} />
    </div>
  );
}
