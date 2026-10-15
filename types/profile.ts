import type {
  profileSchema,
  skillSchema,
} from "@/lib/validations/profile.validations";
import type { z } from "zod";

export type ProfileInput = z.infer<typeof profileSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
