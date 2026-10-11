import { z } from "zod";

/** `{ fa, en }` text where both languages are required. */
export const localizedText = (max: number) =>
  z.object({
    fa: z.string().trim().min(1).max(max),
    en: z.string().trim().min(1).max(max),
  });

export const idSchema = z.string().trim().min(1).max(100);
