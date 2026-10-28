import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import Pagination from "@/components/Pagination";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { WORKS_PAGE_SIZE } from "@/lib/constants";
import { paginate } from "@/lib/pagination";
import { siteUrl } from "@/lib/site";
import { getPublicContent } from "@/query/content.query";
import type { Locale } from "@/types";
import WorkCard from "./WorkCard";

/** Page 1 lives at /works, the others at /works/page/N (path-based, so every page is cacheable). */
export const worksHref = (page: number) => (page === 1 ? "/works" : `/works/page/${page}`);

export async function worksMetadata(locale: Locale, page: number): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "works" });
  return {
    title: page === 1 ? t("title") : t("pageTitle", { title: t("title"), page }),
    description: t("subtitle"),
    alternates: {
      canonical: `${siteUrl}/${locale}${worksHref(page)}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}${worksHref(page)}`])),
    },
  };
}

/** The projects-only list shared by /works and /works/page/N. */
export default async function WorksListing({ locale, page }: { locale: Locale; page: number }) {
  const [t, nav, { projects }] = await Promise.all([
    getTranslations({ locale, namespace: "works" }),
    getTranslations({ locale, namespace: "nav" }),
    getPublicContent(locale),
  ]);

  const { items, totalPages } = paginate(projects, page, WORKS_PAGE_SIZE);
  if (page > totalPages) notFound();

  return (
    <main className="container-custom pt-28 pb-20">
      <nav aria-label="Breadcrumb" className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
        <Link href="/" className="hover:text-primary transition-colors">{nav("home")}</Link>
        <span aria-hidden>/</span>
        <span className="text-foreground">{t("title")}</span>
      </nav>

      <header className="mx-auto mt-8 max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("title")}</h1>
        <p className="text-primary mt-4">{t("subtitle")}</p>
      </header>

      {items.length === 0 ? (
        <p className="text-muted-foreground mt-16 text-center">{t("empty")}</p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((project) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <Pagination
        locale={locale}
        page={page}
        totalPages={totalPages}
        hrefFor={worksHref}
        labels={{
          navigation: t("pagination"),
          previous: t("previous"),
          next: t("next"),
          page: (value) => t("pageLabel", { page: value }),
        }}
      />
    </main>
  );
}
