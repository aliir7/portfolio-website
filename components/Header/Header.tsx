import { navLinks } from "@/lib/constants";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import NavMenu from "./NavMenu";

const Header = () => {
  return (
    <header className="fixed top-0 right-0 z-1000 w-full">
      <nav className="container-custom nav flex h-20 max-w-385 items-center justify-between">
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
