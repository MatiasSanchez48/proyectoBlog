import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./register.css";

const Register = () => {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegisterBack = async (data) => {
    setIsLoading(true);
    const response = await fetch(import.meta.env.VITE_URL + "auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Registro exitoso");
      //navegar al login
      navigate("/login");
    }
    setIsLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (
        usuario === "" ||
        fecha === "" ||
        email === "" ||
        password === "" ||
        password2 === ""
      ) {
        toast.error("Todos los campos son obligatorios");
        return;
      }
      if (password !== password2) {
        toast.error("Las contraseñas no coinciden");
        return;
      }
      const data = {
        username: usuario,
        email,
        fechaNacimiento: fecha,
        password: password,
      };
      await handleRegisterBack(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Error en el registro");
    }
  };
  return (
    <div className="contenedor">
      <form onSubmit={handleRegister} className="form">
        <h1>Registrarse</h1>
        <div className="input">
          <label htmlFor="usuario" className="label">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="usuario"
            placeholder="Nombre de usuario"
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="fecha" className="label">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            id="fecha"
            placeholder="ej: 1999-12-31"
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="pass" className="label">
            Contraseña
          </label>
          <input
            type="password"
            id="pass"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="pass2" className="label">
            Repetir contraseña
          </label>
          <input
            type="password"
            id="pass2"
            placeholder="Repetir contraseña"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button
          className="button"
          style={{ width: "300px", height: "60px" }}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} className="loader" color="inherit" />
          ) : (
            "Registrarse"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
