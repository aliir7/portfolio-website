"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { idSchema, projectSchema } from "@/lib/validations";
import { runAdminAction } from "@/lib/utils/admin-action";
import type { ProjectInput } from "@/types";

// Empty optional URLs from the form are stored as NULL.
const toProjectValues = (data: ProjectInput) => ({
  ...data,
  image: data.image || null,
  repoUrl: data.repoUrl || null,
  liveUrl: data.liveUrl || null,
});

export async function createProjectAction(input: unknown) {
  return runAdminAction({
    name: "projects.create",
    schema: projectSchema,
    input,
    messages: { invalid: "actions.projects.invalidForm", success: "actions.projects.created" },
    run: async (data) => {
      const [project] = await db.insert(projects).values(toProjectValues(data)).returning();
      return project;
    },
  });
}

export async function updateProjectAction(id: string, input: unknown) {
  return runAdminAction({
    name: "projects.update",
    schema: projectSchema,
    input,
    messages: { invalid: "actions.projects.invalidForm", success: "actions.projects.updated" },
    run: async (data, { t }) => {
      const [project] = await db
        .update(projects)
        .set(toProjectValues(data))
        .where(eq(projects.id, id))
        .returning();
      if (!project) throw new Error(t("actions.projects.notFound"));
      return project;
    },
  });
}

export async function deleteProjectAction(id: string) {
  return runAdminAction({
    name: "projects.delete",
    schema: idSchema,
    input: id,
    messages: { invalid: "actions.common.invalidForm", success: "actions.projects.deleted" },
    run: async (projectId, { t }) => {
      const deleted = await db
        .delete(projects)
        .where(eq(projects.id, projectId))
        .returning({ id: projects.id });
      if (!deleted.length) throw new Error(t("actions.projects.notFound"));
    },
  });
}
