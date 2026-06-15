"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import NavItem from "./NavItem";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="link"
          className="relative h-7 w-7 p-0 hover:no-underline"
          aria-label="Toggle Menu"
        >
          {/* المان نگهدارنده خطوط منو */}
          <div
            className={`ease-custom before:bg-foreground after:bg-foreground absolute left-0 h-full w-full transition-transform duration-300 before:absolute before:left-0 before:h-0.5 before:w-full before:transition-all before:duration-300 before:content-[''] after:absolute after:left-0 after:h-0.5 after:w-full after:transition-all after:duration-300 after:content-[''] ${
              isOpen
                ? "before:top-3.25 before:rotate-45 after:bottom-3.25 after:-rotate-45"
                : "before:top-1.75 after:bottom-1.75"
            } `}
          ></div>
        </Button>
      </SheetTrigger>

      <SheetContent className="z-1000" side="right" showCloseButton={false}>
        <SheetTitle className="sr-only">منوی ناوبری</SheetTitle>
        <SheetDescription className="sr-only">
          لینک‌های دسترسی سایت
        </SheetDescription>

        <NavItem />
      </SheetContent>
    </Sheet>
  );
};

export default NavMenu;
