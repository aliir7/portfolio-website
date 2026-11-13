import HeroSection from "../Hero/hero-section";
import ResumeSection from "../Resume/resume-section";
import { ServicesSection } from "../Services/services-section";
import SkillsSection from "../Skills/skills-section";
import WorksSection from "../Works/works-section";
import ContactSection from "../Contact/contact-section";
import Footer from "../Footer/site-footer";

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
