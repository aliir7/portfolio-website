"use server";

import { db } from "@/db";
import { replaceStatements, runBatch, withSortOrder } from "@/db/helpers";
import { profile, skills } from "@/db/schema";
import { profileWithSkillsSchema, skillSchema } from "@/lib/validations";
import { runAdminAction } from "@/lib/utils/admin-action";
import type { ProfileInput } from "@/types";

// Empty optional URLs from the form are stored as NULL.
const toProfileValues = (data: ProfileInput) => ({
  ...data,
  avatarUrl: data.avatarUrl || null,
  resumeUrl: data.resumeUrl || null,
});

/** Saves the profile and the full skills list in one atomic batch. */
export async function updateProfileAction(input: unknown) {
  return runAdminAction({
    name: "profile.update",
    schema: profileWithSkillsSchema,
    input,
    messages: { invalid: "actions.profile.invalidForm", success: "actions.profile.updated" },
    run: async (data) => {
      await runBatch([
        db
          .insert(profile)
          .values({ id: 1, ...toProfileValues(data.profile) })
          .onConflictDoUpdate({
            target: profile.id,
            set: { ...toProfileValues(data.profile), updatedAt: new Date() },
          }),
        ...replaceStatements(skills, withSortOrder(data.skills)),
      ]);
      return { success: true as const };
    },
  });
}

export async function createSkillAction(input: unknown) {
  return runAdminAction({
    name: "profile.createSkill",
    schema: skillSchema,
    input,
    messages: { invalid: "actions.profile.invalidSkill", success: "actions.profile.skillCreated" },
    run: async (data) => {
      const [row] = await db
        .insert(skills)
        .values({ ...data, sortOrder: await db.$count(skills) })
        .returning({ id: skills.id });
      return row;
    },
  });
}
