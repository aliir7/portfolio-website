import type { z } from "zod";
import type { profileSchema, skillSchema } from "@/lib/validations/profile";

export type ProfileInput = z.infer<typeof profileSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
