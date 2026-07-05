import axios from "axios";
import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getProjects = async (params = {}) => {
  const response = await axios.get(
    `${API_URL}/projects`,
    {
      params,
      ...getHeaders(),
    }
  );

  return response.data;
};

export const getProjectById = async (id) => {
  const response = await axios.get(
    `${API_URL}/projects/admin/${id}`,
    getHeaders()
  );

  return response.data;
};

export const getFeaturedProjects = async () => {
  const response = await axios.get(
    `${API_URL}/projects/featured`
  );

  return response.data;
};

export const createProject = async (
  formData
) => {
  const response = await axios.post(
    `${API_URL}/projects`,
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

export const updateProject = async (
  id,
  formData
) => {
  const response = await axios.patch(
    `${API_URL}/projects/${id}`,
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

export const deleteProject = async (
  id
) => {
  const response = await axios.delete(
    `${API_URL}/projects/${id}`,
    getHeaders()
  );

  return response.data;
};