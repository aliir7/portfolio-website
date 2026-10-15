import type { z } from "zod";
import type { seoSettingsSchema } from "@/lib/validations/settings";

export type SeoSettings = z.infer<typeof seoSettingsSchema>;

/** Keys stored in the `settings` table and the shape of each value. */
export type SettingsMap = { seo: SeoSettings };
