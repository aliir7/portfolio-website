import { z } from "zod";
export const profileSchema = z.object({
  name: z.string().trim().min(1).max(120), role: z.string().trim().min(1).max(160),
  bio: z.string().trim().min(1).max(5000), email: z.string().trim().email(),
  phone: z.string().trim().min(1).max(50), location: z.string().trim().min(1).max(160),
  githubUrl: z.string().trim().url(), resumeUrl: z.string().trim().min(1).max(500),
});
export const skillSchema = z.object({
  name: z.string().trim().min(1).max(120), value: z.number().int().min(0).max(100),
  description: z.string().trim().min(1).max(1000),
});
export const profileWithSkillsSchema = z.object({ profile: profileSchema, skills: z.array(skillSchema) });
