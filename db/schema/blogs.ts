import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: text("id").primaryKey(),
    authorId: text("author_id")
      .notNull()
      .references(() => user.id, { onDelete: "restrict" }),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    excerpt: text("excerpt"),
    content: text("content").notNull(),
    coverImage: text("cover_image"),
    status: text("status").notNull().default("draft"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),

    // Search-engine metadata
    metaTitle: text("meta_title"),
    metaDescription: text("meta_description"),
    canonicalUrl: text("canonical_url"),
    ogImage: text("og_image"),
    noIndex: boolean("no_index").notNull().default(false),

    // Optional editorial metadata
    readingTimeMinutes: integer("reading_time_minutes"),
  },
  (table) => ({
    slugUniqueIdx: uniqueIndex("blog_posts_slug_unique_idx").on(table.slug),
    statusPublishedIdx: index("blog_posts_status_published_idx").on(
      table.status,
      table.publishedAt,
    ),
    authorIdx: index("blog_posts_author_id_idx").on(table.authorId),
  }),
);

export const blogTags = pgTable(
  "blog_tags",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    slugUniqueIdx: uniqueIndex("blog_tags_slug_unique_idx").on(table.slug),
  }),
);

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
  (table) => ({
    primaryKey: uniqueIndex("blog_post_tags_post_tag_unique_idx").on(
      table.postId,
      table.tagId,
    ),
    postIdx: index("blog_post_tags_post_id_idx").on(table.postId),
    tagIdx: index("blog_post_tags_tag_id_idx").on(table.tagId),
  }),
);

export const blogPostRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(user, {
    fields: [blogPosts.authorId],
    references: [user.id],
  }),
  tags: many(blogPostTags),
}));

export const blogTagRelations = relations(blogTags, ({ many }) => ({
  posts: many(blogPostTags),
}));

export const blogPostTagRelations = relations(blogPostTags, ({ one }) => ({
  post: one(blogPosts, {
    fields: [blogPostTags.postId],
    references: [blogPosts.id],
  }),
  tag: one(blogTags, {
    fields: [blogPostTags.tagId],
    references: [blogTags.id],
  }),
}));
