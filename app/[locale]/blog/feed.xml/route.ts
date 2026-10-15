import { getTranslations } from "next-intl/server";
import { hasLocale } from "@/i18n/routing";
import { getSeo } from "@/lib/seo";
import { siteUrl } from "@/lib/site";
import { escapeHtml as escapeXml } from "@/lib/utils/escape-html";
import { getPublishedBlogPostsQuery } from "@/query/blogs.query";

export const revalidate = 3600;

/** RSS 2.0 feed of the published posts, one per locale (post bodies are single-language). */
export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) return new Response("Not found", { status: 404 });

  const [t, seo, posts] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getSeo(locale),
    getPublishedBlogPostsQuery(),
  ]);

  const blogUrl = `${siteUrl}/${locale}/blog`;
  const items = posts
    .map((post) => {
      const url = `${blogUrl}/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${post.publishedAt ? `<pubDate>${post.publishedAt.toUTCString()}</pubDate>` : ""}
      ${post.excerpt ? `<description>${escapeXml(post.excerpt)}</description>` : ""}
      ${post.tags.map((tag) => `<category>${escapeXml(tag.name)}</category>`).join("")}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${seo.name} | ${t("title")}`)}</title>
    <link>${blogUrl}</link>
    <description>${escapeXml(t("subtitle"))}</description>
    <language>${locale}</language>
    <atom:link href="${blogUrl}/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
