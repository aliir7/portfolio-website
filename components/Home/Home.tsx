import HeroSection from "../Hero/HeroSection";
import { ServicesSection } from "../Services/ServicesSection";

const Home = () => {
  return (
    <main>
      {/* Background accents */}
      {/* <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[40rem] bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-foreground/5 blur-3xl" />
      </div> */}

      <HeroSection />
      <ServicesSection />
    </main>
  );
};

export default Home;
