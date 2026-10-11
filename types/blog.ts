import type { blogPosts, blogTags } from "@/db/schema";
import type { publishStatuses } from "@/db/schema/values";

// Derived from the schema (single source of truth). The form input type is
// `BlogPostInput` in `@/lib/validations`.
export type BlogStatus = (typeof publishStatuses)[number];
export type BlogTag = typeof blogTags.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type BlogPostWithTags = BlogPost & { tags: BlogTag[] };
