import { navLinks } from "@/lib/constants";
import Link from "next/link";
import SocialList from "../Hero/SocialList";

type NavItemProps = {
  onNavigate?: () => void;
};

function NavItem({ onNavigate }: NavItemProps) {
  return (
    <div className="h-full w-full px-7 pt-20 sm:px-6 md:px-12">
      <ul className="space-y-3 text-base sm:text-lg">
        {navLinks.map((item, index) => (
          <li
            key={index}
            className="hover:text-primary font-bold transition-all duration-300 hover:-translate-x-0.5"
          >
            <Link href={item.href} onClick={onNavigate}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <SocialList />
      </div>
    </div>
  );
}

export default NavItem;
