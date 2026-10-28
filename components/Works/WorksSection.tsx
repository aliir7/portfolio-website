"use client";

import { Button } from "@/components/ui/button";
import { WORKS_SLIDER_COUNT } from "@/lib/constants";
import { useContent } from "@/lib/content";
import { useDictionary } from "@/lib/i18n";
import { Link } from "@/i18n/navigation";
import RevealSection from "../ui/reveal-section";
import WorksSlider from "./WorksSlider";

const WorksSection = () => {
  const dictionary = useDictionary();
  const { projects } = useContent();

  return (
    <RevealSection id="works" delay={0.3} className="container-custom relative py-16">
      <div className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dictionary.works.title}</h2>
          <p className="text-primary mt-4">{dictionary.works.subtitle}</p>
        </div>

        {projects.length === 0 ? (
          <p className="text-muted-foreground mt-16 text-center">{dictionary.common.noProjects}</p>
        ) : (
          <>
            <WorksSlider projects={projects.slice(0, WORKS_SLIDER_COUNT)} />
            <div className="mt-10 flex justify-center">
              <Button asChild variant="cta" size="lg">
                <Link href="/works">{dictionary.works.viewAll}</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </RevealSection>
  );
};

export default WorksSection;
