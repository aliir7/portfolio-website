import type {
  profile,
  projects,
  resumeItems,
  services,
  skills,
  socialLinks,
} from "@/db/schema";
import type { LocalizedText } from "@/db/schema/_shared";
import type { socialPlatforms } from "@/db/schema/values";
import type { Locale } from "@/i18n/routing";
import type {
  resumeItemSchema,
  serviceSchema,
  socialLinkSchema,
} from "@/lib/validations/content.validations";
import type { z } from "zod";

export type { Locale, LocalizedText };
export type SocialPlatform = (typeof socialPlatforms)[number];

export type ServiceInput = z.infer<typeof serviceSchema>;
export type ResumeItemInput = z.infer<typeof resumeItemSchema>;
export type SocialLinkInput = z.infer<typeof socialLinkSchema>;

/** Replaces every `{ fa, en }` column of a DB row with the string for one locale. */
export type Localized<T> = {
  [K in keyof T]: T[K] extends LocalizedText ? string : T[K];
};

export type PublicProfile = Localized<typeof profile.$inferSelect>;
export type PublicSkill = Localized<typeof skills.$inferSelect>;
export type PublicService = Localized<typeof services.$inferSelect>;
export type PublicProject = Localized<typeof projects.$inferSelect>;
export type PublicResumeItem = Localized<typeof resumeItems.$inferSelect>;
export type PublicSocialLink = Localized<typeof socialLinks.$inferSelect>;

/** Everything the public site renders, already resolved to one locale. */
export type PublicContent = {
  profile: PublicProfile;
  skills: PublicSkill[];
  services: PublicService[];
  projects: PublicProject[];
  resume: PublicResumeItem[];
  socialLinks: PublicSocialLink[];
};
