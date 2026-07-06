import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/resume`;

/**
 * Get the latest published resume
 * Public API
 */
export const getResume = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};