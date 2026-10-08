"use client";

import WorksFilter from "./WorksFilter";
import WorksGrid from "./WorksGrid";
import Shape from "../ui/shape";
import RevealSection from "../ui/reveal-section";
import { useDictionary, useLocalizedContent } from "@/lib/i18n";

const WorksSection = () => {
  const dictionary = useDictionary();
  const { projects } = useLocalizedContent();
  return (
    <RevealSection
      id="works"
      delay={0.3}
      className="container-custom relative py-16"
    >
      {/* ✅ Decorative Shape */}
      <Shape containerClassName="right-1 p top-55 h-2/3 hidden md:block" />

      {/* ✅ Content Wrapper */}
      <div className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dictionary.works.title}
          </h2>

          <p className="text-primary mt-4">
            {dictionary.works.subtitle}
          </p>
        </div>

        <WorksFilter />

        <div className="mt-10">
          <WorksGrid projects={projects} />
        </div>
      </div>
    </RevealSection>
  );
};

export default WorksSection;
