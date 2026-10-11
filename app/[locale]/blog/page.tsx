import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import BlogCard from "@/components/Blog/BlogCard";
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
      </div>
      {posts.length ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              locale={locale}
              readingTime={post.readingTimeMinutes ? t("readingTime", { minutes: post.readingTimeMinutes }) : undefined}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mt-16 text-center">{t("empty")}</p>
      )}
    </main>
  );
}
