import "server-only";

import { cache } from "react";
import { defaultOgImage } from "@/lib/site";
import { getPublicContent } from "@/query/content.query";
import { getSeoSettingsQuery } from "@/query/settings.query";
import type { Locale } from "@/types";

/**
 * Metadata text for one locale: the SEO settings when saved, otherwise derived from the
 * profile (name, role, bio) so the site is never without a title or description.
 * Request-cached; reused by metadata and structured data.
 */
export const getSeo = cache(async (locale: Locale) => {
  const [{ profile }, seo] = await Promise.all([getPublicContent(locale), getSeoSettingsQuery()]);

  return {
    name: profile.name,
    title: seo?.title[locale] ?? `${profile.name} | ${profile.role}`,
    description: seo?.description[locale] ?? profile.bio,
    keywords: seo?.keywords[locale].split(",").map((keyword) => keyword.trim()).filter(Boolean) ?? [],
    image: seo?.ogImage || profile.avatarUrl || defaultOgImage,
  };
});
