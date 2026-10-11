import { pgTable, text } from "drizzle-orm/pg-core";
import { primaryId, sortOrder, timestamps } from "./_shared";
import { socialPlatform } from "./enums";

/** The only owner of social URLs. Labels and icons are derived from `platform` in the UI. */
export const socialLinks = pgTable("social_links", {
  id: primaryId(),
  platform: socialPlatform("platform").notNull().unique(),
  href: text("href").notNull(),
  sortOrder: sortOrder(),
  ...timestamps(),
});
