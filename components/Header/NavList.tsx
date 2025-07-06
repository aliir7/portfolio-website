import Link from "next/link";

function NavList() {
  return (
    <ul className="font-Ovo hidden items-center gap-6 rounded-full bg-white px-12 py-3 opacity-50 shadow-sm md:flex lg:gap-8">
      <li>
        <Link href="#top">Home</Link>
      </li>
      <li>
        <Link href="#about">About me</Link>
      </li>
      <li>
        <Link href="#services">Services</Link>
      </li>
      <li>
        <Link href="#works">My works</Link>
      </li>
      <li>
        <Link href="#contact">Contact me</Link>
      </li>
    </ul>
  );
}

export default NavList;
