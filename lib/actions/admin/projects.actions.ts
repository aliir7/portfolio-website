"use server";

import { desc, eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";
import { projectSchema } from "@/lib/validations";
import { withAction } from "@/lib/utils";
import type { ActionResult, AdminProject } from "@/types";

export async function createProjectAction(input: unknown): Promise<ActionResult<AdminProject>> {
  await requireAdmin();
  const t = await getTranslations();
  const parsed = projectSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: { type: "zod", issues: parsed.error.issues }, message: t("actions.projects.invalidForm") };
  }

  return withAction(async () => {
    const project = { id: crypto.randomUUID(), ...parsed.data };
    await db.insert(projects).values(project);
    return project;
  }, { successMessage: t("actions.projects.created") });
}

export async function updateProjectAction(
  id: string,
  input: unknown,
): Promise<ActionResult<AdminProject>> {
  await requireAdmin();
  const t = await getTranslations();
  const parsed = projectSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: { type: "zod", issues: parsed.error.issues }, message: t("actions.projects.invalidForm") };
  }

  return withAction(async () => {
    await db.update(projects).set({ ...parsed.data, updatedAt: new Date() }).where(eq(projects.id, id));
    return { id, ...parsed.data, image: parsed.data.image ?? null, createdAt: new Date(), updatedAt: new Date() };
  }, { successMessage: t("actions.projects.updated") });
}

export async function deleteProjectAction(id: string): Promise<ActionResult<undefined>> {
  await requireAdmin();
  const t = await getTranslations();

  return withAction(async () => {
    await db.delete(projects).where(eq(projects.id, id));
  }, { successMessage: t("actions.projects.deleted") });
}
