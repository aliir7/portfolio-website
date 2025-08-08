"use client";

import ContactBtn from "../ui/ContactBtn";
import Logo from "./Logo";
import NavList from "./NavList";
import MobileMenuBtn from "../ui/MobileMenuBtn";
import ToggleTheme from "../ui/ToggleTheme";
import { useRef } from "react";
import { HiXMark } from "react-icons/hi2";

function Navbar() {
  const sideMenuRef = useRef<HTMLUListElement>(null);

  // handle open mobile menu
  const openMenu = () => {
    sideMenuRef.current!.style.transform = "translateX(-16rem)";
  };
  const closeMenu = () => {
    sideMenuRef.current!.style.transform = "translateX(16rem)";
  };
  return (
    <nav className="xl:px[8%] fixed z-50 flex w-full items-center justify-between px-5 py-4 lg:px-8">
      <Logo />
      <NavList className="font-Ovo hidden items-center gap-6 rounded-full bg-white px-12 py-3 opacity-50 shadow-sm md:flex lg:gap-8" />
      <div className="flex items-center gap-4">
        <ContactBtn />
        <ToggleTheme />
        <MobileMenuBtn openMenu={openMenu} />
      </div>
      {/* ---- mobile nav ---- */}
      <NavList
        className="fixed top-0 -right-64 bottom-0 z-50 flex h-screen w-64 flex-col gap-4 bg-rose-50 px-10 py-20 transition duration-500 md:hidden"
        sideMenuRef={sideMenuRef}
        closeMenu={closeMenu} // فقط برای موبایل
      >
        <div className="absolute top-6 right-6" onClick={closeMenu}>
          <HiXMark className="h-5 w-5 cursor-pointer" />
        </div>
      </NavList>
    </nav>
  );
}

export default Navbar;
