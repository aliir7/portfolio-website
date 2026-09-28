"use server";

import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { blogPostTags, blogPosts, blogTags } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";
import { blogPostSchema, blogTagSchema } from "@/lib/validations";
import type { ActionResult, BlogPostInput, BlogTagInput } from "@/types";

export async function createBlogPostAction(input: unknown): Promise<ActionResult<{ id: string }>> {
  const session = await requireAdmin();
  const parsed = blogPostSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: { type: "zod", issues: parsed.error.issues } };
  const id = crypto.randomUUID();
  const data = parsed.data;
  await db.insert(blogPosts).values({
    id, authorId: session.user.id, title: data.title, slug: data.slug, excerpt: data.excerpt || null,
    content: data.content, coverImage: data.coverImage || null, status: data.status,
    publishedAt: data.publishedAt ?? (data.status === "published" ? new Date() : null),
    metaTitle: data.metaTitle || null, metaDescription: data.metaDescription || null,
    canonicalUrl: data.canonicalUrl || null, ogImage: data.ogImage || null,
    noIndex: data.noIndex, readingTimeMinutes: data.readingTimeMinutes ?? null,
  });
  if (data.tagIds.length) await db.insert(blogPostTags).values(data.tagIds.map((tagId) => ({ postId: id, tagId })));
  return { success: true, data: { id }, message: "مقاله ایجاد شد." };
}

export async function updateBlogPostAction(id: string, input: unknown): Promise<ActionResult<{ id: string }>> {
  await requireAdmin();
  const parsed = blogPostSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: { type: "zod", issues: parsed.error.issues } };
  const data = parsed.data;
  await db.update(blogPosts).set({
    title: data.title, slug: data.slug, excerpt: data.excerpt || null, content: data.content,
    coverImage: data.coverImage || null, status: data.status, publishedAt: data.publishedAt ?? null,
    metaTitle: data.metaTitle || null, metaDescription: data.metaDescription || null,
    canonicalUrl: data.canonicalUrl || null, ogImage: data.ogImage || null,
    noIndex: data.noIndex, readingTimeMinutes: data.readingTimeMinutes ?? null, updatedAt: new Date(),
  }).where(eq(blogPosts.id, id));
  await db.delete(blogPostTags).where(eq(blogPostTags.postId, id));
  if (data.tagIds.length) await db.insert(blogPostTags).values(data.tagIds.map((tagId) => ({ postId: id, tagId })));
  return { success: true, data: { id }, message: "مقاله به‌روزرسانی شد." };
}

export async function deleteBlogPostAction(id: string): Promise<ActionResult<undefined>> {
  await requireAdmin();
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  return { success: true, message: "مقاله حذف شد." };
}

export async function createBlogTagAction(input: unknown): Promise<ActionResult<{ id: string }>> {
  await requireAdmin();
  const parsed = blogTagSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: { type: "zod", issues: parsed.error.issues } };
  const id = crypto.randomUUID();
  await db.insert(blogTags).values({ id, ...parsed.data });
  return { success: true, data: { id }, message: "برچسب ایجاد شد." };
}
