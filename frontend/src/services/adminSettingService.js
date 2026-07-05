import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/admin-settings`;

export const getAdminSettings = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const updateAdminSettings = async (
  settings
) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    API_URL,
    settings,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const uploadProfileImage = async (
  file
) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("image", file);

  const response = await axios.post(
    `${API_URL}/profile-image`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteProfileImage =
  async () => {
    const token =
      localStorage.getItem("token");

    const response = await axios.delete(
      `${API_URL}/profile-image`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };