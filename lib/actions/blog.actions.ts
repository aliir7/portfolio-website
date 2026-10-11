"use server";

import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { runBatch } from "@/db/helpers";
import { blogPostTags, blogPosts, blogTags } from "@/db/schema";
import { blogPostSchema, blogTagSchema, idSchema } from "@/lib/validations";
import type { BlogPostInput } from "@/lib/validations";
import { runAdminAction } from "@/lib/utils/admin-action";
import { estimateReadingTime } from "@/lib/utils/reading-time";

// Maps validated form data to columns; empty optional strings become NULL.
const toPostValues = (data: BlogPostInput) => ({
  title: data.title,
  slug: data.slug,
  excerpt: data.excerpt || null,
  content: data.content,
  coverImage: data.coverImage || null,
  status: data.status,
  metaTitle: data.metaTitle || null,
  metaDescription: data.metaDescription || null,
  canonicalUrl: data.canonicalUrl || null,
  ogImage: data.ogImage || null,
  noIndex: data.noIndex,
  readingTimeMinutes: data.readingTimeMinutes ?? estimateReadingTime(data.content),
});

const tagStatements = (postId: string, tagIds: string[]) =>
  tagIds.length
    ? [db.insert(blogPostTags).values(tagIds.map((tagId) => ({ postId, tagId })))]
    : [];

export async function createBlogPostAction(input: unknown) {
  return runAdminAction({
    name: "blog.createPost",
    schema: blogPostSchema,
    input,
    messages: { invalid: "actions.blog.invalidPost", success: "actions.blog.created" },
    run: async (data, { userId }) => {
      const id = crypto.randomUUID();
      await runBatch([
        db.insert(blogPosts).values({
          ...toPostValues(data),
          id,
          authorId: userId,
          publishedAt: data.publishedAt ?? (data.status === "published" ? new Date() : null),
        }),
        ...tagStatements(id, data.tagIds),
      ]);
      return { id };
    },
  });
}

export async function updateBlogPostAction(id: string, input: unknown) {
  return runAdminAction({
    name: "blog.updatePost",
    schema: blogPostSchema,
    input,
    messages: { invalid: "actions.blog.invalidPost", success: "actions.blog.updated" },
    run: async (data) => {
      // A published post keeps its original publish date unless one is given.
      const publishedAt =
        data.status === "published"
          ? (data.publishedAt ?? sql`coalesce(${blogPosts.publishedAt}, now())`)
          : null;

      await runBatch([
        db
          .update(blogPosts)
          .set({ ...toPostValues(data), publishedAt })
          .where(eq(blogPosts.id, id)),
        db.delete(blogPostTags).where(eq(blogPostTags.postId, id)),
        ...tagStatements(id, data.tagIds),
      ]);
      return { id };
    },
  });
}

export async function deleteBlogPostAction(id: string) {
  return runAdminAction({
    name: "blog.deletePost",
    schema: idSchema,
    input: id,
    messages: { invalid: "actions.common.invalidForm", success: "actions.blog.deleted" },
    run: async (postId) => {
      await db.delete(blogPosts).where(eq(blogPosts.id, postId));
    },
  });
}

export async function createBlogTagAction(input: unknown) {
  return runAdminAction({
    name: "blog.createTag",
    schema: blogTagSchema,
    input,
    messages: { invalid: "actions.blog.invalidTag", success: "actions.blog.tagCreated" },
    run: async (data) => {
      const [tag] = await db.insert(blogTags).values(data).returning({ id: blogTags.id });
      return tag;
    },
  });
}
