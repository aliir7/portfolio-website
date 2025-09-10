"use client";

import ContactSection from "@/components/ContactSection/ContactSection";
import HeroSection from "@/components/HeroSection/HeroSection";

import PortfolioSection from "@/components/PortfolioSection/PortfolioSection";
import ServicesSection from "@/components/ServicesSection/ServicesSection";
import ThemeToggle from "@/components/ui/ToggleTheme";
import { motion } from "motion/react";

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl p-6">
      <header className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">پورتفولیو</h1>
        <ThemeToggle />
      </header>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-24"
      >
        <section id="hero">
          <HeroSection />
        </section>
        <section id="projects">
          <PortfolioSection />
        </section>
        <section id="services">
          <ServicesSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </motion.div>
    </main>
  );
}
