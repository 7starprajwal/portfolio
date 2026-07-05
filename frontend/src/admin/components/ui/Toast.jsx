import { AnimatePresence, motion } from "framer-motion";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from "react-icons/fa";

const icons = {
  success: (
    <FaCheckCircle className="text-2xl text-green-400" />
  ),
  error: (
    <FaExclamationCircle className="text-2xl text-red-400" />
  ),
  info: (
    <FaInfoCircle className="text-2xl text-cyan-400" />
  ),
};

const colors = {
  success: "border-green-500",
  error: "border-red-500",
  info: "border-cyan-500",
};

function Toast({
  open,
  type = "success",
  message,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
            y: -40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -40,
          }}
          className={`fixed right-6 top-6 z-[9999] flex w-96 items-center gap-4 rounded-xl border bg-slate-900 p-5 shadow-2xl ${colors[type]}`}
        >
          {icons[type]}

          <p className="text-white">
            {message}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;