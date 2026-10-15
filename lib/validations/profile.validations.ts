import { z } from "zod";
import { localizedText, urlOrPath } from "./localized.validations";

export const profileSchema = z.object({
  name: localizedText(120),
  role: localizedText(160),
  bio: localizedText(5000),
  location: localizedText(160),
  email: z.email(),
  phone: z.string().trim().min(1).max(50),
  avatarUrl: urlOrPath.optional(),
  resumeUrl: urlOrPath.optional(),
  experienceYears: z.number().int().min(0).max(99),
  completedProjects: z.number().int().min(0).max(100000),
});

export const skillSchema = z.object({
  name: z.string().trim().min(1).max(120),
  value: z.number().int().min(0).max(100),
  description: localizedText(1000),
});

export const profileWithSkillsSchema = z.object({
  profile: profileSchema,
  skills: z.array(skillSchema).max(50),
});
