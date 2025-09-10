"use client";
import { useTheme } from "next-themes";
import { HiMoon, HiSun } from "react-icons/hi2";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="toggle theme"
      className="rounded-xl bg-gray-200 p-2 shadow dark:bg-gray-800"
    >
      {isDark ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
    </motion.button>
  );
}
