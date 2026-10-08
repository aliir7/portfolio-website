"use client";

import SkillItem from "./SkillItem";
import RevealSection from "../ui/reveal-section";
import { useDictionary } from "@/lib/i18n";

const SkillsSection = () => {
  const { skills } = useDictionary();
  return (
    <RevealSection
      id="skills"
      delay={0.2}
      className="custom-container mx-auto py-6"
    >
      <h2 className="mb-8 text-center text-3xl font-bold">{skills.title}</h2>
      <SkillItem />
    </RevealSection>
  );
};

export default SkillsSection;
