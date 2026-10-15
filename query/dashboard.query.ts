import "server-only";

import { desc, eq, isNull } from "drizzle-orm";
import { db } from "@/db";
import { blogPosts, contactMessages, projects } from "@/db/schema";
import { withQuery } from "@/lib/utils/with-query";

/** Everything the admin dashboard shows, read in parallel (small, admin-only traffic). */
export function getDashboardQuery() {
  return withQuery(async () => {
    const [
      projectCount,
      publishedProjectCount,
      postCount,
      publishedPostCount,
      unreadMessageCount,
      messageCount,
      recentMessages,
      recentPosts,
      recentProjects,
    ] = await Promise.all([
      db.$count(projects),
      db.$count(projects, eq(projects.status, "published")),
      db.$count(blogPosts),
      db.$count(blogPosts, eq(blogPosts.status, "published")),
      db.$count(contactMessages, isNull(contactMessages.readAt)),
      db.$count(contactMessages),
      db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(5),
      db
        .select({ id: blogPosts.id, title: blogPosts.title, status: blogPosts.status, updatedAt: blogPosts.updatedAt })
        .from(blogPosts)
        .orderBy(desc(blogPosts.updatedAt))
        .limit(5),
      db.select().from(projects).orderBy(desc(projects.createdAt)).limit(5),
    ]);

    return {
      counts: { projectCount, publishedProjectCount, postCount, publishedPostCount, unreadMessageCount, messageCount },
      recentMessages,
      recentPosts,
      recentProjects,
    };
  }, "dashboard");
}

export type DashboardData = Awaited<ReturnType<typeof getDashboardQuery>>;
