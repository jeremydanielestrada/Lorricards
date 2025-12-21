import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_BASE_API_URL ||
    "https://lorricards-backend.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
