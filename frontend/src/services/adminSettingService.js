import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/admin-settings`;

export const getAdminSettings = async () => {
  console.log("API URL:", API_URL);

  try {
    const response = await axios.get(API_URL);

    console.log("SUCCESS:", response.data);

    return response.data;
  } catch (error) {
    console.log("FULL ERROR:", error);
    console.log("MESSAGE:", error.message);
    console.log("CODE:", error.code);
    console.log("RESPONSE:", error.response);
    console.log("REQUEST:", error.request);

    throw error;
  }
};

export const updateAdminSettings = async (settings) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(API_URL, settings, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const uploadProfileImage = async (file) => {
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

export const deleteProfileImage = async () => {
  const token = localStorage.getItem("token");

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