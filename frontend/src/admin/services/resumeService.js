import axios from "axios";
import { getToken } from "./authService";

const BASE_URL = "http://localhost:5000/api/resume";

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

// Get Resume
export const getResume = async () => {
  const response = await axios.get(
    BASE_URL,
    authHeaders()
  );

  return response.data;
};

// Upload Resume
export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await axios.post(
    BASE_URL,
    formData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete Resume
export const deleteResume = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/${id}`,
    authHeaders()
  );

  return response.data;
};