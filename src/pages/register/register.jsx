import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const handleRegisterBack = async (data) => {
    const response = await fetch(import.meta.env.VITE_URL + "auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    console.log(responseJson.data);
    if (response.ok) {
      toast.success("Registro exitoso");
      //navegar al login
      navigate("/login");
    }
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
      console.log(data);
      await handleRegisterBack(data);
    } catch (error) {
      console.log(error);
      toast.error("Error en el registro");
    }
  };
  return (
    <div className="contenedor">
      <form onSubmit={handleRegister} className="form">
        <h1>Crear Blog</h1>
        <div className="input">
          <label htmlFor="usuario" className="label">
            Usuario
          </label>
          <input
            type="text"
            id="usuario"
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="email" className="label">
            email
          </label>
          <input
            type="email"
            id="email"
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
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="pass" className="label">
            Usuario
          </label>
          <input
            type="password"
            id="pass"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="pass2" className="label">
            Usuario
          </label>
          <input
            type="password"
            id="pass2"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button type="submit" className="boton">
          Registrar
        </button>
      </form>
      <h1>Register</h1>
    </div>
  );
};

export default Register;
