import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";

function Navbar() {
  return (
    <section>
      <nav className="w-full flex items-center justify-between">
        <Link href="/">
          <Image
            src={assets.logo}
            alt="logo-img"
            className="w-28 cursor-pointer mr-14"
          />
        </Link>
        <ul>
          <li>
            <Link href="#Home">Home</Link>
          </li>
          <li>
            <Link href="#Home">Home</Link>
          </li>
          <li>
            <Link href="#Home">Home</Link>
          </li>
          <li>
            <Link href="#Home">Home</Link>
          </li>
          <li>
            <Link href="#Home">Home</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Navbar;
