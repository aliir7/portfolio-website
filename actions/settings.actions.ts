"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";
import { siteSettingsSchema, socialSettingsSchema, seoSettingsSchema } from "@/lib/validations";
import type { ActionResult } from "@/types";

const schemas = {
  site: siteSettingsSchema,
  social: socialSettingsSchema,
  seo: seoSettingsSchema,
} as const;

export async function upsertSettingAction(
  key: keyof typeof schemas,
  input: unknown,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = schemas[key].safeParse(input);
  if (!parsed.success) return { success: false, error: { type: "zod", issues: parsed.error.issues } };
  await db.insert(settings).values({ key, value: parsed.data, updatedAt: new Date() })
    .onConflictDoUpdate({ target: settings.key, set: { value: parsed.data, updatedAt: new Date() } });
  return { success: true, message: "تنظیمات ذخیره شد." };
}
