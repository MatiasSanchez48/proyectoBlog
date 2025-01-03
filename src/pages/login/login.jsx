/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth_context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import CircularProgress from "@mui/material/CircularProgress";
import "./login.css";

const Login = () => {
  const { login, setAccessToken, setRefreshToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleLoginBack = async (data) => {
    const backURL = import.meta.env.VITE_URL;
    const response = await fetch(backURL + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return response;
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (username === "" || password === "") {
        toast.error("Todos los campos son obligatorios");
      }
      setIsLoading(true);
      const data = {
        username,
        password,
      };

      const response = await handleLoginBack(data);
      const responseJson = await response.json();
      if (!response.ok) {
        toast.error("Error al iniciar sesión");
        setIsLoading(false);
        return;
      } else {
        setAccessToken(responseJson.data.accessToken);
        setRefreshToken(responseJson.data.refreshToken);
        login(responseJson.data.usuario.id);
        toast.success("Login exitoso");
        setIsLoading(false);
        navigate("/");
      }
    } catch (e) {
      setIsLoading(false);
      toast.error("Error al intentar iniciar sesión");
    }
  };
  useEffect(() => {});

  return (
    <div className="contenedor-login">
      <h1 className="title">LOGIN</h1>
      <form onSubmit={handleLogin} className="form">
        <label htmlFor="Nombre de usuario o Email" className="label">
          Nombre de usuario o Email{" "}
        </label>
        <div className="input">
          <input
            type="text"
            value={username}
            id="Nombre de usuario o Email"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario o Email"
            required
          />
        </div>{" "}
        <label htmlFor="password" className="label">
          Password{" "}
        </label>
        <div className="input" style={{ position: "relative" }}>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <span
            onClick={() => setPasswordVisible(!passwordVisible)}
            style={{
              position: "absolute",
              right: "60px",
              top: "55%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button
          className="button"
          style={{ width: "300px", height: "60px" }}
          type="submit"
          disabled={isLoading}
          onClick={handleLogin}
        >
          {isLoading ? (
            <CircularProgress size={24} className="loader" color="inherit" />
          ) : (
            "Logearse"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
