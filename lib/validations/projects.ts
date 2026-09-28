import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().trim().min(1).max(160),
  slug: z.string().trim().min(1).max(160).regex(/^[a-z0-9-]+$/),
  description: z.string().trim().min(1).max(5000),
  category: z.enum(["frontend", "fullstack", "dashboard"]),
  techStack: z.array(z.string().trim().min(1).max(60)).max(30),
  image: z.string().trim().url().or(z.literal("")).nullable().optional(),
  repoUrl: z.string().trim().url().or(z.literal("")),
  liveUrl: z.string().trim().url().or(z.literal("")),
  status: z.enum(["published", "draft"]),
});
export type ProjectInput = z.infer<typeof projectSchema>;
