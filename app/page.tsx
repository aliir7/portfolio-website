import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";

export default function Home() {
  return (
    <>
      <section
        id="hero"
        className="flex min-h-screen items-center justify-center"
      >
        <Hero />
      </section>

      <section id="portfolio" className="py-20">
        <Portfolio />
      </section>

      {/* <section id="experience" className="py-20">
        <Experience />
      </section>

      <section id="contact" className="py-20">
        <Contact />
      </section> */}
    </>
  );
}
