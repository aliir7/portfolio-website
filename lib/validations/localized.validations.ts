import { z } from "zod";

/** `{ fa, en }` text where both languages are required. */
export const localizedText = (max: number) =>
  z.object({
    fa: z.string().trim().min(1).max(max),
    en: z.string().trim().min(1).max(max),
  });

export const idSchema = z.string().trim().min(1).max(100);

/** `{ fa, en }` text where either (or both) may be empty. */
export const optionalLocalizedText = (max: number) =>
  z.object({
    fa: z.string().trim().max(max),
    en: z.string().trim().max(max),
  });

/** An absolute http(s) URL (uploaded file) or a site path such as "/resume.pdf"; empty means "none". */
export const urlOrPath = z
  .string()
  .trim()
  .max(500)
  .refine((value) => !value || value.startsWith("/") || /^https?:\/\//.test(value), {
    message: "errors.validation.urlOrPath.invalid",
  });
