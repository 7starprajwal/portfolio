import axios from "axios";

const BASE_URL = "http://localhost:5000/api/resume";

/**
 * Get the latest published resume
 * Public API
 */
export const getResume = async () => {
  const response = await axios.get(BASE_URL);

  return response.data;
};