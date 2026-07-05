import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/certificates`;

export const getPublishedExperiences = async () => {
  const response = await axios.get(
    `${BASE_URL}/published`
  );

  return response.data;
};