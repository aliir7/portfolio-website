import HeroSection from "../Hero/HeroSection";
import ResumeSection from "../Resume/ResumeSection";
import { ServicesSection } from "../Services/ServicesSection";
import SkillsSection from "../Skills/SkillsSection";
import WorksSection from "../Works/WorksSection";
import ContactSection from "../Contact/ContactSection";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <>
      <main id="home" className="overflow-hidden">
        <HeroSection />
        <ServicesSection />
        <SkillsSection />
        <WorksSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;
