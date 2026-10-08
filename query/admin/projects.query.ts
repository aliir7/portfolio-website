import "server-only";

import { desc } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import type { AdminProject } from "@/types";
import { withQuery } from "@/lib/utils/with-query";

export function getAdminProjectsQuery(): Promise<AdminProject[]> {
  return withQuery(async () => {
    const rows = await db.select().from(projects).orderBy(desc(projects.createdAt));
    return rows.map((project) => ({
      ...project,
      category: project.category as AdminProject["category"],
      status: project.status as AdminProject["status"],
    }));
  }, "admin.projects.list");
}
