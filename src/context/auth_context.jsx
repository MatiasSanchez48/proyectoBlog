/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogger, setIsLogger] = useState(() => {
    const store = localStorage.getItem("isLogged");
    return store === "true";
  });
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);
  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      localStorage.removeItem("refreshToken");
    }
  }, [refreshToken]);
  const handleRefreshToken = async () => {
    const backURL = import.meta.env.VITE_URL;
    const response = await fetch(backURL + "auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-refresh-token": refreshToken,
      },
    });
    const responseJson = await response.json();
    if (response.ok) {
      setAccessToken(responseJson.data.accessToken);
    } else {
      logout();
      setAccessToken(null);
      setRefreshToken(null);
      return -1;
    }
  };

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
    <AuthContext.Provider
      value={{
        isLogger,
        setIsLogger,
        logout,
        login,
        handleRefreshToken,
        accessToken,
        setAccessToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
