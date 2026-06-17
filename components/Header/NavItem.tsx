import { navLinks } from "@/lib/constants";
import Link from "next/link";
import SocialList from "../Hero/SocialList";
import Shape from "../ui/shape";

type NavItemProps = {
  onNavigate?: () => void;
};

function NavItem({ onNavigate }: NavItemProps) {
  return (
    <div className="h-full w-full pt-28 pr-26 sm:px-6 md:pr-26">
      <ul className="space-y-3 text-base sm:text-lg">
        {navLinks.map((item, index) => (
          <li
            key={index}
            className="hover:text-primary font-bold transition-all duration-500 hover:-translate-x-0.5"
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
      <div className="">
        <Shape
          containerClassName="top-30 h-[70%] right-18 "
          className="absolute -top-52.5 -right-19.5 -z-10 h-56.5 max-w-56.5 object-center"
        />
      </div>
    </div>
  );
}

export default NavItem;
