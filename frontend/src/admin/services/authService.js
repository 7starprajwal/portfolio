import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

/* ===========================
   Login
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

export const changePassword = async (
  passwords
) => {
  const token = localStorage.getItem(
    "adminToken"
  );

  const response = await axios.put(
    `${API_URL}/change-password`,
    passwords,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/* ===========================
   Session
=========================== */

export const saveAdminSession = (
  data
) => {
  localStorage.setItem(
    "adminToken",
    data.token
  );

  localStorage.setItem(
    "admin",
    JSON.stringify(data.admin)
  );
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("admin");
};

export const removeToken = () => {
  localStorage.removeItem("adminToken");
};

export const getAdminToken = () => {
  return localStorage.getItem(
    "adminToken"
  );
};

export const getAdmin = () => {
  const admin = localStorage.getItem(
    "admin"
  );

  return admin ? JSON.parse(admin) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(
    "adminToken"
  );
};

export const getToken = getAdminToken;

export const logout = logoutAdmin;