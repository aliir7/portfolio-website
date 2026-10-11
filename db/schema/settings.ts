import { jsonb, pgTable, text } from "drizzle-orm/pg-core";
import { updatedAt } from "./_shared";

/** Key/value store for `site` and `seo` settings (social URLs live in `social_links`). */
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: updatedAt(),
});
