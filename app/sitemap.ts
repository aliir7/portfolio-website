import type { MetadataRoute } from "next";

const siteUrl = "https://www.alirezaeii.ir";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}/fa`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          fa: `${siteUrl}/fa`,
          en: `${siteUrl}/en`,
        },
      },
    },
    {
      url: `${siteUrl}/en`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          fa: `${siteUrl}/fa`,
          en: `${siteUrl}/en`,
        },
      },
    },
  ];
}
