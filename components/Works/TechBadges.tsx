import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Technology chips shared by the project card and the project page. */
export default function TechBadges({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((tech) => (
        <Badge
          key={tech}
          variant="outline"
          className="border-foreground dark:border-primary px-2 py-2 text-center text-xs capitalize"
        >
          {tech}
        </Badge>
      ))}
    </div>
  );
}
