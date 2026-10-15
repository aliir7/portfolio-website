/** Canonical public origin, shared by metadata, sitemap, robots and structured data. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.alirezaeii.ir";

/** Shown until a profile photo is uploaded; also the last-resort social-preview image. */
export const defaultAvatar = "/assets/img/user_img.png";
export const defaultOgImage = defaultAvatar;

/** Site paths become absolute (for structured data); uploaded URLs are returned unchanged. */
export const absoluteUrl = (pathOrUrl: string) =>
  pathOrUrl.startsWith("http") ? pathOrUrl : `${siteUrl}${pathOrUrl}`;
