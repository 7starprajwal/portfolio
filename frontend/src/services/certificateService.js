import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/certificates`;

// Get all published certificates
export const getCertificates = async () => {
  const response = await axios.get(BASE_URL);

  return response.data;
};