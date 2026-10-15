import { z } from "zod";
import { localizedText } from "./localized.validations";

// An absolute URL (uploaded file) or a site path such as "/resume.pdf"; empty means "none".
const urlOrPath = z
  .string()
  .trim()
  .max(500)
  .refine(
    (value) => !value || value.startsWith("/") || /^https?:\/\//.test(value),
  );

export const profileSchema = z.object({
  name: localizedText(120),
  role: localizedText(160),
  bio: localizedText(5000),
  location: localizedText(160),
  email: z.string().trim().email(),
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
