import BlogCard from "@/components/Blog/BlogCard";
import type { BlogPostWithTags, Locale } from "@/types";

type Props = {
  posts: BlogPostWithTags[];
  locale: Locale;
  emptyLabel: string;
  /** Builds the "N min read" label; kept outside so this component needs no translator. */
  readingTime: (minutes: number) => string;
};

/** Post grid shared by the blog index and the tag pages. */
export default function BlogList({ posts, locale, emptyLabel, readingTime }: Props) {
  if (!posts.length) return <p className="text-muted-foreground mt-16 text-center">{emptyLabel}</p>;

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <BlogCard
          key={post.id}
          post={post}
          locale={locale}
          readingTime={post.readingTimeMinutes ? readingTime(post.readingTimeMinutes) : undefined}
        />
      ))}
    </div>
  );
}
