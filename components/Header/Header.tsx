"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import ThemeToggle from "./ThemeToggle";
import { useDocumentLocale, useDictionary } from "@/lib/i18n";
import LanguageToggle from "./LanguageToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const locale = useDocumentLocale();
  const dictionary = useDictionary();

  // useEffect for scrolling handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 20);
    };

    // add event listener
    window.addEventListener("scroll", handleScroll);

    // clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-1000 w-full transition-all duration-500",
        isScrolled ? "bg-card shadow-md" : "bg-transparent",
      )}
    >
      <nav className="nav container flex h-20 max-w-385 items-center justify-between">
        {/* logo */}
        <Link href={`/${locale}`} className="text-xl font-bold">
          {locale === "fa" ? "رضایی" : "Rezaei"}
        </Link>
        <div className="flex flex-row-reverse items-center gap-4">
          {/* nav btns */}
          <NavMenu />
          <ThemeToggle />
          <LanguageToggle label={dictionary.common.language} />
          {/* nav menu */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
