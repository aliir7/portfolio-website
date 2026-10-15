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
    // Salted hash of the sender IP, used only for rate limiting.
    ipHash: text("ip_hash"),
  },
  (table) => [
    index("contact_messages_created_at_idx").on(table.createdAt),
    index("contact_messages_read_at_idx").on(table.readAt),
    index("contact_messages_ip_created_idx").on(table.ipHash, table.createdAt),
  ],
);
