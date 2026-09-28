import "server-only";

import { and, desc, eq, lte, or, isNull } from "drizzle-orm";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";

export async function getPublishedBlogPostsQuery() {
  return db.select().from(blogPosts).where(
    and(
      eq(blogPosts.status, "published"),
      eq(blogPosts.noIndex, false),
      or(isNull(blogPosts.publishedAt), lte(blogPosts.publishedAt, new Date())),
    ),
  ).orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt));
}

export async function getBlogPostBySlugQuery(slug: string) {
  const [post] = await db.select().from(blogPosts).where(
    and(eq(blogPosts.slug, slug), eq(blogPosts.status, "published"), eq(blogPosts.noIndex, false)),
  ).limit(1);
  return post ?? null;
}
