"use client";

import { useEffect, useMemo, useState } from "react";
import { projectSchema } from "@/lib/validations/projects.validations";
import type { AdminProject, ProjectInput } from "@/types";
import FormDialog from "./form-dialog";
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
  const initial = useMemo(
    () => (project ? toProjectInput(project) : emptyProject),
    [project],
  );
  const [form, setForm] = useState<ProjectInput>(initial);
  const validation = useFormValidation(projectSchema, form);
  const { reset } = validation;

  // Every time the dialog opens (or another project is chosen) start from the saved values.
  useEffect(() => {
    setForm(initial);
    reset();
  }, [initial, open, reset]);

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={project ? "ویرایش پروژه" : "افزودن پروژه"}
      description="عنوان و توضیحات را به هر دو زبان وارد کن. تغییرات در دیتابیس ذخیره می‌شود."
      submitLabel="ذخیره پروژه"
      dirty={JSON.stringify(form) !== JSON.stringify(initial)}
      pending={validation.pending}
      onSubmit={() => validation.submit(() => onSave(form))}
    >
      <ProjectFields
        idPrefix="project"
        form={form}
        onChange={setForm}
        validation={validation}
      />
    </FormDialog>
  );
}
