const API_BASE_URL = "http://localhost:5000/api";

/* ===========================
   Login
=========================== */

export const loginAdmin = async (loginData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Login failed."
      );
    }

    return data;
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    throw error;
  }
};

/* ===========================
   Change Password
=========================== */

export const changePassword = async (
  passwordData
) => {
  const token = localStorage.getItem(
    "adminToken"
  );

  const response = await fetch(
    `${API_BASE_URL}/auth/change-password`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to change password."
    );
  }

  return data;
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

  return admin
    ? JSON.parse(admin)
    : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(
    "adminToken"
  );
};

export const getToken =
  getAdminToken;

export const logout =
  logoutAdmin;