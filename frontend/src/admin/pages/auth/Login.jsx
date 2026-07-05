import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  loginAdmin,
  saveAdminSession,
} from "../../services/authService";

 

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  setLoading(true);
  setError("");

  try {
    console.log("STEP 1");

    const response = await loginAdmin(formData);

    console.log("STEP 2", response);

    console.log("saveAdminSession:", typeof saveAdminSession);

    saveAdminSession(response);

    console.log("STEP 3");

    navigate("/admin/dashboard");
  } catch (error) {
    console.error(error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <h1 className="mb-2 text-center text-3xl font-bold text-white">
          Portfolio Admin
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Sign in to manage your portfolio
        </p>

        {error && (
          <div className="mb-5 rounded-lg bg-red-500/20 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>

            <input
              type={
                showPassword ? "text" : "password"
              }
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="mt-2 text-sm text-cyan-400"
            >
              {showPassword
                ? "Hide Password"
                : "Show Password"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-500 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;