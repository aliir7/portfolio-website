import { z } from "zod";

export const siteSettingsSchema = z.object({
  siteName: z.string().trim().min(1).max(120),
  siteTitle: z.string().trim().min(1).max(160),
  siteDescription: z.string().trim().min(1).max(320),
  locale: z.string().trim().min(2).max(10),
  logoUrl: z.string().trim().url().optional().or(z.literal("")),
  faviconUrl: z.string().trim().url().optional().or(z.literal("")),
});

export const socialSettingsSchema = z.object({
  github: z.string().trim().url().optional().or(z.literal("")),
  linkedin: z.string().trim().url().optional().or(z.literal("")),
  telegram: z.string().trim().url().optional().or(z.literal("")),
  instagram: z.string().trim().url().optional().or(z.literal("")),
});

export const seoSettingsSchema = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(320),
  keywords: z.array(z.string().trim().min(1).max(80)).max(30),
  ogImage: z.string().trim().url().optional().or(z.literal("")),
  twitterImage: z.string().trim().url().optional().or(z.literal("")),
  canonicalUrl: z.string().trim().url().optional().or(z.literal("")),
});
