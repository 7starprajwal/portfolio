import NavLogo from "./NavLogo";
import DesktopNavLinks from "./DesktopNavLinks";
import MobileMenu from "./MobileMenu";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <NavLogo />

        <DesktopNavLinks />

        <MobileMenu />
      </nav>
    </header>
  );
}

export default Navbar;