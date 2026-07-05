import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";

function Rating({ rating = 0 }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <FaStar key={i} className="text-yellow-400" />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <FaStarHalfAlt
          key={i}
          className="text-yellow-400"
        />
      );
    } else {
      stars.push(
        <FaRegStar
          key={i}
          className="text-gray-500"
        />
      );
    }
  }

  return (
    <div className="flex items-center gap-2 mt-3">
      <div className="flex gap-1">{stars}</div>

      <span className="text-cyan-400 font-semibold">
        {rating ? rating.toFixed(1) : "N/A"}
      </span>
    </div>
  );
}

export default Rating;