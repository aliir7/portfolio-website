"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { RiMoonLine, RiSunLine } from "@remixicon/react";

const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    const transitionDocument = document as Document & {
      startViewTransition?: (update: () => void) => void;
    };

    if (transitionDocument.startViewTransition) {
      transitionDocument.startViewTransition(() => setTheme(nextTheme));
      return;
    }

    setTheme(nextTheme);
  };

  return (
    <>
      <Button
        aria-label="تغییر تم"
        className={`rounded-full p-2 transition focus-visible:ring-0 focus-visible:ring-offset-0 ${className}`}
        onClick={toggleTheme}
        variant="ctaLink"
      >
        {theme === "dark" ? (
          <RiSunLine className="size-5" />
        ) : (
          <RiMoonLine className="size-5" />
        )}
      </Button>
    </>
  );
};

export default ThemeToggle;
