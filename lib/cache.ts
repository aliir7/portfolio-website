import "server-only";

import { unstable_cache } from "next/cache";

/** Data-cache groups. Admin mutations invalidate all of them (see `lib/utils/revalidate.ts`). */
export const cacheTags = ["content", "blog", "settings"] as const;
export type CacheTag = (typeof cacheTags)[number];

/** Safety-net lifetime; the real freshness comes from tag invalidation after every admin change. */
export const CACHE_SECONDS = 60 * 60;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
const reviveDates = (_key: string, value: unknown) =>
  typeof value === "string" && ISO_DATE.test(value) ? new Date(value) : value;

/**
 * Cross-request cache for read queries (Next's Data Cache via `unstable_cache`). The wrapped function is
 * stored as JSON, so Date columns are revived on the way out and callers keep working with real Dates.
 * Arguments become part of the cache key. Only public reads use it: the admin panel reads the database
 * directly so it always shows live data. Errors are never cached.
 */
export function cached<Args extends unknown[], T>(
  name: string,
  tags: CacheTag[],
  fn: (...args: Args) => Promise<T>,
) {
  const read = unstable_cache(async (...args: Args) => JSON.stringify(await fn(...args)), [name], {
    tags,
    revalidate: CACHE_SECONDS,
  });
  return async (...args: Args): Promise<T> => JSON.parse(await read(...args), reviveDates) as T;
}
