"use client";
import { Link } from "@/i18n/navigation";
import { useDictionary, useDocumentLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import LanguageToggle from "./LanguageToggle";
import NavMenu from "./NavMenu";
import ThemeToggle from "./ThemeToggle";

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
        "fixed top-0 right-0 z-1000 w-full border-b border-transparent transition-all duration-500",
        isScrolled
          ? "border-border/60 bg-card/90 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <nav className="nav container flex h-20 max-w-385 items-center justify-between">
        {/* logo */}
        <Link href="/" className="text-xl font-bold">
          <Image
            src="/assets/img/logo.png"
            alt="Logo"
            width={40}
            height={40}
            loading="eager"
          />
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
