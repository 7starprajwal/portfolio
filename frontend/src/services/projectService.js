 import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getProjects = async (params = {}) => {
  const response = await axios.get(
    `${API_URL}/projects`,
    {
      params,
    }
  );

  return response.data;
};

export const getFeaturedProjects = async () => {
  const response = await axios.get(
    `${API_URL}/projects/featured`
  );

  return response.data;
};

export const getProjectBySlug = async (slug) => {
  const response = await axios.get(
    `${API_URL}/projects/${slug}`
  );

  return response.data;
};

export const getProjectById = async (id) => {
  const response = await axios.get(
    `${API_URL}/projects/admin/${id}`
  );

  return response.data;
};

export const createProject = async (formData) => {
  const response = await axios.post(
    `${API_URL}/projects`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateProject = async (
  id,
  formData
) => {
  const response = await axios.put(
    `${API_URL}/projects/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteProject = async (id) => {
  const response = await axios.delete(
    `${API_URL}/projects/${id}`
  );

  return response.data;
};