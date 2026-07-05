import { motion } from "framer-motion";

function Button({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
  onClick,
}) {
  const variants = {
    primary:
      "bg-cyan-500 hover:bg-cyan-600 text-white",

    secondary:
      "border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white",

    danger:
      "bg-red-500 hover:bg-red-600 text-white",

    success:
      "bg-green-500 hover:bg-green-600 text-white",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`rounded-xl px-6 py-3 font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {loading ? "Please wait..." : children}
    </motion.button>
  );
}

export default Button;