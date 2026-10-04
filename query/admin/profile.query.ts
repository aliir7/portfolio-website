import "server-only";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { profile, skills } from "@/db/schema";
import { withQuery } from "@/lib/utils/with-query";

export function getAdminProfileQuery() {
  return withQuery(async () => {
    const [item] = await db.select().from(profile).where(eq(profile.id, 1)).limit(1);
    const skillRows = await db.select().from(skills).orderBy(skills.sortOrder);
    return { profile: item ?? null, skills: skillRows };
  });
}
