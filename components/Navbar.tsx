"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-40 w-full border-b border-[rgba(255,255,255,0.03)] bg-[rgba(11,10,19,0.4)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="text-accent font-bold">Ali Rezaei</div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#portfolio" className="text-sm">
            نمونه‌کارها
          </a>
          <a href="#experience" className="text-sm">
            سوابق
          </a>
          <a href="#contact" className="text-sm">
            ارتباط
          </a>
          <ThemeToggle />
        </nav>

        {/* mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            aria-label="باز کردن منو"
            className="p-2"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
