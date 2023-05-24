import { createContext, useContext, useState } from "react";

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
};

const initialValue: Auth = {
  user: null,
  login: () => {},
  register: () => {},
};

const AuthContext = createContext<Auth>(initialValue);

export const AuthProvider = ({ children }: Props) => {
  const [user] = useState<null | User>(null);

  const login = ({ username, password }: LoginProps, callback: Callback) => {
    setTimeout(() => {
      console.log(username, password);
      return callback();
    }, 3000);
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
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): Auth => {
  const { user, login, register } = useContext(AuthContext);
  return { user, login, register };
};
