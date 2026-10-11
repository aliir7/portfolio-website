import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createdAt, primaryId } from "./_shared";

export const contactMessages = pgTable(
  "contact_messages",
  {
    id: primaryId(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    message: text("message").notNull(),
    createdAt: createdAt(),
    readAt: timestamp("read_at", { withTimezone: true }),
  },
  (table) => [
    index("contact_messages_created_at_idx").on(table.createdAt),
    index("contact_messages_read_at_idx").on(table.readAt),
  ],
);
