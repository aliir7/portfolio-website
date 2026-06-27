import SkillItem from "./SkillItem";

const SkillsSection = () => {
  return (
    <section className="custom-container mx-auto py-6">
      <h2
        className="mb-8 text-center text-3xl font-bold"
        data-title="My Talent"
      >
        مهارت های من
      </h2>
      <SkillItem />
    </section>
  );
};

export default SkillsSection;
