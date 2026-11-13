import { RiArrowLeftSLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/types";

type Props = {
  locale: Locale;
  page: number;
  totalPages: number;
  /** URL of a page (without the locale prefix). Links, not state, so every page is crawlable and cacheable. */
  hrefFor: (page: number) => string;
  labels: { navigation: string; previous: string; next: string; page: (page: number) => string };
};

/** First, last and the neighbours of the current page, with gaps collapsed: 1 … 4 5 6 … 12 */
function visiblePages(page: number, totalPages: number) {
  const pages = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((item) => item >= 1 && item <= totalPages)
    .sort((a, b) => a - b);
  return pages.flatMap((item, index) => (index > 0 && item - pages[index - 1] > 1 ? ["gap" as const, item] : [item]));
}

export default function Pagination({ locale, page, totalPages, hrefFor, labels }: Props) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label={labels.navigation} className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Button asChild variant="outline" size="sm">
          <Link href={hrefFor(page - 1)} rel="prev" prefetch={false}>
            <RiArrowLeftSLine className="rtl:rotate-180" /> {labels.previous}
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          <RiArrowLeftSLine className="rtl:rotate-180" /> {labels.previous}
        </Button>
      )}

      {visiblePages(page, totalPages).map((item, index) =>
        item === "gap" ? (
          <span key={`gap-${index}`} aria-hidden className="text-muted-foreground px-1">…</span>
        ) : (
          <Button key={item} asChild variant={item === page ? "cta" : "outline"} size="sm" className="min-w-9">
            <Link href={hrefFor(item)} aria-current={item === page ? "page" : undefined} aria-label={labels.page(item)} prefetch={false}>
              {new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US").format(item)}
            </Link>
          </Button>
        ),
      )}

      {page < totalPages ? (
        <Button asChild variant="outline" size="sm">
          <Link href={hrefFor(page + 1)} rel="next" prefetch={false}>
            {labels.next} <RiArrowLeftSLine className="rotate-180 rtl:rotate-0" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          {labels.next} <RiArrowLeftSLine className="rotate-180 rtl:rotate-0" />
        </Button>
      )}
    </nav>
  );
}
