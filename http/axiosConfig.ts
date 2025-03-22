import axios from "axios";

// Create Axios instance with base URL
export const api = axios.create({
  baseURL: "http://10.18.100.181:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error.response?.data || error.message);
    }
  );