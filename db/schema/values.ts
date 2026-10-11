// Plain value lists with no imports, so they can be shared safely by the DB
// schema, Zod validations and client components (single source of truth).

export const projectCategories = ["frontend", "fullstack", "dashboard"] as const;
export const publishStatuses = ["draft", "published"] as const;
export const resumeCategories = ["education", "experience"] as const;
export const socialPlatforms = ["github", "linkedin", "telegram", "instagram"] as const;
