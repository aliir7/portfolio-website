import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import type { BlogPostWithTags, Locale } from "@/types";
import BlogMeta from "./BlogMeta";
import BlogTags from "./BlogTags";

type Props = { post: BlogPostWithTags; locale: Locale; readingTime?: string };

export default function BlogCard({ post, locale, readingTime }: Props) {
  return (
    <Card className="group/card hover:border-secondary-foreground dark:hover:border-primary relative overflow-hidden border pt-0 transition-all duration-300 hover:-translate-y-1">
      {post.coverImage && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover/card:scale-105"
          />
        </div>
      )}
      <CardHeader className="mt-4 space-y-2">
        <BlogMeta date={post.publishedAt} locale={locale} readingTime={readingTime} />
        <CardTitle className="text-lg">
          {/* Stretched link: the whole card is clickable. */}
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </CardTitle>
        {post.excerpt && <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>}
        <BlogTags tags={post.tags} />
      </CardHeader>
    </Card>
  );
}
