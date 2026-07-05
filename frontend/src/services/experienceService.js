import axios from "axios";

const BASE_URL = "http://localhost:5000/api/experiences";

export const getPublishedExperiences = async () => {
  const response = await axios.get(
    `${BASE_URL}/published`
  );

  return response.data;
};