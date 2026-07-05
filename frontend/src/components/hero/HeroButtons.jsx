import { useNavigate } from "react-router-dom";

function HeroButtons() {
  const navigate = useNavigate();

  return (
    <div className="mt-10 flex">
      <button
        onClick={() => navigate("/contact")}
        className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-cyan-600"
      >
        Hire Me
      </button>
    </div>
  );
}

export default HeroButtons;