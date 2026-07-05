import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrash,
  FaTimes,
} from "react-icons/fa";

function ConfirmModal({
  isOpen,
  title = "Delete Item",
  message = "Are you sure?",
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
            className="w-full max-w-md rounded-2xl bg-slate-900 p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-full bg-red-500/20 p-3">
                <FaTrash className="text-red-400" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  {title}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {message}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={onCancel}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-slate-700 px-5 py-2 text-white transition hover:bg-slate-600"
              >
                <FaTimes />
                Cancel
              </button>

              <button
                onClick={onConfirm}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
              >
                <FaTrash />

                {loading
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmModal;