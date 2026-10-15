import type { seoSettingsSchema } from "@/lib/validations/settings.validations";
import type { z } from "zod";

export type SeoSettings = z.infer<typeof seoSettingsSchema>;

/** Keys stored in the `settings` table and the shape of each value. */
export type SettingsMap = { seo: SeoSettings };
