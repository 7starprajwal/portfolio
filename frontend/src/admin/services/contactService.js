import axios from "axios";
import { getToken } from "./authService";

const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const getContacts = async ({
  page = 1,
  limit = 10,
  search = "",
  status = "all",
  sort = "newest",
  from = "",
  to = "",
} = {}) => {
  const response = await axios.get(
    `${API_URL}/contact/admin`,
    {
      ...getHeaders(),
      params: {
        page,
        limit,
        search,
        status,
        sort,
        from,
        to,
      },
    }
  );

  return response.data;
};

export const markAsRead = async (id) => {
  const response = await axios.patch(
    `${API_URL}/contact/admin/${id}/read`,
    {},
    getHeaders()
  );

  return response.data;
};

export const deleteContact = async (id) => {
  const response = await axios.delete(
    `${API_URL}/contact/admin/${id}`,
    getHeaders()
  );

  return response.data;
};