import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import BlogContent from "@/components/Blog/BlogContent";
import BlogMeta from "@/components/Blog/BlogMeta";
import BlogTags from "@/components/Blog/BlogTags";
import { Link } from "@/i18n/navigation";
import { hasLocale, routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { getBlogPostBySlugQuery } from "@/query/blogs.query";
import { getPublicContent } from "@/query/content.query";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlugQuery(slug);
  if (!post) return {};

  const image = post.ogImage ?? post.coverImage;
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt ?? undefined,
    alternates: {
      canonical: post.canonicalUrl ?? `${siteUrl}/${locale}/blog/${slug}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}/blog/${slug}`])),
    },
    robots: { index: !post.noIndex, follow: true },
    openGraph: {
      type: "article",
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt ?? undefined,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();

  const post = await getBlogPostBySlugQuery(slug);
  if (!post) notFound();

  const [t, { profile }] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getPublicContent(locale),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.coverImage ?? undefined,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: profile.name, url: `${siteUrl}/${locale}` },
    mainEntityOfPage: `${siteUrl}/${locale}/blog/${slug}`,
  };

  return (
    <main className="container-custom pt-32 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <article className="mx-auto max-w-3xl space-y-8">
        <Link href="/blog" className="text-primary text-sm font-medium">
          {t("back")}
        </Link>
        <header className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
          <BlogMeta
            date={post.publishedAt}
            locale={locale}
            readingTime={post.readingTimeMinutes ? t("readingTime", { minutes: post.readingTimeMinutes }) : undefined}
          />
          <BlogTags tags={post.tags} />
        </header>
        {post.coverImage && (
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <Image src={post.coverImage} alt={post.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>
        )}
        <BlogContent content={post.content} />
      </article>
    </main>
  );
}
