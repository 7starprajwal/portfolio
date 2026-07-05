import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/api/dashboard`;

const getToken = () => {
  return localStorage.getItem("token");
};

export const getDashboardStats = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};