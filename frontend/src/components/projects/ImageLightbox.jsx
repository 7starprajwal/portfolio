
import { X } from "lucide-react";

function ImageLightbox({ image, title, onClose }) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
      onClick={onClose}
    >
      <button
        className="absolute right-6 top-6 text-white"
        onClick={onClose}
      >
        <X size={34} />
      </button>

      <img
        src={image}
        alt={title}
        className="max-h-[90vh] max-w-[90vw] rounded-xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default ImageLightbox;