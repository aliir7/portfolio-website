import { pgEnum } from "drizzle-orm/pg-core";
import {
  projectCategories,
  publishStatuses,
  resumeCategories,
  socialPlatforms,
} from "./values";

export const projectCategory = pgEnum("project_category", projectCategories);
// Shared by projects and blog posts: both are either a draft or published.
export const publishStatus = pgEnum("publish_status", publishStatuses);
export const resumeCategory = pgEnum("resume_category", resumeCategories);
export const socialPlatform = pgEnum("social_platform", socialPlatforms);
