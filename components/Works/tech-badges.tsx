import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Props = {
  items: string[];
  /** Cards pass a limit: the extra technologies collapse into a "+N" chip. The project page shows all. */
  max?: number;
  className?: string;
};

/** Technology chips shared by the project card and the project page. */
export default function TechBadges({ items, max, className }: Props) {
  const collapse = max !== undefined && items.length > max;
  const visible = collapse ? items.slice(0, max - 1) : items;
  const hidden = items.slice(visible.length);

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {visible.map((tech) => (
        <Badge
          key={tech}
          variant="outline"
          className="border-foreground dark:border-primary px-2 py-2 text-center text-xs capitalize"
        >
          {tech}
        </Badge>
      ))}
      {hidden.length > 0 && (
        <Badge
          variant="secondary"
          title={hidden.join(", ")}
          aria-label={`+${hidden.length}: ${hidden.join(", ")}`}
          className="px-2 py-2 text-xs"
        >
          +{hidden.length}
        </Badge>
      )}
    </div>
  );
}
