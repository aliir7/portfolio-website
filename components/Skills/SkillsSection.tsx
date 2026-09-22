import SkillItem from "./SkillItem";
import RevealSection from "../ui/reveal-section";

const SkillsSection = () => {
  return (
    <RevealSection
      id="skills"
      delay={0.2}
      className="container-custom section-gradient relative"
    >
      <h2 className="mb-8 text-center text-3xl font-bold">مهارت های من</h2>
      <SkillItem />
    </RevealSection>
  );
};

export default SkillsSection;
