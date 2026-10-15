import type { projects } from "@/db/schema";
import type { projectCategories, publishStatuses } from "@/db/schema/values";
import type { projectSchema } from "@/lib/validations/projects.validations";
import type { z } from "zod";

export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectStatus = (typeof publishStatuses)[number];
export type FilterCategory = "all" | ProjectCategory;

export type AdminProject = typeof projects.$inferSelect;
export type ProjectInput = z.infer<typeof projectSchema>;

export type {
  PublicProject as Project,
  PublicResumeItem as ResumeItemType,
} from "./content";
