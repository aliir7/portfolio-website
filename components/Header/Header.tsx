"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

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
        isScrolled ? "bg-white shadow-md" : "bg-transparent",
      )}
    >
      <nav className="nav container flex h-20 max-w-385 items-center justify-between">
        {/* logo */}
        <Link href="/" className="text-xl font-bold">
          رضایی
        </Link>
        <div className="flex flex-row-reverse items-center gap-4">
          {/* nav btns */}
          <NavMenu />
          <ThemeToggle />
          {/* nav menu */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
