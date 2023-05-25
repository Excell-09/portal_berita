import { createContext, useContext, useState } from "react";
import useAlert from "../atom/errorState";
import jwtDecode from "jwt-decode";
import axiosInstance, { Token } from "../utils/axiosInstance";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

interface User {
  username: string;
  email: string;
}

type Callback = () => void;

type LoginProps = {
  username: string;
  password: string;
};

type RegisterProps = {
  username: string;
  email: string;
  password: string;
};

type Auth = {
  user: User | null;
  login: ({ username, password }: LoginProps, callback: Callback) => void;
  register: (
    { username, email, password }: RegisterProps,
    callback: Callback
  ) => void;
  logout: () => void;
};

const initialValue: Auth = {
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
};

const AuthContext = createContext<Auth>(initialValue);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<null | User>(() => {
    const token: null | Token = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token") as string)
      : null;
    if (token) {
      return jwtDecode(token.access);
    }
    return null;
  });

  const { setAlert } = useAlert();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    return;
  };

  const login = async (
    { username, password }: LoginProps,
    callback: Callback
  ) => {
    try {
      const { data } = await axiosInstance.post<Token>("/login", {
        username,
        password,
      });

      localStorage.setItem("token", JSON.stringify(data));
      setUser(jwtDecode(data.access));
    } catch (error: any) {
      if (
        error.responsdata.detail ===
        "No active account found with the given credentials"
      ) {
        setAlert({ message: "User not found", status: "error" });
      }
    }
    return callback();
  };

  const register = (
    { username, email, password }: RegisterProps,
    callback: Callback
  ) => {
    console.log(username, password, email);
    return callback();
  };

  const value: Auth = {
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): Auth => {
  const { user, login, register, logout } = useContext(AuthContext);
  return { user, login, register, logout };
};
