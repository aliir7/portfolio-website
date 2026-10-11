import type { contactMessages } from "@/db/schema";

export type ContactMessage = typeof contactMessages.$inferSelect;
