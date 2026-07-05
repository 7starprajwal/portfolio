import axios from "axios";
import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// ==============================
// Get All Skills
// ==============================

export const getSkills = async (params = {}) => {
  const response = await axios.get(
    `${API_URL}/skills`,
    {
      params,
      ...getHeaders(),
    }
  );

  return response.data;
};

// ==============================
// Get Skill By ID
// ==============================

export const getSkillById = async (id) => {
  const response = await axios.get(
    `${API_URL}/skills/admin/${id}`,
    getHeaders()
  );

  return response.data;
};

// ==============================
// Create Skill
// ==============================

export const createSkill = async (
  formData
) => {
  const response = await axios.post(
    `${API_URL}/skills`,
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

// ==============================
// Update Skill
// ==============================

export const updateSkill = async (
  id,
  formData
) => {
  const response = await axios.patch(
    `${API_URL}/skills/${id}`,
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

// ==============================
// Delete Skill
// ==============================

export const deleteSkill = async (
  id
) => {
  const response = await axios.delete(
    `${API_URL}/skills/${id}`,
    getHeaders()
  );

  return response.data;
};