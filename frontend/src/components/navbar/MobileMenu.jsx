import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

import navLinks from "./navLinks";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="text-white text-3xl md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
      </button>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute left-0 top-20 w-full bg-slate-900 border-t border-slate-700 shadow-xl md:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-6 py-4 transition-colors duration-300 ${
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
        </div>
      )}
    </>
  );
}

export default MobileMenu;