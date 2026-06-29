import HeroSection from "../Hero/HeroSection";
import { ServicesSection } from "../Services/ServicesSection";
import SkillsSection from "../Skills/SkillsSection";
import WorksSection from "../Works/WorksSection";

const Home = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <ServicesSection />
      <SkillsSection />
      <WorksSection />
    </main>
  );
};

export default Home;
