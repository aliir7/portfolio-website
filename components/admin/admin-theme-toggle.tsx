"use client";

import { useEffect, useState } from "react";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";

export default function AdminThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <Button variant="outline" size="icon" disabled aria-label="تغییر پوسته" />;

  const isDark = theme === "dark";
  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={isDark ? "پوسته روشن" : "پوسته تیره"}
      title={isDark ? "پوسته روشن" : "پوسته تیره"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <RiSunLine /> : <RiMoonLine />}
    </Button>
  );
}
