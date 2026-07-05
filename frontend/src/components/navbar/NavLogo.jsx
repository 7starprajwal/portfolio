import { Link } from "react-router-dom";

function NavLogo() {
  return (
    <Link
      to="/"
      className="text-2xl md:text-3xl font-bold tracking-wide"
    >
      <span className="text-cyan-400">Prajwal</span>
      <span className="text-white">.</span>
    </Link>
  );
}

export default NavLogo;