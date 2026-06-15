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
import { RiEqualLine, RiCloseLine } from "@remixicon/react"; // فرض بر این است که از RiCloseLine برای حالت بسته استفاده می‌کنید

const NavMenu = () => {
  // تعریف استیت برای نگهداری وضعیت باز/بسته بودن منو
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="link"
          className="ease-custom transition-transform duration-700"
        >
          {/* رندر شرطی آیکون‌ها بر اساس وضعیت isOpen و استفاده از کلاس Tailwind برای حل مشکل سایز */}
          {isOpen ? (
            <RiCloseLine className="text-foreground size-6" />
          ) : (
            <RiEqualLine className="text-foreground size-6" />
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="z-1000" side="right" showCloseButton={false}>
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <NavItem />
      </SheetContent>
    </Sheet>
  );
};

export default NavMenu;
