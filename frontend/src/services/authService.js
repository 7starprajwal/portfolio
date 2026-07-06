import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const getToken = () => {
  return localStorage.getItem("token");
};

/* ===========================
   Admin Login
=========================== */

export const loginAdmin = async (credentials) => {
  const response = await axios.post(
    `${API_URL}/login`,
    credentials
  );

  return response.data;
};

/* ===========================
   Change Password
=========================== */

export const changePassword = async (passwords) => {
  const response = await axios.put(
    `${API_URL}/change-password`,
    passwords,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};