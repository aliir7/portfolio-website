"use server";

import { getTranslations } from "next-intl/server";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";
import {
  seoSettingsSchema,
  siteSettingsSchema,
  socialSettingsSchema,
} from "@/lib/validations";
import { formatZodIssues } from "@/lib/utils/format-error";
import { withAction } from "@/lib/utils/with-action";
import type { ActionResult } from "@/types";

const schemas = {
  site: siteSettingsSchema,
  social: socialSettingsSchema,
  seo: seoSettingsSchema,
} as const;

export async function upsertSettingAction(
  key: keyof typeof schemas,
  input: unknown,
): Promise<ActionResult<undefined>> {
  await requireAdmin();
  const t = await getTranslations();
  const parsed = schemas[key].safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: { type: "zod", issues: formatZodIssues(parsed.error, t) },
      message: t("actions.settings.invalidForm"),
    };
  }

  return withAction(
    async () => {
      await db
        .insert(settings)
        .values({ key, value: parsed.data, updatedAt: new Date() })
        .onConflictDoUpdate({
          target: settings.key,
          set: { value: parsed.data, updatedAt: new Date() },
        });
      return undefined;
    },
    { name: `settings.upsert:${key}`, successMessage: t("actions.settings.success") },
  );
}
