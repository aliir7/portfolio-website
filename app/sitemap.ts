import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { getPublishedBlogPostsQuery } from "@/query/blogs.query";

// Posts are published over time, so the sitemap is regenerated hourly.
export const revalidate = 3600;

type Entry = Pick<MetadataRoute.Sitemap[number], "lastModified" | "changeFrequency" | "priority">;

/** One sitemap entry per locale for the same page, each listing all language alternates. */
const localized = (path: string, entry: Entry): MetadataRoute.Sitemap =>
  routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}${path}`,
    ...entry,
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
    },
  }));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const posts = (await getPublishedBlogPostsQuery()).filter((post) => !post.noIndex);

  return [
    ...localized("", { lastModified, changeFrequency: "monthly", priority: 1 }),
    ...localized("/blog", { lastModified, changeFrequency: "weekly", priority: 0.8 }),
    ...posts.flatMap((post) =>
      localized(`/blog/${post.slug}`, {
        lastModified: post.updatedAt,
        changeFrequency: "monthly",
        priority: 0.6,
      }),
    ),
  ];
}
