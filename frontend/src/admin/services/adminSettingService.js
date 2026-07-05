import axios from "axios";
import { getToken } from "./authService";

const API_URL =
  import.meta.env.VITE_API_URL;

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

/* ===========================
   Get Settings
=========================== */

export const getAdminSettings = async () => {
  const response = await axios.get(
    API_URL,
    authHeaders()
  );

  return response.data;
};

/* ===========================
   Update Settings
=========================== */

export const updateAdminSettings = async (
  settings
) => {
  const response = await axios.put(
    API_URL,
    settings,
    authHeaders()
  );

  return response.data;
};

/* ===========================
   Upload Profile Image
=========================== */

export const uploadProfileImage =
  async (file) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await axios.post(
      `${API_URL}/profile-image`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  };

/* ===========================
   Delete Profile Image
=========================== */

export const deleteProfileImage =
  async () => {
    const response = await axios.delete(
      `${API_URL}/profile-image`,
      authHeaders()
    );

    return response.data;
  };