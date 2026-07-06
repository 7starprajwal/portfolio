import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-card">
        <h1>404</h1>

        <h2>Oops! Page Not Found</h2>

        <p>
          The page you are looking for doesn't exist,
          has been moved, or the URL is incorrect.
        </p>

        <div className="notfound-buttons">
          <Link to="/" className="home-btn">
            <FaHome />
            Home
          </Link>

          <button
            className="back-btn"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;