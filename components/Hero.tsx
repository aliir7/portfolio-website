"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-8 px-4 py-24 md:flex-row">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1"
      >
        <h1 className="mb-4 text-4xl font-bold">سلام، من علی رضایی هستم</h1>
        <p className="text-muted mb-6">
          توسعه‌دهنده فرانت‌اند؛ طراحی UI/UX و ساخت تجربه‌های سریع و زیبا
        </p>
        <div className="flex gap-3">
          <motion.a
            whileTap={{ scale: 0.98 }}
            className="btn-accent rounded px-4 py-2"
          >
            تماس
          </motion.a>
          <a
            href="#portfolio"
            className="rounded border border-[rgba(255,255,255,0.06)] px-4 py-2"
          >
            نمونه‌کار
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="h-48 w-48 overflow-hidden rounded-full shadow-lg"
      >
        <Image src="/man.png" width={192} height={192} alt="profile" />
      </motion.div>
    </div>
  );
}
