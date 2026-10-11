import { sql } from "drizzle-orm";
import { check, integer, pgTable, text } from "drizzle-orm/pg-core";
import { localized, primaryId, sortOrder, timestamps, updatedAt } from "./_shared";

/** Singleton row (id = 1) that owns the owner's identity and contact info. */
export const profile = pgTable(
  "profile",
  {
    id: integer("id").primaryKey().default(1),
    name: localized("name").notNull(),
    role: localized("role").notNull(),
    bio: localized("bio").notNull(),
    location: localized("location").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    resumeUrl: text("resume_url").notNull(),
    updatedAt: updatedAt(),
  },
  (table) => [check("profile_singleton_check", sql`${table.id} = 1`)],
);

export const skills = pgTable(
  "skills",
  {
    id: primaryId(),
    name: text("name").notNull(),
    value: integer("value").notNull(),
    description: localized("description").notNull(),
    sortOrder: sortOrder(),
    ...timestamps(),
  },
  (table) => [check("skills_value_range_check", sql`${table.value} between 0 and 100`)],
);
