import axios from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { Token } from "../Auth/AuthProvider";

type UserJwt = {
  email: string;
  exp: number;
  iat: number;
  jti: string;
  token_type: string;
  user_id: number;
  username: string;
};

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api/v1";

let token: Token | null = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token") as string) : null;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!token) return req;

  req.headers.Authorization = `Bearer ${token.access}`;

  const user: UserJwt = jwtDecode(token.access);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) {
    req.headers.Authorization = `Bearer ${token.access}`;
    return req;
  }
  const response = await axios.post(`${baseURL}/token/refresh`, {
    refresh: token.refresh,
  });

  token.access = response.data.access;

  localStorage.setItem("token", JSON.stringify(token));
  req.headers.Authorization = `Bearer ${response.data.access}`;

  return req;
});

export default axiosInstance;
