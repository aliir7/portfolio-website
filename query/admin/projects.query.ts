import "server-only";

import { desc } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { withQuery } from "@/lib/utils/with-query";

export function getAdminProjectsQuery() {
  return withQuery(() => db.select().from(projects).orderBy(desc(projects.createdAt)));
}
