import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import BlogList from "@/components/Blog/BlogList";
import { Link } from "@/i18n/navigation";
import { hasLocale, routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { getBlogTagsQuery, getPublishedBlogPostsQuery } from "@/query/blogs.query";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string; slug: string }> };

async function getTagWithPosts(slug: string) {
  const [tags, posts] = await Promise.all([getBlogTagsQuery(), getPublishedBlogPostsQuery()]);
  const tag = tags.find((item) => item.slug === slug);
  return tag ? { tag, posts: posts.filter((post) => post.tags.some((item) => item.id === tag.id)) } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) return {};

  const [t, data] = await Promise.all([getTranslations({ locale, namespace: "blog" }), getTagWithPosts(slug)]);
  if (!data) return {};

  return {
    title: t("tagTitle", { name: data.tag.name }),
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/tag/${slug}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}/blog/tag/${slug}`])),
    },
  };
}

export default async function BlogTagPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();

  const [t, data] = await Promise.all([getTranslations({ locale, namespace: "blog" }), getTagWithPosts(slug)]);
  if (!data) notFound();

  return (
    <main className="container-custom pt-32 pb-16">
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        <Link href="/blog" className="text-primary text-sm font-medium">
          {t("back")}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("tagTitle", { name: data.tag.name })}</h1>
      </div>
      <BlogList posts={data.posts} locale={locale} emptyLabel={t("tagEmpty")} readingTime={(minutes) => t("readingTime", { minutes })} />
    </main>
  );
}
