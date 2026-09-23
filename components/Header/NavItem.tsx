import { Link } from "@/i18n/navigation";
import SocialList from "../Hero/SocialList";
import Shape from "../ui/shape";
import { useDictionary, useLocale } from "@/lib/i18n";

type NavItemProps = {
  onNavigate?: () => void;
};

function NavItem({ onNavigate }: NavItemProps) {
  const dictionary = useDictionary();
  const locale = useLocale();
  const isPersian = locale === "fa";
  return (
    <div
      className={`h-full w-full pt-28 sm:px-6 ${
        isPersian ? "pr-26 md:pr-26" : "pl-26 md:pl-26"
      }`}
    >
      <ul className="space-y-3 text-base sm:text-lg">
        {Object.entries(dictionary.nav).map(([key, name], index) => (
          <li
            key={index}
            className={`hover:text-primary font-bold transition-all duration-500 ${
              isPersian ? "hover:-translate-x-0.5" : "hover:translate-x-0.5"
            }`}
          >
            <Link href={`/#${key}`} onClick={onNavigate}>
              {name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <SocialList />
      </div>
      <div className="">
        <Shape
          containerClassName={`top-30 h-[70%] ${
            isPersian ? "right-18" : "left-18"
          }`}
          className={`absolute -top-52.5 -z-10 h-56.5 max-w-56.5 object-center ${
            isPersian ? "-right-19.5" : "-left-19.5"
          }`}
        />
      </div>
    </div>
  );
}

export default NavItem;
