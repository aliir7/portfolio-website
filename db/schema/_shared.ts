import { integer, jsonb, text, timestamp } from "drizzle-orm/pg-core";

/** Bilingual value stored as `{ fa, en }` in a single jsonb column (ADR-003). */
export type LocalizedText = { fa: string; en: string };

export const localized = (column: string) => jsonb(column).$type<LocalizedText>();

export const primaryId = () =>
  text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());

export const sortOrder = () => integer("sort_order").notNull().default(0);

export const createdAt = () =>
  timestamp("created_at", { withTimezone: true }).notNull().defaultNow();

export const updatedAt = () =>
  timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date());

export const timestamps = () => ({ createdAt: createdAt(), updatedAt: updatedAt() });
