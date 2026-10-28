"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "@/lib/actions/admin/projects.actions";
import { notifyResult } from "@/lib/utils/notify";
import type { AdminProject, ProjectInput } from "@/types";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiEditLine,
  RiExternalLinkLine,
  RiSearchLine,
} from "@remixicon/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useConfirm } from "./confirm-provider";
import ProjectForm from "./project-form";

type ProjectsManagerProps = { initialItems: AdminProject[] };

export default function ProjectsManager({
  initialItems,
}: ProjectsManagerProps) {
  const [items, setItems] = useState<AdminProject[]>(initialItems);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<AdminProject | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const confirm = useConfirm();
  const filtered = useMemo(
    () =>
      items.filter((item) =>
        `${item.title.fa} ${item.title.en} ${item.description.fa} ${item.description.en} ${item.techStack.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [items, query],
  );

  const save = async (input: ProjectInput) => {
    const result = editing
      ? await updateProjectAction(editing.id, input)
      : await createProjectAction(input);
    if (!notifyResult(result) || !result.success || !result.data) return;
    const saved = result.data;
    setItems((current) =>
      editing
        ? current.map((item) => (item.id === saved.id ? saved : item))
        : [saved, ...current],
    );
    setFormOpen(false);
  };

  const remove = async (id: string) => {
    const project = items.find((item) => item.id === id);
    const confirmed = await confirm({
      title: "حذف پروژه",
      description: `پروژه‌ی «${project?.title.fa ?? ""}» برای همیشه حذف می‌شود.`,
      confirmLabel: "حذف",
      destructive: true,
    });
    if (!confirmed) return;
    const result = await deleteProjectAction(id);
    if (!notifyResult(result)) return;
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-primary mb-2 text-sm font-medium">محتوا</p>
          <h2 className="text-3xl font-black">مدیریت پروژه‌ها</h2>
          <p className="text-muted-foreground mt-2">
            پروژه‌های نمایش‌داده‌شده در پورتفولیو را مدیریت کن.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <RiAddLine /> افزودن پروژه
          </Link>
        </Button>
      </section>
      <Card className="glass-panel border-0">
        <CardHeader className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle>{items.length} پروژه</CardTitle>
          <div className="relative w-full sm:max-w-xs">
            <RiSearchLine className="text-muted-foreground absolute inset-s-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="جست‌وجوی پروژه..."
              className="ps-9"
            />
          </div>
        </CardHeader>
        <CardContent className="grid gap-3">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="bg-background/45 border-border/60 flex flex-col gap-4 rounded-2xl border p-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="font-bold">{project.title.fa}</h3>
                  <Badge
                    variant={
                      project.status === "published" ? "default" : "secondary"
                    }
                  >
                    {project.status === "published" ? "منتشرشده" : "پیش‌نویس"}
                  </Badge>
                </div>
                <p className="text-muted-foreground line-clamp-1 text-sm">
                  {project.description.fa}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  disabled={!project.repoUrl}
                >
                  <a
                    href={project.repoUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`مشاهده ${project.title.fa}`}
                  >
                    <RiExternalLinkLine />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditing(project);
                    setFormOpen(true);
                  }}
                >
                  <RiEditLine /> ویرایش
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(project.id)}
                  aria-label={`حذف ${project.title.fa}`}
                >
                  <RiDeleteBinLine />
                </Button>
              </div>
            </div>
          ))}
          {!filtered.length && (
            <p className="text-muted-foreground py-10 text-center">
              پروژه‌ای با این جست‌وجو پیدا نشد.
            </p>
          )}
        </CardContent>
      </Card>
      <ProjectForm
        project={editing}
        open={formOpen}
        onOpenChange={setFormOpen}
        onSave={save}
      />
    </div>
  );
}
