import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { RiRssLine } from "@remixicon/react";
import BlogList from "@/components/Blog/BlogList";
import { Link } from "@/i18n/navigation";
import { hasLocale, routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { getPublishedBlogPostsQuery } from "@/query/blogs.query";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: `${siteUrl}/${locale}/blog`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}/blog`])),
      types: { "application/rss+xml": `${siteUrl}/${locale}/blog/feed.xml` },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();

  const [t, posts] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getPublishedBlogPostsQuery(),
  ]);

  return (
    <main className="container-custom pt-32 pb-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="text-primary mt-4">{t("subtitle")}</p>
        <Link href="/blog/feed.xml" prefetch={false} className="text-muted-foreground hover:text-primary mt-4 inline-flex items-center gap-1 text-sm">
          <RiRssLine className="size-4" /> {t("rss")}
        </Link>
      </div>
      <BlogList posts={posts} locale={locale} emptyLabel={t("empty")} readingTime={(minutes) => t("readingTime", { minutes })} />
    </main>
  );
}
