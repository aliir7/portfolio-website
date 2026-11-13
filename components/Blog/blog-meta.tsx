import { formatDate } from "@/lib/utils/format-date";
import type { Locale } from "@/types";

type Props = { date: Date | null; locale: Locale; readingTime?: string };

/** "date · reading time" line shared by the post card and the post page. */
export default function BlogMeta({ date, locale, readingTime }: Props) {
  const parts = [date && formatDate(date, locale), readingTime].filter(Boolean);
  if (!parts.length) return null;
  return <p className="text-muted-foreground text-sm">{parts.join(" · ")}</p>;
}
