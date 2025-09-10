"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="flex min-h-[70vh] snap-center flex-col items-center justify-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold md:text-6xl"
      >
        سلام 👋 من <span className="text-blue-600">علی رضایی</span> هستم
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600 md:text-xl dark:text-gray-300"
      >
        توسعه‌دهنده‌ی فرانت‌اند با تمرکز روی <strong>Next.js</strong>،{" "}
        <strong>TypeScript</strong>،<strong> TailwindCSS</strong> و انیمیشن‌های
        نرم با <strong>Framer Motion</strong> و <strong>GSAP</strong>.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 flex gap-3"
      >
        <a
          href="#projects"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          نمونه‌کارها
        </a>
        <a
          href="#contact"
          className="rounded-md border border-gray-300 px-4 py-2 dark:border-gray-700"
        >
          تماس
        </a>
      </motion.div>
    </div>
  );
}
