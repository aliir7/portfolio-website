"use client";

import { useEffect, useState } from "react";
import { RiEqualLine, RiCloseLine } from "@remixicon/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import NavItem from "./NavItem";
import { useDictionary, useLocale } from "@/lib/i18n";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dictionary = useDictionary();
  const locale = useLocale();

  // Close with press ESC handler
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 hover:bg-transparent"
          aria-label={isOpen ? dictionary.nav.contact : dictionary.nav.home}
        >
          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
              isOpen
                ? "scale-75 rotate-90 opacity-0"
                : "scale-100 rotate-0 opacity-100"
            }`}
          >
            <RiEqualLine className="size-8" />
          </span>

          <span
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
              isOpen
                ? "scale-100 rotate-0 opacity-100"
                : "scale-75 -rotate-90 opacity-0"
            }`}
          >
            <RiCloseLine className="size-8" />
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side={locale === "fa" ? "right" : "left"}
        showCloseButton={false}
        className={`z-1000 w-[82vw] max-w-80 p-0 shadow-lg transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          locale === "fa"
            ? "translate-x-full data-[state=open]:translate-x-0"
            : "-translate-x-full data-[state=open]:translate-x-0"
        }`}
        onEscapeKeyDown={() => setIsOpen(false)}
        onPointerDownOutside={() => setIsOpen(false)}
        onInteractOutside={() => setIsOpen(false)}
      >
        <SheetTitle className="sr-only">{dictionary.nav.home}</SheetTitle>
        <SheetDescription className="sr-only">
          {Object.values(dictionary.nav).join(", ")}
        </SheetDescription>

        <NavItem onNavigate={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default NavMenu;
