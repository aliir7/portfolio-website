import { index, pgTable, text } from "drizzle-orm/pg-core";
import { localized, primaryId, timestamps } from "./_shared";
import { projectCategory, publishStatus } from "./enums";

export const projects = pgTable(
  "projects",
  {
    id: primaryId(),
    slug: text("slug").notNull().unique(),
    title: localized("title").notNull(),
    description: localized("description").notNull(),
    category: projectCategory("category").notNull(),
    techStack: text("tech_stack").array().notNull().default([]),
    image: text("image"),
    repoUrl: text("repo_url"),
    liveUrl: text("live_url"),
    status: publishStatus("status").notNull().default("draft"),
    ...timestamps(),
  },
  (table) => [
    index("projects_category_idx").on(table.category),
    index("projects_status_created_idx").on(table.status, table.createdAt),
  ],
);
