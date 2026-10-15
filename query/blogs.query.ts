import "server-only";

import { and, count, desc, eq, lte } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import { blogPostTags, blogPosts, blogTags } from "@/db/schema";
import { withQuery } from "@/lib/utils/with-query";
import type { BlogPostWithTags } from "@/types";

const withTags = { tags: { with: { tag: true } } } as const;

type PostWithTagLinks = Omit<BlogPostWithTags, "tags"> & {
  tags: { tag: BlogPostWithTags["tags"][number] }[];
};

const flattenTags = (post: PostWithTagLinks): BlogPostWithTags => ({
  ...post,
  tags: post.tags.map((link) => link.tag),
});

// "Published" means status + a publish date in the past. `noIndex` is an SEO flag
// (robots meta) and deliberately does not hide a post from the site.
const isPublished = () =>
  and(eq(blogPosts.status, "published"), lte(blogPosts.publishedAt, new Date()));

export function getPublishedBlogPostsQuery() {
  return withQuery(async () => {
    const posts = await db.query.blogPosts.findMany({
      where: isPublished(),
      orderBy: [desc(blogPosts.publishedAt)],
      with: withTags,
    });
    return posts.map(flattenTags);
  }, "blog.published");
}

export const getBlogPostBySlugQuery = cache((slug: string) => {
  return withQuery(async () => {
    const post = await db.query.blogPosts.findFirst({
      where: and(eq(blogPosts.slug, slug), isPublished()),
      with: withTags,
    });
    return post ? flattenTags(post) : null;
  }, "blog.bySlug");
});

/** All posts including drafts, for the admin panel. */
export function getAdminBlogPostsQuery() {
  return withQuery(async () => {
    const posts = await db.query.blogPosts.findMany({
      orderBy: [desc(blogPosts.createdAt)],
      with: withTags,
    });
    return posts.map(flattenTags);
  }, "blog.admin.list");
}

export function getAdminBlogPostByIdQuery(id: string) {
  return withQuery(async () => {
    const post = await db.query.blogPosts.findFirst({ where: eq(blogPosts.id, id), with: withTags });
    return post ? flattenTags(post) : null;
  }, "blog.admin.byId");
}

export function getBlogTagsQuery() {
  return withQuery(() => db.select().from(blogTags).orderBy(blogTags.name), "blog.tags");
}

/** Tags with the number of posts using them (any status), for the tag manager. */
export function getBlogTagsWithCountQuery() {
  return withQuery(
    () =>
      db
        .select({ id: blogTags.id, name: blogTags.name, slug: blogTags.slug, createdAt: blogTags.createdAt, postCount: count(blogPostTags.postId) })
        .from(blogTags)
        .leftJoin(blogPostTags, eq(blogPostTags.tagId, blogTags.id))
        .groupBy(blogTags.id)
        .orderBy(blogTags.name),
    "blog.tagsWithCount",
  );
}
