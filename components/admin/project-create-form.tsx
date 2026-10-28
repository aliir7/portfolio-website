"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiArrowRightLine, RiSaveLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { createProjectAction } from "@/lib/actions/admin/projects.actions";
import { notifyResult } from "@/lib/utils/notify";
import { projectSchema } from "@/lib/validations/projects.validations";
import type { ProjectInput } from "@/types";
import ProjectFields, { emptyProject } from "./project-fields";
import { useFormValidation } from "./use-form-validation";
import { useUnsavedChangesGuard } from "./use-unsaved-changes-guard";

export default function ProjectCreateForm() {
  const router = useRouter();
  const [form, setForm] = useState<ProjectInput>(emptyProject);
  const validation = useFormValidation(projectSchema, form);
  useUnsavedChangesGuard(validation.isDirty);

  const save = () =>
    validation.submit(async () => {
      const ok = notifyResult(await createProjectAction(form));
      if (ok) router.push("/admin/projects");
      return ok;
    });

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-primary mb-2 text-sm font-medium">پروژه‌ها</p>
          <h2 className="text-3xl font-black">افزودن پروژه</h2>
          <p className="text-muted-foreground mt-2">
            اطلاعات پروژهٔ جدید را وارد کن.
          </p>
        </div>
        <Button variant="ghost" onClick={() => router.push("/admin/projects")}>
          <RiArrowRightLine /> بازگشت به پروژه‌ها
        </Button>
      </div>
      <Card className="glass-panel border-0">
        <CardHeader>
          <CardTitle>اطلاعات پروژه</CardTitle>
          <CardDescription>
            عنوان و توضیحات به هر دو زبان لازم است.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5">
          <ProjectFields
            idPrefix="new-project"
            form={form}
            onChange={setForm}
            validation={validation}
          />
          <div className="border-border/60 flex justify-end border-t pt-5">
            <Button onClick={save} disabled={validation.pending}>
              {validation.pending ? <Spinner /> : <RiSaveLine />} ذخیره پروژه
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
