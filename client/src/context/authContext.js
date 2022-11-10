import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const devLoginPath = "http://localhost:4200/api/auth/login";
  const devRegisterPath = "http://localhost:4200/api/auth/register";

  // const prodLoginPath =
  //   "https://api-kappa-snowy.vercel.app/api/auth/login";

  // const prodRegisterPath =
  //   "https://api-kappa-snowy.vercel.app/api/auth/register";

  const login = async (inputs) => {
    const res = await axios.post(devLoginPath, inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
    window.location.replace("/");
  };

  const logout = async () => {
    localStorage.removeItem("user");
    window.location.replace("/login");
    setCurrentUser(null);
  };

  const register = async (inputs) => {
    await axios.post(devRegisterPath, inputs);
    window.location.replace("/login");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, register, setCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
