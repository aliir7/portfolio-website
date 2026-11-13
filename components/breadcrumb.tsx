import { Link } from "@/i18n/navigation";

type Item = { label: string; href?: string };

/**
 * Breadcrumb trail: every item except the last is a link. `relative z-10` keeps it above any decorative
 * layer, and the links get a padded hit area so they are easy to click.
 */
export default function Breadcrumb({ items, label }: { items: Item[]; label: string }) {
  return (
    <nav aria-label={label} className="relative z-10 text-sm">
      <ol className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-primary focus-visible:text-primary -mx-1 rounded px-1 py-1.5 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-foreground line-clamp-1" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-muted-foreground/60">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
