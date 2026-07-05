import axios from "axios";
import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// GET ALL
export const getEducations = async (params = {}) => {
  const response = await axios.get(
    `${API_URL}/education`,
    {
      params,
      ...getHeaders(),
    }
  );

  return response.data;
};

// GET ONE
export const getEducationById = async (id) => {
  const response = await axios.get(
    `${API_URL}/education/admin/${id}`,
    getHeaders()
  );

  return response.data;
};

// CREATE
export const createEducation = async (
  formData
) => {
  const response = await axios.post(
    `${API_URL}/education`,
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

// UPDATE
export const updateEducation = async (
  id,
  formData
) => {
  const response = await axios.patch(
    `${API_URL}/education/${id}`,
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

// DELETE
export const deleteEducation = async (
  id
) => {
  const response = await axios.delete(
    `${API_URL}/education/${id}`,
    getHeaders()
  );

  return response.data;
};