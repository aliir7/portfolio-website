import { pgTable } from "drizzle-orm/pg-core";
import { localized, primaryId, sortOrder, timestamps } from "./_shared";

export const services = pgTable("services", {
  id: primaryId(),
  title: localized("title").notNull(),
  subtitle: localized("subtitle").notNull(),
  description: localized("description").notNull(),
  sortOrder: sortOrder(),
  ...timestamps(),
});
