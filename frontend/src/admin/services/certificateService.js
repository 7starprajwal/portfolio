import axios from "axios";
import { getToken } from "./authService";

const BASE_URL = "http://localhost:5000/api/certificates";

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getCertificates = async () => {
  const response = await axios.get(
    BASE_URL,
    authHeaders()
  );

  return response.data;
};

export const getCertificateById = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/${id}`,
    authHeaders()
  );

  return response.data;
};

export const createCertificate = async (
  certificateData
) => {
  const response = await axios.post(
    BASE_URL,
    certificateData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export const updateCertificate = async (
  id,
  certificateData
) => {
  const response = await axios.put(
    `${BASE_URL}/${id}`,
    certificateData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return response.data;
};

export const deleteCertificate = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/${id}`,
    authHeaders()
  );

  return response.data;
};