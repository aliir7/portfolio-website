import { index, pgTable } from "drizzle-orm/pg-core";
import { localized, primaryId, sortOrder, timestamps } from "./_shared";
import { resumeCategory } from "./enums";

export const resumeItems = pgTable(
  "resume_items",
  {
    id: primaryId(),
    category: resumeCategory("category").notNull(),
    organization: localized("organization").notNull(),
    title: localized("title").notNull(),
    period: localized("period").notNull(),
    content: localized("content").notNull(),
    sortOrder: sortOrder(),
    ...timestamps(),
  },
  (table) => [index("resume_items_category_sort_idx").on(table.category, table.sortOrder)],
);
