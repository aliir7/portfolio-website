"use server";

import { db } from "@/db";
import { settings } from "@/db/schema";
import { seoSettingsSchema } from "@/lib/validations";
import { scheduleAssetCleanup } from "@/lib/cloudinary";
import { runAdminAction } from "@/lib/utils/admin-action";
import { getSeoSettingsQuery } from "@/query/settings.query";

export async function saveSeoSettingsAction(input: unknown) {
  return runAdminAction({
    name: "settings.saveSeo",
    schema: seoSettingsSchema,
    input,
    messages: { invalid: "actions.settings.invalidForm", success: "actions.settings.success" },
    run: async (value) => {
      const previous = await getSeoSettingsQuery();
      await db
        .insert(settings)
        .values({ key: "seo", value })
        .onConflictDoUpdate({ target: settings.key, set: { value, updatedAt: new Date() } });
      scheduleAssetCleanup([previous?.ogImage], [value.ogImage]);
    },
  });
}
