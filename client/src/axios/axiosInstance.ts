import axios from "axios";

type Tokens = {
  refresh: string | null;
  access: string | null;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1",
});

axiosInstance.re

export default axiosInstance;
