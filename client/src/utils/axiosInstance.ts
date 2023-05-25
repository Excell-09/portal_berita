import axios from "axios";
import jwtDecode from "jwt-decode";

export interface Token {
  access: string;
  refresh: string;
}

type UserJwt = {
  email: string;
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
  username: string;
};

const baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token: Token | null = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token") as string)
      : null;

    if (!token) return config;

    config.headers.Authorization = `Bearer ${token.access}`;
    const user: UserJwt = jwtDecode(token.access);
    const isExpired = Date.now() >= user.exp * 1000;

    if (!isExpired) return config;

    const response = await axios.post(baseURL + "/token/refresh", {
      refresh: token.refresh,
    });

    const newToken = { ...token };
    newToken.access = response.data.access;
    localStorage.setItem("token", JSON.stringify(newToken));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
