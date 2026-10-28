import { RiExternalLinkLine, RiGithubLine } from "@remixicon/react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import BlogContent from "@/components/Blog/BlogContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TechBadges from "@/components/Works/TechBadges";
import WorkCard from "@/components/Works/WorkCard";
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
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${siteUrl}/${l}/works/${slug}`]),
      ),
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

  const [works, common, nav, { profile, projects }] = await Promise.all([
    getTranslations({ locale, namespace: "works" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "nav" }),
    getPublicContent(locale),
  ]);

  // Up to three other projects, same category first.
  const related = projects
    .filter((item) => item.id !== project.id)
    .sort(
      (a, b) =>
        Number(b.category === project.category) -
        Number(a.category === project.category),
    )
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.image ? absoluteUrl(project.image) : undefined,
    dateCreated: project.createdAt.toISOString(),
    url: `${siteUrl}/${locale}/works/${slug}`,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: profile.name,
      url: `${siteUrl}/${locale}`,
    },
  };

  return (
    <main className="container-custom pt-28 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <nav
        aria-label="Breadcrumb"
        className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm"
      >
        <Link href="/" className="hover:text-primary transition-colors">
          {nav("home")}
        </Link>
        <span aria-hidden>/</span>
        <Link href="/#works" className="hover:text-primary transition-colors">
          {works("title")}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-foreground line-clamp-1">{project.title}</span>
      </nav>

      <header className="mt-8 max-w-3xl space-y-5">
        <Badge className="px-3 py-3">{common(project.category)}</Badge>
        <h1 className="text-4xl leading-tight font-black tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="text-muted-foreground text-lg leading-8">
          {project.description}
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div className="min-w-0 space-y-10">
          <div className="border-border/60 relative aspect-16/10 overflow-hidden rounded-3xl border shadow-lg">
            <Image
              src={project.image || "/assets/img/placeholder.svg"}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </div>

          {project.content && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold">{works("about")}</h2>
              <BlogContent content={project.content} />
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-28">
          <Card className="glass-panel border">
            <CardHeader>
              <CardTitle>{works("details")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{works("category")}</dt>
                  <dd className="font-medium">{common(project.category)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{works("date")}</dt>
                  <dd className="font-medium">
                    {formatDate(project.createdAt, locale)}
                  </dd>
                </div>
              </dl>

              <div className="space-y-3">
                <h3 className="text-sm font-bold">{works("technologies")}</h3>
                <TechBadges items={project.techStack} />
              </div>

              {(project.liveUrl || project.repoUrl) && (
                <div className="grid gap-3">
                  {project.liveUrl && (
                    <Button asChild variant="cta" size="lg">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <RiExternalLinkLine /> {common("viewProject")}
                      </a>
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button asChild variant="outline" size="lg">
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <RiGithubLine /> {common("repository")}
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-20 space-y-6">
          <h2 className="text-2xl font-bold">{works("related")}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <WorkCard key={item.id} project={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
