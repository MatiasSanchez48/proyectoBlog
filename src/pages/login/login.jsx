import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth_context";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./login.css";
const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    login();
    setIsLoading(false);
    navigate("/");
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
