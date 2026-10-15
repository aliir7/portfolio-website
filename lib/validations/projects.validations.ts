import { projectCategories, publishStatuses } from "@/db/schema/values";
import { z } from "zod";
import { localizedText, optionalLocalizedText } from "./localized.validations";

const optionalUrl = z.url().optional().or(z.literal(""));

export const projectSchema = z.object({
  title: localizedText(160),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(160)
    .regex(/^[a-z0-9-]+$/),
  description: localizedText(5000),
  content: optionalLocalizedText(20000),
  category: z.enum(projectCategories),
  techStack: z.array(z.string().trim().min(1).max(60)).max(30),
  image: optionalUrl.nullable().optional(),
  repoUrl: optionalUrl,
  liveUrl: optionalUrl,
  status: z.enum(publishStatuses),
});

export type ProjectInput = z.infer<typeof projectSchema>;
