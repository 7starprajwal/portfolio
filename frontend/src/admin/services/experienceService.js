import axios from "axios";
import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/experiences`;

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});
// Get all experiences
export const getExperience = async () => {
  const response = await axios.get(
    BASE_URL,
    authHeaders()
  );

  return response.data;
};

// Get one experience
export const getExperienceById = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/${id}`,
    authHeaders()
  );

  return response.data;
};

// Create experience
export const createExperience = async (experienceData) => {
  const response = await axios.post(
    BASE_URL,
    experienceData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Update experience
export const updateExperience = async (
  id,
  experienceData
) => {
  const response = await axios.put(
    `${BASE_URL}/${id}`,
    experienceData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete experience
export const deleteExperience = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/${id}`,
    authHeaders()
  );

  return response.data;
};