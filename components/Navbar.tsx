import ContactBtn from "./ui/ContactBtn";
import Logo from "./Header/Logo";
import NavList from "./Header/NavList";
import MobileMenuBtn from "./ui/MobileMenuBtn";
import ToggleTheme from "./ui/ToggleTheme";

function Navbar() {
  return (
    <nav className="xl:px[8%] fixed z-50 flex w-full items-center justify-between px-5 py-4 lg:px-8">
      <Logo />
      <NavList />
      <div className="flex items-center gap-4">
        <ContactBtn />
        <ToggleTheme />
        <MobileMenuBtn />
      </div>
    </nav>
  );
}

export default Navbar;
