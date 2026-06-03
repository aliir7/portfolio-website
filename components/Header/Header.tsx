import { navLinks } from "@/lib/constants";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed bottom-0 left-0 w-full bg-container shadow-[0_-2px_16px_hsla(var(--hue),80%,10%,.1)] z-50 rounded-t-[2rem] md:top-0 md:bottom-auto md:rounded-none md:shadow-none md:bg-transparent">
      <nav className="h-[4rem] flex justify-between items-center px-6 md:h-[5rem] md:max-w-[1024px] md:mx-auto">
        <Link href="/" className="font-heading font-bold text-lg text-title">
          زویی میلر
        </Link>

        {/* منوی موبایل (نوار پایین) */}
        <div className="fixed bottom-0 left-0 w-full bg-container pt-4 pb-8 px-8 rounded-t-[2rem] shadow-[0_-1px_12px_hsla(var(--hue),80%,10%,.1)] md:static md:w-auto md:bg-transparent md:shadow-none md:p-0 md:rounded-none">
          <ul className="flex justify-between items-center gap-2 md:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex flex-col items-center text-xs font-medium text-text hover:text-primary transition-colors md:flex-row md:gap-2"
                >
                  <link.icon className="w-5 h-5 mb-1 md:mb-0" />
                  <span className="md:inline">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
