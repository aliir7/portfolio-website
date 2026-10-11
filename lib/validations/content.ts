import { z } from "zod";
import { resumeCategories, socialPlatforms } from "@/db/schema/values";
import { localizedText } from "./localized";

export const serviceSchema = z.object({
  title: localizedText(160),
  subtitle: localizedText(160),
  description: localizedText(1000),
});

export const resumeItemSchema = z.object({
  category: z.enum(resumeCategories),
  organization: localizedText(160),
  title: localizedText(160),
  period: localizedText(80),
  content: localizedText(1000),
});

export const socialLinkSchema = z.object({
  platform: z.enum(socialPlatforms),
  href: z.string().trim().url().max(500),
});

export const servicesSchema = z.array(serviceSchema).max(30);
export const resumeSchema = z.array(resumeItemSchema).max(50);
export const socialLinksSchema = z.array(socialLinkSchema).max(socialPlatforms.length);
