import "server-only";

import { asc, desc, eq } from "drizzle-orm";
import { cache } from "react";
import { db } from "@/db";
import { profile, projects, resumeItems, services, skills, socialLinks } from "@/db/schema";
import { localize } from "@/lib/localize";
import { withQuery } from "@/lib/utils/with-query";
import type { Locale, PublicContent } from "@/types";

// Base reads return raw rows (`{ fa, en }` fields intact). The admin panel edits
// them as-is; `getPublicContent` is the only place that resolves a locale.

export function getProfileQuery() {
  return withQuery(async () => {
    const [row] = await db.select().from(profile).where(eq(profile.id, 1)).limit(1);
    return row ?? null;
  }, "content.profile");
}

export function getSkillsQuery() {
  return withQuery(() => db.select().from(skills).orderBy(asc(skills.sortOrder)), "content.skills");
}

export function getServicesQuery() {
  return withQuery(
    () => db.select().from(services).orderBy(asc(services.sortOrder)),
    "content.services",
  );
}

export function getResumeItemsQuery() {
  return withQuery(
    () => db.select().from(resumeItems).orderBy(asc(resumeItems.sortOrder)),
    "content.resume",
  );
}

export function getSocialLinksQuery() {
  return withQuery(
    () => db.select().from(socialLinks).orderBy(asc(socialLinks.sortOrder)),
    "content.socialLinks",
  );
}

export function getProjectsQuery({ publishedOnly = false } = {}) {
  return withQuery(
    () =>
      db
        .select()
        .from(projects)
        .where(publishedOnly ? eq(projects.status, "published") : undefined)
        .orderBy(desc(projects.createdAt)),
    "content.projects",
  );
}

// `cache` makes the layout (provider) and the page (structured data) share one read per request.
export const getPublicContent = cache(async (locale: Locale): Promise<PublicContent> => {
  const [profileRow, skillRows, serviceRows, projectRows, resumeRows, socialRows] =
    await Promise.all([
      getProfileQuery(),
      getSkillsQuery(),
      getServicesQuery(),
      getProjectsQuery({ publishedOnly: true }),
      getResumeItemsQuery(),
      getSocialLinksQuery(),
    ]);

  if (!profileRow) {
    throw new Error("The profile table is empty. Run `pnpm db:seed` first.");
  }

  const localizeAll = <T extends object>(rows: T[]) => rows.map((row) => localize(row, locale));

  return {
    profile: localize(profileRow, locale),
    skills: localizeAll(skillRows),
    services: localizeAll(serviceRows),
    projects: localizeAll(projectRows),
    resume: localizeAll(resumeRows),
    socialLinks: localizeAll(socialRows),
  };
});
