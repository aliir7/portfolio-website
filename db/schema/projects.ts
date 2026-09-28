import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  techStack: text("tech_stack").array().notNull().default([]),
  image: text("image"),
  repoUrl: text("repo_url"),
  liveUrl: text("live_url"),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
}, (table) => ({
  categoryIdx: index("projects_category_idx").on(table.category),
  statusIdx: index("projects_status_idx").on(table.status),
}));
