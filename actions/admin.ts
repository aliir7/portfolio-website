"use server";

import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { profile, projects, skills } from "@/db/schema";
import { requireAdmin } from "@/lib/auth-guard";

const projectSchema = z.object({
  title: z.string().trim().min(1).max(160),
  slug: z.string().trim().min(1).max(160).regex(/^[a-z0-9-]+$/),
  description: z.string().trim().min(1).max(5000),
  category: z.enum(["frontend", "fullstack", "dashboard"]),
  techStack: z.array(z.string().trim().min(1).max(60)).max(30),
  repoUrl: z.string().trim().url().or(z.literal("")),
  liveUrl: z.string().trim().url().or(z.literal("")),
  status: z.enum(["published", "draft"]),
});

const profileSchema = z.object({
  name: z.string().trim().min(1).max(120),
  role: z.string().trim().min(1).max(160),
  bio: z.string().trim().min(1).max(5000),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1).max(50),
  location: z.string().trim().min(1).max(160),
  githubUrl: z.string().trim().url(),
  resumeUrl: z.string().trim().min(1).max(500),
});

const skillSchema = z.object({
  name: z.string().trim().min(1).max(120),
  value: z.number().int().min(0).max(100),
  description: z.string().trim().min(1).max(1000),
});

export async function listProjectsAction() {
  await requireAdmin();
  return db.select().from(projects).orderBy(desc(projects.createdAt));
}

export async function createProjectAction(input: unknown) {
  await requireAdmin();
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) throw new Error("اطلاعات پروژه معتبر نیست.");
  const project = { id: crypto.randomUUID(), ...parsed.data };
  await db.insert(projects).values(project);
  return project;
}

export async function updateProjectAction(id: string, input: unknown) {
  await requireAdmin();
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) throw new Error("اطلاعات پروژه معتبر نیست.");
  await db.update(projects).set({ ...parsed.data, updatedAt: new Date() }).where(eq(projects.id, id));
  return { id, ...parsed.data };
}

export async function deleteProjectAction(id: string) {
  await requireAdmin();
  await db.delete(projects).where(eq(projects.id, id));
}

export async function getProfileAction() {
  await requireAdmin();
  const [item] = await db.select().from(profile).where(eq(profile.id, 1)).limit(1);
  const skillRows = await db.select().from(skills).orderBy(skills.sortOrder);
  return { profile: item ?? null, skills: skillRows };
}

export async function updateProfileAction(input: unknown, skillRows: unknown) {
  await requireAdmin();
  const parsed = profileSchema.safeParse(input);
  const parsedSkills = z.array(skillSchema).safeParse(skillRows);
  if (!parsed.success || !parsedSkills.success) throw new Error("اطلاعات پروفایل معتبر نیست.");

  await db.insert(profile).values({ id: 1, ...parsed.data }).onConflictDoUpdate({
    target: profile.id,
    set: { ...parsed.data, updatedAt: new Date() },
  });

  await db.delete(skills);
  if (parsedSkills.data.length) {
    await db.insert(skills).values(parsedSkills.data.map((skill, index) => ({
      id: crypto.randomUUID(),
      ...skill,
      sortOrder: index,
      updatedAt: new Date(),
    })));
  }

  return { success: true };
}

export async function createSkillAction(input: unknown) {
  await requireAdmin();
  const parsed = skillSchema.safeParse(input);
  if (!parsed.success) throw new Error("اطلاعات مهارت معتبر نیست.");
  const current = await db.select({ id: skills.id }).from(skills);
  const skill = { id: crypto.randomUUID(), ...parsed.data, sortOrder: current.length, updatedAt: new Date() };
  await db.insert(skills).values(skill);
  return skill;
}
