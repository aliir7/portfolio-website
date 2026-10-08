import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const contactMessages = pgTable("contact_messages", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  readAt: timestamp("read_at", { withTimezone: true }),
}, (table) => ({
  createdAtIdx: index("contact_messages_created_at_idx").on(table.createdAt),
  readAtIdx: index("contact_messages_read_at_idx").on(table.readAt),
}));
