/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogger, setIsLogger] = useState(() => {
    const store = localStorage.getItem("isLogged");
    return store === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLogged", isLogger);
  }, [isLogger]);
  const login = () => {
    setIsLogger(true);
    localStorage.setItem("isLogged", true);
  };
  const logout = () => {
    setIsLogger(false);
    localStorage.removeItem("isLogged");
  };
  return (
    <AuthContext.Provider value={{ isLogger, setIsLogger, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
