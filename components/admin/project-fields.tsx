"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { projectCategories, publishStatuses } from "@/db/schema/values";
import { uploadFolders } from "@/lib/constants";
import { emptyLocalized } from "@/lib/localize";
import type { AdminProject, ProjectCategory, ProjectInput, ProjectStatus } from "@/types";
import FieldError from "./field-error";
import LocalizedField from "./localized-field";
import SelectField from "./select-field";
import TextField from "./text-field";
import UploadField from "./upload-field";
import type { FormValidation } from "./use-form-validation";

export const emptyProject: ProjectInput = {
  title: emptyLocalized(),
  slug: "",
  description: emptyLocalized(),
  content: emptyLocalized(),
  category: "frontend",
  techStack: [],
  repoUrl: "",
  liveUrl: "",
  status: "draft",
};

export const toProjectInput = (project: AdminProject): ProjectInput => ({
  title: project.title,
  slug: project.slug,
  description: project.description,
  content: project.content,
  category: project.category,
  techStack: project.techStack,
  image: project.image,
  repoUrl: project.repoUrl ?? "",
  liveUrl: project.liveUrl ?? "",
  status: project.status,
});

const categoryLabels: Record<ProjectCategory, string> = {
  frontend: "Frontend",
  fullstack: "Full-stack",
  dashboard: "Dashboard",
};

const statusLabels: Record<ProjectStatus, string> = {
  draft: "پیش‌نویس",
  published: "منتشرشده",
};

const parseTechStack = (text: string) =>
  text.split(",").map((item) => item.trim()).filter(Boolean);

type TechProps = { id: string; value: string[]; onChange: (value: string[]) => void; error?: string; onBlur?: () => void };

/** Keeps the raw text while typing, so a trailing comma is not swallowed by parsing. */
function TechStackField({ id, value, onChange, error, onBlur }: TechProps) {
  const [text, setText] = useState(value.join(", "));

  useEffect(() => {
    if (parseTechStack(text).join("|") !== value.join("|")) setText(value.join(", "));
  }, [value, text]);

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>تکنولوژی‌ها</Label>
      <Input
        id={id}
        dir="ltr"
        value={text}
        placeholder="Next.js, TypeScript, Tailwind"
        onBlur={onBlur}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => {
          setText(event.target.value);
          onChange(parseTechStack(event.target.value));
        }}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

type Props = { idPrefix: string; form: ProjectInput; onChange: (form: ProjectInput) => void; validation: FormValidation };

/** The project form fields, shared by the "new project" page and the edit sheet. */
export default function ProjectFields({ idPrefix, form, onChange, validation: v }: Props) {
  const set = <K extends keyof ProjectInput>(key: K, value: ProjectInput[K]) =>
    onChange({ ...form, [key]: value });
  const id = (name: string) => `${idPrefix}-${name}`;

  return (
    <>
      <LocalizedField id={id("title")} label="عنوان پروژه" value={form.title} onChange={(value) => set("title", value)} {...v.localized("title")} />
      <TextField id={id("slug")} label="Slug" value={form.slug} placeholder="project-slug" onChange={(value) => set("slug", value)} {...v.field("slug")} />
      <LocalizedField id={id("description")} label="توضیحات" value={form.description} onChange={(value) => set("description", value)} multiline rows={4} {...v.localized("description")} />
      <LocalizedField id={id("content")} label="شرح کامل (Markdown، اختیاری)" value={form.content} onChange={(value) => set("content", value)} multiline rows={8} {...v.localized("content")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField id={id("category")} label="دسته‌بندی" value={form.category} options={projectCategories.map((value) => ({ value, label: categoryLabels[value] }))} onChange={(value) => set("category", value)} {...v.field("category")} />
        <SelectField id={id("status")} label="وضعیت" value={form.status} options={publishStatuses.map((value) => ({ value, label: statusLabels[value] }))} onChange={(value) => set("status", value)} {...v.field("status")} />
      </div>
      <UploadField id={id("image")} label="تصویر پروژه" folder={uploadFolders.projects} value={form.image ?? ""} onChange={(value) => set("image", value)} {...v.field("image")} />
      <TechStackField id={id("tech")} value={form.techStack} onChange={(value) => set("techStack", value)} {...v.field("techStack")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id={id("repo")} label="لینک GitHub" value={form.repoUrl} placeholder="https://github.com/..." onChange={(value) => set("repoUrl", value)} {...v.field("repoUrl")} />
        <TextField id={id("live")} label="لینک پروژه" value={form.liveUrl} placeholder="https://..." onChange={(value) => set("liveUrl", value)} {...v.field("liveUrl")} />
      </div>
    </>
  );
}
