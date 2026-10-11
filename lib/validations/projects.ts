import { z } from "zod";
import { projectCategories, publishStatuses } from "@/db/schema/values";
import { localizedText } from "./localized";

const optionalUrl = z.string().trim().url().or(z.literal(""));

export const projectSchema = z.object({
  title: localizedText(160),
  slug: z.string().trim().min(1).max(160).regex(/^[a-z0-9-]+$/),
  description: localizedText(5000),
  category: z.enum(projectCategories),
  techStack: z.array(z.string().trim().min(1).max(60)).max(30),
  image: optionalUrl.nullable().optional(),
  repoUrl: optionalUrl,
  liveUrl: optionalUrl,
  status: z.enum(publishStatuses),
});

export type ProjectInput = z.infer<typeof projectSchema>;
