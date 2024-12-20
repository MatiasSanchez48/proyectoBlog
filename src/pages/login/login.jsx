import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth_context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import "./login.css";

const Login = () => {
  const { login, setAccessToken, setRefreshToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLoginBack = async (data) => {
    const response = await fetch(import.meta.env.VITE_URL + "auth/login", {
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
      // Realizar la solicitud de inicio de sesión aquí
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
        login();
        toast.success("Login exitoso");
        //navegar al login
        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Error al intentar iniciar sesión");
    }
  };
  useEffect(() => {});

  return (
    <div>
      <h1 className="title">LOGIN</h1>
      <form onSubmit={handleLogin} className="form">
        <div className="input">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
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
            "Log In"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
