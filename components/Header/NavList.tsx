import Link from "next/link";
import type React from "react";

type Props = {
  className?: string;
  sideMenuRef?: React.RefObject<HTMLUListElement | null>;
  children?: React.ReactNode;
  closeMenu?: () => void;
};

function NavList({ className, sideMenuRef, children, closeMenu }: Props) {
  return (
    <ul ref={sideMenuRef} className={className ?? ""}>
      {children}
      <li onClick={closeMenu}>
        <Link href="#top">Home</Link>
      </li>
      <li onClick={closeMenu}>
        <Link href="#about">About me</Link>
      </li>
      <li onClick={closeMenu}>
        <Link href="#services">Services</Link>
      </li>
      <li onClick={closeMenu}>
        <Link href="#works">My works</Link>
      </li>
      <li onClick={closeMenu}>
        <Link href="#contact">Contact me</Link>
      </li>
    </ul>
  );
}

export default NavList;
