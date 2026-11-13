import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import type { BlogPostWithTags } from "@/types";

/** Tag chips linking to the tag pages (`relative z-10` keeps them clickable above a card's stretched link). */
export default function BlogTags({ tags }: { tags: BlogPostWithTags["tags"] }) {
  if (!tags.length) return null;
  return (
    <div className="relative z-10 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag.id} variant="outline" asChild className="hover:border-primary hover:text-primary px-2 py-1 text-xs transition-colors">
          <Link href={`/blog/tag/${tag.slug}`}>{tag.name}</Link>
        </Badge>
      ))}
    </div>
  );
}
