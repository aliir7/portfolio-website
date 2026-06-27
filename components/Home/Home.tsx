import HeroSection from "../Hero/HeroSection";
import { ServicesSection } from "../Services/ServicesSection";
import SkillsSection from "../Skills/SkillsSection";

const Home = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <ServicesSection />
      <SkillsSection />
    </main>
  );
};

export default Home;
