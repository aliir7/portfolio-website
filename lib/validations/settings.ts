import { z } from "zod";
import { localizedText } from "./localized";

/** Site-wide SEO text, written once per language. Site name and author come from the profile. */
export const seoSettingsSchema = z.object({
  title: localizedText(70),
  description: localizedText(160),
  /** Comma-separated. */
  keywords: localizedText(300),
  ogImage: z.string().trim().url().or(z.literal("")).optional(),
});
