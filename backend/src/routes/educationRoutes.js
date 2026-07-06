import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/education`;

// Get all education
export const getEducations = async (params = {}) => {
  const response = await axios.get(BASE_URL, {
    params,
  });

  return response.data;
};

// Get featured education
export const getFeaturedEducations = async () => {
  const response = await axios.get(
    `${BASE_URL}/featured`
  );

  return response.data;
};

// Get one education (Admin only)
export const getEducationById = async (id, token) => {
  const response = await axios.get(
    `${BASE_URL}/admin/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};