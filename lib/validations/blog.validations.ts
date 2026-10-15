import { publishStatuses } from "@/db/schema/values";
import { z } from "zod";
import { urlOrPath } from "./localized.validations";

export const blogStatusSchema = z.enum(publishStatuses);

export const blogPostSchema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().trim().max(500).optional().or(z.literal("")),
  content: z.string().trim().min(1),
  coverImage: urlOrPath.optional(),
  status: blogStatusSchema,
  publishedAt: z.coerce.date().nullable().optional(),
  metaTitle: z.string().trim().max(70).optional().or(z.literal("")),
  metaDescription: z.string().trim().max(160).optional().or(z.literal("")),
  canonicalUrl: z.string().trim().url().optional().or(z.literal("")),
  ogImage: urlOrPath.optional(),
  noIndex: z.boolean().default(false),
  readingTimeMinutes: z
    .number()
    .int()
    .positive()
    .max(600)
    .nullable()
    .optional(),
  tagIds: z.array(z.string().trim().min(1)).max(20).default([]),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

export const blogTagSchema = z.object({
  name: z.string().trim().min(1).max(80),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

export type BlogTagInput = z.infer<typeof blogTagSchema>;
