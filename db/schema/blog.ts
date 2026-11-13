import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { createdAt, primaryId, updatedAt } from "./_shared";
import { user } from "./auth";
import { publishStatus } from "./enums";

// Blog content is single-language by design (see ADR-003).
export const blogPosts = pgTable(
  "blog_posts",
  {
    id: primaryId(),
    authorId: text("author_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    title: text("title").notNull(),
    slug: text("slug").notNull().unique(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    coverImage: text("cover_image"),
    status: publishStatus("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),

    // Search-engine metadata. `noIndex` only controls robots meta, not visibility.
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    canonicalUrl: text("canonical_url"),
    ogImage: text("og_image"),
    noIndex: boolean("no_index").notNull().default(false),

    readingTimeMinutes: integer("reading_time_minutes"),
  },
  (table) => [
    index("blog_posts_status_published_idx").on(table.status, table.publishedAt),
    index("blog_posts_author_id_idx").on(table.authorId),
  ],
);

export const blogTags = pgTable("blog_tags", {
  id: primaryId(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  createdAt: createdAt(),
});

export const blogPostTags = pgTable(
  "blog_post_tags",
  {
    postId: text("post_id")
      .notNull()
      .references(() => blogPosts.id, { onDelete: "cascade" }),
    tagId: text("tag_id")
      .notNull()
      .references(() => blogTags.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.postId, table.tagId] }),
    index("blog_post_tags_tag_id_idx").on(table.tagId),
  ],
);

export const blogPostRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(user, { fields: [blogPosts.authorId], references: [user.id] }),
  tags: many(blogPostTags),
}));

export const blogTagRelations = relations(blogTags, ({ many }) => ({
  posts: many(blogPostTags),
}));

export const blogPostTagRelations = relations(blogPostTags, ({ one }) => ({
  post: one(blogPosts, { fields: [blogPostTags.postId], references: [blogPosts.id] }),
  tag: one(blogTags, { fields: [blogPostTags.tagId], references: [blogTags.id] }),
}));
