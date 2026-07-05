import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// GET ALL EDUCATION
export const getEducations = async (params = {}) => {
  const response = await axios.get(
    `${API_URL}/education`,
    {
      params,
    }
  );

  return response.data;
};

// GET ONE
export const getEducationById = async (id) => {
  const response = await axios.get(
    `${API_URL}/education/${id}`
  );

  return response.data;
};