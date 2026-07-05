import { toast } from "react-toastify";

function DeleteToast({
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
  onConfirm,
}) {
  const toastId = toast(
    ({ closeToast }) => (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>

          <p className="mt-2 text-sm text-slate-300">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              closeToast();
            }}
            className="rounded-lg bg-slate-700 px-4 py-2 text-white transition hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              closeToast();

              if (onConfirm) {
                await onConfirm();
              }
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      closeButton: true,
      position: "top-right",
      icon: "⚠️",
      theme: "dark",
    }
  );

  return toastId;
}

export default DeleteToast;