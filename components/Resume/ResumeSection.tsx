"use client";

import ResumeColumn from "./ResumeColumn";
import Shape from "../ui/shape";
import RevealSection from "../ui/reveal-section";
import { useDictionary, useLocalizedContent } from "@/lib/i18n";

const ResumeSection = () => {
  const dictionary = useDictionary();
  const { resume } = useLocalizedContent();
  const educationItems = resume.filter((item) => item.category === "education");
  const experienceItems = resume.filter(
    (item) => item.category === "experience",
  );
  return (
    <RevealSection
      id="resume"
      delay={0.4}
      className="container-custom relative overflow-hidden py-20"
    >
      <div className="container-custom relative z-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dictionary.resume.title}
          </h2>
          <p className="text-muted-foreground dark:text-primary mx-auto mt-4 max-w-2xl leading-8">
            {dictionary.resume.subtitle}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ResumeColumn
            title={dictionary.resume.education}
            items={educationItems}
          />
          <ResumeColumn
            title={dictionary.resume.experience}
            items={experienceItems}
          />
        </div>
      </div>
      <div className="hidden md:block">
        <Shape
          width={226}
          className="absolute -bottom-51.5 -left-11.5 h-56.5 max-w-56.5"
          containerClassName="-right-18"
        />
      </div>
    </RevealSection>
  );
};

export default ResumeSection;
