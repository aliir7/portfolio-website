import "server-only";

import { eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { seoSettingsSchema } from "@/lib/validations/settings";
import { withQuery } from "@/lib/utils/with-query";

/** Raw SEO settings (both languages), or null when never saved or malformed. */
export const getSeoSettingsQuery = cache(() =>
  withQuery(async () => {
    const [row] = await db
      .select({ value: settings.value })
      .from(settings)
      .where(eq(settings.key, "seo"))
      .limit(1);

    const parsed = seoSettingsSchema.safeParse(row?.value);
    return parsed.success ? parsed.data : null;
  }, "settings.seo"),
);
