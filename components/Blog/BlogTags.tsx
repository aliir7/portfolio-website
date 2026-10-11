import { Badge } from "@/components/ui/badge";
import type { BlogPostWithTags } from "@/types";

export default function BlogTags({ tags }: { tags: BlogPostWithTags["tags"] }) {
  if (!tags.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag.id} variant="outline" className="px-2 py-1 text-xs">
          {tag.name}
        </Badge>
      ))}
    </div>
  );
}
