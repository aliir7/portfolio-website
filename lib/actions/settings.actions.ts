"use server";

import { db } from "@/db";
import { settings } from "@/db/schema";
import { seoSettingsSchema, siteSettingsSchema } from "@/lib/validations";
import { runAdminAction } from "@/lib/utils/admin-action";

const schemas = {
  site: siteSettingsSchema,
  seo: seoSettingsSchema,
} as const;

export async function upsertSettingAction(key: keyof typeof schemas, input: unknown) {
  return runAdminAction({
    name: `settings.upsert:${key}`,
    schema: schemas[key],
    input,
    messages: { invalid: "actions.settings.invalidForm", success: "actions.settings.success" },
    run: async (value) => {
      await db
        .insert(settings)
        .values({ key, value })
        .onConflictDoUpdate({ target: settings.key, set: { value, updatedAt: new Date() } });
    },
  });
}
