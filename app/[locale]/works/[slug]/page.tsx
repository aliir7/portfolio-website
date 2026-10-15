import { RiExternalLinkLine, RiGithubLine } from "@remixicon/react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TechBadges from "@/components/Works/TechBadges";
import { Link } from "@/i18n/navigation";
import { hasLocale, routing } from "@/i18n/routing";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils/format-date";
import { getPublicContent, getPublicProject } from "@/query/content.query";

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) return {};

  const project = await getPublicProject(locale, slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/works/${slug}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}/works/${slug}`])),
    },
    openGraph: {
      type: "website",
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();

  const project = await getPublicProject(locale, slug);
  if (!project) notFound();

  const [works, common, { profile }] = await Promise.all([
    getTranslations({ locale, namespace: "works" }),
    getTranslations({ locale, namespace: "common" }),
    getPublicContent(locale),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image ? absoluteUrl(project.image) : undefined,
    dateCreated: project.createdAt.toISOString(),
    url: `${siteUrl}/${locale}/works/${slug}`,
    inLanguage: locale,
    author: { "@type": "Person", name: profile.name, url: `${siteUrl}/${locale}` },
  };

  return (
    <main className="container-custom pt-32 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <article className="mx-auto max-w-4xl space-y-8">
        <Link href="/#works" className="text-primary text-sm font-medium">
          {works("back")}
        </Link>

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="bg-primary text-primary-foreground px-3 py-3">
              {common(project.category)}
            </Badge>
            <span className="text-muted-foreground text-sm">{formatDate(project.createdAt, locale)}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
        </header>

        <div className="relative aspect-video overflow-hidden rounded-2xl">
          <Image
            src={project.image || "/assets/img/placeholder.svg"}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
        </div>

        <p className="text-muted-foreground text-lg leading-8">{project.description}</p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold">{works("technologies")}</h2>
          <TechBadges items={project.techStack} />
        </section>

        {(project.liveUrl || project.repoUrl) && (
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <Button asChild variant="cta" size="lg">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <RiExternalLinkLine /> {common("viewProject")}
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button asChild variant="outline" size="lg">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <RiGithubLine /> {common("repository")}
                </a>
              </Button>
            )}
          </div>
        )}
      </article>
    </main>
  );
}
