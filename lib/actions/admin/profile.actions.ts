"use server";

import { eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { db } from "@/db";
import { profile, skills } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";
import { profileSchema, skillSchema } from "@/lib/validations";
import { withAction } from "@/lib/utils";
import type { ActionResult } from "@/types";

export async function updateProfileAction(
  input: unknown,
  skillRows: unknown,
): Promise<ActionResult<{ success: true }>> {
  await requireAdmin();
  const t = await getTranslations();
  const parsed = profileSchema.safeParse(input);
  const parsedSkills = skillRows instanceof Array
    ? skillRows.map((skill) => skillSchema.safeParse(skill))
    : [];

  if (!parsed.success || parsedSkills.some((result) => !result.success)) {
    return {
      success: false,
      error: { type: "custom", message: t("actions.profile.invalidForm") },
    };
  }

  return withAction(async () => {
    const skillsData = parsedSkills.map((result) => result.success ? result.data : null).filter(Boolean);

    await db.insert(profile).values({ id: 1, ...parsed.data }).onConflictDoUpdate({
      target: profile.id,
      set: { ...parsed.data, updatedAt: new Date() },
    });

    await db.delete(skills);

    if (skillsData.length) {
      await db.insert(skills).values(skillsData.map((skill, index) => ({
        id: crypto.randomUUID(),
        ...skill,
        sortOrder: index,
        updatedAt: new Date(),
      })));
    }

    return { success: true as const };
  }, { successMessage: t("actions.profile.updated") });
}

export async function createSkillAction(input: unknown): Promise<ActionResult<{ id: string }>> {
  await requireAdmin();
  const t = await getTranslations();
  const parsed = skillSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: { type: "zod", issues: parsed.error.issues }, message: t("actions.profile.invalidSkill") };
  }

  return withAction(async () => {
    const current = await db.select({ id: skills.id }).from(skills);
    const id = crypto.randomUUID();

    await db.insert(skills).values({
      id,
      ...parsed.data,
      sortOrder: current.length,
      updatedAt: new Date(),
    });

    return { id };
  }, { successMessage: t("actions.profile.skillCreated") });
}
