import type { ComponentType } from "react";
import type { SocialPlatform } from "@/types";
import {
  RiGithubLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
  RiTelegramLine,
} from "@remixicon/react";

// UI-only constants. Portfolio content (profile, skills, services, projects,
// resume, social URLs) lives in the database; see db/seed/data.ts.

/** Label and icon for each `social_links.platform` value. */
export const socialIcons: Record<
  SocialPlatform,
  { label: string; icon: ComponentType<{ className?: string }> }
> = {
  github: { label: "GitHub", icon: RiGithubLine },
  linkedin: { label: "LinkedIn", icon: RiLinkedinBoxLine },
  telegram: { label: "Telegram", icon: RiTelegramLine },
  instagram: { label: "Instagram", icon: RiInstagramLine },
};

/** Cloudinary folders used by the admin image uploaders. */
export const uploadFolders = {
  blog: "portfolio/blog",
  projects: "portfolio/projects",
  site: "portfolio/site",
  profile: "portfolio/profile",
} as const;

/** Projects shown in the home-page slider ("view all" opens the full list). */
export const WORKS_SLIDER_COUNT = 6;
/** Projects per page on /works. */
export const WORKS_PAGE_SIZE = 3;

/** Most technology chips on a project card (more collapse into "+N"); the project page lists all of them. */
export const WORK_CARD_MAX_BADGES = 4;
