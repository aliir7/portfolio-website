import Home from "@/components/Home/Home";
import { getSeo } from "@/lib/seo";
import { absoluteUrl, defaultAvatar, siteUrl } from "@/lib/site";
import { getPublicContent } from "@/query/content.query";

// Rendered from the database and refreshed on demand by admin actions
// (`revalidatePublicContent`); the hourly window is only a safety net.
export const revalidate = 3600;

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const content = await getPublicContent(isEnglish ? "en" : "fa");
  const { profile } = content;

  const { description } = await getSeo(isEnglish ? "en" : "fa");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        url: `${siteUrl}/${locale}`,
        image: absoluteUrl(profile.avatarUrl ?? defaultAvatar),
        jobTitle: profile.role,
        description,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tehran",
          addressCountry: "IR",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: isEnglish ? `${profile.name} Portfolio` : `پورتفولیوی ${profile.name}`,
        description,
        inLanguage: locale,
        publisher: { "@id": `${siteUrl}/#person` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Home />
    </>
  );
}
