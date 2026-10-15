// Usage: pnpm db:seed   (requires DATABASE_URL and SEED_ADMIN_PASSWORD in .env)
//
// Idempotent and non-destructive: a table that already has rows is skipped, so
// re-running never overwrites content edited from the admin panel.
import { hashPassword } from "better-auth/crypto";
import { eq } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import { db } from "../client";
import { runBatch } from "../helpers";
import {
  account,
  blogPostTags,
  blogPosts,
  blogTags,
  profile,
  projects,
  resumeItems,
  services,
  skills,
  socialLinks,
  user,
} from "../schema";
import {
  adminSeed,
  blogPostTagsSeed,
  blogPostsSeed,
  blogTagsSeed,
  profileSeed,
  projectsSeed,
  resumeSeed,
  servicesSeed,
  skillsSeed,
  socialLinksSeed,
} from "./data";

async function seedIfEmpty<T extends PgTable>(label: string, table: T, rows: T["$inferInsert"][]) {
  if ((await db.$count(table)) > 0) {
    console.log(`- ${label}: skipped (already has data)`);
    return;
  }
  // `never`: Drizzle's insert type cannot be resolved for a generic table.
  await db.insert(table).values(rows as never);
  console.log(`+ ${label}: ${rows.length} row(s)`);
}

/** Returns the admin's user id (existing or newly created). */
async function seedAdmin(password: string): Promise<string> {
  const [existing] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, adminSeed.email))
    .limit(1);

  if (existing) {
    console.log(`- admin: skipped (${adminSeed.email} already exists; password untouched)`);
    return existing.id;
  }

  const userId = crypto.randomUUID();
  // Same shape Better Auth writes for email/password sign-up: a `user` row plus a
  // `credential` account holding the scrypt hash. Written directly because sign-up
  // is disabled and the captcha plugin guards the HTTP endpoints.
  await runBatch([
    db.insert(user).values({ id: userId, ...adminSeed, emailVerified: true, role: "admin" }),
    db.insert(account).values({
      id: crypto.randomUUID(),
      accountId: userId,
      providerId: "credential",
      userId,
      password: await hashPassword(password),
    }),
  ]);
  console.log(`+ admin: ${adminSeed.email}`);
  return userId;
}

/** Tags, posts and their links go in together, atomically, and only into an empty blog. */
async function seedBlog(authorId: string) {
  if ((await db.$count(blogPosts)) > 0 || (await db.$count(blogTags)) > 0) {
    console.log("- blog: skipped (already has data)");
    return;
  }
  await runBatch([
    db.insert(blogTags).values(blogTagsSeed),
    db.insert(blogPosts).values(blogPostsSeed(authorId)),
    db.insert(blogPostTags).values(blogPostTagsSeed),
  ]);
  console.log(`+ blog: ${blogTagsSeed.length} tags, ${blogPostsSeed(authorId).length} posts`);
}

async function main() {
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!password || password.length < 8) {
    throw new Error("Set SEED_ADMIN_PASSWORD (at least 8 characters) before seeding.");
  }

  await seedIfEmpty("profile", profile, [profileSeed]);
  await seedIfEmpty("skills", skills, skillsSeed);
  await seedIfEmpty("services", services, servicesSeed);
  await seedIfEmpty("projects", projects, projectsSeed);
  await seedIfEmpty("resume", resumeItems, resumeSeed);
  await seedIfEmpty("social links", socialLinks, socialLinksSeed);
  const adminId = await seedAdmin(password);
  await seedBlog(adminId);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
