import Home from "@/components/Home/Home";

const siteUrl = "https://www.alirezaeii.ir";

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const personName = isEnglish ? "Ali Rezaei" : "علی رضایی";
  const description = isEnglish
    ? "The portfolio of Ali Rezaei, a React and Next.js developer based in Tehran."
    : "پورتفولیوی علی رضایی، برنامه‌نویس React و Next.js ساکن تهران.";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: personName,
        url: `${siteUrl}/${locale}`,
        image: `${siteUrl}/assets/img/user_img.png`,
        jobTitle: isEnglish ? "React & Next.js Developer" : "برنامه‌نویس React و Next.js",
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
        name: isEnglish ? "Ali Rezaei Portfolio" : "پورتفولیوی علی رضایی",
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
