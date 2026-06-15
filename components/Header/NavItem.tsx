import { navLinks } from "@/lib/constants";
import Link from "next/link";
import SocialList from "../Hero/SocialList";

function NavItem() {
  return (
    <div className="fixed top-0 right-0 h-full w-lg pt-36 pr-38">
      <ul className="space-y-4 text-lg">
        {navLinks.map((item, index) => (
          <li
            key={index}
            className="hover:text-primary font-bold transition-all duration-500 hover:-translate-x-0.5"
          >
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <SocialList />
      </div>
    </div>
  );
}

export default NavItem;
