import { NavLink } from "react-router-dom";
import navLinks from "./navLinks";

function DesktopNavLinks() {
  return (
    <ul className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => (
        <li key={link.id}>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `transition-colors duration-300 font-medium ${
                isActive
                  ? "text-cyan-400"
                  : "text-white hover:text-cyan-400"
              }`
            }
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default DesktopNavLinks;