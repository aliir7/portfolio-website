"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { projectSchema } from "@/lib/validations/projects.validations";
import type { AdminProject, ProjectInput } from "@/types";
import { RiSaveLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import ProjectFields, { emptyProject, toProjectInput } from "./project-fields";
import { useFormValidation } from "./use-form-validation";

type Props = {
  project: AdminProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (input: ProjectInput) => Promise<void>;
};

export default function ProjectForm({
  project,
  open,
  onOpenChange,
  onSave,
}: Props) {
  const [form, setForm] = useState<ProjectInput>(emptyProject);
  const validation = useFormValidation(projectSchema, form);
  const { reset } = validation;

  useEffect(() => {
    setForm(project ? toProjectInput(project) : emptyProject);
    reset();
  }, [project, open, reset]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="glass-panel w-full border-0 sm:max-w-xl"
      >
        <SheetHeader>
          <SheetTitle>{project ? "ویرایش پروژه" : "افزودن پروژه"}</SheetTitle>
          <SheetDescription>
            عنوان و توضیحات را به هر دو زبان وارد کن. تغییرات در دیتابیس ذخیره
            می‌شود.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-5 overflow-y-auto px-4 pb-4">
          <ProjectFields
            idPrefix="project"
            form={form}
            onChange={setForm}
            validation={validation}
          />
        </div>
        <SheetFooter>
          <Button
            onClick={() => validation.submit(() => onSave(form))}
            disabled={validation.pending}
          >
            {validation.pending ? <Spinner /> : <RiSaveLine />} ذخیره پروژه
          </Button>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            انصراف
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
