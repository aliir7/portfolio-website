export type SiteSettings = {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  locale: string;
  logoUrl?: string;
  faviconUrl?: string;
};

export type SocialSettings = {
  github?: string;
  linkedin?: string;
  telegram?: string;
  instagram?: string;
};

export type SeoSettings = {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  twitterImage?: string;
  canonicalUrl?: string;
};

export type SettingsMap = {
  site: SiteSettings;
  social: SocialSettings;
  seo: SeoSettings;
};
