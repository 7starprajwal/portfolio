import axios from "axios";
import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getDashboardStats = async () => {
  const response = await axios.get(
    `${API_URL}/dashboard`,
    getHeaders()
  );

  return response.data;
};